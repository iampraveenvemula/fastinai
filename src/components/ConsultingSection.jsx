import { useEffect, useRef } from 'react'

const services = [
    { icon: '🔍', title: 'Enterprise AI Audit', desc: 'A comprehensive review of your current AI stack, identifying risks, inefficiencies, and untapped leverage points. Delivered as an actionable 40-page report.' },
    { icon: '⚙️', title: 'Custom Fine-Tuning', desc: 'Domain-specific LLMs trained on your proprietary data. We handle everything from data preparation to evaluation to deployment.' },
    { icon: '🏗️', title: 'Architecture Design', desc: 'We design scalable, cost-efficient AI infrastructure blueprints tailored to your tech stack, team size, and growth trajectory.' },
    { icon: '🛡️', title: 'AI Governance', desc: 'Responsible AI frameworks, bias assessments, and compliance readiness for regulated industries including finance, healthcare, and government.' },
]

export default function ConsultingSection() {
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
        <section id="consulting" style={{ padding: '112px 0', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
                    <div>
                        <span className="label" style={{ display: 'block', marginBottom: 16 }}>The Lab — Consulting</span>
                        <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text)', maxWidth: 480 }}>
                            Enterprise AI that actually<br />
                            <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>works.</em>
                        </h2>
                    </div>
                    <a href="mailto:hello@fastinai.com" className="btn btn-fill">Book a discovery call →</a>
                </div>

                {/* Services grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 64 }}>
                    {services.map((s, i) => (
                        <div key={s.title} ref={el => refs.current[i] = el}
                            className={`reveal card-minimal delay-${i + 1}`}
                            style={{ padding: '28px 28px', borderRadius: 14 }}
                        >
                            <div style={{ fontSize: '1.4rem', marginBottom: 14 }}>{s.icon}</div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>{s.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Process note */}
                <div style={{
                    borderTop: '1px solid var(--border)', paddingTop: 40,
                    display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'center',
                }}>
                    {[
                        { v: '2-week', l: 'Typical audit turnaround' },
                        { v: 'NDA-first', l: 'All engagements' },
                        { v: 'Fixed scope', l: 'No billing surprises' },
                    ].map(s => (
                        <div key={s.l}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--text)' }}>{s.v}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2, fontWeight: 300 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
