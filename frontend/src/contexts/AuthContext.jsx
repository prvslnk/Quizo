import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await API.get('/auth/profile');
            setUser(res.data);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const login = async (data) => {
        const res = await API.post('/auth/login', data);
        localStorage.setItem('token', res.data.token);
        await fetchProfile();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
