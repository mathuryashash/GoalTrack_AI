import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Configure global axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
            setLoading(true);
            fetchUser();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/users/me');
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/login', { email, password });
            setToken(response.data.access_token);
            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (email, password) => {
        try {
            await axios.post('/api/register', { email, password });
            return true; // Registration successful
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
