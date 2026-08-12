import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardPanelProps {
  label: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function DashboardPanel({
  label,
  className,
  contentClassName,
  children,
}: DashboardPanelProps) {
  return (
    <Card className={cn("flex h-full flex-col overflow-hidden py-0", className)}>
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-status-crit/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-status-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-status-ok/70" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {label}
        </span>
      </div>
      <CardContent className={cn("flex-1 p-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
