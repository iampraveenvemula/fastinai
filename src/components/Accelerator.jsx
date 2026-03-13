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
                <div ref={ref} className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                    <div>
                        <span className="label" style={{ display: 'block', marginBottom: 16 }}>Practical Execution</span>
                        <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text)', marginBottom: 24 }}>
                            AI Accelerator
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 32 }}>
                            We don't do slides. We build production systems. 
                            The Accelerator is an intensive, project-first experience where you ship real AI features.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                            {['Multi-Agent Support Systems', 'Custom Knowledge Graphs', 'Automated Content Pipelines'].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, color: 'var(--text)' }}>
                                    <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span> {item}
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-outline" style={{ padding: '14px 28px' }}>View Upcoming Projects</button>
                    </div>
                    <div style={{ background: 'var(--surface)', borderRadius: 24, border: '1px solid var(--border)', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Project Dashboard Preview</span>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    #accelerator .reveal { grid-template-columns: 1fr !important; gap: 40px !important; }
                }
            `}</style>
        </section>
    )
}
