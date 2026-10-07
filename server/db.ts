import fs from 'fs';
import path from 'path';
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
} from '../src/lib/initialData';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

export interface DatabaseSchema {
  settings: typeof initialSettings;
  courses: typeof initialCourses;
  departments: typeof initialDepartments;
  faculty: typeof initialFaculty;
  notices: typeof initialNotices;
  events: typeof initialEvents;
  applications: typeof initialApplications;
  results: typeof initialResults;
  enquiries: typeof initialEnquiries;
  alumni: typeof initialAlumni;
  downloads: typeof initialDownloads;
  gallery: typeof initialGallery;
  users: typeof initialAdminUsers;
}

let dbInstance: DatabaseSchema | null = null;

function getInitialData(): DatabaseSchema {
  return {
    settings: JSON.parse(JSON.stringify(initialSettings)),
    courses: JSON.parse(JSON.stringify(initialCourses)),
    departments: JSON.parse(JSON.stringify(initialDepartments)),
    faculty: JSON.parse(JSON.stringify(initialFaculty)),
    notices: JSON.parse(JSON.stringify(initialNotices)),
    events: JSON.parse(JSON.stringify(initialEvents)),
    applications: JSON.parse(JSON.stringify(initialApplications)),
    results: JSON.parse(JSON.stringify(initialResults)),
    enquiries: JSON.parse(JSON.stringify(initialEnquiries)),
    alumni: JSON.parse(JSON.stringify(initialAlumni)),
    downloads: JSON.parse(JSON.stringify(initialDownloads)),
    gallery: JSON.parse(JSON.stringify(initialGallery)),
    users: JSON.parse(JSON.stringify(initialAdminUsers))
  };
}

export function initDb(): DatabaseSchema {
  if (dbInstance) return dbInstance;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      dbInstance = JSON.parse(content);
      return dbInstance!;
    }
  } catch (err) {
    console.error('Failed to read db file, initializing default in-memory copy:', err);
  }

  dbInstance = getInitialData();
  saveDb();
  return dbInstance;
}

export function saveDb(): void {
  if (!dbInstance) return;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(dbInstance, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist database to file:', err);
  }
}

export function getDb(): DatabaseSchema {
  if (!dbInstance) {
    return initDb();
  }
  return dbInstance;
}
