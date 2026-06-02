import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin.tsx";
import ExperiencesAdmin from "./pages/admin/ExperiencesAdmin.tsx";
import SkillsAdmin from "./pages/admin/SkillsAdmin.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Portfolio/>}/>
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/admin" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
                    <Route path="projects" element={<ProjectsAdmin/>}/>
                    <Route path="experiences" element={<ExperiencesAdmin/>}/>
                    <Route path="skills" element={<SkillsAdmin/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
