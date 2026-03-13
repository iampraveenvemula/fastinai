import { useEffect, useRef, useState } from 'react'
import { LogoInline } from './AnimatedLogo'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: scrolled ? 'rgba(10,10,10,0.85)' : 'rgba(10,10,10,0.0)',
            borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
            transition: 'all 0.3s ease',
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>

                {/* Logo */}
                <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <LogoInline size="navbar" />
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
                    {['Master Class', 'Accelerator', 'Hiring Support', 'Blog'].map(l => (
                        <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} style={{
                            fontFamily: 'var(--font-body)', color: 'var(--text-muted)',
                            fontSize: '0.875rem', fontWeight: 400, textDecoration: 'none',
                            transition: 'color 0.15s',
                        }}
                            onMouseEnter={e => e.target.style.color = 'var(--text)'}
                            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                        >{l}</a>
                    ))}
                </div>

                {/* Mobile */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: 4 }} aria-label="Menu">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></>}
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <div style={{ background: 'rgba(10,10,10,0.97)', borderTop: '1px solid var(--border)', padding: '12px 0 20px' }}>
                    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {['Master Class', 'Accelerator', 'Hiring Support', 'Blog'].map(l => (
                            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} onClick={() => setMenuOpen(false)}
                                style={{ padding: '12px 0', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid var(--border)' }}
                            >{l}</a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
