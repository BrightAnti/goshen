-- School Website Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- News table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  description TEXT NOT NULL,
  location TEXT,
  image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  photo TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pages table (for dynamic content management)
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_staff_department ON staff(department);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view published news" ON news
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view published events" ON events
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view gallery" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Public can view staff" ON staff
  FOR SELECT USING (true);

CREATE POLICY "Public can view pages" ON pages
  FOR SELECT USING (true);

-- Admin full access (authenticated users)
CREATE POLICY "Authenticated users can do everything on news" ON news
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on gallery" ON gallery
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on staff" ON staff
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on pages" ON pages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage contact submissions" ON contact_submissions
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('school-images', 'school-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view images" ON storage.objects FOR SELECT
  USING (bucket_id = 'school-images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'school-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update images" ON storage.objects FOR UPDATE
  USING (bucket_id = 'school-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete images" ON storage.objects FOR DELETE
  USING (bucket_id = 'school-images' AND auth.role() = 'authenticated');

-- Insert default page content
INSERT INTO pages (slug, title, content) VALUES
('about', 'About Us', '{"mission": "Our mission statement goes here", "vision": "Our vision statement goes here", "history": "School history goes here"}'),
('admissions', 'Admissions', '{"process": "Application process details", "fees": "Fee structure", "faqs": []}'),
('academics', 'Academics', '{"curriculum": "Curriculum overview", "departments": []}'),
('contact', 'Contact Us', '{"address": "School address", "phone": "School phone", "email": "contact@school.com", "hours": "Mon-Fri: 8AM-4PM"}')
ON CONFLICT (slug) DO NOTHING;



