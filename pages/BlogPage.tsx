import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { mockApi } from '../api/mockApi';
import { Loader } from 'lucide-react';
import BlogPostCard from '../components/BlogPostCard';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await mockApi.getAllPosts();
        setPosts(allPosts);
      } catch (err) {
        setError('Could not load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-slate-800 mb-2">Our Blog</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Insights, guides, and news from the world of oversize load transportation.
        </p>
      </section>

      <section>
        {loading ? (
          <div className="flex justify-center items-center p-16">
            <Loader className="animate-spin text-primary" size={48} />
          </div>
        ) : error ? (
          <p className="p-8 text-center text-red-600 bg-red-50 rounded-lg">{error}</p>
        ) : posts.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No blog posts have been published yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogPage;