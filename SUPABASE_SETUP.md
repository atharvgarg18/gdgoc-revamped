# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your `Project URL` and `anon key`

## 2. Set Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Run SQL Commands in Supabase SQL Editor

Copy and paste these SQL commands in your Supabase SQL Editor:

```sql
-- Enable Row Level Security
ALTER TABLE IF EXISTS public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Create Events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    color TEXT NOT NULL CHECK (color IN ('gdsc-blue', 'gdsc-red', 'gdsc-yellow', 'gdsc-green')),
    attendees INTEGER DEFAULT 0,
    image TEXT,
    registration_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Team Members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image TEXT NOT NULL,
    bio TEXT NOT NULL,
    linkedin TEXT,
    github TEXT,
    twitter TEXT,
    instagram TEXT,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Gallery Items table
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    date DATE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('workshop', 'event', 'competition', 'community')),
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create policies for public read access
CREATE POLICY "Allow public read access on events" ON public.events
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on team_members" ON public.team_members
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on gallery_items" ON public.gallery_items
    FOR SELECT USING (true);

-- Create policies for admin write access (for admin panel)
CREATE POLICY "Allow all operations on events" ON public.events
    FOR ALL USING (true);

CREATE POLICY "Allow all operations on team_members" ON public.team_members
    FOR ALL USING (true);

CREATE POLICY "Allow all operations on gallery_items" ON public.gallery_items
    FOR ALL USING (true);

-- Insert sample data
INSERT INTO public.events (title, date, time, type, description, color, attendees) VALUES
('Introduction to Machine Learning', 'Dec 15, 2024', '2:00 PM - 5:00 PM', 'Workshop', 'Learn the fundamentals of ML with hands-on exercises', 'gdsc-blue', 85),
('Android Development Bootcamp', 'Dec 20, 2024', '10:00 AM - 4:00 PM', 'Bootcamp', 'Build your first Android app from scratch', 'gdsc-green', 120),
('Web Development with React', 'Dec 25, 2024', '1:00 PM - 6:00 PM', 'Workshop', 'Modern web development using React and TypeScript', 'gdsc-red', 95),
('Cloud Computing Fundamentals', 'Jan 5, 2025', '11:00 AM - 3:00 PM', 'Seminar', 'Introduction to Google Cloud Platform services', 'gdsc-yellow', 75);

INSERT INTO public.team_members (name, role, image, bio, linkedin, github, display_order) VALUES
('Atharv Garg', 'Lead', 'https://via.placeholder.com/300x300', 'Passionate about full-stack development and community building', '#', '#', 1),
('Core Member 1', 'Technical Lead', 'https://via.placeholder.com/300x300', 'Specializes in machine learning and data science', '#', '#', 2),
('Core Member 2', 'Design Lead', 'https://via.placeholder.com/300x300', 'UI/UX designer with a passion for creating beautiful experiences', '#', '#', 3),
('Core Member 3', 'Event Coordinator', 'https://via.placeholder.com/300x300', 'Organizing amazing events and building community connections', '#', '#', 4);

INSERT INTO public.gallery_items (title, description, image, date, category, display_order) VALUES
('Web Development Workshop', 'Students learning React and modern web technologies', 'https://via.placeholder.com/400x300', '2024-11-15', 'workshop', 2),
('Community Meetup', 'Our monthly community gathering and networking event', 'https://via.placeholder.com/400x300', '2024-11-20', 'community', 1);
```

## 4. Environment Variables for Production

For Netlify deployment, add these environment variables in your Netlify dashboard:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## 5. Test the Setup

After running the SQL commands and setting environment variables, your admin panel should work with persistent data storage.
