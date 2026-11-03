import React, { useState } from 'react';
import { 
  Server, Database, Printer, Shield, Laptop, FileCheck2, 
  Monitor, Camera, ArrowRight, Check, MapPin, Clock, X, MessageSquare, 
  ChevronRight, ShieldCheck, Zap 
} from 'lucide-react';
import { SERVICES_DATA, ServiceDetail } from '../data/servicesData.ts';
import type { ServiceCategory } from '../types/index.ts';

interface ServicesSectionProps {
  openQuoteModal: (service?: string) => void;
}

const EXACT_SERVICE_TABS = [
  { id: 'all', label: 'All 8 Services' },
  { id: 'it-hardware', label: 'IT Hardware' },
  { id: 'backup-storage', label: 'Backup & Storage' },
  { id: 'printer-services', label: 'Printers' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'laptop-repair', label: 'Laptop Repair' },
  { id: 'amc-contracts', label: 'AMC Contracts' },
  { id: 'rentals', label: 'Rentals' },
  { id: 'networking-cctv', label: 'Networking & CCTV' }
];

interface AMCPlanOption {
  id: string;
  name: string;
  tag: string;
  price: string;
  sla: string;
  popular?: boolean;
  features: string[];
}

const AMC_PLAN_OPTIONS: AMCPlanOption[] = [
  {
    id: 'silver',
    name: 'Silver AMC Plan',
    tag: 'Startups & Growing Clinics (5 - 20 Systems)',
    price: '₹1,200',
    sla: '4-Hour Response SLA',
    popular: false,
    features: [
      'Monthly physical dust cleaning & blower maintenance',
      'OS performance optimization & cache cleaning',
      'Antivirus definition updates & malware scans',
      'Unlimited breakdown support calls (9 AM – 7 PM)'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Corporate AMC',
    tag: 'Mid-Market IT & Logistics (20 - 75 Workstations)',
    price: '₹1,850',
    sla: '2-Hour Rapid On-Site SLA',
    popular: true,
    features: [
      'Everything in Silver AMC included',
      'Dedicated senior relationship engineer assigned',
      'Bi-weekly preventive maintenance visits',
      'Standby desktop/laptop provided during long repairs'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Mission-Critical',
    tag: '24/7 BPOs, Hospitals & Plants (75+ Nodes)',
    price: '₹2,600',
    sla: '1-Hour Guaranteed Emergency SLA',
    popular: false,
    features: [
      'Everything in Gold Corporate included',
      '24/7 emergency telephone & on-site dispatch',
      'Server room UPS & thermal environment audits',
      'Zero-labor charges on all hardware upgrades'
    ]
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ openQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);
  const [isAmcChooserOpen, setIsAmcChooserOpen] = useState(false);

  const getServiceIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'IT Hardware & Infrastructure':
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 'Backup & Storage Solutions':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Printer Sales, Repair & Maintenance':
        return <Printer className="w-5 h-5 text-cyan-400" />;
      case 'Cybersecurity & Endpoint Protection':
        return <Shield className="w-5 h-5 text-cyan-400" />;
      case 'Laptop Repair & Upgrades':
        return <Laptop className="w-5 h-5 text-cyan-400" />;
      case 'Annual Maintenance Contracts':
        return <FileCheck2 className="w-5 h-5 text-cyan-400" />;
      case 'Desktop & Laptop Rentals':
        return <Monitor className="w-5 h-5 text-cyan-400" />;
      case 'Networking & CCTV Solutions':
        return <Camera className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getActionButtonLabel = (id: string) => {
    switch (id) {
      case 'it-hardware':
        return 'Quote Hardware';
      case 'backup-storage':
        return 'Quote Storage';
      case 'printer-services':
        return 'Book Printer';
      case 'cybersecurity':
        return 'Quote Security';
      case 'laptop-repair':
        return 'Book Repair';
      case 'amc-contracts':
        return 'Select AMC Plan';
      case 'rentals':
        return 'Rent Systems';
      case 'networking-cctv':
        return 'Quote CCTV';
      default:
        return 'Get Quote';
    }
  };

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.id === selectedCategory;
  });

  return (
    <section id="services-section" className="py-20 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span className="uppercase tracking-wider">Comprehensive Technology Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Across Tamil Nadu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Specialized Enterprise IT Services Across Tamil Nadu
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            Click any exact service below to filter directly to its technical specifications, guaranteed SLA, and transparent pricing.
          </p>

          {/* Interactive Exact Service Selector Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-lg">
            {EXACT_SERVICE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              className={`rounded-xl border border-slate-800/90 bg-slate-900/60 hover:bg-slate-900/90 transition-all p-6 flex flex-col justify-between group hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20`}
            >
              <div>
                {/* Header with Icon and Editorial Numbering */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                    {getServiceIcon(service.category)}
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {String(SERVICES_DATA.findIndex((s) => s.id === service.id) + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  {service.shortTitle}
                </h3>

                <p className="mt-1 text-xs font-medium text-cyan-400/90">
                  {service.tagline}
                </p>

                <p className="mt-3 text-sm text-slate-400 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Capabilities */}
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {service.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Meta Footer & Explicit CTA Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {service.turnaroundTime}
                  </span>
                  <span className="text-slate-300 font-semibold">
                    {service.pricingIndicator}
                  </span>
                </div>

                {/* Direct Action Buttons pointing strictly to this exact service */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="py-2 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors text-center cursor-pointer truncate"
                    title={`View ${service.shortTitle} Full Scope`}
                  >
                    View Scope & SLA
                  </button>

                  {service.id === 'amc-contracts' ? (
                    <button
                      onClick={() => setIsAmcChooserOpen(true)}
                      className="py-2 px-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer truncate shadow-sm shadow-cyan-500/20"
                      title="Select Silver, Gold, or Platinum AMC Plan"
                    >
                      <span>Select AMC Plan</span>
                      <ArrowRight className="w-3 h-3 shrink-0" />
                    </button>
                  ) : (
                    <button
                      onClick={() => openQuoteModal(service.category)}
                      className="py-2 px-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors flex items-center justify-center gap-1 cursor-pointer truncate shadow-sm shadow-cyan-500/20"
                      title={`Request Quote for ${service.shortTitle}`}
                    >
                      <span>{getActionButtonLabel(service.id)}</span>
                      <ArrowRight className="w-3 h-3 shrink-0" />
                    </button>
                  )}
                </div>

                {/* Quick WhatsApp Inquiry for this exact service */}
                <a
                  href={`https://wa.me/917904463033?text=Hi%20RA%20Tech%20Solutions,%20I%20would%20like%20to%20inquire%20specifically%20about%20${encodeURIComponent(service.category)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 px-3 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-800/40 rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive AMC Plan Options Chooser Modal (Triggered by Select AMC button) */}
      {isAmcChooserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-4xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Annual Maintenance Contracts</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Select Your AMC Plan Tier
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Choose the contract tier that matches your IT hardware scale and business SLA requirements across Tamil Nadu:
                </p>
              </div>
              <button
                onClick={() => setIsAmcChooserOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3 Plan Cards: Silver, Gold, Platinum */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {AMC_PLAN_OPTIONS.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between transition-all relative ${
                    plan.popular
                      ? 'bg-slate-950 border-cyan-500 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-bold text-white mb-0.5">{plan.name}</h4>
                    <p className="text-[11px] text-slate-400 mb-3">{plan.tag}</p>

                    <div className="flex items-baseline gap-1.5 pb-4 border-b border-slate-800">
                      <span className="text-2xl font-extrabold text-white font-mono">{plan.price}</span>
                      <span className="text-[11px] text-slate-400 font-mono">/ system / yr</span>
                    </div>

                    <div className="py-2 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{plan.sla}</span>
                    </div>

                    <ul className="mt-2 space-y-2 text-xs text-slate-300">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAmcChooserOpen(false);
                        openQuoteModal(`Annual Maintenance Contracts - ${plan.name}`);
                      }}
                      className={`w-full py-2.5 px-3 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        plan.popular
                          ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      <span>Choose {plan.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer Note */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>All plans include free standby replacement laptops and network switches during repairs.</span>
              </span>
              <button
                onClick={() => setIsAmcChooserOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                  {getServiceIcon(activeModalService.category)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeModalService.shortTitle}</h3>
                  <p className="text-xs font-mono text-cyan-400">{activeModalService.category}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {activeModalService.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Detailed Scope of Work & Capabilities
              </h4>
              <ul className="grid grid-cols-1 gap-2.5 text-xs text-slate-200">
                {activeModalService.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-md border border-slate-800/80">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regional Coverage */}
            <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-800/30 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Regional Coverage & Support Corridors:</span>
              </div>
              <p className="text-slate-400">{activeModalService.chennaiCoverage}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400">
                <span>Standard Turnaround: </span>
                <span className="text-cyan-300 font-semibold">{activeModalService.turnaroundTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const cat = activeModalService.category;
                    setActiveModalService(null);
                    if (activeModalService.id === 'amc-contracts') {
                      setIsAmcChooserOpen(true);
                    } else {
                      openQuoteModal(cat);
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md shadow-md"
                >
                  {activeModalService.id === 'amc-contracts' ? 'Choose AMC Tier' : `Request Quote for ${activeModalService.shortTitle}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
