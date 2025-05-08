import Link from 'next/link';
import Image from 'next/image';

const BlogCard = ({ blog }) => {
    // Format date to "1 Jan 2023"
    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Blog Image */}
            <div className="relative h-48 w-full">
                <Image
                    src={blog.blog_image_url}
                    alt={blog.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Blog Content */}
            <div className="p-4">
                {/* Author and Date */}
                <div className="mb-3">
                    <span className="text-sm text-gray-500">
                        {blog.author.name} • {formattedDate}
                    </span>
                </div>

                {/* Title and Excerpt */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 line-clamp-3 mb-4">{blog.content}</p>

                {/* Category */}
                <div className="text-sm text-gray-500 mb-4">
                    {blog.category.name}
                </div>

                {/* Read More Button */}
                <Link
                    href={`/blogs/${blog._id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Read More →
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;