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

// Define appBasePath similar to Navbar.js
const appBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const homeVariants = {
    initial: (prevPath) => ({
        // Check if previous path started with the projects base path
        x:
            prevPath && prevPath.startsWith(`${appBasePath}/projects`)
                ? "-100%"
                : "0%",
        opacity:
            prevPath && prevPath.startsWith(`${appBasePath}/projects`) ? 1 : 0,
        filter:
            prevPath && prevPath.startsWith(`${appBasePath}/projects`)
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
        // Check if previous path was the home/root path
        x:
            prevPath === appBasePath || (appBasePath === "" && prevPath === "/")
                ? "100%"
                : "0%",
        opacity:
            prevPath === appBasePath || (appBasePath === "" && prevPath === "/")
                ? 1
                : 0,
        filter:
            prevPath === appBasePath || (appBasePath === "" && prevPath === "/")
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

    // Determine which variants to use based on the current path
    let variantsToUse;
    const isHomePage =
        pathname === appBasePath || (appBasePath === "" && pathname === "/");
    const isProjectsPage = pathname.startsWith(`${appBasePath}/projects`);

    if (isHomePage) {
        variantsToUse = homeVariants;
    } else if (isProjectsPage) {
        // This will now cover /projects and /projects/[slug]
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
