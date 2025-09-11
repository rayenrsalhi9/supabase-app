import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { VscSignOut } from "react-icons/vsc";
import { FaRegEnvelope,FaRegUserCircle } from "react-icons/fa";

export default function Header() {

    const {session, signUserOut, users} = useAuth()    
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const currentUser = users.find(user => user.id === session?.user?.id)

    const handleSignOut = async () => {
        const {success, error: signOutError} = await signUserOut()
        if (signOutError) return setError(signOutError)
        if (success) navigate('/')
    }

    return(
        <header className='dashboard-header'>
            <h1>Sales Dashboard</h1>
            {
                session
                ? 
                <div className="user-section">
                    <div className="user-details">
                        <p className="user-email">
                            <FaRegEnvelope />
                            {session?.user?.email}
                        </p>
                        <p className="user-role">
                            <FaRegUserCircle />
                            {`${currentUser?.name} (${currentUser?.account_type})`}
                        </p>
                    </div>
                    <div className="signout-section">
                        <button className="signout-btn" onClick={handleSignOut}>
                            <VscSignOut />
                            Sign out
                        </button>
                        {
                            error
                            ? <p className="dashboard-header-error-msg" role="alert"> {error}</p>
                            : null
                        }
                    </div>
                </div>
                : null
            }
        </header>
    )
}