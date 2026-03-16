import { useEffect, useRef, useState } from 'react'
import { LogoInline } from './AnimatedLogo'
import { useTheme } from './ThemeContext'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()

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
                <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <LogoInline size="navbar" />
                </a>

                {/* Desktop nav & Theme Button */}
                <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
                    {[{name: 'Master Class', id: 'master-class'}, {name: 'Accelerator', id: 'accelerator'}, {name: 'Hiring Support', id: 'hiring-support'}, {name: 'Insights & Research', id: 'blog'}].map(l => (
                        <a key={l.name} href={`/#${l.id}`} style={{
                            fontFamily: 'var(--font-body)', color: 'var(--text-muted)',
                            fontSize: '0.875rem', fontWeight: 400, textDecoration: 'none',
                            transition: 'color 0.15s',
                        }}
                            onMouseEnter={e => e.target.style.color = 'var(--text)'}
                            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                        >{l.name}</a>
                    ))}
                    
                    <button onClick={toggleTheme} style={{ 
                        background: 'transparent', border: '1px solid var(--border)', 
                        borderRadius: '50%', width: '32px', height: '32px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--text)', transition: 'all 0.2s',
                        outline: 'none'
                    }} aria-label="Toggle Theme">
                        {theme === 'dark' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                    </button>
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
                        {[{name: 'Master Class', id: 'master-class'}, {name: 'Accelerator', id: 'accelerator'}, {name: 'Hiring Support', id: 'hiring-support'}, {name: 'Insights & Research', id: 'blog'}].map(l => (
                            <a key={l.name} href={`/#${l.id}`} onClick={() => setMenuOpen(false)}
                                style={{ padding: '12px 0', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', borderBottom: '1px solid var(--border)' }}
                            >{l.name}</a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
