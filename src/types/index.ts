export type CallType = 'Incoming' | 'Outgoing';

export type ServiceCategory =
  | 'IT Hardware & Infrastructure'
  | 'Backup & Storage Solutions'
  | 'Printer Sales, Repair & Maintenance'
  | 'Cybersecurity & Endpoint Protection'
  | 'Laptop Repair & Upgrades'
  | 'Annual Maintenance Contracts'
  | 'Desktop & Laptop Rentals'
  | 'Networking & CCTV Solutions';

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';

export type TicketStatus = 'New' | 'In Progress' | 'Pending' | 'Resolved' | 'Closed';

export type UserRole = 'admin' | 'employee';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  author: string;
  action: string;
  notes?: string;
}

export interface CallTicket {
  id: string; // e.g. RAT-2026-1042
  customerName: string;
  mobile: string;
  email: string;
  companyName: string;
  locality: string; // Chennai area (Guindy, OMR, Velachery, Ambattur, T. Nagar, etc.)
  callType: CallType;
  serviceCategory: ServiceCategory;
  issueDetails: string;
  assignedStaff: string;
  priority: PriorityLevel;
  status: TicketStatus;
  callDate: string; // ISO date string (YYYY-MM-DDTHH:mm)
  followUpDate?: string; // ISO date string
  resolutionNotes?: string;
  estimatedCost?: string;
  isOverdue?: boolean;
  history: AuditLogEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  token?: string;
}

export interface DashboardStats {
  totalCalls: number;
  newCalls: number;
  inProgressCalls: number;
  pendingCalls: number;
  resolvedCalls: number;
  closedCalls: number;
  urgentCalls: number;
  overdueFollowUps: number;
  resolutionRatePercent: number;
}

export interface PublicEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  service: ServiceCategory;
  message: string;
  createdAt: string;
  status: 'Received' | 'Contacted' | 'Converted';
}
