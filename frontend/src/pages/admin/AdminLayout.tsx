import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import {removeToken} from '../../api'

const navItems = [
    {to: '/admin/projects', label: 'Projects'},
    {to: '/admin/experiences', label: 'Experiences'},
    {to: '/admin/skills', label: 'Skills'},
]

export default function AdminLayout() {
    const navigate = useNavigate()

    const logout = () => {
        removeToken()
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen flex">
            {/* 사이드바 */}
            <aside
                className="w-52 shrink-0 flex flex-col p-6"
                style={{borderRight: '1px solid rgba(168,85,247,0.15)'}}
            >
                <div className="mb-8">
                    <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-1">Portfolio</p>
                    <p className="text-white font-bold text-lg">Admin</p>
                    <div
                        className="w-8 h-px mt-2"
                        style={{background: 'linear-gradient(to right, #a855f7, transparent)'}}
                    />
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    {navItems.map(({to, label}) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({isActive}) =>
                                `px-3 py-2 rounded-lg text-sm transition-all ${
                                    isActive
                                        ? 'text-white font-medium'
                                        : 'text-gray-500 hover:text-gray-300'
                                }`
                            }
                            style={({isActive}) => isActive
                                ? {
                                    background: 'rgba(88,28,135,0.3)',
                                    borderLeft: '2px solid #a855f7',
                                    paddingLeft: '10px'
                                }
                                : {}
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <button
                    onClick={logout}
                    className="px-3 py-2 rounded-lg text-sm text-left transition-all"
                    style={{color: 'rgba(248,113,113,0.7)'}}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgb(248,113,113)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(248,113,113,0.7)'}
                >
                    로그아웃
                </button>
            </aside>

            {/* 메인 */}
            <main className="flex-1 p-8 overflow-auto">
                <Outlet/>
            </main>
        </div>
    )
}
