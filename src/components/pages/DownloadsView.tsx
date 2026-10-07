import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Download, FileText, Search, ArrowRight } from 'lucide-react';

export const DownloadsView: React.FC = () => {
  const { downloads } = useCollege();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Prospectus', 'Admission Forms', 'Regulations', 'Academic Calendar', 'Examination'];

  const filtered = downloads.filter(d => {
    if (selectedCategory === 'All') return true;
    return d.category === selectedCategory;
  });

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#DEB038] tracking-widest uppercase block">
              Official Institutional Repository
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Download Centre
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Access official institutional prospectuses, printable admission forms, autonomous academic calendars, and model examination papers.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl max-w-fit">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === c ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Downloads Table */}
        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3.5 px-5">Document Title</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">File Size</th>
                <th className="py-3.5 px-5">Upload Date</th>
                <th className="py-3.5 px-5 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#7E192E] shrink-0" />
                      <span className="font-semibold text-stone-900 text-xs">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-stone-600">{item.category}</td>
                  <td className="py-4 px-5 font-mono text-stone-500">{item.fileSize}</td>
                  <td className="py-4 px-5 font-mono text-stone-500">{item.uploadDate}</td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => alert(`Starting download of official PDF: ${item.title}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-[#7E192E]/10 hover:text-[#7E192E] text-stone-700 font-semibold text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
