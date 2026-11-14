import { motion } from 'framer-motion';

const columns = Array.from({ length: 18 }, (_, index) => ({
  left: `${index * 6 - 2}%`,
  delay: (index % 7) * 0.18,
  duration: 2.4 + (index % 5) * 0.35,
  text: Array.from({ length: 12 }, (_, charIndex) => (charIndex + index) % 2).join(''),
}));

export default function DevModeRain() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dev-rain pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden="true"
    >
      {columns.map((column, index) => (
        <motion.span
          key={index}
          initial={{ y: '-20vh' }}
          animate={{ y: '110vh' }}
          transition={{ duration: column.duration, delay: column.delay, ease: 'linear' }}
          style={{ left: column.left }}
        >
          {column.text}
        </motion.span>
      ))}
      <div className="absolute inset-0 bg-emerald-400/[0.04] mix-blend-screen" />
    </motion.div>
  );
}
