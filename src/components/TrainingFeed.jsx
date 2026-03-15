import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// --- Shared Tech Theme ---
const techTheme = {
  stroke: "var(--primary)",
  strokeWidth: 2,
  fill: "none",
  fontFamily: "'DM Sans', sans-serif"
};

const Defs = () => (
  <defs>
    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

// --- SCENE 1: Autocomplete ---
const AutoPlayScene1 = ({ isInView }) => {
  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(400, 200)">
         <circle cx="0" cy="0" r="40" fill="var(--bg-alt)" stroke="var(--border)" strokeWidth="1" />
         
         {/* Animated Typing */}
         <motion.text x="-180" y="-80" fontSize="32" fill="var(--text)" fontWeight="300" 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            letterSpacing="2">
            "The weather is..."
         </motion.text>
         
         {/* Blinking Cursor */}
         <motion.rect x="80" y="-110" width="4" height="40" fill="var(--primary)" filter="url(#neon-glow)" 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }} 
          />

         {/* Connection Lines generating out */}
         <motion.path d="M 0 40 C 0 100 -120 150 -120 200" stroke="var(--primary)" opacity="0.3" filter="url(#neon-glow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
         />
         <motion.path d="M 0 40 C 0 100 120 150 120 200" stroke="var(--primary)" opacity="0.3" filter="url(#neon-glow)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
         />
         
         {/* Hot Branch Highlight */}
         <motion.g 
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            style={{ originX: "-120px", originY: "200px" }}>
            <rect x="-180" y="200" width="120" height="50" rx="4" fill="rgba(59, 130, 246, 0.1)" stroke="var(--primary)" filter="url(#neon-glow)" />
            <text x="-120" y="232" textAnchor="middle" fontSize="20" fill="#fff" letterSpacing="1">HOT [0.85]</text>
         </motion.g>

         {/* Cold Branch */}
         <motion.g 
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            style={{ originX: "120px", originY: "200px" }}>
            <rect x="60" y="200" width="120" height="50" rx="4" fill="var(--bg-alt)" stroke="var(--text-muted)" />
            <text x="120" y="232" textAnchor="middle" fontSize="18" fill="var(--text-muted)" letterSpacing="1">COLD [0.15]</text>
         </motion.g>
      </g>
    </svg>
  );
};

// --- SCENE 4: Tokenization ---
const AutoPlayScene4 = ({ isInView }) => {
  return (
    <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <g transform="translate(400, 250)">
        
        <text x="0" y="0" textAnchor="middle" fontSize="48" fill="#fff" fontWeight="bold" letterSpacing="4">
          <tspan dx="-80">un</tspan>
          <tspan dx="20">believ</tspan>
          <tspan dx="20">able</tspan>
        </text>

        {/* Lasers cutting down */}
        <motion.line x1="-80" y1="-100" x2="-80" y2="100" stroke="#EF4444" strokeWidth="2" filter="url(#neon-glow)" 
          initial={{ y1: -100, y2: -100, opacity: 0 }}
          animate={isInView ? { y1: -100, y2: 100, opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.line x1="80" y1="-100" x2="80" y2="100" stroke="#EF4444" strokeWidth="2" filter="url(#neon-glow)" 
          initial={{ y1: -100, y2: -100, opacity: 0 }}
          animate={isInView ? { y1: -100, y2: 100, opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        />

        {/* Tokens splitting apart */}
        <motion.g 
          initial={{ x: 0, opacity: 0 }}
          animate={isInView ? { x: -40, opacity: 1 } : { x: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5, type: 'spring' }}
        >
          <rect x="-200" y="60" width="100" height="40" fill="rgba(59, 130, 246, 0.1)" stroke="var(--primary)" />
          <text x="-150" y="85" textAnchor="middle" fill="var(--primary)" fontSize="14" letterSpacing="2">TOKEN_42</text>
        </motion.g>

        <motion.g 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <rect x="-70" y="60" width="140" height="40" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" />
          <text x="0" y="85" textAnchor="middle" fill="#10B981" fontSize="14" letterSpacing="2">TOKEN_891</text>
        </motion.g>

        <motion.g 
          initial={{ x: 0, opacity: 0 }}
          animate={isInView ? { x: 40, opacity: 1 } : { x: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5, type: 'spring' }}
        >
          <rect x="100" y="60" width="100" height="40" fill="rgba(245, 158, 11, 0.1)" stroke="#F59E0B" />
          <text x="150" y="85" textAnchor="middle" fill="#F59E0B" fontSize="14" letterSpacing="2">TOKEN_03</text>
        </motion.g>

      </g>
    </svg>
  );
};


// --- FEED CONTENT DATA ---
const feedData = [
  {
    id: 1,
    title: "The Illusion of Thought",
    content: "Language models do not think. At their absolute core, they are statistical engines designed to do exactly one thing: predict the next character based on everything before it. The magic happens because the neural networks are so impossibly large, the predictions mimic true understanding.",
    Visual: AutoPlayScene1
  },
  {
    id: 2,
    title: "Tokenization",
    content: "Despite being called 'Language' models, they cannot read words. Text is sliced into optimal computational blocks called Tokens. 'Unbelievable' breaks into 'un', 'believ', 'able'. This is critical because API costs and computational limits are strictly based on tokens, not words.",
    Visual: AutoPlayScene4
  },
  {
    id: 3,
    title: "The Context Window",
    content: "The Context Window is the strict maximum number of tokens the model can hold in its working memory at one time. When the window fills up, the oldest data simply falls out of existence. Models also suffer from 'Lost in the Middle'—they remember what you said first and last, but get blurry in the center.",
    Visual: () => <div style={{ color: 'var(--primary)', textAlign: 'center', marginTop: '40vh' }}>[ Context Buffer Animation ]</div>
  }
];

// --- INDIVIDUAL SLIDE ---
const TrainingSlide = ({ data, isFirst }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 }); // Triggers when 60% of the slide is visible

  return (
    <div 
      ref={ref}
      style={{
        height: '100vh',
        width: '100vw',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#030712',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden'
      }}
    >
      {/* Background Graphic Engine */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8 }}>
         <data.Visual isInView={isInView} />
      </div>

      {/* Foreground Text Overlay */}
      <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          width: '100%', 
          padding: '10vh 20px', 
          background: 'linear-gradient(to top, rgba(3,7,18,1) 0%, rgba(3,7,18,0.8) 50%, rgba(3,7,18,0) 100%)',
          zIndex: 10 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', fontFamily: 'Fraunces, serif', fontWeight: 300, marginBottom: '16px' }}>
              {data.title}
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {data.content}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Helper Indicator for first slide */}
      {isFirst && (
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', zIndex: 20 }}
        >
          SWIPE UP TIKTOK STYLE
        </motion.div>
      )}
    </div>
  );
};

// --- THE MAIN FEED ---
export default function TrainingFeed() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)', // Break out of container
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollSnapType: 'y mandatory', // The magic Shorts/TikTok property
      backgroundColor: '#000',
      scrollBehavior: 'smooth',
      WebkitOverflowScrolling: 'touch' // Smooth momentum scrolling on iOS
    }}>
      {feedData.map((data, index) => (
        <TrainingSlide key={data.id} data={data} isFirst={index === 0} />
      ))}
    </div>
  );
}
