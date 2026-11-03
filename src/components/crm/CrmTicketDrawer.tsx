import React, { useState } from 'react';
import { 
  X, Phone, Mail, MapPin, Calendar, Clock, User, 
  CheckCircle, AlertTriangle, Shield, History, Printer, Send, Save 
} from 'lucide-react';
import type { CallTicket, PriorityLevel, TicketStatus, UserSession } from '../../types/index.ts';

interface CrmTicketDrawerProps {
  ticket: CallTicket | null;
  onClose: () => void;
  currentUser: UserSession;
  onTicketUpdated: () => void;
}

const STAFF_LIST = [
  'Karthik Raja - Senior Hardware Engineer',
  'Praveen Kumar - Network Specialist',
  'Divya Shankar - AMC Coordinator',
  'Vigneshwaran - Field Technician',
  'R. Annamalai - Principal Architect'
];

export const CrmTicketDrawer: React.FC<CrmTicketDrawerProps> = ({
  ticket,
  onClose,
  currentUser,
  onTicketUpdated
}) => {
  if (!ticket) return null;

  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [priority, setPriority] = useState<PriorityLevel>(ticket.priority);
  const [assignedStaff, setAssignedStaff] = useState<string>(ticket.assignedStaff);
  const [resolutionNotes, setResolutionNotes] = useState<string>(ticket.resolutionNotes || '');
  const [estimatedCost, setEstimatedCost] = useState<string>(ticket.estimatedCost || '');
  const [followUpDate, setFollowUpDate] = useState<string>(ticket.followUpDate ? ticket.followUpDate.slice(0, 16) : '');
  const [actionRemarks, setActionRemarks] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/calls/${ticket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          priority,
          assignedStaff,
          resolutionNotes,
          estimatedCost,
          followUpDate: followUpDate || null,
          author: currentUser.name,
          actionNote: actionRemarks.trim() || undefined
        })
      });

      if (res.ok) {
        setActionRemarks('');
        onTicketUpdated();
      }
    } catch (err) {
      console.error('Failed to update ticket:', err);
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-2xl h-full flex flex-col justify-between overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-cyan-400 tabular-nums">
                {ticket.id}
              </span>
              <span className="text-xs font-mono text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-300">
                {ticket.callType} Call
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Logged on {new Date(ticket.callDate).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrintView(!showPrintView)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded flex items-center gap-1.5"
              title="Toggle Printable Job Sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{showPrintView ? 'Form View' : 'Job Sheet'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 space-y-6 overflow-y-auto">
          {showPrintView ? (
            /* Printable Job Sheet for Chennai Field Technicians */
            <div className="p-6 bg-white text-slate-900 rounded-lg shadow-sm space-y-5 print:p-0 print:shadow-none">
              <div className="flex justify-between items-start border-b border-slate-300 pb-4">
                <div>
                  <h4 className="text-lg font-bold">RA TECH SOLUTIONS – FIELD JOB SHEET</h4>
                  <p className="text-xs text-slate-600">No.79, Sivasakthi Complex, Kundrathur Main Road, Mangadu, Chennai 600122 | 7904463033</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold font-mono text-blue-800">{ticket.id}</span>
                  <p className="text-xs text-slate-500">{new Date().toLocaleDateString('en-IN')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block">Customer / Organization:</span>
                  <p className="font-bold text-slate-900">{ticket.customerName}</p>
                  <p>{ticket.companyName}</p>
                  <p>Mobile: {ticket.mobile}</p>
                  <p>Location: {ticket.locality}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block">Ticket Specs:</span>
                  <p>Service: {ticket.serviceCategory}</p>
                  <p>Priority: {ticket.priority}</p>
                  <p>Assigned: {ticket.assignedStaff}</p>
                  <p>Est. Cost: {ticket.estimatedCost || 'TBD'}</p>
                </div>
              </div>

              <div className="border border-slate-300 p-3 rounded text-xs space-y-1">
                <span className="font-bold text-slate-800">Reported Problem / Scope of Work:</span>
                <p className="text-slate-700 leading-relaxed">{ticket.issueDetails}</p>
              </div>

              <div className="border border-slate-300 p-3 rounded text-xs space-y-1 min-h-[80px]">
                <span className="font-bold text-slate-800">Technician Diagnostic & Parts Replaced:</span>
                <p className="text-slate-700 italic">{ticket.resolutionNotes || 'On-site investigation in progress.'}</p>
              </div>

              <div className="pt-8 grid grid-cols-2 gap-6 text-xs border-t border-slate-300">
                <div>
                  <div className="border-b border-slate-400 w-40 mb-1" />
                  <span className="text-slate-600">Client Acknowledgement Signature</span>
                </div>
                <div className="text-right">
                  <div className="border-b border-slate-400 w-40 ml-auto mb-1" />
                  <span className="text-slate-600">Field Engineer Signature</span>
                </div>
              </div>

              <div className="no-print pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full py-2 bg-slate-900 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Send to Printer / Save PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Customer Card */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Customer & Establishment Details
                  </h4>
                  <span className="text-xs text-cyan-400 font-medium">{ticket.locality}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Customer Name</span>
                    <span className="text-sm font-semibold text-white">{ticket.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Company / Organization</span>
                    <span className="text-sm font-semibold text-white">{ticket.companyName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact Mobile</span>
                    <a
                      href={`tel:${ticket.mobile}`}
                      className="font-mono text-cyan-400 font-semibold hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {ticket.mobile}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email Address</span>
                    <span className="text-slate-300">{ticket.email || 'None on file'}</span>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Service Category: <strong className="text-cyan-400">{ticket.serviceCategory}</strong>
                </div>
                <div className="text-xs text-slate-200 leading-relaxed bg-slate-900 p-3 rounded border border-slate-800">
                  {ticket.issueDetails}
                </div>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleUpdate} className="p-5 rounded-lg bg-slate-950 border border-cyan-500/30 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Update Ticket Status & Resolution
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as TicketStatus)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:border-cyan-500"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending">Pending (Spares / Client)</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:border-cyan-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Assigned Staff
                    </label>
                    <select
                      value={assignedStaff}
                      onChange={(e) => setAssignedStaff(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:border-cyan-500"
                    >
                      {STAFF_LIST.map((s) => (
                        <option key={s} value={s}>
                          {s.split(' - ')[0]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Follow-up Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:border-cyan-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Estimated Cost / AMC Quoted
                    </label>
                    <input
                      type="text"
                      value={estimatedCost}
                      onChange={(e) => setEstimatedCost(e.target.value)}
                      placeholder="e.g. ₹5,500"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Technical Resolution Notes & Diagnostics
                  </label>
                  <textarea
                    rows={2}
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Enter diagnostic results, replaced component serial numbers, or visit outcome..."
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:border-cyan-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Action Remarks (Appends to Audit Timeline)
                  </label>
                  <input
                    type="text"
                    value={actionRemarks}
                    onChange={(e) => setActionRemarks(e.target.value)}
                    placeholder="Brief description of change made by you..."
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:border-cyan-500"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-slate-950 font-semibold text-xs rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Updates to Database'}</span>
                  </button>
                </div>
              </form>

              {/* Complete Customer History & Audit Timeline */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <History className="w-4 h-4 text-cyan-400" />
                  <span>Audit History Timeline ({ticket.history?.length || 0} Events)</span>
                </div>

                <div className="space-y-2.5">
                  {ticket.history && ticket.history.length > 0 ? (
                    ticket.history.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-md text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{log.action}</span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {new Date(log.timestamp).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-[11px] text-cyan-400/90 font-mono">
                          Staff: {log.author}
                        </div>
                        {log.notes && (
                          <div className="text-slate-400 text-xs mt-1 bg-slate-900/60 p-1.5 rounded">
                            {log.notes}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic">No previous events logged.</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
