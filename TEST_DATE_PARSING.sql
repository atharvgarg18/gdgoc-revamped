-- =====================================================
-- TEST QUERY - Run this FIRST to verify date parsing
-- This won't make any changes to your data
-- =====================================================

-- Test the date parsing logic without making changes
SELECT 
    id,
    title,
    date as original_date,
    CASE 
        WHEN date ~ '^\d{1,2}/\d{1,2}/\d{4}$' THEN 
            CASE 
                WHEN SPLIT_PART(date, '/', 1)::int > 12 THEN 'DD/MM/YYYY format'
                WHEN SPLIT_PART(date, '/', 2)::int > 12 THEN 'MM/DD/YYYY format'
                ELSE 'Ambiguous format (could be either)'
            END
        ELSE 'Different format or NULL'
    END as date_format_check,
    CASE 
        WHEN date ~ '^\d{1,2}/\d{1,2}/\d{4}$' THEN
            CASE 
                -- If first part > 12, it must be DD/MM/YYYY
                WHEN SPLIT_PART(date, '/', 1)::int > 12 THEN TO_DATE(date, 'DD/MM/YYYY')::text
                -- If second part > 12, it must be MM/DD/YYYY  
                WHEN SPLIT_PART(date, '/', 2)::int > 12 THEN TO_DATE(date, 'MM/DD/YYYY')::text
                -- For ambiguous dates, try MM/DD/YYYY first (more common in databases)
                ELSE TO_DATE(date, 'MM/DD/YYYY')::text
            END
        ELSE 'Cannot parse'
    END as parsed_date,
    CASE 
        WHEN date ~ '^\d{1,2}/\d{1,2}/\d{4}$' THEN
            CASE 
                WHEN SPLIT_PART(date, '/', 1)::int > 12 THEN
                    CASE WHEN TO_DATE(date, 'DD/MM/YYYY') < CURRENT_DATE THEN 'Would be: completed' ELSE 'Would be: upcoming' END
                WHEN SPLIT_PART(date, '/', 2)::int > 12 THEN
                    CASE WHEN TO_DATE(date, 'MM/DD/YYYY') < CURRENT_DATE THEN 'Would be: completed' ELSE 'Would be: upcoming' END
                ELSE
                    CASE WHEN TO_DATE(date, 'MM/DD/YYYY') < CURRENT_DATE THEN 'Would be: completed' ELSE 'Would be: upcoming' END
            END
        ELSE 'Would be: upcoming (safe default)'
    END as proposed_status
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

-- Summary of what would happen
SELECT 
    'Total events' as category,
    COUNT(*) as count
FROM events
UNION ALL
SELECT 
    'DD/MM/YYYY format' as category,
    COUNT(*) as count
FROM events 
WHERE date ~ '^\d{1,2}/\d{1,2}/\d{4}$' AND SPLIT_PART(date, '/', 1)::int > 12
UNION ALL
SELECT 
    'MM/DD/YYYY format' as category,
    COUNT(*) as count
FROM events 
WHERE date ~ '^\d{1,2}/\d{1,2}/\d{4}$' AND SPLIT_PART(date, '/', 2)::int > 12
UNION ALL
SELECT 
    'Ambiguous format (treated as MM/DD)' as category,
    COUNT(*) as count
FROM events 
WHERE date ~ '^\d{1,2}/\d{1,2}/\d{4}$' 
  AND SPLIT_PART(date, '/', 1)::int <= 12 
  AND SPLIT_PART(date, '/', 2)::int <= 12
UNION ALL
SELECT 
    'Other/Invalid formats' as category,
    COUNT(*) as count
FROM events 
WHERE date !~ '^\d{1,2}/\d{1,2}/\d{4}$' OR date IS NULL;