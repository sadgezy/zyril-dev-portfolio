import Projects from "../../components/Projects";

export const metadata = {
  title: "Zyril Tamargo - Projects", // Specific title for the projects page
  description: "Explore the projects developed by Zyril Tamargo.", // Specific description
};

export default function ProjectsPage() {
  return (
    <div className="pt-20 md:pt-24"> {/* Add padding to account for fixed navbar */}
      <Projects />
    </div>
  );
}