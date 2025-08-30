# Gallery Images Column Migration Guide

## Issue
You're getting the error: `Could not find the 'images' column of 'gallery_items' in the schema cache`

This happens because the database schema doesn't have the new `images` column that we added to support multiple images per gallery item.

## Solution

### Step 1: Apply Database Migration

1. **Open your Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Navigate to your project
   - Go to **SQL Editor**

2. **Run the Migration Script**
   Copy and paste this SQL script in the SQL Editor and run it:

```sql
-- Add images column to store array of image URLs
ALTER TABLE gallery_items 
ADD COLUMN images TEXT[] DEFAULT '{}';

-- Update existing records to populate images array with main image
UPDATE gallery_items 
SET images = ARRAY[image] 
WHERE image IS NOT NULL AND image != '';

-- Add comment to describe the column
COMMENT ON COLUMN gallery_items.images IS 'Array of image URLs for multiple photos in gallery item';
```

### Step 2: Verify the Migration

Run this query to verify the changes:

```sql
-- Verify the changes
SELECT 
    id, 
    title, 
    image, 
    images, 
    array_length(images, 1) as image_count
FROM gallery_items 
ORDER BY display_order;

-- Show updated schema
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'gallery_items' 
ORDER BY ordinal_position;
```

### Step 3: Test the Functionality

After running the migration:

1. **Refresh your application** (the browser cache might need clearing)
2. **Go to Admin Panel** → Gallery Manager
3. **Try editing an existing gallery item**
4. **Toggle "Add multiple images"** and add multiple image URLs
5. **Save and check the Gallery page**

## What This Migration Does

1. **Adds `images` column**: A new TEXT[] (array) column to store multiple image URLs
2. **Populates existing data**: Takes the current `image` field and puts it in the `images` array
3. **Maintains compatibility**: Existing single images will still work
4. **Enables new functionality**: Now you can add multiple images per gallery item

## Files Updated

The following schema files have been updated to include the new column:
- ✅ `database-schema.sql`
- ✅ `supabase-schema.sql` 
- ✅ `PRODUCTION_SUPABASE_SCHEMA.sql`
- ✅ `ADD_GALLERY_IMAGES_COLUMN.sql` (new migration script)

## Expected Result

After the migration:
- Existing gallery items will have their main image in both `image` and `images[0]`
- You can add multiple images to new gallery items
- Gallery detail pages will show all images in the photo collection
- Admin panel will have the multiple images interface working

## Troubleshooting

If you still get schema errors after migration:
1. **Clear browser cache** and refresh
2. **Restart your development server**: `npm run dev`
3. **Check Supabase logs** in the dashboard for any errors
4. **Verify the column exists**: Run the verification queries above
