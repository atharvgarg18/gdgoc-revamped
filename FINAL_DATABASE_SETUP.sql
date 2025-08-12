-- =====================================================
-- GDGoC IET DAVV - PRODUCTION READY DATABASE SCHEMA
-- Copy this entire script to Supabase SQL Editor and run it
-- =====================================================

-- Clean up existing tables if they exist
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS gallery_items CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS events CASCADE;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- EVENTS TABLE
-- =====================================================
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  type VARCHAR(100) NOT NULL,
  color VARCHAR(50) DEFAULT 'gdsc-blue' CHECK (color IN ('gdsc-blue', 'gdsc-red', 'gdsc-yellow', 'gdsc-green')),
  attendees INTEGER DEFAULT 0,
  registration_link TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TEAM MEMBERS TABLE
-- =====================================================
CREATE TABLE team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  linkedin VARCHAR(500),
  github VARCHAR(500),
  twitter VARCHAR(500),
  instagram VARCHAR(500),
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- GALLERY ITEMS TABLE
-- =====================================================
CREATE TABLE gallery_items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  date VARCHAR(50) NOT NULL,
  category VARCHAR(100) DEFAULT 'event' CHECK (category IN ('workshop', 'event', 'competition', 'community')),
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  category VARCHAR(50) DEFAULT 'web' CHECK (category IN ('web', 'mobile', 'ai', 'blockchain', 'iot', 'other')),
  status VARCHAR(50) DEFAULT 'planned' CHECK (status IN ('completed', 'in_progress', 'planned')),
  team_members TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INSERT PRODUCTION-READY SAMPLE DATA
-- =====================================================

-- Events Data
INSERT INTO events (title, description, date, time, type, color, attendees, registration_link, image) VALUES
('React & TypeScript Workshop', 'Master modern web development with React 18, TypeScript, and best practices. Build a complete project from scratch.', 'February 15, 2025', '2:00 PM - 6:00 PM', 'Workshop', 'gdsc-blue', 124, 'https://forms.gle/your-react-workshop', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'),
('AI/ML with Python Bootcamp', 'Dive into machine learning fundamentals, build ML models, and deploy them using Python and TensorFlow.', 'February 22, 2025', '10:00 AM - 5:00 PM', 'Bootcamp', 'gdsc-green', 89, 'https://forms.gle/your-ml-bootcamp', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'),
('Mobile App Development Sprint', 'Create cross-platform mobile apps using React Native and Firebase. Deploy to app stores.', 'March 1, 2025', '1:00 PM - 7:00 PM', 'Sprint', 'gdsc-red', 67, 'https://forms.gle/your-mobile-sprint', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800'),
('Cloud Computing Seminar', 'Learn about modern cloud platforms, serverless architecture, and deployment strategies.', 'March 8, 2025', '3:00 PM - 5:00 PM', 'Seminar', 'gdsc-yellow', 145, 'https://forms.gle/your-cloud-seminar', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800');

-- Team Members Data
INSERT INTO team_members (name, role, bio, image, linkedin, github, display_order) VALUES
('Atharv Garg', 'Lead & Founder', 'Passionate full-stack developer and community builder leading GDGoC IET DAVV. Expertise in React, Node.js, and cloud technologies. Building the future one developer at a time.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'https://linkedin.com/in/atharvgarg', 'https://github.com/atharvgarg', 1),
('Priya Sharma', 'Technical Lead', 'Machine Learning enthusiast and Python expert. Leading our AI/ML initiatives and research projects. Passionate about making technology accessible to everyone.', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400', 'https://linkedin.com/in/priyasharma', 'https://github.com/priyasharma', 2),
('Rahul Verma', 'Web Development Lead', 'Frontend specialist with expertise in React, Vue.js, and modern web technologies. Creating beautiful and functional user experiences.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 'https://linkedin.com/in/rahulverma', 'https://github.com/rahulverma', 3),
('Ananya Patel', 'Design & UX Lead', 'Creative designer passionate about user experience and interface design. Making technology beautiful and user-friendly.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'https://linkedin.com/in/ananyapatel', 'https://github.com/ananyapatel', 4),
('Karan Singh', 'Mobile Development Lead', 'React Native and Flutter expert building the next generation of mobile applications. Focused on performance and user experience.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', 'https://linkedin.com/in/karansingh', 'https://github.com/karansingh', 5),
('Sneha Gupta', 'Community Manager', 'Building and nurturing our developer community. Organizing events, workshops, and fostering collaboration among members.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', 'https://linkedin.com/in/snehagupta', 'https://github.com/snehagupta', 6);

-- Gallery Items Data
INSERT INTO gallery_items (title, description, image, date, category, display_order) VALUES
('Annual Tech Conference 2024', 'Our flagship event featuring industry leaders, technical talks, and networking opportunities with 300+ participants.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', '2024-12-15', 'event', 1),
('React Workshop Series', 'Intensive hands-on React workshop where students built complete web applications from scratch.', 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800', '2024-11-20', 'workshop', 2),
('Hackathon Champions 2024', 'Celebrating our 48-hour hackathon winners who built innovative solutions for real-world problems.', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800', '2024-10-28', 'competition', 3),
('Community Meetup October', 'Monthly community gathering featuring project showcases, tech talks, and networking sessions.', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800', '2024-10-15', 'community', 4),
('AI/ML Workshop', 'Deep dive into machine learning algorithms and practical implementation using Python and TensorFlow.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', '2024-09-25', 'workshop', 5),
('Web Development Bootcamp', 'Complete web development training covering HTML, CSS, JavaScript, React, and deployment strategies.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', '2024-09-10', 'workshop', 6);

-- Projects Data
INSERT INTO projects (title, description, image, github_url, live_url, tech_stack, category, status, team_members, display_order) VALUES
('GDGoC Website', 'Modern, responsive community website built with React, TypeScript, and Supabase. Features admin panel, event management, and team showcase.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', 'https://github.com/atharvgarg18/gdgoc-website', 'https://gdgoc-iet-davv.netlify.app', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Netlify'], 'web', 'completed', ARRAY['Atharv Garg', 'Rahul Verma', 'Ananya Patel'], 1),
('StudyBuddy App', 'AI-powered study companion mobile app helping students with personalized learning paths and progress tracking.', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', 'https://github.com/gdgoc-iet-davv/studybuddy', NULL, ARRAY['React Native', 'Firebase', 'TensorFlow', 'Node.js'], 'mobile', 'in_progress', ARRAY['Karan Singh', 'Priya Sharma'], 2),
('Campus Event Manager', 'Comprehensive event management system for college events with registration, attendance tracking, and analytics.', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600', 'https://github.com/gdgoc-iet-davv/event-manager', 'https://campus-events.vercel.app', ARRAY['Next.js', 'MongoDB', 'Express.js', 'Chart.js'], 'web', 'completed', ARRAY['Rahul Verma', 'Sneha Gupta'], 3),
('Smart IoT Dashboard', 'IoT device monitoring dashboard for smart campus initiatives with real-time data visualization.', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600', 'https://github.com/gdgoc-iet-davv/iot-dashboard', NULL, ARRAY['Vue.js', 'Arduino', 'MQTT', 'InfluxDB'], 'iot', 'planned', ARRAY['Tech Team', 'Hardware Team'], 4);

-- =====================================================
-- SECURITY POLICIES
-- =====================================================

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery_items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);

-- =====================================================
-- PERFORMANCE INDEXES
-- =====================================================

CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_team_members_display_order ON team_members(display_order);
CREATE INDEX idx_gallery_items_category ON gallery_items(category);
CREATE INDEX idx_gallery_items_date ON gallery_items(date);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);

-- =====================================================
-- AUTO-UPDATE TIMESTAMPS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check if everything was created successfully
SELECT 'events' as table_name, COUNT(*) as row_count FROM events
UNION ALL
SELECT 'team_members' as table_name, COUNT(*) as row_count FROM team_members
UNION ALL
SELECT 'gallery_items' as table_name, COUNT(*) as row_count FROM gallery_items
UNION ALL
SELECT 'projects' as table_name, COUNT(*) as row_count FROM projects;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
-- If you see the verification results above, your database is ready!
-- Expected counts: events(4), team_members(6), gallery_items(6), projects(4)
