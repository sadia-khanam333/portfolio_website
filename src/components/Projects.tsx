import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Check, Github } from 'lucide-react';
import { projects, projectGroups, type ProjectGroup } from '@/lib/data';
import { fadeUp, staggerContainer, springScale, springUp, textReveal } from '@/lib/animations';
import ProjectCategoryTabs from '@/components/ProjectCategoryTabs';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 18 });
  const Icon = project.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rotateY.set(relX * 6);
    rotateX.set(-relY * 6);
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      variants={springScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRX, rotateY: springRY, transformStyle: 'preserve-3d' }}
      className="group glow-border glass-card relative flex h-full flex-col overflow-hidden p-7 [perspective:1000px]"
    >
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

      {/* Image zoom layer */}
      <div className="relative mb-6 h-36 overflow-hidden rounded-xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" style={{ transform: 'translateZ(30px)' }}>
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40`} />
        <div
          className="absolute inset-0 opacity-[0.12] transition-opacity duration-500 group-hover:opacity-25"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '22px 22px', WebkitMaskImage: 'radial-gradient(70% 90% at 50% 50%, #000, transparent)', maskImage: 'radial-gradient(70% 90% at 50% 50%, #000, transparent)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-16 w-16 text-white/15 transition-all duration-500 group-hover:scale-125 group-hover:text-white/30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
        <span className="absolute bottom-3 left-3 font-mono text-xs tracking-wider text-white/50">
          / {project.id}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col" style={{ transform: 'translateZ(40px)' }}>
        {/* Title */}
        <h3 className="font-display text-xl font-bold tracking-[-0.01em] text-white transition-colors group-hover:text-accent-200">
          {project.title}
        </h3>
        <p className="mt-1.5 text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500">
          {project.category}
        </p>

        {/* Description */}
        <p className="mt-4 text-sm text-slate-400 leading-relaxed">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="mt-5 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
              <Check className="h-4 w-4 mt-0.5 shrink-0 text-emerald" />
              {h}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="mt-6 mb-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-400 transition-colors group-hover:border-white/15 group-hover:text-slate-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Repository links */}
        <div className="mt-auto pt-5 border-t border-white/5">
          <div className="flex flex-col gap-1">
            {project.repos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="-mx-2.5 inline-flex items-center gap-1.5 self-start rounded-lg px-2.5 py-1.5 text-sm font-medium text-accent-300 transition-colors hover:bg-accent/10 hover:text-accent-100"
              >
                <Github className="h-3.5 w-3.5" />
                {repo.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

type ActiveGroup = ProjectGroup | 'all';

const groupCounts = Object.fromEntries(
  projectGroups.map((group) => [
    group.id,
    group.id === 'all' ? projects.length : projects.filter((project) => project.group === group.id).length,
  ]),
) as Record<ActiveGroup, number>;

export default function Projects() {
  const [active, setActive] = useState<ActiveGroup>('all');
  const visibleProjects = useMemo(
    () => (active === 'all' ? projects : projects.filter((project) => project.group === active)),
    [active],
  );

  return (
    <section id="projects" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-1/3 left-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[130px] -z-10" />

      <div className="section-pad mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl mb-16"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            04 — Case Studies
          </motion.span>
          <motion.h2 variants={springUp} className="mt-4 font-display text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
            Featured <span className="text-gradient">projects</span>
          </motion.h2>
          <motion.p variants={textReveal} className="mt-4 text-slate-400">
            Enterprise systems and full-stack applications built with
            production-grade architecture.
          </motion.p>
        </motion.div>

        <div className="mb-10">
          <ProjectCategoryTabs active={active} counts={groupCounts} onChange={setActive} />
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                className="h-full"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
