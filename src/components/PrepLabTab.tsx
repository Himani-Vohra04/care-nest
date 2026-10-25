import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Copy,
  Check,
  Plus,
  Camera,
  CheckCircle2,
  ShieldCheck,
  Volume2,
  Share2,
  Navigation,
  RefreshCw,
  Send,
  HelpCircle,
  Eye,
  Headphones,
} from 'lucide-react';
import { CuratedQuestion, ReadinessItem } from '../types';
import { INITIAL_QUESTIONS, INITIAL_READINESS, DOCTORS } from '../data/mockData';
import { BreathworkAudio } from './BreathworkAudio';

interface PrepLabTabProps {
  onOpenBottleScanner: () => void;
  onOpenSensoryArt: () => void;
}

export const PrepLabTab: React.FC<PrepLabTabProps> = ({
  onOpenBottleScanner,
  onOpenSensoryArt,
}) => {
  const [symptomText, setSymptomText] = useState(
    'Exhausted after 2pm, heart racing after iced coffee, cold hands...'
  );
  const [isRefining, setIsRefining] = useState(false);
  const [questions, setQuestions] = useState<CuratedQuestion[]>(INITIAL_QUESTIONS);
  const [readinessList, setReadinessList] = useState<ReadinessItem[]>(INITIAL_READINESS);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [customQuestionInput, setCustomQuestionInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const quickSymptoms = [
    { label: 'Brain fog after meals', emoji: '⚡' },
    { label: 'Waking up at 4am', emoji: '🌙' },
    { label: 'Palpitations with iced coffee', emoji: '☕' },
    { label: 'Morning nausea with meds', emoji: '💊' },
  ];

  const handleAddSymptomChip = (label: string) => {
    if (!symptomText.includes(label)) {
      setSymptomText((prev) => (prev ? `${prev}, ${label}` : label));
    }
  };

  const handleRefineWithAI = async () => {
    setIsRefining(true);
    try {
      const res = await fetch('/api/gemini/refine-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: symptomText,
          doctorName: 'Dr. Maya Lin, DO',
          visitType: 'Integrative Primary Care',
        }),
      });

      if (!res.ok) throw new Error('Failed to refine');
      const json = await res.json();
      if (json.data?.questions) {
        setQuestions(json.data.questions);
      }
    } catch (e) {
      console.warn('AI Refine fallback', e);
      // Fallback questions if offline
      setQuestions([
        {
          id: 1,
          question: `Can we evaluate metabolic and thyroid markers for my afternoon crash: "${symptomText.slice(0, 50)}"?`,
          tag: 'High Priority',
          tagType: 'priority',
          context: 'Synthesized by NestAI',
        },
        ...INITIAL_QUESTIONS.slice(1),
      ]);
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopyQuestion = (id: number, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleReadiness = (id: string) => {
    setReadinessList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = readinessList.filter((r) => r.completed).length;
  const readinessPercent = Math.round((completedCount / readinessList.length) * 100);

  const handleAddCustomQuestion = () => {
    if (!customQuestionInput.trim()) return;
    const newQ: CuratedQuestion = {
      id: Date.now(),
      question: customQuestionInput.trim(),
      tag: 'Custom Topic',
      tagType: 'custom',
      context: 'Patient authored',
    };
    setQuestions((prev) => [...prev, newQ]);
    setCustomQuestionInput('');
    setShowAddModal(false);
  };

  const handleShareIMessage = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 pb-24 animate-fade-in">
      {/* Upcoming Visit Hero Card */}
      <div className="rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.12] shadow-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-extrabold text-[#00f2d1] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00f2d1] animate-pulse" />
            <span>Upcoming Visit • In 2 Days</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-[#d2bcff] bg-[#8a4dff]/20 px-2.5 py-0.5 rounded-full border border-[#8a4dff]/30 font-semibold">
            <Clock className="w-3 h-3" />
            <span>46 hrs to go</span>
          </div>
        </div>

        <div className="flex items-start space-x-3.5">
          <div className="relative">
            <img
              src={DOCTORS[0].avatarUrl}
              alt="Dr. Maya Lin"
              className="w-13 h-13 rounded-2xl object-cover border border-white/20 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00f2d1] text-[#00382f] flex items-center justify-center border-2 border-[#141620]">
              <CheckCircle2 className="w-3 h-3 fill-current" />
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Dr. Maya Lin, DO</h3>
            <p className="text-xs text-[#ccc3d8]">Integrative Primary Care • Bushwick Hub</p>
            <div className="flex items-center space-x-1.5 mt-1 text-xs text-[#958da1]">
              <Calendar className="w-3.5 h-3.5 text-[#d2bcff]" />
              <span className="text-white font-medium">Thu, Oct 24 • 3:15 PM</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all text-center"
          >
            <Navigation className="w-3.5 h-3.5 text-[#00f2d1]" />
            <span>Bushwick Hub Guide</span>
          </a>
          <button
            onClick={() => alert('Opening schedule slots to change timing with Dr. Lin')}
            className="py-2.5 px-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#d2bcff]" />
            <span>Reschedule Slot</span>
          </button>
        </div>
      </div>

      {/* AI Symptom & Talk Lab Card */}
      <div className="rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-[#8a4dff]/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-[#8a4dff]/25 text-[#d2bcff] flex items-center justify-center border border-[#8a4dff]/40">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              AI Symptom & Talk Lab
            </h3>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#00f2d1]/15 text-[#00f2d1] border border-[#00f2d1]/30">
            No Office Blank-Out
          </span>
        </div>

        {/* Brain Dump Input Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>🧠</span> Brain Dump Your Symptoms & Worries
            </span>
            <span className="text-[10px] text-[#00f2d1] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f2d1] animate-ping" />
              Real-time sync
            </span>
          </div>

          <div className="relative">
            <textarea
              rows={3}
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              placeholder="e.g. Exhausted after 2pm, heart racing after iced coffee, cold hands..."
              className="w-full text-xs font-medium leading-relaxed bg-black/40 border border-white/15 focus:border-[#8a4dff] rounded-2xl p-3.5 pr-22 text-white placeholder-white/30 focus:outline-none transition-all resize-none shadow-inner"
            />
            <button
              onClick={handleRefineWithAI}
              disabled={isRefining}
              className="absolute right-2.5 bottom-3.5 py-1.5 px-3 rounded-full bg-[#8a4dff] hover:bg-[#722ee6] text-white text-[11px] font-bold flex items-center space-x-1 shadow-md shadow-[#8a4dff]/30 active:scale-95 disabled:opacity-50 transition-all"
            >
              {isRefining ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3" />
              )}
              <span>{isRefining ? 'Refining...' : '✦ Refine'}</span>
            </button>
          </div>

          {/* Quick Symptom Add Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-[#958da1] font-semibold mr-1">Tap to add:</span>
            {quickSymptoms.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleAddSymptomChip(chip.label)}
                className="py-1 px-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[11px] text-[#ccc3d8] hover:text-white border border-white/10 flex items-center space-x-1 transition-all"
              >
                <span>{chip.emoji}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Your 3 Top Questions for Dr. Lin */}
        <div className="space-y-2.5 pt-2 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-bold text-white tracking-tight">
                Your 3 Top Questions for Dr. Lin
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#d2bcff] bg-[#8a4dff]/20 px-2 py-0.5 rounded-full border border-[#8a4dff]/30">
              Curated by NestAI
            </span>
          </div>

          <div className="space-y-2.5">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] hover:border-[#8a4dff]/40 transition-all space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#8a4dff]/30 text-[#d2bcff] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-semibold text-white leading-relaxed">
                      "{q.question}"
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyQuestion(q.id, q.question)}
                    className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[#ccc3d8] hover:text-white shrink-0 transition-colors"
                    title="Copy question"
                  >
                    {copiedId === q.id ? (
                      <Check className="w-3.5 h-3.5 text-[#00f2d1]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-[10px] pl-7">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full ${
                      q.tagType === 'priority'
                        ? 'bg-[#00f2d1]/15 text-[#00f2d1]'
                        : q.tagType === 'med'
                        ? 'bg-[#d2bcff]/20 text-[#d2bcff]'
                        : 'bg-[#ff758f]/20 text-[#ff758f]'
                    }`}
                  >
                    {q.tag}
                  </span>
                  <span className="text-[#958da1]">• {q.context}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-2.5 px-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-dashed border-white/20 text-xs font-bold text-[#ccc3d8] hover:text-white flex items-center justify-center space-x-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#00f2d1]" />
            <span>Add Custom Topic or Question</span>
          </button>
        </div>
      </div>

      {/* Visit Readiness 60% Prepared Card */}
      <div className="rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.12] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              <span className="text-[#00f2d1]">✓✓</span> Visit Readiness
            </span>
          </div>
          <span className="text-xs font-extrabold text-[#00f2d1] tracking-wide">
            {readinessPercent}% Prepared
          </span>
        </div>

        {/* Readiness Circular Progress Gauge Header */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center space-x-4">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#00f2d1] transition-all duration-500"
                strokeDasharray={`${readinessPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-white">
              {completedCount}/{readinessList.length}
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white">Almost locked in!</h4>
            <p className="text-[11px] text-[#ccc3d8] leading-tight mt-0.5">
              Complete remaining {readinessList.length - completedCount} tasks for zero-friction
              check-in.
            </p>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {readinessList.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleReadiness(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                item.completed
                  ? 'bg-white/[0.03] border-white/10 opacity-90'
                  : 'bg-white/[0.06] border-white/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                    item.completed
                      ? 'bg-[#00f2d1] border-[#00f2d1] text-[#00382f]'
                      : 'border-white/30 bg-transparent'
                  }`}
                >
                  {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold ${
                        item.completed ? 'text-white/80 line-through' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#00f2d1]/20 text-[#00f2d1]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#958da1] mt-0.5 leading-snug">{item.detail}</p>
                </div>
              </div>

              {/* Special Action Button: Scan Bottle */}
              {item.actionType === 'scan' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBottleScanner();
                  }}
                  className="shrink-0 py-1.5 px-3 rounded-full bg-[#8a4dff] hover:bg-[#722ee6] text-white text-[11px] font-bold flex items-center space-x-1 shadow-md shadow-[#8a4dff]/30 transition-transform active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Scan Bottle</span>
                </button>
              )}

              {item.actionType === 'edit' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Editing emergency contact: Jordan Rivera');
                  }}
                  className="shrink-0 py-1 px-2.5 rounded-full bg-white/[0.08] text-white text-[10px] font-semibold"
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Anxiety Buster & Vibe Prep */}
      <div className="rounded-3xl p-5 bg-gradient-to-b from-[#1d1f29] to-[#141620] border border-white/[0.12] shadow-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-base">🪷</span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Anxiety Buster & Vibe Prep
            </h3>
          </div>
          <span className="text-[10px] text-[#ff758f] font-semibold">
            Gentle Nervous System Reset
          </span>
        </div>

        {/* 432Hz Breathwork Audio Player */}
        <BreathworkAudio />

        {/* Bushwick Hub Sensory Guide */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1.5 text-xs">
          <div className="flex items-center space-x-2 text-[#00f2d1] font-bold">
            <Headphones className="w-4 h-4" />
            <span>Bushwick Hub Sensory Guide</span>
          </div>
          <p className="text-[11px] text-[#ccc3d8] leading-relaxed">
            Low waiting-room decibels (38dB avg), circadian warm-amber lighting, zero harsh
            fluorescents. Noise-cancelling Sony headphones available free at front desk.
          </p>
        </div>
      </div>

      {/* Share Prep Sheet with Jordan */}
      <div className="rounded-3xl p-4 bg-gradient-to-r from-[#1d1f29] to-[#191b24] border border-white/10 shadow-lg flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#8a4dff]/20 text-[#d2bcff] flex items-center justify-center border border-[#8a4dff]/30">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Share Prep Sheet with Jordan</h4>
              <p className="text-[11px] text-[#958da1]">Caregiver synced via encrypted link</p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"
            alt="Jordan Caregiver"
            className="w-8 h-8 rounded-full object-cover border border-[#00f2d1]"
          />
        </div>

        <button
          onClick={handleShareIMessage}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#8a4dff] to-[#722ee6] hover:from-[#9b66ff] hover:to-[#8a4dff] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-[#8a4dff]/30 active:scale-98 transition-transform"
        >
          <span>{shareSuccess ? '✓ Encrypted Link Sent!' : 'Share Prep Lab via iMessage Link'}</span>
        </button>
      </div>

      {/* Add Custom Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#11131c] border border-white/10 p-5 space-y-4 shadow-2xl">
            <h4 className="text-sm font-bold text-white">Add Custom Visit Question</h4>
            <p className="text-xs text-[#ccc3d8]">
              Write anything you want Dr. Maya Lin to clarify during your appointment:
            </p>
            <textarea
              rows={3}
              value={customQuestionInput}
              onChange={(e) => setCustomQuestionInput(e.target.value)}
              placeholder="e.g. Can we discuss tapering options or evening magnesium dose?"
              className="w-full p-3 rounded-2xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-[#8a4dff]"
            />
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="py-2.5 rounded-xl bg-white/[0.08] text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomQuestion}
                className="py-2.5 rounded-xl bg-[#8a4dff] text-white text-xs font-bold"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
