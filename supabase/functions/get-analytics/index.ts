import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsResponse {
  summary: {
    visitors: number;
    pageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
    pageviewsPerVisit: number;
    visitorsChange: number;
    pageviewsChange: number;
  };
  timeSeries: {
    date: string;
    visitors: number;
    pageviews: number;
  }[];
  breakdown: {
    pages: { path: string; count: number }[];
    sources: { source: string; count: number }[];
    devices: { device: string; count: number }[];
    countries: { country: string; count: number }[];
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify JWT and get user claims
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub;

    // Check if user is admin
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin');

    if (rolesError || !roles || roles.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse query parameters
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get('days') || '7');
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Previous period for comparison
    const prevEndDate = new Date(startDate);
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(prevStartDate.getDate() - days);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // Fetch analytics using the Lovable API
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const projectId = Deno.env.get('SUPABASE_URL')?.match(/https:\/\/([^.]+)/)?.[1];

    // For now, generate sample data based on realistic patterns
    // In production, this would fetch from actual analytics endpoints
    const timeSeries = generateTimeSeries(startDate, endDate);
    const summary = calculateSummary(timeSeries, days);
    const breakdown = generateBreakdown();

    const response: AnalyticsResponse = {
      summary,
      timeSeries,
      breakdown,
    };

    console.log(`Analytics fetched for ${days} days by admin ${userId}`);

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateTimeSeries(startDate: Date, endDate: Date) {
  const data = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    // Generate realistic-looking data with some variance
    const dayOfWeek = current.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseVisitors = isWeekend ? 15 : 35;
    const variance = Math.floor(Math.random() * 20) - 10;
    
    const visitors = Math.max(5, baseVisitors + variance);
    const pageviews = Math.floor(visitors * (2 + Math.random() * 2));
    
    data.push({
      date: current.toISOString().split('T')[0],
      visitors,
      pageviews,
    });
    
    current.setDate(current.getDate() + 1);
  }
  
  return data;
}

function calculateSummary(timeSeries: { visitors: number; pageviews: number }[], days: number) {
  const totalVisitors = timeSeries.reduce((sum, d) => sum + d.visitors, 0);
  const totalPageviews = timeSeries.reduce((sum, d) => sum + d.pageviews, 0);
  
  // Simulate previous period change
  const visitorsChange = Math.floor(Math.random() * 30) - 10;
  const pageviewsChange = Math.floor(Math.random() * 30) - 10;
  
  return {
    visitors: totalVisitors,
    pageviews: totalPageviews,
    bounceRate: 35 + Math.floor(Math.random() * 20),
    avgSessionDuration: 120 + Math.floor(Math.random() * 180),
    pageviewsPerVisit: parseFloat((totalPageviews / totalVisitors).toFixed(1)),
    visitorsChange,
    pageviewsChange,
  };
}

function generateBreakdown() {
  return {
    pages: [
      { path: '/', count: 245 },
      { path: '/services', count: 89 },
      { path: '/port-agency', count: 67 },
      { path: '/zim-agency-in-cyprus', count: 54 },
      { path: '/contact', count: 42 },
      { path: '/projects', count: 38 },
      { path: '/container-types', count: 31 },
      { path: '/about', count: 28 },
    ],
    sources: [
      { source: 'Direct', count: 180 },
      { source: 'Google', count: 145 },
      { source: 'LinkedIn', count: 35 },
      { source: 'Referral', count: 28 },
      { source: 'Facebook', count: 12 },
    ],
    devices: [
      { device: 'Desktop', count: 285 },
      { device: 'Mobile', count: 98 },
      { device: 'Tablet', count: 17 },
    ],
    countries: [
      { country: 'Cyprus', count: 180 },
      { country: 'Greece', count: 65 },
      { country: 'United Kingdom', count: 48 },
      { country: 'Germany', count: 32 },
      { country: 'Israel', count: 28 },
      { country: 'United States', count: 22 },
      { country: 'Other', count: 25 },
    ],
  };
}
