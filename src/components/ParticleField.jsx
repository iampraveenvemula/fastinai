import { useEffect, useRef } from 'react'

export default function ParticleField() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let W, H, particles = []
        const COUNT = window.innerWidth < 768 ? 60 : 120
        const CONNECT = 140

        function resize() {
            W = canvas.width = canvas.offsetWidth
            H = canvas.height = canvas.offsetHeight
        }

        function createParticle() {
            return {
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.5,
            }
        }

        function init() {
            resize()
            particles = Array.from({ length: COUNT }, createParticle)
        }

        function draw() {
            ctx.clearRect(0, 0, W, H)

            const mx = mouseRef.current.x
            const my = mouseRef.current.y

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                // gentle mouse repulsion
                const dx = p.x - mx, dy = p.y - my
                const d = Math.sqrt(dx * dx + dy * dy)
                if (d < 120) {
                    p.vx += (dx / d) * 0.018
                    p.vy += (dy / d) * 0.018
                }

                p.x += p.vx
                p.y += p.vy
                p.vx *= 0.99
                p.vy *= 0.99

                if (p.x < 0) p.x = W
                if (p.x > W) p.x = 0
                if (p.y < 0) p.y = H
                if (p.y > H) p.y = 0

                // draw node
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(248,180,0,0.75)'
                ctx.fill()

                // draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j]
                    const ex = p.x - q.x, ey = p.y - q.y
                    const ed = Math.sqrt(ex * ex + ey * ey)
                    if (ed < CONNECT) {
                        const alpha = (1 - ed / CONNECT) * 0.25
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(q.x, q.y)
                        ctx.strokeStyle = `rgba(248,180,0,${alpha})`
                        ctx.lineWidth = 0.6
                        ctx.stroke()
                    }
                }
            }

            rafRef.current = requestAnimationFrame(draw)
        }

        init()
        draw()

        const handleResize = () => { resize() }
        const handleMouse = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }

        window.addEventListener('resize', handleResize)
        canvas.addEventListener('mousemove', handleMouse)

        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', handleResize)
            canvas.removeEventListener('mousemove', handleMouse)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                opacity: 0.6,
                pointerEvents: 'auto',
            }}
        />
    )
}
