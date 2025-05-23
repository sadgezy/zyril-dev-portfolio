'use client'; // Required for useState and useEffect

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // useRouter is not strictly needed with Link for all items
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/#home' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('about');

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 60; // Adjust if needed
      const targetY = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      gsap.to(window, {
        duration: 1.5, // Adjust duration for desired speed
        scrollTo: {
          y: targetY,
          autoKill: true, // Stops the animation if the user scrolls manually
        },
        ease: 'power4.out', // Smooth and refined deceleration, less "bouncy"

      });
    }
  };
  const pathname = usePathname(); // Get current path

  const handleLogoClick = (e) => {
    if (pathname === '/') {
      e.preventDefault(); // Prevent Link's default navigation if already on the home page
      scrollToSection('home'); // Scroll to home if on the main page
    }
    // If not on '/', Link href="/#home" will handle navigation and scroll
  };

  const handleNavItemClick = (e, navItem) => {
    // If the link is for a section on the current page (e.g., href is '/#home' and current path is '/')
    if (navItem.href.startsWith('/#') && pathname === '/') {
      e.preventDefault(); // Prevent default Link behavior
      const sectionId = navItem.id; // 'home' or 'contact'
      scrollToSection(sectionId); // Perform smooth scroll
    }
    // Otherwise (e.g., linking to /projects, or linking to /#home from /projects),
    // let the Next.js Link component handle the navigation.
  };

  useEffect(() => {
    const navElement = document.querySelector('nav');
    const currentNavbarHeight = navElement?.offsetHeight || 60;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: `-${currentNavbarHeight + 10}px 0px 0px 0px`, threshold: 0.3 }
    );

    // Only observe sections on the main page ('/')
    if (pathname === '/') {
      const sections = ['home', 'about', 'contact']; // Projects is now a separate page

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    }

    // Cleanup observer when component unmounts or pathname changes
    return () => observer.disconnect();

  }, [pathname]); // Re-run effect when pathname changes

  // Determine which link is active based on route or intersection observer state
  const isLinkActive = (item) => {
    return item === 'projects' ? pathname === '/projects' : activeSection === item && pathname === '/';
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-3 px-6 md:px-8 bg-neutral-800/20 shadow-md hover:shadow-lg z-50 transition-all duration-300 backdrop-blur-lg">
      <Link href="/#home" onClick={handleLogoClick} className="text-2xl font-bold text-neutral-100 cursor-pointer">
        Zyril Tamargo
      </Link>
      <ul className="list-none flex gap-8 m-0 p-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={(e) => handleNavItemClick(e, item)}
              className={`capitalize text-neutral-300 font-medium py-2 px-1 md:px-2 rounded-md cursor-pointer transition-all duration-200 hover:text-sky-300 hover:bg-neutral-700/50 ${
                isLinkActive(item.id) ? 'text-sky-400 bg-neutral-700/70' : ''
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