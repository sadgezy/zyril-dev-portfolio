import About from "../components/About";
import HomeSection from "../components/HomeSection";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      {/* Sections will be rendered in this order */}
      <About /> {/* This is the top-most content with the iPhone cutout */}
      <HomeSection />
      <Projects />
      <Contact />
    </>
  );
}
