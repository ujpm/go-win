import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import {
  FiHome,
  FiInfo,
  FiBook,
  FiCheckSquare,
  FiFolder,
  FiTrendingUp,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiDatabase,
  FiGrid,
  FiX
} from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const { t } = useLanguage();

  const getMenuItems = (isAdmin: boolean) => [
    { path: '/', name: t('home'), icon: FiHome },
    { path: '/about', name: t('about'), icon: FiInfo },
    { path: '/courses', name: t('courses'), icon: FiBook },
    { path: '/practice', name: t('practiceTest'), icon: FiCheckSquare },
    { path: '/resources', name: t('resources'), icon: FiFolder },
    { path: '/progress', name: t('progress'), icon: FiTrendingUp },
    ...(isAdmin
      ? [
          { path: '/admin', name: t('adminDashboard'), icon: FiDatabase, adminOnly: true },
          { path: '/admin/courses', name: t('manageCourses'), icon: FiGrid, adminOnly: true },
          { path: '/admin/resources', name: t('manageResources'), icon: FiFolder, adminOnly: true },
        ]
      : []),
    { path: '/profile', name: t('profile'), icon: FiUser },
    { path: '/help', name: t('help'), icon: FiHelpCircle },
    { path: '/settings', name: t('settings'), icon: FiSettings },
  ];

  const menuItems = getMenuItems(isAdmin || false);

  const sidebarClasses = `fixed top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 group
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
                onClick={onClose}
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
