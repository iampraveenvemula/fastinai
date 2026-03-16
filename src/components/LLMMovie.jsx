import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Scene1Autocomplete, Scene2Evolution, Scene3Attention, 
  Scene4Tokens, Scene5Context, Scene6Decision 
} from './MovieScenes';

// --- THE SCRIPT (SCROLL SECTIONS) ---
const scriptData = [
  {
    id: 1,
    title: "1. The Illusion of Thought",
    Visual: Scene1Autocomplete,
    paragraphs: [
      "Language models do not think. They do not reason.",
      "At their core, they are pure statistical engines...",
      "...predicting the next character based on everything before it."
    ]
  },
  {
    id: 2,
    title: "2. The Evolution",
    Visual: Scene2Evolution,
    paragraphs: [
      "In the 1990s, N-Grams had the memory of a goldfish.",
      "By 2013, we learned to turn words into pure math.",
      "But the leap came in 2017 with the Transformer architecture.",
      "It reads the entire passage simultaneously."
    ]
  },
  {
    id: 3,
    title: "3. Self-Attention",
    Visual: Scene3Attention,
    paragraphs: [
      "A sequential model has to slowly look backwards to figure out context.",
      "Self-Attention evaluates every word against every other word instantly.",
      "It binds concepts securely in a single massive computation."
    ]
  },
  {
    id: 4,
    title: "4. Tokenization",
    Visual: Scene4Tokens,
    paragraphs: [
      "Text is sliced into optimal computational blocks called Tokens.",
      "'Unbelievable' breaks into 'un', 'believ', 'able'.",
      "API costs and limits are strictly based on tokens, not words."
    ]
  },
  {
    id: 5,
    title: "5. The Context Window",
    Visual: Scene5Context,
    paragraphs: [
      "This is the strict memory limit of the model.",
      "When the window fills up, the oldest data vanishes.",
      "Models typically recall what they read first and last best."
    ]
  },
  {
    id: 6,
    title: "6. Model Selection",
    Visual: Scene6Decision,
    paragraphs: [
      "Do not default to the heaviest model for every task.",
      "For massive volume or fast parsing, use lightweight models.",
      "For profound reasoning or foundational code, use heavyweights."
    ]
  }
];

// Individual Scene Container (Split View)
const SceneBlock = ({ data, index }) => {
  const containerRef = useRef(null);
  
  // Track scroll progress purely within this specific `<section>`
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth the scroll data slightly so the SVG drawing doesn't jitter
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });  return (
    <section 
      ref={containerRef} 
      className="scened-layout"
      style={{ minHeight: '300vh' }}
    >
      
      {/* 1. VISUAL — Full-screen sticky background (renders first so sticky works) */}
      <div className="scened-visual">
         <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <data.Visual progress={smoothProgress} />
         </div>
      </div>

      {/* 2. HEADING — sticky at top with gradient fade below it */}
      <div className="scened-heading">
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#ffffff', fontFamily: 'Fraunces, serif', fontWeight: 300, letterSpacing: '-1px', margin: 0 }}>
          {data.title}
        </h2>
        <div style={{ width: '40px', height: '4px', background: 'var(--primary)', marginTop: '12px', borderRadius: '2px' }} />
      </div>

      {/* 3. TEXT — sticky block that stays visible while the scene animation plays */}
      <motion.div className="scened-text-flow" style={{ 
          position: 'sticky', 
          top: 'max(30vh, 200px)', 
          zIndex: 10,
          opacity: useTransform(smoothProgress, [0.0, 0.05, 0.95, 1.0], [0, 1, 1, 0])
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {data.paragraphs.map((text, i) => {
             // Only show ONE sentence at a time.
             // It fades in, stays visible for its segment, then fades out as the next begins.
             const numP = data.paragraphs.length;
             const segmentLength = 0.9 / numP; // use most of the scroll space
             
             const startFadeIn = 0.05 + (i * segmentLength);
             const fullyVisible = startFadeIn + (segmentLength * 0.15); // Quick fade in
             const startFadeOut = fullyVisible + (segmentLength * 0.7); // Hold for most of the middle
             const endFadeOut = startFadeIn + segmentLength; // Fade out right as the next begins
             
             const pOpacity = useTransform(
                 smoothProgress, 
                 [startFadeIn, fullyVisible, startFadeOut, endFadeOut], 
                 [0, 1, 1, 0]
             );
             
             return (
              <motion.p key={i} style={{ 
                position: 'absolute', // Stack them on top of each other
                width: '100%',
                fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)', 
                color: 'var(--text)',
                lineHeight: 1.7,
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                opacity: pOpacity
              }}>
                {text}
              </motion.p>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
};

export default function LLMMovie() {
  return (
    <div style={{ background: '#030712', width: '100%', marginLeft: 'calc(-50vw + 50%)' }}>
      


      {/* Render all Scenes in a continuous vertical flow */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {scriptData.map((data, index) => (
          <SceneBlock key={data.id} data={data} index={index} />
        ))}
      </div>
      
      {/* End Credits Spacer */}
      <div style={{ height: '50vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <h2 style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-muted)', fontWeight: 300 }}>End of Sequence</h2>
      </div>

    </div>
  );
}
