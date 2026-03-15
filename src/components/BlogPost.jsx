import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LLMStories from './LLMStories';

export default function BlogPost({ title, date, content }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '30px' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Interactive Article
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.2, marginBottom: '20px', color: 'var(--text)' }}>
              {title}
            </h1>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Published on {date}
            </div>
          </div>

          {/* Render the new interactive Stories component instead of the markdown wall of text */}
          <div style={{ padding: '20px 0', background: 'radial-gradient(circle at center, var(--bg-alt) 0%, var(--bg) 100%)', borderRadius: '32px', border: '1px solid var(--border)' }}>
             <LLMStories />
          </div>

          {/* Fallback link to full text if they really want it */}
          <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
             <p style={{ color: 'var(--text-muted)' }}>
                Want the full academic deep-dive? <a href="https://github.com/iampraveenvemula/fastinai/blob/main/src/content/blog/understanding-llm-models-complete-guide.md" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', borderBottom: '1px solid var(--primary)' }}>Read the raw Markdown article here</a>.
             </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
