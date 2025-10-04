# Events Status Column Migration Guide

## Issue
You're getting the error: `Could not find the 'status' column of 'events' in the schema cache`

This happens because the TypeScript Event interface includes a `status` field, but the database schema doesn't have this column yet.

## Solution

### Step 1: Apply Database Migration

1. **Open your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Navigate to your project
   - Go to **SQL Editor**

2. **Run the Migration Script**
   Copy and paste this SQL script in the SQL Editor and run it:

```sql
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
```

### Step 2: Verify the Migration

Run this query to verify the changes:

```sql
-- Verify the changes
SELECT 
    id, 
    title, 
    date, 
    status,
    CASE 
        WHEN date::date < CURRENT_DATE THEN 'Should be completed'
        ELSE 'Should be upcoming'
    END as expected_status
FROM events 
ORDER BY date DESC;

-- Show updated schema
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'events' 
ORDER BY ordinal_position;
```

### Step 3: Test the Functionality

After running the migration:

1. **Refresh your application** (clear browser cache if needed)
2. **Go to Admin Panel** → Events Manager
3. **Try creating a new event**
4. **Check that the error is resolved**

## What This Migration Does

1. **Adds `status` column**: A new VARCHAR(20) column with constraint for 'upcoming' or 'completed'
2. **Sets intelligent defaults**: Automatically sets status based on event date
3. **Maintains data integrity**: Uses CHECK constraint to ensure valid values
4. **Provides backward compatibility**: All existing events get appropriate status

## Event Status Logic

- **Upcoming**: Events with dates in the future
- **Completed**: Events with dates in the past
- **Automatic**: Status is automatically determined based on date comparison

## Files Updated

The following schema files have been updated to include the new column:
- ✅ `database-schema.sql`
- ✅ `supabase-schema.sql` 
- ✅ `PRODUCTION_SUPABASE_SCHEMA.sql`
- ✅ `ADD_EVENTS_STATUS_COLUMN.sql` (new migration script)

## Expected Result

After the migration:
- Event creation/editing will work without schema errors
- Events will have proper status tracking (upcoming/completed)
- Admin panel will function correctly
- Event filtering and sorting will work based on status

## Troubleshooting

If you still get schema errors after migration:
1. **Clear browser cache** and refresh
2. **Restart your development server**: `npm run dev`
3. **Check Supabase logs** in the dashboard for any errors
4. **Verify the column exists**: Run the verification queries above

## Interface Consistency

The Event interface in `client/lib/supabase.ts` already includes:
```typescript
status: "upcoming" | "completed";
```

This migration ensures the database schema matches the TypeScript interface.