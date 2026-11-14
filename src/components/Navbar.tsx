import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { navLinks } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the link of the section currently crossing the upper third of the viewport
  useEffect(() => {
    const targets = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    const onTop = () => window.scrollY < 200 && setActiveId('');
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-pad mx-auto flex items-center justify-between h-16 md:h-20">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-600 text-ink-950 shadow-lg shadow-accent/30 transition-transform group-hover:scale-110">
            <Code2 className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Tahmina<span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-white group ${activeId === link.href.slice(1) ? 'text-white' : 'text-slate-400'}`}
              >
                {link.label}
                <span className={`absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-accent to-emerald transition-transform duration-300 group-hover:scale-x-100 ${activeId === link.href.slice(1) ? 'scale-x-100' : 'scale-x-0'}`} />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="btn-sheen hidden md:inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-medium text-accent-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all hover:bg-accent/20 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20"
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Reading progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, transformOrigin: '0% 50%' }}
        className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent via-accent-300 to-emerald transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-ink-900/95 backdrop-blur-xl border-b border-white/5"
          >
            <ul className="section-pad py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 mt-2 rounded-lg text-center bg-accent/15 text-accent-200 font-medium hover:bg-accent/25 transition-colors"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
