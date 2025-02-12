import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleLanguage = () => {
    setIsLangOpen(!isLangOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-[#1d3459] hover:bg-[#f2f5f8] transition-colors"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <div className="flex items-center">
              <span className="text-[#1d3459] font-bold text-xl">Tsinda</span>
              <span className="text-[#3eabfa] font-bold text-xl">.pro</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[#f2f5f8] transition-colors"
            >
              <img
                src={`/flags/${language}.svg`}
                alt={language}
                className="w-5 h-5 rounded-sm object-cover"
              />
              <span className="text-[#1d3459] font-medium">
                {language.toUpperCase()}
              </span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                {['en', 'fr', 'kin'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang as 'en' | 'fr' | 'kin');
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-[#f2f5f8] transition-colors ${
                      language === lang ? 'bg-[#f2f5f8]' : ''
                    }`}
                  >
                    <img
                      src={`/flags/${lang}.svg`}
                      alt={lang}
                      className="w-5 h-5 rounded-sm object-cover"
                    />
                    <span className="text-[#1d3459] font-medium">
                      {lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'Kinyarwanda'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="px-4 py-2 text-[#3552e1] hover:text-[#1d3459] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3eabfa] to-[#3552e1] text-white hover:from-[#3552e1] hover:to-[#1d3459] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
