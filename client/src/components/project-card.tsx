import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardPanel } from "@/components/dashboard-panel";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <DashboardPanel label={`$ git clone ${project.name}.git`}>
      <div className="flex h-full flex-col gap-4">
        <div>
          <h3 className="font-semibold text-foreground">{project.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </DashboardPanel>
  );
}
