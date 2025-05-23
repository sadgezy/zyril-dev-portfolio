import About from "../components/About";
import HomeSection from "../components/HomeSection";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      {/* Sections will be rendered in this order */}
      <HomeSection />
      <About />
      <Contact />
    </>
  );
}
