import { Home, BookOpen, PenTool } from "lucide-react";
import HomePage from "./pages/HomePage.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import NewPost from "./pages/NewPost.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <HomePage />,
  },
  {
    title: "Blog Post",
    to: "/post/:id",
    icon: <BookOpen className="h-4 w-4" />,
    page: <BlogPost />,
  },
  {
    title: "New Post",
    to: "/new",
    icon: <PenTool className="h-4 w-4" />,
    page: <NewPost />,
  },
];
