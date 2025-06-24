"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const NAV_ITEMS = [
    { id: "home", label: "Home", href: "/#home" },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "contact", label: "Contact", href: "/#contact" },
];

const appBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("about");

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight =
                document.querySelector("nav")?.offsetHeight || 60;
            const targetY =
                section.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight;

            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: targetY,
                    autoKill: true,
                },
                ease: "power4.out",
            });
        }
    };
    const pathname = usePathname();

    const isMainPage =
        pathname === appBasePath || (appBasePath === "" && pathname === "/");

    const handleLogoClick = (e) => {
        if (isMainPage) {
            e.preventDefault();
            scrollToSection("home");
        }
    };

    const handleNavItemClick = (e, navItem) => {
        if (navItem.href.startsWith("/#") && isMainPage) {
            e.preventDefault();
            const sectionId = navItem.id;
            scrollToSection(sectionId);
        }
    };

    useEffect(() => {
        const navElement = document.querySelector("nav");
        const currentNavbarHeight = navElement?.offsetHeight || 60;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: `-${currentNavbarHeight + 10}px 0px 0px 0px`,
                threshold: 0.3,
            }
        );

        if (isMainPage) {
            const sections = ["home", "about", "contact"]; // Projects is now a separate page

            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });

            return () =>
                sections.forEach((id) => {
                    const el = document.getElementById(id);
                    if (el) observer.unobserve(el);
                });
        }

        return () => observer.disconnect();
    }, [pathname]);

    const isLinkActive = (item) => {
        if (item.id === "projects") {
            return pathname.startsWith(`${appBasePath}/projects`);
        }

        return activeSection === item.id && isMainPage;
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-3 px-6 md:px-8 bg-neutral-800/20 shadow-md hover:shadow-lg z-50 transition-all duration-300 backdrop-blur-lg">
            <Link
                href="/#home"
                onClick={handleLogoClick}
                className="text-2xl font-bold text-neutral-100 cursor-pointer"
            >
                Zyril Tamargo
            </Link>
            <ul className="list-none flex gap-8 m-0 p-0">
                {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={item.href}
                            onClick={(e) => handleNavItemClick(e, item)}
                            className={`capitalize text-neutral-300 font-medium py-2 px-1 md:px-2 rounded-md cursor-pointer transition-all duration-200 hover:text-sky-300 hover:bg-neutral-700/50 ${
                                isLinkActive(item)
                                    ? "text-sky-400 bg-neutral-700/70"
                                    : ""
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default Navbar;
