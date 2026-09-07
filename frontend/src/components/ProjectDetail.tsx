import {motion} from 'framer-motion'
import {useEffect, useRef} from 'react'
import type {Project} from '../api'

const panelStyle = {
    background: 'linear-gradient(180deg, rgba(30,10,50,0.98) 0%, rgba(18,6,32,0.98) 100%)',
    border: '1px solid rgba(168,85,247,0.28)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
}

function Block({label, text, accent}: { label: string; text: string; accent: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium tracking-widest uppercase" style={{color: accent}}>{label}</p>
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{text}</p>
        </div>
    )
}

export default function ProjectDetail({project, onClose}: { project: Project; onClose: () => void }) {
    const closeRef = useRef<HTMLButtonElement>(null)

    // Esc 로 닫고, 열려 있는 동안 뒤쪽 페이지가 스크롤되지 않게 막는다.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKey)

        // 레이아웃이 밀리지 않는 것은 index.css 의 scrollbar-gutter: stable 이 맡는다.
        // 여기서 padding 으로 폭을 보정하면 gutter 와 겹쳐 오히려 반대로 밀린다.
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        closeRef.current?.focus()

        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = previousOverflow
        }
    }, [onClose])

    const meta = [project.groupName, project.period, project.company].filter(Boolean).join(' · ')

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={onClose}
            className="fixed inset-0 z-50 overflow-y-auto p-4"
            style={{background: 'rgba(5,0,12,0.75)', backdropFilter: 'blur(6px)'}}
        >
            {/*
              중앙 정렬 + 넘칠 때 스크롤. flex 컨테이너에 바로 items-center 를 주면
              내용이 화면보다 길 때 위쪽이 잘려 스크롤로 닿지 못한다.
              스크롤은 바깥(overflow-y-auto)이 맡고, min-h-full 래퍼가 정렬을 맡는다.
            */}
            <div className="flex min-h-full items-center justify-center py-4">
                <motion.div
                    initial={{opacity: 0, y: 24, scale: 0.98}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: 16, scale: 0.98}}
                    transition={{duration: 0.25, ease: 'easeOut'}}
                    onClick={e => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="project-detail-title"
                    className="relative w-full max-w-2xl rounded-2xl p-7 md:p-9"
                    style={panelStyle}
                >
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="닫기"
                        className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-white"
                        style={{border: '1px solid rgba(168,85,247,0.25)'}}
                    >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2">
                            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/>
                        </svg>
                    </button>

                    {meta && <p className="mb-2 pr-10 text-xs tracking-widest text-purple-400">{meta}</p>}

                    <h3 id="project-detail-title" className="mb-6 pr-10 text-xl font-bold leading-snug text-white">
                        {project.title}
                    </h3>

                    <div className="flex flex-col gap-5">
                        <Block label="Problem" text={project.problem} accent="#c084fc"/>
                        <Block label="Role" text={project.role} accent="#c084fc"/>
                        <Block label="Impact" text={project.impact} accent="#f472b6"/>
                    </div>

                    {project.tags.length > 0 && (
                        <div className="mt-7 flex flex-wrap gap-1.5">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="rounded px-2 py-0.5 text-xs text-purple-300"
                                    style={{background: 'rgba(88,28,135,0.45)'}}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-purple-300 transition-colors hover:text-white"
                            style={{border: '1px solid rgba(168,85,247,0.35)', background: 'rgba(88,28,135,0.2)'}}
                        >
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                                <path
                                    d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                            </svg>
                            코드 보기
                        </a>
                    )}
                </motion.div>
            </div>
        </motion.div>
    )
}
