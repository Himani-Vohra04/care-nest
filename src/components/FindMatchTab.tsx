import React, { useState } from 'react';
import {
  Sparkles,
  Mic,
  Star,
  CheckCircle2,
  Calendar,
  Shield,
  TrendingUp,
  ThumbsUp,
  Bookmark,
  ChevronRight,
  SlidersHorizontal,
  Video,
  MapPin,
  Heart,
  Palette,
  Users,
} from 'lucide-react';
import { Doctor, UserProfile } from '../types';
import { DOCTORS } from '../data/mockData';

interface FindMatchTabProps {
  onSelectDoctorForBooking: (doctor: Doctor) => void;
  profile: UserProfile;
  onSetProfile: (profile: UserProfile) => void;
  onOpenThemeToggle: () => void;
}

export const FindMatchTab: React.FC<FindMatchTabProps> = ({
  onSelectDoctorForBooking,
  profile,
  onSetProfile,
  onOpenThemeToggle,
}) => {
  const [searchQuery, setSearchQuery] = useState(
    'Find an anxiety-affirming ADHD doc who accepts Cigna near Bushwick under $40 copay'
  );
  const [isListening, setIsListening] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    '98%+ Match',
    'In-Network (Synced)',
  ]);
  const [bookmarkedDocs, setBookmarkedDocs] = useState<string[]>(['maya-lin']);
  const [selectedVibeChips, setSelectedVibeChips] = useState<string[]>([
    'Vibe Check',
    'Queer Friendly',
    'Takes Cigna',
  ]);
  const [isSearchingAI, setIsSearchingAI] = useState(false);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const toggleVibeChip = (chip: string) => {
    setSelectedVibeChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSimulateVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleExecuteAISearch();
    }, 1800);
  };

  const handleExecuteAISearch = async () => {
    setIsSearchingAI(true);
    try {
      const res = await fetch('/api/gemini/matchmaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.fastFilterRecommendations) {
          setActiveFilters(json.data.fastFilterRecommendations);
        }
      }
    } catch (e) {
      console.warn('Matchmaker offline fallback', e);
    } finally {
      setIsSearchingAI(false);
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      {/* Segmented Booking For Toggle */}
      <div className="flex items-center justify-between p-1.5 rounded-full bg-white/[0.04] border border-white/10">
        <div className="flex items-center space-x-1.5 px-3 text-[11px] font-bold uppercase tracking-wider text-[#958da1]">
          <Users className="w-3.5 h-3.5 text-[#d2bcff]" />
          <span>Booking For</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onSetProfile('alex')}
            className={`flex items-center space-x-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all ${
              profile === 'alex'
                ? 'bg-[#8a4dff] text-white shadow-md shadow-[#8a4dff]/30'
                : 'text-[#ccc3d8] hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00f2d1]" />
            <span>Me (Alex)</span>
          </button>
          <button
            onClick={() => onSetProfile('mom')}
            className={`flex items-center space-x-1.5 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              profile === 'mom'
                ? 'bg-[#ff758f] text-black shadow-md shadow-[#ff758f]/30'
                : 'text-[#ccc3d8] hover:text-white'
            }`}
          >
            <span>Mom (Caregiver)</span>
          </button>
        </div>
      </div>

      {/* Ask NestAI Matchmaker Interactive Card */}
      <div className="relative rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#1d1f29] via-[#191b24] to-[#11131c] border border-[#8a4dff]/30 shadow-xl space-y-3 overflow-hidden">
        {/* Ambient Purple Highlight */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8a4dff]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#8a4dff]/25 text-[#d2bcff] flex items-center justify-center border border-[#8a4dff]/40">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#d2bcff]">
              Ask NestAI Matchmaker
            </span>
          </div>

          {/* Voice Input Mic */}
          <button
            onClick={handleSimulateVoice}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
              isListening
                ? 'bg-[#ff758f] text-black border-[#ff758f] animate-pulse shadow-lg shadow-[#ff758f]/40'
                : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/80 border-white/10'
            }`}
            title="Speak query"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Natural Language Prompt Search Bar */}
        <div className="relative">
          <textarea
            rows={2}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleExecuteAISearch();
              }
            }}
            placeholder="Describe what kind of doctor and vibe you need..."
            className="w-full text-xs font-medium leading-relaxed bg-black/40 border border-white/15 focus:border-[#8a4dff] rounded-2xl p-3 text-white placeholder-white/40 focus:outline-none transition-all resize-none shadow-inner"
          />
          {isSearchingAI && (
            <div className="absolute inset-0 bg-black/60 rounded-2xl backdrop-blur-xs flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-[#00f2d1] border-t-transparent animate-spin" />
              <span className="text-xs text-[#00f2d1] font-semibold">
                NestAI filtering providers...
              </span>
            </div>
          )}
        </div>

        {/* Smart Query Tags */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <button
            onClick={() => toggleVibeChip('Vibe Check')}
            className={`py-1 px-3 rounded-full text-[11px] font-semibold flex items-center space-x-1 transition-all ${
              selectedVibeChips.includes('Vibe Check')
                ? 'bg-[#8a4dff]/25 text-[#d2bcff] border border-[#8a4dff]/50'
                : 'bg-white/[0.05] text-[#958da1] border border-white/10'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Vibe Check</span>
          </button>

          <button
            onClick={() => toggleVibeChip('Queer Friendly')}
            className={`py-1 px-3 rounded-full text-[11px] font-semibold flex items-center space-x-1 transition-all ${
              selectedVibeChips.includes('Queer Friendly')
                ? 'bg-[#00f2d1]/20 text-[#00f2d1] border border-[#00f2d1]/40'
                : 'bg-white/[0.05] text-[#958da1] border border-white/10'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Queer Friendly</span>
          </button>

          <button
            onClick={() => toggleVibeChip('Takes Cigna')}
            className={`py-1 px-3 rounded-full text-[11px] font-semibold flex items-center space-x-1 transition-all ${
              selectedVibeChips.includes('Takes Cigna')
                ? 'bg-white/[0.12] text-white border border-white/25'
                : 'bg-white/[0.05] text-[#958da1] border border-white/10'
            }`}
          >
            <Shield className="w-3 h-3 text-[#00f2d1]" />
            <span>Takes Cigna</span>
          </button>
        </div>
      </div>

      {/* Fast Smart Filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-extrabold uppercase tracking-wider text-[#958da1]">
            Fast Smart Filters
          </span>
          <button
            onClick={() => setActiveFilters([])}
            className="text-[#00f2d1] hover:underline font-semibold"
          >
            Reset ({activeFilters.length} active)
          </button>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: '98%+ Match', label: '⭐ 98%+ Match', style: 'teal' },
            { id: 'In-Network (Synced)', label: '☑️ In-Network (Synced)', style: 'violet' },
            { id: 'Telehealth', label: '💻 Telehealth', style: 'neutral' },
            { id: 'Sensory Safe', label: '🌱 Sensory Safe', style: 'neutral' },
          ].map((item) => {
            const isActive = activeFilters.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleFilter(item.id)}
                className={`shrink-0 py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? item.style === 'teal'
                      ? 'bg-[#00f2d1] text-[#00382f] font-bold shadow-md shadow-[#00f2d1]/25'
                      : 'bg-[#8a4dff] text-white font-bold shadow-md shadow-[#8a4dff]/25'
                    : 'bg-white/[0.05] text-[#ccc3d8] hover:bg-white/[0.09] border border-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Curated Matches Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#00f2d1] shadow-[0_0_8px_#00f2d1]" />
          <h2 className="text-base font-bold text-white tracking-tight">Top Curated Matches</h2>
        </div>
        <span className="text-[11px] font-medium text-[#ccc3d8]/80">Bushwick • Cigna Choice</span>
      </div>

      {/* Provider Cards Stack */}
      <div className="space-y-4">
        {/* Doctor 1: Dr. Maya Lin, DO (Primary Target) */}
        <div
          onClick={() => onSelectDoctorForBooking(DOCTORS[0])}
          className="relative rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.12] hover:border-[#8a4dff]/50 shadow-xl transition-all duration-200 group cursor-pointer space-y-4"
        >
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3.5">
              <div className="relative">
                <img
                  src={DOCTORS[0].avatarUrl}
                  alt={DOCTORS[0].name}
                  className="w-14 h-14 rounded-2xl object-cover border border-white/15 group-hover:scale-102 transition-transform shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00f2d1] text-[#00382f] flex items-center justify-center border-2 border-[#141620]">
                  <CheckCircle2 className="w-3 h-3 fill-current" />
                </span>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Dr. Maya Lin, DO
                  </h3>
                </div>
                <p className="text-xs text-[#ccc3d8]">{DOCTORS[0].specialty}</p>
                <div className="flex items-center space-x-1.5 mt-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#d2bcff] text-[#d2bcff]" />
                  <span className="font-bold text-white">{DOCTORS[0].rating}</span>
                  <span className="text-[11px] text-[#958da1]">
                    ({DOCTORS[0].reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Match Badge */}
            <div className="flex flex-col items-end">
              <span className="px-2.5 py-1 rounded-full bg-[#8a4dff] text-white text-xs font-extrabold shadow-md shadow-[#8a4dff]/40">
                99% Match
              </span>
              <span className="text-[10px] font-semibold text-[#d2bcff] mt-0.5 tracking-tight">
                Super Synergy
              </span>
            </div>
          </div>

          {/* Vibe and Copay Pills */}
          <div className="flex flex-wrap gap-1.5">
            <span className="py-1 px-3 rounded-full bg-[#00f2d1]/15 text-[#00f2d1] text-xs font-semibold border border-[#00f2d1]/30 flex items-center gap-1">
              <span>😊</span>
              <span>Vibe: Super Chill & Attentive</span>
            </span>
            <span className="py-1 px-3 rounded-full bg-[#00f2d1]/15 text-[#00f2d1] text-xs font-semibold border border-[#00f2d1]/30 flex items-center gap-1">
              <span>💬</span>
              <span>$25 Est. Copay</span>
            </span>
          </div>

          {/* Availability Slot */}
          <div className="flex items-center space-x-2 text-xs text-[#ccc3d8] bg-black/30 px-3 py-2 rounded-xl border border-white/[0.06]">
            <Calendar className="w-3.5 h-3.5 text-[#d2bcff]" />
            <span className="font-medium">Available Tomorrow 3:15 PM</span>
          </div>

          {/* Synergy statement */}
          <div className="flex items-start space-x-2.5 text-xs text-[#e1e1ef] bg-white/[0.03] p-3 rounded-2xl border border-white/[0.08]">
            <TrendingUp className="w-4 h-4 text-[#d2bcff] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Matches your preference for{' '}
              <strong className="text-white font-semibold">trauma-informed, unhurried consultations</strong>{' '}
              and has specialized adult ADHD certification.
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectDoctorForBooking(DOCTORS[0]);
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#8a4dff] to-[#722ee6] hover:from-[#9b66ff] hover:to-[#8a4dff] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-[#8a4dff]/30 transition-transform active:scale-98"
            >
              <span>Book in 2 Taps</span>
              <span className="text-[#00f2d1]">⚡</span>
            </button>

            <button
              onClick={(e) => toggleBookmark('maya-lin', e)}
              className={`p-3 rounded-2xl border transition-all active:scale-95 ${
                bookmarkedDocs.includes('maya-lin')
                  ? 'bg-white/[0.12] border-[#8a4dff] text-[#d2bcff]'
                  : 'bg-white/[0.05] border-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  bookmarkedDocs.includes('maya-lin') ? 'fill-current' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Doctor 2: Dr. Jordan Rivera */}
        <div
          onClick={() => onSelectDoctorForBooking(DOCTORS[1])}
          className="relative rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.1] hover:border-[#00f2d1]/50 shadow-lg transition-all group cursor-pointer space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3.5">
              <div className="relative">
                <img
                  src={DOCTORS[1].avatarUrl}
                  alt={DOCTORS[1].name}
                  className="w-14 h-14 rounded-2xl object-cover border border-white/15 group-hover:scale-102 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00f2d1] text-[#00382f] flex items-center justify-center border-2 border-[#141620]">
                  <CheckCircle2 className="w-3 h-3 fill-current" />
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Dr. Jordan Rivera, MD
                </h3>
                <p className="text-xs text-[#ccc3d8]">{DOCTORS[1].specialty}</p>
                <div className="flex items-center space-x-1.5 mt-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#d2bcff] text-[#d2bcff]" />
                  <span className="font-bold text-white">{DOCTORS[1].rating}</span>
                  <span className="text-[11px] text-[#958da1]">
                    ({DOCTORS[1].reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="px-2.5 py-1 rounded-full bg-[#00f2d1] text-[#00382f] text-xs font-extrabold shadow-md shadow-[#00f2d1]/30">
                95% Match
              </span>
              <span className="text-[10px] font-semibold text-[#00f2d1] mt-0.5">
                High Fit
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="py-1 px-3 rounded-full bg-white/[0.06] text-[#e1e1ef] text-xs font-semibold border border-white/10 flex items-center gap-1">
              <Video className="w-3 h-3 text-[#d2bcff]" />
              <span>Virtual Only</span>
            </span>
            <span className="py-1 px-3 rounded-full bg-[#00f2d1]/15 text-[#00f2d1] text-xs font-semibold border border-[#00f2d1]/30 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>$0 with Aetna & Cigna</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#ccc3d8] bg-black/30 px-3 py-2 rounded-xl border border-white/[0.06]">
            <Calendar className="w-3.5 h-3.5 text-[#00f2d1]" />
            <span className="font-medium">Next slot: Thursday 11:00 AM</span>
          </div>

          <div className="flex items-start space-x-2.5 text-xs text-[#e1e1ef] bg-white/[0.03] p-3 rounded-2xl border border-white/[0.08]">
            <ThumbsUp className="w-4 h-4 text-[#00f2d1] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Highly rated by first-time therapy patients for{' '}
              <strong className="text-white font-semibold">warm demeanor and zero judgment</strong>{' '}
              during initial diagnosis chats.
            </p>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectDoctorForBooking(DOCTORS[1]);
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold text-xs flex items-center justify-center space-x-2 border border-white/15 transition-all"
            >
              <span>Schedule Video Call</span>
              <Calendar className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => toggleBookmark('jordan-rivera', e)}
              className={`p-3 rounded-2xl border transition-all ${
                bookmarkedDocs.includes('jordan-rivera')
                  ? 'bg-white/[0.12] border-[#8a4dff] text-[#d2bcff]'
                  : 'bg-white/[0.05] border-white/10 text-white/70'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  bookmarkedDocs.includes('jordan-rivera') ? 'fill-current' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Doctor 3: Dr. Chloe Park */}
        <div
          onClick={() => onSelectDoctorForBooking(DOCTORS[2])}
          className="relative rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.1] hover:border-white/25 shadow-lg transition-all group cursor-pointer space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3.5">
              <div className="relative">
                <img
                  src={DOCTORS[2].avatarUrl}
                  alt={DOCTORS[2].name}
                  className="w-14 h-14 rounded-2xl object-cover border border-white/15"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00f2d1] text-[#00382f] flex items-center justify-center border-2 border-[#141620]">
                  <CheckCircle2 className="w-3 h-3 fill-current" />
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Dr. Chloe Park, MD
                </h3>
                <p className="text-xs text-[#ccc3d8]">{DOCTORS[2].specialty}</p>
                <div className="flex items-center space-x-1.5 mt-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#d2bcff] text-[#d2bcff]" />
                  <span className="font-bold text-white">{DOCTORS[2].rating}</span>
                  <span className="text-[11px] text-[#958da1]">
                    ({DOCTORS[2].reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="px-2.5 py-1 rounded-full bg-white/[0.1] text-white text-xs font-bold border border-white/15">
                94% Match
              </span>
              <span className="text-[10px] text-[#958da1] mt-0.5">Specialist</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="py-1 px-3 rounded-full bg-white/[0.06] text-[#e1e1ef] text-xs font-semibold border border-white/10 flex items-center gap-1">
              <span>📷</span>
              <span>In-clinic & Photo Consult</span>
            </span>
            <span className="py-1 px-3 rounded-full bg-[#00f2d1]/15 text-[#00f2d1] text-xs font-semibold border border-[#00f2d1]/30 flex items-center gap-1">
              <span>💲</span>
              <span>Verified transparent pricing</span>
            </span>
          </div>

          <button
            onClick={() => onSelectDoctorForBooking(DOCTORS[2])}
            className="w-full py-3 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs flex items-center justify-center space-x-2 border border-white/10 transition-all"
          >
            <span>View Availability</span>
            <ChevronRight className="w-4 h-4 text-[#d2bcff]" />
          </button>
        </div>
      </div>

      {/* Theme Info Banner */}
      <button
        onClick={onOpenThemeToggle}
        className="w-full p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between transition-all group text-left"
      >
        <div className="flex items-center space-x-2.5">
          <Palette className="w-4 h-4 text-[#d2bcff] group-hover:rotate-12 transition-transform" />
          <div className="text-xs">
            <span className="font-bold text-white">Theme: Cyber Lavender Active</span>
            <p className="text-[10px] text-[#958da1]">
              Tap top-right sun icon to flip to Daylight Aura
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#958da1] group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
