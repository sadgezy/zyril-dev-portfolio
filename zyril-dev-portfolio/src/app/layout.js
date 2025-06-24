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
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-neutral-900 text-neutral-100 relative min-h-screen pb-10`} // Added relative, min-h-screen and pb-10 for footer spacing
            >
                <AnimatedBackground /> <Navbar />
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
