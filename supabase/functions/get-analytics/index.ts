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

    // Fetch real analytics from Lovable API
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const projectId = '6dbd5e21-afcc-49fc-8ea2-40df98e427fa';

    if (!lovableApiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Analytics API not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      const analyticsUrl = `https://api.lovable.dev/v1/projects/${projectId}/analytics?` +
        `startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&granularity=daily`;
      
      console.log(`Fetching analytics from: ${analyticsUrl}`);
      
      const analyticsResponse = await fetch(analyticsUrl, {
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        }
      });

      if (!analyticsResponse.ok) {
        const errorText = await analyticsResponse.text();
        console.error(`Lovable API error: ${analyticsResponse.status} - ${errorText}`);
        
        // Return empty data structure instead of failing
        const emptyResponse: AnalyticsResponse = {
          summary: {
            visitors: 0,
            pageviews: 0,
            bounceRate: 0,
            avgSessionDuration: 0,
            pageviewsPerVisit: 0,
            visitorsChange: 0,
            pageviewsChange: 0,
          },
          timeSeries: [],
          breakdown: {
            pages: [],
            sources: [],
            devices: [],
            countries: [],
          },
        };
        
        return new Response(
          JSON.stringify(emptyResponse),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const realAnalytics = await analyticsResponse.json();
      console.log(`Analytics API response:`, JSON.stringify(realAnalytics).slice(0, 500));

      // Transform Lovable API response to our format
      const response: AnalyticsResponse = transformAnalyticsResponse(realAnalytics, startDate, endDate);

      console.log(`Analytics fetched for ${days} days by admin ${userId}`);

      return new Response(
        JSON.stringify(response),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (fetchError) {
      console.error('Error fetching from Lovable API:', fetchError);
      
      // Return empty data on error
      const emptyResponse: AnalyticsResponse = {
        summary: {
          visitors: 0,
          pageviews: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
          pageviewsPerVisit: 0,
          visitorsChange: 0,
          pageviewsChange: 0,
        },
        timeSeries: [],
        breakdown: {
          pages: [],
          sources: [],
          devices: [],
          countries: [],
        },
      };
      
      return new Response(
        JSON.stringify(emptyResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Transform Lovable API response to our dashboard format
function transformAnalyticsResponse(apiData: any, startDate: Date, endDate: Date): AnalyticsResponse {
  // Handle case where API returns data in different structures
  const timeSeries = apiData.timeSeries || apiData.daily || [];
  const summary = apiData.summary || apiData.totals || {};
  const breakdown = apiData.breakdown || {};

  // Transform time series data
  const transformedTimeSeries = Array.isArray(timeSeries) 
    ? timeSeries.map((item: any) => ({
        date: item.date || item.day,
        visitors: item.visitors || item.uniqueVisitors || 0,
        pageviews: item.pageviews || item.views || 0,
      }))
    : [];

  // Calculate totals from time series if not provided in summary
  const totalVisitors = summary.visitors || 
    transformedTimeSeries.reduce((sum: number, d: any) => sum + (d.visitors || 0), 0);
  const totalPageviews = summary.pageviews || 
    transformedTimeSeries.reduce((sum: number, d: any) => sum + (d.pageviews || 0), 0);

  // Transform breakdown data
  const pages = (breakdown.pages || breakdown.topPages || []).map((p: any) => ({
    path: p.path || p.page || p.url || '/',
    count: p.count || p.views || p.pageviews || 0,
  }));

  const sources = (breakdown.sources || breakdown.referrers || []).map((s: any) => ({
    source: s.source || s.referrer || s.name || 'Direct',
    count: s.count || s.visitors || 0,
  }));

  const devices = (breakdown.devices || []).map((d: any) => ({
    device: d.device || d.type || d.name || 'Unknown',
    count: d.count || d.visitors || 0,
  }));

  const countries = (breakdown.countries || breakdown.locations || []).map((c: any) => ({
    country: c.country || c.name || c.location || 'Unknown',
    count: c.count || c.visitors || 0,
  }));

  return {
    summary: {
      visitors: totalVisitors,
      pageviews: totalPageviews,
      bounceRate: summary.bounceRate || 0,
      avgSessionDuration: summary.avgSessionDuration || summary.sessionDuration || 0,
      pageviewsPerVisit: totalVisitors > 0 
        ? parseFloat((totalPageviews / totalVisitors).toFixed(1)) 
        : 0,
      visitorsChange: summary.visitorsChange || 0,
      pageviewsChange: summary.pageviewsChange || 0,
    },
    timeSeries: transformedTimeSeries,
    breakdown: {
      pages,
      sources,
      devices,
      countries,
    },
  };
}
