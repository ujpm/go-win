import { Hero } from './home/sections/Hero'
import { Features } from './home/sections/Features'
import { HowItWorks } from './home/sections/HowItWorks'
import { Testimonials } from './home/sections/Testimonials'
import { CallToAction } from './home/sections/CallToAction'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </main>
  )
}
