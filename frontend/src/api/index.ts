const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

export interface Project {
    id: number
    title: string
    problem: string
    role: string
    impact: string
    tags: string[]
}

export interface Experience {
    id: number
    type: string
    date: string
    title: string
    description: string
}

export interface Skill {
    id: number
    name: string
    category: string
    level: number
}

export class ApiError extends Error {
    status: number
    body: string

    constructor(status: number, body: string) {
        super(`API ${status === 0 ? 'NETWORK' : status} - ${body.slice(0, 200)}`)
        this.name = 'ApiError'
        this.status = status
        this.body = body
    }
}

// 모든 요청의 공통 진입점.
// 네트워크 실패 / 비정상 상태코드 / JSON이 아닌 응답을 전부 ApiError로 통일한다.
const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
    let res: Response
    try {
        res = await fetch(`${BASE_URL}${path}`, init)
    } catch (err) {
        // 응답 자체가 오지 않은 경우 (서버 다운, DNS 실패, CORS 차단)
        throw new ApiError(0, err instanceof Error ? err.message : String(err))
    }

    const body = await res.text()

    if (!res.ok) throw new ApiError(res.status, body)

    // 204 No Content 처럼 본문이 없는 응답
    if (!body) return undefined as T

    try {
        return JSON.parse(body) as T
    } catch {
        // 콜드스타트 중 프록시가 HTML 에러 페이지를 200으로 돌려주는 경우
        throw new ApiError(res.status, `JSON이 아닌 응답: ${body.slice(0, 120)}`)
    }
}

export const fetchProjects = (): Promise<Project[]> => request('/projects')
export const fetchExperiences = (): Promise<Experience[]> => request('/experiences')
export const fetchSkills = (): Promise<Skill[]> => request('/skills')

/* Admin */
export const getToken = () => localStorage.getItem('token')
export const setToken = (token: string) => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')

// 인증이 필요한 요청용 헤더
const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
})

export const login = (username: string, password: string): Promise<{ token: string }> =>
    request('/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    })

export const createProject = (data: Omit<Project, 'id'>): Promise<Project> =>
    request('/projects', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    })

export const updateProject = (id: number, data: Omit<Project, 'id'>): Promise<Project> =>
    request(`/projects/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    })

export const deleteProject = (id: number): Promise<void> =>
    request(`/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })

export const createExperience = (data: Omit<Experience, 'id'>): Promise<Experience> =>
    request('/experiences', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    })

export const updateExperience = (id: number, data: Omit<Experience, 'id'>): Promise<Experience> =>
    request(`/experiences/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    })

export const deleteExperience = (id: number): Promise<void> =>
    request(`/experiences/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })

export const createSkill = (data: Omit<Skill, 'id'>): Promise<Skill> =>
    request('/skills', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    })

export const updateSkill = (id: number, data: Omit<Skill, 'id'>): Promise<Skill> =>
    request(`/skills/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    })

export const deleteSkill = (id: number): Promise<void> =>
    request(`/skills/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    })
