import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Inter, Silkscreen } from "next/font/google";
import { LoadingScreen } from "@/components/LoadingScreen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "GLASHER",
  description: "GLASHER — Music, Links & More",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${silkscreen.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        {/* Video overlay — between particle canvas (z-0) and content (z-10) */}
        <video
          id="bg-video"
          className="video-bg-overlay"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/glass-cube.webm" type="video/webm" />
        </video>
        <Script id="video-speed" strategy="afterInteractive">
          {`(function(){var v=document.getElementById("bg-video");if(v){v.playbackRate=0.5;v.addEventListener("loadedmetadata",function(){v.playbackRate=0.5;});}})()`}
        </Script>
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
        <Script id="particles-loader" strategy="afterInteractive">
          {`(function(){var s=document.createElement("script");s.src="/particles.js";s.onload=function(){initParticleBackground();};document.body.appendChild(s);})()`}
        </Script>
      </body>
    </html>
  );
}
