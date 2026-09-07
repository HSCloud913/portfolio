import {useActionState} from "react"
import {useNavigate} from "react-router-dom"
import {login, setToken} from "../../api"

export default function AdminLogin() {
    const navigate = useNavigate()

    const [error, submitAction, isPending] = useActionState(
        async (_: unknown, formData: FormData) => {
            try {
                const username = formData.get('username') as string
                const password = formData.get('password') as string
                const result = await login(username, password)
                if (result.token) {
                    setToken(result.token)
                    navigate('/admin/projects')
                    return null
                }
                return '아이디 또는 비밀번호가 올바르지 않습니다'
            } catch {
                return '아이디 또는 비밀번호가 올바르지 않습니다'
            }
        },
        null
    )

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)'}}
            />
            <form action={submitAction} className="relative flex flex-col gap-5 w-80">
                <div className="text-center mb-2">
                    <p className="text-xs tracking-[0.4em] text-purple-400 uppercase mb-2">Portfolio</p>
                    <h1 className="text-2xl font-bold text-white">Admin</h1>
                    <div
                        className="w-12 h-px mx-auto mt-3"
                        style={{background: 'linear-gradient(to right, transparent, #a855f7, transparent)'}}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <input
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
                        style={{
                            background: 'rgba(88,28,135,0.1)',
                            border: '1px solid rgba(168,85,247,0.2)',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all"
                        style={{
                            background: 'rgba(88,28,135,0.1)',
                            border: '1px solid rgba(168,85,247,0.2)',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.6)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)'}
                    />
                </div>

                {error && (
                    <p className="text-xs text-red-400 text-center -mt-1">{error}</p>
                )}

                <button
                    disabled={isPending}
                    className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-40"
                    style={{background: 'linear-gradient(to right, #7c3aed, #a855f7)'}}
                >
                    {isPending ? '로그인 중...' : '로그인'}
                </button>
            </form>
        </div>
    )
}
