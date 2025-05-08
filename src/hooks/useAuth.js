import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/api';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const publicPaths = ['/login', '/register'];

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const { data } = await axios.get('/me');
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    if (!publicPaths.includes(router.pathname)) {
                        router.push('/login');
                    }
                }
            } else {
                if (!publicPaths.includes(router.pathname)) {
                    router.push('/login');
                }
            }

            setLoading(false); // ✅ done loading after auth check
        };

        checkAuth();
    }, [router.pathname]);

    const login = async (token) => {
        try {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const { data } = await axios.get('/me');
            setUser(data);
            router.push('/blogs');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed! Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        router.push('/login');
    };

    return { user, login, logout, loading };
};

