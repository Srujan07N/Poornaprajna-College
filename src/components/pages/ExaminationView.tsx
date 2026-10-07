import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { StudentResult } from '../../types';
import {
  Award,
  Search,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Download,
  BookOpen,
  Printer
} from 'lucide-react';

export const ExaminationView: React.FC = () => {
  const { lookupResult, notices } = useCollege();
  const [regNo, setRegNo] = useState('');
  const [semester, setSemester] = useState('all');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StudentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const examNotices = notices.filter(n => n.category === 'Examination' || n.category === 'Results');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNo.trim()) return;
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const data = await lookupResult(regNo.trim(), semester);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'No examination record found.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-[#FCFBF7] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-[#1C1917] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#DEB038] tracking-widest uppercase">
              <Award className="w-4 h-4" />
              <span>Office of the Controller of Examinations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Autonomous Examination & Results Portal
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl font-sans">
              Official portal for semester examination schedules, autonomous evaluation guidelines, model question blueprints, and provisional result statements.
            </p>
          </div>
        </div>

        {/* Live Result Query Box */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 sm:p-10 shadow-xs max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Provisional Marksheet Verification</span>
            <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">Autonomous Result Lookup</h2>
            <p className="text-xs text-stone-500 mt-1">
              Enter your College Register Number to view published semester grade card.
            </p>
          </div>

          <form onSubmit={handleLookup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">Autonomous Register Number *</label>
                <input
                  type="text"
                  required
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                  placeholder="e.g. 22PPC1042 or 23PPC2015"
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs font-mono uppercase focus:ring-1 focus:ring-[#7E192E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Semester Filter</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
                >
                  <option value="all">All Declared</option>
                  <option value="Semester II">Semester II</option>
                  <option value="Semester IV">Semester IV</option>
                  <option value="Semester VI">Semester VI</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#6B1426] hover:bg-[#520F1D] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              {loading ? 'Consulting Autonomous Database...' : 'Retrieve Result Statement'}
            </button>
          </form>

          {/* Quick Demo Test Buttons */}
          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between text-[11px] text-stone-500">
            <span>Verified Demo Candidates:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRegNo('22PPC1042')}
                className="font-mono font-semibold text-[#7E192E] hover:underline"
              >
                22PPC1042 (B.Com)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setRegNo('23PPC2015')}
                className="font-mono font-semibold text-[#7E192E] hover:underline"
              >
                23PPC2015 (B.Sc)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setRegNo('22PPC3008')}
                className="font-mono font-semibold text-[#7E192E] hover:underline"
              >
                22PPC3008 (B.C.A.)
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Displayed Marksheet Card */}
          {result && (
            <div className="mt-8 border border-stone-300 rounded-xl p-6 bg-[#FCFBF7] space-y-5 animate-in fade-in duration-200">
              {/* Marksheet Institutional Header */}
              <div className="border-b-2 border-stone-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7E192E] block">
                    Poornaprajna College (Autonomous), Udupi
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mt-0.5">
                    Provisional Statement of Marks & Grades
                  </h3>
                  <span className="text-xs text-stone-500 font-mono">{result.examSession}</span>
                </div>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Statement
                </button>
              </div>

              {/* Student Metadata Definition List */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-4 rounded-lg border border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[11px]">Register Number</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">{result.registerNumber}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Student Name</span>
                  <span className="font-semibold text-stone-900">{result.studentName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Programme & Semester</span>
                  <span className="font-medium text-stone-800">{result.courseTitle} · {result.semester}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Declaration Date</span>
                  <span className="font-mono text-stone-700">{result.declarationDate}</span>
                </div>
              </div>

              {/* Subjects & Marks Table */}
              <div className="border border-stone-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Subject Code</th>
                      <th className="py-2.5 px-3">Title of the Paper</th>
                      <th className="py-2.5 px-3 text-center">Credits</th>
                      <th className="py-2.5 px-3 text-right">Internal (30)</th>
                      <th className="py-2.5 px-3 text-right">External (70)</th>
                      <th className="py-2.5 px-3 text-right">Total (100)</th>
                      <th className="py-2.5 px-3 text-center">Grade</th>
                      <th className="py-2.5 px-3 text-center">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-mono text-[11px]">
                    {result.subjects.map((sub, i) => (
                      <tr key={i} className="hover:bg-stone-50/50">
                        <td className="py-2.5 px-3 font-bold text-stone-800">{sub.code}</td>
                        <td className="py-2.5 px-3 font-sans font-medium text-stone-900">{sub.name}</td>
                        <td className="py-2.5 px-3 text-center">{sub.credits}</td>
                        <td className="py-2.5 px-3 text-right text-stone-600">{sub.internalMarks}</td>
                        <td className="py-2.5 px-3 text-right text-stone-600">{sub.externalMarks}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-stone-900">{sub.totalMarks}</td>
                        <td className="py-2.5 px-3 text-center text-emerald-800 font-bold">{sub.grade}</td>
                        <td className="py-2.5 px-3 text-center font-bold text-emerald-700">{sub.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SGPA & Outcome Ribbon */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-emerald-800 font-medium block">Semester Performance Index:</span>
                  <span className="font-serif font-bold text-xl text-emerald-950">SGPA: {result.sgpa} / 10.0</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex px-3 py-1 rounded-md bg-emerald-700 text-white font-bold text-xs">
                    RESULT: {result.resultStatus}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 text-center italic">
                This is a computer-generated provisional marksheet. The original grade card attested by the Controller of Examinations will be issued through the college administrative office.
              </p>
            </div>
          )}
        </div>

        {/* Examination Notices Grid */}
        <div className="space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Current Examination Notifications & Circulars
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Approved announcements by the Autonomous Examination Committee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examNotices.map((n) => (
              <div key={n.id} className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <span>{n.date}</span>
                  <span className="font-sans font-semibold text-[#7E192E]">{n.category}</span>
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-base">{n.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{n.description}</p>
                <div className="pt-2">
                  <button
                    onClick={() => alert(`Downloading official examination file: ${n.fileName}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7E192E] hover:text-[#4D0E1B]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Schedule (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
