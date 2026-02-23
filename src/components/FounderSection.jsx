import { useEffect, useRef } from 'react'

export default function FounderSection() {
    const ref = useRef(null)
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
            { threshold: 0.08 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section style={{ padding: '112px 0', background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">
                <div ref={ref} className="reveal" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
                    gap: 80, alignItems: 'center',
                }}>
                    {/* Avatar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
                        <div style={{
                            width: '100%', maxWidth: 320,
                            aspectRatio: '4/5',
                            borderRadius: 20,
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                        }}>
                            {/* Placeholder monogram — swap with <img> when real photo is ready */}
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                            }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: '50%',
                                    background: 'var(--bg-alt)', border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 300,
                                    color: 'var(--text-muted)',
                                }}>P</div>
                                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>Photo coming soon</span>
                            </div>
                        </div>

                        {/* Stats below photo */}
                        <div style={{ display: 'flex', gap: 28 }}>
                            {[{ v: '12+', l: 'years in AI' }, { v: '3', l: 'exits' }].map(s => (
                                <div key={s.l}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text)' }}>{s.v}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2, fontWeight: 300 }}>{s.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Text */}
                    <div>
                        <span className="label" style={{ display: 'block', marginBottom: 16 }}>The founder</span>
                        <h2 className="display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text)', marginBottom: 24 }}>
                            Built by someone<br />
                            who's <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>shipped it.</em>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>
                            FastinAI was founded by a practitioner who spent a decade building AI systems for banks, fintechs, and Fortune 500 companies across the Middle East and India — before any of this was "cool."
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
                            The academy exists because <strong style={{ fontWeight: 600, color: 'var(--text)' }}>the gap between "I took the course" and "I can ship this to prod" was killing careers.</strong> We built the bridge.
                        </p>

                        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
                                LinkedIn →
                            </a>
                            <a href="https://youtube.com/@aihumanly" target="_blank" rel="noopener noreferrer" className="btn btn-text">
                                Watch AI Humanly →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile: stack columns */}
            <style>{`
        @media (max-width: 780px) {
          .founder-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    )
}
