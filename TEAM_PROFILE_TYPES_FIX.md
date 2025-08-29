# Fix for Team Profile Types Issue

## Problem
The `Faculty Mentor` and `Former Leads` profile types are not being saved because the Supabase database table `team_members` is missing the `profile_type` column.

## Solution

### Step 1: Add the profile_type column to your Supabase database

Go to your Supabase dashboard > SQL Editor and run this migration script:

```sql
-- Add the profile_type column with constraint
ALTER TABLE public.team_members 
ADD COLUMN IF NOT EXISTS profile_type VARCHAR(50) NOT NULL DEFAULT 'Mentor'
CHECK (profile_type IN ('Lead', 'Co-Lead', 'Mentor', 'Faculty Mentor', 'Former Leads'));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_team_members_profile_type ON public.team_members(profile_type);

-- Update existing records based on role (optional - adjust as needed)
UPDATE public.team_members 
SET profile_type = CASE 
    WHEN role ILIKE '%lead%' AND role NOT ILIKE '%co%' THEN 'Lead'
    WHEN role ILIKE '%co%lead%' OR role ILIKE '%co-lead%' THEN 'Co-Lead'
    WHEN role ILIKE '%faculty%' OR role ILIKE '%professor%' OR role ILIKE '%advisor%' THEN 'Faculty Mentor'
    WHEN role ILIKE '%former%' OR role ILIKE '%previous%' OR role ILIKE '%ex-%' THEN 'Former Leads'
    ELSE 'Mentor'
END
WHERE profile_type = 'Mentor';

-- Verify the migration
SELECT profile_type, COUNT(*) as count 
FROM public.team_members 
GROUP BY profile_type
ORDER BY profile_type;
```

### Step 2: Verify the changes

After running the migration:

1. Check that the `profile_type` column exists in your `team_members` table
2. Verify that the CHECK constraint allows the 5 profile types: `Lead`, `Co-Lead`, `Mentor`, `Faculty Mentor`, `Former Leads`
3. Test creating/updating team members with the new profile types

### Step 3: Test the application

1. Go to the admin panel
2. Try creating a new team member with `Faculty Mentor` or `Former Leads` profile type
3. Verify it saves successfully
4. Check that the team page displays the member in the correct category
5. Test the filtering functionality

## Files Updated

The following schema files have been updated with the new column definition:

- `PRODUCTION_SUPABASE_SCHEMA.sql`
- `database-schema.sql` 
- `supabase-schema.sql`
- `ADD_PROFILE_TYPE_MIGRATION.sql` (new migration file)

## Frontend Changes Made

1. **Updated TeamMember interface** in `client/lib/supabase.ts` to include the 5 new profile types
2. **Fixed filtering logic** in `client/pages/Team.tsx` to properly reset animations when categories change
3. **Updated admin panel** in `client/components/admin/TeamManager.tsx` to support the new profile types
4. **Added WhatsApp support** to `client/components/SocialIcons.tsx`
5. **Updated mock data** to include examples of all 5 profile types

## Profile Types Supported

1. **Lead** - Main community leaders
2. **Co-Lead** - Assistant leaders and department heads
3. **Mentor** - Experienced members who guide others
4. **Faculty Mentor** - Faculty advisors and professors
5. **Former Leads** - Past leaders and alumni

The issue should now be completely resolved after running the database migration.
