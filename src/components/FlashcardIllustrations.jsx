import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Styles for the "Hand-drawn" aesthetic ---
const drawTheme = {
  stroke: "var(--primary)",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
  fontFamily: "'Caveat', cursive, sans-serif"
};

// --- SVG 1: What is an LLM? (Autocomplete) ---
export const AutocompleteSVG = ({ isActive }) => {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" style={drawTheme}>
      {isActive && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Main user text bubble */}
          <motion.path 
            d="M 50 100 Q 200 80 350 100 Q 370 120 350 140 Q 200 160 50 140 Z" 
            stroke="var(--text-muted)" strokeWidth={2} strokeDasharray="6 6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
          />
          <text x="70" y="125" fontSize="24" fill="var(--text)" stroke="none">"The weather is..."</text>
          
          {/* Prediction branches */}
          <motion.path d="M 280 140 C 280 200 200 200 150 250" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.8 }} />
          <motion.path d="M 300 140 C 300 200 320 200 350 250" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.8 }} />
          
          {/* Predicted Words */}
          <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, type: "spring" }}>
            <rect x="100" y="240" width="100" height="40" rx="10" fill="var(--bg-alt)" stroke="var(--primary)" strokeWidth={2} />
            <text x="120" y="265" fontSize="22" fill="var(--primary)" stroke="none">hot (80%)</text>
          </motion.g>

          <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.0, type: "spring" }}>
             <rect x="300" y="240" width="80" height="40" rx="10" fill="var(--bg-alt)" stroke="var(--text-muted)" strokeWidth={2} />
             <text x="315" y="265" fontSize="18" fill="var(--text-muted)" stroke="none">cold (20%)</text>
          </motion.g>

          {/* Title notation */}
          <motion.text x="200" y="50" textAnchor="middle" fontSize="28" fill="var(--primary)" stroke="none" 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}>
            It just predicts the next token!
          </motion.text>
        </motion.g>
      )}
    </svg>
  );
};

// --- SVG 2: Evolution (N-grams -> Transformers) ---
export const EvolutionSVG = ({ isActive }) => {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" style={drawTheme}>
      {isActive && (
        <motion.g>
          {/* Timeline Axis */}
          <motion.line x1="40" y1="250" x2="360" y2="250" strokeWidth={4} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
          <motion.path d="M 350 240 L 365 250 L 350 260" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />

          {/* Era 1: N-grams */}
          <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <circle cx="100" cy="250" r="6" fill="var(--primary)" />
            <text x="100" y="280" textAnchor="middle" fontSize="16" fill="var(--text)" stroke="none">1990s</text>
            <rect x="60" y="150" width="80" height="50" rx="4" fill="var(--bg-alt)" />
            <text x="100" y="175" textAnchor="middle" fontSize="18" fill="var(--text-light)" stroke="none">n-grams</text>
            <path d="M 100 200 L 100 240" stroke="var(--text-muted)" strokeDasharray="4 4" />
          </motion.g>

          {/* Era 2: Neural / RNN */}
          <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
            <circle cx="200" cy="250" r="6" fill="var(--primary)" />
            <text x="200" y="280" textAnchor="middle" fontSize="16" fill="var(--text)" stroke="none">2013</text>
            <rect x="160" y="100" width="80" height="50" rx="4" fill="var(--bg-alt)" />
            <text x="200" y="125" textAnchor="middle" fontSize="18" fill="var(--text-light)" stroke="none">RNN / LSTM</text>
            <path d="M 200 150 L 200 240" stroke="var(--text-muted)" strokeDasharray="4 4" />
          </motion.g>

          {/* Era 3: Transformers */}
          <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }}>
            <circle cx="300" cy="250" r="8" fill="#FACC15" stroke="var(--bg)" strokeWidth={2} />
            <text x="300" y="280" textAnchor="middle" fontSize="16" fill="var(--text)" stroke="none">2017</text>
            
            {/* The Transformer Explosion */}
            <motion.path d="M 270 50 L 330 30 L 320 80 L 350 100 L 300 120 L 260 90 Z" fill="rgba(250, 204, 21, 0.1)" stroke="#FACC15" 
               initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, rotate: [0, 5, -5, 0] }} transition={{ delay: 2.6, type: "spring" }} />
            <text x="305" y="80" textAnchor="middle" fontSize="20" fill="#FACC15" stroke="none" fontWeight="bold">Transformer!</text>
            <path d="M 300 125 L 300 240" stroke="var(--text-muted)" strokeDasharray="4 4" />
          </motion.g>
        </motion.g>
      )}
    </svg>
  );
};

// --- SVG 3: Attention (Connecting words) ---
export const AttentionSVG = ({ isActive }) => {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" style={drawTheme}>
      {isActive && (
        <motion.g>
          {/* Base Sentence */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <text x="50" y="200" fontSize="22" fill="var(--text)" stroke="none">The</text>
            <text x="100" y="200" fontSize="24" fill="var(--primary)" stroke="none" fontWeight="bold">astronaut</text>
            <text x="210" y="200" fontSize="22" fill="var(--text)" stroke="none">finally</text>
            <text x="280" y="200" fontSize="24" fill="#FACC15" stroke="none" fontWeight="bold">boarded</text>
            <text x="200" y="240" fontSize="22" fill="var(--text)" stroke="none">the</text>
            <text x="240" y="240" fontSize="24" fill="var(--primary)" stroke="none" fontWeight="bold">rocket</text>
            <text x="320" y="240" fontSize="22" fill="var(--text)" stroke="none">she</text>
          </motion.g>

          {/* Attention Lines */}
          <motion.path d="M 150 170 C 150 100 280 100 310 170" stroke="var(--primary)" strokeWidth={3} fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }} />
          <motion.path d="M 300 165 L 315 175 L 320 160" stroke="var(--primary)" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} />
          <motion.text x="230" y="110" fontSize="16" fill="var(--primary)" stroke="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            "she" = "astronaut"
          </motion.text>

          <motion.path d="M 310 210 C 310 270 270 270 270 250" stroke="#FACC15" strokeWidth={3} fill="none" strokeDasharray="6 6"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.2, duration: 1 }} />
          
          <motion.text x="200" y="60" textAnchor="middle" fontSize="26" fill="var(--text)" stroke="none"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }}>
            Self-Attention sees the <tspan fill="var(--primary)">WHOLE</tspan> context
          </motion.text>
        </motion.g>
      )}
    </svg>
  );
};

// --- SVG 4: Tokenization ---
export const TokenSVG = ({ isActive }) => {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" style={drawTheme}>
      {isActive && (
        <motion.g>
          {/* Base Word */}
          <motion.text x="200" y="120" textAnchor="middle" fontSize="36" fill="var(--text)" stroke="none" letterSpacing="2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            unbelievable
          </motion.text>

          {/* Slicing Lines */}
          <motion.line x1="130" y1="80" x2="130" y2="150" stroke="#EF4444" strokeWidth={4} strokeDasharray="8 8"
            initial={{ pathLength: 0, y1: 80 }} animate={{ pathLength: 1, y1: 60 }} transition={{ delay: 1, duration: 0.3 }} />
          <motion.line x1="280" y1="80" x2="280" y2="150" stroke="#EF4444" strokeWidth={4} strokeDasharray="8 8"
            initial={{ pathLength: 0, y1: 80 }} animate={{ pathLength: 1, y1: 60 }} transition={{ delay: 1.3, duration: 0.3 }} />

          {/* Sliced Chunks (Tokens) */}
          <motion.g initial={{ y: 0 }} animate={{ y: 60 }} transition={{ delay: 2, type: "spring" }}>
            <rect x="70" y="100" width="60" height="40" rx="8" fill="rgba(59, 130, 246, 0.2)" stroke="var(--primary)" />
            <text x="100" y="128" textAnchor="middle" fontSize="24" fill="var(--primary)" stroke="none">un</text>
            <text x="100" y="160" textAnchor="middle" fontSize="14" fill="var(--text-muted)" stroke="none">Token 1</text>
          </motion.g>

          <motion.g initial={{ y: 0 }} animate={{ y: 60 }} transition={{ delay: 2.1, type: "spring" }}>
            <rect x="135" y="100" width="140" height="40" rx="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" />
            <text x="205" y="128" textAnchor="middle" fontSize="24" fill="#10B981" stroke="none">believ</text>
            <text x="205" y="160" textAnchor="middle" fontSize="14" fill="var(--text-muted)" stroke="none">Token 2</text>
          </motion.g>

          <motion.g initial={{ y: 0 }} animate={{ y: 60 }} transition={{ delay: 2.2, type: "spring" }}>
            <rect x="280" y="100" width="65" height="40" rx="8" fill="rgba(245, 158, 11, 0.2)" stroke="#F59E0B" />
            <text x="312" y="128" textAnchor="middle" fontSize="24" fill="#F59E0B" stroke="none">able</text>
            <text x="312" y="160" textAnchor="middle" fontSize="14" fill="var(--text-muted)" stroke="none">Token 3</text>
          </motion.g>

          <motion.text x="200" y="270" textAnchor="middle" fontSize="22" fill="var(--text)" stroke="none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
            Models don't read words. They read chunks.
          </motion.text>
        </motion.g>
      )}
    </svg>
  );
};

// --- SVG 5: Context Window (Desk falling off) ---
export const ContextWindowSVG = ({ isActive }) => {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" style={drawTheme}>
      {isActive && (
        <motion.g>
          {/* The Desk */}
          <motion.path d="M 50 200 L 350 200 L 370 240 L 30 240 Z" fill="var(--bg-alt)" stroke="var(--text-muted)" strokeWidth={3}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
          <motion.text x="200" y="230" textAnchor="middle" fontSize="20" fill="var(--text-light)" stroke="none">The Context Window (Working Memory)</motion.text>

          {/* Blocks landing on desk */}
          <motion.rect x="100" y="160" width="40" height="40" rx="4" fill="var(--primary)" stroke="var(--bg)" 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, type: "spring", bounce: 0.5 }} />
          <motion.rect x="145" y="160" width="60" height="40" rx="4" fill="#10B981" stroke="var(--bg)" 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.0, type: "spring", bounce: 0.5 }} />
          <motion.rect x="210" y="160" width="50" height="40" rx="4" fill="#F59E0B" stroke="var(--bg)" 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5, type: "spring", bounce: 0.5 }} />
          <motion.rect x="265" y="160" width="40" height="40" rx="4" fill="#8B5CF6" stroke="var(--bg)" 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.0, type: "spring", bounce: 0.5 }} />

          {/* The overflow block falling off */}
          <motion.g initial={{ x: 60, y: -100, opacity: 0 }} animate={{ x: 60, y: 0, opacity: 1 }} transition={{ delay: 2.5, type: "spring", bounce: 0.5 }}>
            <motion.rect x="0" y="160" width="40" height="40" rx="4" fill="#EF4444" stroke="var(--bg)" 
              animate={{ y: [0, 0, 100], rotate: [0, 0, -45], opacity: [1, 1, 0] }} transition={{ delay: 3.5, duration: 1 }} />
          </motion.g>

          {/* Push effect */}
          <motion.g initial={{ x: 0 }} animate={{ x: -45 }} transition={{ delay: 3.5, duration: 0.5 }}>
            <rect x="310" y="160" width="40" height="40" rx="4" fill="var(--primary)" stroke="var(--bg)" 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }} />
          </motion.g>

          <motion.text x="200" y="80" textAnchor="middle" fontSize="24" fill="var(--text)" stroke="none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}>
            When it's full, the oldest memory <tspan fill="#EF4444">falls off</tspan>
          </motion.text>
        </motion.g>
      )}
    </svg>
  );
};

// --- SVG 6: Model Selection ---
export const ModelDecisionSVG = ({ isActive }) => {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" style={drawTheme}>
      {isActive && (
        <motion.g>
          {/* Base Node */}
          <motion.rect x="150" y="40" width="100" height="40" rx="20" fill="var(--bg-alt)" stroke="var(--text)" 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} />
          <text x="200" y="65" textAnchor="middle" fontSize="18" fill="var(--text)" stroke="none">Task</text>

          {/* Paths */}
          <motion.path d="M 150 60 L 80 120" stroke="var(--text-muted)" strokeWidth={2} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
          <motion.path d="M 250 60 L 320 120" stroke="var(--text-muted)" strokeWidth={2} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
          <motion.path d="M 200 80 L 200 150" stroke="var(--primary)" strokeWidth={4} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }} />

          {/* Nodes */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
             <rect x="20" y="120" width="100" height="40" rx="8" fill="var(--bg-alt)" stroke="var(--text-muted)" />
             <text x="70" y="145" textAnchor="middle" fontSize="14" fill="var(--text-muted)" stroke="none">High Volume</text>
          </motion.g>
          
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
             <rect x="270" y="120" width="100" height="40" rx="8" fill="var(--bg-alt)" stroke="var(--text-muted)" />
             <text x="320" y="145" textAnchor="middle" fontSize="14" fill="var(--text-muted)" stroke="none">Complex Math</text>
          </motion.g>

          <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, type: "spring" }}>
             <rect x="130" y="150" width="140" height="60" rx="8" fill="var(--bg)" stroke="var(--primary)" strokeWidth={3} />
             <text x="200" y="175" textAnchor="middle" fontSize="16" fill="var(--primary)" stroke="none" fontWeight="bold">General Purpose</text>
             <text x="200" y="195" textAnchor="middle" fontSize="12" fill="var(--text-light)" stroke="none">Claude Sonnet / GPT-4o</text>
          </motion.g>

          {/* Highlight effect */}
          <motion.circle cx="200" cy="180" r="80" fill="var(--primary)" opacity="0.1" stroke="none"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, duration: 1 }} />
            
          <motion.text x="200" y="260" textAnchor="middle" fontSize="20" fill="var(--text)" stroke="none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
            Pick the right tool for the job.
          </motion.text>
        </motion.g>
      )}
    </svg>
  );
};
