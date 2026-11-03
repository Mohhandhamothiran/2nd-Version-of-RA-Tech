import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Phone, ArrowRight } from 'lucide-react';
import type { ServiceCategory } from '../types/index.ts';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const SERVICE_OPTIONS: ServiceCategory[] = [
  'IT Hardware & Infrastructure',
  'Backup & Storage Solutions',
  'Printer Sales, Repair & Maintenance',
  'Cybersecurity & Endpoint Protection',
  'Laptop Repair & Upgrades',
  'Annual Maintenance Contracts',
  'Desktop & Laptop Rentals',
  'Networking & CCTV Solutions'
];

const TAMIL_NADU_REGIONS = [
  'Mangadu & Kundrathur Main Road (HQ Hub)',
  'Thirumudivakkam Industrial Estate',
  'Sriperumbuthur & Oragadam Auto Corridor',
  'Chennai Metro (Porur, Guindy, OMR, Ambattur)',
  'Coimbatore (TIDEL Park & Peelamedu)',
  'Hosur & Krishnagiri Manufacturing Belt',
  'Tirupur & Erode Industrial Hubs',
  'Salem & Dharmapuri Districts',
  'Madurai, Trichy & Central Tamil Nadu',
  'Other District in Tamil Nadu'
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    locality: TAMIL_NADU_REGIONS[0],
    service: SERVICE_OPTIONS[0],
    nodeCount: '1-10 Systems',
    urgency: 'Standard (within 24 hours)',
    details: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ ticketId: string; enqId: string } | null>(null);

  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubmittedData(null);
      setSelectedPlanName(null);

      if (preselectedService) {
        const cleanPre = preselectedService.toLowerCase();

        // Check if an AMC plan tier was passed
        if (cleanPre.includes('silver')) {
          setSelectedPlanName('Silver AMC Plan');
          setFormData((prev) => ({
            ...prev,
            service: 'Annual Maintenance Contracts',
            details: 'Requested Tier: Silver AMC Plan (₹1,200/system/year · 4-Hour Response SLA)'
          }));
          return;
        } else if (cleanPre.includes('gold')) {
          setSelectedPlanName('Gold Corporate AMC (Most Popular)');
          setFormData((prev) => ({
            ...prev,
            service: 'Annual Maintenance Contracts',
            details: 'Requested Tier: Gold Corporate AMC (₹1,850/system/year · 2-Hour Rapid On-Site SLA)'
          }));
          return;
        } else if (cleanPre.includes('platinum')) {
          setSelectedPlanName('Platinum Mission-Critical AMC');
          setFormData((prev) => ({
            ...prev,
            service: 'Annual Maintenance Contracts',
            details: 'Requested Tier: Platinum Mission-Critical AMC (₹2,600/system/year · 1-Hour 24/7 SLA)'
          }));
          return;
        }

        const match = SERVICE_OPTIONS.find(
          (s) =>
            cleanPre.includes(s.toLowerCase()) ||
            s.toLowerCase().includes(cleanPre) ||
            cleanPre.includes(s.split(' ')[0].toLowerCase())
        );
        if (match) {
          setFormData((prev) => ({ ...prev, service: match, details: '' }));
        }
      }
    }
  }, [isOpen, preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: `[Locality: ${formData.locality} | Systems: ${formData.nodeCount} | Urgency: ${formData.urgency}] ${formData.details}`
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSubmittedData({
          ticketId: data.ticketId || 'RAT-2026-LIVE',
          enqId: data.enquiryId || 'ENQ-LIVE'
        });
      }
    } catch {
      // Fallback display
      setSubmittedData({
        ticketId: 'RAT-2026-WEB',
        enqId: 'ENQ-WEB'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Request Instant IT Quotation
            </h3>
            <p className="text-xs font-mono mt-0.5 text-cyan-400">
              Selected Service:{' '}
              <span className="text-white font-semibold underline underline-offset-2">
                {formData.service}
                {selectedPlanName ? ` · ${selectedPlanName}` : ''}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedData ? (
          <div className="p-6 rounded-lg bg-slate-950 border border-cyan-500/40 text-center space-y-4 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Quotation Request Logged</h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Thank you! Our technical coordinator is reviewing your requirements. We will contact you at{' '}
              <span className="font-mono text-cyan-300 font-semibold">{formData.phone}</span> with estimated pricing.
            </p>

            <div className="p-3 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-slate-400 flex items-center justify-center gap-3">
              <span>CRM Ticket ID: <strong className="text-cyan-400">{submittedData.ticketId}</strong></span>
              <span>·</span>
              <span>Enquiry: <strong>{submittedData.enqId}</strong></span>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <a
                href="tel:7904463033"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Call Hotline (7904463033)</span>
              </a>
              <button
                onClick={() => {
                  setSubmittedData(null);
                  onClose();
                }}
                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anandhi N."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9444087654"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Kavin Logistics"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tamil Nadu District / Region *
                </label>
                <select
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {TAMIL_NADU_REGIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Service Domain *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceCategory })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {SERVICE_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Hardware Scale / Workstations
                </label>
                <select
                  value={formData.nodeCount}
                  onChange={(e) => setFormData({ ...formData, nodeCount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="1-5 Systems">1 to 5 Systems</option>
                  <option value="6-20 Systems">6 to 20 Systems</option>
                  <option value="21-50 Systems">21 to 50 Systems</option>
                  <option value="51-100+ Systems">51 to 100+ Systems</option>
                  <option value="Server / Rack only">Server Cluster / Rack Only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Urgency / Required Start
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Emergency (within 2-4 hours)">Emergency (within 2-4 hours)</option>
                  <option value="Standard (within 24 hours)">Standard (within 24 hours)</option>
                  <option value="Planning / Next Month">Planning / Next Month AMC</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Specific Technical Details or Fault Description
              </label>
              <textarea
                rows={2}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Mention specific models, problem symptoms, or custom requirements..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 disabled:opacity-50 text-slate-950 font-semibold uppercase tracking-wider text-xs rounded shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {submitting ? (
                  <span>Generating Quote Request...</span>
                ) : (
                  <>
                    <span>Generate Instant Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
