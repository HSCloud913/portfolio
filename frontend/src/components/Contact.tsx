import {motion, type Variants} from 'framer-motion'

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 40},
    visible: {opacity: 1, y: 0, transition: {duration: 0.7, ease: 'easeOut'}},
}

const links = [
    {
        label: 'GitHub',
        value: 'HSCloud913',
        href: 'https://github.com/HSCloud913',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path
                    d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
        ),
    },
    {
        label: 'Instagram',
        value: 'c__nebulae',
        href: 'https://www.instagram.com/c__nebulae',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
        ),
    },
]

export default function Contact() {
    return (
        <section id="contact" className="relative py-32 px-6 overflow-hidden">
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
                style={{background: 'radial-gradient(ellipse, rgba(236,72,153,0.08) 0%, transparent 70%)'}}
            />

            <motion.div
                variants={{visible: {transition: {staggerChildren: 0.15}}}}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: '-80px'}}
                className="max-w-2xl mx-auto text-center"
            >
                <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-3">
                    Contact
                </motion.p>

                <motion.h2
                    variants={fadeUp}
                    className="font-bold text-white mb-4"
                    style={{fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1}}
                >
                    함께 만들어요
                </motion.h2>

                <motion.div
                    variants={fadeUp}
                    className="w-16 h-px mx-auto mb-8"
                    style={{background: 'linear-gradient(to right, transparent, #a855f7, transparent)'}}
                />

                <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-10 text-sm">
                    좋은 코드와 좋은 협업으로 함께 제품을 만들고 싶으신가요?<br/>
                    언제든지 연락 주세요.
                </motion.p>

                <motion.a
                    variants={fadeUp}
                    href="mailto:hscloud913@naver.com"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.97}}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium text-sm mb-10"
                    style={{
                        background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                        boxShadow: '0 0 40px rgba(124,58,237,0.35)',
                    }}
                >
                    hscloud913@naver.com
                </motion.a>

                {/* SNS 링크 */}
                <motion.div variants={fadeUp} className="flex justify-center gap-4 mb-16">
                    {links.map(link => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{scale: 1.1, y: -2}}
                            whileTap={{scale: 0.95}}
                            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm text-gray-300 hover:text-white transition-colors duration-200"
                            style={{border: '1px solid rgba(168,85,247,0.25)', background: 'rgba(88,28,135,0.15)'}}
                        >
                            {link.icon}
                            <span>{link.value}</span>
                        </motion.a>
                    ))}
                </motion.div>

                <motion.p variants={fadeUp} className="text-gray-700 text-xs tracking-widest">
                    최성운 · 崔星雲 · 2026
                </motion.p>
            </motion.div>
        </section>
    )
}
