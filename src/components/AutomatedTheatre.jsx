import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { techTheme, Defs, MonkeyActor } from './MonkeyCharacters';

// --- THE TIMELINE SCRIPT ---
// Time is in seconds. The engine will trigger these events as the clock ticks.
const scriptTimeline = [
  { time: 1, action: 'idle', chat: "User: Hey Monkey, finish this sentence: 'The weather is...'" },
  { time: 4, action: 'typing', chat: "System: [Monkey is analyzing the last word...]" },
  { time: 6, action: 'panic', chat: "Monkey: BANANA!" },
  { time: 8, action: 'panic', chat: "System: Incorrect. You have no Memory (N-Gram Error)." },
  
  { time: 12, action: 'idle', chat: "User: Let's give you some math to help." },
  { time: 14, action: 'smart', chat: "System: [Equipping Embeddings Glasses...]" },
  { time: 16, action: 'smart', chat: "Monkey: King - Man + Woman = Queen." },
  
  { time: 20, action: 'idle', chat: "User: But what if the sentence is really long?" },
  { time: 22, action: 'mutate', chat: "System: [Activating Self-Attention Protocol...]" },
  { time: 24, action: 'mutate', chat: "Monkey: I am reading every word simultaneously." },
  
  { time: 28, action: 'idle', chat: "User: Can you read the word 'Unbelievable'?" },
  { time: 30, action: 'laser', chat: "System: [Deploying Tokenization Laser...]" },
  { time: 32, action: 'laser', chat: "Monkey: Un - believ - able. (3 Tokens)." },
  
  { time: 36, action: 'idle', chat: "System: Context Window Full. Dropping oldest memory." },
  { time: 40, action: 'idle', chat: "User: Simulation Complete." }
];

export default function AutomatedTheatre() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [chatLog, setChatLog] = useState([]);
  const [monkeyStatus, setMonkeyStatus] = useState('idle');
  
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog]);

  // The Playback Engine
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTime(t => {
          const nextTime = t + 1;
          
          // Check for script events at this precise second
          const events = scriptTimeline.filter(s => s.time === nextTime);
          if (events.length > 0) {
            events.forEach(event => {
              setMonkeyStatus(event.action);
              setChatLog(prev => [...prev, event.chat]);
            });
          }
          
          // End of script
          if (nextTime > 42) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
          }
          
          return nextTime;
        });
      }, 1000); // 1 tick per second
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (time >= 42) {
      // Replay
      setTime(0);
      setChatLog([]);
      setMonkeyStatus('idle');
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      marginLeft: 'calc(-50vw + 50%)',
      backgroundColor: '#030712',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* THE STAGE (Top 60%) */}
      <div style={{ flex: '6', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
         <svg viewBox="0 0 800 600" width="100%" height="100%" style={techTheme} preserveAspectRatio="xMidYMid meet">
           <Defs />
           <g transform="translate(400, 300)">
              <MonkeyActor status={monkeyStatus} />
              
              {/* Contextual Props based on status (Always mounted, controlled by opacity) */}
              
              <motion.g 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: monkeyStatus === 'panic' ? 1 : 0, y: monkeyStatus === 'panic' ? 0 : 50 }} 
                transition={{ type: "spring" }}
              >
                <rect x="60" y="-120" width="120" height="40" rx="4" fill="var(--surface)" stroke="#EF4444" filter="url(#red-glow)" />
                <text x="120" y="-95" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="bold">BANANA!</text>
              </motion.g>
              
              <motion.g 
                initial={{ opacity: 0 }} 
                animate={{ opacity: monkeyStatus === 'smart' ? 1 : 0 }}
              >
                <text x="0" y="-120" textAnchor="middle" fontSize="24" fill="var(--primary)" filter="url(#neon-glow)">King - Man + Woman = Queen</text>
              </motion.g>
              
              <motion.g 
                initial={{ opacity: 0 }} 
                animate={{ opacity: monkeyStatus === 'laser' ? 1 : 0 }}
              >
                <text x="0" y="-120" textAnchor="middle" fontSize="32" fill="#fff" letterSpacing="4">un believ able</text>
                <motion.line x1="-40" y1="-50" x2="-40" y2="-150" stroke="#EF4444" strokeWidth="4" filter="url(#red-glow)" 
                  animate={monkeyStatus === 'laser' ? { x1: [-40, -40, 40, 40], x2: [-40, -40, 40, 40] } : {}} 
                  transition={{ duration: 1, repeat: Infinity }} />
              </motion.g>
           </g>
         </svg>
      </div>
      
      {/* THE DIALOGUE CHAT (Bottom 40%) */}
      <div style={{ flex: '4', padding: '20px', overflowY: 'auto', backgroundColor: 'var(--surface)' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chatLog.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px' }}>
                {isPlaying ? 'Initializing parameters...' : 'Press Play to begin the simulation.'}
              </div>
            )}
            {chatLog.map((msg, i) => {
              const isUser = msg.startsWith('User:');
              const isSystem = msg.startsWith('System:');
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    backgroundColor: isUser ? 'var(--bg-alt)' : isSystem ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    border: `1px solid ${isUser ? 'var(--border)' : isSystem ? '#EF4444' : 'var(--primary)'}`,
                    color: '#fff',
                    maxWidth: '80%',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                  }}
                >
                  {msg}
                </motion.div>
              );
            })}
            <div ref={chatEndRef} />
         </div>
      </div>

      {/* MEDIA CONTROLS FLOAT */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '20px', alignItems: 'center', background: 'var(--bg-alt)', padding: '10px 24px', borderRadius: '30px', border: '1px solid var(--border)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
         <div style={{ color: 'var(--primary)', fontFamily: 'monospace', width: '40px' }}>
           0:{time.toString().padStart(2, '0')}
         </div>
         <button 
           onClick={handlePlayPause}
           style={{
             background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold'
           }}
         >
           {time >= 42 ? '↺' : isPlaying ? '||' : '▶'}
         </button>
      </div>

    </div>
  );
}
