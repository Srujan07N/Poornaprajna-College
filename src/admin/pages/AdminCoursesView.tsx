import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { Course, CourseStatus, DegreeLevel, AcademicStream } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, X, BookOpen } from 'lucide-react';

export const AdminCoursesView: React.FC = () => {
  const { courses, departments, createCourse, updateCourse, deleteCourse } = useCollege();
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleStartCreate = () => {
    setIsNew(true);
    setEditingCourse({
      code: 'NEW-UG',
      title: '',
      slug: '',
      degreeLevel: 'Undergraduate',
      stream: 'Commerce',
      duration: '3 Years (6 Semesters)',
      departmentId: departments[0]?.id || 'dept-com',
      departmentName: departments[0]?.name || 'Department of Commerce',
      intake: 60,
      eligibility: 'Passed Karnataka 2nd PUC or 10+2 equivalent in relevant stream.',
      feeInfo: 'Administered under Autonomous regulations. Check with college office.',
      description: '',
      curriculumOverview: ['Foundational Core Modules', 'Electives & Skill Enhancement'],
      subjects: ['Core Course I', 'Core Course II', 'Allied Discipline'],
      specializations: ['General'],
      careerOpportunities: ['Industry Trainee', 'Higher Studies'],
      higherStudyOptions: ['Postgraduate Degree'],
      status: 'Admission Open',
      faqs: []
    });
  };

  const handleStartEdit = (course: Course) => {
    setIsNew(false);
    setEditingCourse({ ...course });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.title) return;
    setSubmitting(true);
    try {
      const selectedDept = departments.find(d => d.id === editingCourse.departmentId);
      const payload = {
        ...editingCourse,
        departmentName: selectedDept?.name || editingCourse.departmentName || 'Autonomous Faculty'
      };

      if (isNew) {
        await createCourse(payload);
      } else if (editingCourse.id) {
        await updateCourse(editingCourse.id, payload);
      }
      setEditingCourse(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the programme "${title}"?`)) {
      await deleteCourse(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#7E192E]">Academic Programmes Management</span>
          <h1 className="text-xl font-serif font-bold text-stone-900 mt-0.5">Course Catalog & Intake Management</h1>
          <p className="text-xs text-stone-500 mt-1">
            Dynamic course availability, intake caps, syllabus outlines, and admission statuses across all autonomous departments.
          </p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-3.5 py-2 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New Programme
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                  {course.code}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  course.status === 'Admission Open' ? 'bg-emerald-100 text-emerald-800' :
                  course.status === 'Draft' ? 'bg-stone-200 text-stone-700' :
                  course.status === 'Published' ? 'bg-blue-100 text-blue-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {course.status}
                </span>
              </div>

              <h3 className="font-serif font-bold text-stone-900 text-lg mt-1">{course.title}</h3>
              <p className="text-xs text-[#7E192E] font-medium mb-2">{course.departmentName}</p>
              <p className="text-xs text-stone-600 line-clamp-2 mb-3">{course.description}</p>

              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex justify-between">
                  <span className="text-stone-400">Level:</span>
                  <span className="font-medium">{course.degreeLevel} ({course.stream})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Intake Capacity:</span>
                  <span className="font-semibold text-stone-900 font-mono">{course.intake} seats</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleStartEdit(course)}
                className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded transition-colors flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.id, course.title)}
                className="px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Edit/Create Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {isNew ? 'Create New Autonomous Programme' : `Edit Programme: ${editingCourse.title}`}
              </h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block font-semibold text-stone-900 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    placeholder="e.g. Bachelor of Commerce (B.Com.)"
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.code || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, code: e.target.value })}
                    placeholder="e.g. BCOM-UG"
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Status</label>
                  <select
                    value={editingCourse.status || 'Draft'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, status: e.target.value as CourseStatus })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="Admission Open">Admission Open</option>
                    <option value="Admission Closed">Admission Closed</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Level</label>
                  <select
                    value={editingCourse.degreeLevel || 'Undergraduate'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, degreeLevel: e.target.value as DegreeLevel })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Stream</label>
                  <select
                    value={editingCourse.stream || 'Commerce'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, stream: e.target.value as AcademicStream })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  >
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Management">Management</option>
                    <option value="Computer Applications">Computer Applications</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    placeholder="3 Years (6 Semesters)"
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-900 mb-1">Approved Intake Capacity</label>
                  <input
                    type="number"
                    value={editingCourse.intake || 60}
                    onChange={(e) => setEditingCourse({ ...editingCourse, intake: Number(e.target.value) })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold text-stone-900 mb-1">Affiliated Department</label>
                  <select
                    value={editingCourse.departmentId || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, departmentId: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.stream})</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold text-stone-900 mb-1">Programme Overview</label>
                  <textarea
                    rows={3}
                    value={editingCourse.description || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block font-semibold text-stone-900 mb-1">Eligibility Criteria</label>
                  <textarea
                    rows={2}
                    value={editingCourse.eligibility || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, eligibility: e.target.value })}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-3.5 py-2 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-semibold bg-[#6B1426] hover:bg-[#520F1D] text-white rounded-lg"
                >
                  {submitting ? 'Saving...' : 'Save Programme'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
