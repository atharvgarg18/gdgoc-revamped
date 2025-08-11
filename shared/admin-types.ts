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
  registrationLink?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: 'workshop' | 'event' | 'competition' | 'community';
  order: number;
}

export interface AdminLoginRequest {
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface AdminDataResponse<T> {
  success: boolean;
  data?: T[];
  message: string;
}

export interface AdminCreateResponse {
  success: boolean;
  id?: string;
  message: string;
}

export interface AdminUpdateResponse {
  success: boolean;
  message: string;
}

export interface AdminDeleteResponse {
  success: boolean;
  message: string;
}
