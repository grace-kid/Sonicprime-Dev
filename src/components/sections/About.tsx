'use client'
import { useReveal } from '@/components/ui/useReveal'

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '100+', label: 'Clients' },
  { value: '200k+', label: 'Community' },
]

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="py-24 bg-[#0a0a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Read more about us
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              About us
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8 text-base">
              <strong className="text-white">SonicPrime Dev Portfolio</strong> is a forward-thinking technology firm
              dedicated to empowering innovation. Founded on the principle that technology can transform industries
              and enhance lives, we have become a trusted leader by delivering exceptional solutions to complex
              challenges. Our commitment to creativity, expertise, and reliability makes us a strategic partner
              for businesses and communities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center border border-white/10 rounded-xl py-5 px-3 hover:border-blue-500/50 transition-colors">
                  <div
                    className="text-3xl font-extrabold text-white mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {value}
                  </div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative rounded-2xl overflow-hidden h-80 lg:h-96">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Team working"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
