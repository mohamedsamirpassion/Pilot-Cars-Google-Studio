import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { CardContent, CardFooter } from '../../Card';

interface CreatePostFormProps {
  onSubmit: (data: { title: string; excerpt: string; content: string }) => Promise<void>;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      alert('Please fill out all fields.');
      return;
    }
    setLoading(true);
    await onSubmit({ title, excerpt, content });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-b">
      <CardContent className="space-y-4 bg-slate-50/50">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-600 mb-1">Post Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-slate-600 mb-1">Excerpt (Short Summary for SEO)</label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="input"
            rows={2}
            maxLength={160}
            required
            disabled={loading}
          />
           <p className="text-xs text-slate-400 mt-1">{excerpt.length} / 160 characters</p>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-600 mb-1">Content (use HTML for formatting)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input font-mono"
            rows={10}
            placeholder="<p>Start writing your article here...</p><h2>A Subheading</h2>"
            required
            disabled={loading}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg" disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 disabled:bg-slate-400" disabled={loading}>
          <Save size={18} />
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </CardFooter>
      <GlobalStyles />
    </form>
  );
};


const GlobalStyles = () => (
    <style>{`
        .input {
            @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100;
        }
    `}</style>
);


export default CreatePostForm;