import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../features/auth/authApi';
import { memberApi } from '../ApiService';

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
    const [wishlist, setWishlist] = useState([]); // Array of book IDs or Book objects
    const [isLoading, setIsLoading] = useState(true);

    const refreshWishlist = useCallback(async (userId) => {
        if (!userId) {
            setWishlist([]);
            return;
        }
        try {
            const wishes = await memberApi.getMyWishes(userId);
            setWishlist(wishes.map(book => book.id));
        } catch {
            setWishlist([]);
        }
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            const currentUser = await authApi.getMe();
            setUser(currentUser);
            if (currentUser) {
                await refreshWishlist(currentUser.id);
            }
        } catch {
            setUser(null);
            setWishlist([]);
        }
    }, [refreshWishlist]);

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
        if (loggedInUser) {
            await refreshWishlist(loggedInUser.id);
        }
        return loggedInUser;
    }, [refreshWishlist]);

    const signup = useCallback(async (data) => {
        return authApi.signup(data);
    }, []);

    const logout = useCallback(async () => {
        await authApi.logout();
        setUser(null);
        setWishlist([]);
    }, []);

    const isWished = useCallback((bookId) => {
        return wishlist.includes(bookId);
    }, [wishlist]);

    const toggleWishLocal = useCallback((bookId, state) => {
        setWishlist(prev => {
            if (state) {
                return prev.includes(bookId) ? prev : [...prev, bookId];
            } else {
                return prev.filter(id => id !== bookId);
            }
        });
    }, []);

    const value = useMemo(
        () => ({
            user,
            isLoading,
            isAuthenticated: !!user,
            wishlist,
            isWished,
            toggleWishLocal,
            refreshWishlist,
            login,
            signup,
            logout,
        }),
        [user, isLoading, wishlist, isWished, toggleWishLocal, refreshWishlist, login, signup, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
