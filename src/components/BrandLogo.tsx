import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  showImage?: boolean;
  hideText?: boolean;
}

export default function BrandLogo({ className = '', size = 'md', centered = false, showImage = false, hideText = false }: BrandLogoProps) {
  // Use CSS transform to scale the logo based on size, defaulting to md (100%)
  const scaleClass = 
    size === 'sm' ? 'scale-75' : 
    size === 'md' ? 'scale-100' :
    size === 'lg' ? 'scale-110 md:scale-125' : 
    size === 'xl' ? 'scale-125 md:scale-150' : 'scale-100';
    
  const originClass = centered ? 'origin-center' : 'origin-left';

  return (
    <div className={`flex flex-col items-center ${scaleClass} ${originClass} ${className}`}>
      {showImage && (
        <img 
          src="/logo.png" 
          alt="Habibi & Shaun Logo" 
          className={`h-auto object-contain drop-shadow-md ${hideText ? 'w-16 mb-0' : 'w-24 mb-2'}`} 
        />
      )}
      
      {!hideText && (
        <>
          {/* 
            HABIBI & SHAUN 
            Using times/serif font with a simulated 3D bevel text-shadow
          */}
          <span 
            className="font-serif font-bold text-[#143258]" 
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              textShadow: '0.5px 0.5px 0 rgba(255,255,255,0.6), -0.5px -0.5px 0 rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.4)',
              fontSize: '32px',
              letterSpacing: '-0.02em',
              lineHeight: '1',
              WebkitTextStroke: '0.5px #0a182b' // Darker blue outline
            }}
          >
            HABIBI &amp; SHAUN
          </span>
          
          {/* Rentals with lines */}
          <div className="flex items-center justify-center gap-3 mt-1.5 whitespace-nowrap w-full px-2">
            {/* Left wedge line */}
            <svg width="100%" height="5" viewBox="0 0 100 5" preserveAspectRatio="none" className="transform w-full min-w-[30px] max-w-[80px]">
              <path d="M0 2.5 L100 0.5 L100 4.5 Z" fill="#143258" />
            </svg>
            
            {/* Rentals Text */}
            <span 
              className="text-[#9CA3AF] font-sans relative" 
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '22px',
                textShadow: '0.5px 0.5px 0 rgba(255,255,255,0.9), -0.5px -0.5px 0 rgba(0,0,0,0.5), 1px 1px 1px rgba(0,0,0,0.2)',
                letterSpacing: '0.02em',
                lineHeight: '1'
              }}
            >
              Rentals
            </span>
            
            {/* Right wedge line */}
            <svg width="100%" height="5" viewBox="0 0 100 5" preserveAspectRatio="none" className="transform w-full min-w-[30px] max-w-[80px]">
              <path d="M0 0.5 L100 2.5 L0 4.5 Z" fill="#143258" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
