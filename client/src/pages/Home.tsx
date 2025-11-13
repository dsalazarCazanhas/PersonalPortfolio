import React, { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SocialLinks } from "@/components/social-links";
import { fetchCV } from "@/lib/api";
import { CV } from "@/lib/types";
import { TypeAnimation } from "react-type-animation";
import CredlyBadge from "@/components/credly-badge";

const JSONBIN_BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;

export default function Home() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [cv, setCV] = useState<CV>({
    name: "",
    title: [],
    about: "",
    contact: { email: "", linkedin: "", github: "" },
    experience: [],
    education: [],
    skills: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCV() {
      try {
        const data = await fetchCV(JSONBIN_BIN_ID, JSONBIN_API_KEY);
        setCV(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load CV data");
      } finally {
        setLoading(false);
      }
    }

    loadCV();
  }, []);

  const handleCopyContact = () => {
    navigator.clipboard.writeText(cv.contact.email);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-[250px]" />
            <Skeleton className="h-6 w-[180px]" />
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <Separator />

          <Skeleton className="h-8 w-[100px] mb-4" />
          <Skeleton className="h-[100px] w-full" />

          <Separator />

          <Skeleton className="h-8 w-[150px] mb-4" />
          {[1, 2].map((_, i) => (
            <Skeleton key={i} className="h-[80px] w-full mb-4" />
          ))}

          <Separator />

          <Skeleton className="h-8 w-[120px] mb-4" />
          {[1, 2].map((_, i) => (
            <Skeleton key={i} className="h-[60px] w-full mb-4" />
          ))}

          <Separator />

          <Skeleton className="h-8 w-[100px] mb-4" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Skeleton key={i} className="h-[30px] w-[100px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

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
          </section>
        ))}
        <Card className="mb-4">
          <CredlyBadge />
        </Card>

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
