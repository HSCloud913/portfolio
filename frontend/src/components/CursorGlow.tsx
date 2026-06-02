import {useEffect} from 'react'
import {motion, useMotionValue, useSpring} from 'framer-motion'

export default function CursorGlow() {
    const mouseX = useMotionValue(-400)
    const mouseY = useMotionValue(-400)
    const springX = useSpring(mouseX, {stiffness: 80, damping: 20})
    const springY = useSpring(mouseY, {stiffness: 80, damping: 20})

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            mouseX.set(e.clientX - 300)
            mouseY.set(e.clientY - 300)
        }
        window.addEventListener('mousemove', handler)
        return () => window.removeEventListener('mousemove', handler)
    }, [mouseX, mouseY])

    return (
        <motion.div
            className="fixed pointer-events-none z-0"
            style={{
                left: springX,
                top: springY,
                width: 600,
                height: 600,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
            }}
        />
    )
}
