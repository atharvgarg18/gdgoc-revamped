import { createClient } from "@supabase/supabase-js";

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "your-supabase-url" &&
  supabaseAnonKey !== "your-supabase-anon-key";

// Create Supabase client only if we have valid credentials
export const supabase = hasValidCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database schema types
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  color: "gdsc-blue" | "gdsc-red" | "gdsc-yellow" | "gdsc-green";
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
  category: "workshop" | "event" | "competition" | "community";
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  github_url?: string;
  live_url?: string;
  tech_stack: string[];
  category: "web" | "mobile" | "ai" | "blockchain" | "iot" | "other";
  status: "completed" | "in_progress" | "planned";
  team_members: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Mock data for development
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    date: "Dec 15, 2024",
    time: "2:00 PM - 5:00 PM",
    type: "Workshop",
    description: "Learn the fundamentals of ML with hands-on exercises",
    color: "gdsc-blue",
    attendees: 85,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Android Development Bootcamp",
    date: "Dec 20, 2024",
    time: "10:00 AM - 4:00 PM",
    type: "Bootcamp",
    description: "Build your first Android app from scratch",
    color: "gdsc-green",
    attendees: 120,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Web Development with React",
    date: "Dec 25, 2024",
    time: "1:00 PM - 6:00 PM",
    type: "Workshop",
    description: "Modern web development using React and TypeScript",
    color: "gdsc-red",
    attendees: 95,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Atharv Garg",
    role: "Lead",
    image: "https://via.placeholder.com/300x300",
    bio: "Passionate about full-stack development and community building",
    linkedin: "#",
    github: "#",
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Core Member 1",
    role: "Technical Lead",
    image: "https://via.placeholder.com/300x300",
    bio: "Specializes in machine learning and data science",
    linkedin: "#",
    github: "#",
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Web Development Workshop",
    description: "Students learning React and modern web technologies",
    image: "https://via.placeholder.com/400x300",
    date: "2024-11-15",
    category: "workshop",
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Community Meetup",
    description: "Our monthly community gathering and networking event",
    image: "https://via.placeholder.com/400x300",
    date: "2024-11-20",
    category: "community",
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockProjects: Project[] = [
  {
    id: "1",
    title: "GDGoC Website",
    description: "Modern, responsive website for our community built with React and TypeScript",
    image: "https://via.placeholder.com/600x400",
    github_url: "https://github.com/gdgoc-iet-davv/website",
    live_url: "https://gdgoc-iet-davv.netlify.app",
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    category: "web",
    status: "completed",
    team_members: ["Atharv Garg", "Core Team"],
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Event Management App",
    description: "Mobile app for managing community events and registrations",
    image: "https://via.placeholder.com/600x400",
    github_url: "https://github.com/gdgoc-iet-davv/event-app",
    tech_stack: ["React Native", "Firebase", "Node.js"],
    category: "mobile",
    status: "in_progress",
    team_members: ["Tech Team", "Mobile Development Squad"],
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Local storage keys
const STORAGE_KEYS = {
  events: "gdgoc-events",
  teamMembers: "gdgoc-team-members",
  galleryItems: "gdgoc-gallery-items",
  projects: "gdgoc-projects",
};

// Helper functions for local storage
const getFromStorage = <T>(key: string, defaultData: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch {
    return defaultData;
  }
};

const saveToStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Admin authentication - simple password check
const ADMIN_PASSWORD = "gdgoc2024admin";

export const checkAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD;
};

// Events API
export const getEvents = async () => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return { success: true, data: data || [] };
    } else {
      // Use local storage in development
      const data = getFromStorage(STORAGE_KEYS.events, mockEvents);
      return { success: true, data };
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return { success: false, data: [], error: error.message };
  }
};

export const createEvent = async (
  event: Omit<Event, "id" | "created_at" | "updated_at">,
) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("events")
        .insert([event])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // Use local storage in development
      const events = getFromStorage(STORAGE_KEYS.events, mockEvents);
      const newEvent: Event = {
        ...event,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      events.push(newEvent);
      saveToStorage(STORAGE_KEYS.events, events);
      return { success: true, data: newEvent };
    }
  } catch (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }
};

export const updateEvent = async (id: string, updates: Partial<Event>) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("events")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // Use local storage in development
      const events = getFromStorage(STORAGE_KEYS.events, mockEvents);
      const index = events.findIndex((e) => e.id === id);
      if (index === -1) return { success: false, error: "Event not found" };

      events[index] = {
        ...events[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEYS.events, events);
      return { success: true, data: events[index] };
    }
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (id: string) => {
  try {
    if (supabase) {
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) throw error;
      return { success: true };
    } else {
      // Use local storage in development
      const events = getFromStorage(STORAGE_KEYS.events, mockEvents);
      const filtered = events.filter((e) => e.id !== id);
      saveToStorage(STORAGE_KEYS.events, filtered);
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: error.message };
  }
};

// Team API
export const getTeamMembers = async () => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return { success: true, data: data || [] };
    } else {
      // Use local storage in development
      const data = getFromStorage(STORAGE_KEYS.teamMembers, mockTeamMembers);
      return {
        success: true,
        data: data.sort((a, b) => a.display_order - b.display_order),
      };
    }
  } catch (error) {
    console.error("Error fetching team members:", error);
    return { success: false, data: [], error: error.message };
  }
};

export const createTeamMember = async (
  member: Omit<TeamMember, "id" | "created_at" | "updated_at">,
) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("team_members")
        .insert([member])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // Use local storage in development
      const members = getFromStorage(STORAGE_KEYS.teamMembers, mockTeamMembers);
      const newMember: TeamMember = {
        ...member,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      members.push(newMember);
      saveToStorage(STORAGE_KEYS.teamMembers, members);
      return { success: true, data: newMember };
    }
  } catch (error) {
    console.error("Error creating team member:", error);
    return { success: false, error: error.message };
  }
};

export const updateTeamMember = async (
  id: string,
  updates: Partial<TeamMember>,
) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("team_members")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // Use local storage in development
      const members = getFromStorage(STORAGE_KEYS.teamMembers, mockTeamMembers);
      const index = members.findIndex((m) => m.id === id);
      if (index === -1)
        return { success: false, error: "Team member not found" };

      members[index] = {
        ...members[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEYS.teamMembers, members);
      return { success: true, data: members[index] };
    }
  } catch (error) {
    console.error("Error updating team member:", error);
    return { success: false, error: error.message };
  }
};

export const deleteTeamMember = async (id: string) => {
  try {
    if (supabase) {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } else {
      // Use local storage in development
      const members = getFromStorage(STORAGE_KEYS.teamMembers, mockTeamMembers);
      const filtered = members.filter((m) => m.id !== id);
      saveToStorage(STORAGE_KEYS.teamMembers, filtered);
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { success: false, error: error.message };
  }
};

// Gallery API
export const getGalleryItems = async () => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("display_order", { ascending: false });

      if (error) throw error;
      return { success: true, data: data || [] };
    } else {
      // Use local storage in development
      const data = getFromStorage(STORAGE_KEYS.galleryItems, mockGalleryItems);
      return {
        success: true,
        data: data.sort((a, b) => b.display_order - a.display_order),
      };
    }
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return { success: false, data: [], error: error.message };
  }
};

export const createGalleryItem = async (
  item: Omit<GalleryItem, "id" | "created_at" | "updated_at">,
) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("gallery_items")
        .insert([item])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // Use local storage in development
      const items = getFromStorage(STORAGE_KEYS.galleryItems, mockGalleryItems);
      const newItem: GalleryItem = {
        ...item,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      items.push(newItem);
      saveToStorage(STORAGE_KEYS.galleryItems, items);
      return { success: true, data: newItem };
    }
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return { success: false, error: error.message };
  }
};

export const updateGalleryItem = async (
  id: string,
  updates: Partial<GalleryItem>,
) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("gallery_items")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // Use local storage in development
      const items = getFromStorage(STORAGE_KEYS.galleryItems, mockGalleryItems);
      const index = items.findIndex((i) => i.id === id);
      if (index === -1)
        return { success: false, error: "Gallery item not found" };

      items[index] = {
        ...items[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEYS.galleryItems, items);
      return { success: true, data: items[index] };
    }
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return { success: false, error: error.message };
  }
};

export const deleteGalleryItem = async (id: string) => {
  try {
    if (supabase) {
      const { error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } else {
      // Use local storage in development
      const items = getFromStorage(STORAGE_KEYS.galleryItems, mockGalleryItems);
      const filtered = items.filter((i) => i.id !== id);
      saveToStorage(STORAGE_KEYS.galleryItems, filtered);
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return { success: false, error: error.message };
  }
};

// Projects API
export const getProjects = async () => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: false });

      if (error) throw error;
      return { success: true, data: data || [] };
    } else {
      // Use local storage in development
      const data = getFromStorage(STORAGE_KEYS.projects, mockProjects);
      return {
        success: true,
        data: data.sort((a, b) => b.display_order - a.display_order),
      };
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, data: [], error: error.message };
  }
};

export const createProject = async (
  project: Omit<Project, "id" | "created_at" | "updated_at">,
) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // Use local storage in development
      const projects = getFromStorage(STORAGE_KEYS.projects, mockProjects);
      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      projects.push(newProject);
      saveToStorage(STORAGE_KEYS.projects, projects);
      return { success: true, data: newProject };
    }
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message };
  }
};

export const updateProject = async (
  id: string,
  updates: Partial<Project>,
) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } else {
      // Use local storage in development
      const projects = getFromStorage(STORAGE_KEYS.projects, mockProjects);
      const index = projects.findIndex((p) => p.id === id);
      if (index === -1)
        return { success: false, error: "Project not found" };

      projects[index] = {
        ...projects[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEYS.projects, projects);
      return { success: true, data: projects[index] };
    }
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message };
  }
};

export const deleteProject = async (id: string) => {
  try {
    if (supabase) {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { success: true };
    } else {
      // Use local storage in development
      const projects = getFromStorage(STORAGE_KEYS.projects, mockProjects);
      const filtered = projects.filter((p) => p.id !== id);
      saveToStorage(STORAGE_KEYS.projects, filtered);
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message };
  }
};
