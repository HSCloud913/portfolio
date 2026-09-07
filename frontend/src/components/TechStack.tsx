import {motion, type Variants} from 'framer-motion'
import {useEffect, useState} from 'react'
import {fetchSkills, type Skill} from "../api";

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 40},
    visible: {opacity: 1, y: 0, transition: {duration: 0.7, ease: 'easeOut'}},
}

// 카테고리 표시 순서. 백엔드에 정렬 필드가 없어 프론트에서 고정한다.
// 목록에 없는 카테고리는 뒤로 밀린다.
const GROUP_ORDER = [
    'Systems & Native',
    'Storage & Device',
    'Desktop UI',
    'Legacy & Migration',
    'Web & Backend',
    'Infra & Delivery',
]

const orderOf = (name: string) => {
    const i = GROUP_ORDER.indexOf(name)
    return i === -1 ? GROUP_ORDER.length : i
}

const MAX_LEVEL = 5

/** 숙련도를 점 5개로 표시한다. 막대보다 가볍고 이름 옆 좁은 폭에 들어간다. */
function LevelDots({level}: { level: number }) {
    const filled = Math.max(0, Math.min(MAX_LEVEL, level))

    return (
        <span
            className="flex shrink-0 items-center gap-1"
            role="img"
            aria-label={`숙련도 ${filled} / ${MAX_LEVEL}`}
            title={`숙련도 ${filled} / ${MAX_LEVEL}`}
        >
            {Array.from({length: MAX_LEVEL}, (_, i) => (
                <span
                    key={i}
                    className="h-1 w-1 rounded-full"
                    style={
                        i < filled
                            ? {background: '#c084fc', boxShadow: '0 0 4px rgba(192,132,252,0.7)'}
                            : {background: 'rgba(168,85,247,0.2)'}
                    }
                />
            ))}
        </span>
    )
}

export default function TechStack() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetchSkills()
            .then(setSkills)
            .catch(err => console.error('skills 불러오기 실패:', err))
            .finally(() => setLoaded(true))
    }, [])

    const categories = Array.from(new Set(skills.map(s => s.category)))
        .sort((a, b) => orderOf(a) - orderOf(b))
        .map(name => ({
            name,
            // level 을 함께 쓰므로 이름만 뽑지 않고 Skill 을 그대로 넘긴다.
            // 같은 카테고리 안에서는 숙련도 높은 것부터.
            items: skills
                .filter(s => s.category === name)
                .sort((a, b) => b.level - a.level)
        }))

    const allSkillNames = skills.map(s => s.name)
    const half = Math.ceil(allSkillNames.length / 2)
    const row1 = allSkillNames.slice(0, half)
    const row2 = allSkillNames.slice(half)

    return (
        <section id="skills" className="relative py-28 overflow-hidden">
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)'}}
            />

            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, margin: '-80px'}}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-3">Skills</p>
                    <h2 className="text-4xl font-bold text-white">Tech Stack</h2>
                    <div
                        className="w-16 h-px mx-auto mt-4"
                        style={{background: 'linear-gradient(to right, transparent, #a855f7, transparent)'}}
                    />
                </motion.div>

                {/* 카테고리 카드 */}
                {loaded && (
                    <motion.div
                        variants={{hidden: {}, visible: {transition: {staggerChildren: 0.1}}}}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, margin: '-60px'}}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
                    >
                        {categories.map(cat => (
                            <motion.div
                                key={cat.name}
                                variants={fadeUp}
                                className="rounded-2xl p-5"
                                style={{background: 'rgba(88,28,135,0.1)', border: '1px solid rgba(168,85,247,0.15)'}}
                            >
                                <p className="text-xs tracking-widest text-purple-400 uppercase mb-3">{cat.name}</p>
                                <div className="flex flex-col gap-2">
                                    {cat.items.map(item => (
                                        <div key={item.id} className="flex items-center justify-between gap-3">
                                            <span className="text-sm leading-snug text-gray-300">{item.name}</span>
                                            <LevelDots level={item.level}/>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* 마키 스크롤 */}
                <div className="flex flex-col gap-3 overflow-hidden">
                    <div className="flex overflow-hidden">
                        <div className="marquee flex gap-3 shrink-0">
                            {[...row1, ...row1].map((item, i) => (
                                <span
                                    key={i}
                                    className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs text-purple-300"
                                    style={{
                                        border: '1px solid rgba(168,85,247,0.25)',
                                        background: 'rgba(88,28,135,0.15)'
                                    }}
                                >
                  {item}
                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex overflow-hidden">
                        <div className="marquee-reverse flex gap-3 shrink-0">
                            {[...row2, ...row2].map((item, i) => (
                                <span
                                    key={i}
                                    className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs text-pink-400"
                                    style={{
                                        border: '1px solid rgba(236,72,153,0.2)',
                                        background: 'rgba(131,24,67,0.12)'
                                    }}
                                >
                  {item}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
