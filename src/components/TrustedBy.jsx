// Trusted-by strip: tool/brand logos as text marks
export default function TrustedBy() {
    const tools = [
        'OpenAI', 'Anthropic', 'LangChain', 'AWS', 'Hugging Face',
        'Pinecone', 'Weaviate', 'Azure AI', 'Google Vertex',
    ]
    return (
        <div style={{ borderBottom: '1px solid var(--border)', padding: '28px 0', background: 'var(--bg)' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span className="label" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>Stack covered</span>
                    <div style={{ width: 1, height: 16, background: 'var(--border)', flexShrink: 0 }} />
                    <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
                        {tools.map(t => (
                            <span key={t} style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.82rem',
                                fontWeight: 500,
                                color: 'var(--text-light)',
                                letterSpacing: '0.02em',
                                transition: 'color 0.15s',
                                cursor: 'default',
                            }}
                                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                                onMouseLeave={e => e.target.style.color = 'var(--text-light)'}
                            >{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
