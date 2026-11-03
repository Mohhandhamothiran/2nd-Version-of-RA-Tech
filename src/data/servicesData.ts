import type { ServiceCategory } from '../types/index.ts';

export interface ServiceDetail {
  id: string;
  category: ServiceCategory;
  shortTitle: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  benefits: string[];
  pricingIndicator: string;
  turnaroundTime: string;
  chennaiCoverage: string;
  seoKeywords: string[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'it-hardware',
    category: 'IT Hardware & Infrastructure',
    shortTitle: 'IT Hardware & Servers',
    tagline: 'Enterprise Server Stacks, Workstations & Network Racks in Chennai',
    description:
      'End-to-end design, procurement, setup, and deployment of enterprise server clusters, high-capacity rack cabinets, business desktops, and mission-critical hardware for Chennai enterprises and data closets.',
    keyFeatures: [
      'Dell PowerEdge, HPE ProLiant & Lenovo ThinkSystem server deployment',
      'Hardware RAID 1/5/10 configuration, hot-spare testing & SAS drive replacement',
      'Server room rack organization, cable management & cooling assessments',
      'Power redundancy setup with APC and Eaton online UPS integration',
      'Active Directory domain controller provisioning & virtualization (VMware/Proxmox)'
    ],
    benefits: [
      'Zero downtime server migrations for Chennai IT corridors',
      'OEM warranty certified genuine parts & spares',
      'Rapid on-site replacement within 4 hours in Guindy & OMR'
    ],
    pricingIndicator: 'Custom enterprise quotes / Project-based',
    turnaroundTime: 'Same-day emergency response',
    chennaiCoverage: 'Kundrathur, Thirumudivakkam, Sriperumbuthur, Porur, Guindy, Ambattur',
    seoKeywords: ['IT Infrastructure Solutions Chennai', 'Server Solutions Chennai', 'Enterprise Hardware Chennai']
  },
  {
    id: 'backup-storage',
    category: 'Backup & Storage Solutions',
    shortTitle: 'Backup & Storage',
    tagline: 'Automated Cloud & On-Premises Disaster Recovery Infrastructure',
    description:
      'Robust hybrid data backup, SAN/NAS storage arrays, and immutable ransomware-proof archive architectures ensuring zero data loss and compliance with Indian data sovereignty guidelines.',
    keyFeatures: [
      'Synology, QNAP & TrueNAS enterprise storage deployment',
      'Automated 3-2-1 backup strategy with encrypted off-site cloud replication',
      'Instant Bare-Metal recovery drills and business continuity planning',
      'Ransomware snapshot immutability and air-gapped storage volumes',
      'High-throughput 10GbE network attached storage for video & medical archives'
    ],
    benefits: [
      'Zero data loss guarantee with automated daily backup verification',
      'Compliance with ISO 27001 and RBI banking data retention norms',
      'Cloud storage bandwidth optimization for Indian ISPs'
    ],
    pricingIndicator: 'From ₹8,500 for SME setups',
    turnaroundTime: '24-48 hours initial architecture deployment',
    chennaiCoverage: 'All Chennai zones, including Kanchipuram and Chengalpattu clusters',
    seoKeywords: ['NAS Storage Chennai', 'Data Backup Solutions Chennai', 'Disaster Recovery Chennai']
  },
  {
    id: 'printer-services',
    category: 'Printer Sales, Repair & Maintenance',
    shortTitle: 'Printer Sales & Repair',
    tagline: 'LaserJet, MFP, Plotter Maintenance & Corporate Toner Contracts',
    description:
      'Professional sales, doorstep servicing, fuser rebuilds, roller replacements, and managed print services for HP, Canon, Epson, Brother, and Ricoh printers across Chennai offices.',
    keyFeatures: [
      'On-site diagnosis and repair of paper jams, fuser failure, and blank lines',
      'High-yield OEM and premium toner cartridge supply at wholesale rates',
      'Network MFP setup, scan-to-email and secure PIN release printing',
      'A3 architectural plotter and heavy-duty bar code label printer repair',
      'Pay-per-page Managed Print Services (MPS) to reduce corporate printing overhead'
    ],
    benefits: [
      'Over 40% reduction in monthly enterprise toner & maintenance costs',
      'Loaner printer provided free during complex workshop fuser repairs',
      'Doorstep pickup and return across all commercial Chennai pincodes'
    ],
    pricingIndicator: 'Repairs from ₹450 / Toner from ₹650',
    turnaroundTime: 'Within 2 hours in central Chennai',
    chennaiCoverage: 'Mount Road, Nungambakkam, Parrys, T. Nagar, Kodambakkam',
    seoKeywords: ['Printer Repair Chennai', 'HP LaserJet Service Chennai', 'Managed Print Services Chennai']
  },
  {
    id: 'cybersecurity',
    category: 'Cybersecurity & Endpoint Protection',
    shortTitle: 'Cybersecurity & Firewalls',
    tagline: 'Next-Gen Endpoint Defense, Fortinet Firewalls & Threat Eradication',
    description:
      'Multi-layered digital perimeter defense, hardware firewall installation, centralized antivirus, email spam filtration, and rapid incident response against ransomware and credential theft.',
    keyFeatures: [
      'Fortinet FortiGate, Sophos XGS & SonicWall perimeter gateway firewalls',
      'Centralized EDR/XDR endpoint protection (Bitdefender GravityZone / SentinelOne)',
      'Secure multi-branch IPSec & SSL VPN setup for remote employees',
      'Vulnerability scanning, open port audits & LAN segmentation',
      'Emergency ransomware eradication and forensic post-incident recovery'
    ],
    benefits: [
      'Prevent unauthorized lateral movement and insider data exfiltration',
      'Real-time automated blocking of phishing domains and malicious executables',
      'CISO-level security reporting for client enterprise audits'
    ],
    pricingIndicator: 'Annual licenses from ₹890 / endpoint',
    turnaroundTime: 'Immediate incident triage / 4-hour firewall configuration',
    chennaiCoverage: 'Tidel Park, Ascendas OMR, Guindy, Ramanujan IT City',
    seoKeywords: ['Cybersecurity Chennai', 'Firewall Installation Chennai', 'Endpoint Security Chennai']
  },
  {
    id: 'laptop-repair',
    category: 'Laptop Repair & Upgrades',
    shortTitle: 'Laptop Repair & Upgrades',
    tagline: 'Chip-Level Motherboard Diagnostics, Display Replacement & SSD Speedups',
    description:
      'Chennai’s trusted hardware lab for MacBook, Dell, Lenovo, HP, Asus, and Acer laptops. Expert chip-level BGA reballing, liquid spill restoration, broken hinge fabrication, and high-speed NVMe upgrades.',
    keyFeatures: [
      'Advanced chip-level BGA rework and power IC short-circuit diagnosis',
      'Original OLED / IPS screen replacement and keyboard swaps',
      'NVMe SSD speed upgrades boosting boot and app load times up to 10x',
      'Liquid damage ultrasonic cleaning and corrosion reversal',
      'Custom gaming laptop thermal repasting (Arctic MX-6 / Liquid Metal)'
    ],
    benefits: [
      'Genuine Grade-A replacement components with 90-day warranty',
      'Doorstep express pickup & delivery across Chennai',
      'No diagnosis fee if repair is not technically feasible'
    ],
    pricingIndicator: 'SSD upgrades from ₹1,499 / Chip repair from ₹1,200',
    turnaroundTime: 'Express 4-hour repair available for standard issues',
    chennaiCoverage: 'Kundrathur, Thirumudivakkam, Sriperumbuthur, Porur, Tambaram, Velachery',
    seoKeywords: ['Laptop Repair Chennai', 'MacBook Repair Chennai', 'Computer Sales and Service Chennai']
  },
  {
    id: 'amc-contracts',
    category: 'Annual Maintenance Contracts',
    shortTitle: 'Computer AMC Services',
    tagline: 'Comprehensive & Non-Comprehensive AMC for Chennai Businesses',
    description:
      'Guaranteed IT uptime for offices, factories, schools, and hospitals in Chennai. Includes monthly preventive maintenance, unlimited on-site support visits, emergency standby systems, and regular health audits.',
    keyFeatures: [
      'Monthly preventive maintenance: hardware cleaning, OS patch audits, thermal checks',
      'Dedicated relationship engineer assigned to your Chennai premises',
      'Unlimited breakdown service calls with guaranteed 2-hour response SLA',
      'Quarterly inventory reporting and IT infrastructure optimization roadmap',
      'Free standby laptops and desktop nodes during prolonged repairs'
    ],
    benefits: [
      'Eliminate unexpected IT downtime and costly emergency call-out bills',
      'Extend workstation operating lifespan by 3+ years',
      'Fixed predictable annual operational IT budget'
    ],
    pricingIndicator: 'SME plans from ₹1,200 / node / year',
    turnaroundTime: 'Dedicated 2-hour emergency SLA',
    chennaiCoverage: 'Across Tamil Nadu: Chennai, Sriperumbuthur, Coimbatore, Hosur, Madurai, Salem',
    seoKeywords: ['Computer AMC Services Tamil Nadu', 'Annual Maintenance Contract Chennai', 'IT AMC Support Tamil Nadu']
  },
  {
    id: 'rentals',
    category: 'Desktop & Laptop Rentals',
    shortTitle: 'Desktop & Laptop Rentals',
    tagline: 'Flexible Short-Term & Long-Term IT Equipment Leasing in Chennai',
    description:
      'Cost-effective rental laptops, high-performance desktops, and CAD/design workstations for software bootcamps, project contractors, remote teams, and sudden business expansion without capital expenditure.',
    keyFeatures: [
      'Intel Core i5/i7/i9 and AMD Ryzen business laptops with 16GB–64GB RAM',
      'Dedicated GPU rendering workstations for architectural CAD and 4K video editing',
      'Bulk inventory ready for 10 to 200+ unit corporate deployments',
      'Pre-loaded with licensed Windows 11 Pro, MS Office, and security software',
      'Complimentary on-site maintenance and instant swap-out replacement'
    ],
    benefits: [
      'Zero upfront Capex; 100% tax-deductible operational business expense',
      'Flexible tenure: daily, weekly, monthly, or multi-year contracts',
      'Free delivery, installation, and networking setup across Chennai'
    ],
    pricingIndicator: 'Laptops from ₹1,400 / month on corporate lease',
    turnaroundTime: 'Same-day delivery for batches under 25 units',
    chennaiCoverage: 'OMR, ECR, Siruseri IT Park, Guindy, Koyambedu',
    seoKeywords: ['Laptop Rental Chennai', 'Desktop Rental Chennai', 'Computer Rental Chennai']
  },
  {
    id: 'networking-cctv',
    category: 'Networking & CCTV Solutions',
    shortTitle: 'Networking & CCTV',
    tagline: 'Cat6 Structured Cabling, Fiber Splicing & High-Definition CCTV',
    description:
      'Commercial network infrastructure design, rack dressing, multi-floor Wi-Fi heatmapping, UniFi mesh setup, and IP CCTV surveillance systems with mobile remote monitoring for Chennai commercial properties.',
    keyFeatures: [
      'Structured Cat6/Cat6A copper cabling and OM3/OM4 fiber optic fusion splicing',
      'Hikvision, CP PLUS & Dahua 4K IP cameras with night-vision and AI tripwire alerts',
      'Ubiquiti UniFi, Cisco & Aruba seamless enterprise wireless roaming',
      'Server rack patch panel punch-down, Fluke network cable certification testing',
      'Remote live mobile view setup for business owners on iOS and Android'
    ],
    benefits: [
      'Crystal-clear 24/7 video recording with high-compression H.265+ NVRs',
      'Eliminate dead zones with high-density gigabit business Wi-Fi',
      'Neat, labeled, and certified structured cabling that simplifies troubleshooting'
    ],
    pricingIndicator: 'CCTV packages from ₹12,999 (4-cam HD setup)',
    turnaroundTime: 'Site inspection within 24 hours',
    chennaiCoverage: 'Guindy, Alwarpet, Kilpauk, Madhavaram, Ambattur Industrial Estate',
    seoKeywords: ['CCTV Installation Chennai', 'Networking Solutions Chennai', 'Structured Cabling Chennai']
  }
];
