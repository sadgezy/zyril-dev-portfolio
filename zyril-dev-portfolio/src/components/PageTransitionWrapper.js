"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const transitionConfig = {
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1],
};

const blurAmount = "8px";
const fadeBlurAmount = "4px";

const homeVariants = {
    initial: (prevPath) => ({
        x: prevPath === "/projects" ? "-100%" : "0%",
        opacity: prevPath === "/projects" ? 1 : 0,
        filter:
            prevPath === "/projects"
                ? `blur(${blurAmount})`
                : `blur(${fadeBlurAmount})`,
    }),
    animate: {
        x: "0%",
        opacity: 1,
        filter: "blur(0px)",
        transition: transitionConfig,
    },
    exit: {
        x: "-100%",
        opacity: 1,
        filter: `blur(${blurAmount})`,
        transition: {
            ...transitionConfig,
            duration: transitionConfig.duration * 0.85,
        },
    },
};

const projectsVariants = {
    initial: (prevPath) => ({
        x: prevPath === "/" ? "100%" : "0%",
        opacity: prevPath === "/" ? 1 : 0,
        filter:
            prevPath === "/"
                ? `blur(${blurAmount})`
                : `blur(${fadeBlurAmount})`,
    }),
    animate: {
        x: "0%",
        opacity: 1,
        filter: "blur(0px)",
        transition: transitionConfig,
    },
    exit: {
        x: "100%",
        opacity: 1,
        filter: `blur(${blurAmount})`,
        transition: {
            ...transitionConfig,
            duration: transitionConfig.duration * 0.85,
        },
    },
};

const fallbackVariants = {
    initial: { opacity: 0, filter: `blur(${fadeBlurAmount})` },
    animate: { opacity: 1, filter: "blur(0px)", transition: transitionConfig },
    exit: {
        opacity: 0,
        filter: `blur(${fadeBlurAmount})`,
        transition: {
            ...transitionConfig,
            duration: transitionConfig.duration * 0.85,
        },
    },
};

export default function PageTransitionWrapper({ children }) {
    const pathname = usePathname();
    const previousPathnameRef = useRef(null);

    useEffect(() => {
        previousPathnameRef.current = pathname;
    }, [pathname]);

    let variantsToUse;
    if (pathname === "/") {
        variantsToUse = homeVariants;
    } else if (pathname === "/projects") {
        variantsToUse = projectsVariants;
    } else {
        variantsToUse = fallbackVariants;
    }

    return (
        <AnimatePresence
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
        >
            <motion.div
                key={pathname}
                variants={variantsToUse}
                initial="initial"
                custom={previousPathnameRef.current}
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
