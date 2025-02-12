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
  FiShield,
  FiX
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: IconType;
  name: string;
  path: string;
  protected?: boolean;
  adminOnly?: boolean;
}

const getMenuItems = (isAdmin: boolean): MenuItem[] => {
  const baseItems: MenuItem[] = [
    { icon: FiHome, name: 'Home', path: '/' },
    { icon: FiInfo, name: 'About', path: '/about' },
    { icon: FiBookOpen, name: 'Learn', path: '/learn', protected: true },
    { icon: FiAward, name: 'Practice Tests', path: '/practice', protected: true },
    { icon: FiBook, name: 'Courses', path: '/courses', protected: true },
    { icon: FiFileText, name: 'Resources', path: '/resources', protected: true },
    { icon: FiBarChart2, name: 'Progress', path: '/progress', protected: true },
  ];

  const adminItems: MenuItem[] = [
    { icon: FiShield, name: 'Admin Dashboard', path: '/admin', adminOnly: true },
    { icon: FiLayers, name: 'Manage Courses', path: '/admin/courses', adminOnly: true },
    { icon: FiDatabase, name: 'Manage Resources', path: '/admin/resources', adminOnly: true },
  ];

  const userItems: MenuItem[] = [
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

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const handleProtectedLink = (path: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(path);
    onClose();
  };

  const menuItems = getMenuItems(isAdmin || false);

  const sidebarClasses = `fixed top-0 h-full bg-white shadow-lg z-50 transition-all duration-300
    ${isOpen ? 'left-0 w-[240px]' : '-left-[240px] lg:left-0 lg:w-[72px]'} lg:hover:w-[240px]`;

  return (
    <div className={sidebarClasses}>
      {/* Mobile close button */}
      <button
        onClick={onClose}
        className="lg:hidden absolute right-4 top-4 p-2 text-gray-500 hover:text-gray-700"
      >
        <FiX className="w-6 h-6" />
      </button>

      <div className="flex flex-col h-full py-6">
        <nav className="flex-1 space-y-2 px-3 mt-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
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
                  } else {
                    onClose();
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
                <span className={`whitespace-nowrap transition-opacity duration-300
                  ${isOpen ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
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
