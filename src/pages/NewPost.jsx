import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    // For now, we'll just simulate adding a new post
    const newPost = {
      id: Date.now(), // Use timestamp as a simple unique id
      title,
      content,
      date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
    };

    // Here you would typically make an API call to save the new post
    // For this example, we'll just show a success message and navigate back to home
    toast.success("New post created successfully!");
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full h-40"
          />
        </div>
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
};

export default NewPost;
