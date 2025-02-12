import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiUsers, FiArrowRight } from 'react-icons/fi';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      {/* Hero section */}
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3eabfa] to-[#3552e1] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 relative z-10">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 w-auto mb-8"
            />
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <span className="inline-flex items-center space-x-2 rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary">
                <span>New Feature</span>
                <span className="h-4 w-px bg-primary/20" />
                <span>Interactive Practice Tests</span>
              </span>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-accent sm:text-6xl">
              Master Your{' '}
              <span className="gradient-text">Driving Theory</span>{' '}
              with Confidence
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Comprehensive learning platform designed to help you ace your driving theory test. Interactive lessons, practice tests, and real-time progress tracking.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/courses"
                className="relative inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-all duration-200"
              >
                Start Learning
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/about"
                className="relative inline-flex items-center text-sm font-semibold leading-6 text-accent hover:text-accent/80 transition-colors"
              >
                Learn more <FiArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 relative z-10">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <img
                src="/hero-image.png"
                alt="App screenshot"
                className="w-[76rem] rounded-xl shadow-2xl ring-1 ring-gray-400/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-secondary">Learn Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-accent sm:text-4xl">
              Everything you need to pass your test
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 cursor-pointer"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-accent">
                  <FiBook className="h-5 w-5 flex-none text-secondary" />
                  Comprehensive Courses
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">Access a wide range of courses covering all aspects of driving theory.</p>
                </dd>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 cursor-pointer"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-accent">
                  <FiAward className="h-5 w-5 flex-none text-secondary" />
                  Practice Tests
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">Test your knowledge with our extensive collection of practice tests.</p>
                </dd>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 cursor-pointer"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-accent">
                  <FiUsers className="h-5 w-5 flex-none text-secondary" />
                  Progress Tracking
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">Monitor your learning progress and identify areas for improvement.</p>
                </dd>
              </motion.div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
