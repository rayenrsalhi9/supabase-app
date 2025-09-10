import {useAuth} from '../context/AuthContext'
import Signin from '../routes/Signin'
import Dashboard from '../routes/Dashboard'

export default function Root() {

    const {session} = useAuth()

    if (session === undefined) return <div>Loading...</div>

    return session ? <Dashboard /> : <Signin />
}