import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Styles ---
export const techTheme = {
  stroke: "var(--primary)",
  strokeWidth: 2,
  fill: "none",
  fontFamily: "'DM Sans', sans-serif"
};

export const Defs = () => (
  <defs>
    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="red-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

// --- The Core Animated Monkey Actor ---
export const MonkeyActor = ({ status }) => {
  // Define complex variants for different states
  const monkeyVariants = {
    idle: {
      y: [0, -5, 0],
      rotate: 0,
      scale: 1,
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    typing: {
      y: [0, 2, 0],
      rotate: [-2, 2, -2],
      transition: { duration: 0.2, repeat: Infinity }
    },
    panic: {
      y: [-20, 10, -30, 0],
      rotate: [-15, 15, -10, 0],
      scale: 1.1,
      transition: { duration: 0.5, repeat: Infinity, type: "spring" }
    },
    smart: {
      y: -10,
      scale: 1.05,
      transition: { type: "spring", stiffness: 200 }
    },
    mutate: {
      rotate: [0, 360],
      scale: [1, 1.5, 1],
      filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
      transition: { duration: 1.5 }
    },
    laser: {
      x: [-5, 5, -5],
      transition: { duration: 0.1, repeat: Infinity }
    }
  };

  return (
    <motion.g 
      variants={monkeyVariants}
      animate={status}
      style={{ originX: "0px", originY: "40px" }}
    >
      {/* Ears */}
      <circle cx="-35" cy="-5" r="15" fill="var(--bg-alt)" stroke="var(--primary)" strokeWidth="2" />
      <circle cx="35" cy="-5" r="15" fill="var(--bg-alt)" stroke="var(--primary)" strokeWidth="2" />
      {/* Head */}
      <circle cx="0" cy="0" r="40" fill="var(--bg-alt)" stroke="var(--primary)" strokeWidth="2" />
      
      {/* Eyes mapping to status */}
      {status === 'panic' ? (
        <>
          <line x1="-20" y1="-15" x2="-5" y2="-5" stroke="#EF4444" strokeWidth="4" />
          <line x1="-5" y1="-15" x2="-20" y2="-5" stroke="#EF4444" strokeWidth="4" />
          <line x1="5" y1="-15" x2="20" y2="-5" stroke="#EF4444" strokeWidth="4" />
          <line x1="20" y1="-15" x2="5" y2="-5" stroke="#EF4444" strokeWidth="4" />
        </>
      ) : status === 'smart' || status === 'mutate' ? (
        <>
          <circle cx="-15" cy="-10" r="4" fill="#fff" filter="url(#neon-glow)" />
          <circle cx="15" cy="-10" r="4" fill="#fff" filter="url(#neon-glow)" />
          {/* Neon Glasses */}
          <g filter="url(#neon-glow)" stroke="#FACC15">
            <rect x="-25" y="-18" width="20" height="15" rx="2" fill="none" strokeWidth="3" />
            <rect x="5" y="-18" width="20" height="15" rx="2" fill="none" strokeWidth="3" />
            <line x1="-5" y1="-10" x2="5" y2="-10" strokeWidth="3" />
          </g>
        </>
      ) : status === 'laser' ? (
        <>
          <circle cx="-15" cy="-10" r="4" fill="#EF4444" filter="url(#red-glow)" />
          <circle cx="15" cy="-10" r="4" fill="#EF4444" filter="url(#red-glow)" />
        </>
      ) : (
        <>
           <circle cx="-15" cy="-10" r="4" fill="#fff" />
           <circle cx="15" cy="-10" r="4" fill="#fff" />
        </>
      )}
      
      {/* Muzzle */}
      <ellipse cx="0" cy="15" rx="25" ry="18" fill="var(--bg-alt)" stroke="var(--text-muted)" strokeWidth="1" />
      
      {/* Mouth */}
      {status === 'panic' && <circle cx="0" cy="15" r="10" fill="#EF4444" />}
      {(status === 'smart' || status === 'idle' || status === 'laser') && <path d="M -10 12 Q 0 22 10 12" stroke="#fff" strokeWidth="2" fill="none" />}
      {status === 'typing' && <line x1="-10" y1="15" x2="10" y2="15" stroke="#fff" strokeWidth="2" />}

      {/* 8 Arms Mutation */}
      <AnimatePresence>
        {status === 'mutate' && (
          <motion.g 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring" }}
          >
            {[...Array(8)].map((_, i) => (
              <path key={i} d={`M 0 0 C 0 -100 ${Math.cos(i * 45 * Math.PI / 180) * 200} ${Math.sin(i * 45 * Math.PI / 180) * 200 - 100} ${Math.cos(i * 45 * Math.PI / 180) * 250} ${Math.sin(i * 45 * Math.PI / 180) * 250 - 50}`} 
                stroke="#FACC15" strokeWidth="4" fill="none" filter="url(#neon-glow)" />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  );
};
