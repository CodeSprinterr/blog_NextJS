// pages/blogs/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '../../utils/api';

const BlogDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await api.get(`/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBlog(data);
            } catch (error) {
                console.error('Failed to fetch blog:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id]);

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (!blog) return <div className="text-center py-8">Blog post not found</div>;

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            {/* Blog Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{blog.author.name}</span>
                    <span>•</span>
                    <span>{formattedDate}</span>
                    <span>•</span>
                    <span className="text-blue-600">{blog.category.name}</span>
                </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                <Image
                    src={blog.blog_image_url}
                    alt={blog.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none">
                {blog.content}
            </div>

            {/* Back Button */}
            <div className="mt-8">
                <Link 
                    href="/blogs"
                    className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                    ← Back to Blogs
                </Link>
            </div>
        </article>
    );
};

export default BlogDetailPage;