import { useEffect } from "react";

const CREDLY_SCRIPT_SRC = "https://cdn.credly.com/assets/utilities/embed.js";
let scriptPromise: Promise<void> | null = null;

function loadCredlyScript(): Promise<void> {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${CREDLY_SCRIPT_SRC}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = CREDLY_SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
  return scriptPromise;
}

interface CredlyBadgeProps {
  badgeId: string;
}

const CredlyBadge = ({ badgeId }: CredlyBadgeProps) => {
  useEffect(() => {
    loadCredlyScript();
  }, []);

  return (
    <div
      data-iframe-width="150"
      data-iframe-height="270"
      data-share-badge-id={badgeId}
      data-share-badge-host="https://www.credly.com"
    ></div>
  );
};

export default CredlyBadge;
