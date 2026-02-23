import { useEffect, useState, useRef } from 'react'

/*
  FAST Acronym Reveal — vertical stack with typing animation.

  Phase 1: Letters F, A, S, T appear stacked vertically (staggered fade-in)
  Phase 2: Each line types out the full word with a blinking cursor:
           F → Factory
           A → Advanced
           S → Skills
           T → Talent
  Phase 3: "in AI" fades in below as the tagline
*/

const WORDS = [
    { letter: 'F', rest: 'actory' },
    { letter: 'A', rest: 'dvanced' },
    { letter: 'S', rest: 'kills' },
    { letter: 'T', rest: 'alent' },
]

const TAGLINE = 'in AI'

export default function FASTReveal() {
    // Phase 1: which letters are visible (0-4)
    const [lettersVisible, setLettersVisible] = useState(0)
    // Phase 2: which line is currently typing (-1 = not started, 0-3 = typing line N, 4 = done)
    const [typingLine, setTypingLine] = useState(-1)
    // How many chars of the "rest" are visible per line
    const [charCounts, setCharCounts] = useState([0, 0, 0, 0])
    // Phase 3: tagline visible
    const [taglineVisible, setTaglineVisible] = useState(false)
    // Cursor visible
    const [cursorVisible, setCursorVisible] = useState(true)

    const hasAnimated = useRef(false)

    useEffect(() => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const timers = []

        // Phase 1: Stagger letter appearances (F, A, S, T)
        for (let i = 0; i < 4; i++) {
            timers.push(setTimeout(() => setLettersVisible(i + 1), 150 + i * 140))
        }

        // Phase 2: Start typing after letters appear
        const typeStartDelay = 150 + 4 * 140 + 400 // after all letters + pause

        let cumulativeDelay = typeStartDelay

        for (let lineIdx = 0; lineIdx < 4; lineIdx++) {
            const word = WORDS[lineIdx]
            const lineDelay = cumulativeDelay

            // Set which line is being typed
            timers.push(setTimeout(() => setTypingLine(lineIdx), lineDelay))

            // Type each character of "rest"
            for (let charIdx = 0; charIdx < word.rest.length; charIdx++) {
                timers.push(setTimeout(() => {
                    setCharCounts(prev => {
                        const next = [...prev]
                        next[lineIdx] = charIdx + 1
                        return next
                    })
                }, lineDelay + (charIdx + 1) * 55))
            }

            cumulativeDelay = lineDelay + word.rest.length * 55 + 200 // pause between lines
        }

        // Phase 3: Show tagline after all typing
        timers.push(setTimeout(() => {
            setTypingLine(4) // done typing
            setTaglineVisible(true)
        }, cumulativeDelay + 100))

        // Hide cursor after everything
        timers.push(setTimeout(() => setCursorVisible(false), cumulativeDelay + 1200))

        return () => timers.forEach(clearTimeout)
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, userSelect: 'none' }}>
            {WORDS.map((w, i) => {
                const isLetterVisible = i < lettersVisible
                const isTyping = typingLine === i
                const isDoneTyping = charCounts[i] === w.rest.length
                const typedText = w.rest.slice(0, charCounts[i])

                return (
                    <div
                        key={w.letter}
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            lineHeight: 1.15,
                            minHeight: '1.2em',
                            position: 'relative',
                        }}
                    >
                        {/* The bold first letter */}
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 400,
                            fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                            color: 'var(--orange)',
                            letterSpacing: '-0.03em',
                            opacity: isLetterVisible ? 1 : 0,
                            transform: isLetterVisible ? 'translateY(0)' : 'translateY(8px)',
                            transition: 'opacity 0.25s ease, transform 0.3s ease',
                            display: 'inline-block',
                            minWidth: 'clamp(2rem, 4vw, 3.2rem)',
                        }}>
                            {w.letter}
                        </span>

                        {/* The typed-out rest of the word */}
                        <span style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
                            color: 'var(--text)',
                            letterSpacing: '-0.01em',
                            opacity: charCounts[i] > 0 ? 1 : 0,
                            transition: 'opacity 0.1s ease',
                            whiteSpace: 'nowrap',
                        }}>
                            {typedText}
                        </span>

                        {/* Blinking cursor on current line */}
                        {cursorVisible && (isTyping || (typingLine === -1 && i === lettersVisible - 1 && isLetterVisible)) && (
                            <span style={{
                                display: 'inline-block',
                                width: 2,
                                height: 'clamp(1.6rem, 3vw, 2.6rem)',
                                background: 'var(--orange)',
                                marginLeft: 3,
                                animation: 'cursorBlink 0.53s step-end infinite',
                                verticalAlign: 'middle',
                                alignSelf: 'center',
                            }} />
                        )}
                    </div>
                )
            })}

            {/* "in AI" tagline */}
            <div style={{
                marginTop: 16,
                opacity: taglineVisible ? 1 : 0,
                transform: taglineVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                display: 'flex',
                alignItems: 'baseline',
                gap: 6,
            }}>
                <span style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
                    color: 'var(--text-light)',
                    letterSpacing: '0.01em',
                }}>
                    in
                </span>
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                    color: 'var(--orange)',
                    letterSpacing: '-0.03em',
                }}>
                    AI
                </span>
            </div>

            <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    )
}

/*
  Simple inline logo for Navbar/Footer — no animation, just styled text.
  Hybrid: Option B weight (Fraunces 400) + Option A layout (no dot).
*/
export function LogoInline({ size = 'navbar' }) {
    const fontSize = size === 'navbar' ? '1.15rem' : '1.1rem'

    return (
        <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 400, fontSize,
                color: 'var(--text)', letterSpacing: '-0.02em',
            }}>FAST</span>
            <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 300, fontSize,
                color: 'var(--text-light)', letterSpacing: '-0.005em',
            }}>in</span>
            <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic', fontSize,
                color: 'var(--orange)', letterSpacing: '-0.02em',
            }}>AI</span>
        </span>
    )
}
