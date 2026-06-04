import {useEffect, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

const links = [
    {label: 'About', href: '#hero'},
    {label: 'Skills', href: '#skills'},
    {label: 'Projects', href: '#projects'},
    {label: 'Career', href: '#career'},
    {label: 'Contact', href: '#contact'},
]

export default function Nav() {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    useEffect(() => {
        const handler = () => { if (window.innerWidth >= 768) setIsOpen(false) }
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    return (
        <>
            <motion.nav
                initial={{y: -60, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.6, ease: 'easeOut', delay: 0.2}}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 transition-all duration-500"
                style={scrolled || isOpen ? {
                    background: 'rgba(5,5,8,0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderBottom: '1px solid rgba(168,85,247,0.12)',
                } : {}}
            >
                <a href="#hero" className="flex items-center gap-2.5 group">
                    <img
                        src="/nebula.png"
                        alt="Logo"
                        className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-sm font-semibold text-purple-300">최성운</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3 + i * 0.1}}
                            className="text-sm text-gray-500 hover:text-purple-300 transition-colors duration-200 tracking-wide"
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>

                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                    onClick={() => setIsOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-5 h-0.5 bg-purple-300 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-purple-300 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-purple-300 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.2}}
                        className="fixed top-16 left-0 right-0 z-40 md:hidden px-6 pb-6 pt-4 flex flex-col gap-4"
                        style={{
                            background: 'rgba(5,5,8,0.95)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            borderBottom: '1px solid rgba(168,85,247,0.12)',
                        }}
                    >
                        {links.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-sm text-gray-400 hover:text-purple-300 transition-colors duration-200 tracking-wide py-1"
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
