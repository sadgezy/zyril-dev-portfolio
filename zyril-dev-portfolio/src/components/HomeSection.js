"use client"; // For the onClick scroll function
import Link from "next/link";
import Image from "next/image";

const HomeSection = () => {
    // const scrollToProjects = () => { // This function is no longer used
    //   const projectsSection = document.getElementById('projects');
    //   if (projectsSection) {
    //     const navbarHeight = document.querySelector('nav')?.offsetHeight || 60;
    //     const sectionTop = projectsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    //     window.scrollTo({
    //       top: sectionTop,
    //       behavior: 'smooth',
    //     });
    //   }
    // };

    return (
        <section
            id="home"
            className="min-h-screen py-10 px-4 pt-24 md:pt-28 flex flex-col justify-center items-center text-center border-b border-neutral-700/50 bg-neutral-850" // Slightly different bg for depth, more subtle border
        >
            {/* Blurred Rounded Rectangle Container */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl max-w-4xl w-full">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
                    {/* Photo Area */}
                    <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-neutral-700/60 flex items-center justify-center overflow-hidden shadow-lg">
                        <Image
                            src={"/my_pic.jpg"}
                            alt="Zyril Tamargo"
                            width={500}
                            height={500}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {/* Text Content Area */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-50 mb-3 md:mb-4">
                            Hi, I'm Zy
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 mb-6 md:mb-8 max-w-md">
                            I turning ideas into clean, high-performing apps
                            with Flutter. I like solving real problems, and
                            keeping the vibe balanced whether I’m coding or
                            running a team game night. Off-hours, you’ll catch
                            me playing video games, or spinning up goofy web
                            pages just to make someone’s day.
                        </p>

                        {/* Use Link to navigate to the projects page */}
                        <Link
                            href="/projects"
                            className="py-3 px-8 text-base font-semibold cursor-pointer bg-sky-500 text-white border-none rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-all duration-200 transform hover:scale-105"
                        >
                            Explore My Work
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HomeSection;
