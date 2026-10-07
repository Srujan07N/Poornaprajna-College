import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Phone, MessageCircle, MapPin, Mail, ChevronUp, ChevronDown } from 'lucide-react';

export const QuickContactFab: React.FC = () => {
  const { settings, setCurrentPage } = useCollege();
  const [expanded, setExpanded] = useState(false);

  const cleanWhatsapp = (settings.whatsappNumber || '').replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 font-sans">
      {expanded && (
        <div className="flex flex-col items-end gap-2 mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* WhatsApp Direct Action */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=Namaskara,%20I%20would%20like%20information%20regarding%20Poornaprajna%20College%20admissions%202026.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white py-2 px-3.5 rounded-full shadow-md text-xs font-semibold transition-all hover:scale-105"
          >
            <span>WhatsApp Admissions</span>
            <MessageCircle className="w-4 h-4 fill-white" />
          </a>

          {/* Call College Office */}
          <a
            href={`tel:${settings.phones[0]}`}
            className="flex items-center gap-2 bg-[#1C1917] hover:bg-stone-800 text-white py-2 px-3.5 rounded-full shadow-md text-xs font-semibold transition-all hover:scale-105"
          >
            <span>Call Campus Office</span>
            <Phone className="w-4 h-4" />
          </a>

          {/* Quick Enquiry */}
          <button
            onClick={() => {
              setCurrentPage('contact');
              setExpanded(false);
            }}
            className="flex items-center gap-2 bg-[#6B1426] hover:bg-[#520F1D] text-white py-2 px-3.5 rounded-full shadow-md text-xs font-semibold transition-all hover:scale-105"
          >
            <span>Send Enquiry</span>
            <Mail className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Toggle Floating Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle contact quick actions"
        className="w-12 h-12 rounded-full bg-[#6B1426] hover:bg-[#520F1D] text-white flex items-center justify-center shadow-lg border-2 border-[#C59B27]/60 transition-transform active:scale-95"
      >
        {expanded ? <ChevronDown className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};
