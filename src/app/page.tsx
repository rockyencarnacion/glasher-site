import Link from "next/link";
import { LinkButton } from "@/components/LinkButton";
import { GlitchLogo } from "@/components/GlitchLogo";
import { FlagshipPlayer } from "@/components/FlagshipPlayer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrambleText } from "@/components/ScrambleText";

const SOCIAL_CIRCLES = [
  {
    title: "Instagram",
    url: "https://www.instagram.com/glashermusic/",
    icon: "instagram",
  },
  {
    title: "TikTok",
    url: "https://www.tiktok.com/@glashermusic",
    icon: "tiktok",
  },
  {
    title: "YouTube",
    url: "https://www.youtube.com/@glashermusic",
    icon: "youtube",
  },
];

const MUSIC_CIRCLES = [
  {
    title: "Spotify",
    url: "https://open.spotify.com/artist/1RXHL363ZDGQRb5tHN54ea?si=7DJhItjDRt6hWQM6ZJTwSw",
    icon: "spotify",
  },
  {
    title: "Apple Music",
    url: "https://music.apple.com/us/artist/glasher/1614948193",
    icon: "apple-music",
  },
  {
    title: "SoundCloud",
    url: "https://soundcloud.com/glashermusic",
    icon: "soundcloud",
  },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center">
      {/* Full-width header */}
      <div className="w-full pt-32">
        <h1>
          <GlitchLogo />
        </h1>
      </div>

      {/* Tagline */}
      <ScrambleText
        text="GLASHER, the phonetic of 'glacier', an extremely large mass of ice which moves very slowly, often down a mountain valley."
        duration={4000}
        delay={600}
        className="tagline animate-fade-in"
        style={{ animationDelay: "600ms" }}
      />

      <div className="w-full max-w-md flex flex-col items-center gap-6 px-4 pt-8 pb-24">

        {/* Flagship Track */}
        <FlagshipPlayer />

        {/* Social Platform Circles */}
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "275ms" }}>
          {SOCIAL_CIRCLES.map((link) => (
            <LinkButton
              key={link.title}
              title={link.title}
              url={link.url}
              icon={link.icon}
              circle
            />
          ))}
        </div>

        {/* Bio */}
        <p
          className="tagline animate-fade-in mb-3"
          style={{ animationDelay: "100ms" }}
        >
          listen &gt; feel &gt; love
        </p>

        {/* Music Platform Circles */}
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
          {MUSIC_CIRCLES.map((link) => (
            <LinkButton
              key={link.title}
              title={link.title}
              url={link.url}
              icon={link.icon}
              circle
            />
          ))}
        </div>

        {/* YouTube Video */}
        <div className="w-full animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flagship-player">
            <div className="yt-embed">
              <iframe
                src="https://www.youtube.com/embed/BO9UndHmqn0"
                width="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="GLASHER — YouTube"
              />
            </div>
          </div>
        </div>

        {/* SoundCloud Mix */}
        <div className="w-full animate-fade-in" style={{ animationDelay: "250ms" }}>
          <div className="flagship-player">
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/glashermusic/glasher-guest-mix-with-benzi-at-dim-mak-studios-on-iheart-radio-evolution-082225&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              title="GLASHER — SoundCloud Mix"
            />
          </div>
        </div>

        {/* EPK pill */}
        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <Link href="/press" className="epk-pill epk-pill-large">
            <span className="press-kit-text" style={{ fontSize: "1.4rem" }}>
              EPK / Press Kit →
            </span>
          </Link>
        </div>

        {/* Contact tile */}
        <ScrollReveal delay={50}>
          <a href="mailto:rocky@glasher.com" className="contact-tile flagship-player">
            <div className="contact-tile-label press-kit-text">Contact</div>
            <div className="contact-tile-email press-kit-text">rocky@glasher.com</div>
          </a>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={100}>
          <p className="text-xs font-bold text-white mt-6 text-center">
            &copy; {new Date().getFullYear()} GLASHER. All rights reserved.
          </p>
        </ScrollReveal>
      </div>
    </main>
  );
}
