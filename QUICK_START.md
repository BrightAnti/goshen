# ⚡ Quick Start Guide

Get your school website running in 15 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Code editor (VS Code recommended)
- [ ] Modern web browser

---

## 🚀 15-Minute Setup

### Step 1: Install (2 min)

```bash
cd goshen
npm install
```

### Step 2: Environment (1 min)

```bash
cp .env.local.example .env.local
```

### Step 3: Supabase Setup (5 min)

**3.1 Create Project**

1. Go to https://supabase.com
2. Click "New Project"
3. Name: "school-website"
4. Wait 2 minutes for creation

**3.2 Get Keys**

1. Settings → API
2. Copy to `.env.local`:
   - URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role → `SUPABASE_SERVICE_ROLE_KEY`

**3.3 Create Database**

1. SQL Editor → New Query
2. Copy/paste ALL of `supabase-schema.sql`
3. Click RUN

**3.4 Create Admin**

1. Authentication → Users → Add User
2. Email: your-email@example.com
3. Password: (make it strong)
4. ✅ Auto Confirm User
5. Save credentials!

### Step 4: Configure Site (1 min)

Edit `.env.local`:

```env
NEXT_PUBLIC_SITE_NAME=Your School Name
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Gmail SMTP (for testing)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourschool.com
EMAIL_TO=admin@yourschool.com
```

### Step 5: Run (1 min)

```bash
npm run dev
```

Open: http://localhost:3000

### Step 6: Test Admin (5 min)

**6.1 Login**

- Go to: http://localhost:3000/admin/login
- Use email/password from Step 3.4

**6.2 Create First News**

1. Admin → News → Create New Article
2. Title: "Welcome to Our Website"
3. Content: "We're excited to launch..."
4. ✅ Publish immediately
5. Save

**6.3 View It**

- Go to: http://localhost:3000/news
- Your article is live! 🎉

---

## 🎨 Quick Customization (5 min)

### Change School Name

`.env.local`:

```env
NEXT_PUBLIC_SITE_NAME=Greenwood High School
```

### Change Colors

`tailwind.config.ts`:

```typescript
colors: {
  primary: '#1E40AF',  // Change this
  accent: '#FBBF24',   // And this
}
```

Restart dev server to see changes.

---

## 📋 Essential Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Check code quality

# Deployment
npm run export       # Build static export (cPanel)
```

---

## 🔗 Important URLs

**Local Development:**

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- News: http://localhost:3000/news
- Events: http://localhost:3000/events
- Gallery: http://localhost:3000/gallery

**Supabase Dashboard:**

- https://app.supabase.com (your project)

---

## ✅ Quick Checklist

### Initial Setup

- [ ] Dependencies installed
- [ ] `.env.local` configured
- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Admin user created
- [ ] Dev server running
- [ ] Can access website
- [ ] Can login to admin

### First Content

- [ ] Created first news article
- [ ] Added first event
- [ ] Uploaded first gallery image
- [ ] Updated about page content
- [ ] Tested contact form

### Ready to Deploy

- [ ] All pages tested
- [ ] Colors customized
- [ ] School name updated
- [ ] Logo added (optional)
- [ ] At least 5 news articles
- [ ] At least 3 events
- [ ] Gallery has 10+ images

---

## 🆘 Common Issues

### "Invalid API key"

**Fix:** Check `.env.local` has correct Supabase keys (no extra spaces)

### "Cannot connect to database"

**Fix:** Ensure `supabase-schema.sql` was run completely in SQL Editor

### "Images not uploading"

**Fix:** Verify `school-images` bucket exists and is public in Supabase Storage

### Admin login fails

**Fix:** Ensure "Auto Confirm User" was checked when creating admin user

### Changes not showing

**Fix:** Restart dev server (`Ctrl+C` then `npm run dev`)

---

## 📱 Test on Mobile

```bash
# Find your local IP
ipconfig          # Windows
ifconfig          # Mac/Linux

# Access from phone on same network
http://YOUR_IP:3000
```

---

## 🚀 Deploy to Vercel (10 min)

### Step 1: Push to GitHub (3 min)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Vercel (5 min)

1. Go to https://vercel.com
2. New Project → Import from GitHub
3. Select your repository
4. Add environment variables (from `.env.local`)
5. Deploy!

### Step 3: Update URLs (2 min)

After deployment, update `.env.local` for local dev:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.vercel.app
```

And in Vercel dashboard for production.

---

## 📚 Next Steps

After quick start, read these in order:

1. **SETUP_GUIDE.md** - Detailed setup walkthrough
2. **FEATURES.md** - All features documentation
3. **DEPLOYMENT.md** - Production deployment
4. **README.md** - Complete documentation

---

## 💡 Pro Tips

1. **Use Chrome DevTools** - F12 to debug
2. **Check Console** - Errors show here
3. **Supabase Logs** - Check for backend errors
4. **Test Mobile First** - Most users are on mobile
5. **Backup .env.local** - Keep it safe and secure

---

## 🎯 Your First Day Plan

### Morning (2 hours)

- ✅ Complete quick start setup
- ✅ Customize colors and name
- ✅ Create 3 news articles
- ✅ Add 3 events

### Afternoon (2 hours)

- ✅ Upload 20 gallery images
- ✅ Update about page content
- ✅ Test contact form
- ✅ Test all pages on mobile

### Evening (1 hour)

- ✅ Deploy to Vercel
- ✅ Share preview link with team
- ✅ Gather feedback

---

## 🎉 You're Done!

Website running? Admin working? First article created?

**Congratulations!** You're ready to build your school's online presence.

---

## 📞 Need Help?

1. Check `SETUP_GUIDE.md` for detailed steps
2. Read `FEATURES.md` for feature documentation
3. Review browser console for errors
4. Check Supabase dashboard for backend issues

---

## 🌟 What's Next?

Choose your path:

**Content Creator?**
→ Start adding news, events, and images via admin panel

**Developer?**
→ Customize design, add features, check code structure

**Administrator?**
→ Plan content strategy, assign team roles, prepare for launch

---

**Remember**: Start small, launch fast, improve continuously!

Good luck! 🚀

















