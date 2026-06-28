-- Cleanup Script: Remove old tables (Gallery, Staff, Pages, Contact Submissions)
-- Run this SQL in your Supabase SQL Editor AFTER backing up any important data
-- WARNING: This will permanently delete all data in these tables!

-- Drop old tables and their associated policies
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS pages CASCADE;
DROP TABLE IF EXISTS staff CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;

-- Note: The CASCADE keyword will automatically drop:
-- - All indexes on these tables
-- - All policies (RLS) on these tables
-- - All foreign key constraints referencing these tables

-- Verify the cleanup
-- Run this to see remaining tables:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' AND table_type = 'BASE TABLE';



