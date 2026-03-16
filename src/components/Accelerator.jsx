import { useEffect, useRef } from 'react'

export default function Accelerator() {
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
        <section id="accelerator" style={{ padding: '112px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">
                <div ref={ref} className="reveal">
                    <span className="label" style={{ display: 'block', marginBottom: 16 }}>Practical Execution</span>
                    <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text)', marginBottom: 24 }}>
                        AI Accelerator
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 48, maxWidth: '800px' }}>
                        Practical hands-on implementation of the topics learned in the Masterclass. We don't do slides here; we build production systems. The Accelerator is an intensive, project-first experience where you ship real AI features.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginBottom: 64 }}>
                        {/* Slow Pace */}
                        <div className="card-minimal pace-card" style={{ padding: 40, border: '1px solid var(--border)', borderRadius: 20 }}>
                            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: 8 }}>COMPREHENSIVE</div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Deep Dive Track</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: 24, color: 'var(--text)' }}>8 Hours</div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>Detailed, step-by-step hands-on implementation. We write code together, debug together, and deploy together.</p>
                            <button className="btn btn-outline" disabled style={{ width: '100%', justifyContent: 'center', opacity: 0.5, cursor: 'not-allowed' }}>Coming Soon</button>
                        </div>

                        {/* Fast Pace */}
                        <div className="card-minimal pace-card" style={{ padding: 40, border: '1px solid var(--border)', borderRadius: 20, position: 'relative' }}>
                            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: 8 }}>INTENSIVE</div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Accelerated Track</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: 24, color: 'var(--text)' }}>4 Hours</div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>High-level intensive hacking. Rapid prototyping for important topics to get your MVPs out the door.</p>
                            <button className="btn btn-outline" disabled style={{ width: '100%', justifyContent: 'center', opacity: 0.5, cursor: 'not-allowed' }}>Coming Soon</button>
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
