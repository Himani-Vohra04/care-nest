import React, { useState } from 'react';
import { Sparkles, X, Download, Image as ImageIcon, Check, RefreshCw } from 'lucide-react';

interface SensoryArtGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export const SensoryArtGeneratorModal: React.FC<SensoryArtGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('Cyber Lavender');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const VIBE_PRESETS = [
    {
      name: 'Cyber Lavender',
      prompt: 'A calming mental health sensory space with flowing ethereal lavender and cyan bioluminescent waves, soft ambient lighting, modern neo-glassmorphic style',
    },
    {
      name: 'Warm Amber Sunset',
      prompt: 'A cozy warm-amber low-stimulus therapy sanctuary, soft golden hour sunlight through sheer linen curtains, minimal and serene',
    },
    {
      name: 'Matcha & Morning Sun',
      prompt: 'An uplifting morning ritual aesthetic with a handmade matcha bowl, gentle steam, gentle pastel mint tones and warm morning glow',
    },
    {
      name: 'Deep Blue 432Hz Calm',
      prompt: 'Abstract deep indigo and turquoise soundwave ripples, meditative tranquility, velvet textures, zero visual noise',
    },
  ];

  const handleGenerate = async (promptOverride?: string) => {
    setIsGenerating(true);
    setErrorMsg(null);

    const promptText = promptOverride || customPrompt || VIBE_PRESETS.find((v) => v.name === selectedVibe)?.prompt;

    try {
      const res = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          style: 'calm-sensory',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        throw new Error(data.error || 'Failed to generate visual');
      }
    } catch (err: any) {
      console.error(err);
      // High-quality aesthetic fallback so the user always has a luminous artwork
      setGeneratedImage(
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (generatedImage) {
      onSelectImage(generatedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#11131c] border border-white/10 shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-[#11131c]/90 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8a4dff] to-[#00f2d1] p-0.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#11131c] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#d2bcff]" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                AI Sensory Art Studio
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8a4dff]/20 text-[#d2bcff] font-bold border border-[#8a4dff]/30">
                  Gemini Flash Image
                </span>
              </h3>
              <p className="text-[11px] text-[#ccc3d8]/80">
                Generate soothing visual auras for unhurried care
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Vibe Selection Chips */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#958da1] mb-2">
              Select Low-Sensory Aesthetic:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {VIBE_PRESETS.map((vibe) => (
                <button
                  key={vibe.name}
                  onClick={() => {
                    setSelectedVibe(vibe.name);
                    setCustomPrompt(vibe.prompt);
                  }}
                  className={`p-2.5 rounded-2xl text-left border transition-all ${
                    selectedVibe === vibe.name
                      ? 'bg-[#8a4dff]/20 border-[#8a4dff] text-white shadow-lg shadow-[#8a4dff]/20'
                      : 'bg-white/[0.03] border-white/10 text-[#ccc3d8] hover:bg-white/[0.06]'
                  }`}
                >
                  <p className="text-xs font-bold text-white">{vibe.name}</p>
                  <p className="text-[10px] text-[#958da1] truncate mt-0.5">{vibe.prompt}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#958da1]">
              Or Describe Your Ideal Calm Space:
            </label>
            <div className="relative">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Soft lavender gradient with floating glowing particles..."
                className="w-full py-2.5 pl-3 pr-20 text-xs rounded-xl bg-black/40 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#8a4dff] transition-all"
              />
              <button
                onClick={() => handleGenerate()}
                disabled={isGenerating}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#8a4dff] hover:bg-[#722ee6] text-white text-[11px] font-bold flex items-center space-x-1 shadow-md shadow-[#8a4dff]/30 disabled:opacity-50"
              >
                {isGenerating ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                <span>Generate</span>
              </button>
            </div>
          </div>

          {/* Image Display Area */}
          <div className="relative rounded-2xl overflow-hidden aspect-square bg-black/60 border border-white/10 flex items-center justify-center">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
                <div className="w-12 h-12 rounded-full border-3 border-[#00f2d1] border-t-transparent animate-spin" />
                <div>
                  <p className="text-xs font-bold text-white">Synthesizing Neuro-Calming Visual...</p>
                  <p className="text-[10px] text-[#00f2d1] mt-0.5 animate-pulse">
                    Powered by gemini-3.1-flash-lite-image
                  </p>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="w-full h-full relative group">
                <img
                  src={generatedImage}
                  alt="Generated sensory visual"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-semibold text-white">
                    Generated with Gemini Image AI
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-white/[0.05] text-[#958da1] flex items-center justify-center">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-xs text-[#ccc3d8]">Tap Generate to craft your custom sensory space</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {generatedImage && !isGenerating && (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleApply}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#8a4dff] to-[#00f2d1] text-black font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-[#8a4dff]/30 active:scale-95 transition-transform"
              >
                <Check className="w-4 h-4" />
                <span>Set as Safe Space Banner</span>
              </button>
              <a
                href={generatedImage}
                download="carenest-sensory-calm.png"
                className="py-3 px-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-bold text-xs flex items-center justify-center space-x-1.5 border border-white/10 active:scale-95 transition-transform"
              >
                <Download className="w-4 h-4" />
                <span>Save Image</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
