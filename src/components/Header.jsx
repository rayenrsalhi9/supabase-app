import { useAuth } from "../context/AuthContext"
import { VscSignOut } from "react-icons/vsc";

export default function Header() {

    const {session} = useAuth()

    return(
        <header className='dashboard-header'>
            <h1>Sales Dashboard</h1>
            <div className="user-section">
                {
                    session?.user?.email
                    ? (
                        <>
                            <p>{session.user.email}</p>
                            <button>
                                <VscSignOut />
                                Sign out
                            </button>
                        </>
                    )
                    : null
                }
            </div>
        </header>
    )
}