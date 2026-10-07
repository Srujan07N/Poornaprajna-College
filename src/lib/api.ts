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
} from './initialData';

const TOKEN_KEY = 'ppc_admin_auth_token';
const USER_KEY = 'ppc_admin_auth_user';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredAuth(token: string, user: AdminUser): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export function clearStoredAuth(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export function getStoredUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const res = await fetch(`/api${endpoint}`, {
      ...options,
      headers
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(errData.message || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn(`API request to ${endpoint} failed, checking fallback:`, err.message);
    throw err;
  }
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
    try {
      const data = await request<{ token: string; user: AdminUser }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setStoredAuth(data.token, data.user);
      return data;
    } catch {
      // Local fallback for standalone demo
      const user = initialAdminUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user && (password === 'Admin@123' || password === 'ppc@admin2026')) {
        const dummyToken = 'local_token_' + Date.now();
        setStoredAuth(dummyToken, user);
        return { token: dummyToken, user };
      }
      throw new Error('Invalid email or password. Use: admin@ppc.edu.in with Admin@123');
    }
  },

  async logout(): Promise<void> {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    } finally {
      clearStoredAuth();
    }
  },

  // Settings
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await request<{ settings: SiteSettings }>('/settings');
      return res.settings;
    } catch {
      return initialSettings;
    }
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await request<{ settings: SiteSettings }>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
    return res.settings;
  },

  // Courses
  async getCourses(): Promise<Course[]> {
    try {
      const res = await request<{ courses: Course[] }>('/courses');
      return res.courses;
    } catch {
      return initialCourses;
    }
  },

  async createCourse(course: Partial<Course>): Promise<Course> {
    const res = await request<{ course: Course }>('/courses', {
      method: 'POST',
      body: JSON.stringify(course)
    });
    return res.course;
  },

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    const res = await request<{ course: Course }>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return res.course;
  },

  async deleteCourse(id: string): Promise<void> {
    await request(`/courses/${id}`, { method: 'DELETE' });
  },

  // Departments & Faculty
  async getDepartments(): Promise<Department[]> {
    try {
      const res = await request<{ departments: Department[] }>('/departments');
      return res.departments;
    } catch {
      return initialDepartments;
    }
  },

  async getFaculty(): Promise<FacultyMember[]> {
    try {
      const res = await request<{ faculty: FacultyMember[] }>('/faculty');
      return res.faculty;
    } catch {
      return initialFaculty;
    }
  },

  // Admissions
  async submitApplication(appData: any): Promise<{ applicationId: string; application: AdmissionApplication }> {
    return await request<{ applicationId: string; application: AdmissionApplication }>('/admissions', {
      method: 'POST',
      body: JSON.stringify(appData)
    });
  },

  async trackApplication(applicationId: string): Promise<any> {
    const res = await request<{ application: any }>(`/admissions/track/${encodeURIComponent(applicationId)}`);
    return res.application;
  },

  async getApplications(query?: { status?: string; courseId?: string; search?: string }): Promise<AdmissionApplication[]> {
    const params = new URLSearchParams();
    if (query?.status) params.append('status', query.status);
    if (query?.courseId) params.append('courseId', query.courseId);
    if (query?.search) params.append('search', query.search);
    try {
      const res = await request<{ applications: AdmissionApplication[] }>(`/admissions?${params.toString()}`);
      return res.applications;
    } catch {
      return initialApplications;
    }
  },

  async updateApplication(id: string, updates: { status?: string; adminRemarks?: string }): Promise<AdmissionApplication> {
    const res = await request<{ application: AdmissionApplication }>(`/admissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return res.application;
  },

  // Notices
  async getNotices(): Promise<Notice[]> {
    try {
      const res = await request<{ notices: Notice[] }>('/notices');
      return res.notices;
    } catch {
      return initialNotices;
    }
  },

  async createNotice(notice: Partial<Notice>): Promise<Notice> {
    const res = await request<{ notice: Notice }>('/notices', {
      method: 'POST',
      body: JSON.stringify(notice)
    });
    return res.notice;
  },

  async updateNotice(id: string, updates: Partial<Notice>): Promise<Notice> {
    const res = await request<{ notice: Notice }>(`/notices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    return res.notice;
  },

  async deleteNotice(id: string): Promise<void> {
    await request(`/notices/${id}`, { method: 'DELETE' });
  },

  // Events
  async getEvents(): Promise<InstitutionalEvent[]> {
    try {
      const res = await request<{ events: InstitutionalEvent[] }>('/events');
      return res.events;
    } catch {
      return initialEvents;
    }
  },

  async createEvent(event: Partial<InstitutionalEvent>): Promise<InstitutionalEvent> {
    const res = await request<{ event: InstitutionalEvent }>('/events', {
      method: 'POST',
      body: JSON.stringify(event)
    });
    return res.event;
  },

  // Results
  async lookupResult(regNo: string, semester?: string): Promise<StudentResult> {
    const params = new URLSearchParams({ regNo });
    if (semester && semester !== 'all') params.append('semester', semester);
    const res = await request<{ result: StudentResult }>(`/results/lookup?${params.toString()}`);
    return res.result;
  },

  async getResults(): Promise<StudentResult[]> {
    try {
      const res = await request<{ results: StudentResult[] }>('/results');
      return res.results;
    } catch {
      return initialResults;
    }
  },

  async createResult(result: Partial<StudentResult>): Promise<StudentResult> {
    const res = await request<{ result: StudentResult }>('/results', {
      method: 'POST',
      body: JSON.stringify(result)
    });
    return res.result;
  },

  // Enquiries
  async submitEnquiry(enquiry: Partial<ContactEnquiry>): Promise<void> {
    await request('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiry)
    });
  },

  async getEnquiries(): Promise<ContactEnquiry[]> {
    try {
      const res = await request<{ enquiries: ContactEnquiry[] }>('/enquiries');
      return res.enquiries;
    } catch {
      return initialEnquiries;
    }
  },

  async updateEnquiry(id: string, updates: Partial<ContactEnquiry>): Promise<void> {
    await request(`/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  // Alumni
  async submitAlumni(alumni: Partial<AlumniRecord>): Promise<void> {
    await request('/alumni', {
      method: 'POST',
      body: JSON.stringify(alumni)
    });
  },

  async getAlumni(): Promise<AlumniRecord[]> {
    try {
      const res = await request<{ alumni: AlumniRecord[] }>('/alumni');
      return res.alumni;
    } catch {
      return initialAlumni;
    }
  },

  async updateAlumni(id: string, updates: Partial<AlumniRecord>): Promise<void> {
    await request(`/alumni/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  // Downloads & Gallery
  async getDownloads(): Promise<DownloadItem[]> {
    try {
      const res = await request<{ downloads: DownloadItem[] }>('/downloads');
      return res.downloads;
    } catch {
      return initialDownloads;
    }
  },

  async getGallery(): Promise<GalleryItem[]> {
    try {
      const res = await request<{ gallery: GalleryItem[] }>('/gallery');
      return res.gallery;
    } catch {
      return initialGallery;
    }
  },

  // Admin stats
  async getStats(): Promise<any> {
    const res = await request<{ stats: any }>('/admin/stats');
    return res.stats;
  }
};
