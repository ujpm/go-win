import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import {
  FiHome,
  FiBook,
  FiAward,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiBarChart2,
  FiInfo,
  FiBookOpen,
  FiFileText,
  FiDatabase,
  FiLayers,
  FiShield
} from 'react-icons/fi';

const getMenuItems = (isAdmin: boolean, handleProtectedLink: (path: string) => void) => {
  const baseItems = [
    { icon: FiHome, name: 'Home', path: '/' },
    { icon: FiInfo, name: 'About', path: '/about' },
    { icon: FiBookOpen, name: 'Learn', path: '/learn', protected: true },
    { icon: FiAward, name: 'Practice Tests', path: '/practice', protected: true },
    { icon: FiBook, name: 'Courses', path: '/courses', protected: true },
    { icon: FiFileText, name: 'Resources', path: '/resources', protected: true },
    { icon: FiBarChart2, name: 'Progress', path: '/progress', protected: true },
  ];

  const adminItems = [
    { icon: FiShield, name: 'Admin Dashboard', path: '/admin', adminOnly: true },
    { icon: FiLayers, name: 'Manage Courses', path: '/admin/courses', adminOnly: true },
    { icon: FiDatabase, name: 'Manage Resources', path: '/admin/resources', adminOnly: true },
  ];

  const userItems = [
    { icon: FiUser, name: 'Profile', path: '/profile', protected: true },
    { icon: FiHelpCircle, name: 'Help', path: '/help' },
    { icon: FiSettings, name: 'Settings', path: '/settings', protected: true },
  ];

  return [
    ...baseItems,
    ...(isAdmin ? adminItems : []),
    ...userItems
  ];
};

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const handleProtectedLink = (path: string) => {
    if (!user) {
      // You might want to handle this differently, maybe show a login modal
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const menuItems = getMenuItems(isAdmin || false, handleProtectedLink);

  return (
    <div className="fixed left-0 top-0 h-full w-[72px] bg-white shadow-lg hover:w-[240px] transition-all duration-300 group z-50">
      <div className="flex flex-col h-full py-6">
        <nav className="flex-1 space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            // Skip admin items if user is not admin
            if (item.adminOnly && !isAdmin) {
              return null;
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  if (item.protected) {
                    e.preventDefault();
                    handleProtectedLink(item.path);
                  }
                }}
                className={`flex items-center h-12 overflow-hidden rounded-lg transition-all duration-200 
                  ${isActive 
                    ? 'bg-secondary text-white' 
                    : 'text-gray-600 hover:bg-secondary/10 hover:text-secondary'
                  }`}
              >
                <motion.div
                  className="min-w-[48px] h-12 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
