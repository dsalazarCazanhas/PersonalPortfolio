import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SocialLinks } from "@/components/social-links";
import { getCV } from "@/lib/api";
import { TypeAnimation } from "react-type-animation";
import CredlyBadge from "@/components/credly-badge";

export default function Home() {
  const [copySuccess, setCopySuccess] = useState(false);
  const cv = getCV();

  const handleCopyContact = () => {
    navigator.clipboard.writeText(cv.contact.email);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <ThemeSwitcher />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{cv.name}</h1>
          <div className="mt-2">
            <TypeAnimation
              sequence={[
                ...cv.title.flatMap((title) => [title, 3000]), // Loop through all titles with 3s delay each
              ]}
              wrapper="span"
              speed={50}
              className="text-xl text-muted-foreground"
              repeat={Infinity}
            />
          </div>
          <SocialLinks
            email={cv.contact.email}
            linkedinUrl={cv.contact.linkedin}
            githubUrl={cv.contact.github}
            onCopyEmail={handleCopyContact}
            copySuccess={copySuccess}
          />
        </div>

        <Separator />

        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <section className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-muted-foreground leading-relaxed">{cv.about}</p>
        </section>

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        {cv.experience.map((exp, index) => (
          <section
            key={index}
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-4"
          >
            <p className="text-muted-foreground">{exp}</p>
          </section>
        ))}

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        {cv.education.map((edu, index) => (
          <section
            key={index}
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-4"
          >
            <p className="text-muted-foreground">{edu.name}</p>
            {edu.badge && <CredlyBadge badgeId={edu.loader} />}
          </section>
        ))}

        <Separator className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <section className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
