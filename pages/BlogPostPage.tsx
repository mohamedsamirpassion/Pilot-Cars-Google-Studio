import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { mockApi } from '../api/mockApi';
import { Loader, Calendar, User, ArrowLeft, Folder, Tag } from 'lucide-react';
import Card, { CardContent } from '../components/Card';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) {
      setError('Post not found.');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await mockApi.getPostBySlug(slug);
        setPost(fetchedPost);
      } catch (err) {
        setError('Could not find the requested post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // SEO and Meta Tag Management
  useEffect(() => {
    if (post) {
      // Set the page title
      document.title = `${post.title} | Pilot Cars & Permits`;

      // Function to set or create a meta tag
      const setMetaTag = (name: string, content: string) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('name', name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };
      
      const setOgMetaTag = (property: string, content: string) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', property);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      }
      
      // Set standard and Open Graph meta tags for SEO and social sharing
      setMetaTag('description', post.excerpt);
      setOgMetaTag('og:title', post.title);
      setOgMetaTag('og:description', post.excerpt);
      setOgMetaTag('og:type', 'article');
      
      // Reset on component unmount
      return () => {
        document.title = 'Pilot Cars & Permits';
        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute('content', 'A comprehensive platform for trucking companies...');
      };
    }
  }, [post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-24">
        <Loader className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12 bg-red-50 rounded-lg">
        <h2 className="text-2xl font-bold text-red-700">Error</h2>
        <p className="text-red-600 mt-2">{error}</p>
        <Link to="/blog" className="mt-4 inline-block bg-primary text-white font-bold py-2 px-4 rounded-lg">
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return null; // Should be handled by error state
  }

  return (
    <div>
      <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mb-8">
        <ArrowLeft size={18} />
        Back to All Posts
      </Link>

      <Card>
        <CardContent className="p-6 md:p-10">
          <article className="prose lg:prose-xl max-w-none">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 !mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-slate-500 mb-8">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={post.publishDate}>{new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
            </div>
            
            <div className="flex flex-wrap items-start gap-x-6 gap-y-3 mb-8 text-sm">
                {(post.categories && post.categories.length > 0) && (
                    <div className="flex items-center gap-2 text-slate-600">
                        <Folder size={16} className="text-slate-400"/>
                        <span className="font-semibold">Categories:</span>
                        <div className="flex flex-wrap gap-2">
                            {post.categories.map(cat => (
                                <Link key={cat} to={`/blog?category=${encodeURIComponent(cat)}`} className="bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">{cat}</Link>
                            ))}
                        </div>
                    </div>
                )}
                 {(post.tags && post.tags.length > 0) && (
                    <div className="flex items-center gap-2 text-slate-600">
                        <Tag size={16} className="text-slate-400"/>
                        <span className="font-semibold">Tags:</span>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full hover:bg-slate-600 hover:text-white transition-colors">#{tag}</Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </CardContent>
      </Card>
       <style>{`
        .prose h2 {
            @apply text-3xl font-bold mt-8 mb-4 text-slate-700;
        }
        .prose p {
            @apply text-slate-600 leading-relaxed;
        }
        .prose ol {
            @apply list-decimal list-inside space-y-2 my-4;
        }
       `}</style>
    </div>
  );
};

export default BlogPostPage;