import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { CallTicket, DashboardStats, PublicEnquiry, UserSession } from './src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Persistent database file paths
const DATA_DIR = path.resolve(__dirname, 'server/data');
const CALLS_FILE = path.join(DATA_DIR, 'calls.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure directory and seed files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readCalls(): CallTicket[] {
  try {
    if (!fs.existsSync(CALLS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(CALLS_FILE, 'utf-8');
    return JSON.parse(data) as CallTicket[];
  } catch (err) {
    console.error('Error reading calls file:', err);
    return [];
  }
}

function writeCalls(calls: CallTicket[]): boolean {
  try {
    fs.writeFileSync(CALLS_FILE, JSON.stringify(calls, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing calls file:', err);
    return false;
  }
}

function readEnquiries(): PublicEnquiry[] {
  try {
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(data) as PublicEnquiry[];
  } catch (err) {
    console.error('Error reading enquiries file:', err);
    return [];
  }
}

function writeEnquiries(enquiries: PublicEnquiry[]): boolean {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing enquiries file:', err);
    return false;
  }
}

// Pre-configured staff accounts
const STAFF_ACCOUNTS: UserSession[] = [
  {
    id: 'user-admin',
    name: 'R. Annamalai',
    email: 'admin@ratechsolutions.in',
    role: 'admin',
    designation: 'Managing Director & Principal Architect'
  },
  {
    id: 'user-eng-1',
    name: 'Karthik Raja',
    email: 'engineer@ratechsolutions.in',
    role: 'employee',
    designation: 'Senior Hardware & Systems Engineer'
  },
  {
    id: 'user-desk-1',
    name: 'Divya Shankar',
    email: 'divya@ratechsolutions.in',
    role: 'employee',
    designation: 'Customer Desk Coordinator'
  }
];

// Helper: check if a ticket has an overdue follow up
function computeIsOverdue(ticket: CallTicket): boolean {
  if (!ticket.followUpDate) return false;
  if (ticket.status === 'Resolved' || ticket.status === 'Closed') return false;
  try {
    const followUp = new Date(ticket.followUpDate).getTime();
    return followUp < Date.now();
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// Authentication Endpoints
// -------------------------------------------------------------
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const matchedUser = STAFF_ACCOUNTS.find((u) => u.email.toLowerCase() === cleanEmail);

  // Verification logic with sensible defaults for quick testing
  const isValidPassword =
    (cleanEmail === 'admin@ratechsolutions.in' && (password === 'Admin@2026!' || password === 'admin123')) ||
    (cleanEmail === 'engineer@ratechsolutions.in' && (password === 'Engineer@2026!' || password === 'engineer123')) ||
    (cleanEmail === 'divya@ratechsolutions.in' && (password === 'Staff@2026!' || password === 'staff123'));

  if (!matchedUser || !isValidPassword) {
    res.status(401).json({
      error: 'Invalid credentials. Use demo logins: admin@ratechsolutions.in (Admin@2026!) or engineer@ratechsolutions.in (Engineer@2026!)'
    });
    return;
  }

  res.json({
    user: {
      ...matchedUser,
      token: `rat_token_${Date.now()}_${matchedUser.id}`
    }
  });
});

// -------------------------------------------------------------
// Call Logging & Ticket Endpoints
// -------------------------------------------------------------

// GET /api/calls - list with search & filter
app.get('/api/calls', (req: Request, res: Response) => {
  let calls = readCalls();

  // Annotate overdue status dynamically
  calls = calls.map((c) => ({
    ...c,
    isOverdue: computeIsOverdue(c)
  }));

  const { search, status, priority, service, staff, type, sort = 'callDate', order = 'desc' } = req.query;

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    calls = calls.filter((c) =>
      c.id.toLowerCase().includes(q) ||
      c.customerName.toLowerCase().includes(q) ||
      c.mobile.includes(q) ||
      c.companyName.toLowerCase().includes(q) ||
      c.locality.toLowerCase().includes(q) ||
      c.issueDetails.toLowerCase().includes(q) ||
      c.assignedStaff.toLowerCase().includes(q)
    );
  }

  if (status && typeof status === 'string' && status !== 'all') {
    calls = calls.filter((c) => c.status.toLowerCase() === status.toLowerCase());
  }

  if (priority && typeof priority === 'string' && priority !== 'all') {
    calls = calls.filter((c) => c.priority.toLowerCase() === priority.toLowerCase());
  }

  if (service && typeof service === 'string' && service !== 'all') {
    calls = calls.filter((c) => c.serviceCategory === service);
  }

  if (staff && typeof staff === 'string' && staff !== 'all') {
    calls = calls.filter((c) => c.assignedStaff.includes(staff));
  }

  if (type && typeof type === 'string' && type !== 'all') {
    calls = calls.filter((c) => c.callType.toLowerCase() === type.toLowerCase());
  }

  // Sorting
  calls.sort((a, b) => {
    let fieldA: any = a[sort as keyof CallTicket] || '';
    let fieldB: any = b[sort as keyof CallTicket] || '';

    if (sort === 'callDate' || sort === 'createdAt') {
      fieldA = new Date(fieldA).getTime() || 0;
      fieldB = new Date(fieldB).getTime() || 0;
    }

    if (order === 'asc') {
      return fieldA > fieldB ? 1 : -1;
    }
    return fieldA < fieldB ? 1 : -1;
  });

  res.json({
    total: calls.length,
    calls
  });
});

// GET /api/calls/:id - get single ticket
app.get('/api/calls/:id', (req: Request, res: Response) => {
  const calls = readCalls();
  const ticket = calls.find((c) => c.id.toUpperCase() === req.params.id.toUpperCase());

  if (!ticket) {
    res.status(404).json({ error: 'Call ticket not found' });
    return;
  }

  res.json({
    ...ticket,
    isOverdue: computeIsOverdue(ticket)
  });
});

// POST /api/calls - log new customer call
app.post('/api/calls', (req: Request, res: Response) => {
  const {
    customerName,
    mobile,
    email = '',
    companyName = '',
    locality = 'Chennai Metro',
    callType = 'Incoming',
    serviceCategory,
    issueDetails,
    assignedStaff = 'Divya Shankar - AMC Coordinator',
    priority = 'Medium',
    status = 'New',
    callDate = new Date().toISOString(),
    followUpDate,
    resolutionNotes = '',
    estimatedCost = '',
    author = 'System Desk'
  } = req.body;

  if (!customerName || !mobile || !serviceCategory || !issueDetails) {
    res.status(400).json({ error: 'Customer name, mobile number, service category, and issue details are required.' });
    return;
  }

  const calls = readCalls();

  // Generate automated reference: RAT-2026-XXXX
  let nextNumber = 1001;
  const existingIds = calls
    .map((c) => {
      const match = c.id.match(/RAT-2026-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => !isNaN(n));

  if (existingIds.length > 0) {
    nextNumber = Math.max(...existingIds) + 1;
  }
  const ticketId = `RAT-2026-${nextNumber}`;

  const newTicket: CallTicket = {
    id: ticketId,
    customerName: customerName.trim(),
    mobile: mobile.trim(),
    email: email.trim(),
    companyName: companyName.trim() || 'Individual Client',
    locality: locality.trim(),
    callType,
    serviceCategory,
    issueDetails: issueDetails.trim(),
    assignedStaff,
    priority,
    status,
    callDate,
    followUpDate: followUpDate || undefined,
    resolutionNotes,
    estimatedCost,
    history: [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author,
        action: 'Call Logged & Ticket Created',
        notes: `Initial call recorded via ${callType} phone call. Priority: ${priority}.`
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  calls.unshift(newTicket);
  writeCalls(calls);

  res.status(201).json({
    message: 'Call logged successfully',
    ticket: newTicket
  });
});

// PUT /api/calls/:id - update call status, assignment or notes
app.put('/api/calls/:id', (req: Request, res: Response) => {
  const calls = readCalls();
  const index = calls.findIndex((c) => c.id.toUpperCase() === req.params.id.toUpperCase());

  if (index === -1) {
    res.status(404).json({ error: 'Call ticket not found' });
    return;
  }

  const existing = calls[index];
  const {
    status,
    priority,
    assignedStaff,
    followUpDate,
    resolutionNotes,
    estimatedCost,
    issueDetails,
    author = 'Staff Member',
    actionNote = ''
  } = req.body;

  const historyEntries = [...existing.history];
  const changes: string[] = [];

  if (status && status !== existing.status) {
    changes.push(`Status changed from ${existing.status} to ${status}`);
    existing.status = status;
  }
  if (priority && priority !== existing.priority) {
    changes.push(`Priority changed to ${priority}`);
    existing.priority = priority;
  }
  if (assignedStaff && assignedStaff !== existing.assignedStaff) {
    changes.push(`Reassigned to ${assignedStaff}`);
    existing.assignedStaff = assignedStaff;
  }
  if (followUpDate !== undefined) {
    existing.followUpDate = followUpDate || undefined;
    changes.push('Follow-up schedule updated');
  }
  if (resolutionNotes !== undefined) {
    existing.resolutionNotes = resolutionNotes;
  }
  if (estimatedCost !== undefined) {
    existing.estimatedCost = estimatedCost;
  }
  if (issueDetails !== undefined) {
    existing.issueDetails = issueDetails;
  }

  if (changes.length > 0 || actionNote) {
    historyEntries.push({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      author,
      action: changes.join('; ') || 'Details Updated',
      notes: actionNote || undefined
    });
  }

  existing.history = historyEntries;
  existing.updatedAt = new Date().toISOString();
  calls[index] = existing;

  writeCalls(calls);

  res.json({
    message: 'Ticket updated successfully',
    ticket: {
      ...existing,
      isOverdue: computeIsOverdue(existing)
    }
  });
});

// DELETE /api/calls/:id - delete ticket
app.delete('/api/calls/:id', (req: Request, res: Response) => {
  let calls = readCalls();
  const ticketId = req.params.id.toUpperCase();
  const exists = calls.some((c) => c.id.toUpperCase() === ticketId);

  if (!exists) {
    res.status(404).json({ error: 'Ticket not found' });
    return;
  }

  calls = calls.filter((c) => c.id.toUpperCase() !== ticketId);
  writeCalls(calls);

  res.json({ message: 'Ticket deleted successfully', id: ticketId });
});

// GET /api/stats - KPI summary metrics
app.get('/api/stats', (_req: Request, res: Response) => {
  const calls = readCalls();

  const totalCalls = calls.length;
  const newCalls = calls.filter((c) => c.status === 'New').length;
  const inProgressCalls = calls.filter((c) => c.status === 'In Progress').length;
  const pendingCalls = calls.filter((c) => c.status === 'Pending').length;
  const resolvedCalls = calls.filter((c) => c.status === 'Resolved').length;
  const closedCalls = calls.filter((c) => c.status === 'Closed').length;
  const urgentCalls = calls.filter((c) => c.priority === 'Urgent' && c.status !== 'Closed').length;
  const overdueFollowUps = calls.filter((c) => computeIsOverdue(c)).length;

  const resolvedOrClosed = resolvedCalls + closedCalls;
  const resolutionRatePercent = totalCalls > 0 ? Math.round((resolvedOrClosed / totalCalls) * 100) : 0;

  const stats: DashboardStats = {
    totalCalls,
    newCalls,
    inProgressCalls,
    pendingCalls,
    resolvedCalls,
    closedCalls,
    urgentCalls,
    overdueFollowUps,
    resolutionRatePercent
  };

  res.json(stats);
});

// -------------------------------------------------------------
// Public Enquiries & Lead Capture
// -------------------------------------------------------------
app.get('/api/enquiries', (_req: Request, res: Response) => {
  const enquiries = readEnquiries();
  res.json(enquiries);
});

app.post('/api/enquiry', (req: Request, res: Response) => {
  const { name, phone, email, company = '', service, message = '' } = req.body;

  if (!name || !phone || !service) {
    res.status(400).json({ error: 'Name, phone number, and requested service are required' });
    return;
  }

  const enquiries = readEnquiries();
  const enqId = `ENQ-2026-${String(enquiries.length + 1).padStart(3, '0')}`;

  const newEnquiry: PublicEnquiry = {
    id: enqId,
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : '',
    company: company.trim(),
    service,
    message: message.trim(),
    createdAt: new Date().toISOString(),
    status: 'Received'
  };

  enquiries.unshift(newEnquiry);
  writeEnquiries(enquiries);

  // Automatically create a corresponding Call Ticket in the CRM so desk staff see the inquiry immediately!
  const calls = readCalls();
  let nextNumber = 1001;
  const existingIds = calls
    .map((c) => {
      const match = c.id.match(/RAT-2026-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => !isNaN(n));

  if (existingIds.length > 0) {
    nextNumber = Math.max(...existingIds) + 1;
  }
  const ticketId = `RAT-2026-${nextNumber}`;

  const newTicket: CallTicket = {
    id: ticketId,
    customerName: name.trim(),
    mobile: phone.trim(),
    email: email.trim(),
    companyName: company.trim() || 'Online Enquiry Client',
    locality: 'Chennai (Web Portal)',
    callType: 'Incoming',
    serviceCategory: service,
    issueDetails: `Website Lead Enquiry (${enqId}): ${message || 'Customer requested service callback and quotation via web portal.'}`,
    assignedStaff: 'Divya Shankar - AMC Coordinator',
    priority: 'High',
    status: 'New',
    callDate: new Date().toISOString().slice(0, 16),
    followUpDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16), // Follow up within 2 hours
    resolutionNotes: 'Awaiting initial callback to customer.',
    history: [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author: 'Web Portal Gateway',
        action: 'Web Lead Auto-Synced to CRM',
        notes: `Enquiry ${enqId} automatically registered as Ticket ${ticketId}. 2-hour SLA initiated.`
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  calls.unshift(newTicket);
  writeCalls(calls);

  res.status(201).json({
    message: 'Enquiry submitted successfully. Our Chennai IT engineering team will contact you within 30 minutes.',
    enquiryId: enqId,
    ticketId: ticketId
  });
});

// -------------------------------------------------------------
// Vite Middleware or Static Production Serving
// -------------------------------------------------------------
async function setupViteServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[RA Tech Solutions] Full-Stack Server running on port ${PORT} (mode: ${isProduction ? 'prod' : 'dev'})`);
  });
}

setupViteServer().catch((err) => {
  console.error('Failed to start server:', err);
});
