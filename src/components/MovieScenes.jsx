import React from 'react';
import { motion, useTransform } from 'framer-motion';

// --- Shared Styles for the "Cinematic Tech" aesthetic ---
const techTheme = {
  stroke: "var(--primary)",
  strokeWidth: 2,
  fill: "none",
  fontFamily: "'DM Sans', sans-serif"
};

// GLOW FILTERS
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
    <linearGradient id="primary-fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
      <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
    </linearGradient>
  </defs>
);

// Helper Component: The Monkey Face
const MonkeyFace = ({ expression = 'neutral', glasses = false, transform }) => {
  return (
    <g transform={transform}>
      {/* Ears */}
      <circle cx="-35" cy="-5" r="15" fill="var(--bg-alt)" stroke="var(--primary)" strokeWidth="2" />
      <circle cx="35" cy="-5" r="15" fill="var(--bg-alt)" stroke="var(--primary)" strokeWidth="2" />
      {/* Head */}
      <circle cx="0" cy="0" r="40" fill="var(--bg-alt)" stroke="var(--primary)" strokeWidth="2" />
      {/* Eyes */}
      {expression === 'panic' || expression === 'wrong' ? (
        <>
          <line x1="-20" y1="-15" x2="-5" y2="-5" stroke="#fff" strokeWidth="3" />
          <line x1="-5" y1="-15" x2="-20" y2="-5" stroke="#fff" strokeWidth="3" />
          <line x1="5" y1="-15" x2="20" y2="-5" stroke="#fff" strokeWidth="3" />
          <line x1="20" y1="-15" x2="5" y2="-5" stroke="#fff" strokeWidth="3" />
        </>
      ) : expression === 'smart' ? (
        <>
          <circle cx="-15" cy="-10" r="4" fill="#fff" />
          <circle cx="15" cy="-10" r="4" fill="#fff" />
          {/* Glasses */}
          {glasses && (
            <g filter="url(#neon-glow)" stroke="var(--primary)">
              <rect x="-25" y="-18" width="20" height="15" rx="2" fill="none" strokeWidth="2" />
              <rect x="5" y="-18" width="20" height="15" rx="2" fill="none" strokeWidth="2" />
              <line x1="-5" y1="-10" x2="5" y2="-10" strokeWidth="2" />
            </g>
          )}
        </>
      ) : (
        <>
           <circle cx="-15" cy="-10" r="3" fill="#fff" />
           <circle cx="15" cy="-10" r="3" fill="#fff" />
        </>
      )}
      
      {/* Muzzle Area */}
      <ellipse cx="0" cy="15" rx="25" ry="18" fill="var(--bg-alt)" stroke="var(--text-muted)" strokeWidth="1" />
      
      {/* Mouth */}
      {expression === 'panic' && <circle cx="0" cy="15" r="8" fill="#fff" />}
      {expression === 'wrong' && <path d="M -10 18 Q 0 8 10 18" stroke="#fff" strokeWidth="2" fill="none" />}
      {expression === 'smart' && <path d="M -10 12 Q 0 22 10 12" stroke="#fff" strokeWidth="2" fill="none" />}
      {expression === 'neutral' && <line x1="-10" y1="15" x2="10" y2="15" stroke="#fff" strokeWidth="2" />}
    </g>
  );
};


// --- SCENE 1: The Oblivious Monkey (Guessing Banana) ---
export const Scene1Autocomplete = ({ progress }) => {
  // Reveal the bad guess as we scroll
  const bananaScale = useTransform(progress, [0.4, 0.6], [0, 1]);
  const buzzerOpacity = useTransform(progress, [0.6, 0.7], [0, 1]);
  const monkeyExpr = useTransform(progress, p => p > 0.6 ? 'wrong' : p > 0.4 ? 'panic' : 'neutral');

  // We need to force a re-render to switch SVG expression strings based on progress
  const [expr, setExpr] = React.useState('neutral');
  React.useEffect(() => {
    return monkeyExpr.onChange(v => setExpr(v));
  }, [monkeyExpr]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
         <MonkeyFace expression={expr} transform="translate(0, -60)" />

         {/* The Desk */}
         <rect x="-150" y="40" width="300" height="20" fill="var(--surface)" stroke="var(--border)" />
         <path d="M -140 40 L -200 -20 L -100 -20 L -40 40" fill="none" stroke="var(--border)" opacity="0.5" />
         
         {/* The Typewriter/Paper */}
         <rect x="-60" y="5" width="120" height="35" fill="var(--bg-alt)" stroke="var(--text-muted)" />
         <rect x="-40" y="-30" width="80" height="35" fill="#fff" />
         <text x="-35" y="-15" fontSize="8" fill="#000">The weather is...</text>
         
         {/* The Bad Guess */}
         <motion.g style={{ scale: bananaScale, originX: "0px", originY: "0px" }}>
            <rect x="60" y="-120" width="140" height="50" rx="4" fill="var(--surface)" stroke="var(--primary)" filter="url(#neon-glow)" />
            <text x="130" y="-88" textAnchor="middle" fontSize="24" fill="#fff" fontWeight="bold">BANANA!</text>
            <path d="M 60 -95 L 20 -70 L 60 -70 Z" fill="var(--surface)" stroke="var(--primary)" />
         </motion.g>

         {/* Red Buzzer */}
         <motion.g style={{ opacity: buzzerOpacity }}>
            <line x1="50" y1="-130" x2="210" y2="-60" stroke="#EF4444" strokeWidth="8" filter="url(#red-glow)" />
            <line x1="210" y1="-130" x2="50" y2="-60" stroke="#EF4444" strokeWidth="8" filter="url(#red-glow)" />
         </motion.g>
      </g>
    </svg>
  );
};


// --- SCENE 2: Evolution (Math Glasses) ---
export const Scene2Evolution = ({ progress }) => {
  const mathOpacity = useTransform(progress, [0.3, 0.5], [0, 1]);
  const signY = useTransform(progress, [0.6, 0.8], [150, 20]);
  const signOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        <MonkeyFace expression="smart" glasses={true} transform="translate(0, -20)" />

        {/* Floating Math Equations */}
        <motion.g style={{ opacity: mathOpacity }}>
           <text x="-250" y="-100" fontSize="24" fill="var(--primary)" filter="url(#neon-glow)">[0.82, -1.2, 0.45]</text>
           <text x="150" y="-80" fontSize="24" fill="var(--primary)" filter="url(#neon-glow)">King - Man</text>
           <text x="-180" y="80" fontSize="24" fill="var(--primary)" filter="url(#neon-glow)">+ Woman = ?</text>
        </motion.g>

        {/* The Monkey holding the sign up */}
        <motion.g style={{ y: signY, opacity: signOpacity }}>
           <rect x="-80" y="0" width="160" height="60" rx="4" fill="var(--surface)" stroke="var(--primary)" strokeWidth="3" filter="url(#neon-glow)" />
           <text x="0" y="38" textAnchor="middle" fontSize="28" fill="#fff" fontWeight="bold" letterSpacing="2">QUEEN</text>
           {/* Monkey Arms holding sign */}
           <path d="M -40 -20 Q -60 20 -80 30" stroke="var(--primary)" strokeWidth="8" fill="none" />
           <path d="M 40 -20 Q 60 20 80 30" stroke="var(--primary)" strokeWidth="8" fill="none" />
        </motion.g>

      </g>
    </svg>
  );
};


// --- SCENE 3: Attention (8 Arms) ---
export const Scene3Attention = ({ progress }) => {
  const armsScale = useTransform(progress, [0.3, 0.5], [0, 1]);
  const beamOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        {/* Background Sentence Map */}
        <g opacity="0.5">
           <text x="-200" y="-150" fontSize="24" fill="var(--primary)">The</text>
           <text x="0" y="-150" fontSize="24" fill="var(--text)" textAnchor="middle">astronaut</text>
           <text x="150" y="-150" fontSize="24" fill="var(--primary)">finally</text>
           <text x="-250" y="150" fontSize="24" fill="var(--primary)">boarded</text>
           <text x="-100" y="150" fontSize="24" fill="var(--text)">the</text>
           <text x="100" y="150" fontSize="24" fill="var(--primary)">rocket</text>
           <text x="250" y="150" fontSize="24" fill="var(--text)">she</text>
        </g>

        <MonkeyFace expression="smart" glasses={true} transform="translate(0, 0)" />

        {/* The 8 Neon Arms flying out simultaneously */}
        <motion.g style={{ scale: armsScale, opacity: armsScale, originX: "0px", originY: "0px" }}>
            {/* Multi-arms linking to words */}
            <path d="M -30 -30 L -180 -140" stroke="var(--primary)" filter="url(#neon-glow)" />
            <path d="M 0 -40 L 0 -130" stroke="var(--primary)" filter="url(#neon-glow)" />
            <path d="M 30 -30 L 170 -140" stroke="var(--primary)" filter="url(#neon-glow)" />
            
            <path d="M -40 0 L -220 130" stroke="var(--primary)" filter="url(#neon-glow)" />
            <path d="M -20 30 L -80 130" stroke="#fff" filter="url(#neon-glow)" />
            <path d="M 20 30 L 120 130" stroke="var(--primary)" filter="url(#neon-glow)" />
            <path d="M 40 0 L 260 130" stroke="#fff" filter="url(#neon-glow)" />
        </motion.g>

        {/* The Critical "Attention" Connection overriding everything */}
        <motion.g style={{ opacity: beamOpacity }}>
           <path d="M 260 130 Q 150 -60 0 -140" stroke="#FACC15" strokeWidth="4" fill="none" filter="url(#neon-glow)" strokeDasharray="8 8" />
           <text x="160" y="-30" fill="#FACC15" fontSize="16" filter="url(#neon-glow)">SELF-ATTENTION BIND</text>
        </motion.g>

      </g>
    </svg>
  );
};


// --- SCENE 4: Tokenization (Laser Chopping) ---
export const Scene4Tokens = ({ progress }) => {
  const laserDraw = useTransform(progress, [0.2, 0.4], [0, 100]);
  const splitOffset = useTransform(progress, [0.5, 0.7], [0, 40]);
  const tokenOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        {/* Monkey working the machinery */}
        <MonkeyFace expression="smart" transform="translate(0, -120)" glasses={true} />
        
        {/* Huge Word */}
        <text x="0" y="0" textAnchor="middle" fontSize="48" fill="#fff" fontWeight="bold" letterSpacing="4">
          <tspan dx="-80">un</tspan>
          <tspan dx="20">believ</tspan>
          <tspan dx="20">able</tspan>
        </text>

        {/* Monkey Laser Beams cutting down */}
        <motion.line x1="-80" y1="-80" x2="-80" y2="20" stroke="#EF4444" strokeWidth="4" filter="url(#red-glow)" style={{ pathLength: laserDraw }} />
        <motion.line x1="80" y1="-80" x2="80" y2="20" stroke="#EF4444" strokeWidth="4" filter="url(#red-glow)" style={{ pathLength: laserDraw }} />

        {/* Tokens splitting apart into boxes */}
        <motion.g style={{ x: useTransform(splitOffset, v => -v), opacity: tokenOpacity }}>
          <rect x="-200" y="60" width="100" height="40" rx="4" fill="var(--surface)" stroke="var(--primary)" filter="url(#neon-glow)" />
          <text x="-150" y="86" textAnchor="middle" fill="var(--primary)" fontSize="16" letterSpacing="1">un</text>
        </motion.g>

        <motion.g style={{ opacity: tokenOpacity }}>
          <rect x="-70" y="60" width="140" height="40" rx="4" fill="var(--surface)" stroke="var(--primary)" filter="url(#neon-glow)" />
          <text x="0" y="86" textAnchor="middle" fill="var(--primary)" fontSize="16" letterSpacing="1">believ</text>
        </motion.g>

        <motion.g style={{ x: splitOffset, opacity: tokenOpacity }}>
          <rect x="100" y="60" width="100" height="40" rx="4" fill="var(--surface)" stroke="var(--primary)" filter="url(#neon-glow)" />
          <text x="150" y="86" textAnchor="middle" fill="var(--primary)" fontSize="16" letterSpacing="1">able</text>
        </motion.g>

      </g>
    </svg>
  );
};


// --- SCENE 5: Context Window (Tiny Desk) ---
export const Scene5Context = ({ progress }) => {
  // Push items across the desk and cause the left one to fall
  const slideLeft = useTransform(progress, [0.3, 0.6], [0, -80]);
  const fallY = useTransform(progress, [0.6, 0.8], [0, 200]);
  const fallRotate = useTransform(progress, [0.6, 0.8], [0, -45]);
  const fallOpacity = useTransform(progress, [0.7, 0.9], [1, 0]);

  const [expr, setExpr] = React.useState('smart');
  
  React.useEffect(() => {
    return fallY.onChange(v => {
      setExpr(v > 50 ? 'panic' : 'smart');
    });
  }, [fallY]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        <MonkeyFace expression={expr} transform="translate(0, -80)" />
        
        {/* Tiny Desk Limit */}
        <rect x="-140" y="40" width="280" height="10" fill="var(--text-muted)" />
        <path d="M -140 50 L -140 200" stroke="var(--border)" strokeDasharray="10 10" />
        <path d="M 140 50 L 140 200" stroke="var(--border)" strokeDasharray="10 10" />
        <text x="0" y="100" textAnchor="middle" fill="var(--text-muted)" fontSize="20" letterSpacing="4">CONTEXT LIMIT (4K TOKENS)</text>

        {/* Block Falling off the left */}
        <motion.g style={{ x: slideLeft, y: fallY, rotate: fallRotate, opacity: fallOpacity, originX: "-100px", originY: "20px" }}>
           <rect x="-130" y="0" width="60" height="40" rx="2" fill="var(--bg-alt)" stroke="#EF4444" filter="url(#red-glow)" />
           <text x="-100" y="25" textAnchor="middle" fill="#EF4444" fontSize="12">Older Chat</text>
        </motion.g>

        {/* Existing Blocks on Desk */}
        <motion.g style={{ x: slideLeft }}>
           <rect x="-60" y="0" width="60" height="40" rx="2" fill="var(--surface)" stroke="var(--primary)" />
           <text x="-30" y="25" textAnchor="middle" fill="var(--primary)" fontSize="12">Recent</text>
           
           <rect x="10" y="0" width="60" height="40" rx="2" fill="var(--surface)" stroke="var(--primary)" />
           <text x="40" y="25" textAnchor="middle" fill="var(--primary)" fontSize="12">Latest</text>
        </motion.g>

        {/* New Block being shoved in from the right */}
        <rect x="80" y="0" width="60" height="40" rx="2" fill="var(--bg-alt)" stroke="#10B981" filter="url(#neon-glow)" />
        <text x="110" y="25" textAnchor="middle" fill="#10B981" fontSize="12">New Q.</text>
        
        {/* Monkey Push hand */}
        <path d="M 180 -40 Q 150 0 140 20" stroke="var(--primary)" strokeWidth="6" fill="none" />

      </g>
    </svg>
  );
};
