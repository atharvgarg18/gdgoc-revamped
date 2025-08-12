-- =================================
-- Enhanced Events Table Structure
-- =================================

-- Add new columns to improve functionality
DO $$ 
BEGIN
    -- Add status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'events' AND column_name = 'status') THEN
        ALTER TABLE events ADD COLUMN status VARCHAR(20) DEFAULT 'published';
    END IF;

    -- Add featured column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'events' AND column_name = 'featured') THEN
        ALTER TABLE events ADD COLUMN featured BOOLEAN DEFAULT false;
    END IF;

    -- Add max_attendees column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'events' AND column_name = 'max_attendees') THEN
        ALTER TABLE events ADD COLUMN max_attendees INTEGER DEFAULT 100;
    END IF;

    -- Add location column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'events' AND column_name = 'location') THEN
        ALTER TABLE events ADD COLUMN location TEXT;
    END IF;

    -- Add event_url column if it doesn't exist (for online events)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'events' AND column_name = 'event_url') THEN
        ALTER TABLE events ADD COLUMN event_url TEXT;
    END IF;

    -- Add tags column if it doesn't exist (for categorization)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'events' AND column_name = 'tags') THEN
        ALTER TABLE events ADD COLUMN tags TEXT[];
    END IF;

    -- Add display_order column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'events' AND column_name = 'display_order') THEN
        ALTER TABLE events ADD COLUMN display_order INTEGER DEFAULT 1;
    END IF;
END $$;

-- Create constraints for data integrity
ALTER TABLE events ADD CONSTRAINT check_status 
CHECK (status IN ('draft', 'published', 'archived'));

ALTER TABLE events ADD CONSTRAINT check_attendees 
CHECK (attendees >= 0);

ALTER TABLE events ADD CONSTRAINT check_max_attendees 
CHECK (max_attendees > 0);

ALTER TABLE events ADD CONSTRAINT check_color 
CHECK (color IN ('gdsc-blue', 'gdsc-red', 'gdsc-yellow', 'gdsc-green'));

-- Update existing events with default values
UPDATE events SET 
    status = 'published',
    featured = false,
    max_attendees = 100,
    display_order = 1
WHERE status IS NULL OR featured IS NULL OR max_attendees IS NULL OR display_order IS NULL;

-- Add some enhanced sample data
INSERT INTO events (
    title, description, date, time, type, color, attendees, max_attendees,
    registration_link, location, status, featured, tags, display_order
) VALUES 
(
    'Advanced React Workshop Series',
    'Master modern React development with hooks, context, performance optimization, and testing. Hands-on coding with real-world projects.',
    'Jan 20, 2025',
    '10:00 AM - 4:00 PM',
    'Workshop Series',
    'gdsc-blue',
    0,
    50,
    'https://forms.gle/react-workshop-2025',
    'Computer Lab A, IET DAVV',
    'published',
    true,
    ARRAY['react', 'javascript', 'frontend', 'hands-on'],
    1
),
(
    'AI/ML Career Panel Discussion',
    'Industry experts share insights about careers in artificial intelligence and machine learning. Q&A session included.',
    'Jan 25, 2025',
    '6:00 PM - 8:00 PM',
    'Panel Discussion',
    'gdsc-green',
    0,
    200,
    'https://forms.gle/ai-career-panel',
    'Auditorium, IET DAVV',
    'published',
    false,
    ARRAY['ai', 'ml', 'career', 'industry'],
    2
),
(
    'Open Source Contribution Workshop',
    'Learn how to contribute to open source projects effectively. From finding projects to making your first PR.',
    'Feb 1, 2025',
    '2:00 PM - 6:00 PM',
    'Workshop',
    'gdsc-red',
    0,
    80,
    NULL,
    'Computer Lab B, IET DAVV',
    'draft',
    false,
    ARRAY['opensource', 'git', 'github', 'collaboration'],
    3
),
(
    'Mobile App Development Bootcamp',
    'Intensive 3-day bootcamp covering React Native, Flutter, and native development best practices.',
    'Feb 10-12, 2025',
    '9:00 AM - 5:00 PM',
    'Bootcamp',
    'gdsc-yellow',
    0,
    30,
    'https://forms.gle/mobile-bootcamp-2025',
    'Innovation Lab, IET DAVV',
    'published',
    true,
    ARRAY['mobile', 'react-native', 'flutter', 'bootcamp'],
    4
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(featured);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_color ON events(color);
CREATE INDEX IF NOT EXISTS idx_events_display_order ON events(display_order);

-- Update RLS policies to work with new columns
DROP POLICY IF EXISTS "Allow all operations on events" ON events;
CREATE POLICY "Allow all operations on events" ON events FOR ALL USING (true);

-- Add some useful views for analytics (optional)
CREATE OR REPLACE VIEW events_summary AS
SELECT 
    status,
    COUNT(*) as total_events,
    SUM(attendees) as total_attendees,
    AVG(attendees) as avg_attendees,
    COUNT(CASE WHEN featured THEN 1 END) as featured_events
FROM events 
GROUP BY status;

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'events'
ORDER BY ordinal_position;
