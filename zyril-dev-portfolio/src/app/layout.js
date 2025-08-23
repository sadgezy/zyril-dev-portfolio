import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/AnimatedBackground";
import SmoothScrollApplier from "../components/SmoothScrollApplier";
import PageTransitionWrapper from "../components/PageTransitionWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Zyril Tamargo - Mobile & Web Developer",
    description: "Portfolio of Zyril Tamargo, a mobile app and web developer.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-neutral-900 text-neutral-100 relative min-h-screen pb-10`}
            >
                {/* <AnimatedBackground />
                <Navbar /> */}
                <SmoothScrollApplier>
                    <PageTransitionWrapper>{children}</PageTransitionWrapper>{" "}
                </SmoothScrollApplier>
                <footer className="absolute bottom-0 left-0 w-full py-3 text-center">
                    <p className="text-xs text-neutral-500">
                        &copy; 2025 Zyril Tamargo. All rights reserved.
                    </p>
                </footer>
            </body>
        </html>
    );
}
<svg id="clip-defs" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="notebook-holes" clipPathUnits="objectBoundingBox">
      <rect width="1" height="1" />
      {/* 10 holes spaced evenly from top to bottom */}
      <circle cx="0" cy="0.05" r="0.05" />
      <circle cx="0" cy="0.15" r="0.05" />
      <circle cx="0" cy="0.25" r="0.05" />
      <circle cx="0" cy="0.35" r="0.05" />
      <circle cx="0" cy="0.45" r="0.05" />
      <circle cx="0" cy="0.55" r="0.05" />
      <circle cx="0" cy="0.65" r="0.05" />
      <circle cx="0" cy="0.75" r="0.05" />
      <circle cx="0" cy="0.85" r="0.05" />
      <circle cx="0" cy="0.95" r="0.05" />
    </clipPath>
  </defs>
</svg>