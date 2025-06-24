"use client";
import { useState } from "react";
import {
    FaChevronDown,
    FaChevronRight,
    FaReact,
    FaNodeJs,
    FaPython,
    FaMobileAlt,
    FaDatabase,
    FaProjectDiagram,
    FaPaintBrush,
    FaCodeBranch,
    FaServer,
    FaCogs,
    FaMicrosoft,
    FaPalette,
} from "react-icons/fa";
import { SiFlutter, SiMicrosoftsharepoint } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { skillsData } from "../data/skillsData";

const iconComponents = {
    flutter: SiFlutter,
    react: FaReact,
    node: FaNodeJs,
    python: FaPython,
    restapi: FaServer,
    nosql: FaDatabase,
    mobiledev: FaMobileAlt,
    apidev: FaCodeBranch,
    databases: FaDatabase,
    agile: FaProjectDiagram,
    m365: FaMicrosoft,
    sharepoint: SiMicrosoftsharepoint,
    webdesign: FaPalette,
    uiux: FaPaintBrush,
    javascript: IoLogoJavascript,
    default: FaCogs,
};

const renderSkillIcon = (iconKey) => {
    const IconComponent =
        iconComponents[iconKey?.toLowerCase()] || iconComponents.default;
    return (
        <IconComponent className="inline-block mr-2 text-xl align-middle text-sky-400" />
    );
};

const SkillCategory = ({ category, skills }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-neutral-800 hover:bg-neutral-700 rounded-md text-left text-neutral-200 font-semibold transition-colors"
                aria-expanded={isOpen}
            >
                <span>{category}</span>
                {isOpen ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            <div
                className={`transition-all ease-in-out duration-300 overflow-hidden ${
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="mt-2 p-4 bg-neutral-850 rounded-md border border-neutral-700/50 shadow-inner">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name || index}
                            className="mb-3 pb-3 border-b border-neutral-700 last:border-b-0 last:pb-0 last:mb-0"
                        >
                            <p className="text-md font-medium text-neutral-100 flex items-center">
                                {renderSkillIcon(skill.iconKey)}
                                {skill.name}
                            </p>
                            {skill.details && skill.details.length > 0 && (
                                <ul className="list-none pl-8 mt-2 space-y-1.5">
                                    {" "}
                                    {skill.details.map((detail, idx) => (
                                        <li
                                            key={detail.name || idx}
                                            className="text-sm text-neutral-300 flex items-center"
                                        >
                                            {renderSkillIcon(detail.iconKey)}
                                            {detail.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SkillsDropdown = () => {
    return (
        <div className="w-full max-w-2xl mt-12">
            {/* Skills Section Title */}
            <h3 className="text-2xl md:text-3xl font-semibold text-neutral-100 mb-6 text-center">
                My Skills
            </h3>
            {Object.entries(skillsData).map(([category, skills]) => (
                <SkillCategory
                    key={category}
                    category={category}
                    skills={skills}
                />
            ))}
        </div>
    );
};

export default SkillsDropdown;
