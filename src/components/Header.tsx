import React from 'react';
import { Sun, Moon, Sparkles, User, HeartHandshake } from 'lucide-react';
import { TabType, ThemeMode, UserProfile } from '../types';

interface HeaderProps {
  currentTab: TabType;
  theme: ThemeMode;
  onToggleTheme: () => void;
  profile: UserProfile;
  onToggleProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  theme,
  onToggleTheme,
  profile,
  onToggleProfile,
}) => {
  const getSubTitle = () => {
    switch (currentTab) {
      case 'find':
        return 'Find & Match';
      case 'book':
        return 'Book';
      case 'prep':
        return 'Prep Lab';
      case 'reminders':
        return 'Reminders';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0c0e17]/85 border-b border-white/[0.07] px-4 py-3 transition-colors duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand & Subtitle */}
        <div className="flex items-center space-x-2.5">
          {/* Logo Badge */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#8a4dff] via-[#d2bcff] to-[#00f2d1] p-[1.5px] flex items-center justify-center shadow-lg shadow-[#8a4dff]/25">
            <div className="w-full h-full rounded-full bg-[#11131c] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 text-[#d2bcff]"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3c-4.5 0-8 3.5-8 8 0 5 8 10 8 10s8-5 8-10c0-4.5-3.5-8-8-8z" />
                <circle cx="12" cy="11" r="3" fill="#00f2d1" stroke="none" />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#00f2d1] rounded-full border-2 border-[#11131c]" />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-base font-bold tracking-tight text-white">CareNest</span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-[#8a4dff]/20 text-[#d2bcff] border border-[#8a4dff]/30">
                AI Hub
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#ccc3d8]/80 tracking-wide leading-none">
              {getSubTitle()}
            </p>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-white transition-transform active:scale-95"
            title={theme === 'cyber-lavender' ? 'Switch to Daylight Aura' : 'Switch to Cyber Lavender'}
          >
            {theme === 'cyber-lavender' ? (
              <Sun className="w-4 h-4 text-[#d2bcff] hover:text-[#00f2d1] transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-[#8a4dff]" />
            )}
          </button>

          {/* User Profile Avatar / Caregiver Switcher */}
          <button
            onClick={onToggleProfile}
            className="group relative flex items-center p-0.5 rounded-full border border-white/15 hover:border-[#8a4dff]/50 bg-white/[0.04] transition-all"
            title={`Switch Profile: currently ${profile === 'alex' ? 'Alex (Patient)' : 'Mom (Caregiver)'}`}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Alex Avatar"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#8a4dff]/50"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#11131c] ${
                profile === 'alex' ? 'bg-[#8a4dff]' : 'bg-[#ff758f]'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
