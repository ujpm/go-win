import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { FiBook, FiCheckSquare, FiTrendingUp, FiArrowRight, FiAward, FiUsers } from 'react-icons/fi';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3eabfa] to-[#3552e1] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-8 py-12 sm:py-16 lg:py-20">
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
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="/hero-image.png"
                  alt="App screenshot"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
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
                icon: FiBook,
                title: t('comprehensiveCourses'),
                description: t('accessWideRangeOfCourses'),
              },
              {
                icon: FiAward,
                title: t('practiceTests'),
                description: t('testYourKnowledge'),
              },
              {
                icon: FiUsers,
                title: t('progressTracking'),
                description: t('monitorYourLearningProgress'),
              }
            ].map((feature) => (
              <motion.div 
                key={feature.title}
                whileHover={{ y: -5 }}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 cursor-pointer"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-accent">
                  <feature.icon className="h-5 w-5 flex-none text-secondary" />
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
