import { useState } from 'react'

export default function Footer() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !email.includes('@')) { setStatus('error'); return }
        setStatus('success'); setEmail('')
        setTimeout(() => setStatus(null), 4000)
    }

    return (
        <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>

            {/* Newsletter band */}
            <div style={{ borderBottom: '1px solid var(--border)', padding: '80px 0' }}>
                <div className="container-sm" style={{ textAlign: 'center' }}>
                    <span className="label" style={{ display: 'block', marginBottom: 16 }}>The Weekly AI Brief</span>
                    <h2 className="display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'var(--text)', marginBottom: 16 }}>
                        Stay sharp.<br />Stay ahead.
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 36, fontWeight: 300 }}>
                        AI engineering insights, paper summaries, and production war stories — every Monday. No noise.
                    </p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <input type="email" className="input" placeholder="your@email.com" value={email}
                            onChange={e => setEmail(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
                        <button type="submit" className="btn btn-fill">Subscribe →</button>
                    </form>
                    {status === 'success' && <p style={{ color: 'var(--accent)', fontSize: '0.82rem', marginTop: 12 }}>You're on the list. Welcome.</p>}
                    {status === 'error' && <p style={{ color: '#E53E3E', fontSize: '0.82rem', marginTop: 12 }}>Please enter a valid email.</p>}
                </div>
            </div>

            {/* Footer links */}
            <div style={{ padding: '48px 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start' }}>

                    {/* Brand */}
                    <div style={{ maxWidth: 220 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em', display: 'block', marginBottom: 10 }}>
                            Fastin<em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>AI</em>
                        </span>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.65, fontWeight: 300 }}>
                            Factory for Advanced Skills &amp; Talent. Dubai, UAE &amp; India.
                        </p>

                        {/* Socials */}
                        <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
                            {[
                                { label: 'LinkedIn', href: 'https://linkedin.com', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
                                { label: 'GitHub', href: 'https://github.com', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg> },
                                { label: 'YouTube', href: 'https://youtube.com/@aihumanly', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FAFAFA" /></svg> },
                            ].map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                                    style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                >{s.icon}</a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
                        {[
                            { title: 'Learn', links: ['LLM Engineering', 'Advanced RAG', 'Agentic Systems', 'MLOps'] },
                            { title: 'Company', links: ['About', 'AI Humanly', 'Blog', 'Contact'] },
                        ].map(col => (
                            <div key={col.title}>
                                <p className="label" style={{ marginBottom: 14 }}>{col.title}</p>
                                {col.links.map(l => (
                                    <a key={l} href="#" style={{ display: 'block', marginBottom: 10, color: 'var(--text-muted)', fontSize: '0.87rem', textDecoration: 'none', fontWeight: 300, transition: 'color 0.15s' }}
                                        onMouseEnter={e => e.target.style.color = 'var(--text)'}
                                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                                    >{l}</a>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="container" style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.78rem', fontWeight: 300 }}>© 2026 FastinAI. Dubai, UAE &amp; India.</p>
                    <div style={{ display: 'flex', gap: 24 }}>
                        {['Privacy', 'Terms'].map(l => (
                            <a key={l} href="#" style={{ color: 'var(--text-light)', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 300, transition: 'color 0.15s' }}
                                onMouseEnter={e => e.target.style.color = 'var(--text)'} onMouseLeave={e => e.target.style.color = 'var(--text-light)'}
                            >{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
