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

export const fetchProjects = (): Promise<Project[]> => fetch(`${BASE_URL}/projects`).then(res => res.json())
export const fetchExperiences = (): Promise<Experience[]> => fetch(`${BASE_URL}/experiences`).then(res => res.json())
export const fetchSkills = (): Promise<Skill[]> => fetch(`${BASE_URL}/skills`).then(res => res.json())

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
    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
    }).then(res => {
        if (!res.ok) return '{}'
        return res.json()
    })

export const createProject = (data: Omit<Project, 'id'>): Promise<Project> =>
    fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    }).then(res => res.json())

export const updateProject = (id: number, data: Omit<Project, 'id'>): Promise<Project> =>
    fetch(`${BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
    }).then(res => res.json())

export const deleteProject = (id: number): Promise<void> =>
    fetch(`${BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    }).then(() => {
    })

export const createExperience = (data: Omit<Experience, 'id'>): Promise<Experience> =>
    fetch(`${BASE_URL}/experiences`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
    }).then(res => res.json())

export const updateExperience = (id: number, data: Omit<Experience, 'id'>): Promise<Experience> =>
    fetch(`${BASE_URL}/experiences/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
    }).then(res => res.json())

export const deleteExperience = (id: number): Promise<void> =>
    fetch(`${BASE_URL}/experiences/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    }).then(() => {
    })

export const createSkill = (data: Omit<Skill, 'id'>): Promise<Skill> =>
    fetch(`${BASE_URL}/skills`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
    }).then(res => res.json())

export const updateSkill = (id: number, data: Omit<Skill, 'id'>): Promise<Skill> =>
    fetch(`${BASE_URL}/skills/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
    }).then(res => res.json())

export const deleteSkill = (id: number): Promise<void> =>
    fetch(`${BASE_URL}/skills/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    }).then(() => {
    })
