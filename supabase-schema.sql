-- GDGoC IET DAVV Database Schema
-- This creates all necessary tables for the application

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT DEFAULT 'gdsc-blue',
  attendees INTEGER DEFAULT 0,
  image TEXT,
  registration_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  profile_type TEXT NOT NULL DEFAULT 'Mentor'
    CHECK (profile_type IN ('Lead', 'Co-Lead', 'Mentor', 'Faculty Mentor', 'Former Leads')),
  image TEXT NOT NULL,
  bio TEXT NOT NULL,
  linkedin TEXT,
  github TEXT,
  twitter TEXT,
  instagram TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'event',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  github_url TEXT,
  live_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'web',
  status TEXT NOT NULL DEFAULT 'planned',
  team_members TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO events (title, date, time, type, description, color, attendees, registration_link) VALUES
('Introduction to Machine Learning', 'Dec 15, 2024', '2:00 PM - 5:00 PM', 'Workshop', 'Learn the fundamentals of ML with hands-on exercises using Python and popular libraries like scikit-learn.', 'gdsc-blue', 85, 'https://forms.google.com/ml-workshop'),
('Android Development Bootcamp', 'Dec 20, 2024', '10:00 AM - 4:00 PM', 'Bootcamp', 'Build your first Android app from scratch using Kotlin and Android Studio.', 'gdsc-green', 120, 'https://forms.google.com/android-bootcamp'),
('Web Development with React', 'Dec 25, 2024', '1:00 PM - 6:00 PM', 'Workshop', 'Modern web development using React, TypeScript, and best practices for building scalable applications.', 'gdsc-red', 95, 'https://forms.google.com/react-workshop'),
('Cloud Computing with Google Cloud', 'Jan 5, 2025', '3:00 PM - 6:00 PM', 'Workshop', 'Explore Google Cloud Platform services and deploy your applications to the cloud.', 'gdsc-yellow', 67, 'https://forms.google.com/gcp-workshop')
ON CONFLICT DO NOTHING;

INSERT INTO team_members (name, role, image, bio, linkedin, github, display_order) VALUES
('Atharv Garg', 'Lead', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Passionate about full-stack development and community building. Leading GDGoC IET DAVV with focus on creating an inclusive tech environment.', 'https://linkedin.com/in/atharv-garg', 'https://github.com/atharv-garg', 1),
('Sarah Kumar', 'Technical Lead', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400', 'Specializes in machine learning and data science. Loves organizing workshops and helping others learn new technologies.', 'https://linkedin.com/in/sarah-kumar', 'https://github.com/sarah-kumar', 2),
('Rahul Sharma', 'Design Lead', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'UI/UX designer with expertise in creating intuitive user experiences. Passionate about design systems and accessibility.', 'https://linkedin.com/in/rahul-sharma', 'https://github.com/rahul-sharma', 3)
ON CONFLICT DO NOTHING;

INSERT INTO gallery_items (title, description, image, date, category, display_order) VALUES
('Web Development Workshop', 'Students learning React and modern web technologies in our intensive workshop session.', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', '2024-11-15', 'workshop', 3),
('Community Meetup', 'Our monthly community gathering and networking event with industry professionals.', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800', '2024-11-20', 'community', 2),
('Coding Competition', 'Annual coding competition with exciting challenges and prizes for participants.', 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800', '2024-10-25', 'competition', 1)
ON CONFLICT DO NOTHING;

INSERT INTO projects (title, description, image, github_url, live_url, tech_stack, category, status, team_members, display_order) VALUES
('GDGoC Website', 'Modern, responsive website for our community built with React and TypeScript. Features admin panel, event management, and community showcase.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'https://github.com/gdgoc-iet-davv/website', 'https://gdgoc-iet-davv.netlify.app', '{"React","TypeScript","Tailwind CSS","Supabase","Netlify"}', 'web', 'completed', '{"Atharv Garg","Sarah Kumar","Rahul Sharma"}', 1),
('Event Management App', 'Mobile app for managing community events and registrations with real-time notifications and QR code check-ins.', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800', 'https://github.com/gdgoc-iet-davv/event-app', NULL, '{"React Native","Firebase","Node.js","Express"}', 'mobile', 'in_progress', '{"Tech Team","Mobile Development Squad"}', 2),
('AI Study Buddy', 'Machine learning powered study assistant that helps students with personalized learning paths and progress tracking.', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', 'https://github.com/gdgoc-iet-davv/ai-study-buddy', NULL, '{"Python","TensorFlow","FastAPI","React","PostgreSQL"}', 'ai', 'planned', '{"AI Team","Backend Squad"}', 3)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (but allow public read access)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery_items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
