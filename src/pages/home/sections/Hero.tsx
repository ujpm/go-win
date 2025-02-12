import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-indigo-50/80 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/src/assets/images/patterns/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Container className="relative pt-24 lg:pt-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-indigo-700 rounded-full bg-indigo-50 ring-1 ring-inset ring-indigo-700/10 mb-8">
              Rwanda's Digital Driving School
            </span>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-indigo-600 mb-2">GO-WIN</span>
              <span className="block">Your Journey to Driving Excellence</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto lg:mx-0">
              Master driving theory, prepare for your license test, and become a confident driver. Join our comprehensive digital learning platform designed specifically for Rwandan drivers.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="default"
                  className="w-full shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35"
                >
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
                {[
                  { label: 'Learning Modules', value: 'Comprehensive' },
                  { label: 'Practice Tests', value: 'Updated' },
                  { label: 'Support', value: 'Always Available' },
                  { label: 'Languages', value: 'Multi-lingual' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <dt className="text-sm text-gray-500">{stat.label}</dt>
                    <dd className="text-lg font-semibold tracking-tight text-indigo-600">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="flex-1 mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gray-100">
                  <img 
                    src="/src/assets/images/hero/main-hero.jpg"
                    alt="Student learning to drive"
                    className="object-cover w-full h-full"
                  />
                </div>
                
                {/* Floating Card */}
                <div className="absolute -right-6 -bottom-10 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/src/assets/images/icons/certificate.svg"
                      alt="Certificate"
                      className="w-8 h-8"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Certified</div>
                      <div className="text-sm text-gray-600">Training Program</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decorative Elements */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-indigo-200 to-indigo-100 blur-3xl opacity-30 rounded-full scale-150" />
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
