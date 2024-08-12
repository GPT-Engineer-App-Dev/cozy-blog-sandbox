import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ThemeSwitcher from '../components/ThemeSwitcher';
import { PenTool, Trash2 } from 'lucide-react';
import { toast } from "sonner";

const initialBlogPosts = [
  { id: 1, title: "My First Blog Post", excerpt: "This is the beginning of my blogging journey...", date: "2023-04-01" },
  { id: 2, title: "Reflections on Web Development", excerpt: "As I delve deeper into web development...", date: "2023-04-15" },
  { id: 3, title: "The Importance of User Experience", excerpt: "User experience is at the heart of every successful website...", date: "2023-05-01" },
];

const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);

  const handleDelete = (id) => {
    setBlogPosts(blogPosts.filter(post => post.id !== id));
    toast.success("Post deleted successfully!");
  };

  const DeleteConfirmation = ({ id }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Personal Blog</h1>
        <div className="flex items-center space-x-4">
          <Link to="/new">
            <Button className="flex items-center">
              <PenTool className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{post.date}</span>
              <div className="flex space-x-2">
                <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">Read more</Link>
                <DeleteConfirmation id={post.id} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
