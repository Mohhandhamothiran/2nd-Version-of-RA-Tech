import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenCrm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenCrm }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Top Footer with Navigation & Contacts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-base">
                RA
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                RA Tech Solutions
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Smart Technology. Secure Solutions. Tamil Nadu's dedicated enterprise IT infrastructure, hardware maintenance, network engineering, and AMC partner.
            </p>
            <div className="space-y-1.5 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono">7904463033</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>support@ratechsolutions.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>No.79, Sivasakthi Complex, Kundrathur Main Road, Mangadu, Chennai 600122</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About RA Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('services')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('amc')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AMC Contracts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Contact Engineering Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Key Services */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Core Capabilities
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>IT Hardware & Rack Servers</li>
              <li>Disaster Backup & Storage</li>
              <li>LaserJet Printer Repair</li>
              <li>Cybersecurity & Firewalls</li>
              <li>MacBook & Laptop Chip Repair</li>
              <li>Networking & 4K CCTV</li>
            </ul>
          </div>

          {/* Internal Desk */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Internal Portal
            </div>
            <p className="text-slate-400 leading-relaxed">
              Authorized technical coordinators and field engineers access the real-time ticket desk:
            </p>
            <button
              onClick={onOpenCrm}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 rounded text-xs font-medium transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Staff Desk</span>
            </button>
          </div>
        </div>

        {/* Tamil Nadu SEO Keyword Cluster */}
        <div className="mt-12 pt-8 border-t border-slate-800/80">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Target Service Hubs & Regional Search Keywords:
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-slate-400">
            <span>IT Infrastructure Solutions Tamil Nadu</span>
            <span aria-hidden="true">·</span>
            <span>Computer Sales and Service Chennai</span>
            <span aria-hidden="true">·</span>
            <span>CCTV Installation Chennai</span>
            <span aria-hidden="true">·</span>
            <span>Laptop Repair Chennai</span>
            <span aria-hidden="true">·</span>
            <span>Computer AMC Services Tamil Nadu</span>
            <span aria-hidden="true">·</span>
            <span>Networking Solutions Coimbatore</span>
            <span aria-hidden="true">·</span>
            <span>Server Solutions Sriperumbudur</span>
            <span aria-hidden="true">·</span>
            <span>Hardware Maintenance Hosur</span>
            <span aria-hidden="true">·</span>
            <span>Printer Repair Chennai</span>
          </div>
        </div>

        {/* Copyright & Compliance */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} RA Tech Solutions (Chennai, Tamil Nadu). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>GST & MSME Registered</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
