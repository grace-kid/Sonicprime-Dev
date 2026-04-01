'use client'
import { useEffect, useState } from 'react'
import { useReveal } from '@/components/ui/useReveal'

interface TeamMember {
  _id: string
  name: string
  role: string
  imageUrl?: string
  imageFileId?: string
  linkedinUrl?: string
  twitterUrl?: string
}

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const { ref, visible } = useReveal()

  useEffect(() => {
    fetch('/api/team')
      .then(r => r.json())
      .then(data => { setTeam(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal text-center mb-16 ${visible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Meet Our Team
          </h2>
          <p className="text-gray-500">Meet the experts behind our success</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading
            ? [1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
              ))
            : team.map((member, i) => (
                <MemberCard key={member._id} member={member} delay={i * 0.12} />
              ))
          }
        </div>
      </div>
    </section>
  )
}

function MemberCard({ member, delay }: { member: TeamMember; delay: number }) {
  const { ref, visible } = useReveal()
  const imageUrl = member.imageFileId ? `/api/files/${member.imageFileId}` : member.imageUrl

  return (
    <div
      ref={ref}
      className={`reveal bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="relative h-60 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-display)' }}>
          {member.name}
        </h3>
        <p className="text-blue-600 text-sm font-medium mb-4">{member.role}</p>
        <div className="flex gap-3">
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-[#0077b5] rounded-md flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition-opacity"
            >
              in
            </a>
          )}
          {member.twitterUrl && (
            <a
              href={member.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-black rounded-md flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition-opacity"
            >
              ✕
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
