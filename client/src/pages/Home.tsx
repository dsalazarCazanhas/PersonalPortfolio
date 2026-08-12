import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SocialLinks } from "@/components/social-links";
import { DashboardPanel } from "@/components/dashboard-panel";
import { StatusPill } from "@/components/status-pill";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProjectCard } from "@/components/project-card";
import { SkillMatrix } from "@/components/skill-matrix";
import { getCV } from "@/lib/api";
import type { Experience } from "@/lib/types";
import { TypeAnimation } from "react-type-animation";
import CredlyBadge from "@/components/credly-badge";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
      <span className="text-primary">//</span> {children}
    </h2>
  );
}

function getExperienceRange(experience: Experience[]) {
  const currentYear = new Date().getFullYear();
  const starts = experience.map((exp) => parseInt(exp.start, 10));
  const ends = experience.map((exp) =>
    exp.end === "Present" ? currentYear : parseInt(exp.end, 10)
  );
  const minStart = Math.min(...starts);
  const maxEnd = Math.max(...ends);
  return { years: maxEnd - minStart, range: `${minStart} – ${maxEnd}` };
}

export default function Home() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [now, setNow] = useState(new Date());
  const cv = getCV();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleCopyContact = () => {
    navigator.clipboard.writeText(cv.contact.email);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const { years, range } = getExperienceRange(cv.experience);
  const certCount = cv.education.filter((edu) => edu.badge).length;

  const kpis = [
    { label: "Experience", value: `${years}+ yrs`, sub: range },
    { label: "Certifications", value: String(certCount), sub: "verified" },
    { label: "Skill Domains", value: String(cv.skills.length), sub: "categories" },
    { label: "Primary Role", value: cv.title[1] ?? cv.title[0], sub: "current focus" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">
        <header className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill label="Online" tone="ok" />
                <span className="font-mono text-xs text-muted-foreground">
                  {now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
              <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {cv.name}
              </h1>
              <TypeAnimation
                sequence={[...cv.title.flatMap((title) => [title, 3000])]}
                wrapper="span"
                speed={50}
                className="text-lg text-primary sm:text-xl"
                repeat={Infinity}
              />
            </div>
            <ThemeSwitcher />
          </div>
          <SocialLinks
            email={cv.contact.email}
            linkedinUrl={cv.contact.linkedin}
            githubUrl={cv.contact.github}
            onCopyEmail={handleCopyContact}
            copySuccess={copySuccess}
          />
        </header>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="bg-card/50">
              <CardContent className="p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                  {kpi.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {kpi.value}
                </p>
                <p className="text-xs text-muted-foreground">{kpi.sub}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-3">
          <SectionHeading>About</SectionHeading>
          <DashboardPanel label="$ cat about.md">
            <p className="leading-relaxed text-muted-foreground">
              {cv.about}
            </p>
          </DashboardPanel>
        </section>

        <section className="space-y-3">
          <SectionHeading>Experience</SectionHeading>
          <DashboardPanel label="$ tail -f experience.log">
            <ExperienceTimeline experience={cv.experience} />
          </DashboardPanel>
        </section>

        <section className="space-y-3">
          <SectionHeading>Projects</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {cv.projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeading>Education & Certifications</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {cv.education.map((edu, index) => (
              <DashboardPanel key={index} label="$ verify --credential">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{edu.name}</p>
                  {edu.badge && <StatusPill label="Certified" tone="ok" />}
                </div>
                {edu.badge && (
                  <div className="mt-4">
                    <CredlyBadge badgeId={edu.loader} />
                  </div>
                )}
              </DashboardPanel>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionHeading>Skills</SectionHeading>
          <SkillMatrix groups={cv.skills} />
        </section>
      </div>
    </div>
  );
}
