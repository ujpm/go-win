import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1d3459] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Logo" className="h-8 brightness-0 invert" />
              <span className="text-white font-bold text-xl">Tsinda.pro</span>
            </div>
            <p className="text-sm text-gray-300">
              {t('comprehensiveLearningPlatform')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#3eabfa] hover:text-white transition-colors">
                <FiGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-[#3eabfa] hover:text-white transition-colors">
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-[#3eabfa] hover:text-white transition-colors">
                <FiLinkedin className="h-6 w-6" />
              </a>
              <a href="mailto:contact@example.com" className="text-[#3eabfa] hover:text-white transition-colors">
                <FiMail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#3eabfa] tracking-wider uppercase">
              {t('quickLinks')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                  {t('courses')}
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-300 hover:text-white transition-colors">
                  {t('practiceTest')}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">
                  {t('resources')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-[#3eabfa] tracking-wider uppercase">
              {t('support')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  {t('help')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-[#3eabfa] tracking-wider uppercase">
              {t('contact')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-300">
                123 Main Street
                <br />
                Kigali, Rwanda
              </li>
              <li>
                <a href="tel:+250700000000" className="text-gray-300 hover:text-white transition-colors">
                  +250 700 000 000
                </a>
              </li>
              <li>
                <a href="mailto:contact@example.com" className="text-gray-300 hover:text-white transition-colors">
                  contact@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#3552e1]">
          <p className="text-sm text-gray-400 text-center">
            &copy; {currentYear} {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
