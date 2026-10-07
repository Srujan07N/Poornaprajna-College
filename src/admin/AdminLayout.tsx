import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Bell,
  Award,
  Mail,
  HeartHandshake,
  FileEdit,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { AdminDashboardView } from './pages/AdminDashboardView';
import { AdminAdmissionsView } from './pages/AdminAdmissionsView';
import { AdminCoursesView } from './pages/AdminCoursesView';
import { AdminNoticesView } from './pages/AdminNoticesView';
import { AdminResultsView } from './pages/AdminResultsView';
import { AdminEnquiriesView } from './pages/AdminEnquiriesView';
import { AdminAlumniView } from './pages/AdminAlumniView';
import { AdminCMSView } from './pages/AdminCMSView';
import { AdminSettingsView } from './pages/AdminSettingsView';

export const AdminLayout: React.FC = () => {
  const { currentAdmin, logoutAdmin, adminSubPage, setAdminSubPage, setIsAdminView, setCurrentPage } = useCollege();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'admissions', label: 'Admissions & Applicants', icon: Users },
    { id: 'courses', label: 'Course Catalog & Intake', icon: GraduationCap },
    { id: 'notices', label: 'Circulars & Notice Board', icon: Bell },
    { id: 'results', label: 'Autonomous Exam Results', icon: Award },
    { id: 'enquiries', label: 'Visitor Enquiries', icon: Mail },
    { id: 'alumni', label: 'Alumni Network', icon: HeartHandshake },
    { id: 'cms', label: 'Website CMS Editor', icon: FileEdit },
    { id: 'settings', label: 'Institutional Settings', icon: Settings }
  ];

  const renderActiveView = () => {
    switch (adminSubPage) {
      case 'dashboard':
        return <AdminDashboardView />;
      case 'admissions':
        return <AdminAdmissionsView />;
      case 'courses':
        return <AdminCoursesView />;
      case 'notices':
        return <AdminNoticesView />;
      case 'results':
        return <AdminResultsView />;
      case 'enquiries':
        return <AdminEnquiriesView />;
      case 'alumni':
        return <AdminAlumniView />;
      case 'cms':
        return <AdminCMSView />;
      case 'settings':
        return <AdminSettingsView />;
      default:
        return <AdminDashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex font-sans antialiased text-stone-800">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Desktop & Mobile */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1C1917] text-stone-200 flex flex-col justify-between transition-transform duration-200 ease-in-out border-r border-stone-800 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Institution Header Brand */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#6B1426] text-white flex items-center justify-center font-serif font-bold text-base border border-[#C59B27]/40 shadow-xs">
                PPC
              </div>
              <div>
                <span className="font-serif font-bold text-sm tracking-tight text-white block">POORNAPRAJNA</span>
                <span className="text-[10px] text-stone-400 block tracking-widest uppercase">Admin Portal · Udupi</span>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1 rounded text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4 px-3 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 px-3 block mb-2">
              Management Modules
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminSubPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminSubPage(item.id);
                    setMobileSidebarOpen(false);
                    window.location.hash = `admin/${item.id}`;
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#6B1426] text-white shadow-xs font-semibold'
                      : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#DEB038]' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-stone-300" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Current User & Logout */}
        <div className="p-4 border-t border-stone-800 space-y-3">
          <div className="flex items-center justify-between bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
            <div className="overflow-hidden">
              <span className="font-semibold text-xs text-white block truncate">
                {currentAdmin?.name || 'Administrator'}
              </span>
              <span className="text-[10px] text-stone-400 block truncate font-mono">
                {currentAdmin?.email || 'admin@ppc.edu.in'}
              </span>
            </div>
            <span className="shrink-0 text-[9px] uppercase tracking-wider font-bold bg-[#6B1426] text-[#DEB038] px-1.5 py-0.5 rounded">
              {currentAdmin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsAdminView(false);
                setCurrentPage('home');
              }}
              className="flex-1 py-1.5 px-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3 h-3" /> Public Site
            </button>
            <button
              onClick={logoutAdmin}
              className="py-1.5 px-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs rounded font-medium transition-colors flex items-center gap-1"
              title="Sign Out"
            >
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Administrative Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-stone-200/80 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">Poornaprajna College (Autonomous)</span>
              <h2 className="text-sm font-semibold text-stone-900 capitalize">
                {navItems.find(n => n.id === adminSubPage)?.label || 'Administrative Dashboard'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAdminView(false);
                setCurrentPage('home');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#7E192E]" />
              View Public Website
            </button>
            <div className="w-8 h-8 rounded-full bg-[#6B1426] text-white flex items-center justify-center font-semibold text-xs border border-stone-200">
              {currentAdmin?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        {/* Subpage View Body */}
        <main className="p-6 lg:p-8 flex-1 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};
