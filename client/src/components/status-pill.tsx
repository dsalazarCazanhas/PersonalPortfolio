import { cn } from "@/lib/utils";

interface StatusPillProps {
  label: string;
  tone?: "ok" | "warn" | "crit";
  className?: string;
}

const toneClasses: Record<NonNullable<StatusPillProps["tone"]>, string> = {
  ok: "bg-status-ok/10 text-status-ok border-status-ok/30",
  warn: "bg-status-warn/10 text-status-warn border-status-warn/30",
  crit: "bg-status-crit/10 text-status-crit border-status-crit/30",
};

const dotClasses: Record<NonNullable<StatusPillProps["tone"]>, string> = {
  ok: "bg-status-ok",
  warn: "bg-status-warn",
  crit: "bg-status-crit",
};

export function StatusPill({ label, tone = "ok", className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[tone])} />
      {label}
    </span>
  );
}
