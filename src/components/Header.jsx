import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { VscSignOut } from "react-icons/vsc";

export default function Header() {

    const {session, signUserOut} = useAuth()    
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        const {success, error: signOutError} = await signUserOut()
        if (signOutError) return setError(signOutError)
        if (success) navigate('/')
    }


    return(
        <header className='dashboard-header'>
            <h1>Sales Dashboard</h1>
            <div className="user-section">
                {
                    session?.user?.email
                    ? (
                        <>
                            <p>{session.user.email}</p>
                            <button onClick={handleSignOut}>
                                <VscSignOut />
                                Sign out
                            </button>
                            {
                                error
                                ? <p className="dashboard-header-error-msg"> {error}</p>
                                : null
                            }
                        </>
                    )
                    : null
                }
            </div>
        </header>
    )
}