import { createContext,useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(localStorage.getItem("user"))
    const [token,setToken] = useState(localStorage.getItem("token"))

    return(
        <AuthContext.Provider value={{user,setUser,token,setToken}}>
            {children}
        </AuthContext.Provider>
    )
} 