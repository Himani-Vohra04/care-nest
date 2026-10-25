import React from 'react';
import { CheckCircle2, ShieldCheck, Calendar, ArrowRight, Share2, Sparkles, X } from 'lucide-react';
import { Doctor } from '../types';

interface BookingConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToPrepLab: () => void;
  bookingDetails: {
    doctor: Doctor;
    format: string;
    day: string;
    time: string;
    copay: string;
    supportPerson?: string | null;
  } | null;
}

export const BookingConfirmModal: React.FC<BookingConfirmModalProps> = ({
  isOpen,
  onClose,
  onGoToPrepLab,
  bookingDetails,
}) => {
  if (!isOpen || !bookingDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-[#11131c] border border-white/10 p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#00f2d1]/20 text-[#00f2d1] flex items-center justify-center border border-[#00f2d1]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Appointment Locked In!
              </h3>
              <p className="text-[11px] text-[#00f2d1] font-semibold">
                No Surprise Bill Guarantee Active
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Doctor Summary Card */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={bookingDetails.doctor.avatarUrl}
              alt={bookingDetails.doctor.name}
              className="w-12 h-12 rounded-xl object-cover border border-[#00f2d1]"
            />
            <div>
              <h4 className="text-sm font-bold text-white">{bookingDetails.doctor.name}, DO</h4>
              <p className="text-xs text-[#ccc3d8]">{bookingDetails.doctor.specialty}</p>
              <div className="flex items-center space-x-1.5 mt-0.5 text-xs text-[#00f2d1] font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {bookingDetails.day} • {bookingDetails.time}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex justify-between items-center text-xs">
            <span className="text-[#958da1]">Verified Cigna Copay:</span>
            <span className="text-base font-black text-[#00f2d1]">{bookingDetails.copay}</span>
          </div>

          {bookingDetails.supportPerson && (
            <div className="text-[11px] text-[#ccc3d8] flex items-center gap-1.5 bg-white/[0.03] p-2 rounded-xl">
              <span className="text-[#00f2d1]">✓</span>
              <span>Support person auto-invited: {bookingDetails.supportPerson}</span>
            </div>
          )}
        </div>

        {/* Next Step Guidance */}
        <div className="p-3.5 rounded-2xl bg-[#8a4dff]/15 border border-[#8a4dff]/30 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#d2bcff]">
            <Sparkles className="w-4 h-4" />
            <span>Next: Brain dump your symptoms in Prep Lab</span>
          </div>
          <p className="text-[11px] text-[#e1e1ef] leading-relaxed">
            NestAI will turn your raw thoughts into 3 concise questions so you never experience
            office blank-out during the visit.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => {
              onClose();
              onGoToPrepLab();
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#8a4dff] to-[#00f2d1] text-black font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-[#8a4dff]/30 transition-transform active:scale-95"
          >
            <span>Open Prep Lab Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#958da1] hover:text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
