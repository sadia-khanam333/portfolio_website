import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Download, FolderGit2, Sparkles, MapPin, Radio } from 'lucide-react';
import { staggerContainer, fadeUp, staggerLetters, letterReveal, springUp, textReveal } from '@/lib/animations';
import MagneticButton from '@/components/MagneticButton';
import { FiverrIcon } from '@/components/PlatformIcons';
import { platformLinks } from '@/lib/data';

const heroWords = ['Building', 'Scalable', 'Enterprise', 'Web', 'Systems', '&', 'APIs'];

export default function Hero() {
  const avatarRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const glowX = useTransform(springRY, [-30, 30], ['-20%', '20%']);
  const glowY = useTransform(springRX, [-30, 30], ['-20%', '20%']);

  const handleAvatarMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rotateY.set(relX * 10);
    rotateX.set(-relY * 10);
  };

  const handleAvatarLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-pad mx-auto w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_420px]">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-5xl">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm mb-8"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-slate-400">Hello, I'm</span>
              <span className="font-medium text-white">Tahmina Khanam</span>
            </motion.div>

            {/* Headline — letter-by-letter with glow */}
            <motion.h1
              variants={staggerContainer}
              className="font-display text-5xl font-bold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl xl:text-8xl [perspective:800px]"
            >
              <motion.span variants={staggerLetters} className="inline-block">
                {heroWords.map((word, wi) => (
                  <span key={wi} className="inline-block mr-[0.25em]">
                    {word.split('').map((char, ci) => (
                      <motion.span
                        key={`${wi}-${ci}`}
                        variants={letterReveal}
                        className={`inline-block ${wi >= 5 ? 'text-gradient glow-text' : ''}`}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={textReveal}
              className="mt-8 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed"
            >
              Full Stack Developer specializing in{' '}
              <span className="text-accent-300 font-medium">.NET Core</span>,{' '}
              <span className="text-accent-300 font-medium">React</span>, and{' '}
              <span className="text-accent-300 font-medium">Angular</span>.
            </motion.p>

            {/* CTAs — magnetic buttons */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <MagneticButton
                href={platformLinks.upwork}
                external
                className="btn-sheen btn-primary-edge group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-accent-300 to-accent-500 px-7 text-sm font-semibold text-ink-950 transition-shadow hover:shadow-[0_14px_36px_-8px_rgba(34,211,238,0.6)]"
              >
                Hire Me on Upwork
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
              <MagneticButton
                href={platformLinks.fiverr}
                external
                className="btn-sheen group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-7 text-sm font-semibold text-emerald-100 transition-all hover:border-emerald/60 hover:bg-emerald/15 hover:shadow-[0_0_28px_rgba(52,211,153,0.2)]"
              >
                <FiverrIcon className="h-4 w-4 text-emerald-300" />
                Hire Me on Fiverr
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>

              <div aria-hidden="true" className="hidden h-0 basis-full sm:block" />
              <MagneticButton
                href="#projects"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
              >
                <FolderGit2 className="h-4 w-4 text-accent" />
                View Projects
              </MagneticButton>
              <MagneticButton
                href="/Tahmina_Khanam copy.pdf"
                download="Tahmina_Khanam copy.pdf"
                strength={0.5}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-7 text-sm font-semibold text-accent-100 shadow-[0_0_0_rgba(34,211,238,0)] transition-all hover:border-accent/70 hover:bg-accent/15 hover:text-white hover:shadow-[0_0_28px_rgba(34,211,238,0.22)]"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download CV
              </MagneticButton>
            </motion.div>

            {/* Location */}
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2 text-xs tracking-wide text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-accent" /> Dhaka, Bangladesh <span className="text-slate-700">/</span> <Radio className="h-3.5 w-3.5 text-emerald" /> available for impact
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-8 gap-y-5 sm:gap-x-0">
              {[
                { value: '3+', label: 'Enterprise Projects' },
                { value: '.NET Core', label: 'Primary Stack' },
                { value: 'IsDB-BISEW', label: 'Certified Training' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={springUp}
                  className="flex flex-col sm:px-10 sm:first:pl-0 sm:border-l sm:border-white/10 sm:first:border-l-0"
                >
                  <span className="font-display text-2xl font-bold text-white">{stat.value}</span>
                  <span className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Parallax Tilt Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[340px] lg:max-w-none [perspective:1000px]"
          >
            <motion.div
              ref={avatarRef}
              onMouseMove={handleAvatarMove}
              onMouseLeave={handleAvatarLeave}
              style={{ rotateX: springRX, rotateY: springRY, transformStyle: 'preserve-3d' }}
              className="relative"
            >
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative">
                <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-accent/25 via-transparent to-emerald/20 blur-2xl" />
                <motion.div
                  style={{ x: glowX, y: glowY }}
                  className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-accent/20 to-emerald/15 blur-3xl"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] p-2 shadow-2xl shadow-accent/20 ring-1 ring-inset ring-white/[0.06]" style={{ transform: 'translateZ(40px)' }}>
                  <div className="relative h-full overflow-hidden rounded-[2rem] bg-ink-700">
                    <img src="/images/TahminaNipa.jpg" alt="Tahmina Khanam" className="h-full w-full object-cover object-top mix-blend-luminosity opacity-90 transition-all duration-700 hover:mix-blend-normal hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between" style={{ transform: 'translateZ(30px)' }}>
                      <div>
                        <p className="font-display text-lg font-semibold text-white">Tahmina Khanam</p>
                        <p className="text-xs text-accent-200">Full Stack .NET Developer</p>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald shadow-[0_0_12px_#34d399]" />
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-12 rounded-xl border border-accent/20 bg-ink-900/80 px-3 py-2 font-mono text-[10px] text-accent-200 shadow-xl backdrop-blur-md" style={{ transform: 'translateZ(60px)' }}>
                  // build with purpose
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-ink-900/80 px-3 py-2 text-xs text-slate-300 shadow-xl backdrop-blur-md" style={{ transform: 'translateZ(60px)' }}>
                  <span className="text-emerald">●</span> open to work
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-accent/50 to-transparent">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-3 w-px bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
