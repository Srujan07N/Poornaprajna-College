import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Search, X, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const ApplicationTrackModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { trackApplication } = useCollege();
  const [appId, setAppId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const data = await trackApplication(appId.trim());
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Application not found.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-stone-900">Track Admission Application</h3>
          <button onClick={onClose} className="p-1 rounded text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs text-stone-700">
          <p className="text-stone-500">
            Enter your generated Application ID (e.g. <span className="font-mono font-semibold text-stone-700">PPC-2026-1042</span>) to inspect live administrative verification status.
          </p>

          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              required
              value={appId}
              onChange={(e) => setAppId(e.target.value.toUpperCase())}
              placeholder="PPC-2026-XXXX"
              className="flex-1 p-2 border border-stone-300 rounded-lg text-xs font-mono uppercase focus:ring-1 focus:ring-[#7E192E]"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg text-xs font-semibold transition-colors"
            >
              {loading ? 'Checking...' : 'Track'}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs">
              {error}
            </div>
          )}

          {result && (
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[11px] text-stone-500 block">{result.applicationId}</span>
                  <h4 className="font-serif font-bold text-sm text-stone-900">{result.fullName}</h4>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
                  result.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                  result.status === 'Shortlisted' ? 'bg-purple-100 text-purple-800' :
                  result.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                  result.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {result.status}
                </span>
              </div>

              <div>
                <span className="text-stone-500 block text-[11px]">Chosen Programme:</span>
                <span className="font-semibold text-stone-800">{result.preferredCourseTitle}</span>
              </div>

              {result.adminRemarks && (
                <div className="p-2.5 rounded bg-white border border-stone-200/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-0.5">
                    Admission Scrutiny Remarks
                  </span>
                  <p className="text-stone-700 italic">{result.adminRemarks}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
