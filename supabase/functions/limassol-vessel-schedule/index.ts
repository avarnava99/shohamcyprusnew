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

// Parse InfoGate HTML - handles table.resultlist with rowspan
function parseVesselsFromHtml(html: string): VesselData[] {
  const vessels: VesselData[] = [];
  const seenVessels = new Map<string, VesselData>();
  
  console.log('Parsing vessels from HTML...');
  console.log('HTML length:', html.length);
  
  // Find the resultlist table
  const tableMatch = html.match(/<table[^>]*class\s*=\s*["'][^"']*resultlist[^"']*["'][^>]*>([\s\S]*?)<\/table>/i);
  
  if (!tableMatch) {
    console.log('No resultlist table found, trying any table...');
    // Fallback: try any table with vessel data
    const anyTable = html.match(/<table[^>]*>([\s\S]*?)<\/table>/gi);
    if (anyTable) {
      console.log(`Found ${anyTable.length} tables`);
      for (const table of anyTable) {
        if (table.includes('BORCHARD') || table.includes('CMA CGM') || table.includes('MSC')) {
          console.log('Found table with vessel names');
          return parseTableRows(table, seenVessels);
        }
      }
    }
    return [];
  }
  
  console.log('Found resultlist table');
  const tableHtml = tableMatch[0];
  
  return parseTableRows(tableHtml, seenVessels);
}

// Parse rows from a table, handling rowspan
function parseTableRows(tableHtml: string, seenVessels: Map<string, VesselData>): VesselData[] {
  const vessels: VesselData[] = [];
  
  // Extract all rows
  const rowMatches = tableHtml.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  if (!rowMatches) {
    console.log('No rows found in table');
    return [];
  }
  
  console.log(`Found ${rowMatches.length} rows`);
  
  // Track rowspan cells that carry over
  const rowspanCarry: { value: string; remaining: number }[] = [];
  
  for (let rowIdx = 0; rowIdx < rowMatches.length; rowIdx++) {
    const row = rowMatches[rowIdx];
    
    // Skip header rows
    if (row.includes('<th')) continue;
    
    // Extract cells
    const cellMatches = row.match(/<td[^>]*>[\s\S]*?<\/td>/gi);
    if (!cellMatches) continue;
    
    // Build effective cell array with rowspan tracking
    const effectiveCells: string[] = [];
    let cellIdx = 0;
    
    for (let colIdx = 0; colIdx < 15; colIdx++) {
      // Check if we have a carried rowspan value for this column
      if (rowspanCarry[colIdx] && rowspanCarry[colIdx].remaining > 0) {
        effectiveCells.push(rowspanCarry[colIdx].value);
        rowspanCarry[colIdx].remaining--;
      } else if (cellIdx < cellMatches.length) {
        const cell = cellMatches[cellIdx];
        const text = extractText(cell);
        effectiveCells.push(text);
        
        // Check for rowspan
        const rowspan = getRowspan(cell);
        if (rowspan > 1) {
          rowspanCarry[colIdx] = { value: text, remaining: rowspan - 1 };
        }
        
        cellIdx++;
      }
    }
    
    if (effectiveCells.length < 5) continue;
    
    // Debug first few rows
    if (rowIdx < 5) {
      console.log(`Row ${rowIdx}: ${effectiveCells.slice(0, 8).join(' | ')}`);
    }
    
    // InfoGate column structure (from infogate.md):
    // 0: Date (21/01/2026)
    // 1: Time (05.45)
    // 2: ETD (21/01/2026 15.00)
    // 3: Vessel Name
    // 4: Callsign
    // 5: Berth
    // 6: Operation (Discharge/Load)
    // 7: Vessel No
    // 8: Voyage No
    // 9: Delivery Start
    // 10: Status
    // 11: Agent
    
    // Find vessel name - look in expected position first, then search all cells
    let vesselName = '';
    let vesselIdx = 3;
    
    if (effectiveCells[3] && isValidVesselName(effectiveCells[3])) {
      vesselName = effectiveCells[3].toUpperCase().trim();
    } else {
      // Search for vessel name in other cells
      for (let i = 0; i < effectiveCells.length; i++) {
        const cell = effectiveCells[i];
        if (cell && isValidVesselName(cell) && cell.length > vesselName.length) {
          vesselName = cell.toUpperCase().trim();
          vesselIdx = i;
        }
      }
    }
    
    if (!vesselName) continue;
    
    // Parse date and time
    let arrivalDate: string | null = null;
    let arrivalTime: string | null = null;
    let etdDate: string | null = null;
    let etdTime: string | null = null;
    
    // Column 0: Date
    if (effectiveCells[0]) {
      arrivalDate = parseDate(effectiveCells[0]);
    }
    
    // Column 1: Time
    if (effectiveCells[1]) {
      arrivalTime = parseTime(effectiveCells[1]);
    }
    
    // Column 2: ETD (combined date and time like "21/01/2026 15.00")
    if (effectiveCells[2]) {
      const etdParts = effectiveCells[2].trim().split(/\s+/);
      if (etdParts.length >= 1) {
        etdDate = parseDate(etdParts[0]);
      }
      if (etdParts.length >= 2) {
        etdTime = parseTime(etdParts[1]);
      }
    }
    
    // Other fields
    const callsign = effectiveCells[4]?.match(/^[A-Z0-9]{4,8}$/i) ? effectiveCells[4].toUpperCase() : null;
    const berth = effectiveCells[5] || null;
    const operation = effectiveCells[6] || null;
    const vesselNo = effectiveCells[7] || null;
    const voyageNo = effectiveCells[8] || null;
    const deliveryStart = effectiveCells[9] || null;
    const status = effectiveCells[10] || null;
    const agent = effectiveCells[11] ? extractAgent(effectiveCells[11]) || effectiveCells[11] : null;
    
    // Create vessel key for deduplication (vessel + date)
    const key = `${vesselName}|${arrivalDate || ''}`;
    
    if (seenVessels.has(key)) {
      // Merge operations (e.g., combine Discharge and Load)
      const existing = seenVessels.get(key)!;
      if (operation && existing.operation && !existing.operation.includes(operation)) {
        existing.operation = `${existing.operation}/${operation}`;
      }
      // Fill in any missing fields
      if (!existing.callsign && callsign) existing.callsign = callsign;
      if (!existing.berth && berth) existing.berth = berth;
      if (!existing.agent && agent) existing.agent = agent;
      if (!existing.voyage_no && voyageNo) existing.voyage_no = voyageNo;
    } else {
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
        delivery_start: deliveryStart,
        status,
        agent,
      };
      
      seenVessels.set(key, vessel);
      vessels.push(vessel);
    }
  }
  
  console.log(`Parsed ${vessels.length} vessels`);
  
  // Log first 3 vessels
  vessels.slice(0, 3).forEach((v, i) => {
    console.log(`Vessel ${i + 1}: ${v.vessel_name} (${v.callsign}) - ${v.arrival_date} ${v.arrival_time} - Agent: ${v.agent}`);
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
