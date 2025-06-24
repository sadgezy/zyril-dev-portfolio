import { FaGithub, FaLinkedin } from "react-icons/fa";
import SkillsDropdown from "./SkillsDropdown";

const Contact = () => {
    return (
        <section
            id="contact"
            className="min-h-screen py-20 px-4 md:px-12 pt-24 md:pt-28 flex flex-col items-center bg-neutral-900/90 text-center"
        >
            {" "}
            {/* Skills Section */}
            <SkillsDropdown />
            {/* Contact Section */}
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">
                Get In Touch
            </h2>
            <p className="text-lg text-neutral-300 mb-10 max-w-xl md:max-w-2xl px-4">
                Have a question or want to work together? Feel free to reach
                out!
            </p>
            <a
                href="mailto:me@zyriltamargo.dev"
                className="inline-block px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
                Send me an email
            </a>
            {/* Social Links */}
            <div className="flex gap-8 mt-12">
                {" "}
                <a
                    href="https://github.com/sadgezy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white text-3xl transition-colors"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://www.linkedin.com/in/zyrilt2000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-white text-3xl transition-colors"
                >
                    <FaLinkedin />
                </a>
            </div>
        </section>
    );
};

export default Contact;
