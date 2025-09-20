import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import Card, { CardContent, CardFooter } from './Card';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all">
      <CardContent className="flex-grow">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <User size={14} />
            <span>{post.authorName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
        <p className="text-slate-600 line-clamp-3">{post.excerpt}</p>
        
        {(post.tags && post.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.slice(0, 3).map(tag => (
                    <Link 
                        key={tag} 
                        to={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                       #{tag}
                    </Link>
                ))}
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Link 
          to={`/blog/${post.slug}`} 
          className="font-bold text-primary hover:underline flex items-center gap-1"
        >
          Read More <ArrowRight size={16} />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;