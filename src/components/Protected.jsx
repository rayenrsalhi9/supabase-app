import {useAuth} from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Protected({children}) {
    const {session} = useAuth()

    if (session === undefined) return <div>Loading...</div>
    
    return session ? children : <Navigate to="/signin" />
}