import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import {type Experience, fetchExperiences} from "../api";

const fadeUp = {
    hidden: {opacity: 0, y: 40},
    visible: {opacity: 1, y: 0, transition: {duration: 0.7, ease: 'easeOut' as const}},
}

function TimelineItem({date, title, description, index}: {
    date: string;
    title: string;
    description: string;
    index: number
}) {
    return (
        <motion.li
            variants={{
                hidden: {opacity: 0, x: -20},
                visible: {opacity: 1, x: 0, transition: {duration: 0.5, delay: index * 0.07}},
            }}
            className="relative pl-6 pb-7 last:pb-0"
        >
            {/* 세로선 */}
            <div
                className="absolute left-0 top-2 bottom-0 w-px last:hidden"
                style={{background: 'linear-gradient(to bottom, rgba(168,85,247,0.4), transparent)'}}
            />
            {/* 점 */}
            <div
                className="absolute left-[-3px] top-2 w-1.5 h-1.5 rounded-full"
                style={{background: '#a855f7', boxShadow: '0 0 6px rgba(168,85,247,0.8)'}}
            />
            <p className="text-xs text-purple-400 mb-0.5">{date}</p>
            <p className="text-sm text-white font-medium mb-0.5">{title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
        </motion.li>
    )
}

export default function Career() {
    const [experiences, setExperiences] = useState<Experience[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetchExperiences()
            .then(setExperiences)
            .catch(err => console.error('experiences 불러오기 실패:', err))
            .finally(() => setLoaded(true))
    }, [])

    const education = experiences.filter(e => e.type === 'EDUCATION')
    const company = experiences.filter(e => e.type === 'COMPANY')
    const license = experiences.filter(e => e.type === 'LICENSE')

    return (
        <section id="career" className="relative py-32 px-6 overflow-hidden">
            <div
                className="absolute left-1/4 top-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{background: 'radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 70%)'}}
            />

            <div className="max-w-5xl mx-auto">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-80px'}}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-3">History</p>
                    <h2 className="text-4xl font-bold text-white">Career</h2>
                    <div
                        className="w-16 h-px mx-auto mt-4"
                        style={{background: 'linear-gradient(to right, transparent, #a855f7, transparent)'}}
                    />
                </motion.div>

                {loaded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 교육 */}
                        <motion.div
                            variants={{hidden: {}, visible: {transition: {staggerChildren: 0.08}}}}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, margin: '-60px'}}
                            className="rounded-2xl p-6"
                            style={{background: 'rgba(88,28,135,0.08)', border: '1px solid rgba(168,85,247,0.15)'}}
                        >
                            <p className="text-xs tracking-[0.3em] text-purple-400 uppercase mb-6">Education</p>
                            <ul>
                                {education.map((item, i) => (
                                    <TimelineItem key={i} {...item} index={i}/>
                                ))}
                            </ul>
                        </motion.div>

                        {/* 회사 */}
                        <motion.div
                            variants={{hidden: {}, visible: {transition: {staggerChildren: 0.08}}}}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, margin: '-60px'}}
                            className="rounded-2xl p-6"
                            style={{background: 'rgba(88,28,135,0.08)', border: '1px solid rgba(168,85,247,0.15)'}}
                        >
                            <p className="text-xs tracking-[0.3em] text-purple-400 uppercase mb-6">Company</p>
                            <ul>
                                {company.map((item, i) => (
                                    <TimelineItem key={i} {...item} index={i}/>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                )}

                {/* 자격증 */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-60px'}}
                    className="mt-6 rounded-2xl p-6"
                    style={{background: 'rgba(88,28,135,0.08)', border: '1px solid rgba(168,85,247,0.15)'}}
                >
                    <p className="text-xs tracking-[0.3em] text-purple-400 uppercase mb-5">License</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {license.map(l => (
                            <div key={l.title} className="flex flex-col gap-0.5">
                                <span className="text-sm text-white">{l.title}</span>
                                <span className="text-xs text-gray-500">{l.date} · 한국산업인력공단</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
