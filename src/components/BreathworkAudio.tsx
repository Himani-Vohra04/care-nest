import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const BreathworkAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathCount, setBreathCount] = useState(4);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<any>(null);

  const totalDuration = 134; // 2:14 in seconds

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 432Hz base frequency
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, ctx.currentTime);

      // Binaural beat offset: 436Hz creates a 4Hz gentle Theta wave for deep calm
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(436, ctx.currentTime);

      osc1.connect(masterGain);
      osc2.connect(masterGain);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      setIsPlaying(true);
    } catch (e) {
      console.warn('AudioContext playback error', e);
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
    }
    setTimeout(() => {
      try {
        osc1Ref.current?.stop();
        osc2Ref.current?.stop();
        audioCtxRef.current?.close();
      } catch {}
      audioCtxRef.current = null;
    }, 500);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  // Breathing timer loop: 4s inhale, 7s hold, 8s exhale (4-7-8 technique)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSecondsElapsed((prev) => {
        if (prev >= totalDuration) {
          stopAudio();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const cycleTime = secondsElapsed % 19;
    if (cycleTime < 4) {
      setBreathPhase('Inhale');
      setBreathCount(4 - cycleTime);
    } else if (cycleTime < 11) {
      setBreathPhase('Hold');
      setBreathCount(11 - cycleTime);
    } else {
      setBreathPhase('Exhale');
      setBreathCount(19 - cycleTime);
    }
  }, [secondsElapsed, isPlaying]);

  useEffect(() => {
    return () => {
      try {
        osc1Ref.current?.stop();
        osc2Ref.current?.stop();
        audioCtxRef.current?.close();
      } catch {}
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = (secondsElapsed / totalDuration) * 100;

  return (
    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 relative overflow-hidden group">
      {/* Dynamic ambient sound glow when playing */}
      {isPlaying && (
        <div className="absolute -inset-1 bg-gradient-to-r from-[#8a4dff]/20 via-[#00f2d1]/15 to-[#8a4dff]/20 blur-xl opacity-75 pointer-events-none animate-pulse" />
      )}

      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
              isPlaying
                ? 'bg-[#00f2d1] text-[#00382f] shadow-[#00f2d1]/30'
                : 'bg-[#8a4dff] text-white shadow-[#8a4dff]/30 hover:bg-[#722ee6]'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
          <div>
            <h5 className="text-xs font-bold text-white tracking-tight">
              2-Min Pre-Visit Calming Breathwork
            </h5>
            <p className="text-[11px] text-[#ccc3d8]">
              Nest Soundscapes • 432Hz Binaural Beat
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold font-mono text-[#00f2d1]">
            {isPlaying ? formatTime(secondsElapsed) : '2:14'}
          </span>
          <p className="text-[10px] text-[#958da1]">Theta Wave</p>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#8a4dff] to-[#00f2d1] rounded-full transition-all duration-300"
          style={{ width: `${isPlaying ? progressPercent : 20}%` }}
        />
      </div>

      {/* Synchronized Nervous System Pacing Display */}
      {isPlaying && (
        <div className="pt-1 flex items-center justify-between px-2 py-1.5 rounded-xl bg-black/40 border border-white/10 animate-fade-in">
          <div className="flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full ${
                breathPhase === 'Inhale'
                  ? 'bg-[#00f2d1] animate-ping'
                  : breathPhase === 'Hold'
                  ? 'bg-[#d2bcff]'
                  : 'bg-[#ff758f]'
              }`}
            />
            <span className="text-xs font-bold text-white tracking-wide">
              {breathPhase}: {breathCount}s
            </span>
          </div>
          <span className="text-[10px] text-[#ccc3d8] tracking-tight">
            Soft vagus nerve stimulation active
          </span>
        </div>
      )}
    </div>
  );
};
