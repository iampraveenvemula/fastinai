import React from 'react';
import { Scene, DrawText, DrawPath, DrawCircle, DrawRect, FadeGroup, chalkTheme, ChalkDefs } from './HandwritingEngine';

const S1 = () => (
   <Scene>
      <div className="grid-2">
         <div style={{ paddingRight: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DrawText as="h2" text="1. The Illusion of Thought" style={{ fontSize: '2.5rem', color: '#fef08a' }} duration={1.5} delay={0} />
            <DrawText as="p" text="Language models do not think. They do not reason." duration={2.0} delay={1.5} style={{ fontSize: '1.5rem', opacity: 0.8 }} />
            <DrawText as="p" text="At their absolute core, they are statistical engines designed to predict the next sequence of characters." duration={3.0} delay={3.5} style={{ fontSize: '1.5rem' }} />
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 400 300" width="100%" height="100%">
               <ChalkDefs />
               <FadeGroup delay={6.5} duration={1}>
                  <text x="50" y="80" fill="#ffffff" fontSize="24" fontFamily={chalkTheme.fontFamily}>"The weather is..."</text>
               </FadeGroup>
               <DrawPath d="M 120 100 L 120 150 L 50 200" delay={7.5} />
               <DrawPath d="M 120 100 L 120 150 L 190 200" delay={7.5} />
               
               <DrawRect x="10" y="200" width="80" height="40" delay={9.0} fill="rgba(252, 165, 165, 0.2)" stroke="#fca5a5" />
               <FadeGroup delay={10.2}>
                  <text x="50" y="225" fill="#fca5a5" fontSize="16" fontFamily={chalkTheme.fontFamily} textAnchor="middle">HOT</text>
               </FadeGroup>

               <DrawRect x="150" y="200" width="80" height="40" delay={9.0} fill="rgba(147, 197, 253, 0.2)" stroke="#93c5fd" />
               <FadeGroup delay={10.2}>
                  <text x="190" y="225" fill="#93c5fd" fontSize="16" fontFamily={chalkTheme.fontFamily} textAnchor="middle">COLD</text>
               </FadeGroup>
            </svg>
         </div>
      </div>
   </Scene>
);

const S2 = () => (
   <Scene>
      <div className="grid-2">
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 400 300" width="100%" height="100%">
               <ChalkDefs />
               <DrawPath d="M 50 150 L 350 150" delay={1.5} />
               
               <DrawCircle cx="100" cy="150" r="10" delay={2.5} />
               <FadeGroup delay={3.5}><text x="100" y="180" fill="#ffffff" textAnchor="middle" fontFamily={chalkTheme.fontFamily}>1990s</text></FadeGroup>

               <DrawCircle cx="200" cy="150" r="10" delay={4.0} />
               <FadeGroup delay={5.0}><text x="200" y="180" fill="#ffffff" textAnchor="middle" fontFamily={chalkTheme.fontFamily}>2013</text></FadeGroup>

               <DrawCircle cx="300" cy="150" r="15" delay={5.5} stroke="#fef08a" />
               <DrawCircle cx="300" cy="150" r="25" delay={6.0} stroke="#fef08a" />
               <FadeGroup delay={7.0}><text x="300" y="180" fill="#fef08a" textAnchor="middle" fontFamily={chalkTheme.fontFamily}>2017</text></FadeGroup>
            </svg>
         </div>
         <div style={{ paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DrawText as="h2" text="2. The Leap Forward" style={{ fontSize: '2.5rem', color: '#fef08a' }} duration={1.5} delay={0} />
            <DrawText as="p" text="In the 1990s, systems had the memory of a goldfish." duration={2.0} delay={2.5} style={{ fontSize: '1.5rem', opacity: 0.8 }} />
            <DrawText as="p" text="By 2013, we learned to calculate math with language (Embeddings)." duration={2.5} delay={4.5} style={{ fontSize: '1.5rem', opacity: 0.8 }} />
            <DrawText as="p" text="But the leap came in 2017 with Transformers, which ingest entire sequences at once." duration={3.5} delay={7.0} style={{ fontSize: '1.5rem' }} />
         </div>
      </div>
   </Scene>
);

const S3 = () => (
   <Scene>
      <div className="grid-2">
         <div style={{ paddingRight: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DrawText as="h2" text="3. Self-Attention" style={{ fontSize: '2.5rem', color: '#fef08a' }} duration={1.5} delay={0} />
            <DrawText as="p" text="Sequential models have to slowly look backwards to figure out context." duration={2.5} delay={1.5} style={{ fontSize: '1.5rem', opacity: 0.8 }} />
            <DrawText as="p" text="Self-Attention evaluates every word against every OTHER word instantly." duration={3.0} delay={4.0} style={{ fontSize: '1.5rem' }} />
            <DrawText as="p" text="It binds concepts securely in a single computation." duration={2.0} delay={7.5} style={{ fontSize: '1.5rem' }} />
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 400 300" width="100%" height="100%">
               <ChalkDefs />
               <FadeGroup delay={2.0} duration={1}>
                  <text x="50" y="100" fill="#ffffff" fontSize="20" fontFamily={chalkTheme.fontFamily}>The astronaut</text>
                  <text x="180" y="100" fill="#ffffff" fontSize="20" fontFamily={chalkTheme.fontFamily}>boarded</text>
                  <text x="260" y="100" fill="rgba(255,255,255,0.5)" fontSize="20" fontFamily={chalkTheme.fontFamily}>the</text>
                  <text x="90" y="180" fill="rgba(255,255,255,0.5)" fontSize="20" fontFamily={chalkTheme.fontFamily}>rocket</text>
                  <text x="180" y="180" fill="#ffffff" fontSize="20" fontFamily={chalkTheme.fontFamily}>she</text>
               </FadeGroup>
               <DrawRect x="40" y="75" width="125" height="35" delay={4.5} />
               <DrawRect x="165" y="155" width="55" height="35" delay={5.5} />
               
               <DrawPath d="M 190 150 C 180 120 120 120 100 115" delay={8.0} stroke="#fef08a" />
            </svg>
         </div>
      </div>
   </Scene>
);

const S4 = () => (
   <Scene>
      <div className="grid-2">
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 400 300" width="100%" height="100%">
               <ChalkDefs />
               <FadeGroup delay={1.5}>
                  <text x="200" y="120" textAnchor="middle" fill="#ffffff" fontSize="32" fontFamily={chalkTheme.fontFamily} letterSpacing="4">unbelievable</text>
               </FadeGroup>
               
               <DrawPath d="M 130 90 L 130 140" stroke="#fca5a5" delay={4.5} />
               <DrawPath d="M 230 90 L 230 140" stroke="#fca5a5" delay={5.5} />

               <DrawRect x="80" y="160" width="60" height="30" delay={7.0} stroke="#86efac" fill="rgba(134,239,172,0.1)" />
               <DrawRect x="145" y="160" width="100" height="30" delay={7.5} stroke="#60a5fa" fill="rgba(96,165,250,0.1)" />
               <DrawRect x="250" y="160" width="60" height="30" delay={8.0} stroke="#fcd34d" fill="rgba(252,211,77,0.1)" />
            </svg>
         </div>
         <div style={{ paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DrawText as="h2" text="4. Tokenization" style={{ fontSize: '2.5rem', color: '#fef08a' }} duration={1.5} delay={0} />
            <DrawText as="p" text="Models do not 'read' whole words." duration={2.0} delay={1.5} style={{ fontSize: '1.5rem', opacity: 0.8 }} />
            <DrawText as="p" text="Text is sliced into optimal blocks called Tokens." duration={2.5} delay={3.5} style={{ fontSize: '1.5rem' }} />
            <DrawText as="p" text="This is why spelling patterns or character tracking is difficult for an LLM to master." duration={2.5} delay={6.0} style={{ fontSize: '1.5rem' }} />
         </div>
      </div>
   </Scene>
);

export default function HandwrittenBlog() {
  return (
    <div style={{ background: '#263238', color: '#ffffff', minHeight: '100vh', padding: '60px 0' }}>
       <div style={{ textAlign: 'center', marginBottom: '10vh' }}>
          <Scene margin="0%">
             <DrawText as="h1" text="Inside the Machine" duration={2} style={{ fontSize: '4rem', fontFamily: "'Patrick Hand', cursive", color: '#fef08a' }} />
             <br />
             <DrawText as="p" text="A hand-drawn summary of LLM mechanics." duration={2} delay={2.5} style={{ fontSize: '1.5rem', opacity: 0.7 }} />
          </Scene>
       </div>
       
       <S1 />
       <S2 />
       <S3 />
       <S4 />
       
       <Scene>
          <div style={{ textAlign: 'center', marginTop: '10vh' }}>
             <DrawText as="h3" text="The End" duration={1.5} style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.4)', fontFamily: "'Patrick Hand', cursive" }} />
          </div>
       </Scene>
    </div>
  );
}
