import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Bell, ArrowRight, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings, setCurrentPage } = useCollege();
  const [dismissed, setDismissed] = useState(false);

  if (!settings.announcementActive || dismissed) return null;

  return (
    <div className="bg-[#4D0E1B] text-[#FCFBF7] text-xs py-2 px-4 border-b border-[#6B1426] relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="shrink-0 bg-[#C59B27] text-[#1C1917] text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded font-sans">
            Notification
          </span>
          <p className="truncate text-stone-200 text-xs">
            {settings.announcementText}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentPage('admissions')}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#DEB038] hover:text-white transition-colors"
          >
            <span>Apply 2026–27</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss notification"
            className="text-stone-300 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
