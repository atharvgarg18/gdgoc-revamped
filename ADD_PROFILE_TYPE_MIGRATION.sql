-- ===================================================================
-- GDGOC IET DAVV - ADD PROFILE_TYPE COLUMN MIGRATION
-- ===================================================================
-- Run this migration script in your Supabase SQL Editor 
-- to add the profile_type column to existing team_members table
-- ===================================================================

-- Add the profile_type column with constraint
ALTER TABLE public.team_members 
ADD COLUMN IF NOT EXISTS profile_type VARCHAR(50) NOT NULL DEFAULT 'Mentor'
CHECK (profile_type IN ('Lead', 'Co-Lead', 'Mentor', 'Faculty Mentor', 'Former Leads'));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_profile_type ON public.team_members(profile_type);

-- Update existing records based on role (optional - adjust as needed)
-- You can customize these mappings based on your existing data
UPDATE public.team_members 
SET profile_type = CASE 
    WHEN role ILIKE '%lead%' AND role NOT ILIKE '%co%' THEN 'Lead'
    WHEN role ILIKE '%co%lead%' OR role ILIKE '%co-lead%' THEN 'Co-Lead'
    WHEN role ILIKE '%faculty%' OR role ILIKE '%professor%' OR role ILIKE '%advisor%' THEN 'Faculty Mentor'
    WHEN role ILIKE '%former%' OR role ILIKE '%previous%' OR role ILIKE '%ex-%' THEN 'Former Leads'
    ELSE 'Mentor'
END
WHERE profile_type = 'Mentor'; -- Only update default values

-- Verify the migration
SELECT profile_type, COUNT(*) as count 
FROM public.team_members 
GROUP BY profile_type
ORDER BY profile_type;
