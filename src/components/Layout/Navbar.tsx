import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleProtectedLink = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      setIsAuthModalOpen(true);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">GO-WIN</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                About
              </Link>
              <Link
                to="/learn"
                onClick={(e) => handleProtectedLink(e, '/learn')}
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Learn
              </Link>
              <Link
                to="/practice"
                onClick={(e) => handleProtectedLink(e, '/practice')}
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Practice Tests
              </Link>
              <Link
                to="/courses"
                onClick={(e) => handleProtectedLink(e, '/courses')}
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Courses
              </Link>
              {isAdmin && (
                <>
                  <Link
                    to="/admin/courses"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
                  >
                    Manage Courses
                  </Link>
                  <Link
                    to="/admin/resources"
                    className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
                  >
                    Resources
                  </Link>
                </>
              )}
              <Link
                to="/resources"
                onClick={(e) => handleProtectedLink(e, '/resources')}
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Resources
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user.firstName || user.email}
                </span>
                <button
                  onClick={logout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
