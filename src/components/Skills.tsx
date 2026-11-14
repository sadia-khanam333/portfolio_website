import { motion } from 'framer-motion';
import { skillCategories } from '@/lib/data';
import { fadeUp, staggerContainer, staggerFast } from '@/lib/animations';

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-0 right-1/4 h-[350px] w-[350px] rounded-full bg-emerald/5 blur-[120px] -z-10" />

      <div className="section-pad mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-medium tracking-widest uppercase text-accent-400"
          >
            02 — Skills
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            The <span className="text-gradient">toolkit</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-slate-400"
          >
            A full-stack skill set spanning backend architecture, modern
            frontend, and database engineering.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {skillCategories.map((category, ci) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: ci * 0.15 }}
                className="card-surface p-7 group hover:border-accent/20 transition-all"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-ink-950 transition-transform group-hover:scale-110`}
                  >
                    <CategoryIcon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {category.skills.length} technologies
                    </p>
                  </div>
                </div>

                {/* Skill chips */}
                <motion.ul
                  variants={staggerFast}
                  className="flex flex-wrap gap-2"
                >
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.li
                        key={skill.name}
                        variants={fadeUp}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent-200 hover:scale-105 cursor-default"
                      >
                        <Icon className="h-3.5 w-3.5 text-accent-400" />
                        {skill.name}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
