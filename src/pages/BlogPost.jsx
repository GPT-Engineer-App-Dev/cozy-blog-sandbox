import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
    date: "2023-05-01"
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts[id];

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-blue-500 hover:underline mb-4">
        <ArrowLeft className="mr-2" size={20} />
        Back to Home
      </Link>
      <article className="prose lg:prose-xl mx-auto">
        <h1>{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
        <p>{post.content}</p>
      </article>
    </div>
  );
};

export default BlogPost;
