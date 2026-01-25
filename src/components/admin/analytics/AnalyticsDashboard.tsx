import { useState } from "react";
import { Users, Eye, Timer, MousePointerClick, BarChart3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalytics, formatDuration, formatNumber } from "@/hooks/useAnalytics";
import AnalyticsCard from "./AnalyticsCard";
import AnalyticsChart from "./AnalyticsChart";
import AnalyticsBreakdown from "./AnalyticsBreakdown";

const AnalyticsDashboard = () => {
  const [days, setDays] = useState(7);
  const { data, isLoading, error } = useAnalytics(days);

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">
          Failed to load analytics: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Date Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Visitor Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Track your website performance and visitor engagement
          </p>
        </div>
        <Tabs value={days.toString()} onValueChange={(v) => setDays(parseInt(v))}>
          <TabsList>
            <TabsTrigger value="7">7 Days</TabsTrigger>
            <TabsTrigger value="30">30 Days</TabsTrigger>
            <TabsTrigger value="90">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {isLoading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-[120px]" />
            ))}
          </>
        ) : (
          <>
            <AnalyticsCard
              title="Total Visitors"
              value={formatNumber(data?.summary.visitors || 0)}
              change={data?.summary.visitorsChange}
              icon={Users}
              iconColor="text-blue-500"
            />
            <AnalyticsCard
              title="Total Pageviews"
              value={formatNumber(data?.summary.pageviews || 0)}
              change={data?.summary.pageviewsChange}
              icon={Eye}
              iconColor="text-green-500"
            />
            <AnalyticsCard
              title="Bounce Rate"
              value={`${data?.summary.bounceRate || 0}%`}
              icon={MousePointerClick}
              iconColor="text-orange-500"
              subtitle="Single page sessions"
            />
            <AnalyticsCard
              title="Avg. Session"
              value={formatDuration(data?.summary.avgSessionDuration || 0)}
              icon={Timer}
              iconColor="text-purple-500"
              subtitle="Time on site"
            />
            <AnalyticsCard
              title="Pages / Visit"
              value={data?.summary.pageviewsPerVisit?.toFixed(1) || "0"}
              icon={BarChart3}
              iconColor="text-primary"
              subtitle="Average depth"
            />
          </>
        )}
      </div>

      {/* Chart */}
      {isLoading ? (
        <Skeleton className="h-[380px]" />
      ) : data?.timeSeries && data.timeSeries.length > 0 ? (
        <AnalyticsChart data={data.timeSeries} />
      ) : (
        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            No visitor data yet. Analytics will appear once your published site receives traffic.
          </p>
        </div>
      )}

      {/* Breakdown Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[250px]" />
            ))}
          </>
        ) : (
          <>
            <AnalyticsBreakdown
              title="Top Pages"
              data={
                data?.breakdown.pages.map((p) => ({
                  label: p.path,
                  count: p.count,
                })) || []
              }
            />
            <AnalyticsBreakdown
              title="Traffic Sources"
              data={
                data?.breakdown.sources.map((s) => ({
                  label: s.source,
                  count: s.count,
                })) || []
              }
            />
            <AnalyticsBreakdown
              title="Devices"
              data={
                data?.breakdown.devices.map((d) => ({
                  label: d.device,
                  count: d.count,
                })) || []
              }
            />
            <AnalyticsBreakdown
              title="Countries"
              data={
                data?.breakdown.countries.map((c) => ({
                  label: c.country,
                  count: c.count,
                })) || []
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
