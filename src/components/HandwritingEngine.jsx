import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// --- Shared Chalkboard Theme ---
export const chalkTheme = {
  stroke: "rgba(255, 255, 255, 0.85)",
  strokeWidth: 2.5,
  fill: "none",
  fontFamily: "'Patrick Hand', cursive, sans-serif", // Clean, readable handwriting font
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// CHALK FILTERS (reusable defs to include in any SVG)
export const ChalkDefs = () => (
  <defs>
    <filter id="chalk" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displaced" />
      <feGaussianBlur in="displaced" stdDeviation="0.6" result="blurred" />
      <feMerge>
        <feMergeNode in="blurred" />
        <feMergeNode in="SourceGraphic" opacity="0.8" />
      </feMerge>
    </filter>
  </defs>
);

// --- Core Scene Wrapper ---
export const Scene = ({ children, className = "", style = {}, margin = "-15%" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <div ref={ref} className={className} style={{ position: 'relative', width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10vh 5%', ...style }}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- Text Writing Animation ---
export const DrawText = ({ text, delay = 0, duration = 2, className = "", style = {}, as: Tag = "p" }) => {
  // We use a clipPath wipe to simulate drawing out the text smoothly from left to right
  return (
    <motion.div
      variants={{
        hidden: { clipPath: 'inset(0 100% 0 0)' },
        visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration, ease: "linear", delay } }
      }}
      className={className}
      style={{ 
        ...style,
        fontFamily: "'Patrick Hand', cursive, sans-serif", // Ensure handwritten style
        display: 'inline-block',
        color: '#ffffff'
      }}
    >
      <Tag style={{ margin: 0 }}>{text}</Tag>
    </motion.div>
  );
};

// --- SVG Drawing Components ---
export const DrawPath = ({ d, duration = 1.5, delay = 0, stroke = chalkTheme.stroke, style = {}, ...props }) => (
  <motion.path
    d={d}
    variants={{
      hidden: { pathLength: 0, opacity: 0 },
      visible: { pathLength: 1, opacity: 1, transition: { pathLength: { duration, ease: "easeInOut", delay }, opacity: { duration: 0.1, delay } } }
    }}
    style={{ fill: "none", stroke, strokeWidth: chalkTheme.strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", ...style }}
    filter="url(#chalk)"
    {...props}
  />
);

export const DrawCircle = ({ cx, cy, r, duration = 1.0, delay = 0, stroke = chalkTheme.stroke, style = {}, fill="none", ...props }) => (
  <motion.circle
    cx={cx} cy={cy} r={r}
    variants={{
      hidden: { pathLength: 0, opacity: 0, fill: "transparent" },
      visible: { pathLength: 1, opacity: 1, fill, transition: { pathLength: { duration, ease: "easeInOut", delay }, opacity: { duration: 0.1, delay }, fill: { delay: delay + duration * 0.8 } } }
    }}
    style={{ stroke, strokeWidth: chalkTheme.strokeWidth, ...style }}
    filter="url(#chalk)"
    {...props}
  />
);

export const DrawRect = ({ x, y, width, height, rx = 4, duration = 1.2, delay = 0, stroke = chalkTheme.stroke, style = {}, fill="none", ...props }) => (
  <motion.rect
    x={x} y={y} width={width} height={height} rx={rx}
    variants={{
      hidden: { pathLength: 0, opacity: 0, fill: "transparent" },
      visible: { pathLength: 1, opacity: 1, fill, transition: { pathLength: { duration, ease: "easeInOut", delay }, opacity: { duration: 0.1, delay }, fill: { delay: delay + duration * 0.8 } } }
    }}
    style={{ stroke, strokeWidth: chalkTheme.strokeWidth, ...style }}
    filter="url(#chalk)"
    {...props}
  />
);

// Used to simply fade in standard SVG text or pre-filled groups after the lines draw
export const FadeGroup = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.g
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay } }
    }}
  >
    {children}
  </motion.g>
);
