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

type ScrapeResult = {
  source: 'direct' | 'firecrawl' | 'scrapingbee';
  url: string;
  html: string;
  markdown?: string;
};

// Known shipping agents in Cyprus
const KNOWN_AGENTS = [
  'The Cyprus Shipping Co. Ltd',
  'Cyprus Shipping Co',
  'CMA CGM Cyprus Ltd',
  'CMA CGM',
  'Mediterranean Shipping Co.Cyprus Ltd',
  'Mediterranean Shipping',
  'MSC',
  'SBS Shipping',
  'Cargo Book Cyprus Ltd',
  'Salamis Shipping',
  'Shoham',
  'GAC',
  'Inchcape',
];

// Invalid vessel names to filter out
const INVALID_VESSEL_NAMES = [
  'swipe to go',
  'vessel',
  'name',
  'ship',
  'n/a',
  '',
];

async function fetchTextWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 25000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function scrapeWithScrapingBee(apiKey: string, url: string, useScenario = false): Promise<{ html: string } | null> {
  try {
    console.log(`Trying ScrapingBee for ${url} (useScenario=${useScenario})...`);
    
    // Base parameters
    const params: Record<string, string> = {
      api_key: apiKey,
      url: url,
      render_js: 'true',
      premium_proxy: 'true',
      wait_browser: 'networkidle2',
      wait: '25000',
      country_code: 'de',
    };
    
    // If using scenario, add JS to scroll and wait for vessel table
    if (useScenario) {
      // Use js_scenario to scroll and interact with the page
      const jsScenario = JSON.stringify({
        instructions: [
          { wait: 5000 },
          { scroll_y: 500 },
          { wait: 3000 },
          { scroll_y: 0 },
          { wait: 5000 },
          // Wait for table with vessel data
          { wait_for_and_click: 'table tbody tr' },
          { wait: 3000 }
        ]
      });
      params.js_scenario = jsScenario;
    }
    
    const urlParams = new URLSearchParams(params);
    
    const response = await fetchTextWithTimeout(
      `https://app.scrapingbee.com/api/v1/?${urlParams.toString()}`,
      { method: 'GET' },
      120000 // 120 second timeout
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ScrapingBee error (${response.status}):`, errorText.substring(0, 500));
      return null;
    }
    
    const html = await response.text();
    console.log(`ScrapingBee returned ${html.length} chars HTML`);
    
    if (!html || html.trim().length < 300) {
      console.log('ScrapingBee returned insufficient HTML');
      return null;
    }
    
    // Check for actual vessel schedule content
    const hasVesselContent = checkForVesselContent(html);
    console.log(`ScrapingBee analysis: hasVesselContent=${hasVesselContent}`);
    
    // Log a sample of the HTML for debugging
    console.log('ScrapingBee HTML sample:', html.substring(0, 2000));
    
    return { html };
  } catch (e) {
    console.error('ScrapingBee scrape threw:', e);
    return null;
  }
}

// Check if HTML contains actual vessel schedule data
function checkForVesselContent(html: string): boolean {
  const lower = html.toLowerCase();
  
  // Must have table structure
  if (!lower.includes('<table') || !lower.includes('<tbody')) return false;
  
  // Check for vessel-like names (e.g., "BORCHARD", "CMA CGM", "MSC")
  const vesselPatterns = [
    /BORCHARD/i, /CMA\s*CGM/i, /MSC\s+[A-Z]/i, /MAERSK/i,
    /SPIRIT/i, /PENGALIA/i, /VESSEL/i
  ];
  
  const hasVesselPattern = vesselPatterns.some(p => p.test(html));
  
  // Check for common schedule patterns
  const schedulePatterns = [
    /\d{2}[.:]\d{2}[.:]\d{4}/, // Date format
    /Load|Discharge|Delete/i,   // Operation types
    /Berth|Quay/i               // Berth references
  ];
  
  const hasSchedulePattern = schedulePatterns.some(p => p.test(html));
  
  return hasVesselPattern && hasSchedulePattern;
}

async function tryDirectHtmlFetch(url: string): Promise<{ html: string; rejected: boolean; reason?: string } | null> {
  try {
    const res = await fetchTextWithTimeout(
      url,
      {
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-GB,en;q=0.9',
        },
      },
      25000
    );

    if (!res.ok) {
      console.log(`Direct fetch failed (${res.status}) for ${url}`);
      return null;
    }

    const html = await res.text();
    console.log(`Direct fetch got ${html.length} chars from ${url}`);
    
    if (!html || html.trim().length < 200) {
      console.log(`Direct fetch returned too little HTML for ${url}`);
      return null;
    }

    const lower = html.toLowerCase();
    
    // Detect JS loader page
    if (lower.includes('class="loader"') || (lower.includes('.loader{') && lower.includes('fingerprint'))) {
      console.log(`Direct fetch returned a JS loader page for ${url} - need headless browser`);
      return { html, rejected: true, reason: 'js_loader_page' };
    }
    
    // Detect login page
    if (lower.includes('login') && (lower.includes('password') || lower.includes('username'))) {
      console.log(`Direct fetch appears to be a login page for ${url}`);
      return { html, rejected: true, reason: 'login_page' };
    }

    // Must have actual table content
    const hasTable = lower.includes('<table') && lower.includes('<tbody');
    
    if (!hasTable) {
      console.log(`Direct fetch did not contain table markup for ${url}`);
      return { html, rejected: true, reason: 'no_table' };
    }

    console.log(`Direct fetch found table content, accepting HTML`);
    return { html, rejected: false };
  } catch (e) {
    console.error(`Direct fetch threw for ${url}:`, e);
    return null;
  }
}

async function scrapeWithFirecrawl(firecrawlApiKey: string, url: string, useActions = false): Promise<{ html: string; markdown?: string } | null> {
  try {
    console.log(`Trying Firecrawl for ${url} (useActions=${useActions})...`);
    
    const requestBody: any = {
      url,
      formats: ['html', 'markdown'],
      waitFor: 25000,
      timeout: 120000,
      onlyMainContent: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
      },
    };
    
    if (useActions) {
      requestBody.url = 'https://infogate.eurogate-limassol.eu';
      requestBody.waitFor = 30000;
      requestBody.actions = [
        { type: 'wait', milliseconds: 8000 },
        { type: 'click', selector: 'a[href*="segelliste"]' },
        { type: 'wait', milliseconds: 12000 },
      ];
    }
    
    const firecrawlResponse = await fetchTextWithTimeout(
      'https://api.firecrawl.dev/v1/scrape',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
      130000
    );

    const raw = await firecrawlResponse.text();
    let firecrawlData: any;
    try {
      firecrawlData = JSON.parse(raw);
    } catch {
      console.error('Firecrawl returned non-JSON response:', raw?.slice?.(0, 500));
      return null;
    }

    if (!firecrawlResponse.ok || !firecrawlData?.success) {
      console.error('Firecrawl error:', firecrawlData);
      return null;
    }

    const html = firecrawlData.data?.html || firecrawlData.html || '';
    const markdown = firecrawlData.data?.markdown || firecrawlData.markdown || '';
    
    console.log(`Firecrawl returned ${html.length} chars HTML, ${markdown.length} chars markdown`);
    
    if (!html || html.trim().length < 300) {
      console.log('Firecrawl returned insufficient HTML');
      return null;
    }

    return { html, markdown };
  } catch (e) {
    console.error('Firecrawl scrape threw:', e);
    return null;
  }
}

async function getScheduleHtml(scrapingBeeApiKey: string | null, firecrawlApiKey: string | null): Promise<ScrapeResult | null> {
  // Primary URLs for the schedule
  const scheduleUrls = [
    'https://infogate.eurogate-limassol.eu/segelliste/state/show?_transition=start&period=1&internal=false&languageNo=30&locationCode=CYLMS&order=%2B0',
    'https://infogate.eurogate-limassol.eu/segelliste?locationCode=CYLMS&languageNo=30&period=1',
  ];

  // 1) Try ScrapingBee - first without scenario
  if (scrapingBeeApiKey) {
    for (const url of scheduleUrls) {
      const res = await scrapeWithScrapingBee(scrapingBeeApiKey, url, false);
      if (res?.html && res.html.length > 5000) {
        // Check if we got actual vessel content
        if (checkForVesselContent(res.html)) {
          console.log('ScrapingBee successfully retrieved vessel schedule');
          return { source: 'scrapingbee', url, html: res.html };
        }
        console.log('ScrapingBee got HTML but no vessel content - will try with scenario');
      }
    }
    
    // 2) Try ScrapingBee WITH js_scenario for interaction
    console.log('Trying ScrapingBee with js_scenario...');
    const scenarioRes = await scrapeWithScrapingBee(
      scrapingBeeApiKey, 
      scheduleUrls[0], 
      true
    );
    if (scenarioRes?.html && scenarioRes.html.length > 5000) {
      if (checkForVesselContent(scenarioRes.html)) {
        console.log('ScrapingBee with scenario successfully retrieved vessel schedule');
        return { source: 'scrapingbee', url: scheduleUrls[0], html: scenarioRes.html };
      }
    }
  }

  // 3) Try direct HTML fetch (unlikely to work)
  for (const url of scheduleUrls) {
    const result = await tryDirectHtmlFetch(url);
    if (result && !result.rejected) {
      return { source: 'direct', url, html: result.html };
    }
  }

  // 4) Fallback to Firecrawl
  if (firecrawlApiKey) {
    for (const url of scheduleUrls) {
      console.log(`Trying Firecrawl for ${url}...`);
      const res = await scrapeWithFirecrawl(firecrawlApiKey, url, false);
      if (res?.html && res.html.length > 5000) {
        if (checkForVesselContent(res.html)) {
          return { source: 'firecrawl', url, html: res.html, markdown: res.markdown };
        }
      }
    }

    // Try Firecrawl with portal navigation
    console.log('Trying Firecrawl with portal navigation...');
    const navRes = await scrapeWithFirecrawl(firecrawlApiKey, 'https://infogate.eurogate-limassol.eu', true);
    if (navRes?.html && navRes.html.length > 5000) {
      if (checkForVesselContent(navRes.html)) {
        return { source: 'firecrawl', url: 'https://infogate.eurogate-limassol.eu (navigated)', html: navRes.html, markdown: navRes.markdown };
      }
    }
  }

  // 5) Last resort - return whatever we have even if no vessel content
  if (scrapingBeeApiKey) {
    console.log('Returning best available HTML even without detected vessel content...');
    const res = await scrapeWithScrapingBee(scrapingBeeApiKey, scheduleUrls[0], false);
    if (res?.html && res.html.length > 5000) {
      return { source: 'scrapingbee', url: scheduleUrls[0], html: res.html };
    }
  }

  return null;
}

// Parse date formats: "21.01.2026", "21/01/2026", "January 21, 2026", "2026-01-21"
function parseDate(dateStr: string): string | null {
  if (!dateStr || !dateStr.trim()) return null;
  
  const clean = dateStr.trim();
  
  // Format: "21.01.2026" or "21/01/2026"
  let match = clean.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (match) {
    return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
  }
  
  // Format: "January 21, 2026"
  const monthNames: { [key: string]: string } = {
    'january': '01', 'february': '02', 'march': '03', 'april': '04',
    'may': '05', 'june': '06', 'july': '07', 'august': '08',
    'september': '09', 'october': '10', 'november': '11', 'december': '12'
  };
  
  match = clean.match(/^([a-zA-Z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) {
    const month = monthNames[match[1].toLowerCase()];
    if (month) {
      return `${match[3]}-${month}-${match[2].padStart(2, '0')}`;
    }
  }
  
  // Format: "2026-01-21" (already ISO)
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return clean;
  }
  
  return null;
}

// Parse time formats: "09:16", "09.16", "9:16 AM", "21:30"
function parseTime(timeStr: string): string | null {
  if (!timeStr || !timeStr.trim()) return null;
  
  const clean = timeStr.trim().replace('.', ':');
  
  // Format: "3:00 PM" or "09:16 AM"
  let match = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match) {
    let hour = parseInt(match[1], 10);
    const isPM = match[3].toUpperCase() === 'PM';
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:${match[2]}:00`;
  }
  
  // Format: "09:16" or "21:30"
  match = clean.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (match) {
    return `${match[1].padStart(2, '0')}:${match[2]}:00`;
  }
  
  return null;
}

// Extract text content from HTML, cleaning tags
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

// Check if a string looks like a valid vessel name
function isValidVesselName(name: string): boolean {
  if (!name || name.length < 3) return false;
  
  const lower = name.toLowerCase();
  if (INVALID_VESSEL_NAMES.some(inv => lower === inv || lower.includes(inv))) {
    return false;
  }
  
  // Vessel names typically are uppercase with spaces
  // Examples: "LUCY BORCHARD", "CMA CGM SAHARA", "MSC SHEILA"
  return /^[A-Z0-9][A-Z0-9\s\-\.]+[A-Z0-9]$/i.test(name) && name.length <= 50;
}

// Extract agent name from text
function extractAgent(text: string): string | null {
  for (const agent of KNOWN_AGENTS) {
    if (text.includes(agent)) {
      // Find the full agent string with potential suffix like "(CL)"
      const idx = text.indexOf(agent);
      let end = idx + agent.length;
      
      // Check for parenthetical suffix
      const remaining = text.substring(end);
      const parenMatch = remaining.match(/^\s*\([^)]+\)/);
      if (parenMatch) {
        end += parenMatch[0].length;
      }
      
      return text.substring(idx, end).trim();
    }
  }
  return null;
}

// Parse operation type: Load, Discharge, Delete
function parseOperation(text: string): string | null {
  const lower = text.toLowerCase();
  
  const operations: string[] = [];
  if (lower.includes('load')) operations.push('Load');
  if (lower.includes('discharge') || lower.includes('delete')) operations.push('Discharge');
  
  return operations.length > 0 ? operations.join('/') : null;
}

// Main parser: Extract vessel data from InfoGate HTML structure
function parseVesselsFromHtml(html: string): VesselData[] {
  const vessels: VesselData[] = [];
  const seenVessels = new Set<string>(); // Dedupe by name+date
  
  console.log('Starting vessel parsing...');
  
  // Strategy 1: Parse table rows from <tbody>
  const tbodyMatches = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/gi);
  
  if (tbodyMatches) {
    console.log(`Found ${tbodyMatches.length} tbody sections`);
    
    for (const tbody of tbodyMatches) {
      // Extract rows
      const rowMatches = tbody.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
      
      if (rowMatches) {
        console.log(`Processing ${rowMatches.length} rows in tbody`);
        
        for (const row of rowMatches) {
          // Skip header rows
          if (row.includes('<th')) continue;
          
          // Extract all cells
          const cellMatches = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
          if (!cellMatches || cellMatches.length < 5) continue;
          
          const cells = cellMatches.map(c => extractText(c));
          
          // Log first few rows for debugging
          if (vessels.length < 3) {
            console.log(`Row cells (${cells.length}):`, cells.slice(0, 10).join(' | '));
          }
          
          // Try to identify vessel name - usually the longest uppercase string
          let vesselName = '';
          let vesselNameIdx = -1;
          
          for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (isValidVesselName(cell) && cell.length > vesselName.length) {
              vesselName = cell.toUpperCase();
              vesselNameIdx = i;
            }
          }
          
          if (!vesselName) continue;
          
          // Extract other fields based on position relative to vessel name
          const vessel: VesselData = {
            vessel_name: vesselName,
            callsign: null,
            voyage_no: null,
            vessel_no: null,
            arrival_date: null,
            arrival_time: null,
            etd_date: null,
            etd_time: null,
            berth: null,
            operation: null,
            delivery_start: null,
            status: null,
            agent: null,
          };
          
          // Look for dates and times in all cells
          for (const cell of cells) {
            const date = parseDate(cell);
            if (date) {
              if (!vessel.arrival_date) {
                vessel.arrival_date = date;
              } else if (!vessel.etd_date) {
                vessel.etd_date = date;
              }
            }
            
            const time = parseTime(cell);
            if (time) {
              if (!vessel.arrival_time) {
                vessel.arrival_time = time;
              } else if (!vessel.etd_time) {
                vessel.etd_time = time;
              }
            }
          }
          
          // Look for callsign (typically 5-8 alphanumeric chars after vessel name)
          if (vesselNameIdx >= 0 && vesselNameIdx + 1 < cells.length) {
            const nextCell = cells[vesselNameIdx + 1];
            if (/^[A-Z0-9]{4,8}$/i.test(nextCell)) {
              vessel.callsign = nextCell.toUpperCase();
            }
          }
          
          // Look for berth (usually a number or number with letter like "1", "2/3", "A")
          for (const cell of cells) {
            if (/^[A-Z]?\d{1,2}(\/\d)?$/i.test(cell) && !vessel.berth) {
              vessel.berth = cell;
            }
          }
          
          // Look for operation
          const fullRowText = cells.join(' ');
          vessel.operation = parseOperation(fullRowText);
          
          // Look for agent
          vessel.agent = extractAgent(fullRowText);
          
          // Look for voyage number (usually longer numbers like "39587")
          for (const cell of cells) {
            if (/^\d{4,6}$/.test(cell) && !vessel.voyage_no) {
              vessel.voyage_no = cell;
            }
          }
          
          // Dedupe check
          const key = `${vessel.vessel_name}|${vessel.arrival_date || ''}`;
          if (!seenVessels.has(key)) {
            seenVessels.add(key);
            vessels.push(vessel);
          }
        }
      }
    }
  }
  
  // Strategy 2: If table parsing didn't work, try regex pattern matching on raw text
  if (vessels.length === 0) {
    console.log('Table parsing found 0 vessels, trying text pattern matching...');
    
    // Look for vessel name patterns in the text
    // Common patterns: "LUCY BORCHARD", "CMA CGM SAHARA", "MSC SHEILA"
    const vesselNamePattern = /\b([A-Z][A-Z\s\-\.]{3,}[A-Z])\b/g;
    const textContent = extractText(html);
    
    let match;
    while ((match = vesselNamePattern.exec(textContent)) !== null) {
      const potentialName = match[1].trim();
      
      // Filter out common false positives
      if (!isValidVesselName(potentialName)) continue;
      if (potentialName.length < 5 || potentialName.length > 40) continue;
      
      // Skip known non-vessel patterns
      const skipPatterns = [
        'EUROGATE', 'LIMASSOL', 'INFOGATE', 'CONTAINER', 'TERMINAL',
        'CYPRUS', 'SHIPPING', 'SCHEDULE', 'ARRIVAL', 'DEPARTURE',
        'BERTH', 'VESSEL', 'AGENT', 'STATUS', 'DELETE', 'JANUARY',
        'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST',
        'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER', 'MONDAY',
        'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
      ];
      
      if (skipPatterns.some(p => potentialName.includes(p))) continue;
      
      const key = potentialName;
      if (!seenVessels.has(key)) {
        seenVessels.add(key);
        
        // Try to extract context around this vessel name
        const idx = textContent.indexOf(potentialName);
        const context = textContent.substring(Math.max(0, idx - 100), idx + potentialName.length + 200);
        
        const vessel: VesselData = {
          vessel_name: potentialName,
          callsign: null,
          voyage_no: null,
          vessel_no: null,
          arrival_date: null,
          arrival_time: null,
          etd_date: null,
          etd_time: null,
          berth: null,
          operation: parseOperation(context) || null,
          delivery_start: null,
          status: null,
          agent: extractAgent(context) || null,
        };
        
        // Try to find dates/times in context
        const dateMatches = context.match(/\d{1,2}[./]\d{1,2}[./]\d{4}/g);
        if (dateMatches) {
          vessel.arrival_date = parseDate(dateMatches[0]);
          if (dateMatches[1]) vessel.etd_date = parseDate(dateMatches[1]);
        }
        
        const timeMatches = context.match(/\d{1,2}[:.]\d{2}/g);
        if (timeMatches) {
          vessel.arrival_time = parseTime(timeMatches[0]);
          if (timeMatches[1]) vessel.etd_time = parseTime(timeMatches[1]);
        }
        
        vessels.push(vessel);
      }
    }
  }
  
  console.log(`Parsed ${vessels.length} vessels total`);
  
  // Log first 3 vessels for debugging
  vessels.slice(0, 3).forEach((v, i) => {
    console.log(`Vessel ${i + 1}:`, JSON.stringify(v));
  });
  
  return vessels;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const scrapingBeeApiKey = Deno.env.get('SCRAPINGBEE_API_KEY');
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!scrapingBeeApiKey && !firecrawlApiKey) {
      console.error('No scraping API keys configured');
      return new Response(
        JSON.stringify({ success: false, error: 'No scraping API key configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Fetching Eurogate InfoGate Limassol schedule...');

    const scrape = await getScheduleHtml(scrapingBeeApiKey || null, firecrawlApiKey || null);
    
    if (!scrape) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to load Eurogate InfoGate schedule page',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = scrape.html;
    console.log(`Schedule loaded via ${scrape.source}. URL: ${scrape.url}`);
    console.log('Received HTML length:', html.length);

    // Parse vessels from HTML
    const vessels = parseVesselsFromHtml(html);
    
    console.log('Final parsed vessels count:', vessels.length);

    // VALIDATION: Don't overwrite existing data if we got 0 vessels
    if (vessels.length === 0) {
      // Check how many vessels we currently have
      const { count } = await supabase
        .from('limassol_vessel_schedule')
        .select('*', { count: 'exact', head: true });
      
      console.log(`Current DB has ${count} vessels, parse returned 0 - NOT deleting existing data`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Scrape completed but no vessels parsed - existing data preserved',
          scrape_source: scrape.source,
          scrape_url: scrape.url,
          existing_vessel_count: count,
          html_preview: html.substring(0, 3000),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // VALIDATION: Require at least 3 vessels before replacing data
    if (vessels.length < 3) {
      const { count } = await supabase
        .from('limassol_vessel_schedule')
        .select('*', { count: 'exact', head: true });
      
      if (count && count > vessels.length) {
        console.log(`Only parsed ${vessels.length} vessels but DB has ${count} - NOT replacing`);
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

    // Clear old records (older than 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { error: deleteOldError } = await supabase
      .from('limassol_vessel_schedule')
      .delete()
      .lt('scraped_at', sevenDaysAgo.toISOString());

    if (deleteOldError) {
      console.error('Error deleting old records:', deleteOldError);
    }

    // Delete today's scraped data to replace with fresh data
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { error: deleteTodayError } = await supabase
      .from('limassol_vessel_schedule')
      .delete()
      .gte('scraped_at', today.toISOString());

    if (deleteTodayError) {
      console.error('Error deleting today records:', deleteTodayError);
    }

    // Insert new vessel data
    const now = new Date().toISOString();
    const vesselRecords = vessels.map(v => ({
      ...v,
      scraped_at: now,
    }));

    const { data: insertedData, error: insertError } = await supabase
      .from('limassol_vessel_schedule')
      .insert(vesselRecords)
      .select();

    if (insertError) {
      console.error('Error inserting vessels:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to save vessel data', details: insertError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully scraped and saved ${vessels.length} vessels`);

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
    console.error('Error in limassol-vessel-schedule:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
