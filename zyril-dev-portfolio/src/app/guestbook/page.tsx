"use client";

import React, { useState } from "react";
import BackgroundShapes from "../../components/BackgroundShapes";
import GuestForm from "../../components/GuestForm";

export default function Home() {
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const width = rect.width;

    setMouseX(relativeX / width); 
  };

  return (
     <div
        className="relative min-h-screen font-sans overflow-hidden"
        style={{ background: "#0095FF" }}
        onMouseMove={handleMouseMove}
      >
        {/* Background */}
        <BackgroundShapes />

        {/* Foreground content */}
        <div className="relative z-20 flex justify-center items-center min-h-screen px-4 py-8 sm:px-8 sm:py-12">
          <main>
            <GuestForm />
          </main>
        </div>
      </div>
  );
}
