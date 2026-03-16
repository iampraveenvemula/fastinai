import React from 'react';
import { motion, useTransform } from 'framer-motion';

// --- Shared Styles for the "Glass & Light" aesthetic ---
const glassTheme = {
  stroke: "rgba(255, 255, 255, 0.2)",
  strokeWidth: 1.5,
  fill: "none",
  fontFamily: "'Inter', sans-serif",
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

const colors = {
  cyan: "#22d3ee",
  violet: "#a78bfa",
  blue: "#3b82f6",
  white: "#f8fafc",
  glassFill: "url(#glass-gradient)",
  glassStroke: "rgba(255, 255, 255, 0.15)",
};

// GLOW FILTERS AND DEFS
export const Defs = () => (
  <defs>
    <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="glass-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
      <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
    </linearGradient>
    <linearGradient id="fade-right" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={colors.white} stopOpacity="0" />
      <stop offset="50%" stopColor={colors.white} stopOpacity="1" />
      <stop offset="100%" stopColor={colors.white} stopOpacity="0" />
    </linearGradient>
  </defs>
);

// --- SCENE 1: Autocomplete (The Cursor) ---
export const Scene1Autocomplete = ({ progress }) => {
  const dashOffset = useTransform(progress, [0, 0.4], [1000, 0]);
  const textOpacity = useTransform(progress, [0.3, 0.5], [0, 1]);
  const blinkOpacity = useTransform(progress, p => (Math.floor(p * 20) % 2 === 0 ? 1 : 0));
  
  const branchScale = useTransform(progress, [0.6, 0.8], [0, 1]);
  const branchOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={glassTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
         {/* Central Node */}
         <circle cx="0" cy="0" r="40" fill={colors.glassFill} stroke={colors.cyan} filter="url(#glow-cyan)" />
         <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(255,255,255,0.1)" />
         
         {/* The Typed Text */}
         <motion.text x="-180" y="-120" fontSize="32" fill={colors.white} fontWeight="300" 
            style={{ opacity: textOpacity }} letterSpacing="2">
            "The weather is..."
         </motion.text>
         <motion.rect x="80" y="-150" width="2" height="40" fill={colors.cyan} filter="url(#glow-cyan)" style={{ opacity: blinkOpacity }} />

         {/* Fiber Optic Data Lines */}
         <motion.path d="M 0 40 C 0 100 -120 150 -120 200" stroke={colors.cyan} strokeWidth="2" strokeDasharray="1000" style={{ strokeDashoffset: dashOffset }} opacity="0.8" filter="url(#glow-cyan)" />
         <motion.path d="M 0 40 C 0 100 120 150 120 200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="1000" style={{ strokeDashoffset: dashOffset }} />
         
         {/* Hot Branch (High Probability) */}
         <motion.g style={{ scale: branchScale, opacity: branchOpacity, originX: "-120px", originY: "200px" }}>
            <rect x="-180" y="200" width="120" height="50" rx="6" fill={colors.glassFill} stroke={colors.cyan} />
            <rect x="-178" y="202" width="116" height="46" rx="4" fill="rgba(34, 211, 238, 0.05)" stroke="none" />
            <text x="-120" y="232" textAnchor="middle" fontSize="16" fill={colors.white} fontWeight="500" letterSpacing="1">HOT [0.85]</text>
         </motion.g>

         {/* Cold Branch */}
         <motion.g style={{ scale: branchScale, opacity: branchOpacity, originX: "120px", originY: "200px" }}>
            <rect x="60" y="200" width="120" height="50" rx="6" fill={colors.glassFill} stroke={colors.glassStroke} />
            <text x="120" y="232" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.4)" letterSpacing="1">COLD [0.15]</text>
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
  
  const pulseScale = useTransform(progress, [0.65, 0.8], [1, 2.5]);
  const pulseOpacity = useTransform(progress, [0.65, 0.8, 0.9], [0, 1, 0]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={glassTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(150, 300)">
        
        {/* Main Neural River */}
        <motion.line x1="0" y1="0" x2={lineLength} y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <motion.line x1="0" y1="0" x2={lineLength} y2="0" stroke="url(#fade-right)" strokeWidth="8" style={{ opacity: 0.1 }} />

        {/* N-Grams */}
        <motion.g style={{ opacity: node1Opacity }} transform="translate(100, 0)">
          <circle cx="0" cy="0" r="12" fill={colors.glassFill} stroke={colors.glassStroke} />
          <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.4)" stroke="none" />
          <text x="0" y="35" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12">1990s</text>
          <text x="0" y="-25" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="14" fontWeight="600" letterSpacing="2">N-GRAMS</text>
        </motion.g>

        {/* Neural Embeddings */}
        <motion.g style={{ opacity: node2Opacity }} transform="translate(300, 0)">
          <circle cx="0" cy="0" r="16" fill={colors.glassFill} stroke={colors.violet} filter="url(#glow-violet)" opacity="0.4" />
          <circle cx="0" cy="0" r="12" fill={colors.glassFill} stroke={colors.violet} />
          <text x="0" y="35" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12">2013</text>
          <text x="0" y="-25" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="600" letterSpacing="2">EMBEDDINGS (RNN)</text>
        </motion.g>

        {/* Transformers */}
        <motion.g style={{ opacity: node3Opacity }} transform="translate(500, 0)">
          <circle cx="0" cy="0" r="24" fill={colors.glassFill} stroke={colors.cyan} filter="url(#glow-cyan)" opacity="0.6"/>
          <circle cx="0" cy="0" r="16" fill={colors.cyan} stroke="none" />
          <text x="0" y="45" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12">2017</text>
          <text x="0" y="-35" textAnchor="middle" fill={colors.cyan} fontSize="18" fontWeight="bold" letterSpacing="2" filter="url(#glow-cyan)">TRANSFORMER</text>
          
          {/* Energy Pulse */}
          <motion.circle cx="0" cy="0" r="30" stroke={colors.cyan} strokeWidth="2" fill="none" 
             style={{ scale: pulseScale, opacity: pulseOpacity }} filter="url(#glow-cyan)" />
          <motion.circle cx="0" cy="0" r="40" stroke={colors.cyan} strokeWidth="1" fill="none" 
             style={{ scale: pulseScale, opacity: pulseOpacity }} />
        </motion.g>
      </g>
    </svg>
  );
};

// --- SCENE 3: Attention (Matrix Mapping) ---
export const Scene3Attention = ({ progress }) => {
  const lineDraw = useTransform(progress, [0.6, 0.85], [1000, 0]);
  const highlightOpacity = useTransform(progress, [0.75, 0.9], [0, 1]);
  
  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={glassTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        {/* Sentence Grid Layout (Modern typography) */}
        <text x="-250" y="-50" fontSize="20" fill="rgba(255,255,255,0.4)">The</text>
        <rect x="-180" y="-80" width="140" height="40" rx="6" fill={colors.glassFill} stroke={colors.glassStroke} />
        <text x="-110" y="-55" textAnchor="middle" fontSize="20" fill={colors.white} fontWeight="500">astronaut</text>
        
        <text x="0" y="-50" textAnchor="middle" fontSize="20" fill="rgba(255,255,255,0.4)">finally</text>
        
        <rect x="80" y="-80" width="120" height="40" rx="6" fill="rgba(34, 211, 238, 0.05)" stroke={colors.cyan} filter="url(#glow-cyan)" opacity="0.5"/>
        <rect x="80" y="-80" width="120" height="40" rx="6" fill="none" stroke={colors.cyan} />
        <text x="140" y="-55" textAnchor="middle" fontSize="20" fill={colors.cyan} fontWeight="600">boarded</text>

        <text x="-150" y="50" fontSize="20" fill="rgba(255,255,255,0.4)">the</text>
        <text x="-50" y="50" fontSize="20" fill="rgba(255,255,255,0.6)">rocket</text>
        
        <rect x="80" y="20" width="80" height="40" rx="6" fill={colors.glassFill} stroke={colors.glassStroke} />
        <text x="120" y="45" textAnchor="middle" fontSize="20" fill={colors.white} fontWeight="500">she</text>

        {/* Attention Arc: 'she' to 'astronaut' */}
        <motion.path 
          d="M 120 20 C 120 -80 -110 -20 -110 -40" 
          stroke={colors.cyan} strokeWidth="2" filter="url(#glow-cyan)" 
          strokeDasharray="1000" style={{ strokeDashoffset: lineDraw }} 
        />
        
        {/* Weak Attention */}
        <motion.path 
          d="M 140 -40 C 140 0 -30 -10 -30 30" 
          stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" 
          style={{ strokeDashoffset: lineDraw }}
        />

        {/* Data Link Nodes */}
        <motion.g style={{ opacity: highlightOpacity }}>
          <circle cx="-110" cy="-60" r="4" fill={colors.cyan} filter="url(#glow-cyan)" />
          <circle cx="120" cy="40" r="4" fill={colors.cyan} filter="url(#glow-cyan)" />
          <circle cx="-110" cy="-60" r="10" fill="none" stroke={colors.cyan} opacity="0.4" />
          <circle cx="120" cy="40" r="10" fill="none" stroke={colors.cyan} opacity="0.4" />
        </motion.g>

      </g>
    </svg>
  );
};

// --- SCENE 4: Tokenization (Data Slicing) ---
export const Scene4Tokens = ({ progress }) => {
  const sliceY = useTransform(progress, [0.35, 0.55], [-100, 100]);
  const splitOffset = useTransform(progress, [0.55, 0.66], [0, 40]);
  const tokenOpacity = useTransform(progress, [0.5, 0.66], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={glassTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        {/* Core Word */}
        <text x="0" y="0" textAnchor="middle" fontSize="48" fill={colors.white} fontWeight="700" letterSpacing="4">
          <tspan dx="-80">un</tspan>
          <tspan dx="20">believ</tspan>
          <tspan dx="20">able</tspan>
        </text>

        {/* Lasers cutting the word */}
        <motion.line x1="-80" y1={sliceY} x2="-80" y2="100" stroke={colors.violet} strokeWidth="2" filter="url(#glow-violet)" />
        <motion.line x1="80" y1={sliceY} x2="80" y2="100" stroke={colors.violet} strokeWidth="2" filter="url(#glow-violet)" />

        {/* Data Chips (Tokens) */}
        <motion.g style={{ x: useTransform(splitOffset, v => -v), opacity: tokenOpacity }}>
          <rect x="-200" y="60" width="100" height="40" rx="4" fill={colors.glassFill} stroke="rgba(255,255,255,0.2)" />
          <text x="-150" y="85" textAnchor="middle" fill={colors.white} fontSize="12" letterSpacing="1" fontWeight="500">TOKEN_42</text>
        </motion.g>

        <motion.g style={{ opacity: tokenOpacity }}>
          <rect x="-70" y="60" width="140" height="40" rx="4" fill="rgba(34, 211, 238, 0.05)" stroke={colors.cyan} filter="url(#glow-cyan)" opacity="0.5" />
          <rect x="-70" y="60" width="140" height="40" rx="4" fill="none" stroke={colors.cyan} />
          <text x="0" y="85" textAnchor="middle" fill={colors.cyan} fontSize="12" letterSpacing="1" fontWeight="600">TOKEN_891</text>
        </motion.g>

        <motion.g style={{ x: splitOffset, opacity: tokenOpacity }}>
          <rect x="100" y="60" width="100" height="40" rx="4" fill={colors.glassFill} stroke="rgba(255,255,255,0.2)" />
          <text x="150" y="85" textAnchor="middle" fill={colors.white} fontSize="12" letterSpacing="1" fontWeight="500">TOKEN_03</text>
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
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={glassTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 300)">
        
        {/* Working Node Array Base */}
        <rect x="-160" y="40" width="320" height="12" rx="6" fill={colors.glassFill} stroke="rgba(255,255,255,0.1)" />
        <text x="0" y="75" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="12" letterSpacing="4" fontWeight="600">CONTEXT WINDOW (BUFFER)</text>

        {/* Initial Overloading Block */}
        <motion.g style={{ x: overflowX, y: overflowY, opacity: overflowOpacity, rotate: overflowRotate, originX: "-120px", originY: "20px" }}>
          <rect x="-150" y="0" width="50" height="40" rx="4" fill="rgba(167, 139, 250, 0.1)" stroke={colors.violet} filter="url(#glow-violet)" />
          <text x="-125" y="25" textAnchor="middle" fill={colors.violet} fontSize="12" fontWeight="500">t-n</text>
        </motion.g>

        {/* Existing Blocks pushing left */}
        <motion.g style={{ x: slideLeft }}>
          <motion.rect x="-90" y={block1Y} width="50" height="40" rx="4" fill={colors.glassFill} stroke={colors.glassStroke} />
          <motion.rect x="-30" y={block2Y} width="50" height="40" rx="4" fill={colors.glassFill} stroke={colors.glassStroke} />
          <motion.rect x="30" y={block3Y} width="50" height="40" rx="4" fill={colors.glassFill} stroke={colors.glassStroke} />
        </motion.g>
        
        {/* Glowing New Block arriving */}
        <motion.rect x="90" y={block4Y} width="50" height="40" rx="4" fill="rgba(34, 211, 238, 0.1)" stroke={colors.cyan} filter="url(#glow-cyan)" />

      </g>
    </svg>
  );
};

// --- SCENE 6: Model Decision (Neural Pathways) ---
export const Scene6Decision = ({ progress }) => {
  const lineDraw1 = useTransform(progress, [0.25, 0.4], [500, 0]);
  const lineDraw2 = useTransform(progress, [0.5, 0.65], [500, 0]);
  const lineDraw3 = useTransform(progress, [0.75, 0.9], [500, 0]);
  
  const node1Op = useTransform(progress, [0.35, 0.45], [0, 1]);
  const node2Op = useTransform(progress, [0.6, 0.7], [0, 1]);
  const node3Op = useTransform(progress, [0.85, 0.95], [0, 1]);

  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={glassTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(450, 200)">
        
        {/* Root Node: The Task */}
        <rect x="-60" y="-20" width="120" height="40" rx="6" fill={colors.glassFill} stroke={colors.white} />
        <text x="0" y="5" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="600" letterSpacing="2">THE TASK</text>

        {/* Fast Path */}
        <motion.path d="M -60 0 C -200 0 -200 100 -200 150" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="500" style={{ strokeDashoffset: lineDraw1 }} />
        <motion.g style={{ opacity: node1Op }} transform="translate(-200, 150)">
          <rect x="-70" y="0" width="140" height="40" rx="6" fill={colors.glassFill} stroke={colors.glassStroke} />
          <text x="0" y="15" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="600">HIGH THROUGHPUT</text>
          <text x="0" y="30" textAnchor="middle" fill={colors.white} fontSize="12" fontWeight="500">Gemini Flash</text>
        </motion.g>

        {/* Complex Path */}
        <motion.path d="M 60 0 C 200 0 200 100 200 150" stroke={colors.violet} strokeWidth="2" filter="url(#glow-violet)" strokeDasharray="500" style={{ strokeDashoffset: lineDraw2 }} opacity="0.6"/>
        <motion.g style={{ opacity: node2Op }} transform="translate(200, 150)">
          <rect x="-70" y="0" width="140" height="40" rx="6" fill="rgba(167, 139, 250, 0.05)" stroke={colors.violet} />
          <text x="0" y="15" textAnchor="middle" fill={colors.violet} fontSize="10" fontWeight="600">COMPLEX REASONING</text>
          <text x="0" y="30" textAnchor="middle" fill={colors.white} fontSize="12" fontWeight="500">Claude 3.5 Sonnet</text>
        </motion.g>

        {/* General Path (The main glowing center) */}
        <motion.path d="M 0 20 L 0 200" stroke={colors.cyan} strokeWidth="3" filter="url(#glow-cyan)" strokeDasharray="500" style={{ strokeDashoffset: lineDraw3 }} />
        <motion.g style={{ opacity: node3Op }} transform="translate(0, 200)">
           <rect x="-80" y="0" width="160" height="50" rx="6" fill="rgba(34, 211, 238, 0.05)" stroke={colors.cyan} filter="url(#glow-cyan)" opacity="0.5" />
           <rect x="-80" y="0" width="160" height="50" rx="6" fill="none" stroke={colors.cyan} />
           <text x="0" y="20" textAnchor="middle" fill={colors.white} fontSize="12" fontWeight="bold" letterSpacing="1">GENERAL PURPOSE</text>
           <text x="0" y="38" textAnchor="middle" fill={colors.cyan} fontSize="14" fontWeight="500">GPT-4o</text>
        </motion.g>

      </g>
    </svg>
  );
};
