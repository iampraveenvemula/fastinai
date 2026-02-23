import { useEffect, useRef } from 'react'

export default function BottomCTA() {
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
        <section style={{ padding: '112px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
            <div className="container-sm">
                <div ref={ref} className="reveal" style={{ textAlign: 'center' }}>

                    <span className="label" style={{ display: 'block', marginBottom: 20 }}>Ready to ship?</span>

                    <h2 className="display" style={{
                        fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
                        color: 'var(--text)', marginBottom: 24,
                    }}>
                        Stop watching.<br />
                        Start{' '}
                        <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>building.</em>
                    </h2>

                    <p style={{
                        color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.75,
                        fontWeight: 300, maxWidth: 460, margin: '0 auto 40px',
                    }}>
                        Applications for the next cohort are open. 40 seats. First come, first assessed.
                    </p>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#academy" className="btn btn-fill" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                            Apply for the Academy →
                        </a>
                        <a href="#consulting" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                            Book Consulting
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
