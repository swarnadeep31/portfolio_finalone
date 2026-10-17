import { MotionConfig } from "framer-motion";
import AboutSection from "../components/AboutScetion";
import ContactSection from "../components/ContactScetion";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSecton";
import Navbar from "../components/Navbar";
import ProjectSection from "../components/ProjectScetion";
import SkillsScetions from "../components/SkillsScetions";

export const Home = () => {
  return (
    // Respect the visitor's "reduce motion" OS setting for all animations
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsScetions />
          <ProjectSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};
