import { useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Eye, Timer, TrendingDown, RefreshCw, Globe, Monitor, MapPin, FileText } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";

const chartConfig: ChartConfig = {
  visitors: { label: "Visitors", color: "hsl(var(--primary))" },
  pageviews: { label: "Pageviews", color: "hsl(var(--accent))" },
};

const AnalyticsDashboard = () => {
  const [days, setDays] = useState(30);
  const { data, loading, error, refetch } = useAnalytics(days);

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  // Merge visitors and pageviews series for the chart
  const chartData = data?.visitors.series.map((v, i) => ({
    date: v.date ? new Date(v.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "",
    visitors: v.value,
    pageviews: data.pageviews.series[i]?.value || 0,
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Visitor Analytics</h2>
          <p className="text-sm text-muted-foreground">Website traffic overview</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-muted transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <Tabs value={String(days)} onValueChange={(v) => setDays(Number(v))}>
            <TabsList>
              <TabsTrigger value="7">7d</TabsTrigger>
              <TabsTrigger value="30">30d</TabsTrigger>
              <TabsTrigger value="90">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="py-4">
            <p className="text-sm text-destructive">Failed to load analytics: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Visitors"
          value={data?.visitors.total}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          loading={loading}
        />
        <MetricCard
          title="Pageviews"
          value={data?.pageviews.total}
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
          loading={loading}
        />
        <MetricCard
          title="Bounce Rate"
          value={data?.bounceRate.total != null ? `${Math.round(data.bounceRate.total)}%` : undefined}
          icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />}
          loading={loading}
        />
        <MetricCard
          title="Avg. Session"
          value={data?.sessionDuration.total != null ? formatDuration(data.sessionDuration.total) : undefined}
          icon={<Timer className="h-4 w-4 text-muted-foreground" />}
          loading={loading}
        />
      </div>

      {/* Chart */}
      {!loading && chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Traffic Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 11 }} />
                <YAxis className="text-xs" tick={{ fontSize: 11 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  fill="var(--color-visitors)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="pageviews"
                  stroke="var(--color-pageviews)"
                  fill="var(--color-pageviews)"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Breakdowns */}
      {!loading && data && (
        <div className="grid gap-4 md:grid-cols-2">
          <BreakdownCard
            title="Top Pages"
            icon={<FileText className="h-4 w-4" />}
            items={data.breakdowns.pages}
          />
          <BreakdownCard
            title="Traffic Sources"
            icon={<Globe className="h-4 w-4" />}
            items={data.breakdowns.sources}
          />
          <BreakdownCard
            title="Devices"
            icon={<Monitor className="h-4 w-4" />}
            items={data.breakdowns.devices}
          />
          <BreakdownCard
            title="Countries"
            icon={<MapPin className="h-4 w-4" />}
            items={data.breakdowns.countries}
          />
        </div>
      )}
    </div>
  );
};

function MetricCard({
  title,
  value,
  icon,
  loading,
}: {
  title: string;
  value?: number | string;
  icon: React.ReactNode;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardDescription className="text-sm font-medium">{title}</CardDescription>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <p className="text-2xl font-bold">{value ?? "—"}</p>
        )}
      </CardContent>
    </Card>
  );
}

function BreakdownCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: { name: string; value: number }[];
}) {
  if (!items.length) return null;

  const maxVal = Math.max(...items.map((i) => i.value));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.slice(0, 8).map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate text-foreground">{item.name}</span>
                <span className="text-muted-foreground font-medium ml-2">{item.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary/60"
                  style={{ width: `${(item.value / maxVal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default AnalyticsDashboard;
