import {useAuth} from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Root() {

    const {session} = useAuth()

    if (session === undefined) return <div>Loading...</div>

    return session ? <Navigate to='/dashboard'/> : <Navigate to='/signin'/>

}