export enum AppView {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  RECORDS = 'RECORDS',
  CONSULTATION = 'CONSULTATION',
  PHARMACY = 'PHARMACY',
  DIAGNOSTICS = 'DIAGNOSTICS',
  AMBULANCE = 'AMBULANCE',
  AI_ASSISTANT = 'AI_ASSISTANT',
  DOCTOR_PORTAL = 'DOCTOR_PORTAL',
  WELLNESS = 'WELLNESS',
  PROFILE = 'PROFILE'
}

export type UserRole = 'PATIENT' | 'DOCTOR';

export interface DietItem {
  meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  time: string;
  description: string;
  calories: number;
}

export interface WellnessMetrics {
  height: number; // cm
  weight: number; // kg
  steps: number; // daily avg
  waterIntake: number; // glasses
  sleepHours: number;
  activityLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Active';
}

export interface User {
  id: string;
  name: string;
  email?: string;
  age?: number;
  gender?: string;
  address?: string;
  phoneNumber: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
  role: UserRole;
  image?: string;
  wellness?: WellnessMetrics;
  dietPlan?: DietItem[];
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  departments: string[];
  location: { lat: number, lng: number };
  distance?: string; // Mock distance text
}

export interface HealthRecord {
  id: string;
  patientId: string;
  date: string;
  type: 'Prescription' | 'Lab Report' | 'Diagnosis' | 'Vaccination';
  title: string;
  doctor: string;
  hospital: string;
  summary: string;
  details: string; // Markdown or plain text content
  attachments?: string[];
  // Prescription specific fields
  status?: 'Active' | 'Refill Requested' | 'Fulfilled' | 'Expired';
  refillsRemaining?: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospitalId: string;
  hospitalName: string; // Denormalized for easier display
  rating: number;
  available: boolean;
  image: string;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  price: number;
  requiresPrescription: boolean;
}

export interface DiagnosticTest {
  id: string;
  name: string;
  tat: string; // Turn Around Time
  price: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}