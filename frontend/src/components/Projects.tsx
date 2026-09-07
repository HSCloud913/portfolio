import {AnimatePresence, motion, type Variants} from 'framer-motion'
import {useEffect, useMemo, useState} from 'react'
import {fetchProjects, type Project} from "../api";
import ProjectDetail from './ProjectDetail'

const fadeUp: Variants = {
    hidden: {opacity: 0, y: 40},
    visible: {opacity: 1, y: 0, transition: {duration: 0.7, ease: 'easeOut'}},
}

const MAX_TAGS = 4

function ProjectCard({project, onOpen}: { project: Project; onOpen: () => void }) {
    const meta = [project.period, project.company].filter(Boolean).join(' · ')
    const visibleTags = project.tags.slice(0, MAX_TAGS)
    const hiddenTagCount = project.tags.length - visibleTags.length

    return (
        // Career 섹션에서 #project-<sortOrder> 로 이 카드에 링크한다. 앵커에 DB id 가 아니라
        // sortOrder 를 쓰는 이유: 재시딩하면 id 는 바뀌지만 sortOrder 는 유지된다.
        // scroll-mt 는 상단 내비에 가리지 않도록 두는 여백.
        <motion.div
            id={`project-${project.sortOrder ?? project.id}`}
            variants={fadeUp}
            className="scroll-mt-24"
        >
            <button
                type="button"
                onClick={onOpen}
                className="group flex h-full w-full cursor-pointer flex-col rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1"
                style={{background: 'rgba(88,28,135,0.1)', border: '1px solid rgba(168,85,247,0.18)'}}
            >
                <div
                    className="mb-4 h-px w-8 transition-all duration-500 group-hover:w-16"
                    style={{background: 'linear-gradient(to right, #a855f7, #ec4899)'}}
                />

                {meta && <p className="mb-1.5 text-xs text-purple-400/80">{meta}</p>}

                <h3 className="mb-3 text-sm font-semibold leading-snug text-white">{project.title}</h3>

                <p className="mb-5 line-clamp-3 text-xs leading-relaxed text-gray-400">{project.problem}</p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                    {visibleTags.map(tag => (
                        <span
                            key={tag}
                            className="rounded px-2 py-0.5 text-xs text-purple-400"
                            style={{background: 'rgba(88,28,135,0.4)'}}
                        >
                            {tag}
                        </span>
                    ))}
                    {hiddenTagCount > 0 && (
                        <span className="px-1 py-0.5 text-xs text-gray-600">+{hiddenTagCount}</span>
                    )}
                </div>

                <span className="mt-4 text-xs text-purple-400/70 transition-colors group-hover:text-purple-300">
                    자세히 보기 →
                </span>
            </button>
        </motion.div>
    )
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loaded, setLoaded] = useState(false)
    const [selected, setSelected] = useState<Project | null>(null)

    useEffect(() => {
        fetchProjects()
            .then(setProjects)
            .catch(err => console.error('projects 불러오기 실패:', err))
            .finally(() => setLoaded(true))
    }, [])

    // groupName 으로 묶는다. Map 이 삽입 순서를 유지하므로 그룹 순서는
    // 각 그룹의 첫 카드가 가진 sortOrder 를 그대로 따른다.
    // groupName 이 비어 있는 카드는 소제목 없이 마지막 묶음으로 나온다.
    const groups = useMemo(() => {
        const byName = new Map<string, Project[]>()
        for (const project of projects) {
            const key = project.groupName ?? ''
            const bucket = byName.get(key)
            if (bucket) bucket.push(project)
            else byName.set(key, [project])
        }
        return Array.from(byName, ([name, items]) => ({name, items}))
    }, [projects])

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
                    <div className="flex flex-col gap-16">
                        {groups.map(group => (
                            <div key={group.name || '__ungrouped'}>
                                {group.name && (
                                    <motion.div
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{once: true, margin: '-60px'}}
                                        className="mb-6 flex items-center gap-4"
                                    >
                                        <h3 className="shrink-0 text-sm font-semibold tracking-wide text-purple-300">
                                            {group.name}
                                        </h3>
                                        <div
                                            className="h-px flex-1"
                                            style={{background: 'linear-gradient(to right, rgba(168,85,247,0.35), transparent)'}}
                                        />
                                        <span className="shrink-0 text-xs text-gray-600">{group.items.length}</span>
                                    </motion.div>
                                )}

                                <motion.div
                                    variants={{hidden: {}, visible: {transition: {staggerChildren: 0.08}}}}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{once: true, margin: '-60px'}}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                                >
                                    {group.items.map(project => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            onOpen={() => setSelected(project)}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selected && (
                    <ProjectDetail
                        key={selected.id}
                        project={selected}
                        onClose={() => setSelected(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}
