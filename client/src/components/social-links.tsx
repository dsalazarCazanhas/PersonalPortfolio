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
    <div className="flex">
      <div className="flex items-center gap-2 text-muted-foreground group">
        <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        <span>{email}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopyEmail}
          className="ml-2 transition-all duration-300 hover:scale-105"
          title="Copy email address"
        >
          {copySuccess ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
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
        style={{ height: 50, width: 50 }}
      />
      <span className="sr-only">LinkedIn Profile</span>
      <SocialIcon
        network="github"
        url={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        bgColor="transparent"
        fgColor="hsl(var(--muted-foreground))"
        style={{ height: 50, width: 50 }}
      />
      <span className="sr-only">Github Profile</span>
    </div>
  );
}
