import { IconMap } from "./icons";

interface LinkButtonProps {
  title: string;
  url: string;
  icon: string;
  circle?: boolean;
}

export function LinkButton({ title, url, icon, circle }: LinkButtonProps) {
  const Icon = IconMap[icon];

  if (circle) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-card-circle group"
        aria-label={title}
      >
        {Icon && (
          <span className="link-card-circle-icon text-white transition-all duration-300">
            <Icon size={80} />
          </span>
        )}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card group flex items-center gap-4 w-full px-5 py-4"
    >
      {Icon && (
        <span className="text-white/50 group-hover:text-white/90 transition-colors duration-300">
          <Icon size={22} />
        </span>
      )}
      <span className="flex-1 text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
        {title}
      </span>
      <span className="text-white/20 group-hover:text-white/60 transition-colors duration-300">
        <ArrowIcon />
      </span>
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
