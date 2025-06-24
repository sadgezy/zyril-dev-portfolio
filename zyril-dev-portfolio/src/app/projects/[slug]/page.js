import { projectsData, getProjectBySlug } from "../../../data/projectsData";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import DeviceMockup from "../../../components/DeviceMockup";

// For App Router, this helps Next.js know which slugs to pre-render at build time.
export async function generateStaticParams() {
    const projects = await Promise.resolve(projectsData);
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata(props) {
    const params = await props.params;
    // Ensure params is "awaited" or resolved before accessing its properties,
    await Promise.resolve();
    const project = await getProjectBySlug(params.slug);
    if (!project) {
        return {
            title: "Project Not Found",
        };
    }
    return {
        title: `${project.title} - Zyril Tamargo`,
        description: project.desc,
    };
}

export default async function ProjectDetailPage(props) {
    const params = await props.params;
    await Promise.resolve();
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center py-20 px-4 pt-28 md:pt-32">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <p className="text-lg text-neutral-300 mb-8">
                    Sorry, we couldn&apos;t find the project you were looking
                    for.
                </p>
                <Link
                    href="/projects"
                    className="inline-flex items-center px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-lg font-medium transition-colors"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 pt-28 md:pt-32 bg-neutral-900 text-neutral-100">
            <div className="max-w-4xl mx-auto">
                {/* Back to Projects Link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors mb-10 group" // Increased bottom margin
                >
                    <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to All Projects
                </Link>
                {/* Project Title - Moved above the image */}
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-50 mb-6">
                    {project.title}
                </h1>

                {/* Screenshots Gallery */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-sky-400 mb-4">
                        App Screenshots
                    </h2>
                    <div className="flex overflow-x-auto py-4 space-x-4 md:space-x-6 hide-scrollbar items-center">
                        {project.screenshots &&
                        project.screenshots.length > 0 ? (
                            project.screenshots.map((screenshot, index) => (
                                <DeviceMockup
                                    key={index}
                                    src={screenshot.src}
                                    alt={screenshot.alt}
                                    priority={index === 0}
                                />
                            ))
                        ) : (
                            <p className="text-neutral-400">
                                No screenshots available for this project.
                            </p>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-neutral-850/50 p-8 md:p-10 rounded-lg shadow-lg border border-neutral-700/50">
                    {" "}
                    {/* Increased padding */}
                    {/* Short Description */}
                    <p className="text-xl text-neutral-300 mb-6 italic">
                        {project.desc}
                    </p>
                    {/* Long Description */}
                    <div className="prose prose-invert prose-lg max-w-none text-neutral-200 mb-8">
                        {project.longDesc
                            .split("\n")
                            .map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                    </div>
                    {/* Technologies Used */}
                    {project.technologies &&
                        project.technologies.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-sky-400 mb-3">
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-neutral-700 text-neutral-200 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    {/* Links (Example) */}
                    <div className="flex flex-wrap gap-4">
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition-colors"
                            >
                                <FaExternalLinkAlt className="mr-2" />
                                View Live Demo
                            </a>
                        )}
                        {project.repoLink && (
                            <a
                                href={project.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2.5 bg-neutral-600 hover:bg-neutral-500 text-white rounded-lg font-medium transition-colors"
                            >
                                <FaGithub className="mr-2" />
                                View Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
