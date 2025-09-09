import { createContext, useContext, useState, useEffect } from "react";
import { getInitialState, signUserIn, signUserOut, signUserUp } from "../utils";
import { supabase } from "../supabase";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined)

    useEffect(() => {
        getInitialState(setSession)
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ session, setSession, signUserIn, signUserOut, signUserUp }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}