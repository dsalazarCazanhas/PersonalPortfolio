import type { Experience } from "@/lib/types";

interface ExperienceTimelineProps {
  experience: Experience[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {experience.map((exp, index) => (
        <li key={index} className="relative">
          <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-semibold text-foreground">{exp.role}</h3>
            <span className="font-mono text-xs text-primary">
              {exp.start} — {exp.end}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{exp.organization}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {exp.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
