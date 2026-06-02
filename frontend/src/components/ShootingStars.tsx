import {useEffect, useState} from 'react'

interface Star {
    tailLength: number
    top: number
    left: number
    duration: number
    delay: number
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

export default function ShootingStars({count = 20}: { count?: number }) {
    const [stars, setStars] = useState<Star[]>([])

    useEffect(() => {
        setStars(
            Array.from({length: count}).map(() => ({
                tailLength: rand(80, 160),
                top: rand(0, 80),
                left: rand(10, 100),
                duration: rand(6, 14),
                delay: rand(0, 12),
            }))
        )
    }, [count])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        top: `${star.top}vh`,
                        left: `${star.left}vw`,
                        width: `${star.tailLength}px`,
                        height: '1.5px',
                        borderRadius: '2px',
                        background: 'linear-gradient(to left, transparent, rgba(168,85,247,0.6), rgba(255,255,255,0.9))',
                        animation: `shooting-star ${star.duration}s ${star.delay}s linear infinite`,
                        opacity: 0,
                    }}
                />
            ))}
        </div>
    )
}
