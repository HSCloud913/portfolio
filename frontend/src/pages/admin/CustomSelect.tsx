import {useEffect, useRef, useState} from 'react'
import {dropdownMenuStyle} from './adminStyles'

interface Props {
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string }[]
}

export default function CustomSelect({value, onChange, options}: Props) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const selected = options.find(o => o.value === value)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={ref} className="relative w-full">
            {/* 트리거 */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all text-left"
                style={{
                    background: 'rgba(109,40,217,0.15)',
                    border: `1px solid ${open ? 'rgba(168,85,247,0.6)' : 'rgba(168,85,247,0.35)'}`,
                }}
            >
                <span>{selected?.label ?? value}</span>
                <svg
                    width="12" height="12" viewBox="0 0 12 12"
                    style={{transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0}}
                >
                    <path fill="#a855f7" d="M6 8L1 3h10z"/>
                </svg>
            </button>

            {/* 드롭다운 패널 */}
            {open && (
                <div
                    className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden"
                    style={dropdownMenuStyle}
                >
                    {options.map(opt => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false)
                            }}
                            className="w-full px-4 py-2.5 text-sm text-left transition-all"
                            style={{
                                color: opt.value === value ? '#a855f7' : '#d1d5db',
                                background: opt.value === value ? 'rgba(168,85,247,0.15)' : 'transparent',
                            }}
                            onMouseEnter={e => {
                                if (opt.value !== value)
                                    e.currentTarget.style.background = 'rgba(168,85,247,0.08)'
                            }}
                            onMouseLeave={e => {
                                if (opt.value !== value)
                                    e.currentTarget.style.background = 'transparent'
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
