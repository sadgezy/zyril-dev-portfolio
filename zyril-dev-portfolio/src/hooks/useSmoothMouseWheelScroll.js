"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

// --- Configuration Constants ---
// Approximate height of a 'line' in pixels. Used when event.deltaMode is DOM_DELTA_LINE.
const LINE_HEIGHT_APPROXIMATION = 18;
// Multiplier for scroll intensity. Adjust to make scrolling faster or slower.
const SCROLL_SENSITIVITY_FACTOR = 1.0;
// Duration of the GSAP scroll animation in seconds.
const SCROLL_DURATION = 0.6;
// GSAP easing function for the scroll. 'power1.out' is responsive. 'power2.out' is a bit smoother.
const SCROLL_EASE = "power1.out";
// --- End Configuration Constants ---

export function useSmoothMouseWheelScroll() {
    useEffect(() => {
        const handleWheel = (event) => {
            // If Ctrl key is pressed, it's likely a pinch-zoom or other browser shortcut.
            // Let the browser handle this natively.
            if (event.ctrlKey) {
                return;
            }

            let scrollAmount = 0;
            switch (event.deltaMode) {
                case WheelEvent.DOM_DELTA_PIXEL: // Value is in pixels (e.g., trackpads, high-res mice)
                    scrollAmount = event.deltaY;
                    break;
                case WheelEvent.DOM_DELTA_LINE: // Value is in lines (e.g., traditional mice)
                    scrollAmount = event.deltaY * LINE_HEIGHT_APPROXIMATION;
                    break;
                case WheelEvent.DOM_DELTA_PAGE: // Value is in pages
                    scrollAmount = event.deltaY * window.innerHeight * 0.85; // Scroll by 85% of viewport height per page
                    break;
                default: // Unknown deltaMode
                    scrollAmount = event.deltaY; // Fallback, treat as pixels
            }

            // Only prevent default and animate if there's a significant vertical scroll.
            // This allows horizontal scrolling (event.deltaX) to behave natively if not handled.
            if (Math.abs(scrollAmount) < 1 && event.deltaX === 0) {
                return;
            }
            event.preventDefault();

            const currentScrollY = window.scrollY;
            let newTargetScrollY =
                currentScrollY + scrollAmount * SCROLL_SENSITIVITY_FACTOR;

            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;
            newTargetScrollY = Math.max(
                0,
                Math.min(newTargetScrollY, maxScroll)
            );

            gsap.to(window, {
                scrollTo: { y: newTargetScrollY, autoKill: false }, // autoKill: false allows updates
                duration: SCROLL_DURATION,
                ease: SCROLL_EASE,
                overwrite: "auto", // Crucial for smooth updates on continuous scrolling
            });
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
            gsap.killTweensOf(window); // Clean up GSAP animations on window
        };
    }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount
}
