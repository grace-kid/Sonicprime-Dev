'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image';
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add('visible')
    }
  }, [])

  return (
    <section className='relative w-full min-h-screen flex overflow-hidden bg-gradient-to-b from-blue-50/90  to-[#180CC7]'>
      {/* Background image with overlay */}
      <div className='absolute inset-0 z-10'>
        <img
          src='/images/hero_img2.png'
          alt='hero background'
          className='mt-20 md:mx-14 md:w-[1250px] z-10   object-cover'
        />
        <div className='  inset-0 ' />
        {/* <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent' /> */}
      </div>

      {/* Animated dots grid */}
      <div
        className='absolute inset-0 z-20 opacity-40'
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        ref={ref}
        className='reveal max-w-700 md:ml-20 mx-5 mt-[200px] md:mt-[270px]  z-30 text-left text-white'
        style={{ animationDelay: "0.1s" }}>
        {/* Badge */}
        <div className='inline-flex md:hidden items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 '>
          <div className='w-2 h-2 rounded-full bg-blue-400 animate-pulse' />
          <span className='text-blue-300 text-sm font-medium'>
            Software Development Company
          </span>
        </div>

        <div
          className='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4'
          style={{ fontFamily: "var(--font-display)" }}>
          <div className='flex items-baseline'>
            <p className='gradient-text my-2  '>
              <img src='/images/logo.png' className='size-10  md:size-12 mb-2 inline' alt='Logo' />
              ONICPRIME DEV
            </p>
          </div>

          <p className='text-white my-2'>SOFTWARE DEVELOPMENT</p>

          <p className='text-blue-400'>COMPANY</p>
        </div>

        <p className='text-gray-300 text-lg font-code md:mb-0 mb-6 max-w-full leading-relaxed'>
          A forward-thinking technology firm dedicated to empowering innovation.
        </p>

        <div className='flex flex-wrap gap-4'>
          <a
            href='#projects'
            className='inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0a0a1a] transition-all duration-200 text-sm'
            style={{ fontFamily: "var(--font-display)" }}>
            VIEW ARCHIVES →
          </a>
          <a
            href='#contact'
            className='inline-flex items-center gap-2 px-7 py-3.5 bg-[#3456ce] text-white font-semibold rounded-lg hover:bg-[#0B1A58] transition-all duration-200 text-sm'
            style={{ fontFamily: "var(--font-display)" }}>
            GET IN TOUCH →
          </a>
        </div>
      </div>
      {/* Content */}
      <div className=' z-10 mt-200   max-w-full mx-20 px-6 pt-28 pb-20'></div>

      {/* Scroll indicator */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60'>
        <span className='text-blue-500 text-xs tracking-widest uppercase'>
          Scroll
        </span>
        <div className='w-px h-10 bg-gradient-to-b from-white to-transparent animate-pulse' />
      </div>
    </section>
  );
}
