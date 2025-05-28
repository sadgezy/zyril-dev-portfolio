import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "../data/projectsData";
import { SiFlutter, SiFirebase, SiGooglemaps, SiDart } from "react-icons/si";

import { FaCodeBranch } from "react-icons/fa";

const technologyIconMap = {
    Flutter: <SiFlutter title="Flutter" className="text-sky-400" />,
    Dart: <SiDart title="Dart" className="text-sky-500" />,
    "Firebase Firestore": (
        <SiFirebase title="Firebase Firestore" className="text-orange-400" />
    ),
    "Google Maps API (Basic Integration)": (
        <SiGooglemaps title="Google Maps API" className="text-green-500" />
    ),
};

const Projects = () => {
    return (
        <section
            id="projects"
            className="min-h-screen py-20 px-4 md:px-12 pt-24 md:pt-28 flex flex-col items-center bg-neutral-900/70 text-center"
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
                        project.title === "SplitUp!"
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
                                    width={400}
                                    height={400}
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
                                    {/* Technologies Section */}
                                    {project.technologies &&
                                        project.technologies.length > 0 && (
                                            <div className="mt-4 pt-3 border-t border-neutral-700/50">
                                                <h4 className="text-xs text-neutral-500 mb-2 font-medium">
                                                    Built with:
                                                </h4>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                                    {project.technologies.map(
                                                        (tech) => (
                                                            <div
                                                                key={tech}
                                                                className="flex items-center text-xs text-neutral-300"
                                                                title={tech}
                                                            >
                                                                {technologyIconMap[
                                                                    tech
                                                                ] ? (
                                                                    <span className="mr-1 text-base">
                                                                        {" "}
                                                                        {/* Increased icon size slightly */}
                                                                        {
                                                                            technologyIconMap[
                                                                                tech
                                                                            ]
                                                                        }
                                                                    </span>
                                                                ) : (
                                                                    <FaCodeBranch className="mr-1 text-neutral-400 text-sm" />
                                                                )}
                                                                {/* Display name for unmapped or always show name */}
                                                                {/* {!technologyIconMap[tech] && tech}  // Option to show name if no icon */}
                                                                {tech}{" "}
                                                                {/* Always show name next to icon/generic icon */}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
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
