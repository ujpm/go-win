import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { FiArrowRight } from 'react-icons/fi';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-shrink-0 lg:pt-8">
            <div className="mt-12 sm:mt-16 lg:mt-4">
              <span className="inline-flex items-center space-x-2 rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary">
                <span>{t('newFeature')}</span>
                <span className="h-4 w-px bg-primary/20" />
                <span>{t('interactivePracticeTests')}</span>
              </span>
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-accent sm:text-6xl lg:text-5xl xl:text-6xl">
              {t('masterYour')}{' '}
              <span className="gradient-text">{t('drivingTheory')}</span>{' '}
              {t('withConfidence')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl">
              {t('comprehensiveLearningPlatform')}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/courses"
                className="relative inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-all duration-200"
              >
                {t('startLearning')}
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/about"
                className="relative inline-flex items-center text-sm font-semibold leading-6 text-accent hover:text-accent/80 transition-colors"
              >
                {t('learnMore')} <FiArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-secondary">{t('learnFaster')}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-accent sm:text-4xl">
              {t('everythingYouNeed')}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mt-24 lg:max-w-none lg:grid-cols-3">
            {[
              {
                icon: 'FiBook',
                title: t('comprehensiveCourses'),
                description: t('accessWideRangeOfCourses'),
              },
              {
                icon: 'FiCheckSquare',
                title: t('practiceTest'),
                description: t('testYourKnowledge'),
              },
              {
                icon: 'FiTrendingUp',
                title: t('progress'),
                description: t('monitorYourLearningProgress'),
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <span className="text-xl text-secondary">
                    {feature.icon === 'FiBook' && '📚'}
                    {feature.icon === 'FiCheckSquare' && '✅'}
                    {feature.icon === 'FiTrendingUp' && '📈'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-accent">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
