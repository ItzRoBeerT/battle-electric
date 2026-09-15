# Battle Electric - Professional Electrical Services Website

A modern, high-performance website for Battle Electric, a professional electrical services company serving Miami-Dade, Broward, and Monroe County, Florida. Built with Astro, Tailwind CSS, and deployed on Vercel.

## 🚀 Project Overview

This website showcases Battle Electric's comprehensive electrical services including:
- EV Charger Installation (Level 2 & Level 3)
- Smart Electrical Panel Installation
- Electrical Panel Installation & Replacement
- Residential and Commercial Services

## 🛠️ Tech Stack

- **Framework**: [Astro 5.9.4](https://astro.build) - Static Site Generator with Server-Side Rendering
- **Styling**: [Tailwind CSS 4.1.10](https://tailwindcss.com) - Utility-first CSS framework
- **Deployment**: [Vercel](https://vercel.com) - Serverless deployment platform
- **Image Optimization**: [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing
- **Contact & Leads**: [Housecall Pro](https://www.housecallpro.com/) embedded booking form
- **Language**: TypeScript with strict type checking

## 📁 Project Structure

```text
battle-electric/
├── public/               # Static assets
│   ├── background.jpg    # Hero backgrounds
│   ├── favicon.svg       # Site favicon
│   └── span/            # Product images
├── src/
│   ├── assets/          # Optimized images
│   │   └── services/    # Service-specific images
│   ├── components/      # Reusable Astro components
│   │   ├── Header.astro / Footer.astro
│   │   ├── ContactForm.astro
│   │   └── CityPage.astro
│   ├── data/            # Canonical business data
│   │   ├── business.ts  # BUSINESS_ID, LICENSE_NUMBER, LICENSE_LABEL
│   │   ├── service-areas.ts
│   │   └── reviews.ts
│   ├── layouts/         # Page layouts
│   │   └── Layout.astro
│   ├── pages/           # File-based routing
│   │   ├── index.astro
│   │   ├── about-us/
│   │   ├── contact-us/
│   │   ├── license.astro
│   │   ├── service-areas/
│   │   └── services/
│   │       ├── index.astro
│   │       ├── ev-charging/
│   │       ├── electrical-panel/
│   │       └── smart-panel/
│   └── sections/        # Page sections
│       ├── Services.astro
│       ├── electrical-panel/
│       ├── ev-charging/
│       └── smart-panel/
├── .gitignore
├── astro.config.mjs     # Astro configuration
├── package.json
├── tsconfig.json        # TypeScript configuration
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd battle-electric
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The site will be available at `http://localhost:4321`

## 📜 Available Scripts

| Command | Action |
| :------------------------ | :----------------------------------------------- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start local dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## 🎨 Key Features

### Performance Optimizations
- Server-side rendering (SSR) with Astro
- Optimized image loading with Sharp
- Tailwind CSS for minimal CSS bundle size
- Lazy loading for images and components

### Services Covered
1. **EV Charger Installation**
   - Level 2 charging stations
   - Level 3 DC fast charging
   - Tesla & universal chargers
   - Smart scheduling capabilities

2. **Smart Electrical Panels**
   - Remote monitoring and control
   - Energy usage tracking
   - Smart home integration
   - Real-time notifications

3. **Electrical Panel Services**
   - Panel upgrades & replacements
   - Safety inspections
   - Insurance compliance
   - Commercial & residential

### Service Areas
- Miami-Dade County
- Broward County
- Monroe County
- Homestead, Miami, Fort Lauderdale

## 🌐 Deployment

The site is configured for deployment on Vercel with the `@astrojs/vercel` adapter.

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy!

Vercel will automatically:
- Build the project
- Deploy to a global CDN
- Generate preview deployments for PRs

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Environment Variables

None required. The contact form is an embedded Housecall Pro widget (`src/components/ContactForm.astro`) — leads go directly to Housecall Pro, with no server-side form handling in this repo.

## 🤝 Contributing

If you're part of the development team:

1. Create a `fix/` or `feature/` branch from `dev` (one per Linear `BAT-*` issue)
2. Make your changes
3. Test locally with `pnpm dev`
4. Build and test production with `pnpm build && pnpm preview`
5. Submit a pull request into `dev`

Releases: merging `dev` → `main` auto-deploys to production on Vercel, so treat `dev` as near-production.

## 📄 License

This project is proprietary and confidential. All rights reserved by Battle Electric.

## 📞 Support

For technical issues or questions about the website:
- Contact: Battle Electric Development Team
- Phone: (786) 404-3885
- Website: [battleelectricfl.com](https://battleelectricfl.com)

## 🔧 Development Notes

### Server Configuration
- Default port: 4321
- Host configuration allows ngrok tunneling for testing
- Vercel adapter handles serverless functions

### SEO Optimization
- Structured data for services
- Meta tags for all pages
- Canonical URLs configured
- Image alt text for accessibility

### Business Data
- The Florida license number lives in `src/data/business.ts` (`LICENSE_NUMBER` / `LICENSE_LABEL`) — every page, FAQ, and schema node imports it. To change it, edit that one file (plus the static `public/llms.txt`).

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

---

Built with ⚡ by Battle Electric Development Team
