// Core interfaces with optimized structure for performance
export interface Contact {
  readonly phone: string;
  readonly email: string;
  readonly location: string;
  readonly linkedin?: string;
}

export interface Experience {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly description: string;
  readonly highlights?: readonly string[];
  readonly startDate: Date;
  readonly endDate?: Date;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly context: string;
  readonly description?: string;
  readonly technologies?: readonly string[];
  readonly link?: string;
  readonly featured: boolean;
  readonly status: 'completed' | 'in-progress' | 'planned';
}

export interface Education {
  readonly id: string;
  readonly institution: string;
  readonly period: string;
  readonly degree: string;
  readonly description?: string;
  readonly gpa?: number;
  readonly honors?: readonly string[];
}

export interface Skill {
  readonly name: string;
  readonly category: 'technical' | 'safety' | 'soft' | 'language';
  readonly level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  readonly years?: number;
}

export interface ProfileData {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly contact: Contact;
  readonly about: string;
  readonly experiences: readonly Experience[];
  readonly projects: readonly Project[];
  readonly education: readonly Education[];
  readonly skills: readonly Skill[];
  readonly languages?: readonly string[];
}

// Utility types for better type safety
export type SectionId = 'hero' | 'about' | 'experience' | 'projects' | 'education' | 'skills' | 'contact';

export interface NavigationItem {
  readonly id: SectionId;
  readonly label: string;
}

// Performance optimization types
export interface LazyComponentProps {
  readonly isVisible: boolean;
}

// Form types for contact
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
