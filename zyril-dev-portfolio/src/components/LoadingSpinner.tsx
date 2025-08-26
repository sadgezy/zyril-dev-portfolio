"use client";
import React from "react";
import Image from "next/image";
interface CircularSpinnerProps {
  size?: number;       // Diameter of the circle
  dotSize?: number;    // Size of each PNG
  dotCount?: number;   // Number of PNGs moving along the path
  assetUrl: string;    // Path to your PNG
  speed?: number;      // Rotation duration in seconds for one full loop
}

export default function CircularSpinner({
  size = 100,
  dotSize = 50,
  dotCount = 6,
  assetUrl,
  speed = 2,
}: CircularSpinnerProps) {
  const radius = size / 2 - dotSize / 2;
  const dots = Array.from({ length: dotCount });

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      {dots.map((_, i) => {
        const delay = -(speed / dotCount) * i; // stagger each dot

        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              width: dotSize,
              height: dotSize,
              marginLeft: -dotSize / 2,
              marginTop: -dotSize / 2,
              animation: `orbit ${speed}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <Image
              src={assetUrl}
              alt="spinner dot"
              style={{
                width: dotSize,
                height: dotSize,
                position: "absolute",
                left: radius,
                top: 0,
                transform: "scale(-1, -1)",
              }}
            />
          </div>
        );
      })}

      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
