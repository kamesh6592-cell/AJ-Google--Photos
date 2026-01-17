
import React, { useState, useRef } from 'react';
import { QRCodeCard } from './components/QRCodeCard';
import { Editor } from './components/Editor';
import { QRConfig } from './types';
import { Download, Sparkles, Palette, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [config, setConfig] = useState<QRConfig>({
    name: 'MATHAN KUMAR',
    subtitle: 'MEMORIES HUB',
    url: 'https://photos.app.goo.gl/example',
    profileImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=250&h=250&auto=format&fit=crop',
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      // Small delay to ensure any pending UI updates are flushed
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#000000',
        scale: 3, // Slightly reduced scale for better stability while maintaining high quality
        useCORS: true,
        logging: false,
        width: 450,
        height: 720,
        onclone: (clonedDoc) => {
          // Remove all animation classes from the cloned document before rendering to canvas
          // to prevent "half-faded" or "shifted" text positions
          const animElements = clonedDoc.querySelectorAll('.animate-in, .fade-in, .slide-in-from-top, .slide-in-from-bottom');
          animElements.forEach(el => {
            el.classList.remove('animate-in', 'fade-in', 'slide-in-from-top', 'slide-in-from-bottom');
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'none';
          });
        }
      });
      const link = document.createElement('a');
      link.download = `${config.name.replace(/\s+/g, '_')}_Memories.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-white/10 flex">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-80 bg-[#0a0a0a] border-r border-[#1a1a1a] flex-col">
        <div className="p-8 border-b border-[#1a1a1a] flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFFFFF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <Camera size={20} className="text-[#000000]" />
          </div>
          <span className="font-bold text-[#FFFFFF] tracking-tight text-lg">Hub Designer</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <div className="px-3 py-2 text-[10px] font-black text-[#8A8A8E] uppercase tracking-[0.2em] mb-2">Workspace</div>
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-[#FFFFFF] text-[#000000] transition-all shadow-xl font-bold">
            <Palette size={20} />
            <span className="text-sm">Card Editor</span>
          </button>
        </div>

        <div className="p-6">
          <div className="bg-[#111111] rounded-3xl p-5 border border-[#1a1a1a]">
            <div className="flex items-center gap-2 text-[#FFFFFF] text-xs font-black mb-3 tracking-widest uppercase">
              <Sparkles size={14} className="text-[#8A8A8E]" />
              Premium Mode
            </div>
            <p className="text-[10px] text-[#8A8A8E] leading-relaxed uppercase tracking-wider font-medium">
              4K rendering and ultra-rounded vector paths enabled.
            </p>
          </div>
        </div>
      </aside>

      {/* Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 border-b border-[#1a1a1a] bg-[#050505] flex items-center justify-between px-10 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-[10px] font-black text-[#8A8A8E] uppercase tracking-[0.3em]">AJ Studioz / Bring your Memories</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDownload}
              className="bg-[#FFFFFF] text-[#000000] px-8 py-3 rounded-2xl text-xs font-black hover:bg-[#8A8A8E] transition-all active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center gap-2 uppercase tracking-widest"
            >
              <Download size={14} />
              Export 4K
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#000000] p-10 lg:p-16 relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Live Preview Card */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <div className="mb-10 px-6 py-2 bg-[#111111] border border-[#1a1a1a] text-[10px] font-black text-[#8A8A8E] uppercase tracking-[0.4em] rounded-full">
                  Canvas Viewport
                </div>
                
                <div className="relative group p-1 bg-[#1a1a1a] rounded-[64px]">
                   <div 
                    ref={cardRef}
                    className="bg-black relative rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                    style={{ width: '450px', height: '720px' }}
                  >
                    <QRCodeCard config={config} />
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-[#0a0a0a] rounded-[48px] border border-[#1a1a1a] p-10 shadow-3xl">
                <div className="mb-10 border-b border-[#1a1a1a] pb-8">
                  <h3 className="text-2xl font-black text-[#FFFFFF] mb-2 tracking-tight uppercase">Customization</h3>
                  <p className="text-sm text-[#8A8A8E] font-medium tracking-tight">Manage your hub links and identity below.</p>
                </div>
                
                <Editor config={config} onChange={setConfig} />
                
                <div className="mt-12">
                  <button
                    onClick={handleDownload}
                    className="w-full bg-[#FFFFFF] text-[#000000] font-black py-5 rounded-3xl flex items-center justify-center gap-4 hover:bg-[#8A8A8E] transition-all active:scale-[0.98] shadow-2xl uppercase tracking-widest text-sm"
                  >
                    <Download size={24} />
                    Download Image
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
