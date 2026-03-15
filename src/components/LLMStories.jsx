import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AutocompleteSVG, EvolutionSVG, AttentionSVG, 
  TokenSVG, ContextWindowSVG, ModelDecisionSVG 
} from './FlashcardIllustrations';

// --- STORY DATA ---
// We repurpose the flashcards data, but add specific delay timings for the text revealing
const STORY_DURATION_MS = 15000;

const storiesData = [
  {
    id: 1,
    title: "1. What is an LLM?",
    frontText: "It simply predicts the next chunk of text, one piece at a time.",
    Visual: AutocompleteSVG,
    points: [
      { text: "A language model assigns probability to a sequence of words.", appearAtMs: 2000 },
      { text: "Early models mapped simple statistical frequency (if A, then B).", appearAtMs: 5000 },
      { text: "Modern LLMs use neural networks to understand deep semantic meaning, allowing them to predict entirely novel, sensible text.", appearAtMs: 8000 }
    ]
  },
  {
    id: 2,
    title: "2. The Evolution",
    frontText: "From counting words to understanding deep relationships.",
    Visual: EvolutionSVG,
    points: [
      { text: "1990s (N-grams): Looked at the last few words. Forgot context quickly.", appearAtMs: 2000 },
      { text: "2013 (Embeddings): Words became math vectors. Allowed analogies.", appearAtMs: 5000 },
      { text: "2017 (Transformers): Looked at the entire sentence at once, solving the memory problem entirely.", appearAtMs: 8000 }
    ]
  },
  {
    id: 3,
    title: "3. The Secret Sauce: Attention",
    frontText: "Transformers process the whole sentence simultaneously, connecting related concepts.",
    Visual: AttentionSVG,
    points: [
      { text: "Introduced in Google’s 2017 paper 'Attention Is All You Need'.", appearAtMs: 2000 },
      { text: "Self-attention allows the model to learn which words refer to each other. It connects 'she' to 'astronaut', ignoring distance.", appearAtMs: 5000 },
      { text: "Because it's processed in parallel, it trains vastly faster on GPUs than older sequential models.", appearAtMs: 8000 }
    ]
  },
  {
    id: 4,
    title: "4. What is a Token?",
    frontText: "Models don't read words. They read chunks.",
    Visual: TokenSVG,
    points: [
      { text: "Tokenization splits text into optimal computational blocks.", appearAtMs: 2000 },
      { text: "1 token ≈ 4 characters of English text (e.g. 'Hello, world!' = 4 tokens).", appearAtMs: 5000 },
      { text: "You are billed by API providers per token, not per word. Complex jargon costs more tokens than plain English.", appearAtMs: 8000 }
    ]
  },
  {
    id: 5,
    title: "5. The Context Window",
    frontText: "The 'Desk' of the AI. When it fills up, the oldest stuff falls off.",
    Visual: ContextWindowSVG,
    points: [
      { text: "The strict maximum number of tokens a model can 'see' simultaneously.", appearAtMs: 2000 },
      { text: "GPT-3 started with 4k tokens. Gemini 1.5 Pro now holds 1 Million tokens (10 full novels).", appearAtMs: 5000 },
      { text: "Beware the 'Lost in the Middle' problem: Models remember the start and end of a long document much better than the middle.", appearAtMs: 8000 }
    ]
  },
  {
    id: 6,
    title: "6. Which Model to Choose?",
    frontText: "Pick the right tool for the job. Bigger isn't always better.",
    Visual: ModelDecisionSVG,
    points: [
      { text: "High Volume / Simple Tasks? Use fast, cheap models (GPT-4o mini, Claude 3.5 Haiku, Gemini Flash).", appearAtMs: 2000 },
      { text: "Hard Math or Code Architecture? Use reasoning models (OpenAI o1, Claude 3.5 Sonnet).", appearAtMs: 5000 },
      { text: "Private API / Medical Data? Use self-hosted open-source (Llama 3 70B, Mistral).", appearAtMs: 8000 }
    ]
  }
];

export default function LLMStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const currentStory = storiesData[currentIndex];

  // --- TIMER MECHANICS ---
  const animateTimer = time => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      
      // Only increment if not paused
      if (!isPaused) {
        setElapsedMs(prevTime => {
          const newTime = prevTime + deltaTime;
          if (newTime >= STORY_DURATION_MS) {
            handleNextStory();
            return 0; // Return 0 to reset, handleNextStory manages index
          }
          return newTime;
        });
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateTimer);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateTimer);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused, currentIndex]); // Re-run if paused state or index changes

  // Reset timer when manually navigating
  const resetTimer = () => {
    setElapsedMs(0);
    previousTimeRef.current = undefined; // Prevents massive delta jumps
  };

  // --- NAVIGATION ---
  const handleNextStory = () => {
    if (currentIndex < storiesData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      resetTimer();
    } else {
      // Reached the end. Just stay paused at 100% of the last story.
      setElapsedMs(STORY_DURATION_MS);
      setIsPaused(true);
    }
  };

  const handlePrevStory = () => {
    if (elapsedMs > 2000) {
      // If we are more than 2s into a story, tapping left just restarts current story
      resetTimer();
    } else if (currentIndex > 0) {
      // If we are at the very start of a story, tapping left goes to previous story
      setCurrentIndex(prev => prev - 1);
      resetTimer();
    }
  };

  // --- INTERACTION HANDLERS ---
  const handlePointerDown = () => {
    setIsPaused(true);
  };

  const handlePointerUp = (e) => {
    setIsPaused(false);
    
    // Tap Navigation Logic
    // If the user hasn't held down long enough to be considered a pause, treat it as a tap.
    // For simplicity, we just trigger navigation on pointer up based on X coordinate.
    // We get the bounding rect of the container to determine if it was a left/right tap.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    
    if (x !== undefined) {
      const relativeX = x - rect.left;
      const isLeftTap = relativeX < (rect.width * 0.3); // Left 30% goes back
      
      if (isLeftTap) {
        handlePrevStory();
      } else {
        handleNextStory();
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '20px 0' }}>
      
      {/* Mobile Phone Container */}
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '420px', 
          height: 'min(90vh, 850px)', 
          background: '#0d0d12', // Slightly darker than standard background to make it pop
          borderRadius: '24px', 
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid #1f2937',
          display: 'flex',
          flexDirection: 'column',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >

        {/* --- 1. SEGMENTED PROGRESS BARS (TOP 5%) --- */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '16px 12px', display: 'flex', gap: '4px' }}>
          {storiesData.map((story, idx) => {
            let width = '0%';
            if (idx < currentIndex) width = '100%';
            else if (idx === currentIndex) width = `${(elapsedMs / STORY_DURATION_MS) * 100}%`;
            
            return (
              <div key={story.id} style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: width, background: 'var(--primary)', borderRadius: '2px' }} />
              </div>
            );
          })}
        </div>

        {/* --- 2. VISUAL AREA (TOP 55%) --- */}
        <div style={{ height: '55%', width: '100%', position: 'relative', background: '#111827', display: 'flex', flexDirection: 'column', paddingTop: '32px' }}>
          
          <div style={{ position: 'absolute', top: '32px', left: '20px', right: '20px', zIndex: 5, color: 'white' }}>
             <h2 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
               {currentStory.title}
             </h2>
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
             <AnimatePresence mode="popLayout">
               <motion.div 
                 key={currentIndex}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 transition={{ duration: 0.3 }}
                 style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
               >
                 <currentStory.Visual isActive={true} />
               </motion.div>
             </AnimatePresence>
          </div>
        </div>

        {/* --- 3. TEXT AREA (BOTTOM 45%) --- */}
        <div style={{ height: '45%', width: '100%', background: '#0a0a0f', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <AnimatePresence mode="popLayout">
              <motion.div
                 key={currentIndex + '-intro'}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 style={{ fontSize: '1.2rem', color: 'var(--text-light)', fontStyle: 'italic', fontFamily: "'Caveat', cursive, sans-serif", borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}
              >
                "{currentStory.frontText}"
              </motion.div>
            </AnimatePresence>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentStory.points.map((point, idx) => {
                // Determine if this point should be visible based on the elapsed time
                const isVisible = elapsedMs >= point.appearAtMs;

                return (
                  <motion.div 
                    key={`${currentIndex}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                  >
                     <span style={{ color: 'var(--primary)', lineHeight: 1.4, fontSize: '1.2rem' }}>•</span>
                     <span style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.5, opacity: 0.9 }}>
                       {point.text}
                     </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Hold Indicator */}
            <div style={{ textAlign: 'center', opacity: isPaused ? 1 : 0.4, transition: 'opacity 0.2s', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '10px' }}>
              {isPaused ? "Paused" : "Tap right to skip • Hold to pause"}
            </div>
        </div>

      </div>
    </div>
  );
}
