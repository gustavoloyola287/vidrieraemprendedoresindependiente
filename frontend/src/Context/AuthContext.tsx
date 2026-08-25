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
    const [loading, setLoading] = useState<boolean>(true); // Controla el estado de verificación inicial

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
        setToken(storedToken);
        }
        setLoading(false); // Finaliza la carga tras revisar localStorage
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

    // Mientras se comprueba el token al recargar (F5), se muestra esta pantalla temporal
    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando sesión...</span>
            </div>
        </div>
        );
    }

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