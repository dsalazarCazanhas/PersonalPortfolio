import {
  Code2,
  Crosshair,
  Database,
  Server,
  ShieldCheck,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SkillGroup } from "@/lib/types";

interface SkillMatrixProps {
  groups: SkillGroup[];
}

const categoryIcons: Record<string, LucideIcon> = {
  "Offensive Security": Crosshair,
  "Defensive / Blue Team": ShieldCheck,
  "Platforms & Infrastructure": Server,
  "Data & Observability": Database,
  Development: Code2,
  "Leadership & Soft Skills": Users,
};

export function SkillMatrix({ groups }: SkillMatrixProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {groups.map((group) => {
        const Icon = categoryIcons[group.category] ?? Terminal;
        return (
          <div key={group.category} className="rounded-lg border bg-card/50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
