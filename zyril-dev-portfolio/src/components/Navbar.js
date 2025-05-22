'use client'; // Required for useState and useEffect

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Using Link for potential future internal navigation

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

  useEffect(() => {
    const sections = ['about', 'home', 'projects', 'contact'];
    const navbarHeight = document.querySelector('nav')?.offsetHeight || 60;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: `-${navbarHeight + 10}px 0px 0px 0px`, threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.unobserve(el);
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-8 bg-neutral-800/90 shadow-lg z-50 transition-colors duration-300 backdrop-blur-md">
      <div className="text-2xl font-bold text-neutral-100 cursor-pointer" onClick={() => scrollToSection('about')}>
        Zyril Tamargo
      </div>
      <ul className="list-none flex gap-8 m-0 p-0">
        {['home', 'projects', 'contact'].map((item) => (
          <li key={item}>
            <button // Using button for semantic correctness as it triggers an action
              onClick={() => scrollToSection(item)}
              className={`capitalize text-neutral-300 font-medium pb-1 cursor-pointer transition-colors hover:text-sky-400 ${activeSection === item ? 'text-sky-400 border-b-2 border-sky-400' : 'border-b-2 border-transparent'}`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;