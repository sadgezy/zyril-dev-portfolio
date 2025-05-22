import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // Import the Navbar component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zyril Tamargo - Mobile & Web Developer", // Update title
  description: "Portfolio of Zyril Tamargo, a mobile app and web developer.", // Update description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-neutral-900 text-neutral-100`}
      >
        <Navbar /> {/* Add Navbar here */}
        {children}
      </body>
    </html>
  );
}
