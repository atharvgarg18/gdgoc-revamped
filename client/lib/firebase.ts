import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if we have valid Firebase credentials
const hasValidCredentials =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== "your-firebase-api-key";

// Initialize Firebase only if we have valid credentials
const app = hasValidCredentials ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;

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

// Mock data for development (same as before)
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
    description:
      "Modern, responsive website for our community built with React and TypeScript",
    image: "https://via.placeholder.com/600x400",
    github_url: "https://github.com/gdgoc-iet-davv/website",
    live_url: "https://gdgoc-iet-davv.netlify.app",
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
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

// Helper function to convert Firestore data
const convertFirestoreData = (data: any, id: string) => {
  const converted = { ...data, id };
  
  // Convert Firestore Timestamps to ISO strings
  if (converted.created_at && typeof converted.created_at.toDate === 'function') {
    converted.created_at = converted.created_at.toDate().toISOString();
  }
  if (converted.updated_at && typeof converted.updated_at.toDate === 'function') {
    converted.updated_at = converted.updated_at.toDate().toISOString();
  }
  
  return converted;
};

// Admin authentication
const ADMIN_PASSWORD = "gdgoc2024admin";

export const checkAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD;
};

// Events API
export const getEvents = async () => {
  try {
    if (db) {
      const eventsCollection = collection(db, "events");
      const eventsQuery = query(eventsCollection, orderBy("date", "asc"));
      const querySnapshot = await getDocs(eventsQuery);
      
      const data = querySnapshot.docs.map((doc) =>
        convertFirestoreData(doc.data(), doc.id)
      );
      
      return { success: true, data };
    } else {
      // Use local storage in development
      const data = getFromStorage(STORAGE_KEYS.events, mockEvents);
      return { success: true, data };
    }
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return { success: false, data: [], error: error.message };
  }
};

export const createEvent = async (
  event: Omit<Event, "id" | "created_at" | "updated_at">,
) => {
  try {
    if (db) {
      const eventsCollection = collection(db, "events");
      const newEvent = {
        ...event,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };
      
      const docRef = await addDoc(eventsCollection, newEvent);
      const data = convertFirestoreData(newEvent, docRef.id);
      
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
  } catch (error: any) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }
};

export const updateEvent = async (id: string, updates: Partial<Event>) => {
  try {
    if (db) {
      const eventDoc = doc(db, "events", id);
      const updateData = {
        ...updates,
        updated_at: Timestamp.now(),
      };
      
      await updateDoc(eventDoc, updateData);
      
      // Get the updated document
      const updatedDoc = await getDoc(eventDoc);
      if (updatedDoc.exists()) {
        const data = convertFirestoreData(updatedDoc.data(), updatedDoc.id);
        return { success: true, data };
      }
      
      return { success: false, error: "Event not found after update" };
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
  } catch (error: any) {
    console.error("Error updating event:", error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (id: string) => {
  try {
    if (db) {
      const eventDoc = doc(db, "events", id);
      await deleteDoc(eventDoc);
      return { success: true };
    } else {
      // Use local storage in development
      const events = getFromStorage(STORAGE_KEYS.events, mockEvents);
      const filtered = events.filter((e) => e.id !== id);
      saveToStorage(STORAGE_KEYS.events, filtered);
      return { success: true };
    }
  } catch (error: any) {
    console.error("Error deleting event:", error);
    return { success: false, error: error.message };
  }
};

// Team API
export const getTeamMembers = async () => {
  try {
    if (db) {
      const teamCollection = collection(db, "team_members");
      const teamQuery = query(teamCollection, orderBy("display_order", "asc"));
      const querySnapshot = await getDocs(teamQuery);
      
      const data = querySnapshot.docs.map((doc) =>
        convertFirestoreData(doc.data(), doc.id)
      );
      
      return { success: true, data };
    } else {
      // Use local storage in development
      const data = getFromStorage(STORAGE_KEYS.teamMembers, mockTeamMembers);
      return {
        success: true,
        data: data.sort((a, b) => a.display_order - b.display_order),
      };
    }
  } catch (error: any) {
    console.error("Error fetching team members:", error);
    return { success: false, data: [], error: error.message };
  }
};

export const createTeamMember = async (
  member: Omit<TeamMember, "id" | "created_at" | "updated_at">,
) => {
  try {
    if (db) {
      const teamCollection = collection(db, "team_members");
      const newMember = {
        ...member,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };
      
      const docRef = await addDoc(teamCollection, newMember);
      const data = convertFirestoreData(newMember, docRef.id);
      
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
  } catch (error: any) {
    console.error("Error creating team member:", error);
    return { success: false, error: error.message };
  }
};

export const updateTeamMember = async (
  id: string,
  updates: Partial<TeamMember>,
) => {
  try {
    if (db) {
      const memberDoc = doc(db, "team_members", id);
      const updateData = {
        ...updates,
        updated_at: Timestamp.now(),
      };
      
      await updateDoc(memberDoc, updateData);
      
      // Get the updated document
      const updatedDoc = await getDoc(memberDoc);
      if (updatedDoc.exists()) {
        const data = convertFirestoreData(updatedDoc.data(), updatedDoc.id);
        return { success: true, data };
      }
      
      return { success: false, error: "Team member not found after update" };
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
  } catch (error: any) {
    console.error("Error updating team member:", error);
    return { success: false, error: error.message };
  }
};

export const deleteTeamMember = async (id: string) => {
  try {
    if (db) {
      const memberDoc = doc(db, "team_members", id);
      await deleteDoc(memberDoc);
      return { success: true };
    } else {
      // Use local storage in development
      const members = getFromStorage(STORAGE_KEYS.teamMembers, mockTeamMembers);
      const filtered = members.filter((m) => m.id !== id);
      saveToStorage(STORAGE_KEYS.teamMembers, filtered);
      return { success: true };
    }
  } catch (error: any) {
    console.error("Error deleting team member:", error);
    return { success: false, error: error.message };
  }
};

// Gallery API
export const getGalleryItems = async () => {
  try {
    if (db) {
      const galleryCollection = collection(db, "gallery_items");
      const galleryQuery = query(galleryCollection, orderBy("display_order", "desc"));
      const querySnapshot = await getDocs(galleryQuery);
      
      const data = querySnapshot.docs.map((doc) =>
        convertFirestoreData(doc.data(), doc.id)
      );
      
      return { success: true, data };
    } else {
      // Use local storage in development
      const data = getFromStorage(STORAGE_KEYS.galleryItems, mockGalleryItems);
      return {
        success: true,
        data: data.sort((a, b) => b.display_order - a.display_order),
      };
    }
  } catch (error: any) {
    console.error("Error fetching gallery items:", error);
    return { success: false, data: [], error: error.message };
  }
};

export const createGalleryItem = async (
  item: Omit<GalleryItem, "id" | "created_at" | "updated_at">,
) => {
  try {
    if (db) {
      const galleryCollection = collection(db, "gallery_items");
      const newItem = {
        ...item,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };
      
      const docRef = await addDoc(galleryCollection, newItem);
      const data = convertFirestoreData(newItem, docRef.id);
      
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
  } catch (error: any) {
    console.error("Error creating gallery item:", error);
    return { success: false, error: error.message };
  }
};

export const updateGalleryItem = async (
  id: string,
  updates: Partial<GalleryItem>,
) => {
  try {
    if (db) {
      const itemDoc = doc(db, "gallery_items", id);
      const updateData = {
        ...updates,
        updated_at: Timestamp.now(),
      };
      
      await updateDoc(itemDoc, updateData);
      
      // Get the updated document
      const updatedDoc = await getDoc(itemDoc);
      if (updatedDoc.exists()) {
        const data = convertFirestoreData(updatedDoc.data(), updatedDoc.id);
        return { success: true, data };
      }
      
      return { success: false, error: "Gallery item not found after update" };
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
  } catch (error: any) {
    console.error("Error updating gallery item:", error);
    return { success: false, error: error.message };
  }
};

export const deleteGalleryItem = async (id: string) => {
  try {
    if (db) {
      const itemDoc = doc(db, "gallery_items", id);
      await deleteDoc(itemDoc);
      return { success: true };
    } else {
      // Use local storage in development
      const items = getFromStorage(STORAGE_KEYS.galleryItems, mockGalleryItems);
      const filtered = items.filter((i) => i.id !== id);
      saveToStorage(STORAGE_KEYS.galleryItems, filtered);
      return { success: true };
    }
  } catch (error: any) {
    console.error("Error deleting gallery item:", error);
    return { success: false, error: error.message };
  }
};

// Projects API
export const getProjects = async () => {
  try {
    if (db) {
      const projectsCollection = collection(db, "projects");
      const projectsQuery = query(projectsCollection, orderBy("display_order", "desc"));
      const querySnapshot = await getDocs(projectsQuery);
      
      const data = querySnapshot.docs.map((doc) =>
        convertFirestoreData(doc.data(), doc.id)
      );
      
      return { success: true, data };
    } else {
      // Use local storage in development
      const data = getFromStorage(STORAGE_KEYS.projects, mockProjects);
      return {
        success: true,
        data: data.sort((a, b) => b.display_order - a.display_order),
      };
    }
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return { success: false, data: [], error: error.message };
  }
};

export const createProject = async (
  project: Omit<Project, "id" | "created_at" | "updated_at">,
) => {
  try {
    if (db) {
      const projectsCollection = collection(db, "projects");
      const newProject = {
        ...project,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };
      
      const docRef = await addDoc(projectsCollection, newProject);
      const data = convertFirestoreData(newProject, docRef.id);
      
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
  } catch (error: any) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message };
  }
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
  try {
    if (db) {
      const projectDoc = doc(db, "projects", id);
      const updateData = {
        ...updates,
        updated_at: Timestamp.now(),
      };
      
      await updateDoc(projectDoc, updateData);
      
      // Get the updated document
      const updatedDoc = await getDoc(projectDoc);
      if (updatedDoc.exists()) {
        const data = convertFirestoreData(updatedDoc.data(), updatedDoc.id);
        return { success: true, data };
      }
      
      return { success: false, error: "Project not found after update" };
    } else {
      // Use local storage in development
      const projects = getFromStorage(STORAGE_KEYS.projects, mockProjects);
      const index = projects.findIndex((p) => p.id === id);
      if (index === -1) return { success: false, error: "Project not found" };

      projects[index] = {
        ...projects[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      saveToStorage(STORAGE_KEYS.projects, projects);
      return { success: true, data: projects[index] };
    }
  } catch (error: any) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message };
  }
};

export const deleteProject = async (id: string) => {
  try {
    if (db) {
      const projectDoc = doc(db, "projects", id);
      await deleteDoc(projectDoc);
      return { success: true };
    } else {
      // Use local storage in development
      const projects = getFromStorage(STORAGE_KEYS.projects, mockProjects);
      const filtered = projects.filter((p) => p.id !== id);
      saveToStorage(STORAGE_KEYS.projects, filtered);
      return { success: true };
    }
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message };
  }
};
