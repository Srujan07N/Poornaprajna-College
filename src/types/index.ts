export type UserRole = 'super_admin' | 'admin' | 'editor' | 'dept_admin' | 'faculty' | 'student';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  avatar?: string;
  createdAt: string;
}

export type DegreeLevel = 'Undergraduate' | 'Postgraduate' | 'Certificate';
export type AcademicStream = 'Arts' | 'Science' | 'Commerce' | 'Management' | 'Computer Applications';
export type CourseStatus = 'Draft' | 'Published' | 'Admission Open' | 'Admission Closed';

export interface Course {
  id: string;
  code: string;
  title: string;
  slug: string;
  degreeLevel: DegreeLevel;
  stream: AcademicStream;
  duration: string;
  departmentId: string;
  departmentName: string;
  intake: number;
  eligibility: string;
  feeInfo: string;
  description: string;
  curriculumOverview: string[];
  subjects: string[];
  specializations: string[];
  careerOpportunities: string[];
  higherStudyOptions: string[];
  brochureUrl?: string;
  status: CourseStatus;
  faqs: { question: string; answer: string }[];
}

export interface Department {
  id: string;
  code: string;
  name: string;
  stream: AcademicStream;
  hodName: string;
  hodQualification: string;
  hodMessage: string;
  overview: string;
  programmesOffered: string[];
  facilities: string[];
  researchAreas: string[];
  contactEmail: string;
  contactExtension: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  email: string;
}

export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Shortlisted' | 'Approved' | 'Rejected' | 'Waitlisted';

export interface AdmissionApplication {
  id: string;
  applicationId: string; // e.g. PPC-2026-1042
  submittedAt: string;
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  mobileNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  pucBoard: string;
  passingYear: string;
  percentageMarks: number;
  preferredCourseId: string;
  preferredCourseTitle: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  previousInstitution: string;
  parentName: string;
  parentMobile: string;
  parentOccupation?: string;
  documentsUploaded: {
    photograph: boolean;
    idProof: boolean;
    marksCard: boolean;
    transferCertificate: boolean;
  };
  status: ApplicationStatus;
  adminRemarks?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export type NoticeCategory = 'Admission' | 'Examination' | 'Results' | 'Circular' | 'Holidays' | 'Scholarships' | 'General';

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  date: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  isImportant: boolean;
  isPublished: boolean;
  targetAudience: 'All' | 'Students' | 'Faculty' | 'Applicants';
}

export interface InstitutionalEvent {
  id: string;
  title: string;
  category: 'Academic' | 'Cultural' | 'Sports' | 'Conference' | 'Workshop' | 'NSS/NCC';
  date: string;
  time: string;
  venue: string;
  departmentName: string;
  description: string;
  posterUrl?: string;
  registrationOpen: boolean;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface StudentResult {
  id: string;
  registerNumber: string; // e.g., 22PPC0142
  studentName: string;
  courseTitle: string;
  semester: string; // e.g., "Semester IV"
  examSession: string; // e.g., "Odd Semester Examinations Oct-Nov 2025"
  declarationDate: string;
  sgpa: number;
  resultStatus: 'PASS' | 'DISTINCTION' | 'FIRST CLASS' | 'PROMOTED' | 'WITHHELD';
  subjects: {
    code: string;
    name: string;
    credits: number;
    internalMarks: number;
    externalMarks: number;
    totalMarks: number;
    grade: string;
    result: 'P' | 'F';
  }[];
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  programme?: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Replied' | 'Closed';
  adminNotes?: string;
}

export interface AlumniRecord {
  id: string;
  fullName: string;
  batchYear: string;
  courseStudied: string;
  currentDesignation: string;
  currentCompanyOrInstitute: string;
  location: string;
  email: string;
  phone: string;
  testimonial?: string;
  isApproved: boolean;
  submittedAt: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Prospectus' | 'Admission Forms' | 'Syllabus' | 'Circulars' | 'Examination' | 'Academic Calendar' | 'Regulations';
  fileSize: string;
  uploadDate: string;
  downloadUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Academics' | 'Events' | 'Sports' | 'Cultural' | 'Achievements';
  caption: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export interface SiteSettings {
  institutionName: string;
  tagline: string;
  establishedYear: number;
  autonomousStatusText: string;
  affiliationText: string;
  naacText: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
  };
  phones: string[];
  emails: string[];
  whatsappNumber: string;
  officeHours: string;
  googleMapsEmbedUrl: string;
  admissionStatus: 'Admissions Open 2026–27' | 'Admissions Closing Soon' | 'Admissions Closed';
  academicYear: string;
  announcementText: string;
  announcementActive: boolean;
  announcementLink: string;
  principalMessage: {
    name: string;
    designation: string;
    qualifications: string;
    text: string[];
  };
  aboutSummary: string[];
}
