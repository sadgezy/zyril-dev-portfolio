'use client'; // For the onClick scroll function

const HomeSection = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 60;
      const sectionTop = projectsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen py-5 px-5 pt-24 md:pt-28 flex flex-col justify-center items-center text-center border-b border-neutral-700 bg-neutral-850" // Slightly different bg for depth
    >
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">Zyril Tamargo</h1>
      <p className="text-xl md:text-2xl text-neutral-300 mb-8">
        Mobile Application Developer | Crafting Digital Experiences
      </p>
      <button
        onClick={scrollToProjects}
        className="py-3 px-6 text-base font-medium cursor-pointer bg-sky-600 text-white border-none rounded-md shadow-md hover:bg-sky-700 transition-colors"
      >
        Explore My Work
      </button>
    </section>
  );
};
export default HomeSection;