
import React from 'react';
import { QRConfig } from '../types';
import { User, Link as LinkIcon, Sparkles, X, Camera, Tags } from 'lucide-react';

interface EditorProps {
  config: QRConfig;
  onChange: (config: QRConfig) => void;
}

export const Editor: React.FC<EditorProps> = ({ config, onChange }) => {
  
  const autoCropToCircle = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(base64Str);
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = base64Str;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const cropped = await autoCropToCircle(reader.result as string);
        onChange({ ...config, profileImage: cropped });
      };
      reader.readAsDataURL(file);
    }
  };

  const setCategory = (category: string, defaultUrl?: string) => {
    onChange({
      ...config,
      subtitle: category.toUpperCase(),
      url: defaultUrl || config.url
    });
  };

  const removeImage = () => {
    onChange({ ...config, profileImage: null });
  };

  return (
    <div className="space-y-8">
      {/* Identity Name - Refined Placement and Fitting */}
      <div className="relative group">
        <div className="flex justify-between items-center mb-3 px-1">
          <label className="text-[11px] font-black text-[#8A8A8E] uppercase tracking-[0.25em]">
            Identity Name
          </label>
          <span className="text-[9px] font-bold text-[#FFFFFF]/20 uppercase tracking-widest group-focus-within:text-[#FFFFFF]/40 transition-colors">
            Official ID
          </span>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8A8A8E] group-focus-within:text-[#FFFFFF] transition-all duration-300 group-focus-within:scale-110">
            <User size={22} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            value={config.name}
            onChange={(e) => onChange({ ...config, name: e.target.value.toUpperCase() })}
            className="w-full bg-[#111111] border border-[#1a1a1a] text-[#FFFFFF] rounded-[24px] pl-16 pr-8 py-6 focus:outline-none focus:border-[#FFFFFF] focus:ring-4 focus:ring-white/5 transition-all font-black text-xl tracking-tight placeholder-[#2a2a2a]"
            placeholder="E.G. MATHAN KUMAR"
          />
        </div>
      </div>

      {/* Category / Subtitle Selector */}
      <div>
        <label className="text-[10px] font-black text-[#8A8A8E] uppercase tracking-[0.2em] mb-4 block px-1">
          Hub Category
        </label>
        <div className="relative group mb-5">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8A8A8E] group-focus-within:text-[#FFFFFF] transition-colors">
            <Tags size={20} />
          </div>
          <input
            type="text"
            value={config.subtitle}
            onChange={(e) => onChange({ ...config, subtitle: e.target.value.toUpperCase() })}
            className="w-full bg-[#111111] border border-[#1a1a1a] text-[#FFFFFF] rounded-2xl pl-16 pr-6 py-5 focus:outline-none focus:border-[#FFFFFF] transition-all font-bold text-sm tracking-widest"
            placeholder="MEMORIES HUB"
          />
        </div>
        <div className="flex flex-wrap gap-2 px-1">
          {['Memories Hub', 'Google Photos', 'Portfolio Site'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat, cat === 'Google Photos' ? 'https://photos.app.goo.gl/' : undefined)}
              className="text-[9px] font-black px-4 py-2 rounded-xl border border-[#1a1a1a] text-[#8A8A8E] hover:border-[#FFFFFF] hover:text-[#FFFFFF] hover:bg-white/5 transition-all uppercase tracking-widest"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* URL Input */}
      <div>
        <label className="text-[10px] font-black text-[#8A8A8E] uppercase tracking-[0.2em] mb-4 block px-1">
          Link / Hub Destination
        </label>
        <div className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8A8A8E] group-focus-within:text-[#FFFFFF] transition-colors">
            <LinkIcon size={20} />
          </div>
          <input
            type="text"
            value={config.url}
            onChange={(e) => onChange({ ...config, url: e.target.value })}
            className="w-full bg-[#111111] border border-[#1a1a1a] text-[#8A8A8E] rounded-2xl pl-16 pr-6 py-5 focus:outline-none focus:border-[#FFFFFF] transition-all font-mono text-xs"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Profile Image Section */}
      <div>
        <label className="text-[10px] font-black text-[#8A8A8E] uppercase tracking-[0.2em] mb-4 block px-1">
          Hub Avatar
        </label>
        <div className="relative group overflow-hidden bg-[#111111] border border-[#1a1a1a] rounded-[32px] p-8 transition-all hover:border-[#8A8A8E]">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {config.profileImage ? (
                <div className="relative">
                  <img
                    src={config.profileImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#000000] shadow-3xl transition-transform group-hover:scale-110"
                  />
                  <button 
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-red-700 transition-colors z-10"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-[#050505] flex flex-col items-center justify-center border-2 border-dashed border-[#1a1a1a] text-[#8A8A8E] group-hover:text-[#FFFFFF] group-hover:border-[#FFFFFF] transition-all">
                  <Camera size={32} className="mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#111111] rounded-[32px] border border-[#1a1a1a] flex items-start gap-4">
        <p className="text-[10px] text-[#8A8A8E] leading-relaxed font-black uppercase tracking-[0.15em]">
          Engine optimized for Google Photos deep-linking and high-contrast qr sharing experience.
        </p>
      </div>
    </div>
  );
};
