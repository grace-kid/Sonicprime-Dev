'use client'
import { useReveal } from '@/components/ui/useReveal'

const reasons = [
  {
    icon: '💡',
    title: 'Innovative Solutions',
    desc: 'Cutting-edge technology and creative approaches to solve complex problems.',
  },
  {
    icon: '👥',
    title: 'Expert Team',
    desc: 'Highly skilled professionals with diverse industry experience.',
  },
  {
    icon: '⏱',
    title: 'Timely Delivery',
    desc: 'Consistent track record of delivering projects on schedule.',
  },
]

export default function WhyChooseUs() {
  const { ref, visible } = useReveal()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Why choose us */}
        <div ref={ref} className={`reveal text-center mb-16 ${visible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Why Choose Us
          </h2>
          <p className="text-gray-500">What sets us apart from the rest</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} reason={r} delay={i * 0.1} />
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MissionVisionCard
            icon="🎯"
            title="Our Mission"
            accent="blue"
            text="To empower business through innovative technology solution, driving growth and digital transformation in an ever-evolving landscape."
          />
          <MissionVisionCard
            icon="👁"
            title="Our Vision"
            accent="indigo"
            text="To be the leading force in technological innovation, creating sustainable digital solutions that shape the future of businesses worldwide."
          />
        </div>
      </div>
    </section>
  )
}

function ReasonCard({ reason, delay }: { reason: typeof reasons[0]; delay: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal p-6 rounded-2xl border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="text-3xl mb-4">{reason.icon}</div>
      <h3 className="text-gray-900 font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        {reason.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
    </div>
  )
}

function MissionVisionCard({
  icon,
  title,
  text,
  accent,
}: {
  icon: string
  title: string
  text: string
  accent: 'blue' | 'indigo'
}) {
  const { ref, visible } = useReveal()
  const colors = {
    blue: 'bg-blue-50 border-blue-100',
    indigo: 'bg-indigo-50 border-indigo-100',
  }

  return (
    <div
      ref={ref}
      className={`reveal p-8 rounded-2xl border ${colors[accent]} ${visible ? 'visible' : ''}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3
          className={`text-2xl font-bold ${accent === 'blue' ? 'text-blue-900' : 'text-indigo-900'}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
      </div>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  )
}
