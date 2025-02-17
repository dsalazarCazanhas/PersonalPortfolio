import { useEffect } from "react";

const CredlyBadge = () => {
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
      data-share-badge-id="c5cc1127-4b0f-4eac-8083-2e8006c46b32"
      data-share-badge-host="https://www.credly.com"
    ></div>
  );
};

export default CredlyBadge;
