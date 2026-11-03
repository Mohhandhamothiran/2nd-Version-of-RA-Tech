import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ServiceCategory } from '../types/index.ts';

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

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: SERVICE_OPTIONS[0],
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ message: string; ticketId?: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessInfo(null);

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMessage('Please enter a valid contact phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSuccessInfo({
        message: data.message,
        ticketId: data.ticketId
      });
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        service: SERVICE_OPTIONS[0],
        message: ''
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error submitting request. Please call 7904463033 directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-950 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span className="uppercase tracking-wider">Fast On-Site Response Across Tamil Nadu</span>
            <span aria-hidden="true">·</span>
            <span>Hotline: 7904463033</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Connect with Our Regional IT Engineering Desk
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            Need an on-site hardware technician, corporate AMC quotation, or emergency server recovery anywhere in Tamil Nadu? Contact our central engineering facility in Chennai for swift dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contacts & Chennai Location Hubs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono text-xs">
                Official Business Information
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Support Hotline</div>
                  <a
                    href="tel:7904463033"
                    className="text-base font-semibold text-white hover:text-cyan-400 transition-colors font-mono"
                  >
                    7904463033
                  </a>
                  <div className="text-[11px] text-cyan-400/80 font-mono">Mon – Sat: 9:00 AM – 8:00 PM</div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Email Support</div>
                  <a
                    href="mailto:support@ratechsolutions.in"
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                  >
                    support@ratechsolutions.in
                  </a>
                  <div className="text-[11px] text-slate-500 font-mono">Response within 30 minutes</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Chennai Headquarters & Lab</div>
                  <div className="text-sm font-medium text-white leading-relaxed">
                    No.79, Sivasakthi Complex, Kundrathur Main Road, Mangadu
                  </div>
                  <div className="text-xs text-slate-400">Chennai 600122, Tamil Nadu, India</div>
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <div className="pt-2">
                <a
                  href="https://wa.me/917904463033?text=Hello%20RA%20Tech%20Solutions,%20I%20need%20IT%20support%20in%20Chennai"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp Technical Chat</span>
                </a>
              </div>
            </div>

            {/* Tamil Nadu Service Corridor Coverage */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Regional Dispatch Hubs Across Tamil Nadu:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                  <div className="font-semibold text-white">Thirumudivakkam & Sriperumbuthur</div>
                  <div className="text-[11px] text-cyan-400 font-mono">15 - 35 Min SLA</div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                  <div className="font-semibold text-white">Chennai Metro & Porur</div>
                  <div className="text-[11px] text-cyan-400 font-mono">20 - 40 Min SLA</div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                  <div className="font-semibold text-white">Coimbatore, Tirupur & Salem</div>
                  <div className="text-[11px] text-cyan-400 font-mono">Same-Day On-Site</div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                  <div className="font-semibold text-white">Hosur & Krishnagiri Hub</div>
                  <div className="text-[11px] text-cyan-400 font-mono">Scheduled AMC</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 relative">
              <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                Send an Enquiry or Request Service Visit
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Your request is directly registered in our internal Call Desk for immediate technician allocation.
              </p>

              {successInfo ? (
                <div className="p-6 rounded-lg bg-cyan-950/40 border border-cyan-800/80 space-y-3 text-center animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Enquiry Registered Successfully</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    {successInfo.message}
                  </p>
                  {successInfo.ticketId && (
                    <div className="inline-block px-3 py-1 bg-slate-950 border border-cyan-500/50 rounded font-mono text-xs text-cyan-300">
                      CRM Reference Ticket: {successInfo.ticketId}
                    </div>
                  )}
                  <div className="pt-3">
                    <button
                      onClick={() => setSuccessInfo(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-md text-xs text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Suresh Kumar"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9840123456"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Company or Establishment Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Tidel Corp / Clinic"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Service Category Required *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceCategory })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    >
                      {SERVICE_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Requirement or Issue Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your requirement (e.g., Server RAID error, AMC quotation for 35 PCs in Guindy, CCTV cabling in OMR warehouse)..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 disabled:opacity-50 text-slate-950 font-semibold uppercase tracking-wider text-xs rounded-md shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      {submitting ? (
                        <span>Connecting to Call Desk...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Enquiry & Book Tech Visit</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
