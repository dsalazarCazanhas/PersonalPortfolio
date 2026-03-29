import { useEffect } from "react";

interface CredlyBadgeProps {
  badgeId: string;
}

const CredlyBadge = ({ badgeId }: CredlyBadgeProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
