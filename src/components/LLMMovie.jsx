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
      "Language models do not think. They do not reason. They do not 'know' facts.",
      "At their absolute core, they are statistical engines designed to do exactly one thing...",
      "...predict the next sequence of characters based on all the characters that came before it.",
      "The 'magic' happens because the neural networks are so impossibly large, the predictions mimic true understanding."
    ]
  },
  {
    id: 2,
    title: "2. The Evolution",
    Visual: Scene2Evolution,
    paragraphs: [
      "In the 1990s, N-Grams looked only at the last two or three words. They had the memory of a goldfish.",
      "By 2013, we learned to turn words into pure math (Embeddings). We could suddenly calculate meaning: King - Man + Woman = Queen.",
      "But the leap came in 2017. Google published 'Attention Is All You Need', introducing the Transformer architecture.",
      "Instead of reading word-by-word sequentially, Transformers read the entire passage simultaneously."
    ]
  },
  {
    id: 3,
    title: "3. Self-Attention",
    Visual: Scene3Attention,
    paragraphs: [
      "A sequential model reads 'The astronaut finally boarded the rocket she...'",
      "When it reaches 'she', it has to slowly look backwards to figure out who 'she' is.",
      "Self-Attention evaluates every word against every other word instantly.",
      "It mathematically binds 'she' directly to 'astronaut', understanding the entire syntactic web in a single massive parallel computation."
    ]
  },
  {
    id: 4,
    title: "4. Tokenization",
    Visual: Scene4Tokens,
    paragraphs: [
      "Despite being called 'Language' models, they cannot read words.",
      "Text is sliced into optimal computational blocks called Tokens. 'Unbelievable' breaks into 'un', 'believ', 'able'.",
      "This is critical because API costs and computational limits are strictly based on token counts, not words."
    ]
  },
  {
    id: 5,
    title: "5. The Context Window",
    Visual: Scene5Context,
    paragraphs: [
      "The Context Window is the strict maximum number of tokens the model can hold in its working memory at one time.",
      "GPT-3 launched with a 4,000 token limit. Today, models can hold millions.",
      "But beware: when the context window fills up, the oldest data simply falls out of existence.",
      "Furthermore, models suffer from 'Lost in the Middle'—they remember what you said first and last, but get blurry in the center."
    ]
  },
  {
    id: 6,
    title: "6. Model Selection",
    Visual: Scene6Decision,
    paragraphs: [
      "Do not default to the biggest, heaviest model for every task.",
      "For massive volume, fast parsing, or simple classification, use a lightweight, cheap model (Gemini Flash, Claude Haiku).",
      "For profound reasoning, complex math, or foundational code architecture, use heavyweights (OpenAI o1, Claude Sonnet).",
      "Pick the right engine for the workload."
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
          top: 'max(20vh, 140px)', 
          zIndex: 10,
          opacity: useTransform(smoothProgress, [0.0, 0.1, 0.9, 1.0], [0, 1, 1, 0])
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {data.paragraphs.map((text, i) => (
            <p key={i} style={{ 
              fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)', 
              color: 'var(--text)',
              lineHeight: 1.7,
              fontWeight: 400,
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              {text}
            </p>
          ))}
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
