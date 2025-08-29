-- ==================================================
-- FIX RLS POLICIES FOR FACULTY_AND_ALUMNI TABLE
-- ==================================================
-- Run this in your Supabase SQL Editor to fix permission issues

-- Drop existing policies (if any issues)
DROP POLICY IF EXISTS "Enable read access for all users" ON public.faculty_and_alumni;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.faculty_and_alumni;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.faculty_and_alumni;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.faculty_and_alumni;

-- Create permissive policies for testing
-- WARNING: These policies are very permissive and should be tightened for production

-- Allow public read access (this should work)
CREATE POLICY "public_read_faculty_alumni" ON public.faculty_and_alumni
  FOR SELECT USING (true);

-- Allow all operations for now (for debugging)
-- In production, you'd want to restrict these to authenticated users
CREATE POLICY "allow_all_insert_faculty_alumni" ON public.faculty_and_alumni
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_all_update_faculty_alumni" ON public.faculty_and_alumni
  FOR UPDATE USING (true);

CREATE POLICY "allow_all_delete_faculty_alumni" ON public.faculty_and_alumni
  FOR DELETE USING (true);

-- Verify the table structure and policies
SELECT schemaname, tablename, rowsecurity, policies 
FROM pg_tables 
LEFT JOIN (
  SELECT schemaname, tablename, count(*) as policies 
  FROM pg_policies 
  WHERE tablename = 'faculty_and_alumni' 
  GROUP BY schemaname, tablename
) pol USING (schemaname, tablename)
WHERE tablename = 'faculty_and_alumni';

-- Show all policies for the table
SELECT * FROM pg_policies WHERE tablename = 'faculty_and_alumni';

-- Test the table with a simple query
SELECT COUNT(*) as total_records FROM public.faculty_and_alumni;
SELECT * FROM public.faculty_and_alumni LIMIT 5;
