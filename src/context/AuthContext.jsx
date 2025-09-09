import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [session, _] = useState(undefined)

    return (
        <AuthContext.Provider value={{ session, AuthContext }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}