# Complete Setup Guide

This guide will walk you through setting up your school website from scratch.

## Step 1: Initial Setup (5 minutes)

### 1.1 Clone and Install

```bash
cd goshen
npm install
```

### 1.2 Create Environment File

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

---

## Step 2: Set Up Supabase (15 minutes)

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: Your School Name
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your location
4. Wait for project creation (~2 minutes)

### 2.2 Get API Keys

1. In your project dashboard, go to **Settings** → **API**
2. Copy these values to `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 2.3 Create Database Tables

1. Go to **SQL Editor** in Supabase
2. Click "New Query"
3. Copy entire contents of `supabase-schema.sql` from this project
4. Click "Run"
5. You should see "Success. No rows returned"

### 2.4 Set Up Storage

1. Go to **Storage** in Supabase
2. The bucket `school-images` should be auto-created by SQL script
3. If not, create it manually:
   - Click "New bucket"
   - Name: `school-images`
   - Public bucket: ✅ Yes
   - Click "Create bucket"

### 2.5 Configure Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. (Optional) Configure redirect URLs for production later

---

## Step 3: Create Admin User (5 minutes)

### 3.1 Create Admin Account

1. In Supabase, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Fill in:
   - **Email**: admin@yourschool.com (use your actual email)
   - **Password**: (create a strong password)
   - **Auto Confirm User**: ✅ Yes
4. Click "Create user"

### 3.2 Save Credentials

**Important**: Save these credentials securely. You'll use them to login at `/admin/login`

---

## Step 4: Configure Email (10 minutes)

### Option A: Gmail SMTP (Recommended for Testing)

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password:
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Add to `.env.local`:

```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourschool.com
EMAIL_TO=contact@yourschool.com
```

### Option B: Namecheap Email

If you have Namecheap email hosting:

```env
EMAIL_SERVER_HOST=mail.privateemail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=contact@yourschool.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@yourschool.com
EMAIL_TO=contact@yourschool.com
```

### Option C: Other SMTP Providers

- **SendGrid**: smtp.sendgrid.net (Port 587)
- **Mailgun**: smtp.mailgun.org (Port 587)
- **AWS SES**: email-smtp.region.amazonaws.com (Port 587)

---

## Step 5: Configure Site Settings (2 minutes)

Update `.env.local` with your school information:

```env
NEXT_PUBLIC_SITE_NAME=Greenwood High School
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

(Update URL to production URL when deploying)

---

## Step 6: Run Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

You should see your school website!

---

## Step 7: Test Admin Panel (5 minutes)

### 7.1 Login to Admin

1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Enter the credentials you created in Step 3
3. You should be redirected to `/admin` dashboard

### 7.2 Test CRUD Operations

**Create a News Article:**

1. Go to **Admin** → **News**
2. Click "Create New Article"
3. Fill in:
   - Title: "Welcome to Our New Website"
   - Content: "We're excited to launch our new website..."
   - ✅ Publish immediately
4. Click "Create Article"
5. View it at [http://localhost:3000/news](http://localhost:3000/news)

**Create an Event:**

1. Go to **Admin** → **Events**
2. Click "Create New Event"
3. Fill in event details
4. Upload an image (optional)
5. ✅ Publish immediately
6. Click "Create Event"
7. View at [http://localhost:3000/events](http://localhost:3000/events)

**Upload Gallery Images:**

1. Go to **Admin** → **Gallery**
2. Fill in title and category
3. Select an image
4. Click "Upload Image"
5. View at [http://localhost:3000/gallery](http://localhost:3000/gallery)

---

## Step 8: Customize Content (20 minutes)

### 8.1 Update Page Content

You can update static page content by modifying the pages in Supabase:

1. Go to **Table Editor** → **pages** table
2. Update content for:
   - `about` - Mission, vision, history
   - `admissions` - Application process, fees
   - `academics` - Curriculum details
   - `contact` - Contact information

### 8.2 Customize Design

**Update Colors** (`tailwind.config.ts`):

```typescript
colors: {
  primary: '#1E40AF',  // Change to your school color
  accent: '#FBBF24',   // Change accent color
}
```

**Update Logo** (`components/layout/Navbar.tsx`):

- Replace the circle with your logo image
- Update school name

**Update Footer** (`components/layout/Footer.tsx`):

- Update contact information
- Add social media links
- Update address and phone

### 8.3 Add Staff Members

Currently, you can add staff members directly in Supabase:

1. Go to **Table Editor** → **staff**
2. Click "Insert" → "Insert row"
3. Fill in staff details
4. They'll appear on `/about` page

---

## Step 9: Test Contact Form (5 minutes)

1. Go to [http://localhost:3000/contact](http://localhost:3000/contact)
2. Fill in and submit the contact form
3. Check:
   - Email received at configured address
   - Submission saved in Supabase **contact_submissions** table

---

## Step 10: Deploy to Production (30 minutes)

Choose your deployment method:

### Option A: Vercel (Recommended)

See **DEPLOYMENT.md** → "Deploy to Vercel" section

### Option B: cPanel

See **DEPLOYMENT.md** → "Deploy to cPanel" section

---

## Common Issues & Solutions

### Issue: "Invalid API key"

**Solution**:

- Double-check `.env.local` has correct Supabase keys
- Restart dev server after changing environment variables
- Ensure no extra spaces in `.env.local`

### Issue: Images not uploading

**Solution**:

- Verify `school-images` bucket exists in Supabase Storage
- Check bucket is set to public
- Ensure file size is under 10MB

### Issue: Admin login not working

**Solution**:

- Verify user was created in Supabase Authentication
- Check "Auto Confirm User" was enabled
- Try password reset in Supabase dashboard

### Issue: Contact form not sending emails

**Solution**:

- Test SMTP credentials separately
- Check email server allows connections from your IP
- Verify port 587 is not blocked by firewall
- Try Gmail SMTP for testing

### Issue: "Row Level Security" errors

**Solution**:

- Ensure you ran `supabase-schema.sql` completely
- Check RLS policies were created in Supabase
- Re-run the SQL script if needed

---

## Next Steps

### Content Creation

1. ✅ Create 5-10 news articles
2. ✅ Add upcoming events
3. ✅ Upload gallery images (20-30 photos)
4. ✅ Add all staff members
5. ✅ Update About page content
6. ✅ Configure Admissions information

### SEO Optimization

1. ✅ Update meta descriptions for each page
2. ✅ Add Open Graph images
3. ✅ Submit sitemap to Google Search Console
4. ✅ Set up Google Analytics

### Performance

1. ✅ Optimize images before upload
2. ✅ Enable caching in production
3. ✅ Monitor Core Web Vitals

---

## Maintenance Schedule

### Daily

- Check contact form submissions
- Monitor site uptime

### Weekly

- Create news articles
- Update events
- Add new gallery photos

### Monthly

- Review analytics
- Update static page content
- Backup Supabase data

### Quarterly

- Security updates (`npm update`)
- Review and archive old events
- Update staff information

---

## Getting Help

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Community

- [Next.js Discord](https://discord.gg/nextjs)
- [Supabase Discord](https://discord.supabase.com)

### Troubleshooting

- Check browser console for errors
- Review Supabase logs
- Check Vercel deployment logs

---

## Checklist

Use this checklist to ensure everything is set up:

**Setup:**

- [ ] Node.js and npm installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created and configured
- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Storage bucket created
- [ ] Admin user created

**Configuration:**

- [ ] Email SMTP configured
- [ ] Site name and URL set
- [ ] Colors customized
- [ ] Logo updated
- [ ] Footer information updated

**Content:**

- [ ] At least 3 news articles created
- [ ] At least 3 events added
- [ ] Gallery images uploaded
- [ ] Staff members added
- [ ] About page content updated
- [ ] Contact information updated

**Testing:**

- [ ] All pages load correctly
- [ ] Admin login works
- [ ] Can create/edit/delete content
- [ ] Images upload successfully
- [ ] Contact form sends emails
- [ ] Mobile responsive design verified

**Deployment:**

- [ ] Deployed to Vercel or cPanel
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] DNS records propagated
- [ ] Production environment variables set
- [ ] Sitemap submitted to search engines

---

Congratulations! 🎉 Your school website is now live!













