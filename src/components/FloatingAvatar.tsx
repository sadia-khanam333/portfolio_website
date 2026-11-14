import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Pose = 'hidden' | 'waving' | 'typing';

const EASE = [0.22, 1, 0.36, 1] as const;

function getPose(): Pose {
  const viewport = window.innerHeight;
  const hero = document.getElementById('hero')?.getBoundingClientRect();
  const projects = document.getElementById('projects')?.getBoundingClientRect();

  if (hero && hero.bottom > viewport * 0.5) return 'hidden';
  if (projects && projects.top < viewport * 0.65 && projects.bottom > viewport * 0.35) return 'typing';
  return 'waving';
}

/**
 * One "stage" per pose. Each stage owns its own proportions (the two GIFs have
 * different aspect ratios), its own plate treatment and its own caption, and
 * they cross-fade with a soft rise + de-blur so the swap feels directed.
 * Both GIFs stay mounted so they are decoded once and never flash on swap.
 */
function Stage({
  active,
  showCaption,
  reduce,
  className,
  caption,
  children,
}: {
  active: boolean;
  showCaption: boolean;
  reduce: boolean;
  className: string;
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : { opacity: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.94, filter: reduce ? 'blur(0px)' : 'blur(8px)' }
      }
      transition={{ duration: reduce ? 0.2 : 0.7, ease: EASE }}
      style={{ transformOrigin: '100% 100%' }}
      className={`absolute bottom-0 right-0 ${className}`}
    >
      {children}

      {/* Caption — desktop only, mirrors the hero's mono / pill chips */}
      <motion.div
        initial={false}
        animate={active && showCaption ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
        transition={{ duration: 0.5, delay: active && showCaption ? 0.25 : 0, ease: EASE }}
        className="absolute bottom-6 right-[calc(100%+14px)] hidden items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-ink-900/70 px-3 py-2 text-xs text-slate-300 shadow-xl shadow-black/30 backdrop-blur-md lg:flex"
      >
        {caption}
      </motion.div>
    </motion.div>
  );
}

export default function FloatingAvatar() {
  const [pose, setPose] = useState<Pose>('hidden');
  const [mounted, setMounted] = useState(false);
  const [captionOn, setCaptionOn] = useState(false);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPose(getPose());
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const visible = pose !== 'hidden';

  // Keep the layer rendered until the exit fade has finished, then drop it
  // from paint so the idle GIFs cost nothing while the hero is on screen.
  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }
    const timer = window.setTimeout(() => setMounted(false), 700);
    return () => window.clearTimeout(timer);
  }, [visible]);

  // The caption introduces each pose, then steps aside so it never lingers over page content.
  useEffect(() => {
    if (pose === 'hidden') {
      setCaptionOn(false);
      return;
    }
    setCaptionOn(true);
    const timer = window.setTimeout(() => setCaptionOn(false), 4200);
    return () => window.clearTimeout(timer);
  }, [pose]);

  const bob = reduce ? undefined : { y: [0, -4, 0] };
  const bobTransition = { duration: 4, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`pointer-events-none fixed bottom-3 right-3 z-40 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 ${
        mounted || visible ? 'visible' : 'invisible'
      }`}
    >
      {/* ── Waving: the figure steps out of a glass plate ───────────────── */}
      <Stage
        active={pose === 'waving'}
        showCaption={captionOn}
        reduce={reduce}
        className="h-[168px] w-[94px] sm:h-[240px] sm:w-[135px] lg:h-[290px] lg:w-[163px] xl:h-[330px] xl:w-[186px]"
        caption={<span className="font-mono text-[10px] text-accent-200">// thanks for stopping by</span>}
      >
        {/* ambient light */}
        <div className="absolute -inset-x-8 bottom-0 h-3/4 rounded-full bg-accent/15 blur-3xl" />
        {/* plate (the figure's head and waving hand rise above it) */}
        <div className="avatar-plate absolute inset-x-0 bottom-0 h-[62%]" />
        {/* contact shadow — breathes in sync with the figure */}
        <motion.div
          animate={reduce ? undefined : { scaleX: [1, 0.9, 1], opacity: [0.7, 0.5, 0.7] }}
          transition={bobTransition}
          className="absolute -bottom-1 left-[16%] right-[16%] h-3 rounded-[100%] bg-black/70 blur-md"
        />
        <motion.div animate={bob} transition={bobTransition} className="relative h-full w-full">
          <img
            src="/scene_dev_goodbye_wave_transparent.gif"
            alt=""
            draggable={false}
            decoding="async"
            className="h-full w-full object-contain object-bottom"
          />
        </motion.div>
      </Stage>

      {/* ── Typing: a framed "live feed" so the cropped scene reads as intent ── */}
      <Stage
        active={pose === 'typing'}
        showCaption={captionOn}
        reduce={reduce}
        className="h-[104px] w-[117px] sm:h-[150px] sm:w-[168px] lg:h-[190px] lg:w-[213px] xl:h-[216px] xl:w-[240px]"
        caption={
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_8px_#34d399]" />
            now shipping code
          </>
        }
      >
        <div className="absolute -inset-6 rounded-[2rem] bg-emerald/10 blur-2xl" />
        <div className="avatar-plate avatar-plate--frame absolute inset-0">
          <img
            src="/typing_no_desk_transparent.gif"
            alt=""
            draggable={false}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* vignette keeps the clipped chair / monitor edges soft */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_40%,transparent_55%,rgba(6,7,11,0.65))]" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-950/70 to-transparent" />
        </div>
      </Stage>
    </motion.div>
  );
}
