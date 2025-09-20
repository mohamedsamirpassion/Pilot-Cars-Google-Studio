import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { mockApi } from '../api/mockApi';
import { Loader, Tag, Folder, XCircle } from 'lucide-react';
import BlogPostCard from '../components/BlogPostCard';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await mockApi.getAllPosts({
            category: categoryFilter || undefined,
            tag: tagFilter || undefined
        });
        setPosts(allPosts);
      } catch (err) {
        setError('Could not load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [categoryFilter, tagFilter]);

  const FilterDisplay: React.FC = () => {
    if (!categoryFilter && !tagFilter) return null;
    
    const type = categoryFilter ? 'Category' : 'Tag';
    const value = categoryFilter || tagFilter;
    const Icon = categoryFilter ? Folder : Tag;

    return (
        <div className="mb-8 p-4 bg-primary-50 border border-primary-200 rounded-lg flex flex-col sm:flex-row items-center justify-center text-center gap-4">
            <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary"/>
                <span className="text-slate-600">
                    Showing posts in {type}: <strong className="text-primary-700">"{value}"</strong>
                </span>
            </div>
            <Link 
                to="/blog" 
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-600 text-sm font-semibold py-1 px-3 rounded-full border border-slate-300"
            >
                <XCircle size={14} /> Clear Filter
            </Link>
        </div>
    )
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-slate-800 mb-2">Our Blog</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Insights, guides, and news from the world of oversize load transportation.
        </p>
      </section>

      <section>
        <FilterDisplay />
        {loading ? (
          <div className="flex justify-center items-center p-16">
            <Loader className="animate-spin text-primary" size={48} />
          </div>
        ) : error ? (
          <p className="p-8 text-center text-red-600 bg-red-50 rounded-lg">{error}</p>
        ) : posts.length === 0 ? (
          <p className="p-8 text-center text-slate-500">No blog posts found matching your criteria.</p>
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