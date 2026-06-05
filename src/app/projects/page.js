import Projects from "../../pages/Projects";
import Navbar from "../../components/Navbar";
import AnimatedBackground from "../../components/AnimatedBackground";

export const metadata = {
    title: "Zyril Tamargo - Projects", // Specific title for the projects page
    description: "Explore the projects developed by Zyril Tamargo.", // Specific description
};

export default function ProjectsPage() {
    return (
 <><AnimatedBackground /><Navbar /><div className="pt-20 md:pt-24">
            {" "}
            <Projects />
        </div></>
    );
}
