"use client";
import { useEffect, useRef, useState } from "react";

const projects = [
    {
        title: "Fleet Maintenance and Tracking App",
        desc: "Request and track vehicle repairs via SharePoint backend.",
    },
    {
        title: "Bill Splitter App",
        desc: "Split bills with contacts and track money you're owed.",
    },
    {
        title: "Elbeds",
        desc: "Web app for finding accommodations in Los Baños, Laguna.",
    },
];

const StatusBar = () => (
    <div
        className="flex items-center justify-between px-6 text-neutral-700 text-xs font-sans select-none"
        style={{ height: 24 }}
    >
        <div className="w-1/3 flex justify-start">
            <span className="text-neutral-700 font-semibold text-sm leading-none">
                9:41 AM
            </span>
        </div>
        <div className="w-1/3" />
        <div className="flex items-center space-x-3 w-1/3 justify-end">
            <div className="flex items-end space-x-[2px]">
                {" "}
                {[1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        style={{ height: `${level * 3 + 2}px`, width: "2px" }}
                        className="bg-neutral-700 rounded-sm"
                    />
                ))}
            </div>
            <span className="text-[9px] font-semibold tracking-wide">
                ZyrilNet
            </span>
            <div className="text-[8px] font-bold border border-neutral-700 rounded px-1 leading-none">
                VoLTE
            </div>
            <svg
                className="h-4 w-4 stroke-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
            >
                <path d="M5 12.55a8 8 0 0114 0M1.42 9a12 12 0 0119.16 0M8.53 16.11a4 4 0 016.95 0M12 20h.01" />
            </svg>
            <svg
                className="w-6 h-4 stroke-neutral-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 12"
            >
                <rect x="1" y="2" width="18" height="8" rx="2" ry="2" />
                <rect
                    x="20"
                    y="4"
                    width="2"
                    height="4"
                    rx="1"
                    ry="1"
                    fill="currentColor"
                />
                <rect
                    x="3"
                    y="4"
                    width="14"
                    height="4"
                    rx="1"
                    ry="1"
                    fill="currentColor"
                />
            </svg>
        </div>
    </div>
);

const About = () => {
    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const dragStart = useRef(0);
    const scrollStart = useRef(0);

    useEffect(() => {
        const scrollEl = scrollRef.current;
        if (!scrollEl) return;

        const handleMouseDown = (e) => {
            isDragging.current = true;
            dragStart.current = e.clientY;
            scrollStart.current = scrollEl.scrollTop;
            scrollEl.style.cursor = "grabbing";
        };

        const handleMouseMove = (e) => {
            if (!isDragging.current) return;
            const deltaY = e.clientY - dragStart.current;
            scrollEl.scrollTop = scrollStart.current - deltaY;
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            scrollEl.style.cursor = "grab";
        };

        scrollEl.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            scrollEl.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <section
            id="about"
            className="min-h-screen py-10 px-5 pt-24 md:pt-28 flex flex-col items-center text-center border-b border-neutral-700 bg-neutral-900"
        >
            <p className="text-neutral-300 text-lg max-w-2xl mb-10 px-2">
                Check out and explore some of the projects I’ve made!
            </p>

            <div className="flex justify-center w-full">
                <div
                    className="w-[700px] h-[460px] bg-neutral-800/40 backdrop-blur-md rounded-[24px] p-3 shadow-2xl border border-neutral-600 relative flex flex-col overflow-hidden"
                    style={{
                        borderWidth: "0.8px",
                        boxShadow:
                            "0 0 6px 0 rgba(255, 255, 255, 0.03), inset 0 0 1px 0 rgba(255, 255, 255, 0.12)",
                    }}
                >
                    <div
                        ref={scrollRef}
                        className="hide-scrollbar bg-white text-neutral-800 flex-grow rounded-[20px] p-6 overflow-y-auto text-left z-0 space-y-6 cursor-grab select-none"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        <StatusBar />

                        <p className="text-base text-neutral-700 leading-relaxed mt-3">
                            I build Flutter apps that feel intuitive, perform
                            smoothly, and solve real-world problems — from GPS
                            features to SharePoint integration.
                        </p>
                        <p className="text-base text-neutral-700 leading-relaxed">
                            I’m all about clean builds, good UX, and a bit of
                            personality in every project. Here’s some of what
                            I’ve made:
                        </p>

                        <div className="space-y-5 pb-8">
                            {projects.map((proj, idx) => (
                                <div
                                    key={idx}
                                    className="bg-neutral-100 border border-neutral-300 rounded-xl px-6 py-5 shadow-sm"
                                >
                                    <h3 className="text-lg font-bold text-neutral-800">
                                        {proj.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600">
                                        {proj.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="self-center w-[180px] h-[8px] bg-gray-600 rounded-full mt-6 mb-3" />
                </div>
            </div>
        </section>
    );
};

export default About;
