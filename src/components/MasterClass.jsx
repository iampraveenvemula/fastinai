import { useEffect, useRef } from 'react'

const topics = [
    'Langchain & Langgraph',
    'Language Model Fundamentals',
    'LLMs & GenAI',
    'Agentic AI',
    'RAG Pipelines',
    'Claude Tools & API Integration'
]

export default function MasterClass() {
    const ref = useRef(null)
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
            { threshold: 0.1 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="master-class" style={{ padding: '112px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">
                <div ref={ref} className="reveal">
                    <span className="label" style={{ display: 'block', marginBottom: 16 }}>Curated Expert Training</span>
                    <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text)', marginBottom: 48 }}>
                        Master Class Series
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 64 }}>
                        {/* Slow Pace */}
                        <div className="card-minimal pace-card" style={{ padding: 40, border: '1px solid var(--border)', borderRadius: 20 }}>
                            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: 8 }}>COMPREHENSIVE</div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Deep Dive Track</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: 24, color: 'var(--text)' }}>8 Hours</div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>Detailed conceptual understanding in depth. Master the 'why' behind the code.</p>
                            <button className="btn btn-outline" disabled style={{ width: '100%', justifyContent: 'center', opacity: 0.5, cursor: 'not-allowed' }}>Coming Soon</button>
                        </div>

                        {/* Fast Pace */}
                        <div className="card-minimal pace-card" style={{ padding: 40, border: '1px solid var(--border)', borderRadius: 20, position: 'relative' }}>
                            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: 8 }}>INTENSIVE</div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Accelerated Track</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: 24, color: 'var(--text)' }}>4 Hours</div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>High-level coverage of the most important and critical topics. Straight to the code, no fluff.</p>
                            <button className="btn btn-outline" disabled style={{ width: '100%', justifyContent: 'center', opacity: 0.5, cursor: 'not-allowed' }}>Coming Soon</button>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 48 }}>
                        <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em', marginBottom: 32, textAlign: 'center' }}>CORE CURRICULUM</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                            {topics.map(t => (
                                <span key={t} style={{ 
                                    padding: '8px 20px', 
                                    background: 'var(--bg-alt)', 
                                    border: '1px solid var(--border)', 
                                    borderRadius: 30, 
                                    fontSize: '0.9rem', 
                                    color: 'var(--text-body)' 
                                }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .pace-card { transition: border-color 0.3s ease; }
                .pace-card:hover { border-color: var(--primary) !important; }
            `}</style>
        </section>
    )
}
