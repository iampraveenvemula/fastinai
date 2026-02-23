import { useEffect, useRef } from 'react'

const steps = [
    {
        num: '01',
        title: 'Apply & Get Matched',
        desc: 'Fill out a short application. We screen for seriousness, not credentials. Within 48 hours you get matched to the right track — Academy or Lab.',
    },
    {
        num: '02',
        title: 'Learn in Structured Sprints',
        desc: 'Six 2-week sprints. Each sprint ends with a production-grade project you can put on GitHub. No fluff, no slides — only deployed code.',
    },
    {
        num: '03',
        title: 'Ship & Get Hired',
        desc: 'Graduate with a portfolio of real systems. We actively connect top graduates with our network of 40+ enterprise clients across Dubai and India.',
    },
]

export default function HowItWorks() {
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
        <section style={{ padding: '112px 0', background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">

                <div style={{ marginBottom: 64 }}>
                    <span className="label" style={{ display: 'block', marginBottom: 16 }}>The process</span>
                    <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text)' }}>
                        How it works.
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0 }}>
                    {steps.map((s, i) => (
                        <div
                            key={s.num} ref={el => refs.current[i] = el}
                            className={`reveal delay-${i + 1}`}
                            style={{
                                padding: '36px 40px 36px 0',
                                borderRight: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
                                paddingLeft: i > 0 ? 40 : 0,
                            }}
                        >
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '4rem', fontWeight: 300,
                                color: 'var(--border-mid)',
                                lineHeight: 1, marginBottom: 20,
                                letterSpacing: '-0.04em',
                            }}>{s.num}</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>
                                {s.title}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300 }}>
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
