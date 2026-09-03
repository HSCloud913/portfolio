import {useEffect, useState} from 'react'
import {createSkill, deleteSkill, fetchSkills, type Skill, updateSkill} from '../../api'
import {btnDelete, btnEdit, btnPrimary, btnSecondary, cardStyle, formCardStyle, inputStyle} from './adminStyles'
import CustomSelect from './CustomSelect'

const empty = {name: '', category: 'Frontend', level: 1}

const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Tools']

export default function SkillsAdmin() {
    const [items, setItems] = useState<Skill[]>([])
    const [editing, setEditing] = useState<Skill | null>(null)
    const [form, setForm] = useState(empty)

    const load = () => fetchSkills()
        .then(setItems)
        .catch(err => console.error('목록 불러오기 실패:', err))
    useEffect(() => {
        load()
    }, [])

    const handleSave = async () => {
        if (!form.name.trim()) return
        try {
            if (editing) {
                await updateSkill(editing.id, form)
            } else {
                await createSkill(form)
            }
        } catch (err) {
            console.error('저장 실패:', err)
            return
        }
        setEditing(null)
        setForm(empty)
        load()
    }

    const handleEdit = (item: Skill) => {
        setEditing(item)
        setForm({name: item.name, category: item.category, level: item.level})
    }

    const handleCancel = () => {
        setEditing(null)
        setForm(empty)
    }

    return (
        <div className="flex flex-col gap-8 max-w-3xl">
            <div>
                <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-1">Manage</p>
                <h2 className="text-2xl font-bold text-white">Skills</h2>
            </div>

            {/* 폼 */}
            <div style={formCardStyle} className="flex flex-col gap-3 p-6 rounded-2xl">
                <h3 className="text-xs tracking-widest text-purple-400 uppercase mb-1">
                    {editing ? '스킬 수정' : '스킬 추가'}
                </h3>
                <input placeholder="Name (예: React, Docker)"
                       value={form.name}
                       onChange={e => setForm(f => ({...f, name: e.target.value}))}
                       style={inputStyle}
                       className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"/>
                <CustomSelect
                    value={form.category}
                    onChange={val => setForm(f => ({...f, category: val}))}
                    options={CATEGORIES.map(c => ({value: c, label: c}))}
                />
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">Level</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setForm(f => ({...f, level: Math.max(1, f.level - 1)}))}
                            style={btnSecondary}
                            className="w-8 h-8 rounded-lg text-gray-300 text-sm flex items-center justify-center transition-opacity hover:opacity-80"
                        >−
                        </button>
                        <span className="text-white text-sm w-6 text-center">{form.level}</span>
                        <button
                            onClick={() => setForm(f => ({...f, level: Math.min(5, f.level + 1)}))}
                            style={btnSecondary}
                            className="w-8 h-8 rounded-lg text-gray-300 text-sm flex items-center justify-center transition-opacity hover:opacity-80"
                        >+
                        </button>
                    </div>
                    <span className="text-gray-600 text-xs">/ 5</span>
                </div>
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

            {/* 목록 - 카테고리별 그룹 */}
            {CATEGORIES.map(category => {
                const group = items.filter(i => i.category === category)
                if (group.length === 0) return null
                return (
                    <div key={category} className="flex flex-col gap-2">
                        <p className="text-xs text-purple-400 font-medium tracking-widest uppercase px-1">{category}</p>
                        {group.map(item => (
                            <div key={item.id} style={cardStyle}
                                 className="flex items-center justify-between p-4 rounded-xl gap-4">
                                <div className="flex items-center gap-3">
                                    <p className="text-white text-sm">{item.name}</p>
                                    <div className="flex gap-0.5">
                                        {Array.from({length: 5}).map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{background: i < item.level ? '#a855f7' : 'rgba(168,85,247,0.2)'}}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={() => handleEdit(item)} style={btnEdit}
                                            className="px-3 py-1 text-xs rounded-lg text-gray-300 transition-opacity hover:opacity-80">수정
                                    </button>
                                    <button onClick={() => deleteSkill(item.id).then(load).catch(err => console.error('삭제 실패:', err))} style={btnDelete}
                                            className="px-3 py-1 text-xs rounded-lg text-red-400 transition-opacity hover:opacity-80">삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            })}
            {items.length === 0 && (
                <p className="text-gray-600 text-sm text-center py-12">등록된 스킬이 없습니다</p>
            )}
        </div>
    )
}
