import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Video,
  Building,
  Home,
  Clock,
  Sparkles,
  Users,
  CheckCircle2,
  ChevronRight,
  Sun,
  Flame,
  Moon,
  Info,
  CalendarCheck,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import { Doctor } from '../types';
import { DOCTORS } from '../data/mockData';

interface BookTabProps {
  selectedDoctor?: Doctor;
  onLockInAppointment: (appointmentDetails: any) => void;
  onOpenArtGenerator: () => void;
  safeSpaceBannerUrl: string;
}

export const BookTab: React.FC<BookTabProps> = ({
  selectedDoctor = DOCTORS[0],
  onLockInAppointment,
  onOpenArtGenerator,
  safeSpaceBannerUrl,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'video' | 'clinic' | 'home'>('video');
  const [selectedDay, setSelectedDay] = useState('THU 25');
  const [selectedSlot, setSelectedSlot] = useState('9:30 AM');
  const [supportPersonEnabled, setSupportPersonEnabled] = useState(false);
  const [supportPersonContact, setSupportPersonContact] = useState('Jordan Rivera (Partner) • +1(917) 555-0149');
  const [isPreIntakeReviewed, setIsPreIntakeReviewed] = useState(false);
  const [showPreIntakeModal, setShowPreIntakeModal] = useState(false);

  const days = [
    { day: 'WED', date: '24' },
    { day: 'THU', date: '25' },
    { day: 'FRI', date: '26' },
    { day: 'SAT', date: '27' },
    { day: 'SUN', date: '28' },
  ];

  const timeSlots = [
    {
      time: '9:30 AM',
      tag: 'Morning Mindful',
      desc: 'Low sensory rush • Doctor is fully refreshed',
      icon: <Sun className="w-4 h-4 text-[#ffb2bc]" />,
      badgeColor: 'neutral',
    },
    {
      time: '12:15 PM',
      tag: 'Lunch Break',
      desc: 'Punctual 25-min check-in before work resumed',
      icon: <Sun className="w-4 h-4 text-[#00f2d1]" />,
      badgeColor: 'neutral',
    },
    {
      time: '4:45 PM',
      tag: 'High Demand',
      desc: 'After classes / work wrap-up',
      icon: <Flame className="w-4 h-4 text-[#00f2d1]" />,
      badgeColor: 'teal',
    },
    {
      time: '6:30 PM',
      tag: 'Sunset Chill',
      desc: 'No daytime multitasking distractions',
      icon: <Moon className="w-4 h-4 text-[#d2bcff]" />,
      badgeColor: 'neutral',
    },
  ];

  const handleBook = () => {
    onLockInAppointment({
      doctor: selectedDoctor,
      format: selectedFormat,
      day: selectedDay,
      time: selectedSlot,
      copay: '$25.00',
      supportPerson: supportPersonEnabled ? supportPersonContact : null,
    });
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      {/* Doctor Summary Header Card */}
      <div className="rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.12] shadow-xl space-y-3.5">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3.5">
            <div className="relative">
              <img
                src={selectedDoctor.avatarUrl}
                alt={selectedDoctor.name}
                className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00f2d1] text-[#00382f] flex items-center justify-center border-2 border-[#141620]">
                <CheckCircle2 className="w-3 h-3 fill-current" />
              </span>
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {selectedDoctor.name}, {selectedDoctor.credentials}
              </h2>
              <p className="text-xs text-[#ccc3d8]">
                Neurodiversity & Integrative Care
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <span className="text-[#d2bcff]">★</span> 4.97
                </span>
                <span className="text-[11px] text-[#958da1]">(412 vibe reviews)</span>
              </div>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-[#8a4dff]/25 text-[#d2bcff] text-[11px] font-bold border border-[#8a4dff]/40">
            Top Empathy
          </span>
        </div>

        {/* Insurance pre-check status bar */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-black/40 border border-white/[0.08] text-xs">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#00f2d1]" />
            <div>
              <span className="font-bold text-white">Cigna Open Access Plus</span>
              <p className="text-[10px] text-[#00f2d1] font-semibold">
                Tier 1 • Instant In-Network Pre-Check Complete
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-[#00f2d1]" />
        </div>
      </div>

      {/* No Surprise Bill Pledge Card */}
      <div className="rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-[#00f2d1]/30 shadow-xl space-y-3.5 relative overflow-hidden">
        {/* Subtle Top Glowing Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8a4dff] via-[#00f2d1] to-[#8a4dff]" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#00f2d1]/15 text-[#00f2d1] flex items-center justify-center border border-[#00f2d1]/30">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              No Surprise Bill Pledge
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#00f2d1] text-[#00382f] text-[10px] font-extrabold uppercase tracking-wide">
            Zero Gotchas
          </span>
        </div>

        <p className="text-xs text-[#ccc3d8]">
          Real-time tele-claims validation executed 2 minutes ago.
        </p>

        {/* Transparent Price Breakdown */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2 text-xs">
          <div className="flex justify-between text-[#958da1]">
            <span>Total Standard Visit</span>
            <span className="line-through">$180.00</span>
          </div>
          <div className="flex justify-between text-[#00f2d1] font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Cigna Coverage Portion
            </span>
            <span>-$155.00</span>
          </div>

          <div className="border-t border-white/10 pt-2 flex items-baseline justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#958da1]">
                Your Exact Copay Today
              </p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black text-[#00f2d1]">$25</span>
                <span className="text-sm font-bold text-[#00f2d1]">.00</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-[10px] font-bold text-[#00f2d1] bg-[#00f2d1]/15 px-2.5 py-1 rounded-full border border-[#00f2d1]/30">
              <Lock className="w-3 h-3" />
              <span>Price Locked or Reimbursed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Format & Comfort Level */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight">Format & Comfort Level</h3>
          <span className="text-[11px] text-[#958da1]">Switch anytime</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            {
              id: 'video' as const,
              label: 'Video Visit',
              sub: 'Instant Link',
              icon: <Video className="w-4 h-4" />,
            },
            {
              id: 'clinic' as const,
              label: 'In-Clinic',
              sub: 'Bushwick Hub',
              icon: <Building className="w-4 h-4" />,
            },
            {
              id: 'home' as const,
              label: 'Home Visit',
              sub: 'Mobile Medic',
              icon: <Home className="w-4 h-4" />,
            },
          ].map((fmt) => {
            const isSelected = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                  isSelected
                    ? 'bg-[#8a4dff] text-white shadow-lg shadow-[#8a4dff]/35 border border-[#d2bcff]/50'
                    : 'bg-white/[0.04] text-[#ccc3d8] hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                <div className="mb-1">{fmt.icon}</div>
                <span className="text-xs font-bold leading-tight">{fmt.label}</span>
                <span
                  className={`text-[10px] mt-0.5 ${
                    isSelected ? 'text-[#fffeff]' : 'text-[#958da1]'
                  }`}
                >
                  {fmt.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pick Day & Energy */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Pick Day & Energy</h3>
            <p className="text-[10px] text-[#958da1]">All slots synced in your local Eastern Time</p>
          </div>
          <span className="text-[10px] font-bold text-[#00f2d1] bg-[#00f2d1]/15 px-2 py-0.5 rounded-full border border-[#00f2d1]/30">
            • Fastest: Today
          </span>
        </div>

        {/* Horizontal Calendar Strip */}
        <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {days.map((item) => {
            const key = `${item.day} ${item.date}`;
            const isSelected = selectedDay === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedDay(key)}
                className={`flex-1 min-w-[56px] py-2.5 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#d2bcff] text-[#24005a] font-bold shadow-lg shadow-[#d2bcff]/30 ring-2 ring-[#8a4dff]'
                    : 'bg-white/[0.04] text-[#ccc3d8] hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                <span className="text-[10px] font-bold tracking-wider">{item.day}</span>
                <span className="text-base font-extrabold mt-0.5">{item.date}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#24005a] mt-1" />}
              </button>
            );
          })}
        </div>

        {/* Time Slots List */}
        <div className="space-y-2">
          {timeSlots.map((slot) => {
            const isSelected = selectedSlot === slot.time;
            return (
              <button
                key={slot.time}
                onClick={() => setSelectedSlot(slot.time)}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all ${
                  isSelected
                    ? 'bg-[#8a4dff]/20 border border-[#8a4dff] shadow-lg shadow-[#8a4dff]/20 text-white'
                    : 'bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] text-[#ccc3d8]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[#00f2d1] bg-[#00f2d1]'
                        : 'border-white/30 bg-transparent'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">{slot.time}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          slot.badgeColor === 'teal'
                            ? 'bg-[#00f2d1]/20 text-[#00f2d1] border border-[#00f2d1]/30'
                            : 'bg-white/[0.08] text-[#ccc3d8]'
                        }`}
                      >
                        {slot.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#958da1] mt-0.5">{slot.desc}</p>
                  </div>
                </div>

                <div className="p-1 text-[#958da1]">{slot.icon}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bring Your Support Person Toggle */}
      <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Users className="w-4 h-4 text-[#00f2d1]" />
            <div>
              <h4 className="text-xs font-bold text-white">Bring Your Support Person</h4>
              <p className="text-[11px] text-[#ccc3d8]">
                Partner, parent, or trusted friend gets auto-invited
              </p>
            </div>
          </div>
          <button
            onClick={() => setSupportPersonEnabled(!supportPersonEnabled)}
            className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
              supportPersonEnabled ? 'bg-[#00f2d1] justify-end' : 'bg-white/20 justify-start'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                supportPersonEnabled ? 'bg-black' : ''
              }`}
            />
          </button>
        </div>

        {supportPersonEnabled && (
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs animate-fade-in">
            <span className="text-[#ccc3d8] truncate">{supportPersonContact}</span>
            <span className="text-[10px] text-[#00f2d1] font-bold">Auto-Sync On</span>
          </div>
        )}
      </div>

      {/* NestAI Pre-Intake status */}
      <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#8a4dff]/20 text-[#d2bcff] flex items-center justify-center border border-[#8a4dff]/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-white">NestAI Pre-Intake</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#00f2d1]/20 text-[#00f2d1] font-bold">
                Ready
              </span>
            </div>
            <p className="text-[10px] text-[#958da1]">Apple Health meds & mood...</p>
          </div>
        </div>

        <button
          onClick={() => setShowPreIntakeModal(true)}
          className="px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold text-[11px] border border-white/15 transition-all"
        >
          {isPreIntakeReviewed ? '✓ Reviewed' : '30s Review'}
        </button>
      </div>

      {/* Safe Space Banner Image with AI Generation Option */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/8] border border-white/10 shadow-lg group">
        <img
          src={safeSpaceBannerUrl}
          alt="Safe space guaranteed"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f2d1]" />
              Safe space guaranteed. Zero lecture, all support.
            </p>
            <button
              onClick={onOpenArtGenerator}
              className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-[10px] text-[#d2bcff] font-bold border border-[#8a4dff]/40 flex items-center space-x-1 transition-transform active:scale-95"
              title="Generate new soothing visual with Gemini Image AI"
            >
              <Sparkles className="w-3 h-3 text-[#00f2d1]" />
              <span>AI Vibe Art</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleBook}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#8a4dff] via-[#722ee6] to-[#00f2d1] hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-[#8a4dff]/30 transition-transform active:scale-98"
        >
          <Lock className="w-4 h-4" />
          <span>Lock In Appointment • $25</span>
        </button>
        <p className="text-[11px] text-center text-[#ccc3d8] flex items-center justify-center gap-1.5">
          <span className="text-[#00f2d1]">😊</span>
          <span>Free instant cancellation up to 2 hrs prior. No awkward calls.</span>
        </p>
      </div>

      {/* Pre-Intake Modal */}
      {showPreIntakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#11131c] border border-white/10 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d2bcff]" />
                NestAI Pre-Intake Review
              </h4>
              <button
                onClick={() => setShowPreIntakeModal(false)}
                className="text-white/60 hover:text-white text-xs"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-[#ccc3d8] leading-relaxed">
              Dr. Maya Lin will receive a secure briefing beforehand so you don't have to repeat your medical trauma story:
            </p>
            <ul className="text-xs space-y-2 text-[#e1e1ef]">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#00f2d1] shrink-0 mt-0.5" />
                <span>Adult ADHD diagnosed 2022 • Sensory light sensitivity</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#00f2d1] shrink-0 mt-0.5" />
                <span>Current regimen: Sertraline 50mg (morning) + Magnesium 200mg</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#00f2d1] shrink-0 mt-0.5" />
                <span>Preference: Non-judgmental, direct answers, Quest Bedford diagnostics</span>
              </li>
            </ul>
            <button
              onClick={() => {
                setIsPreIntakeReviewed(true);
                setShowPreIntakeModal(false);
              }}
              className="w-full py-2.5 rounded-full bg-[#8a4dff] text-white font-bold text-xs"
            >
              Confirm Pre-Intake Briefing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
