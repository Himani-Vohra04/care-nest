export type TabType = 'find' | 'book' | 'prep' | 'reminders';

export type UserProfile = 'alex' | 'mom';

export type ThemeMode = 'cyber-lavender' | 'daylight-aura';

export interface Doctor {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  matchScore: number;
  matchLabel: string;
  rating: number;
  reviewCount: number;
  vibe: string;
  copayEst: number;
  nextAvailable: string;
  synergyNote: string;
  avatarUrl: string;
  insuranceAccepted: string[];
  formats: ('video' | 'clinic' | 'home')[];
  address?: string;
  verified: boolean;
}

export interface CuratedQuestion {
  id: number;
  question: string;
  tag: string;
  tagType: 'priority' | 'med' | 'routing' | 'custom';
  context: string;
  copied?: boolean;
}

export interface ReadinessItem {
  id: string;
  title: string;
  detail: string;
  completed: boolean;
  actionText?: string;
  actionType?: 'scan' | 'edit' | 'verify' | 'none';
  badge?: string;
}

export interface PulseItem {
  id: string;
  time: string;
  period: string;
  status: 'taken' | 'pending' | 'due-soon' | 'completed';
  title: string;
  description: string;
  iconType: 'pill' | 'water' | 'visit' | 'moon';
  metaNote?: string;
  actions?: { label: string; action: string; primary?: boolean }[];
  doctorAvatar?: string;
  transitInfo?: { provider: string; eta: string; cost: string };
}

export interface MedicationScanResult {
  medicationName: string;
  dosage: string;
  instructions: string;
  category: string;
  interactionAlert: string;
  dietaryAdvice: string;
  summaryForDoctor: string;
}

export interface InsuranceScanResult {
  payerName: string;
  memberId: string;
  groupNumber: string;
  copaySpecialist: string;
  copayPrimary: string;
  deductibleMet: string;
  telehealthCovered: boolean;
  summary: string;
}
