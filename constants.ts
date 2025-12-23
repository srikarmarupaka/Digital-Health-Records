import { Doctor, HealthRecord, Medicine, DiagnosticTest, User, Hospital } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  age: 34,
  gender: 'Male',
  address: '123 Maple Avenue, Springfield',
  phoneNumber: '5550123456',
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  chronicConditions: ['Type 2 Diabetes (Managed)', 'Mild Asthma'],
  emergencyContact: {
    name: 'Martha Johnson',
    phone: '555-999-8888',
    relation: 'Mother'
  },
  role: 'PATIENT',
  wellness: {
    height: 178,
    weight: 75,
    steps: 8500,
    waterIntake: 6,
    sleepHours: 7.5,
    activityLevel: 'Moderate'
  },
  dietPlan: [
    { meal: 'Breakfast', time: '08:00 AM', description: 'Oatmeal with berries and almonds', calories: 350 },
    { meal: 'Lunch', time: '01:00 PM', description: 'Grilled chicken salad with olive oil dressing', calories: 550 },
    { meal: 'Snack', time: '04:00 PM', description: 'Greek yogurt with honey', calories: 150 },
    { meal: 'Dinner', time: '07:30 PM', description: 'Baked salmon with steamed broccoli and quinoa', calories: 600 }
  ]
};

export const MOCK_DOCTOR_USER: User = {
  id: 'd1',
  name: 'Dr. Sarah Smith',
  phoneNumber: '5559876543',
  bloodGroup: 'A+',
  allergies: [],
  role: 'DOCTOR',
  image: 'https://picsum.photos/100/100?random=1'
};

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    address: '123 Medical Center Dr, Downtown',
    phone: '(555) 111-2222',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=300&h=200',
    departments: ['Cardiology', 'Emergency', 'Pediatrics'],
    location: { lat: 40.7128, lng: -74.0060 },
    distance: '0.8 miles'
  },
  {
    id: 'h2',
    name: 'MediCare Hub',
    address: '45 Wellness Ave, Westside',
    phone: '(555) 333-4444',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300&h=200',
    departments: ['General Medicine', 'Dermatology', 'Diagnostics'],
    location: { lat: 40.7282, lng: -73.9942 },
    distance: '2.3 miles'
  },
  {
    id: 'h3',
    name: 'Skin & Wellness Clinic',
    address: '89 Beauty Lane, Uptown',
    phone: '(555) 555-6666',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0926146?auto=format&fit=crop&q=80&w=300&h=200',
    departments: ['Dermatology', 'Cosmetology'],
    location: { lat: 40.7589, lng: -73.9851 },
    distance: '4.1 miles'
  }
];

export const MOCK_RECORDS: HealthRecord[] = [
  {
    id: 'r1',
    patientId: 'u1',
    date: '2023-10-15',
    type: 'Diagnosis',
    title: 'Acute Bronchitis',
    doctor: 'Dr. Sarah Smith',
    hospital: 'City General Hospital',
    summary: 'Diagnosed with acute bronchitis following a 3-day cough.',
    details: 'Patient presented with productive cough and mild fever (38C). Lung auscultation revealed wheezing. Prescribed antibiotics and rest. Follow up in 1 week.'
  },
  {
    id: 'r2',
    patientId: 'u1',
    date: '2023-08-20',
    type: 'Lab Report',
    title: 'Annual Blood Work',
    doctor: 'LabCorp Diagnostics',
    hospital: 'N/A',
    summary: 'Cholesterol slightly elevated. Vitamin D deficiency.',
    details: 'Lipid Panel: LDL 140 mg/dL (High). Vitamin D: 18 ng/mL (Low). Complete Blood Count (CBC) within normal limits. Recommendation: Vitamin D supplementation 2000 IU daily.'
  },
  {
    id: 'r3',
    patientId: 'u1',
    date: '2023-05-10',
    type: 'Prescription',
    title: 'Dermatology Consult',
    doctor: 'Dr. Emily Chen',
    hospital: 'Skin & Wellness Clinic',
    summary: 'Prescription for Eczema flare-up.',
    details: 'Rx: Hydrocortisone 2.5% Cream. Apply twice daily to affected areas for 7 days. Avoid harsh soaps.',
    status: 'Active',
    refillsRemaining: 2
  },
  {
    id: 'r4',
    patientId: 'u1',
    date: '2023-11-01',
    type: 'Prescription',
    title: 'Diabetes Management',
    doctor: 'Dr. James Wilson',
    hospital: 'MediCare Hub',
    summary: 'Maintenance medication for Type 2 Diabetes.',
    details: 'Rx: Metformin 500mg. Take 1 tablet twice daily with meals.',
    status: 'Active',
    refillsRemaining: 3
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiologist',
    hospitalId: 'h1',
    hospitalName: 'City General Hospital',
    rating: 4.9,
    available: true,
    image: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 'd2',
    name: 'Dr. James Wilson',
    specialty: 'General Physician',
    hospitalId: 'h2',
    hospitalName: 'MediCare Hub',
    rating: 4.7,
    available: true,
    image: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: 'd3',
    name: 'Dr. Emily Chen',
    specialty: 'Dermatologist',
    hospitalId: 'h3',
    hospitalName: 'Skin & Wellness Clinic',
    rating: 4.8,
    available: false,
    image: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: 'd4',
    name: 'Dr. Raj Patel',
    specialty: 'Emergency Medicine',
    hospitalId: 'h1',
    hospitalName: 'City General Hospital',
    rating: 4.9,
    available: true,
    image: 'https://picsum.photos/100/100?random=4'
  }
];

export const MOCK_MEDICINES: Medicine[] = [
  { id: 'm1', name: 'Paracetamol 500mg', dosage: '1 tablet every 6 hours', price: 5.00, requiresPrescription: false },
  { id: 'm2', name: 'Amoxicillin 500mg', dosage: '1 tablet every 8 hours', price: 12.50, requiresPrescription: true },
  { id: 'm3', name: 'Vitamin D3 2000IU', dosage: '1 softgel daily', price: 15.00, requiresPrescription: false },
  { id: 'm4', name: 'Cetirizine 10mg', dosage: '1 tablet daily', price: 8.00, requiresPrescription: false },
  { id: 'm5', name: 'Metformin 500mg', dosage: '1 tablet twice daily', price: 10.00, requiresPrescription: true },
];

export const MOCK_TESTS: DiagnosticTest[] = [
  { id: 't1', name: 'Complete Blood Count (CBC)', tat: '24 Hours', price: 20 },
  { id: 't2', name: 'Lipid Profile', tat: '24 Hours', price: 35 },
  { id: 't3', name: 'Thyroid Function Test', tat: '48 Hours', price: 40 },
  { id: 't4', name: 'MRI Scan (Brain)', tat: '3 Days', price: 300 },
];