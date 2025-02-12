import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';

export const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed top-0 left-[72px] right-0 h-16 bg-white shadow-sm z-40">
      <div className="flex items-center justify-between h-full px-6">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-semibold text-accent">DriveTheory</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-accent">
                Welcome, {user.firstName || user.email}
              </span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-accent hover:bg-secondary/10 transition-colors"
              >
                <FiLogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors"
              >
                <FiUserPlus className="w-5 h-5" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
