import { motion } from 'framer-motion';
import { GraduationCap, Server, Database, Code2 } from 'lucide-react';
import { fadeUp, staggerContainer, slideLeft, springUp, textReveal, staggerSlow } from '@/lib/animations';

const focusPoints = [
  { icon: Server, title: 'ASP.NET Core', desc: 'MVC & Web API architecture' },
  { icon: Database, title: 'SQL Server + EF Core', desc: 'Relational database design' },
  { icon: Code2, title: 'C# & TypeScript', desc: 'Type-safe full-stack delivery' },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px] -z-10" />

      <div className="section-pad mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.span variants={fadeUp} className="eyebrow">
              01 — About
            </motion.span>

            <motion.h2
              variants={springUp}
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.12] tracking-[-0.025em]"
            >
              Enterprise-trained, <br />
              <span className="text-gradient">full-stack ready.</span>
            </motion.h2>

            <motion.p
              variants={textReveal}
              className="mt-6 text-lg text-slate-400 leading-relaxed"
            >
              Motivated Full Stack Developer with enterprise-level training
              from the{' '}
              <span className="text-slate-200 font-medium">
                IsDB-BISEW IT Scholarship Programme
              </span>
              . Skilled in building web applications and database systems using
              ASP.NET Core, C#, SQL Server, and Entity Framework Core.
            </motion.p>

            <motion.div
              variants={springUp}
              className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent-300">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">
                  IsDB-BISEW IT Scholarship Programme
                </p>
                <p className="text-xs text-slate-500">
                  Enterprise-level development training
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: focus cards */}
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-4"
          >
            {focusPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  variants={springUp}
                  whileHover={{ scale: 1.012, x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group glass-card p-6 flex items-start gap-4 hover:border-accent/20"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent-300 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-600">0{i + 1}</span>
                      <h3 className="font-display text-lg font-semibold text-white">{point.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{point.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
