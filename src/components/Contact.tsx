import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Mail, Phone, Linkedin, Github, ArrowUpRight, TerminalSquare } from 'lucide-react';
import DevModeRain from '@/components/DevModeRain';
import { UpworkIcon, FiverrIcon } from '@/components/PlatformIcons';
import { fadeUp, staggerContainer, springUp, textReveal } from '@/lib/animations';
import { platformLinks } from '@/lib/data';

export default function Contact() {
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    if (!devMode) return;
    const timer = window.setTimeout(() => setDevMode(false), 3000);
    return () => window.clearTimeout(timer);
  }, [devMode]);

  return (
    <section id="contact" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-accent/8 blur-[140px]" />
      </div>

      <div className="section-pad mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.span variants={fadeUp} className="eyebrow eyebrow-center">
            05 — Contact
          </motion.span>

          <motion.h2
            variants={springUp}
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-[-0.03em]"
          >
            Let's Build Something <br />
            <span className="text-gradient">Great Together.</span>
          </motion.h2>

          <motion.p variants={textReveal} className="mt-6 text-lg text-slate-400">
            Have a project in mind? I'm available for full-stack development
            work. Let's talk.
          </motion.p>

          {/* Contact methods */}
          <motion.div
            variants={springUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="mailto:tahminakhannipa10@gmail.com"
              className="btn-sheen btn-primary-edge group inline-flex h-12 max-w-full items-center gap-3 rounded-full bg-gradient-to-b from-accent-300 to-accent-500 px-5 text-[13px] font-semibold text-ink-950 transition-all hover:shadow-[0_14px_36px_-8px_rgba(34,211,238,0.6)] sm:px-7 sm:text-sm"
            >
              <Mail className="h-4 w-4" />
              tahminakhannipa10@gmail.com
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="tel:01767406402"
              className="inline-flex h-12 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
            >
              <Phone className="h-4 w-4 text-accent" />
              01767406402
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={springUp} className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/tahminakhan-nipa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent-200 hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/TahminaKhanNipa10-Codes/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent-200 hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={platformLinks.upwork}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent-200 hover:scale-110"
            >
              <UpworkIcon className="h-5 w-5" />
            </a>
            <a
              href={platformLinks.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent-200 hover:scale-110"
            >
              <FiverrIcon className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>{devMode && <DevModeRain />}</AnimatePresence>

      {/* Footer bar */}
      <motion.footer
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="section-pad mx-auto mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 max-sm:pb-40 sm:flex-row sm:flex-wrap sm:gap-y-3 sm:pr-44 lg:pr-60 xl:pr-[17rem]"
      >
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Tahmina Khanam. All rights reserved.
        </p>
        <button
          onClick={() => setDevMode((mode) => !mode)}
          className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-all ${devMode ? 'border-emerald/40 bg-emerald/10 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,.15)]' : 'border-white/10 text-slate-500 hover:border-accent/30 hover:text-accent-200'}`}
        >
          <TerminalSquare className="h-3.5 w-3.5" /> {'{ dev_mode: '}{devMode ? 'true' : 'false'}{' }'}
        </button>
        <p className="text-sm text-slate-500">
          Built with <span className="text-accent-400">React</span> +{' '}
          <span className="text-accent-400">Framer Motion</span>
        </p>
      </motion.footer>
    </section>
  );
}
