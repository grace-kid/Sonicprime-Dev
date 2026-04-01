import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Team from '@/components/sections/Team'
import About from '@/components/sections/About'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Projects />
      <Services />
      <Team />
      <About />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
