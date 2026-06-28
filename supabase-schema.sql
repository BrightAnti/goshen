-- School Website Database Schema
-- Run this SQL in your Supabase SQL Editor
-- This schema only includes News and Events tables

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(published);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public can view published news" ON news;
DROP POLICY IF EXISTS "Public can view published events" ON events;
DROP POLICY IF EXISTS "Authenticated users can do everything on news" ON news;
DROP POLICY IF EXISTS "Authenticated users can do everything on events" ON events;

-- Public read access for published content
CREATE POLICY "Public can view published news" ON news
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view published events" ON events
  FOR SELECT USING (published = true);

-- Admin full access (authenticated users)
CREATE POLICY "Authenticated users can do everything on news" ON news
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('school-images', 'school-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Storage policies
CREATE POLICY "Public can view images" ON storage.objects FOR SELECT
  USING (bucket_id = 'school-images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'school-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update images" ON storage.objects FOR UPDATE
  USING (bucket_id = 'school-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete images" ON storage.objects FOR DELETE
  USING (bucket_id = 'school-images' AND auth.role() = 'authenticated');
