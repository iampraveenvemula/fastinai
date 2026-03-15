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
    <linearGradient id="primary-fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
      <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
    </linearGradient>
  </defs>
);

// --- SCENE 1: Autocomplete (The Cursor) ---
export const Scene1Autocomplete = ({ progress }) => {
  // progress goes from 0 to 1 as the user scrolls through this section
  const dashOffset = useTransform(progress, [0, 0.4], [1000, 0]);
  const textOpacity = useTransform(progress, [0.3, 0.5], [0, 1]);
  const blinkOpacity = useTransform(progress, p => (Math.floor(p * 20) % 2 === 0 ? 1 : 0));
  
  const branchScale = useTransform(progress, [0.6, 0.8], [0, 1]);
  const branchOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
         {/* Central Node */}
         <circle cx="0" cy="0" r="40" fill="var(--bg-alt)" stroke="var(--border)" strokeWidth="1" />
         
         {/* The Typed Text */}
         <motion.text x="-180" y="-120" fontSize="32" fill="var(--text)" fontWeight="300" 
            style={{ opacity: textOpacity }} letterSpacing="2">
            "The weather is..."
         </motion.text>
         <motion.rect x="80" y="-150" width="4" height="40" fill="var(--primary)" filter="url(#neon-glow)" style={{ opacity: blinkOpacity }} />

         {/* Connection Lines generating out */}
         <motion.path d="M 0 40 C 0 100 -120 150 -120 200" stroke="var(--primary)" strokeDasharray="1000" style={{ strokeDashoffset: dashOffset }} opacity="0.3" filter="url(#neon-glow)" />
         <motion.path d="M 0 40 C 0 100 120 150 120 200" stroke="var(--primary)" strokeDasharray="1000" style={{ strokeDashoffset: dashOffset }} opacity="0.3" filter="url(#neon-glow)" />
         
         {/* Hot Branch */}
         <motion.g style={{ scale: branchScale, opacity: branchOpacity, originX: "-120px", originY: "200px" }}>
            <rect x="-180" y="200" width="120" height="50" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="var(--primary)" filter="url(#neon-glow)" />
            <text x="-120" y="232" textAnchor="middle" fontSize="20" fill="#fff" letterSpacing="1">HOT [0.85]</text>
         </motion.g>

         {/* Cold Branch */}
         <motion.g style={{ scale: branchScale, opacity: branchOpacity, originX: "120px", originY: "200px" }}>
            <rect x="60" y="200" width="120" height="50" rx="4" fill="var(--bg-alt)" stroke="var(--text-muted)" />
            <text x="120" y="232" textAnchor="middle" fontSize="18" fill="var(--text-muted)" letterSpacing="1">COLD [0.15]</text>
         </motion.g>
      </g>
    </svg>
  );
};

// --- SCENE 2: Evolution (Timeline Data Stream) ---
export const Scene2Evolution = ({ progress }) => {
  const lineLength = useTransform(progress, [0, 0.7], [0, 600]);
  const node1Opacity = useTransform(progress, [0.1, 0.2], [0, 1]);
  const node2Opacity = useTransform(progress, [0.3, 0.4], [0, 1]);
  const node3Opacity = useTransform(progress, [0.5, 0.6], [0, 1]);
  
  const explosionScale = useTransform(progress, [0.65, 0.8], [0, 1.5]);
  const explosionOpacity = useTransform(progress, [0.65, 0.8, 0.9], [0, 1, 0]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(150, 300)">
        
        {/* Main Timeline Data Stream */}
        <motion.line x1="0" y1="0" x2={lineLength} y2="0" stroke="var(--text-muted)" strokeWidth="1" />
        <motion.line x1="0" y1="0" x2={lineLength} y2="0" stroke="url(#primary-fade)" strokeWidth="4" filter="url(#neon-glow)" style={{ opacity: 0.5 }} />

        {/* N-Grams */}
        <motion.g style={{ opacity: node1Opacity }} transform="translate(100, 0)">
          <circle cx="0" cy="0" r="8" fill="var(--bg-alt)" stroke="var(--text-muted)" />
          <text x="0" y="30" textAnchor="middle" fill="var(--text-muted)" fontSize="14">1990s</text>
          <text x="0" y="-20" textAnchor="middle" fill="var(--text-light)" fontSize="16" letterSpacing="2">N-GRAMS</text>
        </motion.g>

        {/* Neural */}
        <motion.g style={{ opacity: node2Opacity }} transform="translate(300, 0)">
          <circle cx="0" cy="0" r="8" fill="var(--bg-alt)" stroke="var(--primary)" filter="url(#neon-glow)" />
          <text x="0" y="30" textAnchor="middle" fill="var(--text-muted)" fontSize="14">2013</text>
          <text x="0" y="-20" textAnchor="middle" fill="#fff" fontSize="16" letterSpacing="2">EMBEDDINGS (RNN)</text>
        </motion.g>

        {/* Transformers */}
        <motion.g style={{ opacity: node3Opacity }} transform="translate(500, 0)">
          <circle cx="0" cy="0" r="10" fill="#FACC15" filter="url(#neon-glow)" />
          <text x="0" y="30" textAnchor="middle" fill="var(--text-muted)" fontSize="14">2017</text>
          <text x="0" y="-20" textAnchor="middle" fill="#FACC15" fontSize="20" fontWeight="bold" letterSpacing="2">TRANSFORMER</text>
          
          {/* Explosion / Shockwave */}
          <motion.circle cx="0" cy="0" r="100" stroke="#FACC15" strokeWidth="2" fill="none" 
             style={{ scale: explosionScale, opacity: explosionOpacity }} filter="url(#neon-glow)" />
          <motion.circle cx="0" cy="0" r="150" stroke="#FACC15" strokeWidth="1" fill="none" 
             style={{ scale: explosionScale, opacity: explosionOpacity }} />
        </motion.g>
      </g>
    </svg>
  );
};

// --- SCENE 3: Attention (Matrix Mapping) ---
export const Scene3Attention = ({ progress }) => {
  const lineDraw = useTransform(progress, [0.2, 0.6], [1000, 0]);
  const highlightOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);
  
  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        {/* Sentence Grid Layout */}
        <text x="-250" y="-50" fontSize="24" fill="var(--text-muted)">The</text>
        <rect x="-180" y="-80" width="140" height="40" fill="rgba(255,255,255,0.05)" />
        <text x="-110" y="-50" textAnchor="middle" fontSize="24" fill="#fff" fontWeight="bold">astronaut</text>
        
        <text x="0" y="-50" textAnchor="middle" fontSize="24" fill="var(--text-muted)">finally</text>
        
        <rect x="80" y="-80" width="120" height="40" fill="rgba(250, 204, 21, 0.05)" />
        <text x="140" y="-50" textAnchor="middle" fontSize="24" fill="#FACC15" fontWeight="bold">boarded</text>

        <text x="-150" y="50" fontSize="24" fill="var(--text-muted)">the</text>
        <text x="-50" y="50" fontSize="24" fill="var(--text-light)">rocket</text>
        
        <rect x="80" y="20" width="80" height="40" fill="rgba(255,255,255,0.05)" />
        <text x="120" y="50" textAnchor="middle" fontSize="24" fill="#fff" fontWeight="bold">she</text>

        {/* Attention Connection: 'she' to 'astronaut' */}
        <motion.path 
          d="M 120 20 C 120 -80 -110 -20 -110 -40" 
          stroke="var(--primary)" strokeWidth="3" filter="url(#neon-glow)" 
          strokeDasharray="1000" style={{ strokeDashoffset: lineDraw }} 
        />
        
        {/* Attention Connection: 'boarded' to 'rocket' */}
        <motion.path 
          d="M 140 -40 C 140 0 -30 -10 -30 30" 
          stroke="#FACC15" strokeWidth="2" strokeDasharray="6 6" opacity="0.5"
          style={{ strokeDashoffset: lineDraw }}
        />

        {/* Global Highlight Overlay */}
        <motion.g style={{ opacity: highlightOpacity }}>
          <circle cx="0" cy="-10" r="300" fill="url(#primary-fade)" opacity="0.1" />
          <circle cx="-110" cy="-60" r="6" fill="var(--primary)" filter="url(#neon-glow)" />
          <circle cx="120" cy="40" r="6" fill="var(--primary)" filter="url(#neon-glow)" />
        </motion.g>

      </g>
    </svg>
  );
};

// --- SCENE 4: Tokenization (Data Slicing) ---
export const Scene4Tokens = ({ progress }) => {
  const sliceY = useTransform(progress, [0.1, 0.4], [-100, 100]);
  const splitOffset = useTransform(progress, [0.4, 0.6], [0, 40]);
  const tokenOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        {/* Core Word */}
        <text x="0" y="0" textAnchor="middle" fontSize="48" fill="#fff" fontWeight="bold" letterSpacing="4">
          <tspan dx="-80">un</tspan>
          <tspan dx="20">believ</tspan>
          <tspan dx="20">able</tspan>
        </text>

        {/* Precision Lasers cutting the word */}
        <motion.line x1="-80" y1={sliceY} x2="-80" y2="100" stroke="#EF4444" strokeWidth="2" filter="url(#neon-glow)" />
        <motion.line x1="80" y1={sliceY} x2="80" y2="100" stroke="#EF4444" strokeWidth="2" filter="url(#neon-glow)" />

        {/* Sliced Tokens moving apart */}
        <motion.g style={{ x: useTransform(splitOffset, v => -v), opacity: tokenOpacity }}>
          <rect x="-200" y="60" width="100" height="40" fill="rgba(59, 130, 246, 0.1)" stroke="var(--primary)" />
          <text x="-150" y="85" textAnchor="middle" fill="var(--primary)" fontSize="14" letterSpacing="2">TOKEN_42</text>
        </motion.g>

        <motion.g style={{ opacity: tokenOpacity }}>
          <rect x="-70" y="60" width="140" height="40" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" />
          <text x="0" y="85" textAnchor="middle" fill="#10B981" fontSize="14" letterSpacing="2">TOKEN_891</text>
        </motion.g>

        <motion.g style={{ x: splitOffset, opacity: tokenOpacity }}>
          <rect x="100" y="60" width="100" height="40" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" />
          <text x="150" y="85" textAnchor="middle" fill="#F59E0B" fontSize="14" letterSpacing="2">TOKEN_03</text>
        </motion.g>

      </g>
    </svg>
  );
};

// --- SCENE 5: Context Window (Data Overflow) ---
export const Scene5Context = ({ progress }) => {
  const block1Y = useTransform(progress, [0.1, 0.3], [-200, 0]);
  const block2Y = useTransform(progress, [0.2, 0.4], [-200, 0]);
  const block3Y = useTransform(progress, [0.3, 0.5], [-200, 0]);
  const block4Y = useTransform(progress, [0.4, 0.6], [-200, 0]);
  
  const overflowX = useTransform(progress, [0.6, 0.8], [0, -100]);
  const overflowY = useTransform(progress, [0.6, 0.7, 0.8], [0, -20, 200]);
  const overflowOpacity = useTransform(progress, [0.7, 0.8], [1, 0]);
  const overflowRotate = useTransform(progress, [0.6, 0.8], [0, -45]);

  const slideLeft = useTransform(progress, [0.6, 0.8], [0, -60]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        {/* Working Memory Array (The Desk) */}
        <rect x="-160" y="40" width="320" height="20" fill="var(--bg-alt)" stroke="var(--border)" />
        <text x="0" y="80" textAnchor="middle" fill="var(--text-muted)" fontSize="14" letterSpacing="4">WORKING MEMORY BUFFER</text>

        {/* Initial Overloading Block */}
        <motion.g style={{ x: overflowX, y: overflowY, opacity: overflowOpacity, rotate: overflowRotate, originX: "-120px", originY: "20px" }}>
          <rect x="-150" y="0" width="50" height="40" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" filter="url(#neon-glow)" />
          <text x="-125" y="25" textAnchor="middle" fill="#EF4444" fontSize="12">t-n</text>
        </motion.g>

        {/* Existing Blocks pushing left */}
        <motion.g style={{ x: slideLeft }}>
          <motion.rect x="-90" y={block1Y} width="50" height="40" fill="rgba(59, 130, 246, 0.2)" stroke="var(--primary)" />
          <motion.rect x="-30" y={block2Y} width="50" height="40" fill="rgba(59, 130, 246, 0.2)" stroke="var(--primary)" />
          <motion.rect x="30" y={block3Y} width="50" height="40" fill="rgba(59, 130, 246, 0.2)" stroke="var(--primary)" />
        </motion.g>
        
        {/* New Block causing the overflow */}
        <motion.rect x="90" y={block4Y} width="50" height="40" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" filter="url(#neon-glow)" />

      </g>
    </svg>
  );
};

// --- SCENE 6: Model Decision (Neural Pathways) ---
export const Scene6Decision = ({ progress }) => {
  const lineDraw1 = useTransform(progress, [0.1, 0.3], [500, 0]);
  const lineDraw2 = useTransform(progress, [0.3, 0.5], [500, 0]);
  const lineDraw3 = useTransform(progress, [0.5, 0.7], [500, 0]);
  
  const node1Op = useTransform(progress, [0.2, 0.3], [0, 1]);
  const node2Op = useTransform(progress, [0.4, 0.5], [0, 1]);
  const node3Op = useTransform(progress, [0.6, 0.7], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 200)">
        
        {/* Root Node: The Task */}
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="var(--bg-alt)" stroke="#fff" filter="url(#neon-glow)" />
        <text x="0" y="5" textAnchor="middle" fill="#fff" fontSize="16" letterSpacing="2">THE TASK</text>

        {/* Fast Path */}
        <motion.path d="M -60 0 C -200 0 -200 100 -200 150" stroke="var(--text-muted)" strokeDasharray="500" style={{ strokeDashoffset: lineDraw1 }} />
        <motion.g style={{ opacity: node1Op }} transform="translate(-200, 150)">
          <rect x="-60" y="0" width="120" height="40" rx="4" fill="var(--bg-alt)" stroke="var(--text-muted)" />
          <text x="0" y="25" textAnchor="middle" fill="var(--text-muted)" fontSize="12">SPEED / VOLUME</text>
          <text x="0" y="60" textAnchor="middle" fill="var(--text-light)" fontSize="12">Gemini Flash</text>
        </motion.g>

        {/* Complex Path */}
        <motion.path d="M 60 0 C 200 0 200 100 200 150" stroke="var(--text-muted)" strokeDasharray="500" style={{ strokeDashoffset: lineDraw2 }} />
        <motion.g style={{ opacity: node2Op }} transform="translate(200, 150)">
          <rect x="-60" y="0" width="120" height="40" rx="4" fill="var(--bg-alt)" stroke="var(--text-muted)" />
          <text x="0" y="25" textAnchor="middle" fill="var(--text-muted)" fontSize="12">HARD CODING</text>
          <text x="0" y="60" textAnchor="middle" fill="var(--text-light)" fontSize="12">Claude 3.5 Sonnet</text>
        </motion.g>

        {/* General Path (The glowing center) */}
        <motion.path d="M 0 20 L 0 200" stroke="var(--primary)" strokeWidth="3" filter="url(#neon-glow)" strokeDasharray="500" style={{ strokeDashoffset: lineDraw3 }} />
        <motion.g style={{ opacity: node3Op }} transform="translate(0, 200)">
           <rect x="-80" y="0" width="160" height="50" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="var(--primary)" filter="url(#neon-glow)" />
           <text x="0" y="30" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" letterSpacing="1">GENERAL PURPOSE</text>
           <text x="0" y="70" textAnchor="middle" fill="var(--primary)" fontSize="12">GPT-4o</text>
        </motion.g>

      </g>
    </svg>
  );
};
