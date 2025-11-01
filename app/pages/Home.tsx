import { AboutSection } from "../components/AboutScetion";
import { ContactSection } from "../components/ContactScetion";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSecton";

import { Navbar } from "../components/Navbar";
import { ProjectScetion } from "../components/ProjectScetion";
import { SkillsScetions } from "../components/SkillsScetions";

import { StarBackground } from "../components/StarBackground";
import { ThemeToggle } from "../components/ThemeToggle";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Background Effects */}
      <StarBackground />
      {/* Navbar Component */}
      <Navbar />
      {/* Main Content Area */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsScetions />
        <ProjectScetion />
        <ContactSection />
      </main>
      {/* Footer Component */}
      <Footer />
    </div>
  );
};
