import { createClient } from '@supabase/supabase-js';

// These will be environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  color: 'gdsc-blue' | 'gdsc-red' | 'gdsc-yellow' | 'gdsc-green';
  attendees: number;
  image?: string;
  registration_link?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: 'workshop' | 'event' | 'competition' | 'community';
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Admin authentication - simple password check
const ADMIN_PASSWORD = 'gdgoc2024admin';

export const checkAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD;
};

// Events API
export const getEvents = async () => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching events:', error);
    return { success: false, data: [], error: error.message };
  }
};

export const createEvent = async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating event:', error);
    return { success: false, error: error.message };
  }
};

export const updateEvent = async (id: string, updates: Partial<Event>) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating event:', error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { success: false, error: error.message };
  }
};

// Team API
export const getTeamMembers = async () => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { success: false, data: [], error: error.message };
  }
};

export const createTeamMember = async (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .insert([member])
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating team member:', error);
    return { success: false, error: error.message };
  }
};

export const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating team member:', error);
    return { success: false, error: error.message };
  }
};

export const deleteTeamMember = async (id: string) => {
  try {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting team member:', error);
    return { success: false, error: error.message };
  }
};

// Gallery API
export const getGalleryItems = async () => {
  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('display_order', { ascending: false });
    
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return { success: false, data: [], error: error.message };
  }
};

export const createGalleryItem = async (item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert([item])
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return { success: false, error: error.message };
  }
};

export const updateGalleryItem = async (id: string, updates: Partial<GalleryItem>) => {
  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return { success: false, error: error.message };
  }
};

export const deleteGalleryItem = async (id: string) => {
  try {
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return { success: false, error: error.message };
  }
};
