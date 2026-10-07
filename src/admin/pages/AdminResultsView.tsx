import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { StudentResult } from '../../types';
import { Plus, Award, Search, X, CheckCircle2 } from 'lucide-react';

export const AdminResultsView: React.FC = () => {
  const { results, createResult } = useCollege();
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newResult, setNewResult] = useState<Partial<StudentResult>>({
    registerNumber: '',
    studentName: '',
    courseTitle: 'Bachelor of Commerce (B.Com.)',
    semester: 'Semester IV',
    examSession: 'Autonomous Examinations 2026',
    declarationDate: new Date().toISOString().split('T')[0],
    sgpa: 8.5,
    resultStatus: 'DISTINCTION',
    subjects: [
      { code: 'SUB101', name: 'Core Theory Paper I', credits: 4, internalMarks: 27, externalMarks: 62, totalMarks: 89, grade: 'A+', result: 'P' },
      { code: 'SUB102', name: 'Core Theory Paper II', credits: 4, internalMarks: 26, externalMarks: 60, totalMarks: 86, grade: 'A+', result: 'P' },
      { code: 'SUB103', name: 'Practical / Elective', credits: 2, internalMarks: 20, externalMarks: 28, totalMarks: 48, grade: 'O', result: 'P' }
    ]
  });

  const filteredResults = results.filter(r =>
    r.registerNumber.toLowerCase().includes(search.toLowerCase()) ||
    r.studentName.toLowerCase().includes(search.toLowerCase()) ||
    r.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResult.registerNumber || !newResult.studentName) return;
    setSubmitting(true);
    try {
      await createResult(newResult);
      setIsAdding(false);
      setNewResult({
        registerNumber: '',
        studentName: '',
        courseTitle: 'Bachelor of Commerce (B.Com.)',
        semester: 'Semester IV',
        examSession: 'Autonomous Examinations 2026',
        declarationDate: new Date().toISOString().split('T')[0],
        sgpa: 8.5,
        resultStatus: 'DISTINCTION',
        subjects: []
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Examination Office</span>
          <h1 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Autonomous Result Publishing & Records</h1>
          <p className="text-xs text-stone-500 mt-1">
            Publish verified semester grade cards and marksheet statements for student portal queries.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-3.5 py-2 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Student Marksheet Record
        </button>
      </div>

      <div className="bg-white border border-stone-200/80 rounded-xl p-3 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Register Number (e.g. 22PPC1042) or Student Name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7E192E] bg-stone-50/50"
          />
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Register No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Programme</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">SGPA</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Declaration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70">
              {filteredResults.map((res) => (
                <tr key={res.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#7E192E]">{res.registerNumber}</td>
                  <td className="py-3 px-4 font-medium text-stone-900">{res.studentName}</td>
                  <td className="py-3 px-4 text-stone-700">{res.courseTitle}</td>
                  <td className="py-3 px-4 text-stone-600">{res.semester}</td>
                  <td className="py-3 px-4 font-mono font-bold text-stone-900 tabular-nums">{res.sgpa}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {res.resultStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">{res.declarationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Result Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-serif font-bold text-stone-900">Add Student Examination Result</h3>
              <button onClick={() => setIsAdding(false)} className="p-1 rounded text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3.5 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Register Number</label>
                  <input
                    type="text"
                    required
                    value={newResult.registerNumber}
                    onChange={(e) => setNewResult({ ...newResult, registerNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. 24PPC4012"
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={newResult.studentName}
                    onChange={(e) => setNewResult({ ...newResult, studentName: e.target.value })}
                    placeholder="Candidate Name"
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold text-stone-900 mb-1">Programme Title</label>
                  <input
                    type="text"
                    required
                    value={newResult.courseTitle}
                    onChange={(e) => setNewResult({ ...newResult, courseTitle: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Semester</label>
                  <input
                    type="text"
                    required
                    value={newResult.semester}
                    onChange={(e) => setNewResult({ ...newResult, semester: e.target.value })}
                    placeholder="Semester II"
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-900 mb-1">SGPA Score</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newResult.sgpa}
                    onChange={(e) => setNewResult({ ...newResult, sgpa: Number(e.target.value) })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Result Classification</label>
                  <select
                    value={newResult.resultStatus}
                    onChange={(e) => setNewResult({ ...newResult, resultStatus: e.target.value as any })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="DISTINCTION">DISTINCTION</option>
                    <option value="FIRST CLASS">FIRST CLASS</option>
                    <option value="PASS">PASS</option>
                    <option value="PROMOTED">PROMOTED</option>
                    <option value="WITHHELD">WITHHELD</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Declaration Date</label>
                  <input
                    type="date"
                    required
                    value={newResult.declarationDate}
                    onChange={(e) => setNewResult({ ...newResult, declarationDate: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg"
                >
                  {submitting ? 'Publishing...' : 'Publish Result'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
