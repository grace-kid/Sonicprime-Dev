'use client'
import { useState } from 'react'
import { useReveal } from '@/components/ui/useReveal'

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'We offer a comprehensive range of digital services including web development, mobile app development, cloud infrastructure, digital marketing and cyber security solutions.',
  },
  {
    q: 'How long does a typical project last?',
    a: 'Project timelines vary based on complexity and scope. We provide a detailed timeline during our initial consultation so you know exactly what to expect from day one.',
  },
  {
    q: 'Do you offer support after project completion?',
    a: 'Yes, we provide ongoing support and maintenance services to ensure your solution continues to perform optimally long after launch.',
  },
  {
    q: 'What is your pricing model?',
    a: 'We offer flexible pricing models based on project requirements. Contact us for a detailed quote tailored to your specific needs and budget.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const { ref, visible } = useReveal()

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={ref} className={`reveal text-center mb-16 ${visible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">Find answers to common questions about our courses and platform</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4" style={{ fontFamily: 'var(--font-display)' }}>
                  {faq.q}
                </span>
                <span
                  className={`text-blue-600 text-xl flex-shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                >
                  ⌄
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
