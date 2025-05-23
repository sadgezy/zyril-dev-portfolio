'use client'; // Required for useState and useEffect

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import usePathname and useRouter

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('about');

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 60; // Adjust if needed
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      });
    }
  };

  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Get router instance

  const handleLogoClick = () => {
    if (pathname === '/') {
      scrollToSection('home'); // Scroll to home if on the main page
    } else {
      router.push('/'); // Navigate to home page if on another route
    }
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
      <div className="text-2xl font-bold text-neutral-100 cursor-pointer" onClick={handleLogoClick}>
        Zyril Tamargo
      </div>
      <ul className="list-none flex gap-8 m-0 p-0">
        {['home', 'projects', 'contact'].map((item) => (
          <li key={item}>
            {item === 'projects' ? (
              <Link
                href="/projects"
                className={`capitalize text-neutral-300 font-medium py-2 px-1 md:px-2 rounded-md cursor-pointer transition-all duration-200 hover:text-sky-300 hover:bg-neutral-700/50 ${isLinkActive(item) ? 'text-sky-400 bg-neutral-700/70' : ''}`}
              >
                {item}
              </Link>
            ) : (
              <button onClick={() => scrollToSection(item)} className={`capitalize text-neutral-300 font-medium py-2 px-1 md:px-2 rounded-md cursor-pointer transition-all duration-200 hover:text-sky-300 hover:bg-neutral-700/50 ${isLinkActive(item) ? 'text-sky-400 bg-neutral-700/70' : ''}`}>
                {item}
              </button>)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;