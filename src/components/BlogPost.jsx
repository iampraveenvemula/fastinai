import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LLMMovie from './LLMMovie';

export default function BlogPost({ title, date, content }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ padding: '40px 20px', borderBottom: '1px solid var(--border)', paddingBottom: '30px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Cinematic Experience
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.2, marginBottom: '20px', color: 'var(--text)' }}>
          {title}
        </h1>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Published on {date}
        </div>
      </div>

      {/* Full Bleed Movie Experience */}
      <LLMMovie />

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        {/* Fallback link to full text if they really want it */}
        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
           <p style={{ color: 'var(--text-muted)' }}>
              Want the full academic deep-dive? <a href="https://github.com/iampraveenvemula/fastinai/blob/main/src/content/blog/understanding-llm-models-complete-guide.md" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', borderBottom: '1px solid var(--primary)' }}>Read the raw Markdown article here</a>.
           </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
