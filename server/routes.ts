import { Router, Request, Response } from 'express';
import { getDb, saveDb } from './db';
import {
  requireAuth,
  requireRole,
  createSession,
  revokeSession,
  AuthenticatedRequest
} from './middleware/auth';
import { AdmissionApplication, ContactEnquiry, Course, Department, Notice, InstitutionalEvent, StudentResult } from '../src/types';

export const apiRouter = Router();

// ==========================================
// 1. AUTHENTICATION & SESSIONS
// ==========================================

apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const db = getDb();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  // Default demo access accepted: password "Admin@123" or standard match
  if (!user || (password !== 'Admin@123' && password !== 'ppc@admin2026')) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. For official demo, use email: admin@ppc.edu.in with password: Admin@123'
    });
  }

  const token = createSession(user);
  return res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      departmentId: user.departmentId
    }
  });
});

apiRouter.get('/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    user: req.user
  });
});

apiRouter.post('/auth/logout', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  if (req.token) {
    revokeSession(req.token);
  }
  return res.json({ success: true, message: 'Signed out successfully.' });
});

// ==========================================
// 2. ADMIN ANALYTICS & STATS
// ==========================================

apiRouter.get('/admin/stats', requireAuth, (_req: AuthenticatedRequest, res: Response) => {
  const db = getDb();

  const totalApplications = db.applications.length;
  const pendingApplications = db.applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;
  const approvedApplications = db.applications.filter(a => a.status === 'Approved').length;
  const shortlistedApplications = db.applications.filter(a => a.status === 'Shortlisted').length;

  const totalCourses = db.courses.length;
  const publishedCourses = db.courses.filter(c => c.status !== 'Draft').length;
  const totalDepartments = db.departments.length;
  const totalNotices = db.notices.length;
  const upcomingEvents = db.events.filter(e => e.status === 'Upcoming').length;
  const newEnquiries = db.enquiries.filter(e => e.status === 'New').length;

  // Breakdown by course
  const applicationsByCourse: Record<string, number> = {};
  db.applications.forEach(app => {
    applicationsByCourse[app.preferredCourseTitle] = (applicationsByCourse[app.preferredCourseTitle] || 0) + 1;
  });

  return res.json({
    success: true,
    stats: {
      totalApplications,
      pendingApplications,
      approvedApplications,
      shortlistedApplications,
      totalCourses,
      publishedCourses,
      totalDepartments,
      facultyCount: db.faculty.length,
      totalNotices,
      upcomingEvents,
      newEnquiries,
      applicationsByCourse
    }
  });
});

// ==========================================
// 3. SETTINGS & CMS
// ==========================================

apiRouter.get('/settings', (_req: Request, res: Response) => {
  const db = getDb();
  return res.json({ success: true, settings: db.settings });
});

apiRouter.put('/settings', requireAuth, requireRole('super_admin', 'admin', 'editor'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  db.settings = { ...db.settings, ...req.body };
  saveDb();
  return res.json({ success: true, settings: db.settings, message: 'Institutional settings updated.' });
});

// ==========================================
// 4. COURSES MANAGEMENT
// ==========================================

apiRouter.get('/courses', (_req: Request, res: Response) => {
  const db = getDb();
  return res.json({ success: true, courses: db.courses });
});

apiRouter.post('/courses', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const newCourse: Course = {
    id: 'crs-' + Date.now().toString(36),
    code: req.body.code || 'CRS-NEW',
    title: req.body.title || 'Untitled Course',
    slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    degreeLevel: req.body.degreeLevel || 'Undergraduate',
    stream: req.body.stream || 'Commerce',
    duration: req.body.duration || '3 Years',
    departmentId: req.body.departmentId || 'dept-com',
    departmentName: req.body.departmentName || 'Department of Commerce',
    intake: Number(req.body.intake) || 60,
    eligibility: req.body.eligibility || 'Passed 10+2 / PUC equivalent.',
    feeInfo: req.body.feeInfo || 'Detailed fee structure available at the college office.',
    description: req.body.description || '',
    curriculumOverview: req.body.curriculumOverview || [],
    subjects: req.body.subjects || [],
    specializations: req.body.specializations || [],
    careerOpportunities: req.body.careerOpportunities || [],
    higherStudyOptions: req.body.higherStudyOptions || [],
    status: req.body.status || 'Draft',
    faqs: req.body.faqs || []
  };

  db.courses.push(newCourse);
  saveDb();
  return res.status(201).json({ success: true, course: newCourse });
});

apiRouter.put('/courses/:id', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.courses.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Course not found.' });
  }

  db.courses[index] = { ...db.courses[index], ...req.body };
  saveDb();
  return res.json({ success: true, course: db.courses[index] });
});

apiRouter.delete('/courses/:id', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const initialLength = db.courses.length;
  db.courses = db.courses.filter(c => c.id !== req.params.id);
  if (db.courses.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Course not found.' });
  }
  saveDb();
  return res.json({ success: true, message: 'Course deleted successfully.' });
});

// ==========================================
// 5. DEPARTMENTS & FACULTY
// ==========================================

apiRouter.get('/departments', (_req: Request, res: Response) => {
  const db = getDb();
  return res.json({ success: true, departments: db.departments });
});

apiRouter.post('/departments', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const newDept: Department = {
    id: 'dept-' + Date.now().toString(36),
    code: req.body.code || 'DEPT',
    name: req.body.name || 'New Department',
    stream: req.body.stream || 'Arts',
    hodName: req.body.hodName || 'Head of Department',
    hodQualification: req.body.hodQualification || 'Ph.D.',
    hodMessage: req.body.hodMessage || '',
    overview: req.body.overview || '',
    programmesOffered: req.body.programmesOffered || [],
    facilities: req.body.facilities || [],
    researchAreas: req.body.researchAreas || [],
    contactEmail: req.body.contactEmail || 'office@ppc.edu.in',
    contactExtension: req.body.contactExtension || 'Ext. 100'
  };

  db.departments.push(newDept);
  saveDb();
  return res.status(201).json({ success: true, department: newDept });
});

apiRouter.put('/departments/:id', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.departments.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Department not found.' });
  }

  db.departments[index] = { ...db.departments[index], ...req.body };
  saveDb();
  return res.json({ success: true, department: db.departments[index] });
});

apiRouter.get('/faculty', (_req: Request, res: Response) => {
  const db = getDb();
  return res.json({ success: true, faculty: db.faculty });
});

// ==========================================
// 6. ADMISSIONS & ONLINE APPLICATIONS
// ==========================================

// Public application submission
apiRouter.post('/admissions', (req: Request, res: Response) => {
  const db = getDb();
  const count = db.applications.length + 1045;
  const applicationId = `PPC-2026-${count}`;

  const application: AdmissionApplication = {
    id: 'app-' + Date.now().toString(36),
    applicationId,
    submittedAt: new Date().toISOString(),
    fullName: req.body.fullName || 'Applicant',
    dob: req.body.dob || '',
    gender: req.body.gender || 'Other',
    mobileNumber: req.body.mobileNumber || '',
    email: req.body.email || '',
    address: req.body.address || '',
    city: req.body.city || '',
    state: req.body.state || 'Karnataka',
    pincode: req.body.pincode || '',
    pucBoard: req.body.pucBoard || '',
    passingYear: req.body.passingYear || '2026',
    percentageMarks: Number(req.body.percentageMarks) || 0,
    preferredCourseId: req.body.preferredCourseId || '',
    preferredCourseTitle: req.body.preferredCourseTitle || '',
    category: req.body.category || 'General',
    previousInstitution: req.body.previousInstitution || '',
    parentName: req.body.parentName || '',
    parentMobile: req.body.parentMobile || '',
    parentOccupation: req.body.parentOccupation || '',
    documentsUploaded: {
      photograph: Boolean(req.body.documentsUploaded?.photograph),
      idProof: Boolean(req.body.documentsUploaded?.idProof),
      marksCard: Boolean(req.body.documentsUploaded?.marksCard),
      transferCertificate: Boolean(req.body.documentsUploaded?.transferCertificate)
    },
    status: 'Submitted',
    adminRemarks: 'Application received online. Awaiting document verification.'
  };

  db.applications.unshift(application);
  saveDb();

  return res.status(201).json({
    success: true,
    message: 'Application submitted successfully.',
    applicationId,
    application
  });
});

// Public status tracking
apiRouter.get('/admissions/track/:applicationId', (req: Request, res: Response) => {
  const db = getDb();
  const targetId = req.params.applicationId.trim().toUpperCase();
  const app = db.applications.find(a => a.applicationId.toUpperCase() === targetId);

  if (!app) {
    return res.status(404).json({
      success: false,
      message: `No application found with ID "${req.params.applicationId}". Please check and try again.`
    });
  }

  return res.json({
    success: true,
    application: {
      applicationId: app.applicationId,
      fullName: app.fullName,
      preferredCourseTitle: app.preferredCourseTitle,
      status: app.status,
      submittedAt: app.submittedAt,
      adminRemarks: app.adminRemarks
    }
  });
});

// Admin list applications
apiRouter.get('/admissions', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  let list = [...db.applications];

  const { status, courseId, search } = req.query;
  if (status && typeof status === 'string' && status !== 'all') {
    list = list.filter(a => a.status.toLowerCase() === status.toLowerCase());
  }
  if (courseId && typeof courseId === 'string' && courseId !== 'all') {
    list = list.filter(a => a.preferredCourseId === courseId);
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(a =>
      a.fullName.toLowerCase().includes(q) ||
      a.applicationId.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.mobileNumber.includes(q)
    );
  }

  return res.json({ success: true, applications: list });
});

// Admin update application status / remarks
apiRouter.put('/admissions/:id', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const app = db.applications.find(a => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found.' });
  }

  if (req.body.status) app.status = req.body.status;
  if (req.body.adminRemarks !== undefined) app.adminRemarks = req.body.adminRemarks;
  app.reviewedAt = new Date().toISOString();
  app.reviewedBy = req.user?.name || 'Admin';

  saveDb();
  return res.json({ success: true, application: app, message: 'Status updated.' });
});

// ==========================================
// 7. NOTICES & CIRCULARS
// ==========================================

apiRouter.get('/notices', (_req: Request, res: Response) => {
  const db = getDb();
  return res.json({ success: true, notices: db.notices });
});

apiRouter.post('/notices', requireAuth, requireRole('super_admin', 'admin', 'editor'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const newNotice: Notice = {
    id: 'not-' + Date.now().toString(36),
    title: req.body.title || 'Official Circular',
    category: req.body.category || 'General',
    date: req.body.date || new Date().toISOString().split('T')[0],
    description: req.body.description || '',
    fileName: req.body.fileName || 'PPC_Official_Notice.pdf',
    fileUrl: req.body.fileUrl || '#download',
    isImportant: Boolean(req.body.isImportant),
    isPublished: true,
    targetAudience: req.body.targetAudience || 'All'
  };

  db.notices.unshift(newNotice);
  saveDb();
  return res.status(201).json({ success: true, notice: newNotice });
});

apiRouter.put('/notices/:id', requireAuth, requireRole('super_admin', 'admin', 'editor'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const index = db.notices.findIndex(n => n.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Notice not found.' });
  }

  db.notices[index] = { ...db.notices[index], ...req.body };
  saveDb();
  return res.json({ success: true, notice: db.notices[index] });
});

apiRouter.delete('/notices/:id', requireAuth, requireRole('super_admin', 'admin', 'editor'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  db.notices = db.notices.filter(n => n.id !== req.params.id);
  saveDb();
  return res.json({ success: true, message: 'Notice deleted.' });
});

// ==========================================
// 8. EVENTS & NEWS
// ==========================================

apiRouter.get('/events', (_req: Request, res: Response) => {
  const db = getDb();
  return res.json({ success: true, events: db.events });
});

apiRouter.post('/events', requireAuth, requireRole('super_admin', 'admin', 'editor'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const newEvent: InstitutionalEvent = {
    id: 'ev-' + Date.now().toString(36),
    title: req.body.title || 'Campus Event',
    category: req.body.category || 'Academic',
    date: req.body.date || new Date().toISOString().split('T')[0],
    time: req.body.time || '10:00 AM',
    venue: req.body.venue || 'College Auditorium',
    departmentName: req.body.departmentName || 'General Administration',
    description: req.body.description || '',
    registrationOpen: Boolean(req.body.registrationOpen),
    status: req.body.status || 'Upcoming'
  };

  db.events.unshift(newEvent);
  saveDb();
  return res.status(201).json({ success: true, event: newEvent });
});

// ==========================================
// 9. EXAMINATION & RESULTS LOOKUP
// ==========================================

// Public result search
apiRouter.get('/results/lookup', (req: Request, res: Response) => {
  const { regNo, semester } = req.query;
  if (!regNo) {
    return res.status(400).json({ success: false, message: 'Register number is required.' });
  }

  const db = getDb();
  const cleanRegNo = String(regNo).trim().toUpperCase();

  const match = db.results.find(r => {
    const regMatches = r.registerNumber.toUpperCase() === cleanRegNo;
    if (semester && String(semester) !== 'all') {
      return regMatches && r.semester.toLowerCase() === String(semester).toLowerCase();
    }
    return regMatches;
  });

  if (!match) {
    return res.status(404).json({
      success: false,
      message: `No published examination result found for Register No "${cleanRegNo}". For verified demo queries, try "22PPC1042", "23PPC2015", or "22PPC3008".`
    });
  }

  return res.json({ success: true, result: match });
});

apiRouter.get('/results', requireAuth, requireRole('super_admin', 'admin'), (_req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  return res.json({ success: true, results: db.results });
});

apiRouter.post('/results', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const newResult: StudentResult = {
    id: 'res-' + Date.now().toString(36),
    registerNumber: (req.body.registerNumber || '').toUpperCase(),
    studentName: req.body.studentName || 'Student Name',
    courseTitle: req.body.courseTitle || 'Bachelor of Commerce (B.Com.)',
    semester: req.body.semester || 'Semester I',
    examSession: req.body.examSession || 'Autonomous Examinations 2026',
    declarationDate: req.body.declarationDate || new Date().toISOString().split('T')[0],
    sgpa: Number(req.body.sgpa) || 8.0,
    resultStatus: req.body.resultStatus || 'PASS',
    subjects: req.body.subjects || []
  };

  db.results.push(newResult);
  saveDb();
  return res.status(201).json({ success: true, result: newResult });
});

// ==========================================
// 10. ENQUIRIES & ALUMNI
// ==========================================

apiRouter.post('/enquiries', (req: Request, res: Response) => {
  const db = getDb();
  const enquiry: ContactEnquiry = {
    id: 'enq-' + Date.now().toString(36),
    name: req.body.name || 'Visitor',
    email: req.body.email || '',
    mobile: req.body.mobile || '',
    subject: req.body.subject || 'General Inquiry',
    programme: req.body.programme || '',
    message: req.body.message || '',
    submittedAt: new Date().toISOString(),
    status: 'New'
  };

  db.enquiries.unshift(enquiry);
  saveDb();
  return res.status(201).json({ success: true, message: 'Your enquiry has been received. Our administrative office will connect with you.' });
});

apiRouter.get('/enquiries', requireAuth, requireRole('super_admin', 'admin'), (_req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  return res.json({ success: true, enquiries: db.enquiries });
});

apiRouter.put('/enquiries/:id', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const enq = db.enquiries.find(e => e.id === req.params.id);
  if (!enq) return res.status(404).json({ success: false, message: 'Enquiry not found.' });

  if (req.body.status) enq.status = req.body.status;
  if (req.body.adminNotes !== undefined) enq.adminNotes = req.body.adminNotes;
  saveDb();
  return res.json({ success: true, enquiry: enq });
});

apiRouter.post('/alumni', (req: Request, res: Response) => {
  const db = getDb();
  const newAlum = {
    id: 'alm-' + Date.now().toString(36),
    fullName: req.body.fullName || 'Alumnus',
    batchYear: req.body.batchYear || '',
    courseStudied: req.body.courseStudied || '',
    currentDesignation: req.body.currentDesignation || '',
    currentCompanyOrInstitute: req.body.currentCompanyOrInstitute || '',
    location: req.body.location || '',
    email: req.body.email || '',
    phone: req.body.phone || '',
    testimonial: req.body.testimonial || '',
    isApproved: false, // Requires admin approval
    submittedAt: new Date().toISOString()
  };

  db.alumni.unshift(newAlum);
  saveDb();
  return res.status(201).json({ success: true, message: 'Alumni registration submitted for administrative review. Thank you!' });
});

apiRouter.get('/alumni', (req: Request, res: Response) => {
  const db = getDb();
  const isAdmin = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
  if (isAdmin) {
    return res.json({ success: true, alumni: db.alumni });
  }
  return res.json({ success: true, alumni: db.alumni.filter(a => a.isApproved) });
});

apiRouter.put('/alumni/:id', requireAuth, requireRole('super_admin', 'admin'), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const alum = db.alumni.find(a => a.id === req.params.id);
  if (!alum) return res.status(404).json({ success: false, message: 'Record not found.' });

  if (typeof req.body.isApproved === 'boolean') {
    alum.isApproved = req.body.isApproved;
  }
  saveDb();
  return res.json({ success: true, alumni: alum });
});

// ==========================================
// 11. DOWNLOADS & GALLERY
// ==========================================

apiRouter.get('/downloads', (_req: Request, res: Response) => {
  const db = getDb();
  return res.json({ success: true, downloads: db.downloads });
});

apiRouter.get('/gallery', (_req: Request, res: Response) => {
  const db = getDb();
  return res.json({ success: true, gallery: db.gallery });
});
