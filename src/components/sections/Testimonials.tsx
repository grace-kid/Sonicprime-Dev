'use client'
import { useEffect, useState } from 'react'
import { useReveal } from '@/components/ui/useReveal'

interface Testimonial {
  _id: string
  name: string
  title: string
  company: string
  comment: string
  rating: number
  imageUrl?: string
  imageFileId?: string
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, visible } = useReveal()

  const fetchTestimonials = () => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(data => { setTestimonials(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { fetchTestimonials() }, [])

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal text-center mb-16 ${visible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Client Testimonials
          </h2>
          <p className="text-gray-400">What our clients say about us</p>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[1,2].map(i => <div key={i} className="bg-white/5 rounded-2xl h-40 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t._id} testimonial={t} delay={i * 0.1} />
            ))}
          </div>
        )}

        {/* Drop Review Form */}
        <ReviewForm onSuccess={fetchTestimonials} />
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial: t, delay }: { testimonial: Testimonial; delay: number }) {
  const { ref, visible } = useReveal()
  const imageUrl = t.imageFileId ? `/api/files/${t.imageFileId}` : t.imageUrl
  return (
    <div
      ref={ref}
      className={`reveal bg-white/5 border border-white/10 rounded-2xl p-6 ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
          {imageUrl ? (
            <img src={imageUrl} alt={t.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold">
              {t.name[0]}
            </div>
          )}
        </div>
        <div>
          <p className="text-white font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{t.name}</p>
          <p className="text-blue-400 text-sm">{t.title}, {t.company}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-lg ${i < t.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
          ))}
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">"{t.comment}"</p>
    </div>
  )
}

function ReviewForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: '', title: '', company: '', comment: '', rating: 0 })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.title || !form.company || !form.comment || !form.rating) {
      setMessage('Please fill all fields and select a rating.')
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('title', form.title)
      formData.append('company', form.company)
      formData.append('comment', form.comment)
      formData.append('rating', String(form.rating))
      if (imageFile) formData.append('image', imageFile)

      const res = await fetch('/api/testimonials', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setMessage('Thank you! Your review has been submitted for approval.')
        setForm({ name: '', title: '', company: '', comment: '', rating: 0 })
        setImageFile(null)
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to submit. Please try again.')
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
      <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Drop review
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-blue-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Title e.g: Mr"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-blue-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Company name"
            value={form.company}
            onChange={e => set('company', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-blue-500 transition-colors"
          />
          <textarea
            placeholder="Comments"
            rows={3}
            value={form.comment}
            onChange={e => set('comment', e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Right: image + stars + submit */}
        <div className="space-y-4">
          <label className="block w-full bg-white/10 border border-dashed border-white/30 rounded-lg px-4 py-3 text-gray-400 text-sm text-center cursor-pointer hover:border-blue-400 transition-colors">
            {imageFile ? imageFile.name : 'Upload your image'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => setImageFile(e.target.files?.[0] || null)}
            />
          </label>

          <div>
            <p className="text-gray-400 text-sm mb-2">Rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star text-2xl transition-colors ${
                    star <= (hoveredStar || form.rating) ? 'text-yellow-400' : 'text-gray-600'
                  }`}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => set('rating', star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {message && (
            <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting...' : 'submit'}
          </button>
        </div>
      </div>
    </div>
  )
}
