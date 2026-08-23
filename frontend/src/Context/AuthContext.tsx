import React, { useState, createContext, useEffect, useContext, type ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
    setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const isAuthenticated = token !== null;

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};