import React from 'react';
import { HeroSection } from './HeroSection';
import { HighlightsSection } from './HighlightsSection';
import { AboutSection } from './AboutSection';
import { ProgrammesSection } from './ProgrammesSection';
import { WhyPPCSection } from './WhyPPCSection';
import { DepartmentsSection } from './DepartmentsSection';
import { CampusExperienceSection } from './CampusExperienceSection';
import { PrincipalMessageSection } from './PrincipalMessageSection';
import { NoticesSection } from './NoticesSection';
import { EventsSection } from './EventsSection';
import { AchievementsSection } from './AchievementsSection';
import { ResearchSection } from './ResearchSection';
import { AlumniSection } from './AlumniSection';
import { GallerySection } from './GallerySection';
import { AdmissionCTASection } from './AdmissionCTASection';
import { ContactSection } from './ContactSection';

export const HomeView: React.FC = () => {
  return (
    <div>
      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Institutional Highlights Strip */}
      <HighlightsSection />

      {/* 5. About College */}
      <AboutSection />

      {/* 6. Academic Programmes */}
      <ProgrammesSection />

      {/* 7. Why Poornaprajna */}
      <WhyPPCSection />

      {/* 8. Departments */}
      <DepartmentsSection />

      {/* 9. Campus Experience */}
      <CampusExperienceSection />

      {/* 10. Principal's Message & Leadership */}
      <PrincipalMessageSection />

      {/* 11. Latest Notices & Circulars */}
      <NoticesSection />

      {/* 12. Upcoming Events */}
      <EventsSection />

      {/* 13. Student Achievements & Wings */}
      <AchievementsSection />

      {/* 14. Research & Innovation */}
      <ResearchSection />

      {/* 15. Alumni Network & Testimonials */}
      <AlumniSection />

      {/* 16. Gallery */}
      <GallerySection />

      {/* 17. Admission CTA */}
      <AdmissionCTASection />

      {/* 18. Contact & Map Location */}
      <ContactSection />
    </div>
  );
};
