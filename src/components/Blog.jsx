import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Blog() {
    const ref = useRef(null)
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
            { threshold: 0.1 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    const posts = [
        { title: 'The Complete Beginner\'s Guide to Large Language Models (LLMs)', date: 'Mar 15, 2026', read: '15 min', link: '/blog/understanding-llm-models-complete-guide' },
    ]

    return (
        <section id="blog" style={{ padding: '112px 0', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">
                <div ref={ref} className="reveal">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
                        <div>
                            <span className="label" style={{ display: 'block', marginBottom: 16 }}>Insights & Research</span>
                            <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--text)' }}>Blog</h2>
                        </div>
                        <a href="/blog" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--primary)', paddingBottom: 4 }}>View all articles</a>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                        {posts.map(p => (
                            p.link === '#' ? (
                                <div key={p.title} className="card-minimal" style={{ padding: 32, border: '1px solid var(--border)', borderRadius: 16, opacity: 0.6, cursor: 'default' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', gap: 16 }}>
                                        <span>{p.date}</span>
                                        <span>{p.read}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', lineHeight: 1.4, color: 'var(--text)', marginBottom: 20 }}>{p.title}</h3>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Coming soon...</span>
                                </div>
                            ) : (
                                <Link key={p.title} to={p.link} style={{ textDecoration: 'none' }}>
                                    <div className="card-minimal" style={{ padding: 32, border: '1px solid var(--border)', borderRadius: 16, cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s', height: '100%' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                    >
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', gap: 16 }}>
                                            <span>{p.date}</span>
                                            <span>{p.read}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', lineHeight: 1.4, color: 'var(--text)', marginBottom: 20 }}>{p.title}</h3>
                                        <span style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500 }}>Read Article →</span>
                                    </div>
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
