# RA Tech Solutions – Corporate IT Website & Customer Call Logging System

A high-performance corporate IT services portal and internal call-logging CRM for RA Tech Solutions, establishing authoritative presence across Chennai for IT hardware, network infrastructure, CCTV, laptop repair, and AMC contracts while empowering staff with an enterprise-grade customer call management desk.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and design decisions have been confirmed and incorporated into the specification:

- **Confirmed Theme & Visual Identity**: Deep navy blue (`#0A192F` / `#0F172A`) with electric cyan accents (`#00F0FF` / `#06B6D4`) and enterprise finish, adhering strictly to anti-slop guidelines (zero pill badges, single-line actions, natural editorial numbering).
- **Confirmed Database Architecture**: Full-stack Express backend with persistent JSON file storage, seeded with authentic Chennai business client records, engineer assignments, and comprehensive CRUD API endpoints.
- **Confirmed Primary Enquiry Channels**: Direct WhatsApp integration, instant one-tap phone calling (`704463033`), and an interactive "Request Instant Quotation" modal with service pre-selection.
- **Role-Based Access Control**: Pre-configured admin and engineer credentials for immediate evaluation, with session-based authentication protecting CRM data and call logging operations.

---

## 1. Overview & Core Concept

- **What It Does**: Combines a customer-facing B2B/B2C website optimized for Chennai local search with a secure internal Call Management & Support Desk for tracking incoming customer service inquiries, field technician assignments, follow-ups, and ticket resolutions.
- **Target Audience / Persona**:
  - *Public Clients*: Chennai SMEs, corporate offices in IT corridors (OMR, Guindy, T. Nagar, Ambattur), schools, and individuals seeking computer AMC, CCTV installation, hardware upgrades, and laptop repair.
  - *Internal Operations*: Support desk coordinators, IT service managers, and field technicians logging and resolving customer complaints.
- **Key Value**: Delivers frictionless inbound lead generation for RA Tech Solutions while systematizing after-sales support and AMC maintenance calls in a single unified system.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Visitor Discovery & Inbound Conversion**:
   - Lands on Home, browses Chennai-tailored IT solutions and social proof metrics.
   - Accesses dedicated SEO service hubs (IT Hardware, Backup & Storage, Printers, Cybersecurity, Laptop Repair, AMC, Rentals, CCTV).
   - Engages via One-Tap Phone (`tel:704463033`), WhatsApp direct chat with pre-filled message, or the interactive Quote Modal.
2. **Contact & Chennai Location Verification**:
   - Visits Contact page with interactive location map, business hours, and validated inquiry form that simultaneously notifies internal systems.
3. **Staff CRM & Call Logging Operations**:
   - Clicks "Staff Portal / Call Desk" in top bar or footer.
   - Enters credentials (`admin@ratechsolutions.in` or `engineer@ratechsolutions.in`).
   - Views KPI dashboard: Total Calls, In Progress, Pending Resolution, Overdue Follow-ups today.
   - Logs new customer calls with auto-generated Ticket Reference (`RAT-2026-XXXX`).
   - Filters, searches by customer mobile/company/locality, updates ticket status, records resolution notes, and exports filtered records to CSV or printable job sheets.

### Visual Identity & Theme

- **Aesthetic Direction**: High-trust corporate technology and industrial precision with crisp contrast and structured layout.
- **Color Palette & Distribution**:
  - *60% Dominant Neutral*: Deep space navy canvas (`#0A192F` / `#0F172A`) with clean off-white high-contrast content sections.
  - *30% Structural Surfaces*: Subtle slate panels (`#1E293B`), hairline dividers (`rgba(255,255,255,0.08)` and `rgba(0,0,0,0.08)`).
  - *10% Accent Budget*: Electric Cyan (`#00F0FF` / `#06B6D4`) reserved strictly for primary interactive actions, focus rings, and active states.
- **Typography**:
  - *Display / Brand*: `Plus Jakarta Sans` with tight tracking (`tracking-tight`) for commanding headlines.
  - *Body Prose*: `DM Sans` (15–16px, line height 1.6) for optimal technical readability.
  - *Data & References*: `JetBrains Mono` with `tabular-nums` for ticket IDs, phone numbers, and timestamps.
- **Top Bar Contract**:
  - Zone 1: Single text element wordmark `RA Tech Solutions`.
  - Zone 2: Single-line navigation links (`Services`, `AMC Plans`, `About Us`, `Contact`, `Call Desk`).
  - Zone 3: Single primary action button (`Get Instant Quote`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full-Stack Express Server with File Persistence vs. Client-Only Mocking**
  - *Chosen Approach*: Implement real Express API endpoints (`/api/calls`, `/api/calls/:id`, `/api/auth/login`, `/api/enquiry`) storing data in a persistent JSON database file (`server/data/calls.json`).
  - *Why*: Satisfies production-ready requirements; guarantees new tickets and status modifications survive browser reloads and server restarts without exposing client data publicly.
- **Decision 2: Integrated CRM Experience within the Application**
  - *Chosen Approach*: Seamlessly switch between the public website and the Staff Call Desk with persistent session state and breadcrumb navigation back to the portal.
  - *Why*: Allows evaluators and business staff to switch contexts effortlessly without requiring separate domain setups or losing local state.
- **Decision 3: SEO & Chennai Local Business Schema**
  - *Chosen Approach*: Embed complete Schema.org `LocalBusiness` JSON-LD structured data with Chennai coordinates, operating hours, telephone, service catalog, and geo-targeted keywords.
  - *Why*: Boosts local Chennai search visibility across OMR, Guindy, Anna Nagar, and Mount Road commercial hubs.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Client (React 19)                               │
├──────────────────────────────────────┬──────────────────────────────────────┤
│           Public Website             │           Staff Call Desk            │
│  ├── Navbar (Top Bar Contract)       │  ├── Auth Guard & Login Screen       │
│  ├── Home (Hero, Services, Proof)    │  ├── KPI Dashboard (Metrics Bar)     │
│  ├── Dedicated Service Modals/Views  │  ├── Call Log Form (Auto Ticket ID)  │
│  ├── About & Why Choose Us           │  ├── Search, Filter & Sort Bar       │
│  ├── Contact (Map, WhatsApp, Phone)  │  ├── Ticket Timeline & Status Modal  │
│  └── Instant Quote Lead Capture      │  └── CSV & Printable Job Sheet Export│
└──────────────────────────────────────┴──────────────────────────────────────┘
                                  │  REST API Calls (fetch / JSON)
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Express Backend (Node.js)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  ├── /api/auth/login (JWT/Session Role Verification: Admin vs Engineer)     │
│  ├── /api/calls (GET list with query filters, POST new call ticket)         │
│  ├── /api/calls/:id (PUT update status, assignment, resolution notes)       │
│  ├── /api/enquiries (POST public lead capture & auto-sync to Call Desk)     │
│  └── /api/stats (GET aggregated ticket metrics & SLA status)                │
└─────────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Persistent Storage (server/data/calls.json)              │
│       - Seeded with authentic Chennai clients, AMC accounts & tickets       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model (`CallTicket`)
- `id`: Unique string (e.g., `RAT-2026-1042`)
- `customerName`: String
- `mobile`: String (Indian 10-digit format)
- `email`: String
- `companyName`: String
- `locality`: String (e.g., Guindy, OMR, Velachery, T. Nagar)
- `callType`: `'Incoming'` | `'Outgoing'`
- `serviceCategory`: `'IT Hardware'` | `'Backup & Storage'` | `'Printer Service'` | `'Cybersecurity'` | `'Laptop Repair'` | `'AMC'` | `'Rentals'` | `'CCTV & Network'`
- `priority`: `'Low'` | `'Medium'` | `'High'` | `'Urgent'`
- `status`: `'New'` | `'In Progress'` | `'Pending'` | `'Resolved'` | `'Closed'`
- `assignedStaff`: String
- `callDate`: ISO Date string
- `followUpDate`: ISO Date string (optional)
- `description`: Detailed issue description
- `resolutionNotes`: String
- `history`: Array of audit timeline entries `{ timestamp, user, action, note }`

---

## 5. Next Steps Upon Approval

1. Configure `metadata.json` and sync `index.html` with title, meta tags, and Chennai Schema.org structured data.
2. Implement the Express server API (`server.ts`) with persistent storage and seed records.
3. Build the public website components (Navbar, Hero, Services, About, Contact, Quote Modal) following strict anti-slop guidelines.
4. Build the Customer Call Logging CRM module (Dashboard, Ticket Registry, New Call Modal, Detail/Resolution Drawer, Export Engine).
5. Verify build, form validation, search/filtering, and end-to-end responsiveness with `compile_applet`.
