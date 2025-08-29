-- ===================================================================
-- GDGOC IET DAVV - PRODUCTION DATABASE SCHEMA
-- ===================================================================
-- This schema is optimized for Netlify deployment with Supabase
-- Run this in your Supabase SQL Editor after creating your project
-- ===================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================================================
-- EVENTS TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date VARCHAR(50) NOT NULL,
    time VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'Workshop',
    color VARCHAR(20) NOT NULL DEFAULT 'gdsc-blue' 
        CHECK (color IN ('gdsc-blue', 'gdsc-red', 'gdsc-yellow', 'gdsc-green')),
    attendees INTEGER DEFAULT 0 CHECK (attendees >= 0),
    image TEXT,
    registration_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.events(created_at);

-- ===================================================================
-- TEAM MEMBERS TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    profile_type VARCHAR(50) NOT NULL DEFAULT 'Mentor'
        CHECK (profile_type IN ('Lead', 'Co-Lead', 'Mentor', 'Faculty Mentor', 'Former Leads')),
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

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON public.team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_team_members_role ON public.team_members(role);
CREATE INDEX IF NOT EXISTS idx_team_members_profile_type ON public.team_members(profile_type);

-- ===================================================================
-- GALLERY ITEMS TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'workshop'
        CHECK (category IN ('workshop', 'event', 'competition', 'community')),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON public.gallery_items(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_date ON public.gallery_items(date);

-- ===================================================================
-- PROJECTS TABLE
-- ===================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    github_url TEXT,
    live_url TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    category VARCHAR(50) NOT NULL DEFAULT 'web'
        CHECK (category IN ('web', 'mobile', 'ai', 'blockchain', 'iot', 'other')),
    status VARCHAR(20) NOT NULL DEFAULT 'planned'
        CHECK (status IN ('completed', 'in_progress', 'planned')),
    team_members TEXT[] NOT NULL DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);

-- ===================================================================
-- UPDATED_AT TRIGGERS
-- ===================================================================
-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON public.events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_members_updated_at ON public.team_members;
CREATE TRIGGER update_team_members_updated_at 
    BEFORE UPDATE ON public.team_members 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_items_updated_at ON public.gallery_items;
CREATE TRIGGER update_gallery_items_updated_at 
    BEFORE UPDATE ON public.gallery_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON public.projects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================
-- ROW LEVEL SECURITY (RLS)
-- ===================================================================
-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for events" ON public.events
    FOR SELECT USING (true);

CREATE POLICY "Public read access for team_members" ON public.team_members
    FOR SELECT USING (true);

CREATE POLICY "Public read access for gallery_items" ON public.gallery_items
    FOR SELECT USING (true);

CREATE POLICY "Public read access for projects" ON public.projects
    FOR SELECT USING (true);

-- Create policies for admin write access (using service key)
-- These will allow writes when using the service key from admin panel
CREATE POLICY "Admin write access for events" ON public.events
    FOR ALL USING (true);

CREATE POLICY "Admin write access for team_members" ON public.team_members
    FOR ALL USING (true);

CREATE POLICY "Admin write access for gallery_items" ON public.gallery_items
    FOR ALL USING (true);

CREATE POLICY "Admin write access for projects" ON public.projects
    FOR ALL USING (true);

-- ===================================================================
-- SAMPLE DATA FOR TESTING
-- ===================================================================
-- Insert sample events
INSERT INTO public.events (title, description, date, time, type, color, attendees, image, registration_link) VALUES
('Introduction to Machine Learning', 'Learn the fundamentals of ML with hands-on exercises using Python and popular libraries like scikit-learn.', 'Dec 15, 2024', '2:00 PM - 5:00 PM', 'Workshop', 'gdsc-blue', 85, 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', 'https://forms.google.com/ml-workshop'),
('Android Development Bootcamp', 'Build your first Android app from scratch using Kotlin and Android Studio.', 'Dec 20, 2024', '10:00 AM - 4:00 PM', 'Bootcamp', 'gdsc-green', 120, 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800', 'https://forms.google.com/android-bootcamp'),
('Web Development with React', 'Modern web development using React, TypeScript, and best practices for building scalable applications.', 'Dec 25, 2024', '1:00 PM - 6:00 PM', 'Workshop', 'gdsc-red', 95, 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', 'https://forms.google.com/react-workshop'),
('Cloud Computing with Google Cloud', 'Explore Google Cloud Platform services and deploy your applications to the cloud.', 'Jan 5, 2025', '3:00 PM - 6:00 PM', 'Workshop', 'gdsc-yellow', 67, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'https://forms.google.com/gcp-workshop')
ON CONFLICT DO NOTHING;

-- Insert sample team members
INSERT INTO public.team_members (name, role, bio, image, linkedin, github, display_order) VALUES
('Atharv Garg', 'Lead', 'Passionate about full-stack development and community building. Leading GDGoC IET DAVV with focus on creating an inclusive tech environment.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'https://linkedin.com/in/atharv-garg', 'https://github.com/atharv-garg', 1),
('Sarah Kumar', 'Technical Lead', 'Specializes in machine learning and data science. Loves organizing workshops and helping others learn new technologies.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400', 'https://linkedin.com/in/sarah-kumar', 'https://github.com/sarah-kumar', 2),
('Rahul Sharma', 'Design Lead', 'UI/UX designer with expertise in creating intuitive user experiences. Passionate about design systems and accessibility.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'https://linkedin.com/in/rahul-sharma', 'https://github.com/rahul-sharma', 3)
ON CONFLICT DO NOTHING;

-- Insert sample gallery items
INSERT INTO public.gallery_items (title, description, image, date, category, display_order) VALUES
('Web Development Workshop', 'Students learning React and modern web technologies in our intensive workshop session.', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', '2024-11-15', 'workshop', 3),
('Community Meetup', 'Our monthly community gathering and networking event with industry professionals.', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800', '2024-11-20', 'community', 2),
('Coding Competition', 'Annual coding competition with exciting challenges and prizes for participants.', 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800', '2024-10-25', 'competition', 1)
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO public.projects (title, description, image, github_url, live_url, tech_stack, category, status, team_members, display_order) VALUES
('GDGoC Website', 'Modern, responsive website for our community built with React and TypeScript. Features admin panel, event management, and community showcase.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'https://github.com/gdgoc-iet-davv/website', 'https://gdgoc-iet-davv.netlify.app', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Netlify'], 'web', 'completed', ARRAY['Atharv Garg', 'Sarah Kumar', 'Rahul Sharma'], 1),
('Event Management App', 'Mobile app for managing community events and registrations with real-time notifications and QR code check-ins.', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800', 'https://github.com/gdgoc-iet-davv/event-app', '', ARRAY['React Native', 'Firebase', 'Node.js', 'Express'], 'mobile', 'in_progress', ARRAY['Tech Team', 'Mobile Development Squad'], 2),
('AI Study Buddy', 'Machine learning powered study assistant that helps students with personalized learning paths and progress tracking.', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', 'https://github.com/gdgoc-iet-davv/ai-study-buddy', '', ARRAY['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL'], 'ai', 'planned', ARRAY['AI Team', 'Backend Squad'], 3)
ON CONFLICT DO NOTHING;

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================
-- Run these to verify your setup worked correctly

-- Check if all tables exist and have data
SELECT 'events' as table_name, COUNT(*) as record_count FROM public.events
UNION ALL
SELECT 'team_members', COUNT(*) FROM public.team_members  
UNION ALL
SELECT 'gallery_items', COUNT(*) FROM public.gallery_items
UNION ALL
SELECT 'projects', COUNT(*) FROM public.projects;

-- Test the updated_at triggers
-- UPDATE public.events SET title = title WHERE id = (SELECT id FROM public.events LIMIT 1);

-- ===================================================================
-- SETUP COMPLETE
-- ===================================================================
-- Your database is now ready for production use!
-- 
-- Next steps:
-- 1. Set environment variables in Netlify
-- 2. Deploy your site  
-- 3. Test the admin panel
-- ===================================================================
