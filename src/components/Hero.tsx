import React from 'react';
import { Phone, MessageSquare, ArrowRight, ShieldCheck, MapPin, Clock, CheckCircle2, Navigation, Building2, Server } from 'lucide-react';

interface HeroProps {
  openQuoteModal: (service?: string) => void;
  navigateToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ openQuoteModal, navigateToServices }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      {/* Background Subtle Tech Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#00f0ff 1px, transparent 1px), radial-gradient(#00f0ff 1px, #030712 1px)`,
          backgroundSize: `40px 40px`,
          backgroundPosition: `0 0, 20px 20px`
        }}
      />

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & Inbound CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Kicker - Zero Pill Discipline */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-semibold tracking-wider uppercase">Tamil Nadu Enterprise IT Hub</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Chennai, Coimbatore, Hosur & Industrial Corridors</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Enterprise IT Infrastructure, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Hardware AMC</span> & Security Across Tamil Nadu
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Based at Chennai, RA Tech Solutions delivers rapid on-site computer hardware support, enterprise server deployment, structured networking, CCTV surveillance, and proactive AMC maintenance across Thirumudivakkam, Sriperumbuthur, Porur, and all Tamil Nadu industrial districts.
            </p>

            {/* Action Buttons Trio */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal()}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-md shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Request Instant Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:7904463033"
                className="px-5 py-3.5 text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-all flex items-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="font-mono">Call 7904463033</span>
              </a>

              <a
                href="https://wa.me/917904463033?text=Hi%20RA%20Tech%20Solutions,%20I%20would%20like%20to%20inquire%20about%20IT%20services%20in%20Tamil%20Nadu"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 rounded-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Claim-to-Proof Adjacency: Unboxed Metadata */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Pan-Tamil Nadu SLA</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1,200+ Corporate Workstations</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dell, Cisco & Fortinet Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tamil Nadu Regional Network & Dispatch Hubs Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-md p-6 space-y-5">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Regional IT Support Network</span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Fast Response from Mangadu
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
                  Engineers on Standby
                </span>
              </div>

              {/* Base Location Details */}
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Central Engineering Facility & Lab:</span>
                  <span className="text-slate-300">No.79, Sivasakthi Complex, Kundrathur Main Road, Mangadu</span>
                  <span className="text-slate-400 block text-[11px] font-mono">Chennai 600122, Tamil Nadu</span>
                </div>
              </div>

              {/* Regional Support Hubs Across Tamil Nadu */}
              <div className="space-y-2.5 text-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Regional Coverage & On-Site Hubs:
                </span>

                <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Thirumudivakkam & Sriperumbuthur</div>
                    <div className="text-[11px] text-slate-400">Direct manufacturing & industrial dispatch</div>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold text-xs">15 - 35 Mins</span>
                </div>

                <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Chennai Metro, Porur & OMR</div>
                    <div className="text-[11px] text-slate-400">DLF Cybercity, Guindy & Tidel Park</div>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold text-xs">20 - 45 Mins</span>
                </div>

                <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Coimbatore, Tirupur & Salem</div>
                    <div className="text-[11px] text-slate-400">Western IT, textile & engineering belt</div>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold text-xs">Same-Day SLA</span>
                </div>

                <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Hosur & Krishnagiri Corridor</div>
                    <div className="text-[11px] text-slate-400">Electronics manufacturing & automotive parks</div>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold text-xs">Scheduled AMC</span>
                </div>
              </div>

              {/* Quick Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full py-2.5 text-center text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <span>Book Immediate Technician Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
