import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { CardContent, CardFooter } from '../../Card';

interface CreatePostFormProps {
  onSubmit: (data: { title: string; excerpt: string; content: string; categories: string[], tags: string[] }) => Promise<void>;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      alert('Please fill out title, excerpt, and content.');
      return;
    }
    setLoading(true);

    const categoriesArray = categories.split(',').map(c => c.trim()).filter(Boolean);
    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

    await onSubmit({ title, excerpt, content, categories: categoriesArray, tags: tagsArray });
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
            className={inputClasses}
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
            className={inputClasses}
            rows={2}
            maxLength={160}
            required
            disabled={loading}
          />
           <p className="text-xs text-slate-400 mt-1">{excerpt.length} / 160 characters</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="categories" className="block text-sm font-medium text-slate-600 mb-1">Categories</label>
              <input
                id="categories"
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className={inputClasses}
                placeholder="e.g., Guides, News, Safety"
                disabled={loading}
              />
               <p className="text-xs text-slate-400 mt-1">Separate with commas.</p>
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-slate-600 mb-1">Tags</label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={inputClasses}
                placeholder="e.g., permitting, regulations"
                disabled={loading}
              />
              <p className="text-xs text-slate-400 mt-1">Separate with commas.</p>
            </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-600 mb-1">Content (use HTML for formatting)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${inputClasses} font-mono`}
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
    </form>
  );
};

export default CreatePostForm;
