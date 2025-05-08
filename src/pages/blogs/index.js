import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import BlogCard from '../../components/BlogCard';
import SearchBar from '../../components/SearchBar';
import api from '../../utils/api';
import Image from 'next/image';

export default function BlogList() {
    const { user, logout } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const { data } = await api.get('/blogs', {
                    params: { search: searchTerm },
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBlogs(data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            }
        };

        if (localStorage.getItem('token')) fetchBlogs();
    }, [searchTerm]);

    return (
        <div className="w-full">
            {/* Main Featured Post */}
            <section className="mb-12 relative">
                {/* Logout Button */}
                {user && (
                    <div className="absolute top-0 right-0 z-10 p-4">
                        <div className="bg-gradient-to-l from-black/70 to-transparent p-2 rounded">
                            <button
                                onClick={logout}
                                className="text-white cursor-pointer px-2 py-2 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}

                {/* Image Container */}
                <div className="relative h-[70vh] w-full mb-3">
                    <Image 
                        src="/images/main.jpg"
                        alt="Richtrd Norton photorealistic rendering"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-start justify-center flex-col text-white p-12">
                        <h1 className="text-4xl font-bold mb-4 max-w-[45vw]">
                            Richtrd Norton photorealistic rendering as real photos
                        </h1>
                        <p className="max-w-[40vw] text-sm">
                            1 Jan 2023 ─── Progressively incentivize cooperative systems to grow seamlessly sound topotecrafts. 
                            The novelty modernizes seamless use.
                        </p>
                    </div>
                </div>
            </section>
            
            {/* Blogs List */}
            <section className='px-8'>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Blogs ───</h2>
                    <div className="w-full max-w-sm">
                        <SearchBar onSearch={setSearchTerm} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </section>
        </div>
    );
}
