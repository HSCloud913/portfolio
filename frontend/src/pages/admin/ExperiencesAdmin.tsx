import {useEffect, useState} from 'react'
import {createExperience, deleteExperience, type Experience, fetchExperiences, updateExperience} from '../../api'
import {btnDelete, btnEdit, btnPrimary, btnSecondary, cardStyle, formCardStyle, inputStyle} from './adminStyles'
import CustomSelect from './CustomSelect'

const empty = {type: 'EDUCATION', date: '', title: '', description: ''}

const TYPE_LABEL: Record<string, string> = {
    EDUCATION: '교육',
    COMPANY: '경력',
    LICENSE: '자격증',
}

export default function ExperiencesAdmin() {
    const [items, setItems] = useState<Experience[]>([])
    const [editing, setEditing] = useState<Experience | null>(null)
    const [form, setForm] = useState(empty)

    const load = () => fetchExperiences()
        .then(setItems)
        .catch(err => console.error('목록 불러오기 실패:', err))
    useEffect(() => {
        load()
    }, [])

    const handleSave = async () => {
        if (!form.title.trim() || !form.date.trim()) return
        try {
            if (editing) {
                await updateExperience(editing.id, form)
            } else {
                await createExperience(form)
            }
        } catch (err) {
            console.error('저장 실패:', err)
            return
        }
        setEditing(null)
        setForm(empty)
        load()
    }

    const handleEdit = (item: Experience) => {
        setEditing(item)
        setForm({type: item.type, date: item.date, title: item.title, description: item.description})
    }

    const handleCancel = () => {
        setEditing(null)
        setForm(empty)
    }

    return (
        <div className="flex flex-col gap-8 max-w-3xl">
            <div>
                <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-1">Manage</p>
                <h2 className="text-2xl font-bold text-white">Experiences</h2>
            </div>

            {/* 폼 */}
            <div style={formCardStyle} className="flex flex-col gap-3 p-6 rounded-2xl">
                <h3 className="text-xs tracking-widest text-purple-400 uppercase mb-1">
                    {editing ? '항목 수정' : '항목 추가'}
                </h3>
                <CustomSelect
                    value={form.type}
                    onChange={val => setForm(f => ({...f, type: val}))}
                    options={[
                        {value: 'EDUCATION', label: 'EDUCATION'},
                        {value: 'COMPANY', label: 'COMPANY'},
                        {value: 'LICENSE', label: 'LICENSE'},
                    ]}
                />
                <input placeholder="Date (예: 2024.06 또는 2022 ~ 2024)" value={form.date}
                       onChange={e => setForm(f => ({...f, date: e.target.value}))}
                       style={inputStyle}
                       className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"/>
                <input placeholder="Title" value={form.title}
                       onChange={e => setForm(f => ({...f, title: e.target.value}))}
                       style={inputStyle}
                       className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none"/>
                <input placeholder="Description" value={form.description}
                       onChange={e => setForm(f => ({...f, description: e.target.value}))}
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

            {/* 목록 - 타입별 그룹 */}
            {(['EDUCATION', 'COMPANY', 'LICENSE'] as const).map(type => {
                const group = items.filter(i => i.type === type)
                if (group.length === 0) return null
                return (
                    <div key={type} className="flex flex-col gap-2">
                        <p className="text-xs text-purple-400 font-medium tracking-widest uppercase px-1">{TYPE_LABEL[type]}</p>
                        {group.map(item => (
                            <div key={item.id} style={cardStyle}
                                 className="flex items-start justify-between p-4 rounded-xl gap-4">
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <p className="text-white font-medium text-sm">{item.title}</p>
                                    <p className="text-purple-400 text-xs">{item.date}</p>
                                    {item.description &&
                                        <p className="text-gray-500 text-xs truncate mt-0.5">{item.description}</p>}
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button onClick={() => handleEdit(item)} style={btnEdit}
                                            className="px-3 py-1 text-xs rounded-lg text-gray-300 transition-opacity hover:opacity-80">수정
                                    </button>
                                    <button onClick={() => deleteExperience(item.id).then(load).catch(err => console.error('삭제 실패:', err))} style={btnDelete}
                                            className="px-3 py-1 text-xs rounded-lg text-red-400 transition-opacity hover:opacity-80">삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            })}
            {items.length === 0 && (
                <p className="text-gray-600 text-sm text-center py-12">등록된 항목이 없습니다</p>
            )}
        </div>
    )
}
