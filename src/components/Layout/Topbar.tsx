import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed top-0 right-0 left-0 h-16 bg-white shadow-sm z-40 lg:left-[72px]">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          
          <Link to="/" className="flex items-center space-x-2 ml-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-semibold text-accent hidden sm:inline">DriveTheory</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            <>
              <span className="text-accent hidden sm:inline">
                Welcome, {user.firstName || user.email}
              </span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-accent hover:bg-secondary/10 transition-colors"
              >
                <FiLogIn className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors"
              >
                <FiUserPlus className="w-5 h-5" />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
