import { useState, useEffect, useReducer, useRef } from 'react'

const FULL_TITLE = [
    { token: 'FACTORY', id: 43444, acronym: 'F' },
    { token: 'FOR', id: 1533, acronym: null },
    { token: 'ADVANCED', id: 17006, acronym: 'A' },
    { token: 'SKILLS', id: 16135, acronym: 'S' },
    { token: 'AND', id: 703, acronym: null },
    { token: 'TALENT', id: 3377, acronym: 'T' },
    { token: 'in', id: 304, acronym: null, style: 'italic' },
    { token: 'ARTIFICIAL', id: 7247, acronym: 'A', color: '#C0C0C0' },
    { token: 'INTELLIGENCE', id: 10425, acronym: 'I', color: '#D4AF37' },
]

const initialState = {
    renderData: [],
    isComplete: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_WORD':
            const newRenderData = [...state.renderData]
            newRenderData[action.index] = action.text
            return { ...state, renderData: newRenderData }
        case 'SET_COMPLETE':
            return { ...state, isComplete: true }
        case 'RESET':
            return initialState
        default:
            return state
    }
}

export default function FASTReveal() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [cursorVisible, setCursorVisible] = useState(true)

    useEffect(() => {
        let currentIndex = 0
        let isAborted = false
        const glitchChars = '0123456789!@#$%'

        const stream = async () => {
            if (isAborted || currentIndex >= FULL_TITLE.length) {
                if (!isAborted && currentIndex >= FULL_TITLE.length) dispatch({ type: 'SET_COMPLETE' })
                return
            }

            const targetWord = FULL_TITLE[currentIndex].token
            let step = 0
            
            const animateWord = () => {
                return new Promise((resolve) => {
                    const interval = setInterval(() => {
                        if (isAborted) {
                            clearInterval(interval)
                            resolve()
                            return
                        }

                        // Predictive flicker logic
                        let currentText = ''
                        const rand = Math.random()
                        
                        if (step < targetWord.length * 0.5) {
                            if (rand > 0.7) {
                                currentText = `[${FULL_TITLE[currentIndex].id}]`
                            } else {
                                currentText = targetWord.split('').map((_, idx) => 
                                    idx < Math.floor(step) ? targetWord[idx] : glitchChars[Math.floor(Math.random() * glitchChars.length)]
                                ).join('')
                            }
                        } else {
                            currentText = targetWord.split('').map((char, idx) => 
                                idx < Math.floor(step) ? char : glitchChars[Math.floor(Math.random() * glitchChars.length)]
                            ).join('')
                        }

                        dispatch({ type: 'UPDATE_WORD', index: currentIndex, text: currentText })

                        step += 0.35
                        if (step >= targetWord.length + 1) {
                            clearInterval(interval)
                            dispatch({ type: 'UPDATE_WORD', index: currentIndex, text: targetWord })
                            resolve()
                        }
                    }, 30)
                })
            }

            await animateWord()
            if (isAborted) return
            
            currentIndex++
            await new Promise(r => setTimeout(r, 60))
            if (!isAborted) stream()
        }

        stream()
        const blink = setInterval(() => setCursorVisible(v => !v), 530)

        return () => {
            isAborted = true
            clearInterval(blink)
            dispatch({ type: 'RESET' })
        }
    }, [])

    return (
        <div style={{ padding: '40px 0 20px', minHeight: '180px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.4rem 0.6rem', 
                maxWidth: '1200px',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'baseline',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.1,
                textAlign: 'center',
                padding: '0 20px'
            }}>
                {state.renderData.map((wordText, i) => {
                    const t = FULL_TITLE[i]
                    if (!t || !wordText) return null
                    
                    const isSettled = wordText === t.token
                    const isAcronymWord = t.acronym && i < 6
                    const isAI = i >= 7
                    return (
                        <div key={i} style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            margin: '4px 0'
                        }}>
                            <span
                                className="token-reveal"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'baseline',
                                    fontWeight: (isAcronymWord || isAI) ? 500 : 300,
                                    fontSize: 'clamp(0.85rem, 2vw, 1.6rem)',
                                    color: (t.color || 'var(--text)'),
                                    fontStyle: t.style === 'italic' ? 'italic' : 'normal',
                                    fontFamily: 'var(--font-display)',
                                    letterSpacing: '-0.02em',
                                    transition: 'color 0.4s ease',
                                    minHeight: '1.5rem'
                                }}
                            >
                                {isAcronymWord && isSettled ? (
                                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{wordText}</span>
                                ) : wordText}
                                
                                {isAI && t.token === 'INTELLIGENCE' && isSettled && (
                                    <span style={{
                                        display: 'inline-block',
                                        width: '0.4rem',
                                        height: '0.4rem',
                                        background: 'var(--gradient-gold)',
                                        borderRadius: '50%',
                                        marginLeft: '6px',
                                        marginBottom: '0.4rem'
                                    }} />
                                )}
                            </span>
                            
                            {!isSettled && (
                                <span style={{ 
                                    fontSize: '0.6rem', 
                                    fontFamily: 'monospace', 
                                    color: 'var(--primary)', 
                                    opacity: 0.7,
                                    marginTop: '-4px',
                                    letterSpacing: '0.1em'
                                }}>
                                    ID:{t.id}
                                </span>
                            )}
                        </div>
                    )
                })}
                
                {!state.isComplete && cursorVisible && (
                    <span style={{
                        width: '2px',
                        height: '1.8rem',
                        background: 'var(--primary)',
                        marginLeft: '4px',
                        alignSelf: 'flex-start',
                        marginTop: '0.1rem',
                        display: 'inline-block'
                    }} />
                )}
            </div>

            {state.isComplete && (
                <div style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    animation: 'taglineFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}>
                    <p style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        opacity: 0.8
                    }}>
                        Engineered for Depth. Optimized for Speed.
                    </p>
                </div>
            )}
            
            <style>{`
                @keyframes tokenPop { 
                    from { opacity: 0; transform: translateY(4px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
                @keyframes taglineFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 0.8; transform: translateY(0); }
                }
                .token-reveal { 
                    animation: tokenPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
                }
            `}</style>
        </div>
    )
}

export function LogoInline({ size = 'navbar' }) {
    const fontSize = size === 'navbar' ? '1.25rem' : '1.15rem'
    return (
        <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize, color: '#D4AF37', letterSpacing: '-0.01em' }}>FAST</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic', fontSize: `calc(${fontSize} * 0.9)`, color: '#C0C0C0' }}>in</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontStyle: 'italic', fontSize, color: '#F5F5F7', letterSpacing: '-0.01em' }}>AI.</span>
        </span>
    )
}
