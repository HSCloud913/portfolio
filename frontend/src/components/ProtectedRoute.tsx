import type {ReactNode} from "react";
import {Navigate} from 'react-router-dom'
import {getToken} from "../api"

export default function ProtectedRoute({children}: { children: ReactNode }) {
    return getToken() ? <>{children}</> : <Navigate to="/admin/login" replace/>
}
