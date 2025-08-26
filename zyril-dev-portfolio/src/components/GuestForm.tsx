"use client";

import React, { useState, useEffect } from "react";
import SubmitButton from "./submit_button";
import CircularSpinner from "./LoadingSpinner";
import { fontMap } from "../app/fonts";
import { Instrument_Sans } from 'next/font/google';

const ins_sans = Instrument_Sans({
  weight: '400',
  subsets: ['latin'],
});

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

export default function GuestForm() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RightText: "",
    IG: "",
    Font: fontOptions[0],
    PatrnColor1: "#FFFCB0",
    PatrnColor2: "#FF9FB2",
    TextColor1: "#92DCE5",
    TextColor2: "#0095FF",
    eye_color: "#241C51",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setSubmitted(true);
    setLoading(true);

    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .catch((err) => {
        console.error(err);
        alert("An error occurred.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-white rounded-2xl shadow-lg px-12 py-10 flex flex-col items-center">
          <CircularSpinner
            size={170}
            dotSize={90}
            dotCount={3}
            assetUrl="/shark.png"
            speed={2}
          />
          <p className="text-lg text-black font-semibold">Submitting your entry...</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (submitted) {
      const timeout = setTimeout(() => {
        setFormData({
          Name: "",
          Email: "",
          RightText: "",
          IG: "",
          Font: fontOptions[0],
          PatrnColor1: "#FFFCB0",
          PatrnColor2: "#FF9FB2",
          TextColor1: "#92DCE5",
          TextColor2: "#0095FF",
          eye_color: "#241C51",
        });
        setSubmitted(false);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [submitted]);

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div
          className="flex flex-col items-center justify-center px-10 py-12 bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage: "url('/ty_bg.png')",
            minWidth: 550,
            minHeight: 420,
          }}
        >
        <p
          className={`${ins_sans.className} text-black drop-shadow-md mt-12 text-center`}
        >
          We’ve gotten your form. Thanks for leaving a mark!
          <br />
          You will now be redirected to the home page.
        </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* Notebook page container */}
        <div
          className="top-20 relative w-[1000px] min-h-[600px] bg-no-repeat bg-contain flex flex-col items-center justify-center"
          style={{ backgroundImage: "url('/form_background.png')" }}
        >
          {/* Overlapping title */}
          <h1 className="absolute -top-40 left-1/2 -translate-x-1/2">
            <div
              className="relative w-[600px] min-h-[300px] bg-no-repeat bg-contain"
              style={{ backgroundImage: "url('/display_title.png')" }}
            ></div>
          </h1>

          <div className="grid grid-cols-2 gap-12 px-12 py-8">
            {/* Left column – text info */}
            <div className="space-y-6 pl-6">
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="border-b border-gray-400 focus:border-blue-400 focus:outline-none px-1 py-2 placeholder-gray-500 text-gray-900 w-full"
              />

              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="border-b border-gray-400 focus:border-blue-400 focus:outline-none px-1 py-2 placeholder-gray-500 text-gray-900 w-full"
              />

              <input
                type="text"
                name="IG"
                value={formData.IG}
                onChange={handleChange}
                placeholder="Instagram Handle"
                required
                className="border-b border-gray-400 focus:border-blue-400 focus:outline-none px-1 py-2 placeholder-gray-500 text-gray-900 w-full"
              />

              <textarea
                name="RightText"
                value={formData.RightText}
                onChange={handleChange}
                placeholder="Message"
                required
                rows={4}
                style={{ fontFamily: formData.Font }}
                className="border-b border-gray-400 focus:border-blue-400 focus:outline-none px-1 py-4 placeholder-gray-500 text-gray-900 resize-none w-full"
              />
            </div>

            {/* Right column – font & color pickers */}
            <div className="bg-blue-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-sm text-black text-center">
                Customize how your message looks!
              </h3>
              
              <select
                name="Font"
                value={formData.Font}
                onChange={handleChange}
                className="w-full p-3 border rounded text-black bg-white"
                style={{ fontFamily: fontMap[formData.Font] }}
              >
                {fontOptions.map((font) => (
                  <option
                    key={font}
                    value={font}
                    style={{ fontFamily: fontMap[font], color: "black" }}
                  >
                    {font}
                  </option>
                ))}
              </select>

              {/* Message Colors */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Message Colors
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="TextColor1"
                    value={formData.TextColor1}
                    onChange={handleChange}
                    className="w-10 h-10 border-4 border-black rounded cursor-pointer color-input"
                  />
                  <input
                    type="color"
                    name="TextColor2"
                    value={formData.TextColor2}
                    onChange={handleChange}
                    className="w-10 h-10 border-4 border-black rounded cursor-pointer color-input"
                  />
                </div>
              </div>

              {/* Texture Colors */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Texture Colors
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="PatrnColor1"
                    value={formData.PatrnColor1}
                    onChange={handleChange}
                    className="w-10 h-10 border-4 border-black rounded cursor-pointer color-input"
                  />
                  <input
                    type="color"
                    name="PatrnColor2"
                    value={formData.PatrnColor2}
                    onChange={handleChange}
                    className="w-10 h-10 border-4 border-black rounded cursor-pointer color-input"
                  />
                </div>
              </div>

              {/* Eye Color */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Eye Color
                </label>
                <input
                  type="color"
                  name="eye_color"
                  value={formData.eye_color}
                  onChange={handleChange}
                  className="w-10 h-10 border-4 border-black rounded cursor-pointer color-input"
                />
              </div>
            </div>
          </div>

          {/* Stickers bottom-right */}
          <img
            src="/Stickers.png"
            alt=""
            className="absolute -bottom-15 -right-20 pointer-events-none"
          />
        </div>

        {/* Submit button BELOW the notebook */}
        <div className="mt-10">
          <SubmitButton submitted={submitted} loading={loading} />
        </div>
      </form>
    </div>
  );
}
