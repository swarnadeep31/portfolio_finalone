import { MotionConfig } from "framer-motion";
import About from "../play/About";
import Bar from "../play/Bar";
import Intro from "../play/Intro";
import Outro from "../play/Outro";
import Stack from "../play/Stack";
import Work from "../play/Work";

export const Home = () => {
  return (
    // Respect the visitor's "reduce motion" OS setting for all animations
    <MotionConfig reducedMotion="user">
      <h1 className="sr-only">Swarnadeep Roy — Fullstack Developer &amp; UI Engineer</h1>
      <main className="min-h-screen overflow-x-clip bg-background text-foreground">
        <Intro />
        <Work />
        <About />
        <Stack />
      </main>
      <Outro />
      <Bar />
    </MotionConfig>
  );
};
