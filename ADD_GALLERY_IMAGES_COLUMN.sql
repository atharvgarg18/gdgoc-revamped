-- =====================================================
-- Add images column to gallery_items table
-- Run this script in Supabase SQL Editor
-- =====================================================

-- Add images column to store array of image URLs
ALTER TABLE gallery_items 
ADD COLUMN images TEXT[] DEFAULT '{}';

-- Update existing records to populate images array with main image
UPDATE gallery_items 
SET images = ARRAY[image] 
WHERE image IS NOT NULL AND image != '';

-- Add comment to describe the column
COMMENT ON COLUMN gallery_items.images IS 'Array of image URLs for multiple photos in gallery item';

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
