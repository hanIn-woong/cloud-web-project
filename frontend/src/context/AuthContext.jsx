import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../features/auth/authApi';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const currentUser = await authApi.getMe();
            setUser(currentUser);
        } catch {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            setIsLoading(true);
            try {
                await refreshUser();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, [refreshUser]);

    const login = useCallback(async (credentials) => {
        const loggedInUser = await authApi.login(credentials);
        setUser(loggedInUser);
        return loggedInUser;
    }, []);

    const signup = useCallback(async (data) => {
        return authApi.signup(data);
    }, []);

    const logout = useCallback(async () => {
        await authApi.logout();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            signup,
            logout,
        }),
        [user, isLoading, login, signup, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
