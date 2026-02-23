import { useEffect, useRef } from 'react'

const tracks = [
    {
        id: 'academy', tag: 'The Academy',
        title: 'Ship LLMs\nto Production.',
        subtitle: 'Structured learning for engineers who want to stop experimenting and start deploying AI that lasts.',
        features: [
            { label: 'LLM Orchestration', desc: 'LangChain, LlamaIndex, DSPy — end to end.' },
            { label: 'MLOps & CI/CD for AI', desc: 'Model versioning, drift monitoring, scalable inference.' },
            { label: 'Advanced RAG Systems', desc: 'Hybrid search, re-ranking, evaluation pipelines.' },
            { label: 'Agentic Workflows', desc: 'Multi-agent orchestration and tool-calling systems.' },
        ],
        cta: 'Explore the Academy',
    },
    {
        id: 'lab', tag: 'The Lab',
        title: 'AI That Moves\nthe Enterprise.',
        subtitle: 'Bespoke AI consulting for organizations ready to move from pilot to production at scale, responsibly.',
        features: [
            { label: 'Enterprise AI Audits', desc: 'Model risk, bias assessment, compliance readiness.' },
            { label: 'Custom Fine-Tuning', desc: 'Domain-specific LLMs trained on your proprietary data.' },
            { label: 'AI Architecture Design', desc: 'Scalable, cost-efficient AI infrastructure blueprints.' },
            { label: 'AI Governance & Policy', desc: 'Responsible AI practices for regulated industries.' },
        ],
        cta: 'Book a Consultation',
    },
]

export default function DualTrack() {
    const refs = useRef([])
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
            { threshold: 0.08 }
        )
        refs.current.forEach(r => r && obs.observe(r))
        return () => obs.disconnect()
    }, [])

    return (
        <section id="academy" className="section" style={{ background: 'var(--bg)' }}>
            <div className="container">

                {/* Header */}
                <div style={{ marginBottom: 64 }}>
                    <span className="label" style={{ display: 'block', marginBottom: 16 }}>Two tracks</span>
                    <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', color: 'var(--text)' }}>
                        Choose your path.
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid-2">
                    {tracks.map((t, i) => (
                        <div
                            key={t.id} ref={el => refs.current[i] = el}
                            className={`reveal card-minimal ${i === 1 ? 'delay-2' : ''}`}
                            style={{ padding: '40px 36px', borderRadius: 20 }}
                        >
                            <span className="tag-accent" style={{ marginBottom: 24, display: 'inline-block' }}>{t.tag}</span>

                            <h3 className="display" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)', color: 'var(--text)', marginBottom: 16, whiteSpace: 'pre-line' }}>
                                {t.title}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
                                {t.subtitle}
                            </p>

                            {/* Feature list */}
                            <div>
                                {t.features.map(f => (
                                    <div key={f.label} className="feature-row">
                                        <span className="dot" style={{ marginTop: 5 }} />
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: 2 }}>{f.label}</p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.55, fontWeight: 300 }}>{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <a href="#" className="btn btn-text" style={{ marginTop: 24 }}>
                                {t.cta}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
