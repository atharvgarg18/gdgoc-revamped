import fs from 'fs';
import path from 'path';
import { Event, TeamMember, GalleryItem } from '@shared/admin-types';

const DATA_DIR = path.join(process.cwd(), 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const TEAM_FILE = path.join(DATA_DIR, 'team.json');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files with default data if they don't exist
function initializeDataFiles() {
  if (!fs.existsSync(EVENTS_FILE)) {
    const defaultEvents: Event[] = [
      {
        id: '1',
        title: 'Introduction to Machine Learning',
        date: 'Dec 15, 2024',
        time: '2:00 PM - 5:00 PM',
        type: 'Workshop',
        description: 'Learn the fundamentals of ML with hands-on exercises',
        color: 'gdsc-blue',
        attendees: 85
      },
      {
        id: '2',
        title: 'Android Development Bootcamp',
        date: 'Dec 20, 2024',
        time: '10:00 AM - 4:00 PM',
        type: 'Bootcamp',
        description: 'Build your first Android app from scratch',
        color: 'gdsc-green',
        attendees: 120
      }
    ];
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(defaultEvents, null, 2));
  }

  if (!fs.existsSync(TEAM_FILE)) {
    const defaultTeam: TeamMember[] = [
      {
        id: '1',
        name: 'Atharv Garg',
        role: 'Lead',
        image: 'https://via.placeholder.com/300x300',
        bio: 'Passionate about full-stack development and community building',
        social: { linkedin: '#', github: '#', twitter: '#' },
        order: 1
      },
      {
        id: '2',
        name: 'Core Member 1',
        role: 'Technical Lead',
        image: 'https://via.placeholder.com/300x300',
        bio: 'Specializes in machine learning and data science',
        social: { linkedin: '#', github: '#', twitter: '#' },
        order: 2
      }
    ];
    fs.writeFileSync(TEAM_FILE, JSON.stringify(defaultTeam, null, 2));
  }

  if (!fs.existsSync(GALLERY_FILE)) {
    const defaultGallery: GalleryItem[] = [
      {
        id: '1',
        title: 'Web Development Workshop',
        description: 'Students learning React and modern web technologies',
        image: 'https://via.placeholder.com/400x300',
        date: '2024-11-15',
        category: 'workshop',
        order: 1
      },
      {
        id: '2',
        title: 'Community Meetup',
        description: 'Our monthly community gathering and networking event',
        image: 'https://via.placeholder.com/400x300',
        date: '2024-11-20',
        category: 'community',
        order: 2
      }
    ];
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(defaultGallery, null, 2));
  }
}

// Generic data operations
function readData<T>(filePath: string): T[] {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

function writeData<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    throw error;
  }
}

// Events operations
export function getEvents(): Event[] {
  initializeDataFiles();
  return readData<Event>(EVENTS_FILE);
}

export function saveEvents(events: Event[]): void {
  writeData(EVENTS_FILE, events);
}

export function addEvent(event: Omit<Event, 'id'>): Event {
  const events = getEvents();
  const newEvent: Event = {
    ...event,
    id: Date.now().toString()
  };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
}

export function updateEvent(id: string, updates: Partial<Event>): boolean {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return false;
  
  events[index] = { ...events[index], ...updates };
  saveEvents(events);
  return true;
}

export function deleteEvent(id: string): boolean {
  const events = getEvents();
  const filtered = events.filter(e => e.id !== id);
  if (filtered.length === events.length) return false;
  
  saveEvents(filtered);
  return true;
}

// Team operations
export function getTeamMembers(): TeamMember[] {
  initializeDataFiles();
  return readData<TeamMember>(TEAM_FILE).sort((a, b) => a.order - b.order);
}

export function saveTeamMembers(members: TeamMember[]): void {
  writeData(TEAM_FILE, members);
}

export function addTeamMember(member: Omit<TeamMember, 'id'>): TeamMember {
  const members = getTeamMembers();
  const newMember: TeamMember = {
    ...member,
    id: Date.now().toString()
  };
  members.push(newMember);
  saveTeamMembers(members);
  return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): boolean {
  const members = getTeamMembers();
  const index = members.findIndex(m => m.id === id);
  if (index === -1) return false;
  
  members[index] = { ...members[index], ...updates };
  saveTeamMembers(members);
  return true;
}

export function deleteTeamMember(id: string): boolean {
  const members = getTeamMembers();
  const filtered = members.filter(m => m.id !== id);
  if (filtered.length === members.length) return false;
  
  saveTeamMembers(filtered);
  return true;
}

// Gallery operations
export function getGalleryItems(): GalleryItem[] {
  initializeDataFiles();
  return readData<GalleryItem>(GALLERY_FILE).sort((a, b) => b.order - a.order);
}

export function saveGalleryItems(items: GalleryItem[]): void {
  writeData(GALLERY_FILE, items);
}

export function addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
  const items = getGalleryItems();
  const newItem: GalleryItem = {
    ...item,
    id: Date.now().toString()
  };
  items.push(newItem);
  saveGalleryItems(items);
  return newItem;
}

export function updateGalleryItem(id: string, updates: Partial<GalleryItem>): boolean {
  const items = getGalleryItems();
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return false;
  
  items[index] = { ...items[index], ...updates };
  saveGalleryItems(items);
  return true;
}

export function deleteGalleryItem(id: string): boolean {
  const items = getGalleryItems();
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length === items.length) return false;
  
  saveGalleryItems(filtered);
  return true;
}
