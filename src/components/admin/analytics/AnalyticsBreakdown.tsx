import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BreakdownItem {
  label: string;
  count: number;
}

interface AnalyticsBreakdownProps {
  title: string;
  data: BreakdownItem[];
  maxItems?: number;
}

const AnalyticsBreakdown = ({ title, data, maxItems = 5 }: AnalyticsBreakdownProps) => {
  const displayData = data.slice(0, maxItems);
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayData.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground truncate max-w-[180px]" title={item.label}>
                {item.label}
              </span>
              <span className="font-medium">{item.count}</span>
            </div>
            <Progress 
              value={(item.count / maxCount) * 100} 
              className="h-1.5"
            />
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No data available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsBreakdown;
