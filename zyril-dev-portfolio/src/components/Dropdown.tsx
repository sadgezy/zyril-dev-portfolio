"use client";

import React from "react";
import { useState } from "react";

const fontOptions = [
  "Bangers",
  "Caveat",
  "DM Serif Text",
  "Funnel Display",
  "Imperial Script",
  "Indie Flower",
  "Luckiest Guy",
  "Monsieur La Doulaise",
  "Montserrat",
];

export default function GuestFontSelector() {
  const [selectedFont, setSelectedFont] = useState("DM Serif Text");

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Choose Font
      </label>

      <select
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
        className="p-2 border rounded-md w-full"
      >
        {fontOptions.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      <p className="text-lg" style={{ fontFamily: selectedFont }}>
        This is a preview of the font!
      </p>
    </div>
  );
}
