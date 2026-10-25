import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Car,
  Bell,
  Heart,
  Pill,
  Droplets,
  RotateCcw,
  Sliders,
  Send,
  Zap,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { PulseItem, TabType } from '../types';
import { INITIAL_PULSE } from '../data/mockData';

interface RemindersTabProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenBottleScanner: () => void;
}

export const RemindersTab: React.FC<RemindersTabProps> = ({
  onNavigateTab,
  onOpenBottleScanner,
}) => {
  const [pulseList, setPulseList] = useState<PulseItem[]>(INITIAL_PULSE);
  const [activeVibe, setActiveVibe] = useState<'neon' | 'sunrise'>('neon');
  const [refillRequested, setRefillRequested] = useState(false);
  const [caregiverPinged, setCaregiverPinged] = useState(false);
  const [streakCount, setStreakCount] = useState(14);

  const togglePulseItem = (id: string) => {
    setPulseList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === 'taken' ? 'pending' : 'taken';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleActionClick = (actionName: string, itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (actionName === 'complete-bio' || actionName === 'log-magnesium') {
      setPulseList((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, status: 'taken' } : item))
      );
    } else if (actionName === 'open-prep') {
      onNavigateTab('prep');
    } else if (actionName === 'open-ride') {
      alert('Connecting to UberX Priority... Driver assigned: Michael (Toyota Camry) 4 mins away.');
    } else if (actionName === 'snooze-10' || actionName === 'snooze-30') {
      alert('Snoozed reminder. NestAI will nudge you gently in a few minutes.');
    }
  };

  const completedCount = pulseList.filter((p) => p.status === 'taken').length;
  const streakPercent = Math.round((completedCount / pulseList.length) * 100);

  const handleAutoRefill = () => {
    setRefillRequested(true);
    setTimeout(() => {
      alert('Refill order dispatched! Capsule Pharmacy scheduled delivery for Sunday 11:30 AM.');
    }, 500);
  };

  const handlePingCaregiver = () => {
    setCaregiverPinged(true);
    setTimeout(() => setCaregiverPinged(false), 3000);
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      {/* Vibe Matrix Header Selector */}
      <div className="p-3.5 rounded-3xl bg-gradient-to-r from-[#1d1f29] to-[#191b24] border border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-bold text-white">
          <span className="text-base">🎨</span>
          <span>Vibe Matrix</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setActiveVibe('neon')}
            className={`py-1.5 px-3 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeVibe === 'neon'
                ? 'bg-[#8a4dff] text-white shadow-md shadow-[#8a4dff]/40'
                : 'text-[#958da1] hover:text-white'
            }`}
          >
            <span>🔮</span>
            <span>Neon Velvet</span>
          </button>
          <button
            onClick={() => setActiveVibe('sunrise')}
            className={`py-1.5 px-3 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeVibe === 'sunrise'
                ? 'bg-[#ff758f] text-black font-bold shadow-md shadow-[#ff758f]/40'
                : 'text-[#958da1] hover:text-white'
            }`}
          >
            <span>🌸</span>
            <span>Sunrise Glow</span>
          </button>
        </div>
      </div>

      {/* 14-Day Streak Banner */}
      <div className="rounded-3xl p-4.5 bg-gradient-to-r from-[#8a4dff]/20 via-[#1d1f29] to-[#191b24] border border-[#8a4dff]/30 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#8a4dff]/25 text-[#d2bcff] flex items-center justify-center border border-[#8a4dff]/40 shadow-inner">
            <Flame className="w-6 h-6 text-[#ffb2bc]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
              {streakCount}-Day Streak
              <span className="text-[#00f2d1]">⚡</span>
            </h3>
            <p className="text-xs text-[#ccc3d8]">
              Slaying the routine. {completedCount} of {pulseList.length} checked off.
            </p>
          </div>
        </div>

        {/* Circular Progress Meter */}
        <div className="w-10 h-10 rounded-full border-2 border-[#00f2d1] flex items-center justify-center text-xs font-extrabold text-[#00f2d1] bg-[#00f2d1]/10 shadow-[0_0_12px_rgba(0,242,209,0.25)]">
          {streakPercent}%
        </div>
      </div>

      {/* Today's Pulse Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-[#d2bcff]" />
          <h2 className="text-base font-bold text-white tracking-tight">Today's Pulse</h2>
        </div>
        <span className="text-[10px] font-extrabold text-[#00f2d1] bg-[#00f2d1]/15 px-2 py-0.5 rounded-full border border-[#00f2d1]/30">
          OCT 24 • ACTIVE
        </span>
      </div>

      {/* Pulse Timeline Items */}
      <div className="space-y-3">
        {/* Item 1: 8:00 AM Morning Meds (Taken) */}
        <div
          onClick={() => togglePulseItem('pulse-1')}
          className="rounded-3xl p-4.5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.1] hover:border-[#00f2d1]/40 shadow-lg transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                  pulseList[0].status === 'taken'
                    ? 'bg-[#00f2d1] border-[#00f2d1] text-[#00382f]'
                    : 'border-white/30 bg-transparent text-transparent'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold text-[#00f2d1] tracking-wider uppercase">
                    8:00 AM • Morning
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#00f2d1]/20 text-[#00f2d1]">
                    Taken
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Sertraline 50mg + Vit-D
                </h4>
                <p className="text-xs text-[#ccc3d8] mt-0.5">
                  With oat milk matcha latte. Clean absorption.
                </p>
              </div>
            </div>

            {/* Pill Capsule Visual */}
            <div className="w-8 h-8 rounded-full bg-[#ff758f]/20 text-[#ff758f] flex items-center justify-center border border-[#ff758f]/30">
              <Pill className="w-4 h-4 -rotate-45" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-[#958da1]">
            <span className="flex items-center gap-1 text-[#d2bcff]">
              <Sparkles className="w-3 h-3" />
              14-day streak intact! No stress today.
            </span>
            <span>Recorded 8:04 AM</span>
          </div>
        </div>

        {/* Item 2: 1:00 PM Hydration & Spine Reset */}
        <div
          onClick={() => togglePulseItem('pulse-2')}
          className="rounded-3xl p-4.5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.1] hover:border-[#8a4dff]/40 shadow-lg transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                  pulseList[1].status === 'taken'
                    ? 'bg-[#00f2d1] border-[#00f2d1] text-[#00382f]'
                    : 'border-white/30 bg-transparent text-transparent'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold text-[#d2bcff] tracking-wider uppercase">
                    1:00 PM • Bio-Sync
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#8a4dff]/20 text-[#d2bcff]">
                    NestAI Smart
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Hydration & Spine Reset
                </h4>
                <p className="text-xs text-[#ccc3d8] mt-0.5 leading-relaxed">
                  NestAI: Take 3 deep breaths, drop your shoulders, and chug 200ml iced water.
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#00f2d1]/20 text-[#00f2d1] flex items-center justify-center border border-[#00f2d1]/30">
              <Droplets className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={(e) => handleActionClick('complete-bio', 'pulse-2', e)}
              className="flex-1 py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-[#00f2d1] hover:text-[#00382f] text-white font-bold text-xs flex items-center justify-center space-x-1.5 border border-white/10 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Sipped & Stretched</span>
            </button>
            <button
              onClick={(e) => handleActionClick('snooze-10', 'pulse-2', e)}
              className="py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#958da1] text-xs font-semibold border border-white/10"
            >
              +10m
            </button>
          </div>
        </div>

        {/* Item 3: 3:15 PM Doctor Maya Lin Visit */}
        <div className="rounded-3xl p-4.5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-[#8a4dff]/40 shadow-xl space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-[#8a4dff]/30 text-[#d2bcff] flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold text-[#d2bcff] tracking-wider uppercase">
                    3:15 PM • In 35 Mins
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#ff758f]/20 text-[#ff758f]">
                    Leaving Soon
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Visit: Dr. Maya Lin, MD
                </h4>
                <p className="text-xs text-[#ccc3d8] mt-0.5">
                  Prep Lab notes locked & shared. Transit commute is 22 mins.
                </p>
              </div>
            </div>

            <img
              src={pulseList[2].doctorAvatar}
              alt="Dr. Maya Lin"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#8a4dff]"
            />
          </div>

          {/* Uber Transit Banner */}
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-[#00f2d1]" />
              <span className="text-white font-medium">UberX Priority • 4 min away</span>
            </div>
            <span className="font-bold text-[#00f2d1]">~$14.20</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => handleActionClick('open-ride', 'pulse-3', e)}
              className="py-2.5 px-3 rounded-2xl bg-[#8a4dff] hover:bg-[#722ee6] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-[#8a4dff]/30 transition-transform active:scale-95"
            >
              <span>▲ Ride & Map ETA</span>
            </button>
            <button
              onClick={() => onNavigateTab('prep')}
              className="py-2.5 px-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs flex items-center justify-center space-x-1.5 border border-white/10"
            >
              <span>Prep Lab</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00f2d1]" />
            </button>
          </div>
        </div>

        {/* Item 4: 9:00 PM Magnesium Glycinate */}
        <div
          onClick={() => togglePulseItem('pulse-4')}
          className="rounded-3xl p-4.5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.1] hover:border-white/20 shadow-lg transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                  pulseList[3].status === 'taken'
                    ? 'bg-[#00f2d1] border-[#00f2d1] text-[#00382f]'
                    : 'border-white/30 bg-transparent text-transparent'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-[#958da1] tracking-wider uppercase">
                  9:00 PM • Tonight
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Magnesium Glycinate 200mg
                </h4>
                <p className="text-xs text-[#ccc3d8] mt-0.5">
                  Deep REM support & blue light cutoff reminder.
                </p>
              </div>
            </div>

            <span className="text-base text-[#d2bcff]">🌙</span>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={(e) => handleActionClick('log-magnesium', 'pulse-4', e)}
              className="flex-1 py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold text-xs"
            >
              Log Early
            </button>
            <button
              onClick={(e) => handleActionClick('snooze-30', 'pulse-4', e)}
              className="py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#958da1] text-xs font-semibold"
            >
              Snooze 30m
            </button>
          </div>
        </div>
      </div>

      {/* Caregiver Radar */}
      <div className="rounded-3xl p-4.5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/10 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <Heart className="w-4 h-4 text-[#ff758f]" />
            <span>Caregiver Radar</span>
          </div>
          <span className="text-[10px] font-bold text-[#00f2d1] bg-[#00f2d1]/15 px-2 py-0.5 rounded-full border border-[#00f2d1]/30">
            • Synced Live
          </span>
        </div>

        <div className="flex items-center space-x-3 p-2.5 rounded-2xl bg-black/30 border border-white/[0.06]">
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"
            alt="Jordan M."
            className="w-10 h-10 rounded-full object-cover border border-[#00f2d1]"
          />
          <div>
            <h4 className="text-xs font-bold text-white">
              Jordan M. <span className="text-[10px] text-[#958da1] font-normal">(Sibling)</span>
            </h4>
            <p className="text-[11px] text-[#00f2d1] font-medium">
              ♡ Notified of morning med on time!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handlePingCaregiver}
            className="py-2 px-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-bold flex items-center justify-center space-x-1.5 border border-white/10"
          >
            <Send className="w-3.5 h-3.5 text-[#d2bcff]" />
            <span>{caregiverPinged ? 'Ping Sent!' : 'Ping Jordan'}</span>
          </button>
          <button
            onClick={() => alert('Sending live transit tracking link to Jordan M.')}
            className="py-2 px-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-bold flex items-center justify-center space-x-1.5 border border-white/10"
          >
            <Car className="w-3.5 h-3.5 text-[#00f2d1]" />
            <span>Ride Assist</span>
          </button>
        </div>
      </div>

      {/* Refill Radar */}
      <div className="rounded-3xl p-4.5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-[#ff758f]/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-[#ff758f]/20 text-[#ff758f] flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-bold text-white">Refill Radar</h3>
          </div>
          <span className="text-[10px] text-[#958da1]">Walgreens • Capsule</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#ff758f]">
            5 Doses Remaining
          </span>
          <p className="text-xs text-[#ccc3d8] leading-relaxed">
            NestAI noticed your Sertraline 50mg will run out on Sunday. We can auto-route a 90-day
            supply refill to Capsule for doorstep drop.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleAutoRefill}
            disabled={refillRequested}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#8a4dff] to-[#722ee6] hover:from-[#9b66ff] hover:to-[#8a4dff] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-[#8a4dff]/30 active:scale-98 transition-transform disabled:opacity-50"
          >
            <Zap className="w-4 h-4 text-[#00f2d1]" />
            <span>{refillRequested ? 'Refill Dispatched!' : '1-Tap Auto-Refill'}</span>
          </button>
          <button
            onClick={() => onOpenBottleScanner()}
            className="p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 border border-white/10"
            title="Scan new bottle label"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Motivational Footnote */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center space-x-2.5 text-xs text-[#ccc3d8]">
        <Sparkles className="w-4 h-4 text-[#d2bcff] shrink-0" />
        <p>You are navigating your health like a pro. Keep going.</p>
      </div>
    </div>
  );
};
