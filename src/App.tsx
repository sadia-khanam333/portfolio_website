import Navbar from '@/components/Navbar';
import CursorSpotlight from '@/components/CursorSpotlight';
import MorphingBlobs from '@/components/MorphingBlobs';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ApiTerminal from '@/components/ApiTerminal';
import SkillsMarquee from '@/components/SkillsMarquee';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import FloatingAvatar from '@/components/FloatingAvatar';

function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 noise-overlay">
      <MorphingBlobs />
      <CursorSpotlight />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <ApiTerminal />
        <SkillsMarquee />
        <Projects />
        <Contact />
      </main>
      <FloatingAvatar />

    </div>
  );
}

export default App;
