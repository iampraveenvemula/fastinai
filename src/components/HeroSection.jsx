import { useEffect, useRef } from 'react'

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
            <div className="container-sm" style={{ paddingTop: 32, paddingBottom: 80 }}>

                {/* Eyebrow */}
                <div ref={ref} className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
                    <span className="dot" />
                    <span className="label">F.A.S.T. — Factory for Advanced Skills &amp; Talent</span>
                </div>

                {/* Headline */}
                <h1 className="reveal delay-1 display" style={{
                    fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                    color: 'var(--text)',
                    marginBottom: 32,
                }}>
                    From Theory<br />
                    to{' '}
                    <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Production.</em>
                </h1>

                {/* Sub */}
                <p className="reveal delay-2" style={{
                    fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.75,
                    maxWidth: 500,
                    marginBottom: 48,
                    fontWeight: 300,
                }}>
                    F.A.S.T. is the forge for Senior AI Engineers.
                    Production-grade training and elite enterprise consulting.
                </p>

                {/* CTAs */}
                <div className="reveal delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 80 }}>
                    <a href="#academy" className="btn btn-fill">Join the Academy →</a>
                    <a href="#consulting" className="btn btn-outline">Book Consulting</a>
                </div>

                {/* Stats */}
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
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1 }}>{s.v}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6, fontWeight: 400 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
