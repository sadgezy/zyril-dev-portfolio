"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScrollApplier({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1, // Duration of the scroll animation
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
            direction: "vertical", // vertical, horizontal
            gestureDirection: "vertical", // vertical, horizontal, both
            smooth: true,
            mouseMultiplier: 1, // Multiplier for mouse wheel scroll
            smoothTouch: false, // Lenis smooth scrolling for touch devices
            touchMultiplier: 2, // Multiplier for touch scroll
            infinite: false, // Infinite scrolling
        });

        lenisRef.current = lenis;

        // Animation frame loop for Lenis
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on component unmount
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
