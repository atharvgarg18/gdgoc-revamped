import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ywnmfaugihbiddjunyai.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bm1mYXVnaWhiaWRkanVueWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNjc5MzcsImV4cCI6MjA3MDY0MzkzN30.2n8DEjiwxxD1CGOoAN3G8IylV1WD4W1oGXkwE3UjfyY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Connection error:', error);
    } else {
      console.log('Connection successful, data:', data);
    }
  } catch (err) {
    console.error('Catch error:', err);
  }
}

testConnection();
