import { Doctor, CuratedQuestion, ReadinessItem, PulseItem } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: 'maya-lin',
    name: 'Dr. Maya Lin',
    credentials: 'DO',
    specialty: 'Neurodiversity & Holistic Care',
    matchScore: 99,
    matchLabel: 'Super Synergy',
    rating: 4.98,
    reviewCount: 184,
    vibe: 'Super Chill & Attentive',
    copayEst: 25,
    nextAvailable: 'Tomorrow 3:15 PM',
    synergyNote:
      'Matches your preference for trauma-informed, unhurried consultations and has specialized adult ADHD certification.',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813633-5c8e39268f70?auto=format&fit=crop&q=80&w=260',
    insuranceAccepted: ['Cigna', 'Aetna', 'United Healthcare', 'Empire BlueCross'],
    formats: ['video', 'clinic', 'home'],
    address: 'Bushwick Hub • 1087 Flushing Ave, Brooklyn',
    verified: true,
  },
  {
    id: 'jordan-rivera',
    name: 'Dr. Jordan Rivera',
    credentials: 'MD',
    specialty: 'Adolescent & Young Adult Psychiatry',
    matchScore: 95,
    matchLabel: 'High Fit',
    rating: 4.94,
    reviewCount: 92,
    vibe: 'Warm & Non-Judgmental',
    copayEst: 0,
    nextAvailable: 'Thursday 11:00 AM',
    synergyNote:
      'Highly rated by first-time therapy patients for warm demeanor and zero judgment during initial diagnosis chats.',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=260',
    insuranceAccepted: ['Aetna', 'Cigna', 'Oscar'],
    formats: ['video'],
    verified: true,
  },
  {
    id: 'chloe-park',
    name: 'Dr. Chloe Park',
    credentials: 'MD',
    specialty: 'Dermatology & Acne Tele-care',
    matchScore: 94,
    matchLabel: 'Specialist',
    rating: 4.91,
    reviewCount: 64,
    vibe: 'Direct & Action-Oriented',
    copayEst: 35,
    nextAvailable: 'Friday 2:00 PM',
    synergyNote:
      'Specializes in low-irritation routines for neurodivergent sensory profiles with verified upfront pricing.',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=260',
    insuranceAccepted: ['Cigna', 'Aetna', 'BCBS'],
    formats: ['clinic', 'video'],
    address: 'Greenpoint Health Suites, Brooklyn',
    verified: true,
  },
];

export const INITIAL_QUESTIONS: CuratedQuestion[] = [
  {
    id: 1,
    question: 'Can we rule out iron vs thyroid given my consistent 2PM crash and sudden fatigue spike?',
    tag: 'High Priority',
    tagType: 'priority',
    context: 'Matches 4 logged episodes',
  },
  {
    id: 2,
    question: 'Are there modern medication adjustment options with lower GI distress for morning dosing?',
    tag: 'Medication Check',
    tagType: 'med',
    context: 'Logged nausea 3x',
  },
  {
    id: 3,
    question: 'Could we place a routine blood work order dispatched directly to Quest on Bedford Ave?',
    tag: 'Direct Routing',
    tagType: 'routing',
    context: '0.4 mi from home',
  },
];

export const INITIAL_READINESS: ReadinessItem[] = [
  {
    id: 'insurance',
    title: 'Insurance card photo uploaded',
    detail: 'Aetna Silver POS ending in •••• 8419',
    completed: true,
    badge: 'Verified',
  },
  {
    id: 'fasting',
    title: 'Fasting instructions reviewed',
    detail: 'Fast 8 hours prior if morning lipid panel is drawn (water is OK).',
    completed: true,
  },
  {
    id: 'supplements',
    title: 'Add OTC supplements & vitamins',
    detail: 'Prevents prescription interactions with Dr. Maya Lin.',
    completed: false,
    actionText: 'Scan Bottle',
    actionType: 'scan',
  },
  {
    id: 'emergency',
    title: 'Confirm emergency contact details',
    detail: 'Jordan Rivera (Partner) • +1(917) 555-0149',
    completed: false,
    actionText: 'Edit',
    actionType: 'edit',
  },
  {
    id: 'telemetry',
    title: 'Biometric baseline shared',
    detail: 'Apple Health heart-rate & sleep sync active for appointment review.',
    completed: true,
    badge: 'Synced',
  },
];

export const INITIAL_PULSE: PulseItem[] = [
  {
    id: 'pulse-1',
    time: '8:00 AM',
    period: 'MORNING',
    status: 'taken',
    title: 'Sertraline 50mg + Vit-D',
    description: 'With oat milk matcha latte. Clean absorption.',
    iconType: 'pill',
    metaNote: '14-day streak intact! No stress today. Recorded 8:04 AM',
  },
  {
    id: 'pulse-2',
    time: '1:00 PM',
    period: 'BIO-SYNC',
    status: 'due-soon',
    title: 'Hydration & Spine Reset',
    description: 'NestAI: Take 3 deep breaths, drop your shoulders, and chug 200ml iced water.',
    iconType: 'water',
    actions: [
      { label: '✓ Sipped & Stretched', action: 'complete-bio', primary: true },
      { label: '+10m', action: 'snooze-10', primary: false },
    ],
  },
  {
    id: 'pulse-3',
    time: '3:15 PM',
    period: 'IN 35 MINS',
    status: 'pending',
    title: 'Visit: Dr. Maya Lin, MD',
    description: 'Prep Lab notes locked & shared. Transit commute is 22 mins.',
    iconType: 'visit',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813633-5c8e39268f70?auto=format&fit=crop&q=80&w=260',
    transitInfo: {
      provider: 'UberX Priority',
      eta: '4 min away',
      cost: '~$14.20',
    },
    actions: [
      { label: '▲ Ride & Map ETA', action: 'open-ride', primary: true },
      { label: 'Prep Lab', action: 'open-prep', primary: false },
    ],
  },
  {
    id: 'pulse-4',
    time: '9:00 PM',
    period: 'TONIGHT',
    status: 'pending',
    title: 'Magnesium Glycinate 200mg',
    description: 'Deep REM support & blue light cutoff reminder.',
    iconType: 'moon',
    actions: [
      { label: 'Log Early', action: 'log-magnesium', primary: false },
      { label: 'Snooze 30m', action: 'snooze-30', primary: false },
    ],
  },
];

// Sample images for testing the real-time AI scanner without physical camera
export const SAMPLE_BOTTLES = [
  {
    id: 'magnesium',
    name: 'Magnesium Glycinate 200mg',
    label: 'High Absorption Chelate • 200mg per serving • Non-GMO',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    category: 'OTC Supplement',
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha KSM-66 & L-Theanine',
    label: 'Stress & Cortisol Response • 600mg • Take with evening water',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
    category: 'Herbal Adaptogen',
  },
  {
    id: 'vitd3',
    name: 'Vitamin D3 + K2 Liquid Drops',
    label: '5000 IU Immune & Mood Support • 1 drop daily with morning fatty meal',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400',
    category: 'Vitamin Supplement',
  },
];

export const SAMPLE_INSURANCE_CARDS = [
  {
    id: 'cigna-gold',
    name: 'Cigna Open Access Plus Card',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=500',
    payer: 'Cigna Health & Life',
    copay: '$25 Specialist / $10 PCP',
  },
];
