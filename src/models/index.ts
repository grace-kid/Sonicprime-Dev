import mongoose, { Schema, Document } from 'mongoose'

// ─── Project ─────────────────────────────────────────────────
export interface IProject extends Document {
  title: string
  category: string
  description: string
  imageUrl?: string
  imageFileId?: string
  liveUrl?: string
  featured: boolean
  createdAt: Date
}

const ProjectSchema = new Schema<IProject>({
  title:       { type: String, required: true },
  category:    { type: String, required: true },
  description: { type: String, required: true },
  imageUrl:    { type: String },
  imageFileId: { type: String },
  liveUrl:     { type: String },
  featured:    { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
})

// ─── Service ─────────────────────────────────────────────────
export interface IService extends Document {
  title: string
  description: string
  tags: string[]
  imageUrl?: string
  imageFileId?: string
  order: number
}

const ServiceSchema = new Schema<IService>({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  tags:        [{ type: String }],
  imageUrl:    { type: String },
  imageFileId: { type: String },
  order:       { type: Number, default: 0 },
})

// ─── Team Member ─────────────────────────────────────────────
export interface ITeamMember extends Document {
  name: string
  role: string
  imageUrl?: string
  imageFileId?: string
  linkedinUrl?: string
  twitterUrl?: string
  order: number
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name:        { type: String, required: true },
  role:        { type: String, required: true },
  imageUrl:    { type: String },
  imageFileId: { type: String },
  linkedinUrl: { type: String },
  twitterUrl:  { type: String },
  order:       { type: Number, default: 0 },
})

// ─── Testimonial ─────────────────────────────────────────────
export interface ITestimonial extends Document {
  name: string
  title: string
  company: string
  comment: string
  rating: number
  imageUrl?: string
  imageFileId?: string
  approved: boolean
  createdAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>({
  name:      { type: String, required: true },
  title:     { type: String, required: true },
  company:   { type: String, required: true },
  comment:   { type: String, required: true },
  rating:    { type: Number, required: true, min: 1, max: 5 },
  imageUrl:  { type: String },
  imageFileId: { type: String },
  approved:  { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

// ─── Contact Message ─────────────────────────────────────────
export interface IContact extends Document {
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

const ContactSchema = new Schema<IContact>({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  subject:   { type: String, required: true },
  message:   { type: String, required: true },
  read:      { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

// ─── Newsletter ───────────────────────────────────────────────
export interface INewsletter extends Document {
  email: string
  subscribedAt: Date
}

const NewsletterSchema = new Schema<INewsletter>({
  email:        { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
})

// ─── Exports (guard against model re-registration) ───────────
export const Project     = mongoose.models.Project     || mongoose.model<IProject>('Project', ProjectSchema)
export const Service     = mongoose.models.Service     || mongoose.model<IService>('Service', ServiceSchema)
export const TeamMember  = mongoose.models.TeamMember  || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)
export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)
export const Contact     = mongoose.models.Contact     || mongoose.model<IContact>('Contact', ContactSchema)
export const Newsletter  = mongoose.models.Newsletter  || mongoose.model<INewsletter>('Newsletter', NewsletterSchema)
