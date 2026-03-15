import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AutocompleteSVG, EvolutionSVG, AttentionSVG, 
  TokenSVG, ContextWindowSVG, ModelDecisionSVG 
} from './FlashcardIllustrations';

const flashcardsData = [
  {
    id: 1,
    title: "1. What is an LLM?",
    frontText: "It simply predicts the next chunk of text, one piece at a time.",
    FrontVisual: AutocompleteSVG,
    backPoints: [
      "A language model assigns probability to a sequence of words.",
      "Early models mapped simple statistical frequency (if A, then B).",
      "Modern LLMs use neural networks to understand deep semantic meaning, allowing them to predict entirely novel, sensible text."
    ]
  },
  {
    id: 2,
    title: "2. The Evolution",
    frontText: "From counting words to understanding deep relationships.",
    FrontVisual: EvolutionSVG,
    backPoints: [
      "1990s (N-grams): Looked at the last few words. Forgot context quickly.",
      "2013 (Embeddings): Words became math vectors. Allowed analogies (King - Man + Woman = Queen).",
      "2017 (Transformers): Looked at the entire sentence at once, solving the memory problem entirely."
    ]
  },
  {
    id: 3,
    title: "3. The Secret Sauce: Attention",
    frontText: "Transformers process the whole sentence simultaneously, connecting related concepts.",
    FrontVisual: AttentionSVG,
    backPoints: [
      "Introduced in Google’s 2017 paper 'Attention Is All You Need'.",
      "Self-attention allows the model to learn which words refer to each other. It connects 'she' to 'astronaut', ignoring distance.",
      "Because it's processed in parallel, it trains vastly faster on GPUs than older sequential models."
    ]
  },
  {
    id: 4,
    title: "4. What is a Token?",
    frontText: "Models don't read words. They read chunks.",
    FrontVisual: TokenSVG,
    backPoints: [
      "Tokenization splits text into optimal computational blocks.",
      "1 token ≈ 4 characters of English text (e.g. 'Hello, world!' = 4 tokens).",
      "You are billed by API providers per token, not per word. Complex jargon costs more tokens than plain English."
    ]
  },
  {
    id: 5,
    title: "5. The Context Window",
    frontText: "The 'Desk' of the AI. When it fills up, the oldest stuff falls off.",
    FrontVisual: ContextWindowSVG,
    backPoints: [
      "The strict maximum number of tokens a model can 'see' simultaneously.",
      "GPT-3 started with 4k tokens. Gemini 1.5 Pro now holds 1 Million tokens (10 full novels).",
      "Beware the 'Lost in the Middle' problem: Models remember the start and end of a long document much better than the middle."
    ]
  },
  {
    id: 6,
    title: "6. Which Model to Choose?",
    frontText: "Pick the right tool for the job. Bigger isn't always better.",
    FrontVisual: ModelDecisionSVG,
    backPoints: [
      "High Volume / Simple Tasks? Use fast, cheap models (GPT-4o mini, Claude 3.5 Haiku, Gemini Flash).",
      "Hard Math or Code Architecture? Use reasoning models (OpenAI o1, Claude 3.5 Sonnet).",
      "Massive Documents? Use long-context models (Gemini 1.5 Pro).",
      "Private API / Medical Data? Use self-hosted open-source (Llama 3 70B, Mistral)."
    ]
  }
];

export default function LLMFlashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    if (currentIndex < flashcardsData.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  const currentCard = flashcardsData[currentIndex];
  const Visual = currentCard.FrontVisual;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '20px' }}>
      
      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--text)', marginBottom: '10px' }}>Understanding LLMs</h2>
        <p style={{ color: 'var(--text-muted)' }}>Interactive Flashcards • Click card to flip</p>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '6px', background: 'var(--bg-alt)', borderRadius: '3px', marginBottom: '20px', overflow: 'hidden' }}>
        <motion.div 
          style={{ height: '100%', background: 'var(--primary)', borderRadius: '3px' }}
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / flashcardsData.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Card Container */}
      <div 
        style={{ perspective: '1000px', width: '100%', height: '500px', cursor: 'pointer', position: 'relative' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-back' : '-front')}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              background: 'var(--bg-alt)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              transformStyle: 'preserve-3d'
            }}
          >
            {!isFlipped ? (
              // FRONT OF CARD
              <>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)', marginBottom: '30px' }}>
                  {currentCard.title}
                </div>
                
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Visual isActive={!isFlipped} />
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: "'Caveat', cursive, sans-serif" }}>
                  {currentCard.frontText}
                </div>
              </>
            ) : (
              // BACK OF CARD
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', transform: 'rotateY(0deg)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Deep Dive
                </div>
                
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
                  {currentCard.backPoints.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text)' }}
                    >
                      <span style={{ color: 'var(--primary)', fontSize: '1.5rem', lineHeight: 1 }}>✦</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Click to flip back
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); prevCard(); }}
          disabled={currentIndex === 0}
          style={{ 
            padding: '12px 24px', borderRadius: '8px', border: 'none', 
            background: currentIndex === 0 ? 'var(--border)' : 'var(--bg-alt)',
            color: currentIndex === 0 ? 'var(--text-muted)' : 'var(--text)',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            fontWeight: 600
          }}
        >
          ← Previous
        </button>

        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Card {currentIndex + 1} of {flashcardsData.length}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); nextCard(); }}
          disabled={currentIndex === flashcardsData.length - 1}
          style={{ 
            padding: '12px 24px', borderRadius: '8px', border: 'none', 
            background: currentIndex === flashcardsData.length - 1 ? 'var(--border)' : 'var(--primary)',
            color: currentIndex === flashcardsData.length - 1 ? 'var(--text-muted)' : '#000',
            cursor: currentIndex === flashcardsData.length - 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            fontWeight: 600
          }}
        >
          Next Card →
        </button>
      </div>

    </div>
  );
}
