import React, { useState, useEffect } from 'react';
import { useCollege, PublicPage } from '../../context/CollegeContext';
import { Search, Menu, X, ArrowRight, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, setIsSearchOpen } = useCollege();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PublicPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'departments', label: 'Departments' },
    { id: 'campus', label: 'Campus' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'placements', label: 'Placements' },
    { id: 'notices', label: 'Notices' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 font-sans ${
        isScrolled
          ? 'bg-[#FCFBF7]/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-2.5'
          : 'bg-[#FCFBF7] border-b border-stone-200 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Single Brand Wordmark in Serif Face */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-[#6B1426] text-white flex items-center justify-center font-serif font-bold text-lg border border-[#C59B27]/40 shadow-xs group-hover:bg-[#520F1D] transition-colors">
              PPC
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-stone-900 block leading-tight group-hover:text-[#6B1426] transition-colors">
                Poornaprajna College
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#7E192E] font-semibold block">
                Autonomous · Udupi (Est. 1960)
              </span>
            </div>
          </button>

          {/* Zone 2: Clean Typography Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold tracking-wide text-stone-700">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#6B1426] ${
                    isActive ? 'text-[#6B1426] font-bold' : 'text-stone-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B1426] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search institutional catalog"
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage('contact')}
              className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-100 transition-colors whitespace-nowrap"
            >
              Enquire Now
            </button>

            <button
              onClick={() => setCurrentPage('admissions')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#6B1426] hover:bg-[#520F1D] text-white shadow-xs transition-colors whitespace-nowrap"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FCFBF7] border-b border-stone-200 px-4 pt-3 pb-6 shadow-md">
          <div className="flex flex-col space-y-1 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentPage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#6B1426]/10 text-[#6B1426]'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setCurrentPage('examination');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-center rounded border border-stone-200 text-stone-700 font-medium"
            >
              Results Lookup
            </button>
            <button
              onClick={() => {
                setCurrentPage('downloads');
                setMobileMenuOpen(false);
              }}
              className="p-2 text-center rounded border border-stone-200 text-stone-700 font-medium"
            >
              Downloads Centre
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
