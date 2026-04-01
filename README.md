# SonicPrime Dev — Company Website

A full-stack company website built with **Next.js 14 (App Router)** and **MongoDB** via Mongoose.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | MongoDB + Mongoose |
| Fonts | Syne (display) + DM Sans (body) |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── projects/route.ts       GET all / POST new project
│   │   ├── services/route.ts       GET all / POST new service
│   │   ├── team/route.ts           GET all / POST new member
│   │   ├── testimonials/route.ts   GET approved / POST new review
│   │   ├── contact/route.ts        GET all / POST new message
│   │   └── newsletter/route.ts     POST subscribe
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   ├── Team.tsx
│   │   ├── About.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Testimonials.tsx        (includes review form)
│   │   ├── FAQ.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   └── useReveal.ts            Intersection Observer hook
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   └── mongodb.ts                  Mongoose connection singleton
├── models/
│   └── index.ts                    All Mongoose schemas + models
scripts/
└── seed.ts                         Seed initial data into MongoDB
```

---

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo>
cd sonicprime-dev
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/sonicprime?retryWrites=true&w=majority
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> Get a free MongoDB cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)

### 3. Seed the database (optional but recommended)

```bash
npx ts-node --project tsconfig.json scripts/seed.ts
```

This populates Projects, Services, Team Members and Testimonials with sample data matching the design.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Fetch all projects |
| POST | `/api/projects` | Create a project |
| GET | `/api/services` | Fetch all services |
| POST | `/api/services` | Create a service |
| GET | `/api/team` | Fetch all team members |
| POST | `/api/team` | Add a team member |
| GET | `/api/testimonials` | Fetch approved testimonials |
| POST | `/api/testimonials` | Submit a review (pending approval) |
| GET | `/api/contact` | Fetch all contact messages |
| POST | `/api/contact` | Submit a contact message |
| POST | `/api/newsletter` | Subscribe to newsletter |

---

## Sections

| Section | Features |
|---------|---------|
| **Hero** | Full-screen background, animated headline, CTA buttons |
| **Projects** | MongoDB-powered cards with category badge, About/Preview |
| **Services** | Featured middle card, tech tags, icon mapping |
| **Team** | Photo cards, LinkedIn + Twitter links |
| **About** | Stats (50+ projects etc.), photo split layout |
| **Why Choose Us** | Reason pills + Mission/Vision cards |
| **Testimonials** | Approved reviews + star-rating submission form |
| **FAQ** | Animated accordion |
| **Contact** | Form (saves to DB) + address/hours info |
| **Footer** | Quick links, contact, social, newsletter subscribe |

---

## Admin Dashboard

Visit `/admin` to access the full admin panel.

**Default credentials** (change these in `.env.local`):
```
Password: sonicprime2025
```

### Admin Pages

| Page | URL | Features |
|------|-----|---------|
| Dashboard | `/admin` | Stats overview, alerts, quick actions |
| Projects | `/admin/projects` | Create, edit, delete projects |
| Services | `/admin/services` | Create, edit, delete services + tag management |
| Team | `/admin/team` | Create, edit, delete team members |
| Testimonials | `/admin/testimonials` | Create, edit, delete + approve/reject reviews |
| Messages | `/admin/contact` | Read, reply, delete contact messages |
| Newsletter | `/admin/newsletter` | View subscribers, export CSV, delete |

### Admin API Endpoints (full CRUD)

All `[id]` routes support GET, PUT, DELETE:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/[id]` | Get single project |
| PUT | `/api/projects/[id]` | Update project |
| DELETE | `/api/projects/[id]` | Delete project |
| GET | `/api/services/[id]` | Get single service |
| PUT | `/api/services/[id]` | Update service |
| DELETE | `/api/services/[id]` | Delete service |
| GET | `/api/team/[id]` | Get single team member |
| PUT | `/api/team/[id]` | Update team member |
| DELETE | `/api/team/[id]` | Delete team member |
| GET | `/api/testimonials/[id]` | Get single testimonial |
| PUT | `/api/testimonials/[id]` | Update / approve testimonial |
| DELETE | `/api/testimonials/[id]` | Delete testimonial |
| GET | `/api/contact/[id]` | Get single message |
| PUT | `/api/contact/[id]` | Mark as read |
| DELETE | `/api/contact/[id]` | Delete message |
| DELETE | `/api/newsletter/[id]` | Remove subscriber |
| GET | `/api/newsletter` | List all subscribers |
| GET | `/api/testimonials?all=true` | All testimonials (inc. pending) |

### Change Admin Password

In `.env.local`:
```env
ADMIN_PASSWORD=your_new_secure_password
ADMIN_SECRET=your_random_cookie_secret
```

---

## Admin Dashboard

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add `MONGODB_URI` in Environment Variables
4. Deploy!

---

## Customisation

- **Colors**: Edit `src/app/globals.css` CSS variables + `tailwind.config.ts`
- **Content**: Update seed data in `scripts/seed.ts` then re-run
- **Fonts**: Change Google Fonts import in `globals.css` and `--font-display` / `--font-body` vars
- **Images**: Replace Unsplash URLs with your own (Cloudinary recommended)
