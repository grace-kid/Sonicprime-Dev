'use client'
import { useState } from 'react'
import Link from 'next/link'

const quickLinks = ['About Us', 'Academy', 'Testimonials', 'Contacts']
const socialLinks = [
  { label: '✕', href: '#' },
  { label: 'in', href: '#' },
  { label: '📷', href: '#' },
  { label: 'f', href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [subMsg, setSubMsg] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setSubStatus('success')
        setSubMsg('Subscribed!')
        setEmail('')
      } else {
        setSubStatus('error')
        setSubMsg(data.error || 'Error')
      }
    } catch {
      setSubStatus('error')
      setSubMsg('Failed')
    }
  }

  return (
    <footer className='bg-[#0a0a1a] border-t border-white/10'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center'>
                <img src='/images/logo.png' className='h-8 w-8' alt='Logo' />
              </div>
              <span
                className='text-white font-bold'
                style={{ fontFamily: "var(--font-display)" }}>
                SONIC<span className='text-blue-400'>PRIME</span> DEV
              </span>
            </div>
            <p className='text-gray-400 text-sm leading-relaxed'>
              Empowering careers through expert-led in online technology and
              development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className='text-white font-bold mb-5'
              style={{ fontFamily: "var(--font-display)" }}>
              Quick Links
            </h4>
            <ul className='space-y-3'>
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href='#'
                    className='text-gray-400 text-sm hover:text-white transition-colors'>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className='text-white font-bold mb-5'
              style={{ fontFamily: "var(--font-display)" }}>
              Contact Us
            </h4>
            <ul className='space-y-3 text-sm text-gray-400'>
              <li className='flex items-center gap-2'>
                <span>✉️</span>
                <span>sonicprimedev@gmail.com</span>
              </li>
              <li className='flex items-center gap-2'>
                <span>📞</span>
                <span>+(234)7082865002</span>
              </li>
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h4
              className='text-white font-bold mb-5'
              style={{ fontFamily: "var(--font-display)" }}>
              Follow Us
            </h4>
            <div className='flex gap-2 mb-6'>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className='w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-white text-xs hover:bg-blue-600 transition-colors'>
                  {s.label}
                </a>
              ))}
            </div>

            <h4
              className='text-white font-bold mb-3'
              style={{ fontFamily: "var(--font-display)" }}>
              Newsletter
            </h4>
            <form onSubmit={handleSubscribe} className='flex flex-col gap-2'>
              <input
                type='email'
                placeholder='Your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:border-blue-500 transition-colors w-full'
              />
              <button
                type='submit'
                disabled={subStatus === "loading"}
                className='py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors disabled:opacity-60'>
                {subStatus === "loading" ? "..." : "Subscribe"}
              </button>
              {subMsg && (
                <p
                  className={`text-xs ${subStatus === "success" ? "text-green-400" : "text-red-400"}`}>
                  {subMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/10 px-6 py-5'>
        <p className='text-center text-gray-500 text-sm'>
          © 2025{" "}
          <span className='text-white font-semibold'>SONICPRIME DEV</span>.{" "}
          <span className='text-blue-400'>All rights reserved</span>
        </p>
      </div>
    </footer>
  );
}
