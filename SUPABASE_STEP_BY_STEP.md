# 🚀 Step-by-Step Supabase Setup Guide

## Phase 1: Create Supabase Account & Project

### Step 1: Sign Up for Supabase

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub (recommended) or email

### Step 2: Create New Project

1. Click **"New Project"**
2. Select your organization
3. Fill project details:
   - **Name**: `gdgoc-iet-davv`
   - **Database Password**: Create strong password (SAVE THIS!)
   - **Region**: `ap-south-1` (Asia Pacific Mumbai) - closest to India
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup completion

## Phase 2: Get Your Project Credentials

### Step 3: Copy Project Details

1. In Supabase dashboard, click **Settings** (gear icon)
2. Click **API** in left sidebar
3. Copy these values:
   ```
   Project URL: https://[project-id].supabase.co
   Project API Keys → anon/public: eyJ[long-string]
   ```
4. **Save these safely** - you'll need them next

## Phase 3: Create Database Schema

### Step 4: Open SQL Editor

1. In Supabase dashboard, click **SQL Editor**
2. Click **"New Query"**

### Step 5: Run Database Setup Script

Copy and paste this complete SQL script:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 📅 Events Table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date VARCHAR(50),
  time VARCHAR(50),
  type VARCHAR(100),
  color VARCHAR(50) DEFAULT 'gdsc-blue',
  attendees INTEGER DEFAULT 0,
  registration_link TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 👥 Team Members Table
CREATE TABLE team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  bio TEXT,
  image VARCHAR(500),
  linkedin VARCHAR(500),
  github VARCHAR(500),
  twitter VARCHAR(500),
  instagram VARCHAR(500),
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 🖼️ Gallery Items Table
CREATE TABLE gallery_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  image VARCHAR(500) NOT NULL,
  date VARCHAR(50),
  category VARCHAR(100) DEFAULT 'general',
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 🚀 Projects Table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  tech_stack TEXT[],
  category VARCHAR(50) DEFAULT 'web',
  status VARCHAR(50) DEFAULT 'planned',
  team_members TEXT[],
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO events (title, description, date, time, type, color, attendees, registration_link) VALUES
('React Workshop', 'Learn React fundamentals and build your first app', 'Jan 15, 2025', '2:00 PM - 5:00 PM', 'Workshop', 'gdsc-blue', 45, 'https://forms.gle/your-form-link'),
('AI/ML Seminar', 'Introduction to Machine Learning with Python', 'Jan 20, 2025', '3:00 PM - 6:00 PM', 'Seminar', 'gdsc-green', 38, 'https://forms.gle/your-form-link'),
('Web Development Bootcamp', 'Complete web development from basics to advanced', 'Jan 25, 2025', '10:00 AM - 4:00 PM', 'Bootcamp', 'gdsc-red', 65, 'https://forms.gle/your-form-link');

INSERT INTO team_members (name, role, bio, image, linkedin, github, display_order) VALUES
('Atharv Garg', 'Lead', 'Passionate about full-stack development and community building. Leading GDGoC IET DAVV with vision and dedication.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'https://linkedin.com/in/atharvgarg', 'https://github.com/atharvgarg', 1),
('Team Member 2', 'Technical Lead', 'Expert in machine learning and data science. Mentoring students in AI/ML projects and research.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400', 'https://linkedin.com/in/member2', 'https://github.com/member2', 2),
('Team Member 3', 'Web Development Lead', 'Full-stack developer specializing in React, Node.js, and cloud technologies.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'https://linkedin.com/in/member3', 'https://github.com/member3', 3);

INSERT INTO gallery_items (title, description, image, date, category, display_order) VALUES
('Annual Tech Conference 2024', 'Our biggest tech event with 200+ attendees and industry experts', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', '2024-11-15', 'event', 1),
('React Workshop Session', 'Hands-on coding workshop teaching React fundamentals', 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800', '2024-11-10', 'workshop', 2),
('Hackathon Winners', 'Celebrating our hackathon champions and their innovative projects', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800', '2024-10-28', 'competition', 3);

INSERT INTO projects (title, description, image, github_url, live_url, tech_stack, category, status, team_members, display_order) VALUES
('GDGoC Website', 'Modern, responsive website for our community built with React and TypeScript. Features event management, team showcase, and admin panel.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', 'https://github.com/atharvgarg18/gdgoc-revamped', 'https://gdgoc-iet-davv.netlify.app', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase'], 'web', 'completed', ARRAY['Atharv Garg', 'Development Team'], 1),
('Event Management App', 'Mobile application for managing community events, registrations, and attendee tracking', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600', 'https://github.com/gdgoc-iet-davv/event-app', NULL, ARRAY['React Native', 'Firebase', 'Node.js', 'Express'], 'mobile', 'in_progress', ARRAY['Mobile Development Team', 'Backend Team'], 2);

-- Enable Row Level Security (optional for public access)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery_items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
```

### Step 6: Execute the Script

1. Click **"Run"** button
2. You should see success messages
3. Check **Table Editor** to verify tables were created

## Phase 4: Connect Your Website

### Step 7: Set Environment Variables

**Option A - I can set them for you:**
Share your Supabase URL and API key with me, I'll use DevServerControl to set them securely.

**Option B - Manual setup:**

1. Create `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 8: Test Connection

1. Restart your development server
2. Visit your website
3. Go to `/admin` (password: `gdgoc2024admin`)
4. Try adding/editing content
5. Check if data appears on main pages

## Phase 5: Production Deployment

### Step 9: Deploy to Netlify

1. In Netlify dashboard, go to your site
2. Go to **Site configuration** → **Environment variables**
3. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
4. Redeploy your site

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] All 4 tables exist with sample data
- [ ] Environment variables set
- [ ] Admin panel works (adds/edits data)
- [ ] Real data appears on website
- [ ] Production deployment configured

---

**Need Help?** If any step fails, let me know the exact error message and I'll help troubleshoot!
