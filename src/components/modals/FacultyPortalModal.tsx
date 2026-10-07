import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { X, GraduationCap, BookOpen, Users, CheckCircle, FileCheck, LogOut } from 'lucide-react';

export const FacultyPortalModal: React.FC = () => {
  const { isFacultyPortalOpen, setIsFacultyPortalOpen } = useCollege();
  const [email, setEmail] = useState('faculty@ppc.edu.in');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  if (!isFacultyPortalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSaveAttendance = () => {
    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#1C1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6B1426] text-[#DEB038] flex items-center justify-center font-bold text-xs border border-stone-700">
              PPC
            </div>
            <div>
              <h3 className="font-serif font-bold text-base leading-tight">Faculty Academic Portal</h3>
              <p className="text-[10px] text-stone-400">Autonomous Curriculum Delivery & Internal Assessment Management</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsFacultyPortalOpen(false);
              setIsLoggedIn(false);
            }}
            className="p-1 rounded text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-xs text-stone-700">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto py-6 space-y-4">
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Faculty Sign In</span>
                <h4 className="text-lg font-serif font-bold text-stone-900 mt-1">Autonomous Faculty Workspace</h4>
                <p className="text-xs text-stone-500 mt-1">Enter your institutional faculty email to record student attendance and submit continuous evaluations.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Institutional Faculty Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="faculty@ppc.edu.in"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg text-xs font-semibold transition-colors mt-2"
                >
                  Enter Faculty Portal
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('commerce.faculty@ppc.edu.in');
                    setIsLoggedIn(true);
                  }}
                  className="w-full text-left p-2.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-stone-900">Prof. Department Faculty Representative</span>
                    <span className="text-stone-500 block text-[11px]">Department of Commerce · Assigned: B.Com IV & VI</span>
                  </div>
                  <span className="text-[10px] bg-[#6B1426]/10 text-[#6B1426] px-1.5 py-0.5 rounded font-semibold">1-Click Test</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Profile Bar */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1C1917] text-[#DEB038] flex items-center justify-center font-bold text-base">
                    F
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">Department Faculty Representative</h4>
                    <p className="text-stone-600 text-[11px]">Associate Professor · Department of Commerce</p>
                    <p className="text-stone-400 font-mono text-[10px]">{email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 self-start sm:self-auto"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>

              {/* Assigned Batches */}
              <div>
                <h5 className="font-semibold text-stone-900 mb-2">Assigned Autonomous Courses & Batches</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-stone-200 bg-white shadow-2xs">
                    <span className="font-mono text-[11px] text-[#7E192E] font-semibold">COM401</span>
                    <h6 className="font-semibold text-stone-900 text-xs mt-0.5">Corporate Financial Accounting II</h6>
                    <span className="text-stone-500 text-[11px] block">B.Com Semester IV · Section A (72 Students)</span>
                    <span className="text-emerald-700 text-[10px] font-semibold mt-2 block">✓ Continuous Assessment 1 Uploaded</span>
                  </div>
                  <div className="p-3 rounded-lg border border-stone-200 bg-white shadow-2xs">
                    <span className="font-mono text-[11px] text-[#7E192E] font-semibold">COM402</span>
                    <h6 className="font-semibold text-stone-900 text-xs mt-0.5">Direct Taxation & GST Practice</h6>
                    <span className="text-stone-500 text-[11px] block">B.Com Semester IV · Section B (68 Students)</span>
                    <span className="text-amber-700 text-[10px] font-semibold mt-2 block">⏳ Mid-Semester Entry Due: 15th April</span>
                  </div>
                </div>
              </div>

              {/* Attendance Quick Session Entry */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-stone-900">Today's Class Attendance Marker</h5>
                  {attendanceSaved && (
                    <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Attendance Registered
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Batch</label>
                    <select className="w-full p-1.5 text-xs border border-stone-300 rounded bg-white">
                      <option>B.Com IV Sec A</option>
                      <option>B.Com IV Sec B</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Period</label>
                    <select className="w-full p-1.5 text-xs border border-stone-300 rounded bg-white">
                      <option>09:30 AM - 10:20 AM</option>
                      <option>10:30 AM - 11:20 AM</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Present Count</label>
                    <input type="number" defaultValue="67" className="w-full p-1.5 text-xs border border-stone-300 rounded font-mono bg-white" />
                  </div>
                </div>
                <button
                  onClick={handleSaveAttendance}
                  className="px-4 py-2 bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Submit Class Attendance
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
