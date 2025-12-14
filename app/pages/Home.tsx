import AboutSection from "../components/AboutScetion";
import ContactSection from "../components/ContactScetion";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSecton";

import Navbar from "../components/Navbar";
import ProjectSection from "../components/ProjectScetion";

import SkillsScetions from "../components/SkillsScetions";
import StackedSection from "../components/StackedSection";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar Component */}
      <Navbar />
      {/* Main Content Area */}
      <main>
        <StackedSection>
          <HeroSection />
        </StackedSection>
        <StackedSection>
          <AboutSection />
        </StackedSection>

        <StackedSection>
          <SkillsScetions />
        </StackedSection>

        <StackedSection>
          <ProjectSection />
        </StackedSection>

        <StackedSection>
          <ContactSection />
        </StackedSection>
      </main>
      <Footer />
      {/* Footer Component */}
    </div>
  );
};
