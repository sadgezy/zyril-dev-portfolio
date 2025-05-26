import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { projectsData } from "../data/projectsData"; // Import the centralized data

const Projects = () => {
    return (
        <section
            id="projects"
            className="min-h-screen py-20 px-4 md:px-12 pt-24 md:pt-28 flex flex-col items-center bg-neutral-900/90 text-center"
        >
            <h2 className="mb-2 text-3xl md:text-4xl font-bold text-neutral-100">
                My Projects
            </h2>
            <p className="text-lg text-neutral-300 mb-10 max-w-xl md:max-w-2xl px-4">
                Here&apos;s a glimpse of what I&apos;ve been working on.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full justify-items-center">
                {/* Top row */}
                {projectsData.map((project) => {
                    // Use projectsData and map directly
                    let imgStyle = {
                        width: "100%",
                        height: "13rem",
                        objectFit: "cover",
                        objectPosition: "center",
                    };

                    if (
                        project.title ===
                            "Fleet Maintenance and Tracking App" ||
                        project.title === "Bill Splitter App"
                    ) {
                        imgStyle.objectFit = "contain";
                    }

                    if (project.title === "ELBeds") {
                        imgStyle.objectFit = "contain";
                        imgStyle.objectPosition = "center 50%";
                    }

                    return (
                        <Link
                            href={`/projects/${project.slug}`} // Link to the detail page
                            key={project.slug} // Use slug or a unique ID as key
                            className="block w-72 md:w-80 bg-neutral-800 rounded-xl shadow-lg overflow-hidden text-left transition-all hover:shadow-xl hover:-translate-y-1 border border-neutral-700 group"
                        >
                            <div>
                                {" "}
                                {/* Keep the inner div for styling if Link itself causes issues */}
                                <Image
                                    src={
                                        project.coverImage ||
                                        (project.screenshots &&
                                        project.screenshots.length > 0
                                            ? project.screenshots[0].src
                                            : "/placeholder.png")
                                    } // Use coverImage or first screenshot
                                    width={500}
                                    height={500}
                                    alt={project.title}
                                    style={imgStyle}
                                    className="rounded-t-xl"
                                />
                                <div className="p-5">
                                    <h3 className="mt-0 mb-2 text-sky-400 group-hover:text-sky-300 text-lg md:text-xl font-semibold transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed">
                                        {project.desc}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
