'use client'
import { useEffect, useState } from 'react'
import { useReveal } from '@/components/ui/useReveal'

interface Service {
  _id: string
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  imageFileId?: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const { ref, visible } = useReveal()

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.json())
      .then(data => { setServices(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const getImageUrl = (service: Service) => {
    if (service.imageFileId) return `/api/files/${service.imageFileId}`
    return service.imageUrl || ''
  }

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal text-center mb-16 ${visible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Our Services
          </h2>
          <p className="text-gray-500 text-lg">Comprehensive solutions tailored to your digital needs</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl animate-pulse h-96" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ServiceCard
                key={service._id}
                service={service}
                delay={i * 0.12}
                imageUrl={getImageUrl(service)}
                onLearnMore={() => setSelectedService(service)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          imageUrl={getImageUrl(selectedService)}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  )
}

function ServiceCard({
  service,
  delay,
  imageUrl,
  onLearnMore,
}: {
  service: Service
  delay: number
  imageUrl: string
  onLearnMore: () => void
}) {
  const { ref, visible } = useReveal()
  const shortDesc = service.description.length > 120
    ? service.description.slice(0, 120) + '...'
    : service.description

  return (
    <div
      ref={ref}
      className={`reveal group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            {service.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {shortDesc}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onLearnMore}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/btn"
        >
          <span>Learn More</span>
          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function ServiceModal({
  service,
  imageUrl,
  onClose,
}: {
  service: Service
  imageUrl: string
  onClose: () => void
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {service.title}
            </h3>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map(tag => (
              <span
                key={tag}
                className="text-sm px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
              {service.description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <a
              href="#contact"
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
