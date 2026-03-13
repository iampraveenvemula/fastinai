import { LogoInline } from './AnimatedLogo'

export default function Footer() {
    return (
        <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '64px 0' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
                    <LogoInline size="footer" />
                </div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 300 }}>
                    © 2026 FastinAI. Factory for Advanced Skills & Talent. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
