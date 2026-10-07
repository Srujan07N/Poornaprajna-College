import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { GalleryItem } from '../../types';
import { Image as ImageIcon, X, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery } = useCollege();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Academics', 'Events', 'Cultural', 'Sports'];

  const filteredItems = gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <section className="py-20 lg:py-24 bg-[#F5F2EB] border-b border-stone-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7E192E] tracking-widest uppercase mb-2">
              <span>Campus Visual Archive</span>
              <span aria-hidden="true">·</span>
              <span>Moments & Spaces</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Institutional Gallery
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Photographs capturing our heritage architecture, autonomous laboratory sessions, student cultural celebrations, and campus sports.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry-Style Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group bg-white rounded-xl border border-stone-200/80 overflow-hidden shadow-xs cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Styled Collegiate Architectural Graphic Frame */}
              <div className="h-48 sm:h-52 bg-gradient-to-br from-[#1C1917] via-[#2A181D] to-[#4A0D18] p-5 flex flex-col justify-between relative overflow-hidden text-white">
                {/* SVG architectural motif */}
                <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-x-4 translate-y-4">
                  <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                    <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="25" y="25" width="50" height="50" strokeWidth="1" />
                    <polygon points="50,15 85,85 15,85" strokeWidth="1" />
                  </svg>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEB038] font-semibold bg-black/30 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <Maximize2 className="w-3.5 h-3.5 text-stone-300" />
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="font-serif font-bold text-lg text-white block group-hover:text-[#DEB038] transition-colors leading-tight">
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 bg-white border-t border-stone-100">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="bg-[#1C1917] text-white rounded-2xl max-w-2xl w-full p-6 border border-stone-700 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-xs font-mono text-[#DEB038] uppercase font-semibold">{lightboxItem.category} Archive</span>
                <h3 className="font-serif font-bold text-xl text-white">{lightboxItem.title}</h3>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-1 rounded text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 sm:h-80 rounded-xl bg-gradient-to-br from-[#2B0B13] via-[#1C1917] to-[#12100F] border border-stone-800 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#6B1426] flex items-center justify-center mb-3 border border-[#DEB038]/40">
                <ImageIcon className="w-8 h-8 text-[#DEB038]" />
              </div>
              <h4 className="font-serif font-bold text-lg text-white">{lightboxItem.title}</h4>
              <p className="text-xs text-stone-300 max-w-md mt-2 leading-relaxed">{lightboxItem.caption}</p>
              <span className="text-[11px] font-mono text-stone-500 mt-4">Poornaprajna Campus · Volakadu, Udupi – 576101</span>
            </div>

            <p className="text-xs text-stone-400 text-center">
              Click anywhere outside or close to return to gallery
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
