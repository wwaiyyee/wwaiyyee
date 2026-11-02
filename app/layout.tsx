import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "./portfolio.css";

export const metadata: Metadata = {
  title: "Wai Yee — AI, software & a little intuition",
  description: "Lee Wai Yee — First Class AI graduate from Taylor’s University, building intelligent systems and thoughtful software. Explore projects in computer vision, AI agents, and interactive experiences.",
  openGraph: {
    title: "Wai Yee — AI, software & a little intuition",
    description: "An AI graduate’s collection of intelligent systems, software, and new perspectives. Open to full-time engineering opportunities.",
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
