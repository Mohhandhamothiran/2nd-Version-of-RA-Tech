import React, { useState } from 'react';
import { Phone, MessageSquare, Shield, Menu, X, ArrowUpRight, UserCheck } from 'lucide-react';
import type { UserSession } from '../types/index.ts';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (service?: string) => void;
  currentUser: UserSession | null;
  onOpenCrm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openQuoteModal,
  currentUser,
  onOpenCrm
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'amc', label: 'AMC Plans' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Regional Quick Announcement Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/50 py-1.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-medium">Tamil Nadu Enterprise IT Hub:</span>
            <span>On-site hardware, server stacks & AMC support across Chennai, Thirumudivakkam, Sriperumbuthur, Coimbatore & Hosur</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:7904463033"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono font-medium">7904463033</span>
            </a>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <a
              href="https://wa.me/917904463033?text=Hello%20RA%20Tech%20Solutions,%20I%20need%20IT%20services%20in%20Chennai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-bold text-lg">
            RA
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
              RA Tech Solutions
            </span>
            <span className="text-[10px] tracking-wider uppercase text-cyan-400/90 font-medium font-mono">
              Smart Technology · Secure Solutions
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                currentTab === link.id
                  ? 'text-cyan-400 font-semibold'
                  : 'hover:text-white text-slate-300'
              }`}
            >
              {link.label}
              {currentTab === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
              )}
            </button>
          ))}

          {/* CRM Internal Access Link */}
          <button
            onClick={onOpenCrm}
            className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 text-xs px-3 py-1.5 rounded-md border transition-all ${
              currentTab === 'crm'
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 font-semibold'
                : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Staff Call Desk</span>
            {currentUser && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 ml-0.5" title={`Logged in as ${currentUser.name}`} />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => openQuoteModal()}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-md shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Request Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                currentTab === link.id
                  ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenCrm();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-900 border border-slate-800"
          >
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Staff Call Desk & CRM</span>
            </span>
            {currentUser ? (
              <span className="text-xs text-emerald-400">{currentUser.name.split(' ')[0]}</span>
            ) : (
              <span className="text-xs text-slate-500">Sign in</span>
            )}
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                openQuoteModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md"
            >
              Request Instant Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
