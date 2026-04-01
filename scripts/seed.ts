// scripts/seed.ts
// Run with: npx ts-node scripts/seed.ts
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI!

const projects = [
  {
    title: 'ShopEase Platform',
    category: 'e-commerce',
    description: 'Advanced analytics platform for real-time data monitoring with customizable widgets, real-time notifications, and comprehensive reporting.',
    imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    title: 'Party Connect App',
    category: 'e-commerce',
    description: 'Advanced analytics platform for real-time data monitoring with customizable widgets, real-time notifications, and comprehensive reporting.',
    imageUrl: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?w=600',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    title: 'BrandKit Dashboard',
    category: 'saas',
    description: 'Advanced analytics platform for real-time data monitoring with customizable widgets, real-time notifications, and comprehensive reporting.',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600',
    liveUrl: 'https://example.com',
    featured: true,
  },
]

const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and best practices for optimal performance and user experience.',
    tags: ['Node.js', 'React', 'JavaScript', 'HTML5', 'Python'],
    icon: 'monitor',
    order: 1,
  },
  {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android.',
    tags: ['iOS', 'Android', 'SQL', 'React Nat+', 'Flutter'],
    icon: 'smartphone',
    order: 2,
  },
  {
    title: 'Cloud Solution',
    description: 'Scalable cloud infrastructure and migration services to optimize your operations and reduce costs.',
    tags: ['SAAS', 'PAAS', 'SACE', 'AWS', 'IAAS'],
    icon: 'cloud',
    order: 3,
  },
]

const team = [
  {
    name: 'Benson Okoye',
    role: 'CEO & Founder',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
    linkedinUrl: '#',
    twitterUrl: '#',
    order: 1,
  },
  {
    name: 'Charles Chris',
    role: 'Head of Education',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    linkedinUrl: '#',
    twitterUrl: '#',
    order: 2,
  },
  {
    name: 'Micheal Chen',
    role: 'Team Lead',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    linkedinUrl: '#',
    twitterUrl: '#',
    order: 3,
  },
]

const testimonials = [
  {
    name: 'John Smith',
    title: 'CEO',
    company: 'Tech Solutions',
    comment: 'SonicPrime Dev transformed our digital presence with their innovative solutions and professional approach. Highly recommended!',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    approved: true,
  },
  {
    name: 'Sarah Johnson',
    title: 'CTO',
    company: 'StartupX',
    comment: 'SonicPrime Dev transformed our digital presence with their innovative solutions and professional approach. Highly recommended!',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    approved: true,
  },
]

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  const { Project, Service, TeamMember, Testimonial } = await import('../src/models/index')

  await Project.deleteMany({})
  await Service.deleteMany({})
  await TeamMember.deleteMany({})
  await Testimonial.deleteMany({})

  await Project.insertMany(projects)
  await Service.insertMany(services)
  await TeamMember.insertMany(team)
  await Testimonial.insertMany(testimonials)

  console.log('✅ Seed complete!')
  process.exit(0)
}

seed().catch(console.error)
