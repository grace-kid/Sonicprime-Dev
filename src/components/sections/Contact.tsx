'use client'
import { useState } from 'react'
import { useReveal } from '@/components/ui/useReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const { ref, visible } = useReveal()

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setMsg('Message sent! We will get back to you soon.')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setMsg(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMsg('Failed to send. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal text-center mb-16 ${visible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Get in Touch
          </h2>
          <p className="text-gray-500">Get in touch with our team to discuss your project requirements and how we can help</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:border-blue-500 transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:border-blue-500 transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">Subject</label>
              <input
                type="text"
                placeholder="Project inquiry"
                value={form.subject}
                onChange={e => set('subject', e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:border-blue-500 transition-colors bg-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">Message</label>
              <textarea
                rows={5}
                placeholder="Describe your project..."
                value={form.message}
                onChange={e => set('message', e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:border-blue-500 transition-colors bg-white resize-none"
              />
            </div>

            {msg && (
              <p className={`text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                {msg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-60"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Info */}
          <div className="space-y-6">
            <InfoCard
              icon="📍"
              title="Address"
              lines={['123 Tech94025 Street, Silicon Valley, CA']}
            />
            <InfoCard
              icon="📞"
              title="Phone"
              lines={['+1 (234) 567-890']}
            />
            <InfoCard
              icon="✉️"
              title="Email"
              lines={['info@bchub.com']}
            />
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Business Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-medium text-gray-900">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-gray-900">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-red-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({ icon, title, lines }: { icon: string; title: string; lines: string[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>{title}</p>
        {lines.map(l => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
      </div>
    </div>
  )
}
