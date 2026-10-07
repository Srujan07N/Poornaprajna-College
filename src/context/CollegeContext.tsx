import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteSettings,
  Course,
  Department,
  FacultyMember,
  AdmissionApplication,
  Notice,
  InstitutionalEvent,
  StudentResult,
  ContactEnquiry,
  AlumniRecord,
  DownloadItem,
  GalleryItem,
  AdminUser
} from '../types';
import {
  initialSettings,
  initialCourses,
  initialDepartments,
  initialFaculty,
  initialNotices,
  initialEvents,
  initialApplications,
  initialResults,
  initialEnquiries,
  initialAlumni,
  initialDownloads,
  initialGallery,
  initialAdminUsers
} from '../lib/initialData';
import { api, getStoredUser, clearStoredAuth } from '../lib/api';

export type PublicPage =
  | 'home'
  | 'about'
  | 'academics'
  | 'admissions'
  | 'departments'
  | 'campus'
  | 'student-life'
  | 'research'
  | 'placements'
  | 'notices'
  | 'events'
  | 'downloads'
  | 'alumni'
  | 'contact'
  | 'examination';

interface CollegeContextType {
  // Navigation & View
  currentPage: PublicPage;
  setCurrentPage: (page: PublicPage) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  isAdminView: boolean;
  setIsAdminView: (isAdmin: boolean) => void;
  adminSubPage: string;
  setAdminSubPage: (sub: string) => void;

  // Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isStudentPortalOpen: boolean;
  setIsStudentPortalOpen: (open: boolean) => void;
  isFacultyPortalOpen: boolean;
  setIsFacultyPortalOpen: (open: boolean) => void;

  // Data
  settings: SiteSettings;
  courses: Course[];
  departments: Department[];
  faculty: FacultyMember[];
  notices: Notice[];
  events: InstitutionalEvent[];
  applications: AdmissionApplication[];
  enquiries: ContactEnquiry[];
  results: StudentResult[];
  alumni: AlumniRecord[];
  downloads: DownloadItem[];
  gallery: GalleryItem[];
  loading: boolean;
  refreshData: () => Promise<void>;

  // Public Actions
  submitApplication: (data: any) => Promise<{ applicationId: string; application: AdmissionApplication }>;
  trackApplication: (appId: string) => Promise<any>;
  lookupResult: (regNo: string, semester?: string) => Promise<StudentResult>;
  submitEnquiry: (data: Partial<ContactEnquiry>) => Promise<void>;
  submitAlumni: (data: Partial<AlumniRecord>) => Promise<void>;

  // Admin Auth & Management
  currentAdmin: AdminUser | null;
  loginAdmin: (email: string, pass: string) => Promise<void>;
  logoutAdmin: () => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  createCourse: (c: Partial<Course>) => Promise<Course>;
  updateCourse: (id: string, c: Partial<Course>) => Promise<Course>;
  deleteCourse: (id: string) => Promise<void>;
  updateApplicationStatus: (id: string, status: string, remarks?: string) => Promise<void>;
  createNotice: (n: Partial<Notice>) => Promise<void>;
  updateNotice: (id: string, n: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  createEvent: (e: Partial<InstitutionalEvent>) => Promise<void>;
  createResult: (r: Partial<StudentResult>) => Promise<void>;
  updateEnquiryStatus: (id: string, status: string, notes?: string) => Promise<void>;
  approveAlumni: (id: string, approved: boolean) => Promise<void>;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export const CollegeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation states
  const [currentPage, setCurrentPage] = useState<PublicPage>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [adminSubPage, setAdminSubPage] = useState<string>('dashboard');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [isFacultyPortalOpen, setIsFacultyPortalOpen] = useState(false);

  // Entities
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [faculty, setFaculty] = useState<FacultyMember[]>(initialFaculty);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [events, setEvents] = useState<InstitutionalEvent[]>(initialEvents);
  const [applications, setApplications] = useState<AdmissionApplication[]>(initialApplications);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(initialEnquiries);
  const [results, setResults] = useState<StudentResult[]>(initialResults);
  const [alumni, setAlumni] = useState<AlumniRecord[]>(initialAlumni);
  const [downloads, setDownloads] = useState<DownloadItem[]>(initialDownloads);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [loading, setLoading] = useState<boolean>(true);

  // Auth
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => getStoredUser());

  // URL Hash router check on load
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash.startsWith('admin')) {
        setIsAdminView(true);
        const sub = hash.replace('admin/', '').replace('admin', '');
        if (sub) setAdminSubPage(sub);
      } else {
        setIsAdminView(false);
        const validPages: PublicPage[] = [
          'home', 'about', 'academics', 'admissions', 'departments',
          'campus', 'student-life', 'research', 'placements', 'notices',
          'events', 'downloads', 'alumni', 'contact', 'examination'
        ];
        if (validPages.includes(hash as PublicPage)) {
          setCurrentPage(hash as PublicPage);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const refreshData = async () => {
    try {
      setLoading(true);
      const [s, c, d, f, n, ev, dl, gl] = await Promise.allSettled([
        api.getSettings(),
        api.getCourses(),
        api.getDepartments(),
        api.getFaculty(),
        api.getNotices(),
        api.getEvents(),
        api.getDownloads(),
        api.getGallery()
      ]);

      if (s.status === 'fulfilled') setSettings(s.value);
      if (c.status === 'fulfilled') setCourses(c.value);
      if (d.status === 'fulfilled') setDepartments(d.value);
      if (f.status === 'fulfilled') setFaculty(f.value);
      if (n.status === 'fulfilled') setNotices(n.value);
      if (ev.status === 'fulfilled') setEvents(ev.value);
      if (dl.status === 'fulfilled') setDownloads(dl.value);
      if (gl.status === 'fulfilled') setGallery(gl.value);

      if (currentAdmin) {
        const [apps, enqs, res, alm] = await Promise.allSettled([
          api.getApplications(),
          api.getEnquiries(),
          api.getResults(),
          api.getAlumni()
        ]);
        if (apps.status === 'fulfilled') setApplications(apps.value);
        if (enqs.status === 'fulfilled') setEnquiries(enqs.value);
        if (res.status === 'fulfilled') setResults(res.value);
        if (alm.status === 'fulfilled') setAlumni(alm.value);
      }
    } catch (err) {
      console.warn('Data sync note: running with current active state', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [currentAdmin]);

  // Public Methods
  const submitApplication = async (data: any) => {
    try {
      const res = await api.submitApplication(data);
      setApplications(prev => [res.application, ...prev]);
      return res;
    } catch {
      // Local fallback
      const appId = `PPC-2026-${applications.length + 1045}`;
      const newApp: AdmissionApplication = {
        id: 'app-' + Date.now(),
        applicationId: appId,
        submittedAt: new Date().toISOString(),
        fullName: data.fullName,
        dob: data.dob,
        gender: data.gender,
        mobileNumber: data.mobileNumber,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        pucBoard: data.pucBoard,
        passingYear: data.passingYear,
        percentageMarks: Number(data.percentageMarks),
        preferredCourseId: data.preferredCourseId,
        preferredCourseTitle: data.preferredCourseTitle,
        category: data.category,
        previousInstitution: data.previousInstitution,
        parentName: data.parentName,
        parentMobile: data.parentMobile,
        documentsUploaded: data.documentsUploaded || { photograph: true, idProof: true, marksCard: true, transferCertificate: true },
        status: 'Submitted',
        adminRemarks: 'Application received online. Awaiting document verification.'
      };
      setApplications(prev => [newApp, ...prev]);
      return { applicationId: appId, application: newApp };
    }
  };

  const trackApplication = async (appId: string) => {
    try {
      return await api.trackApplication(appId);
    } catch {
      const found = applications.find(a => a.applicationId.toUpperCase() === appId.trim().toUpperCase());
      if (found) {
        return {
          applicationId: found.applicationId,
          fullName: found.fullName,
          preferredCourseTitle: found.preferredCourseTitle,
          status: found.status,
          submittedAt: found.submittedAt,
          adminRemarks: found.adminRemarks
        };
      }
      throw new Error(`No application found with ID "${appId}".`);
    }
  };

  const lookupResult = async (regNo: string, semester?: string) => {
    try {
      return await api.lookupResult(regNo, semester);
    } catch {
      const clean = regNo.trim().toUpperCase();
      const match = results.find(r => {
        const matchesReg = r.registerNumber.toUpperCase() === clean;
        if (semester && semester !== 'all') {
          return matchesReg && r.semester.toLowerCase() === semester.toLowerCase();
        }
        return matchesReg;
      });
      if (match) return match;
      throw new Error(`No published autonomous result found for Register No "${clean}". Try "22PPC1042" or "23PPC2015".`);
    }
  };

  const submitEnquiry = async (data: Partial<ContactEnquiry>) => {
    try {
      await api.submitEnquiry(data);
    } catch {
      // Local fallback
    }
    const newEnq: ContactEnquiry = {
      id: 'enq-' + Date.now(),
      name: data.name || 'Visitor',
      email: data.email || '',
      mobile: data.mobile || '',
      subject: data.subject || 'Inquiry',
      programme: data.programme,
      message: data.message || '',
      submittedAt: new Date().toISOString(),
      status: 'New'
    };
    setEnquiries(prev => [newEnq, ...prev]);
  };

  const submitAlumni = async (data: Partial<AlumniRecord>) => {
    try {
      await api.submitAlumni(data);
    } catch {
      // Local fallback
    }
    const newAlm: AlumniRecord = {
      id: 'alm-' + Date.now(),
      fullName: data.fullName || 'Alumnus',
      batchYear: data.batchYear || '',
      courseStudied: data.courseStudied || '',
      currentDesignation: data.currentDesignation || '',
      currentCompanyOrInstitute: data.currentCompanyOrInstitute || '',
      location: data.location || '',
      email: data.email || '',
      phone: data.phone || '',
      testimonial: data.testimonial,
      isApproved: false,
      submittedAt: new Date().toISOString()
    };
    setAlumni(prev => [newAlm, ...prev]);
  };

  // Admin Methods
  const loginAdmin = async (email: string, pass: string) => {
    const res = await api.login(email, pass);
    setCurrentAdmin(res.user);
    setIsAdminView(true);
    window.location.hash = 'admin';
  };

  const logoutAdmin = async () => {
    await api.logout();
    setCurrentAdmin(null);
    clearStoredAuth();
    setIsAdminView(false);
    window.location.hash = 'home';
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const updated = await api.updateSettings(newSettings);
      setSettings(updated);
    } catch {
      setSettings(prev => ({ ...prev, ...newSettings }));
    }
  };

  const createCourse = async (c: Partial<Course>) => {
    try {
      const created = await api.createCourse(c);
      setCourses(prev => [...prev, created]);
      return created;
    } catch {
      const newC: Course = {
        id: 'crs-' + Date.now(),
        code: c.code || 'CRS-NEW',
        title: c.title || 'New Course',
        slug: c.slug || 'new-course',
        degreeLevel: c.degreeLevel || 'Undergraduate',
        stream: c.stream || 'Commerce',
        duration: c.duration || '3 Years',
        departmentId: c.departmentId || 'dept-com',
        departmentName: c.departmentName || 'Department of Commerce',
        intake: Number(c.intake) || 60,
        eligibility: c.eligibility || 'PUC/10+2 passed.',
        feeInfo: c.feeInfo || 'Contact administrative office.',
        description: c.description || '',
        curriculumOverview: c.curriculumOverview || [],
        subjects: c.subjects || [],
        specializations: c.specializations || [],
        careerOpportunities: c.careerOpportunities || [],
        higherStudyOptions: c.higherStudyOptions || [],
        status: c.status || 'Draft',
        faqs: c.faqs || []
      };
      setCourses(prev => [...prev, newC]);
      return newC;
    }
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    try {
      const updated = await api.updateCourse(id, updates);
      setCourses(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch {
      setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
      return { ...courses.find(c => c.id === id)!, ...updates };
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await api.deleteCourse(id);
    } catch {}
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const updateApplicationStatus = async (id: string, status: string, remarks?: string) => {
    try {
      await api.updateApplication(id, { status, adminRemarks: remarks });
    } catch {}
    setApplications(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: status as any,
          adminRemarks: remarks !== undefined ? remarks : a.adminRemarks,
          reviewedAt: new Date().toISOString(),
          reviewedBy: currentAdmin?.name || 'Administrator'
        };
      }
      return a;
    }));
  };

  const createNotice = async (n: Partial<Notice>) => {
    try {
      const created = await api.createNotice(n);
      setNotices(prev => [created, ...prev]);
    } catch {
      const newN: Notice = {
        id: 'not-' + Date.now(),
        title: n.title || 'New Notice',
        category: n.category || 'General',
        date: n.date || new Date().toISOString().split('T')[0],
        description: n.description || '',
        fileName: n.fileName || 'Notice.pdf',
        fileUrl: n.fileUrl || '#download',
        isImportant: Boolean(n.isImportant),
        isPublished: true,
        targetAudience: n.targetAudience || 'All'
      };
      setNotices(prev => [newN, ...prev]);
    }
  };

  const updateNotice = async (id: string, n: Partial<Notice>) => {
    try {
      const updated = await api.updateNotice(id, n);
      setNotices(prev => prev.map(item => item.id === id ? updated : item));
    } catch {
      setNotices(prev => prev.map(item => item.id === id ? { ...item, ...n } : item));
    }
  };

  const deleteNotice = async (id: string) => {
    try {
      await api.deleteNotice(id);
    } catch {}
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const createEvent = async (e: Partial<InstitutionalEvent>) => {
    try {
      const created = await api.createEvent(e);
      setEvents(prev => [created, ...prev]);
    } catch {
      const newEv: InstitutionalEvent = {
        id: 'ev-' + Date.now(),
        title: e.title || 'New Event',
        category: e.category || 'Academic',
        date: e.date || new Date().toISOString().split('T')[0],
        time: e.time || '10:00 AM',
        venue: e.venue || 'College Auditorium',
        departmentName: e.departmentName || 'Administration',
        description: e.description || '',
        registrationOpen: Boolean(e.registrationOpen),
        status: e.status || 'Upcoming'
      };
      setEvents(prev => [newEv, ...prev]);
    }
  };

  const createResult = async (r: Partial<StudentResult>) => {
    try {
      const created = await api.createResult(r);
      setResults(prev => [created, ...prev]);
    } catch {
      const newR: StudentResult = {
        id: 'res-' + Date.now(),
        registerNumber: (r.registerNumber || '').toUpperCase(),
        studentName: r.studentName || 'Student',
        courseTitle: r.courseTitle || 'B.Com',
        semester: r.semester || 'Semester I',
        examSession: r.examSession || 'Examinations 2026',
        declarationDate: r.declarationDate || new Date().toISOString().split('T')[0],
        sgpa: Number(r.sgpa) || 8.0,
        resultStatus: r.resultStatus || 'PASS',
        subjects: r.subjects || []
      };
      setResults(prev => [newR, ...prev]);
    }
  };

  const updateEnquiryStatus = async (id: string, status: string, notes?: string) => {
    try {
      await api.updateEnquiry(id, { status: status as any, adminNotes: notes });
    } catch {}
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: status as any, adminNotes: notes ?? e.adminNotes } : e));
  };

  const approveAlumni = async (id: string, approved: boolean) => {
    try {
      await api.updateAlumni(id, { isApproved: approved });
    } catch {}
    setAlumni(prev => prev.map(a => a.id === id ? { ...a, isApproved: approved } : a));
  };

  return (
    <CollegeContext.Provider
      value={{
        currentPage,
        setCurrentPage: (page) => {
          setCurrentPage(page);
          window.location.hash = page;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedCourseId,
        setSelectedCourseId,
        isAdminView,
        setIsAdminView,
        adminSubPage,
        setAdminSubPage,
        isSearchOpen,
        setIsSearchOpen,
        isStudentPortalOpen,
        setIsStudentPortalOpen,
        isFacultyPortalOpen,
        setIsFacultyPortalOpen,
        settings,
        courses,
        departments,
        faculty,
        notices,
        events,
        applications,
        enquiries,
        results,
        alumni,
        downloads,
        gallery,
        loading,
        refreshData,
        submitApplication,
        trackApplication,
        lookupResult,
        submitEnquiry,
        submitAlumni,
        currentAdmin,
        loginAdmin,
        logoutAdmin,
        updateSettings,
        createCourse,
        updateCourse,
        deleteCourse,
        updateApplicationStatus,
        createNotice,
        updateNotice,
        deleteNotice,
        createEvent,
        createResult,
        updateEnquiryStatus,
        approveAlumni
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollege = () => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error('useCollege must be used within a CollegeProvider');
  }
  return context;
};
