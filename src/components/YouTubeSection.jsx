import { useEffect, useRef } from 'react'

const videos = [
    { id: 1, badge: true, title: 'Building Production RAG Systems from Scratch', views: '42K views', duration: '48:22', thumb: 'https://img.youtube.com/vi/dOHxfRyQLvk/hqdefault.jpg', url: 'https://youtube.com/@aihumanly' },
    { id: 2, title: 'LLM Agents That Actually Work in Production', views: '31K views', duration: '35:10', thumb: 'https://img.youtube.com/vi/1bUy-1hGZpI/hqdefault.jpg', url: 'https://youtube.com/@aihumanly' },
    { id: 3, title: 'Fine-Tuning Llama 3 on Your Own Data', views: '58K views', duration: '52:44', thumb: 'https://img.youtube.com/vi/eC6Hd1hFvos/hqdefault.jpg', url: 'https://youtube.com/@aihumanly' },
    { id: 4, title: 'Evaluating LLMs: Beyond Vibes', views: '22K views', duration: '29:05', thumb: 'https://img.youtube.com/vi/bZQun8Y4L2A/hqdefault.jpg', url: 'https://youtube.com/@aihumanly' },
    { id: 5, title: 'MLOps for AI Engineers — the Real Stack', views: '18K views', duration: '41:17', thumb: 'https://img.youtube.com/vi/wjZofJX0v4M/hqdefault.jpg', url: 'https://youtube.com/@aihumanly' },
]

export default function YouTubeSection() {
    const ref = useRef(null)
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
            { threshold: 0.08 }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section id="insights" className="section" style={{ background: 'var(--bg)' }}>
            <div className="container">

                {/* Header */}
                <div ref={ref} className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
                    <div>
                        <span className="label" style={{ display: 'block', marginBottom: 16 }}>AI Humanly — YouTube</span>
                        <h2 className="display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--text)' }}>
                            Learn the human<br />side of AI.
                        </h2>
                    </div>
                    <a href="https://youtube.com/@aihumanly" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        View channel →
                    </a>
                </div>

                {/* Carousel */}
                <div className="scroll-row">
                    {videos.map(v => (
                        <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit', width: 280 }}
                        >
                            <div className="card-minimal" style={{ borderRadius: 14, overflow: 'hidden' }}>
                                {/* Thumbnail */}
                                <div style={{ position: 'relative', aspectRatio: '16/9', background: '#E8E8E8', overflow: 'hidden' }}>
                                    <img src={v.thumb} alt={v.title} loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                        onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                        onError={e => e.target.style.display = 'none'}
                                    />
                                    <span style={{
                                        position: 'absolute', bottom: 8, right: 8,
                                        background: 'rgba(0,0,0,0.65)', color: '#fff',
                                        fontSize: '0.68rem', fontWeight: 500, padding: '2px 8px', borderRadius: 4,
                                    }}>{v.duration}</span>
                                </div>
                                {/* Info */}
                                <div style={{ padding: '16px' }}>
                                    {v.badge && (
                                        <span className="tag-accent" style={{ marginBottom: 8, display: 'inline-block', fontSize: '0.65rem' }}>Latest Deep Dive</span>
                                    )}
                                    <h3 style={{
                                        fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.45, color: 'var(--text)', marginBottom: 8,
                                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                    }}>{v.title}</h3>
                                    <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', fontWeight: 400 }}>{v.views}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
