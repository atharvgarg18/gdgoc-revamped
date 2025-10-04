-- =====================================================
-- Add status column to events table
-- Run this script in Supabase SQL Editor
-- =====================================================

-- Add status column to store event status
ALTER TABLE events 
ADD COLUMN status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed'));

-- Update existing records to set appropriate status based on date
-- Handle MIXED date formats intelligently

-- Handle DD/MM/YYYY format (when first part > 12, like "15/06/2025")
UPDATE events 
SET status = CASE 
    WHEN TO_DATE(date, 'DD/MM/YYYY') < CURRENT_DATE THEN 'completed'
    ELSE 'upcoming'
END
WHERE date ~ '^\d{1,2}/\d{1,2}/\d{4}$' AND SPLIT_PART(date, '/', 1)::int > 12;

-- Handle MM/DD/YYYY format (when second part > 12, like "10/14/2023")
UPDATE events 
SET status = CASE 
    WHEN TO_DATE(date, 'MM/DD/YYYY') < CURRENT_DATE THEN 'completed'
    ELSE 'upcoming'
END
WHERE date ~ '^\d{1,2}/\d{1,2}/\d{4}$' AND SPLIT_PART(date, '/', 2)::int > 12;

-- Handle ambiguous dates (both parts <= 12) - assume MM/DD/YYYY
UPDATE events 
SET status = CASE 
    WHEN TO_DATE(date, 'MM/DD/YYYY') < CURRENT_DATE THEN 'completed'
    ELSE 'upcoming'
END
WHERE date ~ '^\d{1,2}/\d{1,2}/\d{4}$' 
  AND SPLIT_PART(date, '/', 1)::int <= 12 
  AND SPLIT_PART(date, '/', 2)::int <= 12;

-- For any other date formats, set as upcoming (safe default)
UPDATE events 
SET status = 'upcoming'
WHERE date !~ '^\d{1,2}/\d{1,2}/\d{4}$' OR date IS NULL;

-- Add comment to describe the column
COMMENT ON COLUMN events.status IS 'Event status: upcoming or completed';

-- Verify the changes
SELECT 
    id, 
    title, 
    date, 
    status,
    CASE 
        WHEN date ~ '^\d{1,2}/\d{1,2}/\d{4}$' THEN
            CASE 
                WHEN SPLIT_PART(date, '/', 1)::int > 12 THEN 'DD/MM format'
                WHEN SPLIT_PART(date, '/', 2)::int > 12 THEN 'MM/DD format'  
                ELSE 'Ambiguous (treated as MM/DD)'
            END
        ELSE 'Invalid format'
    END as format_detected,
    CASE 
        WHEN date ~ '^\d{1,2}/\d{1,2}/\d{4}$' THEN
            CASE 
                WHEN SPLIT_PART(date, '/', 1)::int > 12 THEN
                    CASE WHEN TO_DATE(date, 'DD/MM/YYYY') < CURRENT_DATE THEN 'Should be completed' ELSE 'Should be upcoming' END
                WHEN SPLIT_PART(date, '/', 2)::int > 12 THEN
                    CASE WHEN TO_DATE(date, 'MM/DD/YYYY') < CURRENT_DATE THEN 'Should be completed' ELSE 'Should be upcoming' END
                ELSE
                    CASE WHEN TO_DATE(date, 'MM/DD/YYYY') < CURRENT_DATE THEN 'Should be completed' ELSE 'Should be upcoming' END
            END
        ELSE 'Should be upcoming (safe default)'
    END as expected_status
FROM events 
ORDER BY 
    CASE 
        WHEN date ~ '^\d{1,2}/\d{1,2}/\d{4}$' THEN
            CASE 
                WHEN SPLIT_PART(date, '/', 1)::int > 12 THEN TO_DATE(date, 'DD/MM/YYYY')
                WHEN SPLIT_PART(date, '/', 2)::int > 12 THEN TO_DATE(date, 'MM/DD/YYYY')
                ELSE TO_DATE(date, 'MM/DD/YYYY')
            END
        ELSE CURRENT_DATE
    END DESC;

-- Show updated schema
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'events' 
ORDER BY ordinal_position;