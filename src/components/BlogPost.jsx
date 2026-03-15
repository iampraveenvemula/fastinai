import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';
import Navbar from './Navbar';
import Footer from './Footer';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif'
});

const Mermaid = ({ chart }) => {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    if (chart) {
      mermaid.render(`mermaid-${Math.random().toString(36).substr(2, 9)}`, chart)
        .then(({ svg }) => setSvg(svg))
        .catch(e => console.error("Mermaid parsing error:", e));
    }
  }, [chart]);

  return <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }} />;
};

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
              Article
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.2, marginBottom: '20px', color: 'var(--text)' }}>
              {title}
            </h1>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Published on {date}
            </div>
          </div>

          <div className="markdown-content" style={{ 
            color: 'var(--text)', 
            lineHeight: 1.8, 
            fontSize: '1.1rem' 
          }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({node, ...props}) => <h2 style={{ marginTop: '2.5rem', marginBottom: '1.5rem', fontSize: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }} {...props} />,
                p: ({node, ...props}) => <p style={{ marginBottom: '1.5rem', color: 'var(--text)' }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote style={{ 
                    borderLeft: '4px solid var(--primary)', 
                    padding: '1rem 1.5rem', 
                    margin: '1.5rem 0',
                    background: 'var(--bg-alt)',
                    borderRadius: '0 8px 8px 0',
                    color: 'var(--text-light)',
                    fontStyle: 'italic'
                  }} {...props} />
                ),
                table: ({node, ...props}) => (
                  <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} {...props} />
                  </div>
                ),
                th: ({node, ...props}) => <th style={{ borderBottom: '2px solid var(--border)', padding: '12px', background: 'var(--bg-alt)' }} {...props} />,
                td: ({node, ...props}) => <td style={{ borderBottom: '1px solid var(--border)', padding: '12px' }} {...props} />,
                hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '3rem 0' }} {...props} />,
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  
                  // Handle Mermaid code blocks
                  if (!inline && match && match[1] === 'mermaid') {
                    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                  }

                  // Handle regular code blocks
                  return !inline ? (
                    <div style={{ background: '#1a1a24', padding: '1.5rem', borderRadius: '12px', margin: '1.5rem 0', overflowX: 'auto', border: '1px solid var(--border)' }}>
                      <code className={className} style={{ color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.9rem' }} {...props}>
                        {children}
                      </code>
                    </div>
                  ) : (
                    <code style={{ background: 'var(--bg-alt)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em', color: 'var(--primary)' }} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
