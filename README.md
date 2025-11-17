# School Website - Next.js & Supabase

A dynamic, SEO-optimized school website with admin dashboard for managing content such as news, events, gallery, and staff profiles.

## Features

- 🎨 **Modern Design**: Responsive and beautiful UI built with Tailwind CSS
- 📱 **Mobile-First**: Fully responsive across all devices
- 🔐 **Admin Dashboard**: Secure admin panel for content management
- 📰 **Dynamic Content**: News, Events, and Gallery management
- 🖼️ **Image Management**: Upload and manage images with Supabase Storage
- 📧 **Contact Form**: Email integration for contact submissions
- 🔍 **SEO Optimized**: Meta tags, sitemap, and Open Graph support
- ⚡ **Fast Performance**: Built with Next.js 14 App Router

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, React Hook Form
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel or cPanel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- (Optional) Namecheap domain for deployment

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd school-website
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Supabase**

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the contents of `supabase-schema.sql`
   - Enable Authentication with Email provider
   - Create a storage bucket named `school-images` with public access

4. **Configure environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials and email settings

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

EMAIL_SERVER_HOST=smtp.your-mail-server.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@school.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@school.com
EMAIL_TO=contact@school.com

NEXT_PUBLIC_SITE_URL=https://yourschool.com
NEXT_PUBLIC_SITE_NAME=Your School Name
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create Admin User

1. Go to your Supabase project
2. Navigate to Authentication → Users
3. Click "Add User" and create an admin account
4. Use these credentials to login at `/admin/login`

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── (public)/            # Public pages
│   │   ├── about/
│   │   ├── admissions/
│   │   ├── academics/
│   │   ├── news/
│   │   ├── events/
│   │   ├── gallery/
│   │   └── contact/
│   ├── admin/               # Admin dashboard
│   │   ├── news/
│   │   ├── events/
│   │   ├── gallery/
│   │   ├── staff/
│   │   └── settings/
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   ├── admin/               # Admin components
│   └── forms/               # Form components
├── lib/                     # Utilities and helpers
│   ├── supabase/           # Supabase client configuration
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
└── public/                  # Static assets
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Deploy to cPanel (Static Export)

1. **Build for static export**

```bash
EXPORT_MODE=true npm run build
```

2. **Upload to cPanel**

   - The build output will be in the `/out` folder
   - Upload contents of `/out` folder to `public_html` via FTP or File Manager

3. **Configure domain**

   - Point your Namecheap domain to cPanel nameservers
   - Enable AutoSSL for HTTPS

4. **Note**: Static export has limitations:
   - Server-side features won't work
   - Use client-side data fetching
   - Consider API routes alternatives

## Content Management

### Admin Panel

Access the admin panel at `/admin/login`

**Features:**

- 📰 Manage news articles
- 📅 Create and edit events
- 🖼️ Upload gallery images
- 👥 Manage staff profiles
- ⚙️ Configure site settings

### Database Tables

- `news` - News articles and announcements
- `events` - School events and activities
- `gallery` - Image gallery
- `staff` - Staff and leadership profiles
- `pages` - Dynamic page content
- `contact_submissions` - Contact form submissions

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: '#1E40AF',  // Main brand color
  accent: '#FBBF24',   // Accent color
}
```

### Site Information

Update site name and URL in environment variables:

```env
NEXT_PUBLIC_SITE_NAME=Your School Name
NEXT_PUBLIC_SITE_URL=https://yourschool.com
```

### Navigation

Edit navigation links in `components/layout/Navbar.tsx`

### Footer

Customize footer content in `components/layout/Footer.tsx`

## SEO Configuration

- **Sitemap**: Automatically generated at `/sitemap.xml`
- **Robots.txt**: Configured in `next-sitemap.config.js`
- **Meta Tags**: Set per page using Next.js Metadata API
- **Open Graph**: Configured for social media sharing

## Email Configuration

The contact form sends emails using Nodemailer. Configure SMTP settings:

```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
```

For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833).

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

### Images not loading

- Check Supabase Storage bucket permissions
- Verify `school-images` bucket is public
- Update `next.config.js` with correct Supabase domain

### Authentication not working

- Verify Supabase URL and keys in `.env.local`
- Check that Email auth is enabled in Supabase
- Clear browser cookies and try again

### Contact form not sending emails

- Verify SMTP credentials
- Check firewall/hosting restrictions on port 587
- Test email settings with a simple script first

## Credits

Built with ❤️ using Next.js, Supabase, and Tailwind CSS













