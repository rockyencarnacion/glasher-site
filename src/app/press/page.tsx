import { LinkButton } from "@/components/LinkButton";
import { GlitchLogo } from "@/components/GlitchLogo";
import { StatsTile } from "@/components/StatsTile";

const PHOTOS = [
  { src: "/press/Glasher 20 2.jpg", credit: "Courtesy of DIM MAK Records" },
  { src: "/press/DSC09352.jpg", credit: "Courtesy of DIM MAK Records" },
  { src: "/press/Glasher 6.jpg", credit: "Courtesy of DIM MAK Records" },
];

export default function PressPage() {
  return (
    <div className="flex flex-col gap-16 pt-12">
      {/* Hero */}
      <section className="flex flex-col gap-4">
        <p className="tagline tagline-left">Electronic Press Kit</p>
        <h1 className="press-logo">
          <GlitchLogo />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {PHOTOS.map((photo, i) => (
            <a
              key={i}
              href={photo.src}
              download
              className="press-photo flagship-player aspect-square relative overflow-hidden block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.credit}
                className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover rounded-md"
              />
              <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-[0.15em] text-white/80 whitespace-nowrap">
                {photo.credit}
              </span>
            </a>
          ))}
        </div>
        <p className="tagline !mt-2">
          Music Artist • Producer • Creative
        </p>
        <div className="mt-6">
          <StatsTile />
        </div>
      </section>

      {/* Chart Highlight */}
      <section className="flex flex-col gap-4">
        <h2 className="press-h2">Chart Highlight</h2>
        <div className="flagship-player p-6 flex flex-col sm:flex-row items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/press/best-wishes-cover.webp"
            alt="Best Wishes — Beatport cover art"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-md object-cover flex-shrink-0"
          />
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
            <div className="press-kit-text text-6xl sm:text-7xl font-bold text-white tracking-tight">
              #5
            </div>
            <div className="press-kit-text text-sm text-neutral-200">
              on Beatport — New Trap / Future Bass
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="flex flex-col gap-4">
        <h2 className="press-h2">Bio</h2>
        <p className="bio-text leading-relaxed">
          Music for the space between feeling everything and saying nothing —
          “hard enough for the floor, honest enough to stay with you after.”
        </p>
        <p className="bio-text leading-relaxed">
          GLASHER is an emerging electronic music producer operating at the intersection of
          Trap and Future Bass (and known to get “housey”) — two of the most kinetic and
          emotionally charged subgenres in contemporary dance music. With releases through
          Dim Mak Records (Steve Aoki&apos;s storied label), a Beatport charting single, and
          multiple guest mix spots at Dim Mak Studios on iHeart Radio, GLASHER is building
          early stage momentum with credible industry validation behind him.
        </p>
        <p className="bio-text leading-relaxed italic">
          GLASHER, the phonetic of &apos;glacier&apos;, an extremely large mass of ice which
          moves very slowly, often down a mountain valley.
        </p>
      </section>

      {/* Contact */}
      <section className="flex flex-col gap-4">
        <h2 className="press-h2">Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="mailto:rocky@glasher.com" className="contact-tile flagship-player">
            <div className="contact-tile-label press-kit-text">Booking</div>
            <div className="contact-tile-email press-kit-text">rocky@glasher.com</div>
          </a>
          <a href="mailto:rocky@glasher.com" className="contact-tile flagship-player">
            <div className="contact-tile-label press-kit-text">Management</div>
            <div className="contact-tile-email press-kit-text">rocky@glasher.com</div>
          </a>
        </div>
      </section>

      {/* Download Press Kit */}
      <section className="flex justify-center">
        <a
          href="/api/press-kit"
          download="GLASHER-Press-Kit.pdf"
          className="link-card-circle press-kit-circle group"
          aria-label="Download Press Kit"
        >
          <span className="press-kit-text">
            Download<br />Press Kit
          </span>
        </a>
      </section>

      {/* Footer */}
      <p className="text-xs font-bold text-white mt-6 text-center">
        &copy; {new Date().getFullYear()} GLASHER. All rights reserved.
      </p>
    </div>
  );
}
