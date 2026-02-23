import { useEffect, useRef } from 'react'

const modules = [
    { icon: '01', title: 'LLM Engineering', desc: 'Prompt engineering, function calling, and structured outputs. Master every layer of the LLM stack.', tags: ['OpenAI API', 'Anthropic', 'Prompt routing', 'Token opt.'] },
    { icon: '02', title: 'Advanced RAG', desc: 'Hybrid search, re-ranking, multi-vector retrieval, and RAGAS evaluation for production retrieval.', tags: ['Vector DBs', 'ColBERT', 'Reranking', 'RAGAS'] },
    { icon: '03', title: 'Agentic Workflows', desc: 'Multi-agent systems, tool-calling, reflection loops and autonomous task execution with reliability guarantees.', tags: ['CrewAI', 'AutoGen', 'Memory', 'Human-loop'] },
    { icon: '04', title: 'MLOps for AI', desc: 'CI/CD for ML, experiment tracking, model serving at scale, and observability for LLM applications.', tags: ['MLflow', 'Ray Serve', 'vLLM', 'Monitoring'] },
]

export default function CurriculumBento() {
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
        <section id="curriculum" className="section" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
                    <div>
                        <span className="label" style={{ display: 'block', marginBottom: 16 }}>The curriculum</span>
                        <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', color: 'var(--text)' }}>
                            Four modules.<br />Infinite leverage.
                        </h2>
                    </div>
                    <a href="#" className="btn btn-outline">View full syllabus</a>
                </div>

                {/* Grid */}
                <div className="grid-2">
                    {modules.map((m, i) => (
                        <div
                            key={m.title} ref={el => refs.current[i] = el}
                            className={`reveal card-minimal delay-${i + 1}`}
                            style={{ padding: '36px', borderRadius: 18 }}
                        >
                            <div style={{
                                fontFamily: 'var(--font-display)', fontWeight: 300,
                                fontSize: '3rem', color: '#BBBBBB', letterSpacing: '-0.04em',
                                marginBottom: 20, lineHeight: 1,
                            }}>{m.icon}</div>

                            <h3 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: 12, color: 'var(--text)' }}>
                                {m.title}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 24, fontWeight: 300 }}>
                                {m.desc}
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {m.tags.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
