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
      "One token is roughly 4 letters in English.",
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
      className="cinematic-layout"
      style={{ minHeight: '350vh' }}
    >
      
      {/* THE CAMERA (Fixed Background Stage) */}
      <div className="cinematic-stage">
         {/* Render the SVG visual, passing it the scroll progress so it can animate its drawing */}
         <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
            <data.Visual progress={smoothProgress} />
         </div>
      </div>

      {/* THE SCRIPT (Scrolling Foreground Text Cards) */}
      <div className="cinematic-text-flow" style={{ 
        paddingTop: '20vh', 
        paddingBottom: '50vh',
        display: 'flex', 
        flexDirection: 'column',
      }}>
        
        <div className="scrolly-card" style={{ marginBottom: '30vh' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#ffffff', fontFamily: 'Fraunces, serif', fontWeight: 300, letterSpacing: '-1px' }}>
            {data.title}
          </h2>
          <div style={{ width: '40px', height: '4px', background: 'var(--primary)', marginTop: '20px', borderRadius: '2px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '50vh' }}>
          {data.paragraphs.map((text, i) => {
            // Pick a paragraph to highlight based on scroll progress
            const numParagraphs = data.paragraphs.length;
            const startP = 0.2 + (i * (0.6 / numParagraphs));
            const peakP = startP + 0.1;
            const endP = peakP + 0.15;

            // Highlight opacity: 1 when active, 0.4 when inactive
            const opacity = useTransform(smoothProgress, [startP, peakP, endP], [0.4, 1, 0.4]);
            // Subtle scale effect on the active card for interactivity
            const scale = useTransform(smoothProgress, [startP, peakP, endP], [0.95, 1.05, 0.95]);
            
            return (
              <motion.div key={i} className="scrolly-card" style={{ opacity, scale }}>
                <p style={{ 
                  fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', /* Increased font size */
                  color: '#ffffff', /* High contrast pure white */ 
                  lineHeight: 1.6, 
                  fontWeight: 400
                }}>
                  {text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default function LLMMovie() {
  return (
    <div style={{ background: '#030712', width: '100%', marginLeft: 'calc(-50vw + 50%)' }}>
      
      {/* Cinematic Intro Header */}
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
         <div style={{ fontSize: '0.9rem', color: 'var(--primary)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>An Interactive Documentary</div>
         <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'Fraunces, serif', color: '#fff', fontWeight: 300, lineHeight: 1.1, marginBottom: '20px' }}>Inside the <span style={{ color: 'var(--primary)' }}>Machine</span></h1>
         <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Scroll to explore the architecture of Large Language Models.</p>
         
         <motion.div 
           animate={{ y: [0, 10, 0] }} 
           transition={{ repeat: Infinity, duration: 2 }}
           style={{ marginTop: '80px', color: 'var(--text-muted)', fontSize: '0.9rem' }}
         >
           ↓ SCROLL DOWN
         </motion.div>
      </div>

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
