"use client";
import React, { useEffect, useState, useRef } from "react";

type Pill = { height: number; top: number; color: string };

interface BackgroundShapesProps {
    numColumns?: number;
    pillsPerColumn?: number;
    blur?: string;
    colors?: string[];
}

// A deterministic pseudo-random number generator.
// This replaces Math.random() so the Server and Client generate the EXACT same layout.
function pseudoRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export default function BackgroundShapes({
    numColumns = 6,
    pillsPerColumn = 10,
    colors = [
        "#1E88E5",
        "#42A5F5",
        "#61b2f5ff",
        "#64B5F6",
        "#1976D2",
        "#90CAF9",
    ],
}: BackgroundShapesProps) {
    const [offsets, setOffsets] = useState<number[]>(Array(numColumns).fill(0));
    const mouseOffset = useRef<number[]>(Array(numColumns).fill(0));
    const floatOffsets = useRef<number[]>(Array(numColumns).fill(0));

    // Seeded initial directions
    const directions = useRef<number[]>(
        Array.from({ length: numColumns }, (_, i) =>
            pseudoRandom(i + 100) > 0.5 ? 1 : -1,
        ),
    );

    // Seeded initial speeds
    const speeds = useRef<number[]>(
        Array.from(
            { length: numColumns },
            (_, i) => 0.1 + pseudoRandom(i + 200) * 0.2,
        ),
    );

    // Seeded base offsets
    const [baseOffsets] = useState<number[]>(() =>
        Array.from(
            { length: numColumns },
            (_, i) => Math.floor(pseudoRandom(i + 300) * 120) - 90,
        ),
    );

    // Generate stacked pills using seeded randomness for exact Client/Server matching
    const [pillSets] = useState(() =>
        Array.from({ length: numColumns }).map((_, colIndex) => {
            const pills: Pill[] = [];
            let currentTop = 0;

            for (let i = 0; i < pillsPerColumn; i++) {
                // Create a unique seed for every single pill
                const seed = colIndex * 100 + i;
                let height;

                const randHeightType = pseudoRandom(seed);
                if (randHeightType < 0.33) {
                    height = 500 + pseudoRandom(seed + 1) * 200;
                } else if (randHeightType < 0.66) {
                    height = 400 + pseudoRandom(seed + 2) * 200;
                } else {
                    height = 600 + pseudoRandom(seed + 3) * 400;
                }

                const randColorIndex = pseudoRandom(seed + 4);
                pills.push({
                    height: Math.round(height), // Round to avoid float precision mismatches
                    top: Math.round(currentTop),
                    color: colors[Math.floor(randColorIndex * colors.length)],
                });
                currentTop += height * 0.7;
            }

            return pills;
        }),
    );

    // handle mouse movement (parallax)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const y = e.clientX / window.innerHeight - 0.5;
            mouseOffset.current = Array.from({ length: numColumns }).map(
                (_, i) => {
                    const direction = i % 2 === 0 ? 1 : -1;
                    return y * 30 * direction;
                },
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [numColumns]);

    useEffect(() => {
        let frame: number;

        const animate = () => {
            floatOffsets.current = floatOffsets.current.map((val, i) => {
                let next = val + directions.current[i] * speeds.current[i];
                if (next > 20 || next < -20) {
                    directions.current[i] *= -1;
                }
                return next;
            });

            setOffsets(
                floatOffsets.current.map(
                    (val, i) => val + mouseOffset.current[i],
                ),
            );

            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [numColumns]);

    const columnWidth = Number((100 / numColumns).toFixed(4));

    return (
        <div className="absolute inset-0 flex w-full h-full overflow-hidden">
            {pillSets.map((pills: Pill[], colIdx: number) => (
                <div
                    key={colIdx}
                    className="relative h-full"
                    style={{
                        flex: `0 0 ${columnWidth}%`,
                        transform: `translateY(${Math.round((offsets[colIdx] || 0) + baseOffsets[colIdx])}px)`,
                        transition: "transform 0.1s linear",
                    }}
                >
                    {pills.map((pill, pillIdx) => (
                        <div
                            key={pillIdx}
                            className={`absolute left-1/2 -translate-x-1/2 rounded-full opacity-80 ${blur}`}
                            style={{
                                width: "100%",
                                height: `${pill.height}px`,
                                top: `${pill.top}px`,
                                backgroundColor: pill.color,
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
