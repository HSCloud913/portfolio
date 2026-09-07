import {useEffect, useState} from 'react'
import {createProject, deleteProject, fetchAllProjects, type Project, updateProject} from '../../api'
import {btnDelete, btnEdit, btnPrimary, btnSecondary, cardStyle, formCardStyle, inputStyle} from './adminStyles'
import CustomSelect from './CustomSelect'

// 카드 그룹. Projects 섹션의 소제목으로 그대로 노출된다.
const GROUPS = [
    'Windows 시스템 · 네이티브',
    '스토리지 · 디스크 소프트웨어',
    '웹 · 백엔드',
    '인프라 · 개발 문화',
]

const empty = {
    title: '',
    problem: '',
    role: '',
    impact: '',
    period: '',
    company: '',
    groupName: GROUPS[0],
    sortOrder: '',
    repoUrl: '',
    published: true,
    tags: [] as string[],
}

const inputClass = 'w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none'

export default function ProjectsAdmin() {
    const [items, setItems] = useState<Project[]>([])
    const [editing, setEditing] = useState<Project | null>(null)
    const [form, setForm] = useState(empty)

    const load = () => fetchAllProjects()
        .then(setItems)
        .catch(err => console.error('목록 불러오기 실패:', err))
    useEffect(() => {
        load()
    }, [])

    // 폼은 전부 문자열로 다루고 전송 직전에만 서버 타입으로 바꾼다.
    // 빈 칸은 빈 문자열이 아니라 null 로 보내야 카드에 빈 줄이 생기지 않는다.
    const toPayload = () => ({
        title: form.title.trim(),
        problem: form.problem.trim(),
        role: form.role.trim(),
        impact: form.impact.trim(),
        period: form.period.trim() || null,
        company: form.company.trim() || null,
        groupName: form.groupName || null,
        sortOrder: form.sortOrder.trim() === '' ? null : Number(form.sortOrder),
        repoUrl: form.repoUrl.trim() || null,
        published: form.published,
        tags: form.tags,
    })

    const handleSave = async () => {
        if (!form.title.trim()) return
        try {
            if (editing) {
                await updateProject(editing.id, toPayload())
            } else {
                await createProject(toPayload())
            }
        } catch (err) {
            console.error('저장 실패:', err)
            return
        }
        setEditing(null)
        setForm(empty)
        load()
    }

    const handleEdit = (item: Project) => {
        setEditing(item)
        setForm({
            title: item.title,
            problem: item.problem,
            role: item.role,
            impact: item.impact,
            period: item.period ?? '',
            company: item.company ?? '',
            groupName: item.groupName ?? GROUPS[0],
            sortOrder: item.sortOrder === null ? '' : String(item.sortOrder),
            repoUrl: item.repoUrl ?? '',
            published: item.published,
            tags: item.tags,
        })
    }

    const handleCancel = () => {
        setEditing(null)
        setForm(empty)
    }

    return (
        <div className="flex flex-col gap-8 max-w-3xl">
            <div>
                <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-1">Manage</p>
                <h2 className="text-2xl font-bold text-white">Projects</h2>
            </div>

            {/* 폼 */}
            <div style={formCardStyle} className="flex flex-col gap-3 p-6 rounded-2xl">
                <h3 className="text-xs tracking-widest text-purple-400 uppercase mb-1">
                    {editing ? '프로젝트 수정' : '프로젝트 추가'}
                </h3>
                <input placeholder="Title" value={form.title}
                       onChange={e => setForm(f => ({...f, title: e.target.value}))}
                       style={inputStyle} className={inputClass}/>
                <input placeholder="Problem" value={form.problem}
                       onChange={e => setForm(f => ({...f, problem: e.target.value}))}
                       style={inputStyle} className={inputClass}/>
                <input placeholder="Role" value={form.role}
                       onChange={e => setForm(f => ({...f, role: e.target.value}))}
                       style={inputStyle} className={inputClass}/>
                <input placeholder="Impact" value={form.impact}
                       onChange={e => setForm(f => ({...f, impact: e.target.value}))}
                       style={inputStyle} className={inputClass}/>

                <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Period (2024.11 – 현재)" value={form.period}
                           onChange={e => setForm(f => ({...f, period: e.target.value}))}
                           style={inputStyle} className={inputClass}/>
                    <input placeholder="Company (개인 프로젝트는 비움)" value={form.company}
                           onChange={e => setForm(f => ({...f, company: e.target.value}))}
                           style={inputStyle} className={inputClass}/>
                </div>

                <CustomSelect
                    value={form.groupName}
                    onChange={val => setForm(f => ({...f, groupName: val}))}
                    options={GROUPS.map(g => ({value: g, label: g}))}
                />

                <div className="grid grid-cols-2 gap-3">
                    <input type="number" step={10} placeholder="Sort order (10 단위)" value={form.sortOrder}
                           onChange={e => setForm(f => ({...f, sortOrder: e.target.value}))}
                           style={inputStyle} className={inputClass}/>
                    <input placeholder="Repo URL (없으면 비움)" value={form.repoUrl}
                           onChange={e => setForm(f => ({...f, repoUrl: e.target.value}))}
                           style={inputStyle} className={inputClass}/>
                </div>

                <input placeholder="Tags (쉼표로 구분: React, TypeScript)" value={form.tags.join(', ')}
                       onChange={e => setForm(f => ({
                           ...f,
                           tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                       }))}
                       style={inputStyle} className={inputClass}/>

                <label className="flex items-center gap-2 text-sm text-gray-300 select-none cursor-pointer px-1">
                    <input type="checkbox" checked={form.published}
                           onChange={e => setForm(f => ({...f, published: e.target.checked}))}
                           className="accent-purple-500"/>
                    공개 (끄면 사이트에서 숨고 이 목록에만 남습니다)
                </label>

                <div className="flex gap-2 mt-1">
                    <button onClick={handleSave} style={btnPrimary}
                            className="px-5 py-2 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-80">저장
                    </button>
                    {editing && (
                        <button onClick={handleCancel} style={btnSecondary}
                                className="px-5 py-2 rounded-xl text-sm text-gray-300 transition-opacity hover:opacity-80">취소</button>
                    )}
                </div>
            </div>

            {/* 목록 */}
            <div className="flex flex-col gap-2">
                {items.map(item => (
                    <div key={item.id} style={cardStyle}
                         className="flex items-start justify-between p-4 rounded-xl gap-4">
                        <div className="flex flex-col gap-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-gray-600 tabular-nums">{item.sortOrder ?? '—'}</span>
                                <p className="text-white font-medium text-sm">{item.title}</p>
                                {!item.published && (
                                    <span className="text-xs px-2 py-0.5 rounded text-amber-400"
                                          style={{background: 'rgba(120,53,15,0.4)'}}>비공개</span>
                                )}
                            </div>
                            <p className="text-gray-500 text-xs">
                                {[item.groupName, item.period, item.company].filter(Boolean).join(' · ') || '—'}
                            </p>
                            <p className="text-gray-500 text-xs truncate">{item.problem}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-0.5 rounded text-purple-400"
                                          style={{background: 'rgba(88,28,135,0.4)'}}>{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={() => handleEdit(item)} style={btnEdit}
                                    className="px-3 py-1 text-xs rounded-lg text-gray-300 transition-opacity hover:opacity-80">수정
                            </button>
                            <button onClick={() => deleteProject(item.id).then(load).catch(err => console.error('삭제 실패:', err))} style={btnDelete}
                                    className="px-3 py-1 text-xs rounded-lg text-red-400 transition-opacity hover:opacity-80">삭제
                            </button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-gray-600 text-sm text-center py-12">등록된 프로젝트가 없습니다</p>
                )}
            </div>
        </div>
    )
}
