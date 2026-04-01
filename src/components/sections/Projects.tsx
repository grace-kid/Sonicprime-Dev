'use client'
import { useEffect, useState } from 'react'
import { useReveal } from '@/components/ui/useReveal'

interface Project {
  _id: string
  title: string
  category: string
  description: string
  imageUrl?: string
  imageFileId?: string
  liveUrl?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, visible } = useReveal()

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { setProjects(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="py-24 bg-[#0f0f1f]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal text-center mb-14 ${visible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Latest Projects
          </h2>
          <p className="text-gray-400 text-base">Discover our latest work and innovations</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white/5 rounded-xl animate-pulse h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { ref, visible } = useReveal()
  const imageUrl = project.imageFileId ? `/api/files/${project.imageFileId}` : project.imageUrl

  return (
    <div
      ref={ref}
      className={`reveal group bg-[#1a1a2e] rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-300 ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          {project.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-white font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex gap-3">
          <button className="flex-1 py-2 border border-white/20 text-white text-sm rounded-lg hover:bg-white/10 transition-colors">
            About
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Preview
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
