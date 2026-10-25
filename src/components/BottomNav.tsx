import React from 'react';
import { Sparkles, Calendar, Brain, Bell } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'find',
      label: 'Find & Match',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 'book',
      label: 'Book',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: 'prep',
      label: 'Prep Lab',
      icon: <Brain className="w-5 h-5" />,
    },
    {
      id: 'reminders',
      label: 'Reminders',
      icon: <Bell className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e17]/90 backdrop-blur-2xl border-t border-white/[0.08] px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-[#00f2d1] scale-105'
                  : 'text-[#958da1] hover:text-[#e1e1ef]'
              }`}
            >
              <div
                className={`relative p-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#00f2d1]/15 text-[#00f2d1] shadow-[0_0_16px_rgba(0,242,209,0.35)]'
                    : 'text-[#958da1]'
                }`}
              >
                {item.icon}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00f2d1] rounded-full shadow-[0_0_8px_#00f2d1]" />
                )}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight mt-0.5 ${
                  isActive ? 'text-[#00f2d1]' : 'text-[#958da1]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
