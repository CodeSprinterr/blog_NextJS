import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const AuthForm = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLogin = router.pathname === '/login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/login' : '/register';
            const payload = isLogin ? { email, password } : { name, email, password };
            const { data } = await api.post(endpoint, payload);

            login(data.token);
            router.push('/blogs');
        } catch (error) {
            alert(error.response?.data?.message || 'Error!');
        }
    };

    return (
        <div className="max-w-md mx-auto p-2">
            <h1 className="text-2xl font-bold mb-1">
                {isLogin ? 'Welcome Back 👋' : 'Sign Up'}
            </h1>
            <h4 className="text-sm mb-6 text-[#667085]">
                {isLogin
                    ? 'Shape Your Thoughts. Sign in to share and explore insightful blogs'
                    : 'Join the Conversation. Sign up to share and explore insightful blogs'}
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Full Name"
                            required
                        />
                    </>
                )}
                <>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Email"
                        required
                    />
                </>
                <>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Password"
                        required
                    />
                </>
                <button
                    type="submit"
                    className="w-full bg-[#6941C6] text-white py-2 cursor-pointer hover:[#6941C6] rounded-3xl "
                >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </button>

                {/* 🔁 Toggle Auth Page Button */}
                <button
                    type="button"
                    onClick={() => router.push(isLogin ? '/register' : '/login')}
                    className="w-full text-sm text-purple-600 hover:underline mt-2 cursor-pointer"
                >
                    {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
