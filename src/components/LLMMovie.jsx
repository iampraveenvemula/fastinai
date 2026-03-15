import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Scene1Autocomplete, Scene2Evolution, Scene3Attention, 
  Scene4Tokens, Scene5Context 
} from './MovieScenes';

// --- THE SCRIPT (SCROLL SECTIONS) ---
const scriptData = [
  {
    id: 1,
    title: "1. The Oblivious Monkey",
    Visual: Scene1Autocomplete,
    paragraphs: [
      "Let's imagine our AI is just a very fast monkey sitting at a typewriter in a windowless room.",
      "We hand the monkey a piece of paper that says: 'The weather is...'",
      "Because the monkey has the memory of a goldfish (an early N-Gram model), it only looks at the very last word: 'is'.",
      "It panics, realizes 'is' is often followed by a noun, and confidently yells: 'BANANA!'",
      "We hit the buzzer. Wrong. Without context, the monkey is just wildly guessing."
    ]
  },
  {
    id: 2,
    title: "2. The Monkey Gets Glasses",
    Visual: Scene2Evolution,
    paragraphs: [
      "By 2013, we realized the monkey needed to understand meaning, not just memorize words.",
      "We gave the monkey a pair of glowing, mathematical glasses (Embeddings).",
      "Suddenly, words aren't just letters—they are coordinates in a massive geometric space.",
      "We hand the monkey the equation: 'King' minus 'Man' plus 'Woman'.",
      "The monkey runs the math, scratches its head, and holds up a sign: 'Queen'. The monkey is starting to see the invisible threads connecting ideas."
    ]
  },
  {
    id: 3,
    title: "3. The 8-Armed Monkey",
    Visual: Scene3Attention,
    paragraphs: [
      "But there was a new problem. If we gave the monkey a long paragraph, it read left-to-right, getting bored and forgetting the beginning by the time it reached the end.",
      "Then came the 2017 breakthrough: 'Attention'.",
      "The monkey mutated. It sprouted 8 glowing neon arms.",
      "Instead of reading sequentially, the monkey now slams all 8 hands onto the paper simultaneously, grabbing every single word at the exact same time.",
      "It instantly draws glowing strings linking 'she' directly back to 'astronaut' on the first line. Multi-dimensional understanding in a single bound."
    ]
  },
  {
    id: 4,
    title: "4. The Monkey Chops Words",
    Visual: Scene4Tokens,
    paragraphs: [
      "Despite all this power, the monkey secretly cannot read English words.",
      "When we hand it the word 'Unbelievable', the monkey pulls out a laser cutter and chops it into distinct computational pieces: 'un', 'believ', 'able'.",
      "We call these pieces 'Tokens'.",
      "This is critical because when you pay for AI, or when the AI hits its brain capacity, it's counting these chopped-up Tokens, not your human words."
    ]
  },
  {
    id: 5,
    title: "5. The Tiny Desk",
    Visual: Scene5Context,
    paragraphs: [
      "Which brings us to the monkey's biggest limitation: its tiny desk.",
      "This desk is the 'Context Window'. It represents the absolute maximum number of Tokens the monkey can keep in front of it at one time.",
      "As you keep talking, the monkey keeps placing new tokens on the right side of the desk.",
      "Eventually, the desk fills up. As the monkey shoves one more token onto the right side... a token on the far left gets pushed off the edge onto the floor.",
      "The monkey didn't choose to forget your early instructions. They literally fell out of its reality."
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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <section 
      ref={containerRef} 
      className="split-layout"
      style={{ 
        position: 'relative',
        zIndex: 10,
        background: '#030712',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      
      {/* LEFT PANE: THE SCRIPT (Scrolling Foreground Text) */}
      {/* On mobile, this will sit naturally underneath the sticky top pane */}
      <div style={{ 
        padding: '10vh 5%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        paddingBottom: '20vh'
      }}>
        
        <div style={{ position: 'sticky', top: '20vh', marginBottom: '10vh' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#fff', fontFamily: 'Fraunces, serif', fontWeight: 300, letterSpacing: '-1px' }}>
            {data.title}
          </h2>
          <div style={{ width: '40px', height: '4px', background: 'var(--primary)', marginTop: '20px', borderRadius: '2px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30vh', marginTop: '30vh' }}>
          {data.paragraphs.map((text, i) => {
            // Because this pane scrolls naturally, we don't need complex Y translations.
            // We just use scroll progress to selectively highlight the paragraph that
            // should currently be being read.
            const numParagraphs = data.paragraphs.length;
            const startP = 0.2 + (i * (0.6 / numParagraphs));
            const peakP = startP + 0.1;
            const endP = peakP + 0.15;

            // Highlight opacity: 1 when active, 0.3 when inactive
            const opacity = useTransform(smoothProgress, [startP, peakP, endP], [0.3, 1, 0.3]);
            
            return (
              <motion.div key={i} style={{ opacity }}>
                <p style={{ 
                  fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', 
                  color: 'var(--text-light)', 
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

      {/* RIGHT PANE: THE CAMERA (Sticky Background) */}
      {/* On mobile, this takes the top 50vh of the screen and sticks while the text scrolls below it */}
      <div>
        <div 
          style={{ 
            position: 'sticky', 
            top: 0, 
            height: '100vh', 
            width: '100%', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #0a101f 0%, #030712 70%)',
            overflow: 'hidden'
          }}
        >
          {/* Render the SVG visual, passing it the scroll progress so it can animate its drawing */}
          <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
             <data.Visual progress={smoothProgress} />
          </div>
        </div>
      </div>

    </section>
  );
};

export default function LLMMovie() {
  return (
    <div style={{ background: '#030712', width: '100%', marginLeft: 'calc(-50vw + 50%)', width: '100vw' }}>
      
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
