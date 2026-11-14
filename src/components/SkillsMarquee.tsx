import { motion } from 'framer-motion';
import { TechLogo, techLogoList } from '@/components/TechLogos';
import { fadeUp, staggerContainer, springUp } from '@/lib/animations';

export default function SkillsMarquee() {
  const doubled = [...techLogoList, ...techLogoList];

  return (
    <section id="skills" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-emerald/5 blur-[120px] -z-10" />
      <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[120px] -z-10" />

      <div className="section-pad mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="eyebrow"
          >
            03 — Tech Stack
          </motion.span>
          <motion.h2
            variants={springUp}
            className="mt-4 font-display text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl"
          >
            Technologies I <span className="text-gradient">build with</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate-400">
            Hover to pause. A continuous stream of the tools behind every
            shipped system.
          </motion.p>
        </motion.div>
      </div>

      {/* Edge fade mask */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent sm:w-40" />

        <div className="overflow-hidden py-6">
          <div className="marquee-track gap-6">
            {doubled.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="group flex min-w-[168px] flex-col items-center gap-3 rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.06] to-white/[0.015] px-8 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-accent/[0.06] hover:shadow-[0_18px_40px_-18px_rgba(34,211,238,0.35)] sm:min-w-[180px]"
              >
                <TechLogo
                  tech={tech.tech}
                  className="h-12 w-12 transition-all duration-300 group-hover:scale-125"
                />
                <span className="text-sm font-medium text-slate-400 transition-colors group-hover:text-white">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
