import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, PhoneCall, Plus, Search, Filter, Download, 
  ArrowUpDown, RefreshCw, LogOut, ArrowLeft, AlertCircle, 
  Clock, CheckCircle2, ChevronRight, User, Trash2 
} from 'lucide-react';
import type { CallTicket, DashboardStats, PriorityLevel, ServiceCategory, TicketStatus, UserSession } from '../../types/index.ts';
import { CrmDashboard } from './CrmDashboard.tsx';
import { CrmCallStatusChart } from './CrmCallStatusChart.tsx';
import { CrmNewCallModal } from './CrmNewCallModal.tsx';
import { CrmTicketDrawer } from './CrmTicketDrawer.tsx';

interface CrmPortalProps {
  currentUser: UserSession;
  onLogout: () => void;
  onBackToWebsite: () => void;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  'IT Hardware & Infrastructure',
  'Backup & Storage Solutions',
  'Printer Sales, Repair & Maintenance',
  'Cybersecurity & Endpoint Protection',
  'Laptop Repair & Upgrades',
  'Annual Maintenance Contracts',
  'Desktop & Laptop Rentals',
  'Networking & CCTV Solutions'
];

export const CrmPortal: React.FC<CrmPortalProps> = ({
  currentUser,
  onLogout,
  onBackToWebsite
}) => {
  const [calls, setCalls] = useState<CallTicket[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');
  const [sortField, setSortField] = useState<'callDate' | 'priority' | 'status'>('callDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modals & Drawers
  const [isNewCallModalOpen, setIsNewCallModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<CallTicket | null>(null);

  // Fetch calls & stats from Express backend
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [callsRes, statsRes] = await Promise.all([
        fetch('/api/calls'),
        fetch('/api/stats')
      ]);

      if (!callsRes.ok || !statsRes.ok) {
        throw new Error('Failed to retrieve CRM data from server');
      }

      const callsData = await callsRes.json();
      const statsData = await statsRes.json();

      setCalls(callsData.calls || []);
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || 'Error connecting to Call Management API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter & Search Logic
  const filteredCalls = useMemo(() => {
    return calls.filter((item) => {
      // Search query matches
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          item.id.toLowerCase().includes(q) ||
          item.customerName.toLowerCase().includes(q) ||
          item.mobile.includes(q) ||
          item.companyName.toLowerCase().includes(q) ||
          item.locality.toLowerCase().includes(q) ||
          item.issueDetails.toLowerCase().includes(q) ||
          item.assignedStaff.toLowerCase().includes(q);

        if (!matches) return false;
      }

      // Special Overdue Filter
      if (statusFilter === 'overdue') {
        if (!item.isOverdue) return false;
      } else if (statusFilter !== 'all' && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // Priority Filter
      if (priorityFilter !== 'all' && item.priority.toLowerCase() !== priorityFilter.toLowerCase()) {
        return false;
      }

      // Service Category
      if (serviceFilter !== 'all' && item.serviceCategory !== serviceFilter) {
        return false;
      }

      // Call Type
      if (typeFilter !== 'all' && item.callType.toLowerCase() !== typeFilter.toLowerCase()) {
        return false;
      }

      // Staff Member
      if (staffFilter !== 'all' && !item.assignedStaff.includes(staffFilter)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      let valA: any = a[sortField] || '';
      let valB: any = b[sortField] || '';

      if (sortField === 'callDate') {
        valA = new Date(valA).getTime() || 0;
        valB = new Date(valB).getTime() || 0;
      }

      if (sortOrder === 'asc') {
        return valA > valB ? 1 : -1;
      }
      return valA < valB ? 1 : -1;
    });
  }, [calls, searchQuery, statusFilter, priorityFilter, serviceFilter, typeFilter, staffFilter, sortField, sortOrder]);

  // CSV Export Functionality
  const handleExportCSV = () => {
    if (filteredCalls.length === 0) return;

    const headers = [
      'Ticket ID',
      'Customer Name',
      'Mobile',
      'Email',
      'Company',
      'Locality',
      'Call Type',
      'Service Category',
      'Priority',
      'Status',
      'Assigned Staff',
      'Call Date',
      'Follow-up Date',
      'Estimated Cost',
      'Resolution Notes'
    ];

    const rows = filteredCalls.map((c) => [
      `"${c.id}"`,
      `"${c.customerName.replace(/"/g, '""')}"`,
      `"${c.mobile}"`,
      `"${c.email}"`,
      `"${c.companyName.replace(/"/g, '""')}"`,
      `"${c.locality}"`,
      `"${c.callType}"`,
      `"${c.serviceCategory}"`,
      `"${c.priority}"`,
      `"${c.status}"`,
      `"${c.assignedStaff.replace(/"/g, '""')}"`,
      `"${new Date(c.callDate).toLocaleString('en-IN')}"`,
      `"${c.followUpDate ? new Date(c.followUpDate).toLocaleString('en-IN') : 'None'}"`,
      `"${c.estimatedCost || ''}"`,
      `"${(c.resolutionNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ratech_call_tickets_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Admin delete ticket
  const handleDeleteTicket = async (ticketId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentUser.role !== 'admin') {
      alert('Only administrators have permissions to delete ticket records.');
      return;
    }

    if (confirm(`Are you sure you want to permanently delete ticket ${ticketId}?`)) {
      try {
        const res = await fetch(`/api/calls/${ticketId}`, { method: 'DELETE' });
        if (res.ok) {
          fetchData();
        }
      } catch (err) {
        console.error('Failed to delete ticket:', err);
      }
    }
  };

  const getPriorityStyle = (priority: PriorityLevel) => {
    switch (priority) {
      case 'Urgent':
        return 'text-rose-400 font-bold';
      case 'High':
        return 'text-amber-400 font-semibold';
      case 'Medium':
        return 'text-sky-300';
      case 'Low':
        return 'text-slate-400';
    }
  };

  const getStatusStyle = (status: TicketStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-950 text-blue-300 border-blue-800';
      case 'In Progress':
        return 'bg-cyan-950 text-cyan-300 border-cyan-800';
      case 'Pending':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'Resolved':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'Closed':
        return 'bg-slate-900 text-slate-400 border-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar for CRM Portal */}
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToWebsite}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </button>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
              CRM
            </div>
            <span className="text-sm font-bold text-white tracking-tight">
              RA Tech Solutions <span className="text-cyan-400 font-normal">| Call Logging & Dispatch Desk</span>
            </span>
          </div>
        </div>

        {/* User Identity & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-white">{currentUser.name}</span>
            <span className="text-[10px] text-cyan-400 font-mono capitalize">
              {currentUser.role === 'admin' ? 'Administrator' : 'Service Engineer'} · {currentUser.designation.split('&')[0]}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Sign out of CRM Desk"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main CRM Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI Dashboard Strip */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Tamil Nadu IT Operations & Call Dispatch KPI Summary
            </h2>
            <button
              onClick={fetchData}
              disabled={loading}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Records</span>
            </button>
          </div>
          <CrmDashboard stats={stats} onFilterClick={(f) => setStatusFilter(f)} />

          {/* Recharts Data Visualization: Call Status Breakdown & Team Workload */}
          {stats && (
            <CrmCallStatusChart stats={stats} onFilterClick={(f) => setStatusFilter(f)} />
          )}
        </div>

        {/* Action Bar: Search, Filters & Export */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3.5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket ID, customer name, mobile, company, or complaint..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export CSV ({filteredCalls.length})</span>
              </button>

              <button
                onClick={() => setIsNewCallModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Log New Customer Call</span>
              </button>
            </div>
          </div>

          {/* Filter Dropdown Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300 focus:border-cyan-500"
              >
                <option value="all">Status: All</option>
                <option value="New">Status: New</option>
                <option value="In Progress">Status: In Progress</option>
                <option value="Pending">Status: Pending</option>
                <option value="Resolved">Status: Resolved</option>
                <option value="Closed">Status: Closed</option>
                <option value="overdue">Status: Overdue Follow-up</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300 focus:border-cyan-500"
              >
                <option value="all">Priority: All</option>
                <option value="Urgent">Priority: Urgent</option>
                <option value="High">Priority: High</option>
                <option value="Medium">Priority: Medium</option>
                <option value="Low">Priority: Low</option>
              </select>
            </div>

            {/* Service Category */}
            <div>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300 focus:border-cyan-500"
              >
                <option value="all">Service: All Domains</option>
                {SERVICE_CATEGORIES.map((s) => (
                  <option key={s} value={s}>
                    {s.split(' ')[0]} {s.split(' ')[1] || ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Call Type */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300 focus:border-cyan-500"
              >
                <option value="all">Type: All</option>
                <option value="Incoming">Type: Incoming</option>
                <option value="Outgoing">Type: Outgoing</option>
              </select>
            </div>

            {/* Staff Filter */}
            <div>
              <select
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300 focus:border-cyan-500"
              >
                <option value="all">Staff: All Engineers</option>
                <option value="Karthik">Karthik Raja</option>
                <option value="Praveen">Praveen Kumar</option>
                <option value="Divya">Divya Shankar</option>
                <option value="Vigneshwaran">Vigneshwaran</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-slate-300 flex items-center justify-between hover:border-slate-600"
              >
                <span>Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Tickets Registry Table */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400">
              Showing <strong className="text-white font-semibold">{filteredCalls.length}</strong> of {calls.length} registered tickets
            </div>
            {statusFilter !== 'all' || priorityFilter !== 'all' || searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  setServiceFilter('all');
                  setTypeFilter('all');
                  setStaffFilter('all');
                }}
                className="text-xs text-cyan-400 hover:underline"
              >
                Clear all filters
              </button>
            ) : null}
          </div>

          {filteredCalls.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <PhoneCall className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-medium text-slate-300">No customer calls match the selected criteria.</p>
              <p className="text-xs text-slate-500">Try adjusting your search query or reset the filter dropdowns.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Ticket Ref</th>
                    <th className="px-4 py-3">Customer / Company</th>
                    <th className="px-4 py-3">Service Domain</th>
                    <th className="px-4 py-3">Issue Description</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Assigned Staff</th>
                    <th className="px-4 py-3">Follow-up</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredCalls.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedTicket(item)}
                      className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                    >
                      {/* Ticket Ref */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-mono font-bold text-cyan-400 group-hover:text-cyan-300">
                          {item.id}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {item.callType}
                        </div>
                      </td>

                      {/* Customer / Company */}
                      <td className="px-4 py-3">
                        <div className="font-semibold text-white whitespace-nowrap">
                          {item.customerName}
                        </div>
                        <div className="text-slate-400 text-[11px] truncate max-w-[140px]">
                          {item.companyName}
                        </div>
                        <div className="font-mono text-slate-500 text-[10px]">
                          {item.mobile} · {item.locality}
                        </div>
                      </td>

                      {/* Service Domain */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-slate-300 font-medium">
                          {item.serviceCategory}
                        </span>
                      </td>

                      {/* Issue Description */}
                      <td className="px-4 py-3 max-w-xs">
                        <p className="text-slate-300 line-clamp-2 leading-relaxed">
                          {item.issueDetails}
                        </p>
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={getPriorityStyle(item.priority)}>
                          {item.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold border ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Assigned Staff */}
                      <td className="px-4 py-3 whitespace-nowrap text-slate-300">
                        {item.assignedStaff.split(' - ')[0]}
                      </td>

                      {/* Follow-up / Overdue */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.followUpDate ? (
                          <div className={item.isOverdue ? 'text-rose-400 font-semibold' : 'text-slate-400'}>
                            <div className="text-[11px] font-mono">
                              {new Date(item.followUpDate).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                            {item.isOverdue && (
                              <span className="text-[9px] uppercase tracking-wider font-bold text-rose-400">
                                Overdue
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTicket(item);
                            }}
                            className="p-1.5 text-cyan-400 hover:text-cyan-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                            title="Inspect & Update Ticket"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          {currentUser.role === 'admin' && (
                            <button
                              onClick={(e) => handleDeleteTicket(item.id, e)}
                              className="p-1.5 text-slate-500 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                              title="Delete Record (Admin)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* New Call Modal */}
      {isNewCallModalOpen && (
        <CrmNewCallModal
          isOpen={isNewCallModalOpen}
          onClose={() => setIsNewCallModalOpen(false)}
          currentUser={currentUser}
          onCallLogged={() => {
            fetchData();
          }}
        />
      )}

      {/* Ticket Detail / Resolution Drawer */}
      {selectedTicket && (
        <CrmTicketDrawer
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          currentUser={currentUser}
          onTicketUpdated={() => {
            fetchData();
            // Re-fetch selected ticket if needed
            fetch(`/api/calls/${selectedTicket.id}`)
              .then((r) => r.json())
              .then((data) => setSelectedTicket(data))
              .catch(() => {});
          }}
        />
      )}
    </div>
  );
};
