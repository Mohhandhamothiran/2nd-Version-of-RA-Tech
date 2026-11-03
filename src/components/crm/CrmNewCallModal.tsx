import React, { useState } from 'react';
import { X, PhoneCall, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import type { CallType, PriorityLevel, ServiceCategory, TicketStatus, UserSession } from '../../types/index.ts';

interface CrmNewCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onCallLogged: () => void;
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

const STAFF_LIST = [
  'Karthik Raja - Senior Hardware Engineer',
  'Praveen Kumar - Network Specialist',
  'Divya Shankar - AMC Coordinator',
  'Vigneshwaran - Field Technician',
  'R. Annamalai - Principal Architect'
];

const TAMIL_NADU_REGIONS = [
  'Mangadu & Kundrathur (Chennai HQ)',
  'Thirumudivakkam Industrial Estate',
  'Sriperumbuthur & Oragadam Corridor',
  'Chennai Metro (Porur, Guindy, OMR, Ambattur)',
  'Coimbatore (TIDEL Park & Peelamedu)',
  'Hosur & Krishnagiri Manufacturing',
  'Tirupur & Erode Industrial Hubs',
  'Salem & Dharmapuri Clusters',
  'Madurai, Trichy & Central Tamil Nadu',
  'Other District in Tamil Nadu'
];

export const CrmNewCallModal: React.FC<CrmNewCallModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCallLogged
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    email: '',
    companyName: '',
    locality: TAMIL_NADU_REGIONS[0],
    callType: 'Incoming' as CallType,
    serviceCategory: SERVICE_OPTIONS[0],
    issueDetails: '',
    assignedStaff: STAFF_LIST[0],
    priority: 'Medium' as PriorityLevel,
    status: 'New' as TicketStatus,
    callDate: new Date().toISOString().slice(0, 16),
    followUpDate: '',
    resolutionNotes: '',
    estimatedCost: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.customerName.trim()) {
      setError('Please provide customer name.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length < 8) {
      setError('Please enter a valid mobile number.');
      return;
    }
    if (!formData.issueDetails.trim()) {
      setError('Please enter customer issue or complaint details.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          author: currentUser.name
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to log call ticket');
      }

      onCallLogged();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error saving call record to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Log New Customer Call</h3>
              <p className="text-xs text-slate-400 font-mono">
                Auto-generates ticket ID (RAT-2026-XXXX) · Logged by: {currentUser.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 rounded text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Customer Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Customer / Caller Name *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. Anandhi Natarajan"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Customer Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="e.g. 9840123456"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Row 2: Company & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Company / Organization Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Kavin Logistics Hub"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Customer Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="procurement@company.in"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Row 3: Call Type, Service Category & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Call Type *
              </label>
              <select
                value={formData.callType}
                onChange={(e) => setFormData({ ...formData, callType: e.target.value as CallType })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Incoming">Incoming Call</option>
                <option value="Outgoing">Outgoing Follow-up</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Service Domain *
              </label>
              <select
                value={formData.serviceCategory}
                onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value as ServiceCategory })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
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
                District / Region *
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
          </div>

          {/* Row 4: Priority, Initial Status, Assigned Staff */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Priority Level *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as PriorityLevel })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent (SLA Breached if &gt;2h)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Initial Ticket Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TicketStatus })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending (Spares / Client)</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Assigned Staff Member
              </label>
              <select
                value={formData.assignedStaff}
                onChange={(e) => setFormData({ ...formData, assignedStaff: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {STAFF_LIST.map((staff) => (
                  <option key={staff} value={staff}>
                    {staff}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 5: Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Call Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.callDate}
                onChange={(e) => setFormData({ ...formData, callDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Scheduled Follow-up Date & Time (Optional)
              </label>
              <input
                type="datetime-local"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Row 6: Issue Details Textarea */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Customer Issue / Complaint Details *
            </label>
            <textarea
              required
              rows={3}
              value={formData.issueDetails}
              onChange={(e) => setFormData({ ...formData, issueDetails: e.target.value })}
              placeholder="State technical symptoms, hardware model numbers, error codes or required service scope..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          {/* Row 7: Initial Resolution Notes & Estimated Cost */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Initial Action Taken / Resolution Notes
              </label>
              <input
                type="text"
                value={formData.resolutionNotes}
                onChange={(e) => setFormData({ ...formData, resolutionNotes: e.target.value })}
                placeholder="e.g. Dispatched technician on-site with spare parts."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Estimated Cost / AMC
              </label>
              <input
                type="text"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                placeholder="e.g. ₹4,500 or AMC Plan"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-slate-950 font-semibold uppercase tracking-wider text-xs rounded transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              {loading ? (
                <span>Registering Call...</span>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Save Call Record & Generate Ticket</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
