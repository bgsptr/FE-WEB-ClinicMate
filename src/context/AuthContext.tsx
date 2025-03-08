import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
// import jwtDecode from 'jwt-decode';
import axios from "axios";
import Cookies from "js-cookie";
import { variables } from "../constants/variable";
import { getEcryptedLocalStorage, setEcryptedLocalStorage } from "../utils/local-storage-crypto";
import { Props } from "../components/types";

type AuthContextType = {
    role: string;
    logout: () => void;
    setRole: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const [role, setRole] = useState(getEcryptedLocalStorage("role")!);
    
    useEffect(() => {
        console.log("role provider")
        const getRoles = async () => {
            try {
                const res = await axios.get(`${variables.BASE_URL}/users/role`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
                console.log(res.data);
                setRole(res.data?.role);
                setEcryptedLocalStorage("role", res.data?.role)
                // return roles;
            } catch(err) {
                console.log(err)
            }
        }

        getRoles();

        return () => localStorage.removeItem("role");
    }, [])

    const logout = () => {
        Cookies.remove('token');
        // setRole(null);
    }

    return (
        <AuthContext.Provider value={{ role, logout, setRole }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);