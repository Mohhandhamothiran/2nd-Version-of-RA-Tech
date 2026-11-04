import React from 'react';
import { Target, Compass, ShieldCheck, Building2, Award, Clock, CheckCircle2, Wrench, Server } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const statsData = [
    {
      value: '6+',
      label: 'Years Operating Experience',
      sublabel: 'Serving Tamil Nadu Enterprises',
      icon: <Award className="w-5 h-5 text-cyan-400" />
    },
    {
      value: '20+',
      label: 'Corporate AMC Clients',
      sublabel: 'Industrial & IT Hub Partners',
      icon: <Building2 className="w-5 h-5 text-cyan-400" />
    },
    {
      value: '99.8%',
      label: 'SLA Compliance Rate',
      sublabel: 'Guaranteed Rapid Dispatch',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />
    }
  ];

  const pillars = [
    {
      number: '01',
      title: 'Central Engineering Hub & Cleanroom Lab',
      desc: 'Centrally located at No.79, Sivasakthi Complex, Kundrathur Main Road, Mangadu, Chennai, allowing rapid technician mobilization across Thirumudivakkam, Sriperumbuthur, and Tamil Nadu industrial districts.'
    },
    {
      number: '02',
      title: 'Multi-Brand OEM Certified Engineers',
      desc: 'Our certified engineering staff hold technical credentials in Dell Server Management, Cisco CCNA routing, Fortinet NSE security, and Apple/Lenovo hardware repair.'
    },
    {
      number: '03',
      title: 'Pan-Tamil Nadu Enterprise Reach',
      desc: 'We support multi-branch corporate offices, warehouses, and manufacturing plants across Chennai, Coimbatore, Hosur, Salem, and Tirupur with unified SLA standards.'
    },
    {
      number: '04',
      title: 'Predictable AMC Uptime SLAs',
      desc: 'Supporting corporate workstations across Tamil Nadu with tailored Annual Maintenance Contracts that include free loaner standby units and bi-weekly PM visits.'
    }
  ];

  return (
    <section id="about-section" className="py-20 bg-slate-950 border-t border-slate-800 text-slate-100 relative overflow-hidden">
      {/* Background Subtle Tech Matrix Effect */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#00f0ff 1px, transparent 1px)`,
          backgroundSize: `32px 32px`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span className="uppercase tracking-wider">Company Profile & Regional Heritage</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Est. 2018 in Tamil Nadu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Smart Technology. Secure Solutions.
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            RA Tech Solutions is a premier full-lifecycle IT infrastructure, computer hardware, surveillance, and systems support provider serving businesses across Tamil Nadu from our central Chennai engineering facility.
          </p>
        </div>

        {/* Story & Mission / Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              Founded with the objective of eliminating chronic computer downtime for Tamil Nadu’s booming tech parks, auto clusters, and manufacturing zones, RA Tech Solutions bridges the gap between expensive tier-1 conglomerates and unreliable local corner vendors.
            </p>
            <p>
              We operate an advanced diagnostic repair facility equipped with German BGA rework stations, digital oscilloscopes, and cleanroom data recovery equipment at Mangadu. Whether commissioning a 100-node network rack in Sriperumbuthur, establishing multi-site IP CCTV surveillance for an auto component plant in Hosur, or maintaining hospital server clusters in Coimbatore, our team delivers enterprise discipline to every contract.
            </p>

            {/* Redefined Stats Bar: 6+ Years, 20+ Corporate Clients, 99.8% SLA */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/80">
              {statsData.map((stat, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
                      {stat.value}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white tracking-tight">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {stat.sublabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Mission Box */}
            <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-lg">
              <div className="flex items-center gap-2.5 text-cyan-400">
                <Target className="w-5 h-5" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Our Mission
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                To empower Tamil Nadu businesses with uninterrupted IT uptime, robust digital security perimeters, and honest hardware maintenance delivered with speed, certified expertise, and predictable economics.
              </p>
            </div>

            {/* Vision Box */}
            <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-lg">
              <div className="flex items-center gap-2.5 text-blue-400">
                <Compass className="w-5 h-5" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Our Vision
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                To be Tamil Nadu’s most trusted single-source technology partner for enterprise hardware infrastructure, cybersecurity compliance, and complete computer lifecycle management.
              </p>
            </div>

            {/* Guarantees Summary */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block mb-0.5">Guaranteed SLA & Emergency Standby</span>
                <span className="text-slate-300 leading-relaxed">
                  2-hour rapid response across industrial zones with free loaner workstations delivered during major repairs.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us - Editorial Numbering Cards */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 tracking-tight">
            Why Tamil Nadu Enterprises Trust RA Tech Solutions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-2xl font-mono font-bold text-cyan-400 block mb-3 group-hover:text-cyan-300 transition-colors">
                    {pillar.number}.
                  </span>
                  <h4 className="text-base font-semibold text-white tracking-tight mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
