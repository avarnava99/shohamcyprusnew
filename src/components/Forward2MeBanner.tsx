import { ExternalLink } from "lucide-react";

const Forward2MeBanner = () => {
  return (
    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 bg-muted/30">
      <div className="flex items-center gap-2 mb-3">
        <ExternalLink className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recommended Partner
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Need a UK forwarding address? Forward2Me is a trusted UK-based parcel forwarding service we recommend.
      </p>
      <a
        href="https://www.forward2me.com?atid=28cf7d9b49"
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block hover:opacity-80 transition-opacity"
      >
        <img
          src="https://www.forward2me.com/images/affiliate/logo.png"
          alt="Forward2Me — UK Parcel Forwarding Service"
          className="max-w-[200px] h-auto"
          loading="lazy"
        />
      </a>
      <p className="text-xs text-muted-foreground/60 mt-3">
        This is an external service, not provided by Shoham.
      </p>
    </div>
  );
};

export default Forward2MeBanner;
