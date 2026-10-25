/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, ThemeMode, UserProfile, Doctor, MedicationScanResult, InsuranceScanResult } from './types';
import { DOCTORS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FindMatchTab } from './components/FindMatchTab';
import { BookTab } from './components/BookTab';
import { PrepLabTab } from './components/PrepLabTab';
import { RemindersTab } from './components/RemindersTab';
import { VisionScannerModal } from './components/VisionScannerModal';
import { SensoryArtGeneratorModal } from './components/SensoryArtGeneratorModal';
import { BookingConfirmModal } from './components/BookingConfirmModal';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('find');
  const [theme, setTheme] = useState<ThemeMode>('cyber-lavender');
  const [profile, setProfile] = useState<UserProfile>('alex');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(DOCTORS[0]);

  // Safe Space Banner in Book & Prep
  const [safeSpaceBannerUrl, setSafeSpaceBannerUrl] = useState<string>(
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
  );

  // Modals state
  const [isVisionScannerOpen, setIsVisionScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<'medication-bottle' | 'insurance-card'>('medication-bottle');
  const [isArtGeneratorOpen, setIsArtGeneratorOpen] = useState(false);
  const [isBookingConfirmOpen, setIsBookingConfirmOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'cyber-lavender' ? 'daylight-aura' : 'cyber-lavender'));
  };

  const handleToggleProfile = () => {
    setProfile((prev) => (prev === 'alex' ? 'mom' : 'alex'));
    showToast(profile === 'alex' ? 'Switched to Mom (Caregiver) view' : 'Switched to Me (Alex) view');
  };

  const handleSelectDoctorForBooking = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLockInAppointment = (details: any) => {
    setBookingDetails(details);
    setIsBookingConfirmOpen(true);
  };

  const handleApplyMedicationScan = (med: MedicationScanResult) => {
    showToast(`✓ Gemini scanned: ${med.medicationName} ${med.dosage} added to Prep Lab & Pulse!`);
  };

  const handleApplyInsuranceScan = (ins: InsuranceScanResult) => {
    showToast(`✓ Insurance verified: ${ins.payerName} Specialist copay ${ins.copaySpecialist}`);
  };

  const isLightMode = theme === 'daylight-aura';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans ${
        isLightMode
          ? 'bg-[#f4f2fa] text-[#191b24]'
          : 'bg-[#0c0e17] text-[#e1e1ef]'
      }`}
    >
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[340px] rounded-full blur-[110px] transition-opacity duration-700 ${
            isLightMode
              ? 'bg-[#d2bcff]/40 opacity-70'
              : 'bg-[#8a4dff]/18 opacity-90'
          }`}
        />
        <div
          className={`absolute top-1/2 -right-24 w-[380px] h-[380px] rounded-full blur-[120px] transition-opacity duration-700 ${
            isLightMode
              ? 'bg-[#00f2d1]/20 opacity-60'
              : 'bg-[#00f2d1]/10 opacity-70'
          }`}
        />
      </div>

      {/* Main Container - Mobile First Frame */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col shadow-2xl">
        {/* Sticky Header */}
        <Header
          currentTab={currentTab}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          profile={profile}
          onToggleProfile={handleToggleProfile}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#11131c]/95 border border-[#00f2d1]/50 text-white text-xs font-semibold shadow-xl flex items-center space-x-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-[#00f2d1]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 px-4 pt-3 pb-8">
          {currentTab === 'find' && (
            <FindMatchTab
              onSelectDoctorForBooking={handleSelectDoctorForBooking}
              profile={profile}
              onSetProfile={setProfile}
              onOpenThemeToggle={handleToggleTheme}
            />
          )}

          {currentTab === 'book' && (
            <BookTab
              selectedDoctor={selectedDoctor}
              onLockInAppointment={handleLockInAppointment}
              onOpenArtGenerator={() => setIsArtGeneratorOpen(true)}
              safeSpaceBannerUrl={safeSpaceBannerUrl}
            />
          )}

          {currentTab === 'prep' && (
            <PrepLabTab
              onOpenBottleScanner={() => {
                setScannerMode('medication-bottle');
                setIsVisionScannerOpen(true);
              }}
              onOpenSensoryArt={() => setIsArtGeneratorOpen(true)}
            />
          )}

          {currentTab === 'reminders' && (
            <RemindersTab
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenBottleScanner={() => {
                setScannerMode('medication-bottle');
                setIsVisionScannerOpen(true);
              }}
            />
          )}
        </main>

        {/* Floating Quick Action: AI Multimodal Scanner Pill */}
        <div className="fixed bottom-20 right-4 sm:right-[max(1rem,calc(50%-13rem))] z-40">
          <button
            onClick={() => {
              setScannerMode('medication-bottle');
              setIsVisionScannerOpen(true);
            }}
            className="flex items-center space-x-2 py-2 px-3.5 rounded-full bg-gradient-to-r from-[#8a4dff] via-[#722ee6] to-[#00f2d1] text-black font-extrabold text-xs shadow-xl shadow-[#8a4dff]/40 hover:scale-105 active:scale-95 transition-all"
            title="Scan Medicine Bottle or Insurance Card with Gemini AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span className="text-black font-bold">AI Scan</span>
          </button>
        </div>

        {/* Fixed Bottom Navigation */}
        <BottomNav activeTab={currentTab} onChangeTab={setCurrentTab} />

        {/* Modals */}
        <VisionScannerModal
          isOpen={isVisionScannerOpen}
          onClose={() => setIsVisionScannerOpen(false)}
          onApplyMedication={handleApplyMedicationScan}
          onApplyInsurance={handleApplyInsuranceScan}
          defaultScanType={scannerMode}
        />

        <SensoryArtGeneratorModal
          isOpen={isArtGeneratorOpen}
          onClose={() => setIsArtGeneratorOpen(false)}
          onSelectImage={(url) => {
            setSafeSpaceBannerUrl(url);
            showToast('✓ Custom AI Sensory Art applied to Safe Space Banner!');
          }}
        />

        <BookingConfirmModal
          isOpen={isBookingConfirmOpen}
          onClose={() => setIsBookingConfirmOpen(false)}
          onGoToPrepLab={() => {
            setCurrentTab('prep');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          bookingDetails={bookingDetails}
        />
      </div>
    </div>
  );
}
