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
  source: 'direct' | 'firecrawl';
  url: string;
  html: string;
  markdown?: string;
};

async function fetchTextWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 25000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
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
    
    // Detect JS loader page - this is what InfoGate returns before JS executes
    if (lower.includes('class="loader"') || (lower.includes('.loader{') && lower.includes('fingerprint'))) {
      console.log(`Direct fetch returned a JS loader page for ${url} - need headless browser`);
      return { html, rejected: true, reason: 'js_loader_page' };
    }
    
    // Detect probable login page
    if (lower.includes('login') && (lower.includes('password') || lower.includes('username'))) {
      console.log(`Direct fetch appears to be a login page for ${url}`);
      return { html, rejected: true, reason: 'login_page' };
    }

    // Must have actual table content for vessel schedule
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
    
    // Build request body with settings optimized for JS-heavy pages
    const requestBody: any = {
      url,
      formats: ['html', 'markdown'],
      waitFor: 25000, // Wait longer for JS to fully render
      timeout: 120000, // 2 minute timeout
      onlyMainContent: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    };
    
    // If using actions, navigate from the portal homepage to the schedule
    if (useActions) {
      requestBody.url = 'https://infogate.eurogate-limassol.eu';
      requestBody.waitFor = 30000;
      requestBody.actions = [
        { type: 'wait', milliseconds: 8000 }, // Wait for initial page load
        { type: 'click', selector: 'a[href*="segelliste"]' }, // Click schedule link
        { type: 'wait', milliseconds: 12000 }, // Wait for schedule to load
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
      130000 // Slightly more than the Firecrawl timeout
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
    
    // Log more context for debugging
    if (html.length > 100) {
      console.log('Firecrawl HTML title:', html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || 'no title');
      console.log('Firecrawl has table:', html.toLowerCase().includes('<table'));
      console.log('Firecrawl has tbody:', html.toLowerCase().includes('<tbody'));
    }
    
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

async function getScheduleHtml(firecrawlApiKey: string): Promise<ScrapeResult | null> {
  // Primary URL - the exact working pattern from user's browser
  // Note: _state and _unique are session tokens that may expire, but the server might accept requests without them
  const scheduleUrls = [
    // Try without session tokens first (server may generate new ones)
    'https://infogate.eurogate-limassol.eu/segelliste/state/show?_transition=start&period=1&internal=false&languageNo=30&locationCode=CYLMS&order=%2B0',
    // Base entry point
    'https://infogate.eurogate-limassol.eu/segelliste?locationCode=CYLMS&languageNo=30&period=1',
  ];

  // 1) Try direct HTML fetch first (unlikely to work due to JS requirements)
  for (const url of scheduleUrls) {
    const result = await tryDirectHtmlFetch(url);
    if (result && !result.rejected) {
      return { source: 'direct', url, html: result.html };
    }
    if (result?.rejected) {
      console.log(`Direct fetch rejected for ${url}: ${result.reason}`);
    }
  }

  // 2) Use Firecrawl with extended wait time for JS rendering
  // The key is to let the page fully render its JavaScript
  for (const url of scheduleUrls) {
    console.log(`Trying Firecrawl with extended JS wait for ${url}...`);
    const res = await scrapeWithFirecrawl(firecrawlApiKey, url, false);
    if (res?.html) {
      const lower = res.html.toLowerCase();
      // Check for actual vessel data indicators
      if (lower.includes('<table') && (lower.includes('vessel') || lower.includes('<tbody'))) {
        console.log('Firecrawl found table with vessel data');
        return { source: 'firecrawl', url, html: res.html, markdown: res.markdown };
      }
      console.log(`Firecrawl returned HTML but no vessel table for ${url}`);
      // Log a snippet to help debug
      console.log('HTML snippet:', res.html.substring(0, 1500));
    }
  }

  // 3) Try Firecrawl starting from the main portal and navigating
  console.log('Trying Firecrawl with portal navigation...');
  const navRes = await scrapeWithFirecrawl(firecrawlApiKey, 'https://infogate.eurogate-limassol.eu', true);
  if (navRes?.html) {
    const lower = navRes.html.toLowerCase();
    if (lower.includes('<table') && lower.includes('<tbody')) {
      return { source: 'firecrawl', url: 'https://infogate.eurogate-limassol.eu (navigated)', html: navRes.html, markdown: navRes.markdown };
    }
  }

  return null;
}

function parseDateTime(dateStr: string, timeStr: string): { date: string | null; time: string | null } {
  // Parse date format: "20/01/2026" -> "2026-01-20"
  // Parse time format: "06.30" or "06:30" -> "06:30:00"
  
  let parsedDate: string | null = null;
  let parsedTime: string | null = null;
  
  if (dateStr && dateStr.trim()) {
    const dateParts = dateStr.trim().split('/');
    if (dateParts.length === 3) {
      parsedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }
  }
  
  if (timeStr && timeStr.trim()) {
    const cleanTime = timeStr.trim().replace('.', ':');
    if (cleanTime.includes(':')) {
      const timeParts = cleanTime.split(':');
      parsedTime = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}:00`;
    }
  }
  
  return { date: parsedDate, time: parsedTime };
}

function parseVesselRow(row: string): VesselData | null {
  // The HTML table has these columns:
  // Date, Time, Departure (Etd), Vessel name, Callsign, Berth, Disc/Load, Vessel no, Voyage no, Delivery start, State, Agent
  
  // Extract cell contents - look for patterns in the HTML
  const cellPattern = /<td[^>]*>([^<]*(?:<[^>]*>[^<]*)*)<\/td>/gi;
  const cells: string[] = [];
  let match;
  
  while ((match = cellPattern.exec(row)) !== null) {
    // Clean HTML tags and get text content
    let cellContent = match[1]
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    cells.push(cellContent);
  }
  
  if (cells.length < 10) {
    return null;
  }
  
  // Parse the cells based on observed structure
  // [0] Date, [1] Time, [2] ETD Date, [3] ETD Time, [4] Vessel name, [5] Callsign, [6] Berth, 
  // [7] Disc/Load with vessel no, [8] Voyage no, [9] Delivery start, [10] State/Agent combined
  
  const arrivalDate = cells[0] || '';
  const arrivalTime = cells[1] || '';
  const etdDateRaw = cells[2] || '';
  const etdTimeRaw = cells[3] || '';
  const vesselName = cells[4] || '';
  const callsign = cells[5] || '';
  const berth = cells[6] || '';
  const operationAndVesselNo = cells[7] || '';
  const voyageNo = cells[8] || '';
  const deliveryStart = cells[9] || '';
  const stateAndAgent = cells.slice(10).join(' ') || '';
  
  if (!vesselName || vesselName.length < 2) {
    return null;
  }
  
  // Parse arrival date/time
  const arrival = parseDateTime(arrivalDate, arrivalTime);
  
  // Parse ETD - might be in format "20/01/2026 23.30" combined or separate
  let etdDate = etdDateRaw;
  let etdTime = etdTimeRaw;
  
  // Check if ETD is combined in one cell
  if (etdDateRaw.includes('/') && etdDateRaw.includes('.')) {
    const parts = etdDateRaw.split(' ');
    etdDate = parts[0] || '';
    etdTime = parts[1] || '';
  }
  
  const etd = parseDateTime(etdDate, etdTime);
  
  // Parse operation (Discharge/Load) and vessel number
  let operation = '';
  let vesselNo = '';
  
  if (operationAndVesselNo.includes('Discharge')) {
    operation = 'Discharge';
  }
  if (operationAndVesselNo.includes('Load')) {
    operation = operation ? `${operation}/Load` : 'Load';
  }
  
  // Extract vessel number (usually a number in the cell)
  const vesselNoMatch = operationAndVesselNo.match(/(\d+)/);
  if (vesselNoMatch) {
    vesselNo = vesselNoMatch[1];
  }
  
  // Parse agent from the last cells
  let agent = stateAndAgent;
  let status = '';
  
  // Common agent patterns
  const agentPatterns = [
    'SBS Shipping',
    'Salamis Shipping',
    'Cyprus Shipping',
    'CMA CGM',
    'Shoham',
    'GAC',
    'Inchcape',
    'Mediterranean Shipping'
  ];
  
  for (const pattern of agentPatterns) {
    if (stateAndAgent.toLowerCase().includes(pattern.toLowerCase())) {
      const idx = stateAndAgent.toLowerCase().indexOf(pattern.toLowerCase());
      agent = stateAndAgent.substring(idx).trim();
      status = stateAndAgent.substring(0, idx).trim();
      break;
    }
  }
  
  // Parse delivery start timestamp
  let deliveryStartParsed: string | null = null;
  if (deliveryStart && deliveryStart.includes('/')) {
    const parts = deliveryStart.split(' ');
    const dateTime = parseDateTime(parts[0], parts[1] || '');
    if (dateTime.date) {
      deliveryStartParsed = `${dateTime.date}T${dateTime.time || '00:00:00'}`;
    }
  }
  
  return {
    vessel_name: vesselName,
    callsign: callsign || null,
    voyage_no: voyageNo || null,
    vessel_no: vesselNo || null,
    arrival_date: arrival.date,
    arrival_time: arrival.time,
    etd_date: etd.date,
    etd_time: etd.time,
    berth: berth || null,
    operation: operation || null,
    delivery_start: deliveryStartParsed,
    status: status || null,
    agent: agent || null,
  };
}

function parseVesselsFromHtml(html: string): VesselData[] {
  const vessels: VesselData[] = [];
  
  // Find the table body and extract rows
  const tableBodyMatch = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/gi);
  
  if (!tableBodyMatch) {
    console.log('No table body found in HTML');
    return vessels;
  }
  
  for (const tbody of tableBodyMatch) {
    // Extract each row
    const rowPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rowMatch;
    
    while ((rowMatch = rowPattern.exec(tbody)) !== null) {
      const row = rowMatch[1];
      
      // Skip header rows
      if (row.includes('<th')) {
        continue;
      }
      
      const vessel = parseVesselRow(row);
      if (vessel) {
        vessels.push(vessel);
      }
    }
  }
  
  return vessels;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Fetching Eurogate InfoGate Limassol schedule (direct fetch → Firecrawl fallback)...');

    const scrape = await getScheduleHtml(firecrawlApiKey);
    if (!scrape) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to load Eurogate InfoGate schedule page',
          hint: 'If InfoGate requires authentication from your network, we may need credentials or an allow-listed IP.',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = scrape.html;
    const markdown = scrape.markdown || '';

    console.log(`Schedule loaded via ${scrape.source}. URL: ${scrape.url}`);
    console.log('Received HTML length:', html.length);
    if (markdown) console.log('Received Markdown length:', markdown.length);

    // Parse vessels from HTML
    let vessels = parseVesselsFromHtml(html);
    
    console.log('Parsed vessels count:', vessels.length);

    // If HTML parsing didn't work well, try parsing from markdown
    if (vessels.length === 0 && markdown) {
      console.log('Attempting to parse from markdown...');
      
      // Parse markdown table format
      const lines = markdown.split('\n');
      let inTable = false;
      let headerPassed = false;
      
      for (const line of lines) {
        if (line.includes('|') && line.includes('Vessel')) {
          inTable = true;
          continue;
        }
        
        if (inTable && line.includes('---')) {
          headerPassed = true;
          continue;
        }
        
        if (inTable && headerPassed && line.includes('|')) {
          const cells: string[] = line.split('|').map((c: string) => c.trim()).filter((c: string) => c);
          
          if (cells.length >= 8) {
            // Try to extract data from markdown table cells
            const vesselName = cells.find((c: string) => /^[A-Z\s]+$/.test(c) && c.length > 3) || cells[3] || '';
            
            if (vesselName && vesselName.length > 2) {
              vessels.push({
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
              });
            }
          }
        }
      }
    }

    if (vessels.length === 0) {
      console.log('No vessels parsed, returning raw data for debugging');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Scrape completed but no vessels parsed',
          scrape_source: scrape.source,
          scrape_url: scrape.url,
          html_preview: html.substring(0, 2000),
          markdown_preview: markdown.substring(0, 2000)
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clear old records (older than 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { error: deleteError } = await supabase
      .from('limassol_vessel_schedule')
      .delete()
      .lt('scraped_at', sevenDaysAgo.toISOString());

    if (deleteError) {
      console.error('Error deleting old records:', deleteError);
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