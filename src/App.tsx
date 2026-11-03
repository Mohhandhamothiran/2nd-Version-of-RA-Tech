import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { AMCPlansSection } from './components/AMCPlansSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { QuoteModal } from './components/QuoteModal.tsx';
import { CrmAuthModal } from './components/crm/CrmAuthModal.tsx';
import { CrmPortal } from './components/crm/CrmPortal.tsx';
import type { UserSession } from './types/index.ts';
import { Phone, MessageSquare, ArrowUpRight, Shield } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteService, setQuoteService] = useState<string | undefined>();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // User session state for CRM
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('ratech_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleOpenQuote = (service?: string) => {
    setQuoteService(service);
    setIsQuoteModalOpen(true);
  };

  const handleOpenCrm = () => {
    if (currentUser) {
      setCurrentTab('crm');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('ratech_user_session', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to store session in localStorage:', e);
    }
    setCurrentTab('crm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('ratech_user_session');
    } catch {}
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If CRM Tab is active, render full-screen CRM Portal
  if (currentTab === 'crm' && currentUser) {
    return (
      <CrmPortal
        currentUser={currentUser}
        onLogout={handleLogout}
        onBackToWebsite={() => {
          setCurrentTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Top Bar adhering to 3-zone contract */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openQuoteModal={handleOpenQuote}
        currentUser={currentUser}
        onOpenCrm={handleOpenCrm}
      />

      {/* Main Public Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <Hero
              openQuoteModal={handleOpenQuote}
              navigateToServices={() => {
                setCurrentTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <ServicesSection openQuoteModal={handleOpenQuote} />
            <AMCPlansSection openQuoteModal={handleOpenQuote} />
            <AboutSection />
            <TestimonialsSection />
            <ContactSection />
          </>
        )}

        {currentTab === 'services' && (
          <div className="pt-6">
            <ServicesSection openQuoteModal={handleOpenQuote} />
            <ContactSection />
          </div>
        )}

        {currentTab === 'amc' && (
          <div className="pt-6">
            <AMCPlansSection openQuoteModal={handleOpenQuote} />
            <TestimonialsSection />
            <ContactSection />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="pt-6">
            <AboutSection />
            <TestimonialsSection />
            <ContactSection />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Floating Quick Action Widget for Inbound Calls & WhatsApp (Compliant with 15% sticky cap) */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2.5">
        <a
          href="https://wa.me/917904463033?text=Hi%20RA%20Tech%20Solutions,%20I%20need%20quick%20IT%20support%20in%20Chennai"
          target="_blank"
          rel="noreferrer"
          className="w-11 h-11 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/60 transition-transform hover:scale-105"
          title="Chat with Technical Desk on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
        </a>
        <a
          href="tel:7904463033"
          className="px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white text-xs font-semibold rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
          title="Call Chennai Hotline"
        >
          <Phone className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono">7904463033</span>
        </a>
      </div>

      {/* Public Footer */}
      <Footer
        onNavClick={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCrm={handleOpenCrm}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedService={quoteService}
      />

      <CrmAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
