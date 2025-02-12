import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiLogOut, FiMenu, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface TopbarProps {
  onMenuClick: () => void;
}

const languageOptions = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'kin', name: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
] as const;

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (code: typeof languageOptions[number]['code']) => {
    setLanguage(code);
    setIsOpen(false);
  };

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
          <div className="relative group">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-xl">
                {languageOptions.find(opt => opt.code === language)?.flag}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {languageOptions.find(opt => opt.code === language)?.name}
              </span>
              {isOpen ? (
                <FiChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <FiChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                >
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageChange(option.code)}
                      className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 ${
                        language === option.code ? 'bg-gray-50' : ''
                      }`}
                    >
                      <span className="text-xl">{option.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{option.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
