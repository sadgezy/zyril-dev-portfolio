import About from "../components/About";
import HomeSection from "../components/HomeSection";
import Navbar from "../components/Navbar";
import AnimatedBackground from "../components/AnimatedBackground";
import Contact from "../components/Contact";

export default function Home() {
    return (
        <>
         <AnimatedBackground />
                <Navbar />
            <HomeSection />
            <About />
            <Contact />
        </>
    );
}
