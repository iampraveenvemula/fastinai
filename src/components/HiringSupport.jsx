import { useEffect, useRef } from 'react'

export default function HiringSupport() {
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
        <section id="hiring-support" style={{ padding: '112px 0', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">
                <div ref={ref} className="reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <span className="label" style={{ display: 'block', marginBottom: 16 }}>Scale Your Engineering Team</span>
                    <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text)', marginBottom: 24 }}>
                        Premier Hiring Support
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: 48 }}>
                        I personally support your interview process to ensure you land 1% talent. From deep technical shortlisting to conducting final-round interviews for Senior AI roles.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
                        <div>
                            <div style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: 12 }}>✦</div>
                            <h4 style={{ color: 'var(--text)', marginBottom: 8 }}>Shortlisting</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Vetting resumes and GitHub portfolios for actual production experience.</p>
                        </div>
                        <div>
                            <div style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: 12 }}>✦</div>
                            <h4 style={{ color: 'var(--text)', marginBottom: 8 }}>Technical Interviews</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Deep-dive sessions focusing on architecture, RAG, and scaling LLMs.</p>
                        </div>
                        <div>
                            <div style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: 12 }}>✦</div>
                            <h4 style={{ color: 'var(--text)', marginBottom: 8 }}>Final Assessment</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Strategic evaluation of candidate's alignment with your product roadmap.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
