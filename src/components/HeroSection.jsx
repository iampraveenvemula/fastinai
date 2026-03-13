import { useEffect, useRef } from 'react'
import FASTReveal from './AnimatedLogo'

export default function HeroSection() {
    const ref = useRef(null)
    useEffect(() => { if (ref.current) setTimeout(() => ref.current.classList.add('visible'), 60) }, [])

    return (
        <section style={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 40,
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg)',
        }}>
            <div className="container" style={{ paddingTop: 0, paddingBottom: 64 }}>

                {/* Header-only row or simplified layout */}
                <div style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    textAlign: 'left'
                }}>
                    <div ref={ref} className="reveal">
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 24, 
                            marginBottom: 48,
                            paddingTop: 20,
                            maxWidth: '680px',
                            margin: '0 auto'
                        }}>
                            {[
                                { k: 'Learn.', b: 'Explore Master Class', h: '#master-class' },
                                { k: 'Build.', b: 'Join Accelerator', h: '#accelerator' },
                                { k: 'Hire.', b: 'Hiring Support', h: '#hiring-support' },
                            ].map(p => (
                                <div key={p.k} style={{ 
                                    display: 'flex', 
                                    alignItems: 'baseline', 
                                    justifyContent: 'space-between',
                                    borderBottom: '1px solid var(--border)',
                                    paddingBottom: 10,
                                    gap: 20
                                }}>
                                    <span style={{ 
                                        fontFamily: 'var(--font-display)', 
                                        fontSize: 'clamp(1.8rem, 4vw, 3.8rem)', 
                                        color: 'var(--text)',
                                        fontWeight: 300,
                                        letterSpacing: '-0.02em'
                                    }}>{p.k}</span>
                                    
                                    <a href={p.h} className="btn btn-hero-pillar" style={{ 
                                        fontSize: '0.75rem', 
                                        padding: '10px 24px',
                                        minWidth: '170px',
                                        textAlign: 'center'
                                    }}>{p.b}</a>
                                </div>
                            ))}
                        </div>
                    </div>
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
