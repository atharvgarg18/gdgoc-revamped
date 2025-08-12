import { createClient } from "@supabase/supabase-js";
import { Event, TeamMember, GalleryItem } from "@shared/admin-types";

// Server-side Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== "your-supabase-url" && 
  supabaseAnonKey !== "your-supabase-anon-key";

// Create Supabase client for server-side operations
export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Events operations using Supabase
export async function getEventsFromSupabase(): Promise<Event[]> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured, falling back to JSON data");
      return [];
    }

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching events from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getEventsFromSupabase:", error);
    return [];
  }
}

export async function createEventInSupabase(event: Omit<Event, "id">): Promise<Event | null> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return null;
    }

    const { data, error } = await supabase
      .from("events")
      .insert([event])
      .select();

    if (error) {
      console.error("Error creating event in Supabase:", error);
      return null;
    }

    // Return first item if array has data, null otherwise
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error in createEventInSupabase:", error);
    return null;
  }
}

export async function updateEventInSupabase(id: string, updates: Partial<Event>): Promise<Event | null> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return null;
    }

    const { data, error } = await supabase
      .from("events")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating event in Supabase:", error);
      return null;
    }

    // Return first item if array has data, null otherwise
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error in updateEventInSupabase:", error);
    return null;
  }
}

export async function deleteEventFromSupabase(id: string): Promise<boolean> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return false;
    }

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting event from Supabase:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteEventFromSupabase:", error);
    return false;
  }
}

// Team operations using Supabase
export async function getTeamMembersFromSupabase(): Promise<TeamMember[]> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured, falling back to JSON data");
      return [];
    }

    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching team members from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getTeamMembersFromSupabase:", error);
    return [];
  }
}

export async function createTeamMemberInSupabase(member: Omit<TeamMember, "id">): Promise<TeamMember | null> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return null;
    }

    const { data, error } = await supabase
      .from("team_members")
      .insert([member])
      .select();

    if (error) {
      console.error("Error creating team member in Supabase:", error);
      return null;
    }

    // Return first item if array has data, null otherwise
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error in createTeamMemberInSupabase:", error);
    return null;
  }
}

export async function updateTeamMemberInSupabase(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return null;
    }

    const { data, error } = await supabase
      .from("team_members")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating team member in Supabase:", error);
      return null;
    }

    // Return first item if array has data, null otherwise
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error in updateTeamMemberInSupabase:", error);
    return null;
  }
}

export async function deleteTeamMemberFromSupabase(id: string): Promise<boolean> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return false;
    }

    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting team member from Supabase:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteTeamMemberFromSupabase:", error);
    return false;
  }
}

// Gallery operations using Supabase
export async function getGalleryItemsFromSupabase(): Promise<GalleryItem[]> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured, falling back to JSON data");
      return [];
    }

    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("display_order", { ascending: false });

    if (error) {
      console.error("Error fetching gallery items from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getGalleryItemsFromSupabase:", error);
    return [];
  }
}

export async function createGalleryItemInSupabase(item: Omit<GalleryItem, "id">): Promise<GalleryItem | null> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return null;
    }

    const { data, error } = await supabase
      .from("gallery_items")
      .insert([item])
      .select();

    if (error) {
      console.error("Error creating gallery item in Supabase:", error);
      return null;
    }

    // Return first item if array has data, null otherwise
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error in createGalleryItemInSupabase:", error);
    return null;
  }
}

export async function updateGalleryItemInSupabase(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return null;
    }

    const { data, error } = await supabase
      .from("gallery_items")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating gallery item in Supabase:", error);
      return null;
    }

    // Return first item if array has data, null otherwise
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error in updateGalleryItemInSupabase:", error);
    return null;
  }
}

export async function deleteGalleryItemFromSupabase(id: string): Promise<boolean> {
  try {
    if (!supabase) {
      console.warn("Supabase not configured");
      return false;
    }

    const { error } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting gallery item from Supabase:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteGalleryItemFromSupabase:", error);
    return false;
  }
}
