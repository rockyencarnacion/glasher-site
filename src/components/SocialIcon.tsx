import { SocialIconMap } from "./icons";

interface SocialIconProps {
  platform: string;
  url: string;
}

export function SocialIcon({ platform, url }: SocialIconProps) {
  const Icon = SocialIconMap[platform];
  if (!Icon) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-500 hover:text-accent-hover transition-colors duration-200 hover:scale-110"
      aria-label={platform}
    >
      <Icon size={24} />
    </a>
  );
}
