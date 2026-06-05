"use client";
import React, { useEffect, useState, useRef } from "react";

type Pill = { height: number; top: number; color: string };

interface BackgroundShapesProps {
  numColumns?: number;
  pillsPerColumn?: number; 
  blur?: string;
  colors?: string[]; 
}

export default function BackgroundShapes({
  numColumns = 6,
  pillsPerColumn = 10,
  blur = "blur-md",
  colors = ["#1E88E5", "#42A5F5", "#61b2f5ff", "#64B5F6", "#1976D2", "#90CAF9"],
}: BackgroundShapesProps) {
  const [offsets, setOffsets] = useState<number[]>(Array(numColumns).fill(0));
  const mouseOffset = useRef<number[]>(Array(numColumns).fill(0));
  const floatOffsets = useRef<number[]>(Array(numColumns).fill(0));
  const directions = useRef<number[]>(
    Array.from({ length: numColumns }, () => (Math.random() > 0.5 ? 1 : -1))
  );
  const speeds = useRef<number[]>(
    Array.from({ length: numColumns }, () => 0.1 + Math.random() * 0.2) 
  );

  // Add base offsets for each column so they don't start inline
  const [baseOffsets] = useState<number[]>(
    () => Array.from({ length: numColumns }, (_, i) => Math.floor(Math.random() * 120) - 90)
  );

  // generate stacked pills for each column
  const [pillSets] = useState(() =>
    Array.from({ length: numColumns }).map(() => {
      const pills: Pill[] = [];
      let currentTop = 0;

      for (let i = 0; i < pillsPerColumn; i++) {
        // Add more variety: alternate between small, medium, and large pills
        let height;
        const rand = Math.random();
        if (rand < 0.33) {
          height = 500 + Math.random() * 200; 
        } else if (rand < 0.66) {
          height = 400 + Math.random() * 200; 
        } else {
          height = 600 + Math.random() * 400;
        }
        pills.push({
          height,
          top: currentTop,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
        currentTop += height * 0.7; 
      }

      return pills;
    })
  );

  // handle mouse movement (parallax)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const y = e.clientX / window.innerHeight - 0.5;
      mouseOffset.current = Array.from({ length: numColumns }).map((_, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        return y * 30 * direction; 
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [numColumns]);

  // floating animation loop
  useEffect(() => {
    let frame: number;

    const animate = () => {
      floatOffsets.current = floatOffsets.current.map((val, i) => {
        let next = val + directions.current[i] * speeds.current[i];
        if (next > 20 || next < -20) {
          directions.current[i] *= -1; // bounce back
        }
        return next;
      });

      setOffsets(
        floatOffsets.current.map(
          (val, i) => val + mouseOffset.current[i]
        )
      );

      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [numColumns]);

  return (
    <div className="absolute inset-0 flex w-full h-full overflow-hidden">
      {pillSets.map((pills: Pill[], colIdx: number) => (
        <div
          key={colIdx}
          className="relative h-full"
          style={{
            flex: `0 0 ${100 / numColumns}%`, // equal-width columns
            transform: `translateY(${(offsets[colIdx] || 0) + baseOffsets[colIdx]}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          {pills.map((pill, pillIdx) => (
            <div
              key={pillIdx}
              className={`absolute left-1/2 -translate-x-1/2 rounded-full opacity-80 `}
              style={{
                width: "100%",
                height: pill.height,
                top: pill.top,
                backgroundColor: pill.color,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
