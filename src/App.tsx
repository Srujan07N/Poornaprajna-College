import React from 'react';
import { CollegeProvider, useCollege } from './context/CollegeContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { TopUtilityBar } from './components/layout/TopUtilityBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickContactFab } from './components/layout/QuickContactFab';

// Public Subpages
import { HomeView } from './components/home/HomeView';
import { AboutView } from './components/pages/AboutView';
import { AcademicsView } from './components/pages/AcademicsView';
import { AdmissionsView } from './components/pages/AdmissionsView';
import { ExaminationView } from './components/pages/ExaminationView';
import { DepartmentsView } from './components/pages/DepartmentsView';
import { CampusView } from './components/pages/CampusView';
import { StudentLifeView } from './components/pages/StudentLifeView';
import { PlacementsView } from './components/pages/PlacementsView';
import { ResearchView } from './components/pages/ResearchView';
import { NoticesView } from './components/pages/NoticesView';
import { DownloadsView } from './components/pages/DownloadsView';
import { AlumniView } from './components/pages/AlumniView';
import { ContactView } from './components/pages/ContactView';

// Modals
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { CourseDetailModal } from './components/modals/CourseDetailModal';
import { StudentPortalModal } from './components/modals/StudentPortalModal';
import { FacultyPortalModal } from './components/modals/FacultyPortalModal';

// Admin Modules
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';

const MainAppContent: React.FC = () => {
  const { isAdminView, currentAdmin, currentPage } = useCollege();

  // If Admin View is active
  if (isAdminView) {
    if (!currentAdmin) {
      return <AdminLogin />;
    }
    return <AdminLayout />;
  }

  // Public Institutional Portal
  const renderPublicPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'academics':
        return <AcademicsView />;
      case 'admissions':
        return <AdmissionsView />;
      case 'examination':
        return <ExaminationView />;
      case 'departments':
        return <DepartmentsView />;
      case 'campus':
        return <CampusView />;
      case 'student-life':
        return <StudentLifeView />;
      case 'placements':
        return <PlacementsView />;
      case 'research':
        return <ResearchView />;
      case 'notices':
        return <NoticesView />;
      case 'events':
        return <NoticesView />;
      case 'downloads':
        return <DownloadsView />;
      case 'alumni':
        return <AlumniView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#1C1917] flex flex-col font-sans selection:bg-[#7E192E]/15 selection:text-[#7E192E]">
      {/* 1. Dynamic Top Announcement Bar */}
      <AnnouncementBar />

      {/* Top Utility Ribbon (Admissions, Exam, Student/Faculty Login, Admin) */}
      <TopUtilityBar />

      {/* 2. Main Institutional Navbar */}
      <Navbar />

      {/* Public Page View */}
      <main className="flex-1">
        {renderPublicPage()}
      </main>

      {/* 19. Institutional Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <QuickContactFab />

      {/* Global Interactive Modals */}
      <GlobalSearchModal />
      <CourseDetailModal />
      <StudentPortalModal />
      <FacultyPortalModal />
    </div>
  );
};

export default function App() {
  return (
    <CollegeProvider>
      <MainAppContent />
    </CollegeProvider>
  );
}
