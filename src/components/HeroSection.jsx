import { useEffect, useRef } from 'react'
import FASTReveal from './AnimatedLogo'

export default function HeroSection() {
    const ref = useRef(null)
    useEffect(() => { if (ref.current) setTimeout(() => ref.current.classList.add('visible'), 60) }, [])

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 80,
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg)',
        }}>
            <div className="container" style={{ paddingTop: 32, paddingBottom: 80 }}>

                {/* Two-column: FAST reveal | Headline */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 'clamp(40px, 6vw, 96px)',
                    alignItems: 'center',
                    marginBottom: 80,
                }}>
                    {/* Left: FAST Acronym Reveal */}
                    <div>
                        <FASTReveal />
                    </div>

                    {/* Right: Headline + Sub + CTAs */}
                    <div ref={ref} className="reveal">
                        <h1 className="display" style={{
                            fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)',
                            color: 'var(--text)',
                            marginBottom: 28,
                        }}>
                            From Theory<br />
                            to{' '}
                            <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>Production.</em>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
                            color: 'var(--text-muted)',
                            lineHeight: 1.75,
                            maxWidth: 460,
                            marginBottom: 40,
                            fontWeight: 300,
                        }}>
                            The forge for Senior AI Engineers.
                            Production-grade training and elite enterprise consulting.
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            <a href="#academy" className="btn btn-fill">Join the Academy →</a>
                            <a href="#consulting" className="btn btn-outline">Book Consulting</a>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="reveal delay-4" style={{
                    display: 'flex', gap: 0, flexWrap: 'wrap',
                    borderTop: '1px solid var(--border)', paddingTop: 40,
                }}>
                    {[
                        { v: '500+', l: 'Engineers trained' },
                        { v: '40+', l: 'Enterprise clients' },
                        { v: '95%', l: 'Job placement' },
                    ].map((s, i) => (
                        <div key={s.l} style={{
                            flex: '1 1 140px',
                            paddingRight: 32,
                            paddingLeft: i > 0 ? 32 : 0,
                            borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                        }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--orange)', lineHeight: 1 }}>{s.v}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6, fontWeight: 400 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile: stack columns */}
            <style>{`
                @media (max-width: 768px) {
                    .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                }
            `}</style>
        </section>
    )
}
