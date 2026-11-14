import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const codeLines = [
  'const response = await api.get()',
  'app.MapControllers();',
  'return Results.Ok(data);',
  'builder.Services.AddDbContext()',
  'interface IProjectRepository {}',
  'status: 200, latency: 42ms',
  'SELECT * FROM projects',
  'npm run build:production',
  'authorization: bearer token',
  'export default function App()',
  'services.AddScoped<IService>()',
  'await db.projects.find()',
];

export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 180, damping: 28, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 180, damping: 28, mass: 0.2 });

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
    };
    const handleChange = () => setEnabled(media.matches);
    handleChange();
    if (media.matches) window.addEventListener('mousemove', handleMove);
    media.addEventListener('change', handleChange);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      media.removeEventListener('change', handleChange);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <div className="pointer-wallpaper" aria-hidden="true">
        {codeLines.map((line, index) => (
          <span key={line} style={{ top: `${8 + (index % 6) * 16}%`, left: `${(index % 4) * 27 - 5}%` }}>
            {line}
          </span>
        ))}
      </div>
      <motion.div
        className="spotlight-cursor"
        style={{ x: springX, y: springY }}
        aria-hidden="true"
      />
      <motion.div
        className="cursor-dot"
        style={{ x: springX, y: springY }}
        aria-hidden="true"
      />
    </>
  );
}
