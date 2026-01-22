import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VesselData {
  vessel_name: string;
  callsign: string | null;
  voyage_no: string | null;
  vessel_no: string | null;
  arrival_date: string | null;
  arrival_time: string | null;
  etd_date: string | null;
  etd_time: string | null;
  berth: string | null;
  operation: string | null;
  delivery_start: string | null;
  status: string | null;
  agent: string | null;
}

// Known shipping agents in Cyprus
const KNOWN_AGENTS = [
  'The Cyprus Shipping Co. Ltd',
  'The Cyprus Shipping Co.',
  'Cyprus Shipping Co',
  'CMA CGM Cyprus Ltd',
  'CMA CGM',
  'Mediterranean Shipping Co.Cyprus Ltd',
  'Mediterranean Shipping Co.',
  'Mediterranean Shipping',
  'MSC',
  'SBS Shipping',
  'Cargo Book Cyprus Ltd',
  'Salamis Shipping',
  'Shoham',
  'GAC',
  'Inchcape',
];

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 30000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

// Scrape with ScrapingBee - ALTERNATIVE METHOD with JS rendering
async function scrapeWithScrapingBee(
  apiKey: string,
  url: string,
  options: { premium?: boolean; waitMs?: number } = {}
): Promise<string | null> {
  const { premium = true, waitMs = 10000 } = options;
  
  try {
    console.log(`ScrapingBee scraping ${url} (premium=${premium}, wait=${waitMs})...`);
    
    const params = new URLSearchParams({
      api_key: apiKey,
      url: url,
      render_js: 'true',
      premium_proxy: premium ? 'true' : 'false',
      country_code: 'cy',
      wait: waitMs.toString(),
      wait_for: 'table.resultlist',
      block_ads: 'true',
      block_resources: 'false',
    });
    
    const response = await fetchWithTimeout(
      `https://app.scrapingbee.com/api/v1/?${params.toString()}`,
      {},
      60000
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ScrapingBee error ${response.status}:`, errorText.slice(0, 500));
      return null;
    }
    
    const html = await response.text();
    console.log(`ScrapingBee returned ${html.length} chars`);
    
    if (html.length < 1000) {
      console.log('ScrapingBee returned insufficient HTML');
      return null;
    }
    
    // Check for schedule indicators
    const hasSchedule = html.includes('resultlist') || html.includes('segelliste') || 
                        html.includes('BORCHARD') || html.includes('CMA') || html.includes('MSC');
    console.log(`ScrapingBee HTML contains schedule indicators: ${hasSchedule}`);
    
    return html;
  } catch (e) {
    console.error('ScrapingBee threw:', e);
    return null;
  }
}

// Action strategies for Firecrawl browser automation
type ActionStrategy = 'direct' | 'navigate-click' | 'scroll-wait' | 'form-submit';

// Scrape with Firecrawl - PRIMARY METHOD with multiple strategies
async function scrapeWithFirecrawl(
  apiKey: string, 
  url: string, 
  options: { 
    strategy?: ActionStrategy; 
    format?: 'rawHtml' | 'html' | 'markdown';
  } = {}
): Promise<{ html: string; markdown?: string } | null> {
  const { strategy = 'direct', format = 'rawHtml' } = options;
  
  try {
    console.log(`Firecrawl scraping with strategy=${strategy}, format=${format}...`);
    
    const requestBody: Record<string, unknown> = {
      url,
      formats: [format, 'html'],
      timeout: 120000,
      onlyMainContent: false,
      // Geo-location for Cyprus
      location: {
        country: 'CY',
        languages: ['en'],
      },
    };
    
    // Different action strategies
    switch (strategy) {
      case 'direct':
        // Direct scrape with extended wait for JS rendering
        requestBody.waitFor = 15000;
        break;
        
      case 'navigate-click':
        // Start from portal homepage and navigate
        requestBody.url = 'https://infogate.eurogate-limassol.eu';
        requestBody.actions = [
          { type: 'wait', milliseconds: 3000 },
          // Click on the sailing list link
          { type: 'click', selector: 'a[href*="segelliste"], a:contains("Sailing"), a:contains("Schedule")' },
          { type: 'wait', milliseconds: 8000 },
          // Scroll to load any lazy content
          { type: 'scroll', direction: 'down', amount: 500 },
          { type: 'wait', milliseconds: 3000 },
        ];
        break;
        
      case 'scroll-wait':
        // Direct URL with scroll actions to trigger lazy loading
        requestBody.actions = [
          { type: 'wait', milliseconds: 5000 },
          { type: 'scroll', direction: 'down', amount: 300 },
          { type: 'wait', milliseconds: 2000 },
          { type: 'scroll', direction: 'down', amount: 600 },
          { type: 'wait', milliseconds: 3000 },
          { type: 'scroll', direction: 'up', amount: 900 },
          { type: 'wait', milliseconds: 2000 },
        ];
        break;
        
      case 'form-submit':
        // Start at base URL and submit the form
        requestBody.url = 'https://infogate.eurogate-limassol.eu/segelliste';
        requestBody.actions = [
          { type: 'wait', milliseconds: 3000 },
          // Try to find and click any "show" or "submit" button
          { type: 'click', selector: 'input[type="submit"], button[type="submit"], .submit-btn, a.show' },
          { type: 'wait', milliseconds: 8000 },
        ];
        break;
    }
    
    console.log(`Request URL: ${requestBody.url || url}`);
    if (requestBody.actions) {
      console.log(`Actions: ${JSON.stringify(requestBody.actions)}`);
    }
    
    const response = await fetchWithTimeout(
      'https://api.firecrawl.dev/v1/scrape',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
      130000
    );

    const raw = await response.text();
    let data: Record<string, unknown>;
    
    try {
      data = JSON.parse(raw);
    } catch {
      console.error('Firecrawl returned non-JSON:', raw?.slice?.(0, 500));
      return null;
    }

    if (!response.ok || !data?.success) {
      console.error('Firecrawl error:', data);
      return null;
    }

    // Access nested data structure
    const responseData = (data.data || data) as Record<string, unknown>;
    const html = (responseData.rawHtml || responseData.html || '') as string;
    const markdown = (responseData.markdown || '') as string;
    
    console.log(`Firecrawl returned ${html.length} chars HTML, ${markdown.length} chars markdown`);
    
    if (!html || html.length < 500) {
      console.log('Firecrawl returned insufficient HTML');
      return null;
    }

    // Check for vessel table indicators
    const hasSchedule = html.includes('resultlist') || html.includes('segelliste') || 
                        html.includes('BORCHARD') || html.includes('CMA') || html.includes('MSC');
    console.log(`HTML contains schedule indicators: ${hasSchedule}`);

    return { html, markdown };
  } catch (e) {
    console.error('Firecrawl threw:', e);
    return null;
  }
}

// Main function to get schedule HTML using multiple scrapers
async function getScheduleHtml(
  firecrawlApiKey: string | undefined,
  scrapingBeeApiKey: string | undefined
): Promise<{ source: string; url: string; html: string } | null> {
  const scheduleUrls = [
    'https://infogate.eurogate-limassol.eu/segelliste/state/show?_transition=start&period=1&internal=false&languageNo=30&locationCode=CYLMS&order=%2B0',
    'https://infogate.eurogate-limassol.eu/segelliste?locationCode=CYLMS&languageNo=30&period=1',
  ];

  // Try ScrapingBee FIRST since Firecrawl is failing
  if (scrapingBeeApiKey) {
    console.log('\n=== Trying ScrapingBee (primary) ===');
    
    for (const url of scheduleUrls) {
      const html = await scrapeWithScrapingBee(scrapingBeeApiKey, url, { 
        premium: true, 
        waitMs: 12000 
      });
      
      if (html && html.length > 2000) {
        const hasTable = html.includes('resultlist') || html.includes('<table');
        const hasVessels = html.includes('BORCHARD') || html.includes('CMA CGM') || html.includes('MSC');
        
        if (hasTable || hasVessels) {
          console.log(`✓ ScrapingBee successful! HTML: ${html.length} chars`);
          return { source: 'scrapingbee', url, html };
        }
      }
    }
    
    // Try without premium proxy
    console.log('Trying ScrapingBee without premium proxy...');
    for (const url of scheduleUrls) {
      const html = await scrapeWithScrapingBee(scrapingBeeApiKey, url, { 
        premium: false, 
        waitMs: 8000 
      });
      
      if (html && html.length > 2000) {
        console.log(`✓ ScrapingBee (non-premium) successful! HTML: ${html.length} chars`);
        return { source: 'scrapingbee-standard', url, html };
      }
    }
  }

  // Fallback to Firecrawl
  if (firecrawlApiKey) {
    console.log('\n=== Trying Firecrawl (fallback) ===');
    
    const strategies: { strategy: ActionStrategy; urls: string[] }[] = [
      { strategy: 'direct', urls: scheduleUrls },
      { strategy: 'scroll-wait', urls: scheduleUrls },
      { strategy: 'navigate-click', urls: [''] },
    ];

    for (const { strategy, urls } of strategies) {
      console.log(`Trying Firecrawl strategy: ${strategy}`);
      
      for (const url of urls) {
        const targetUrl = url || scheduleUrls[0];
        const result = await scrapeWithFirecrawl(firecrawlApiKey, targetUrl, { 
          strategy, 
          format: 'rawHtml' 
        });
        
        if (result?.html && result.html.length > 2000) {
          const hasTable = result.html.includes('resultlist') || result.html.includes('<table');
          const hasVessels = result.html.includes('BORCHARD') || result.html.includes('CMA CGM');
          
          if (hasTable || hasVessels) {
            console.log(`✓ Firecrawl ${strategy} successful!`);
            return { source: `firecrawl-${strategy}`, url: targetUrl, html: result.html };
          }
        }
      }
    }
  }

  return null;
}

// Parse date: "21/01/2026" or "21.01.2026" -> "2026-01-21"
function parseDate(dateStr: string): string | null {
  if (!dateStr?.trim()) return null;
  
  const clean = dateStr.trim();
  
  // Format: "21/01/2026" or "21.01.2026"
  const match = clean.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (match) {
    return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
  }
  
  // Already ISO format
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return clean;
  }
  
  return null;
}

// Parse time: "05.45" or "15:30" -> "05:45:00"
function parseTime(timeStr: string): string | null {
  if (!timeStr?.trim()) return null;
  
  // Replace dot with colon
  const clean = timeStr.trim().replace('.', ':');
  
  const match = clean.match(/^(\d{1,2}):(\d{2})$/);
  if (match) {
    return `${match[1].padStart(2, '0')}:${match[2]}:00`;
  }
  
  return null;
}

// Extract text from HTML cell
function extractText(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Get rowspan value from a cell
function getRowspan(cellHtml: string): number {
  const match = cellHtml.match(/rowspan\s*=\s*["']?(\d+)["']?/i);
  return match ? parseInt(match[1], 10) : 1;
}

// Check if string is valid vessel name
function isValidVesselName(name: string): boolean {
  if (!name || name.length < 3 || name.length > 50) return false;
  
  const lower = name.toLowerCase();
  const invalid = ['swipe', 'vessel', 'name', 'ship', 'n/a', 'date', 'time', 'berth', 'agent', 'status', 'load', 'discharge'];
  if (invalid.some(inv => lower === inv)) return false;
  
  // Vessel names are typically uppercase letters, spaces, numbers
  return /^[A-Z][A-Z0-9\s\-\.]+$/i.test(name);
}

// Extract agent from text
function extractAgent(text: string): string | null {
  for (const agent of KNOWN_AGENTS) {
    if (text.includes(agent)) {
      return agent;
    }
  }
  return null;
}

// Parse InfoGate HTML - looks for vessel data in any table
// InfoGate 7-column format: Date | Time(Etd) | Vessel | Callsign | Berth | Operation | Voyage
function parseVesselsFromHtml(html: string): VesselData[] {
  const seenVessels = new Map<string, VesselData>();
  
  console.log('Parsing vessels from HTML...');
  console.log('HTML length:', html.length);
  
  // Check if HTML contains known vessel names or operations (English or German)
  const vesselIndicators = ['Discharge', 'Load', 'Entladung', 'Beladung', 'Löschen', 'Laden'];
  const hasOperations = vesselIndicators.some(ind => html.includes(ind));
  console.log(`HTML contains operation keywords: ${hasOperations}`);
  
  // Try to find resultlist table first
  let tableMatch = html.match(/<table[^>]*class\s*=\s*["'][^"']*resultlist[^"']*["'][^>]*>([\s\S]*?)<\/table>/i);
  
  if (tableMatch) {
    console.log('Found resultlist table');
    const result = parseTableRowsV2(tableMatch[0], seenVessels);
    if (result.length > 0) return result;
  }
  
  // Fallback: extract ALL table rows from the entire HTML and look for vessel patterns
  console.log('Searching all rows in HTML for vessel data...');
  
  // Extract all <tr> elements from the entire HTML
  const allRows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi);
  if (!allRows) {
    console.log('No rows found in HTML');
    return [];
  }
  
  console.log(`Found ${allRows.length} total rows in HTML`);
  
  // Filter rows that look like vessel data (contain dates and operations)
  const vesselRows: string[] = [];
  for (const row of allRows) {
    // Look for date patterns (DD.MM.YYYY or DD/MM/YYYY) and operation keywords (EN/DE)
    const hasDate = /\d{1,2}[./]\d{1,2}[./]\d{4}/.test(row);
    const hasOp = /(Discharge|Load|Entladung|Beladung|Löschen|Laden)/i.test(row);
    
    if (hasDate && hasOp) {
      vesselRows.push(row);
    }
  }
  
  console.log(`Found ${vesselRows.length} rows with vessel data patterns`);
  
  if (vesselRows.length === 0) {
    // Last resort: try rows with just dates
    for (const row of allRows) {
      if (/\d{1,2}[./]\d{1,2}[./]\d{4}/.test(row) && !/<th/i.test(row)) {
        vesselRows.push(row);
      }
    }
    console.log(`Found ${vesselRows.length} rows with date patterns`);
  }
  
  // Parse the filtered rows
  return parseFilteredRows(vesselRows, seenVessels);
}

// Parse pre-filtered rows that contain vessel data
function parseFilteredRows(rows: string[], seenVessels: Map<string, VesselData>): VesselData[] {
  const vessels: VesselData[] = [];
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    
    // Extract cells
    const cellMatches = row.match(/<td[^>]*>[\s\S]*?<\/td>/gi);
    if (!cellMatches || cellMatches.length < 4) continue;
    
    const cells = cellMatches.map(c => extractText(c));
    
    // Debug first few rows
    if (i < 5) {
      console.log(`DataRow ${i}: [${cells.slice(0, 7).join(' | ')}]`);
    }
    
    // Find date column
    let dateIdx = -1;
    for (let j = 0; j < cells.length; j++) {
      if (/^\d{1,2}[./]\d{1,2}[./]\d{4}$/.test(cells[j].trim())) {
        dateIdx = j;
        break;
      }
    }
    
    if (dateIdx === -1) continue;
    
    // Find operation column
    let opIdx = -1;
    for (let j = 0; j < cells.length; j++) {
      if (/(Discharge|Load|Entladung|Beladung)/i.test(cells[j])) {
        opIdx = j;
        break;
      }
    }
    
    // Parse based on found indices
    const arrivalDate = parseDate(cells[dateIdx]);
    
    // Determine layout based on operation position
    let vesselName = '';
    let callsign: string | null = null;
    let berth: string | null = null;
    let voyageNo: string | null = null;
    let operation: string | null = null;
    let vesselNo: string | null = null;
    let arrivalTime: string | null = null;
    
    if (opIdx > 0) {
      // Time is usually after date
      const timeCell = cells[dateIdx + 1] || '';
      if (/^\d{1,2}[.:]\d{2}$/.test(timeCell.trim())) {
        arrivalTime = parseTime(timeCell);
      }
      
      // Vessel name is typically 2 positions after date (or 1 if no time)
      const vesselIdx = arrivalTime ? dateIdx + 2 : dateIdx + 1;
      vesselName = (cells[vesselIdx] || '').toUpperCase().trim();
      
      // Callsign is after vessel
      const callsignRaw = cells[vesselIdx + 1] || '';
      callsign = /^[A-Z0-9]{4,10}$/i.test(callsignRaw) ? callsignRaw.toUpperCase() : null;
      
      // Berth is before operation
      berth = cells[opIdx - 1] || null;
      
      // Parse operation
      const opResult = parseOperation(cells[opIdx]);
      operation = opResult.operation;
      vesselNo = opResult.vesselNo;
      
      // Voyage is after operation
      voyageNo = cells[opIdx + 1] || null;
    }
    
    if (!vesselName || vesselName.length < 3) continue;
    
    // Skip invalid vessel names
    const lower = vesselName.toLowerCase();
    if (['date', 'time', 'vessel', 'name', 'berth', 'load', 'discharge'].includes(lower)) continue;
    
    const key = `${vesselName}|${arrivalDate || ''}|${voyageNo || ''}`;
    
    if (seenVessels.has(key)) {
      const existing = seenVessels.get(key)!;
      if (operation && existing.operation && !existing.operation.includes(operation)) {
        existing.operation = `${existing.operation}/${operation}`;
      }
    } else {
      const vessel: VesselData = {
        vessel_name: vesselName,
        callsign,
        voyage_no: voyageNo,
        vessel_no: vesselNo,
        arrival_date: arrivalDate,
        arrival_time: arrivalTime,
        etd_date: null,
        etd_time: null,
        berth,
        operation,
        delivery_start: null,
        status: null,
        agent: null,
      };
      
      seenVessels.set(key, vessel);
      vessels.push(vessel);
    }
  }
  
  console.log(`Parsed ${vessels.length} unique vessels from filtered rows`);
  return vessels;
}

// Parse operation string like "Discharge 3958", "Load 3959", "Löschen", "Laden"
function parseOperation(text: string): { operation: string | null; vesselNo: string | null } {
  if (!text) return { operation: null, vesselNo: null };
  
  // Match English or German operation terms with optional number
  const match = text.match(/(Discharge|Load|Entladung|Beladung|Löschen|Laden)\s*(\d+)?/i);
  if (match) {
    let operation = match[1];
    // Normalize German to English
    const lower = operation.toLowerCase();
    if (lower === 'entladung' || lower === 'löschen') operation = 'Discharge';
    if (lower === 'beladung' || lower === 'laden') operation = 'Load';
    return { 
      operation, 
      vesselNo: match[2] || null 
    };
  }
  return { operation: null, vesselNo: null };
}

// Parse rows from InfoGate table - 7 column format with rowspan
function parseTableRowsV2(tableHtml: string, seenVessels: Map<string, VesselData>): VesselData[] {
  const vessels: VesselData[] = [];
  
  // Extract all rows
  const rowMatches = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  if (!rowMatches) {
    console.log('No rows found in table');
    return [];
  }
  
  console.log(`Found ${rowMatches.length} rows`);
  
  // Track rowspan cells that carry over to next rows
  const rowspanCarry: { value: string; remaining: number }[] = [];
  let rowCount = 0;
  
  for (let rowIdx = 0; rowIdx < rowMatches.length; rowIdx++) {
    const row = rowMatches[rowIdx];
    
    // Skip header rows
    if (row.includes('<th')) continue;
    
    // Extract cells (both td tags)
    const cellMatches = row.match(/<td[^>]*>[\s\S]*?<\/td>/gi);
    if (!cellMatches || cellMatches.length < 3) continue;
    
    // Build effective cell array with rowspan tracking
    // InfoGate uses rowspan for vessel info across Discharge/Load rows
    const effectiveCells: string[] = [];
    let cellIdx = 0;
    
    for (let colIdx = 0; colIdx < 10; colIdx++) {
      if (rowspanCarry[colIdx] && rowspanCarry[colIdx].remaining > 0) {
        effectiveCells.push(rowspanCarry[colIdx].value);
        rowspanCarry[colIdx].remaining--;
      } else if (cellIdx < cellMatches.length) {
        const cell = cellMatches[cellIdx];
        const text = extractText(cell);
        effectiveCells.push(text);
        
        const rowspan = getRowspan(cell);
        if (rowspan > 1) {
          rowspanCarry[colIdx] = { value: text, remaining: rowspan - 1 };
        }
        cellIdx++;
      } else {
        effectiveCells.push('');
      }
    }
    
    // Log first few data rows for debugging
    if (rowCount < 5) {
      console.log(`Row ${rowCount}: [${effectiveCells.slice(0, 7).join(' | ')}]`);
    }
    rowCount++;
    
    // InfoGate 7-column format:
    // 0: Date (21/01/2026)
    // 1: Time / ETD (05.45 or combined like "21/01/2026 15.00")
    // 2: Vessel Name (LUCY, BORCHARD, CMA CGM, etc.)
    // 3: Callsign (V2CK9)
    // 4: Berth (2, 1 / 2, etc.)
    // 5: Operation (Discharge 3958, Load 3959)
    // 6: Voyage No (717A, 0IQ2KE1MA)
    
    // Parse date - column 0
    const dateStr = effectiveCells[0] || '';
    const arrivalDate = parseDate(dateStr);
    
    // Parse time/ETD - column 1 (may contain just time or date+time)
    const timeStr = effectiveCells[1] || '';
    let arrivalTime: string | null = null;
    let etdDate: string | null = null;
    let etdTime: string | null = null;
    
    // Check if it's a combined date+time or just time
    if (timeStr.includes('/') || timeStr.includes('.') && timeStr.length > 6) {
      // It's ETD with date+time like "21/01/2026 15.00"
      const parts = timeStr.split(/\s+/);
      if (parts.length >= 2) {
        etdDate = parseDate(parts[0]);
        etdTime = parseTime(parts[1]);
      } else {
        etdTime = parseTime(parts[0]);
      }
    } else {
      // Just arrival time
      arrivalTime = parseTime(timeStr);
    }
    
    // Vessel name - column 2
    const vesselName = (effectiveCells[2] || '').toUpperCase().trim();
    
    // Skip if no vessel name and not a continuation row
    if (!vesselName && !effectiveCells[5]) continue;
    
    // Callsign - column 3
    const callsignRaw = effectiveCells[3] || '';
    const callsign = callsignRaw.match(/^[A-Z0-9]{4,10}$/i) ? callsignRaw.toUpperCase() : null;
    
    // Berth - column 4
    const berth = effectiveCells[4] || null;
    
    // Operation - column 5 (e.g., "Discharge 3958" or "Load 3959")
    const operationRaw = effectiveCells[5] || '';
    const { operation, vesselNo } = parseOperation(operationRaw);
    
    // Voyage - column 6
    const voyageNo = effectiveCells[6] || null;
    
    // Skip rows without meaningful data
    if (!vesselName && !operation) continue;
    
    // Create vessel key for deduplication (vessel + date + voyage)
    const key = `${vesselName || 'UNKNOWN'}|${arrivalDate || ''}|${voyageNo || ''}`;
    
    if (seenVessels.has(key)) {
      // Merge operations (e.g., combine Discharge and Load)
      const existing = seenVessels.get(key)!;
      if (operation && existing.operation && !existing.operation.includes(operation)) {
        existing.operation = `${existing.operation}/${operation}`;
      }
      // Fill in any missing fields from this row
      if (!existing.callsign && callsign) existing.callsign = callsign;
      if (!existing.berth && berth) existing.berth = berth;
      if (!existing.voyage_no && voyageNo) existing.voyage_no = voyageNo;
      if (!existing.arrival_time && arrivalTime) existing.arrival_time = arrivalTime;
      if (!existing.etd_date && etdDate) existing.etd_date = etdDate;
      if (!existing.etd_time && etdTime) existing.etd_time = etdTime;
    } else if (vesselName) {
      // Only create new entry if we have a vessel name
      const vessel: VesselData = {
        vessel_name: vesselName,
        callsign,
        voyage_no: voyageNo,
        vessel_no: vesselNo,
        arrival_date: arrivalDate,
        arrival_time: arrivalTime,
        etd_date: etdDate,
        etd_time: etdTime,
        berth,
        operation,
        delivery_start: null,
        status: null,
        agent: null,
      };
      
      seenVessels.set(key, vessel);
      vessels.push(vessel);
    }
  }
  
  console.log(`Parsed ${vessels.length} unique vessels`);
  
  // Log first 3 vessels for debugging
  vessels.slice(0, 3).forEach((v, i) => {
    console.log(`Vessel ${i + 1}: ${v.vessel_name} (${v.callsign}) - ${v.arrival_date} - ${v.operation} - Voyage: ${v.voyage_no}`);
  });
  
  return vessels;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    const scrapingBeeApiKey = Deno.env.get('SCRAPINGBEE_API_KEY');
    
    if (!firecrawlApiKey && !scrapingBeeApiKey) {
      console.error('No scraping API keys configured');
      return new Response(
        JSON.stringify({ success: false, error: 'No scraping API key configured (FIRECRAWL_API_KEY or SCRAPINGBEE_API_KEY)' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Fetching Eurogate InfoGate Limassol schedule...');
    console.log(`Available scrapers: Firecrawl=${!!firecrawlApiKey}, ScrapingBee=${!!scrapingBeeApiKey}`);

    const scrape = await getScheduleHtml(firecrawlApiKey, scrapingBeeApiKey);
    
    if (!scrape) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to scrape Eurogate InfoGate schedule',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Schedule loaded via ${scrape.source}. URL: ${scrape.url}`);
    console.log('HTML length:', scrape.html.length);

    // Parse vessels
    const vessels = parseVesselsFromHtml(scrape.html);
    
    console.log('Parsed vessels count:', vessels.length);

    // VALIDATION: Don't overwrite if we got 0 vessels
    if (vessels.length === 0) {
      const { count } = await supabase
        .from('limassol_vessel_schedule')
        .select('*', { count: 'exact', head: true });
      
      console.log(`Current DB has ${count} vessels, parse returned 0 - preserving existing data`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Scrape completed but no vessels parsed - existing data preserved',
          scrape_source: scrape.source,
          scrape_url: scrape.url,
          existing_vessel_count: count,
          html_preview: scrape.html.substring(0, 5000),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // VALIDATION: Require at least 3 vessels
    if (vessels.length < 3) {
      const { count } = await supabase
        .from('limassol_vessel_schedule')
        .select('*', { count: 'exact', head: true });
      
      if (count && count > vessels.length) {
        console.log(`Only parsed ${vessels.length} vessels but DB has ${count} - preserving`);
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Only parsed ${vessels.length} vessels (need 3+) - existing data preserved`,
            parsed_vessels: vessels,
            existing_vessel_count: count,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Clean old records (> 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    await supabase
      .from('limassol_vessel_schedule')
      .delete()
      .lt('scraped_at', sevenDaysAgo.toISOString());

    // Delete today's data to replace
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    await supabase
      .from('limassol_vessel_schedule')
      .delete()
      .gte('scraped_at', today.toISOString());

    // Insert new data
    const now = new Date().toISOString();
    const records = vessels.map(v => ({ ...v, scraped_at: now }));

    const { data: insertedData, error: insertError } = await supabase
      .from('limassol_vessel_schedule')
      .insert(records)
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to save vessels', details: insertError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Saved ${vessels.length} vessels successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Scraped ${vessels.length} vessels`,
        scrape_source: scrape.source,
        scrape_url: scrape.url,
        vessels: insertedData 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
