import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Send } from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const blogPosts = {
  1: {
    title: "My First Blog Post",
    content: "This is the beginning of my blogging journey. I'm excited to share my thoughts and experiences with you all. In this post, I'll be discussing why I decided to start a blog and what you can expect from my future posts.",
    date: "2023-04-01"
  },
  2: {
    title: "Reflections on Web Development",
    content: "As I delve deeper into web development, I'm constantly amazed by the rapid pace of innovation in this field. From new frameworks to evolving best practices, there's always something new to learn. In this post, I'll share some of my recent discoveries and challenges in web development.",
    date: "2023-04-15"
  },
  3: {
    title: "The Importance of User Experience",
    content: "User experience is at the heart of every successful website. In this post, I'll explore why UX matters so much and share some tips on how to improve the user experience of your web applications. We'll cover topics such as intuitive design, performance optimization, and accessibility.",
    date: "2023-05-01",
    comments: []
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(blogPosts[id]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  const handleDelete = () => {
    delete blogPosts[id];
    toast.success("Post deleted successfully!");
    navigate('/');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setIsSubmitting(true);
      try {
        // Simulating an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updatedPost = {
          ...post,
          comments: [...(post.comments || []), { id: Date.now(), text: newComment, date: new Date().toISOString() }]
        };
        setPost(updatedPost);
        blogPosts[id] = updatedPost;
        setNewComment('');
        toast.success("Comment added successfully!");
      } catch (error) {
        console.error("Error posting comment:", error);
        toast.error("Failed to post comment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="flex items-center text-blue-500 hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Post
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
      <article className="prose lg:prose-xl mx-auto mb-8">
        <h1>{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        <p>{post.content}</p>
      </article>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="mb-2"
            disabled={isSubmitting}
          />
          <Button type="submit" className="flex items-center" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2">Posting...</span>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Post Comment
              </>
            )}
          </Button>
        </form>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className="bg-secondary p-4 rounded-lg mb-4">
              <p className="mb-2">{comment.text}</p>
              <p className="text-sm text-gray-500">
                Posted on {new Date(comment.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
