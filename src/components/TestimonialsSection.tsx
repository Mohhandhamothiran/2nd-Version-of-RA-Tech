import React from 'react';
import { Star, Building2, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 'test-1',
      author: 'Suresh Ramachandran',
      role: 'VP of Technology',
      company: 'Tidel Corp Solutions',
      location: 'OMR, Chennai',
      quote:
        'When our primary domain controller server crashed on a Monday morning with a degraded RAID array, RA Tech Solutions had a senior hardware engineer at our OMR office within 45 minutes with a hot-spare SAS drive. Zero data was lost and our 120-member team was fully back online before noon.',
      metric: 'Zero Production Downtime'
    },
    {
      id: 'test-2',
      author: 'K. Sundaram',
      role: 'Operations Director',
      company: 'Kavin Logistics & Warehousing',
      location: 'Sriperumbudur Industrial Corridor, TN',
      quote:
        'We signed up for RA Tech Solutions Corporate Gold AMC covering 65 desktop terminals and our 32-camera Hikvision security network. In 12 months, our recurring hardware maintenance budget dropped by 34% because of their bi-weekly preventive tune-ups.',
      metric: '34% IT Cost Reduction'
    },
    {
      id: 'test-3',
      author: 'Dr. Priya Swaminathan',
      role: 'Clinic Administrator',
      company: 'MedFirst Specialty Clinic',
      location: 'Coimbatore & Chennai Branches',
      quote:
        'Their backup and Synology NAS deployment solved our patient radiology imaging archive issues across both our centers. The immutable cloud replication gives our medical board complete peace of mind, fully compliant with clinical data retention regulations.',
      metric: '100% Data Protection'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            Verified Client Outcomes Across Tamil Nadu
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Trusted by Enterprise IT Leaders Across Tamil Nadu
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Real feedback from enterprise managers across Chennai, Thirumudivakkam, Sriperumbudur, Coimbatore, and Hosur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-cyan-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="font-semibold text-white text-sm">
                  {item.author}
                </div>
                <div className="text-xs text-slate-400">
                  {item.role} · {item.company}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400/90 mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{item.location}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-emerald-400 font-semibold">{item.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
