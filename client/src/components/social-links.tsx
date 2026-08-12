import { Mail, Copy, Check } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  onCopyEmail: () => void;
  copySuccess: boolean;
}

export function SocialLinks({
  email,
  linkedinUrl,
  githubUrl,
  onCopyEmail,
  copySuccess,
}: SocialLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <div className="group flex items-center gap-2 rounded-md border bg-card/50 px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary/40">
        <Mail className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
        <span className="font-mono text-sm">{email}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopyEmail}
          className="h-6 w-6 p-0 transition-all duration-300 hover:scale-105"
          title="Copy email address"
        >
          {copySuccess ? (
            <Check className="h-3.5 w-3.5 text-status-ok" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span className="sr-only">Copy email address</span>
        </Button>
      </div>

      <SocialIcon
        network="linkedin"
        url={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        bgColor="transparent"
        fgColor="hsl(var(--muted-foreground))"
        style={{ height: 42, width: 42 }}
      />
      <span className="sr-only">LinkedIn Profile</span>
      <SocialIcon
        network="github"
        url={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        bgColor="transparent"
        fgColor="hsl(var(--muted-foreground))"
        style={{ height: 42, width: 42 }}
      />
      <span className="sr-only">Github Profile</span>
    </div>
  );
}
