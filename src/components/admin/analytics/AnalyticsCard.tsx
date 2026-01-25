import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  subtitle?: string;
}

const AnalyticsCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-primary",
  subtitle,
}: AnalyticsCardProps) => {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) {
      return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
    if (change > 0) {
      return <TrendingUp className="h-3 w-3 text-green-500" />;
    }
    return <TrendingDown className="h-3 w-3 text-red-500" />;
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-muted-foreground";
    return change > 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change !== undefined || subtitle) && (
          <div className="flex items-center gap-1 mt-1">
            {change !== undefined && (
              <>
                {getTrendIcon()}
                <span className={cn("text-xs font-medium", getTrendColor())}>
                  {change > 0 ? "+" : ""}{change}%
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </>
            )}
            {subtitle && !change && (
              <span className="text-xs text-muted-foreground">{subtitle}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
