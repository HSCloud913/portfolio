import {useEffect, useState} from 'react'
import {createProject, deleteProject, fetchProjects, type Project, updateProject} from '../../api'
import {btnDelete, btnEdit, btnPrimary, btnSecondary, cardStyle, formCardStyle, inputStyle} from './adminStyles'

const empty = {title: '', problem: '', role: '', impact: '', tags: [] as string[]}

export default function ProjectsAdmin() {
    const [items, setItems] = useState<Project[]>([])
    const [editing, setEditing] = useState<Project | null>(null)
    const [form, setForm] = useState(empty)

    const load = () => fetchProjects().then(setItems)
    useEffect(() => {
        load()
    }, [])

    const handleSave = async () => {
        if (!form.title.trim()) return
        if (editing) {
            await updateProject(editing.id, form)
        } else {
            await createProject(form)
        }
        setEditing(null)
        setForm(empty)
        load()
    }

    const handleEdit = (item: Project) => {
        setEditing(item)
        setForm({title: item.title, problem: item.problem, role: item.role, impact: item.impact, tags: item.tags})
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
                       style={inputStyle}
                       className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"/>
                <input placeholder="Problem" value={form.problem}
                       onChange={e => setForm(f => ({...f, problem: e.target.value}))}
                       style={inputStyle}
                       className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"/>
                <input placeholder="Role" value={form.role}
                       onChange={e => setForm(f => ({...f, role: e.target.value}))}
                       style={inputStyle}
                       className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"/>
                <input placeholder="Impact" value={form.impact}
                       onChange={e => setForm(f => ({...f, impact: e.target.value}))}
                       style={inputStyle}
                       className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"/>
                <input placeholder="Tags (쉼표로 구분: React, TypeScript)" value={form.tags.join(', ')}
                       onChange={e => setForm(f => ({
                           ...f,
                           tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                       }))}
                       style={inputStyle}
                       className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"/>
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
                            <p className="text-white font-medium text-sm">{item.title}</p>
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
                            <button onClick={() => deleteProject(item.id).then(load)} style={btnDelete}
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
