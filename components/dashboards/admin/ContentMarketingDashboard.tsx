import React, { useState, useEffect, useCallback } from 'react';
import Card, { CardContent, CardHeader, CardFooter } from '../../Card';
import { BlogPost } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import { mockApi } from '../../../api/mockApi';
import { Loader, BookOpen, PlusCircle } from 'lucide-react';
import CreatePostForm from './CreatePostForm';

const ContentMarketingDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const allPosts = await mockApi.getAllPosts();
      setPosts(allPosts);
    } catch (err) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (data: { title: string; excerpt: string; content: string; categories: string[], tags: string[] }) => {
    if (!user) {
      alert('You must be logged in to create a post.');
      return;
    }
    try {
      await mockApi.createPost({
        ...data,
        authorId: user.id,
        authorName: user.name,
      });
      alert('Post created successfully!');
      setIsCreating(false);
      fetchPosts(); // Refresh the list
    } catch (err) {
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BookOpen className="text-primary" />
          <h2 className="text-2xl font-bold">Blog Management</h2>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={18} />
          {isCreating ? 'Cancel' : 'Create New Post'}
        </button>
      </CardHeader>

      {isCreating && (
        <CreatePostForm
          onSubmit={handleCreatePost}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-16"><Loader className="animate-spin text-primary" size={48} /></div>
          ) : error ? (
            <p className="p-8 text-center text-red-600">{error}</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Author</th>
                  <th className="p-4 font-semibold">Published Date</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id} className={`border-t ${index === posts.length - 1 ? '' : 'border-b'}`}>
                    <td className="p-4 font-medium">{post.title}</td>
                    <td className="p-4 text-slate-600">{post.authorName}</td>
                    <td className="p-4 text-slate-600">{new Date(post.publishDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentMarketingDashboard;