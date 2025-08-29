-- ===================================================================
-- GDGOC IET DAVV - FACULTY AND ALUMNI TABLE CREATION
-- ===================================================================
-- Run this script in your Supabase SQL Editor 
-- This creates a separate table for Faculty Mentors and Former Leads
-- to avoid any issues with the existing team_members table
-- ===================================================================

-- Create the new table for faculty mentors and former leads
CREATE TABLE IF NOT EXISTS public.faculty_and_alumni (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    profile_type VARCHAR(50) NOT NULL
        CHECK (profile_type IN ('Faculty Mentor', 'Former Leads')),
    bio TEXT NOT NULL,
    image TEXT NOT NULL,
    linkedin TEXT,
    github TEXT,
    twitter TEXT,
    instagram TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_faculty_alumni_display_order ON public.faculty_and_alumni(display_order);
CREATE INDEX IF NOT EXISTS idx_faculty_alumni_profile_type ON public.faculty_and_alumni(profile_type);
CREATE INDEX IF NOT EXISTS idx_faculty_alumni_created_at ON public.faculty_and_alumni(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.faculty_and_alumni ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON public.faculty_and_alumni
    FOR SELECT USING (true);

-- Create policies for authenticated insert/update/delete (for admin)
CREATE POLICY "Enable insert for authenticated users only" ON public.faculty_and_alumni
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON public.faculty_and_alumni
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON public.faculty_and_alumni
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some sample data (optional)
INSERT INTO public.faculty_and_alumni (name, role, profile_type, bio, image, linkedin, display_order)
VALUES 
    ('Dr. Priya Singh', 'Faculty Advisor', 'Faculty Mentor', 
     'Associate Professor with expertise in Computer Science and AI. Guides the community with academic excellence and industry insights.',
     'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
     'https://www.linkedin.com/company/gdgoc-iet-davv', 1),
    ('Vikram Sharma', 'Former Lead (2022-23)', 'Former Leads',
     'Former community leader who established the foundation of GDGoC IET DAVV. Now working as Software Engineer at Google.',
     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
     'https://www.linkedin.com/company/gdgoc-iet-davv', 2)
ON CONFLICT DO NOTHING;

-- Verify the table creation
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable, 
    column_default 
FROM information_schema.columns 
WHERE table_name = 'faculty_and_alumni' 
ORDER BY ordinal_position;

-- Show the sample data
SELECT * FROM public.faculty_and_alumni ORDER BY display_order;
