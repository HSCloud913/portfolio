import {motion, type Variants} from 'framer-motion'
import {useEffect, useState} from 'react'
import {fetchProjects, type Project} from "../api";

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 40},
    visible: {opacity: 1, y: 0, transition: {duration: 0.7, ease: 'easeOut'}},
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetchProjects()
            .then(setProjects)
            .catch(err => console.error('projects 불러오기 실패:', err))
            .finally(() => setLoaded(true))
    }, [])

    return (
        <section id="projects" className="relative py-32 px-6 overflow-hidden">
            <div
                className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)'}}
            />

            <div className="max-w-5xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-80px'}}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-3">Work</p>
                    <h2 className="text-4xl font-bold text-white">Projects</h2>
                    <div
                        className="w-16 h-px mx-auto mt-4"
                        style={{background: 'linear-gradient(to right, transparent, #a855f7, transparent)'}}
                    />
                </motion.div>

                {loaded && (
                    <motion.div
                        variants={{hidden: {}, visible: {transition: {staggerChildren: 0.12}}}}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, margin: '-60px'}}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {projects.map(p => (
                            <motion.div
                                key={p.title}
                                variants={fadeUp}
                                className="rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1"
                                style={{background: 'rgba(88,28,135,0.1)', border: '1px solid rgba(168,85,247,0.18)'}}
                            >
                                <div
                                    className="w-8 h-px mb-4 transition-all duration-500 group-hover:w-16"
                                    style={{background: 'linear-gradient(to right, #a855f7, #ec4899)'}}
                                />
                                <h3 className="text-white font-semibold text-sm mb-4 leading-snug">{p.title}</h3>

                                <div className="flex flex-col gap-2 mb-4 text-xs">
                                    <div className="flex gap-2">
                                        <span className="text-purple-400 font-medium shrink-0 w-12">Problem</span>
                                        <span className="text-gray-400 leading-relaxed">{p.problem}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-purple-400 font-medium shrink-0 w-12">Role</span>
                                        <span className="text-gray-400 leading-relaxed">{p.role}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-pink-400 font-medium shrink-0 w-12">Impact</span>
                                        <span className="text-gray-300 leading-relaxed">{p.impact}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {p.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2 py-0.5 rounded text-purple-400"
                                            style={{background: 'rgba(88,28,135,0.4)'}}
                                        >
                        {tag}
                      </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    )
}
