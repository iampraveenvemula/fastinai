import { useEffect, useRef } from 'react'

const testimonials = [
    {
        quote: "FastinAI is the only program that made me actually ship. I went from stuck on YouTube tutorials to deploying a multi-agent RAG system for a fintech client in 8 weeks.",
        name: 'Arjun Mehta',
        role: 'Senior AI Engineer',
        company: 'Paytm',
        location: 'Mumbai, India',
        initials: 'AM',
    },
    {
        quote: "The consulting engagement was transformative. They didn't just audit our AI stack — they redesigned our entire inference pipeline and cut cost by 60% within a quarter.",
        name: 'Sara Al Hashimi',
        role: 'Head of Data & AI',
        company: 'Emirates NBD',
        location: 'Dubai, UAE',
        initials: 'SH',
    },
    {
        quote: "I've done Coursera, deeplearning.ai, fast.ai. None of them taught me to actually build for production. FastinAI Academy is the missing piece this industry needed.",
        name: 'Karthik Rajan',
        role: 'ML Engineer',
        company: 'Freshworks',
        location: 'Bangalore, India',
        initials: 'KR',
    },
]

export default function Testimonials() {
    const refs = useRef([])
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
            { threshold: 0.06 }
        )
        refs.current.forEach(r => r && obs.observe(r))
        return () => obs.disconnect()
    }, [])

    return (
        <section style={{ padding: '112px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">

                <div style={{ marginBottom: 64 }}>
                    <span className="label" style={{ display: 'block', marginBottom: 16 }}>What engineers say</span>
                    <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text)' }}>
                        Built by trust.
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                    {testimonials.map((t, i) => (
                        <div
                            key={t.name} ref={el => refs.current[i] = el}
                            className={`reveal card-minimal delay-${i + 1}`}
                            style={{ padding: '32px', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 24 }}
                        >
                            {/* Quote mark */}
                            <span style={{
                                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                                fontSize: '4rem', lineHeight: 0.8, color: 'var(--accent)',
                                fontWeight: 300, display: 'block',
                            }}>"</span>

                            <p style={{
                                color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.72,
                                fontWeight: 300, flex: 1,
                            }}>
                                {t.quote}
                            </p>

                            {/* Author */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 38, height: 38, borderRadius: '50%',
                                    background: 'var(--bg-alt)',
                                    border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)',
                                    flexShrink: 0,
                                }}>
                                    {t.initials}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{t.name}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 300 }}>
                                        {t.role} · {t.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
