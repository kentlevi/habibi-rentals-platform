import React from 'react';
import { MessageCircle } from 'lucide-react';

interface MobileStickyCTAProps {
  onStartInquiry: () => void;
}

export default function MobileStickyCTA({ onStartInquiry }: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-white/95 p-3 shadow-[0_-8px_24px_rgba(13,22,38,0.08)] backdrop-blur md:hidden">
      <button
        onClick={onStartInquiry}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white active:scale-[0.98]"
      >
        <MessageCircle className="w-4 h-4" />
        Start booking request
      </button>
    </div>
  );
}
