
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-therapy-light to-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-therapy-purple mb-6">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <Home size={18} /> 
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
