
import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRConfig } from '../types';

interface QRCodeCardProps {
  config: QRConfig;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({ config }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>(
    new QRCodeStyling({
      width: 280,
      height: 280,
      type: 'svg',
      data: config.url || 'https://example.com',
      image: config.profileImage || '',
      dotsOptions: {
        color: '#000000',
        type: 'dots',
      },
      backgroundOptions: {
        color: '#FFFFFF',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
        imageSize: 0.45,
        saveAsBlob: true,
      },
      cornersSquareOptions: {
        color: '#1a1a1a',
        type: 'extra-rounded',
      },
      cornersDotOptions: {
        color: '#1a1a1a',
        type: 'dot',
      },
      qrOptions: {
        errorCorrectionLevel: 'H',
      }
    })
  );

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    qrCode.current.update({
      data: config.url || 'https://example.com',
      image: config.profileImage || '',
    });
  }, [config]);

  return (
    <div className="flex flex-col items-center select-none bg-[#000000] w-[450px] h-[720px] pt-[90px] pb-[60px] px-6">
      {/* Identity Branding - Optimized for Capture */}
      <div className="flex flex-col items-center justify-center mb-12 w-full animate-in fade-in slide-in-from-top duration-700">
        <div className="flex items-center gap-4 w-full justify-center px-4">
          <span className="text-3xl leading-none select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] shrink-0">❤️</span>
          <div className="max-w-[340px]">
            <h2 className="text-[#FFFFFF] text-4xl font-black tracking-tight uppercase leading-[1.2] text-center whitespace-normal break-words">
              {config.name || 'YOUR NAME'}
            </h2>
          </div>
          <span className="text-3xl leading-none select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] shrink-0">❤️</span>
        </div>
        
        <div className="mt-5 w-[220px] h-px bg-gradient-to-r from-transparent via-[#222222] to-transparent" />
        
        <p className="text-[#8A8A8E] text-[11px] font-black tracking-[0.6em] uppercase mt-4 opacity-90 text-center">
          {config.subtitle || 'MEMORIES HUB'}
        </p>
      </div>

      {/* Main QR Card Container */}
      <div className="bg-[#FFFFFF] p-7 rounded-[64px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-[#ffffff10] mb-14">
        <div 
          ref={qrRef} 
          className="rounded-[44px] overflow-hidden bg-white"
          style={{ width: '280px', height: '280px' }}
        />
      </div>

      {/* Footer Text - Fixed Visibility & Perfect Rhythm */}
      <div className="mt-auto text-center w-full px-4 pb-4 animate-in fade-in slide-in-from-bottom duration-1000">
        <p className="text-[#8A8A8E] text-2xl font-bold tracking-tight leading-relaxed max-w-[360px] mx-auto">
          Scan the QR code to see your memories.
        </p>
      </div>
    </div>
  );
};
