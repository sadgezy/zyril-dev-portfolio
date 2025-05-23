import React from "react";

const projects = [
    {
        title: "Fleet Maintenance and Tracking App",
        desc: "Request and track vehicle repairs via SharePoint backend.",
        imageUrl: "/fgv_logo.png",
    },
    {
        title: "Bill Splitter App",
        desc: "Split bills with contacts and track money you're owed.",
        imageUrl: "/splitup_logo.png",
    },
    {
        title: "Donation App",
        desc: "Allows users and organizations to give donations with real-time updates and a user-friendly design.",
        imageUrl:
            "https://via.placeholder.com/350x200/C2185B/FFFFFF?text=Donation+App",
    },
    {
        title: "ELBeds",
        desc: "Lightweight app for finding accommodations in Los Baños, Laguna.",
        imageUrl: "/elbeds_logo.png",
    },
];

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
                Here's a glimpse of what I've been working on.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full justify-items-center">
                {/* Top row */}
                {projects.slice(0, 3).map((project, idx) => {
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
                        imgStyle.objectFit = "cover";
                        imgStyle.objectPosition = "center 50%";
                    }

                    return (
                        <div
                            key={idx}
                            className="w-72 md:w-80 bg-neutral-800 rounded-xl shadow-lg overflow-hidden text-left transition-all hover:shadow-xl hover:-translate-y-1 border border-neutral-700"
                        >
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                style={imgStyle}
                                className="rounded-t-xl"
                            />
                            <div className="p-5">
                                <h3 className="mt-0 mb-2 text-sky-400 text-lg md:text-xl font-semibold">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    {project.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {/* Bottom row */}
                {projects.slice(3, 6).map((project, idx) => {
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
                        imgStyle.objectFit = "cover";
                        imgStyle.objectPosition = "center 40%";
                    }

                    return (
                        <div
                            key={idx}
                            className="w-72 md:w-80 bg-neutral-800 rounded-xl shadow-lg overflow-hidden text-left transition-all hover:shadow-xl hover:-translate-y-1 border border-neutral-700"
                        >
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                style={imgStyle}
                                className="rounded-t-xl"
                            />
                            <div className="p-5">
                                <h3 className="mt-0 mb-2 text-sky-400 text-lg md:text-xl font-semibold">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    {project.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
