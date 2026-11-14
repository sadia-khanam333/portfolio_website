import { motion } from 'framer-motion';
import { projectGroups, type ProjectGroup } from '@/lib/data';

type ActiveGroup = ProjectGroup | 'all';

type ProjectCategoryTabsProps = {
  active: ActiveGroup;
  counts: Record<ActiveGroup, number>;
  onChange: (group: ActiveGroup) => void;
};

export default function ProjectCategoryTabs({ active, counts, onChange }: ProjectCategoryTabsProps) {
  return (
    <div role="tablist" aria-label="Filter projects by technology" className="flex flex-wrap gap-2">
      {projectGroups.map((group) => {
        const Icon = group.icon;
        const isActive = group.id === active;
        return (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(group.id)}
            className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              isActive ? 'border-accent/40 text-ink-950' : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="project-tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-600 shadow-lg shadow-accent/25"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <Icon className="relative h-4 w-4" />
            <span className="relative">{group.label}</span>
            <span
              className={`relative rounded-full px-2 py-0.5 font-mono text-[10px] ${
                isActive ? 'bg-ink-950/15 text-ink-950' : 'bg-white/5 text-slate-500'
              }`}
            >
              {counts[group.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
