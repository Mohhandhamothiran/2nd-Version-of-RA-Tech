import React, { useState } from 'react';
import { 
  Check, ShieldCheck, Zap, Clock, ArrowRight, Calculator, 
  Server, Wifi, MessageSquare, X 
} from 'lucide-react';

interface AMCPlansSectionProps {
  openQuoteModal: (planName?: string) => void;
}

type PlanTier = 'silver' | 'gold' | 'platinum';

export const AMCPlansSection: React.FC<AMCPlansSectionProps> = ({ openQuoteModal }) => {
  const [activePlan, setActivePlan] = useState<PlanTier>('gold');
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);
  const [nodeCount, setNodeCount] = useState<number>(25);
  const [serverCount, setServerCount] = useState<number>(1);
  const [networkUnitCount, setNetworkUnitCount] = useState<number>(2);
  const [tenureYears, setTenureYears] = useState<number>(1);

  const plans = [
    {
      id: 'silver' as PlanTier,
      name: 'Silver AMC Plan',
      target: 'Startups & Growing Clinics',
      scale: '5 to 20 Systems / Nodes',
      unitRate: 1200,
      price: '₹1,200',
      period: 'per system / year',
      sla: '4-Hour Response SLA',
      features: [
        'Monthly physical dust cleaning & blower maintenance',
        'OS performance optimization & cache cleaning',
        'Antivirus definition updates & malware scans',
        'Printer and peripheral network connectivity check',
        'Unlimited breakdown support calls (9 AM – 7 PM)',
        'Quarterly hardware health diagnostic reports'
      ],
      popular: false
    },
    {
      id: 'gold' as PlanTier,
      name: 'Gold Corporate AMC',
      target: 'Mid-Market IT & Logistics Offices',
      scale: '20 to 75 Systems / Workstations',
      unitRate: 1850,
      price: '₹1,850',
      period: 'per system / year',
      sla: '2-Hour Rapid On-Site SLA',
      features: [
        'Everything in Silver AMC Plan included',
        'Dedicated senior relationship engineer assigned',
        'Bi-weekly preventive maintenance visits',
        'Fortinet / SonicWall firewall & VPN monitoring',
        'NAS & cloud automated backup health verification',
        'Standby desktop/laptop provided during long repairs',
        'Discounted OEM spare part replacement pricing'
      ],
      popular: true
    },
    {
      id: 'platinum' as PlanTier,
      name: 'Platinum Mission-Critical',
      target: '24/7 BPOs, Hospitals & Manufacturing',
      scale: '75+ Nodes & Server Racks',
      unitRate: 2600,
      price: '₹2,600',
      period: 'per system / year',
      sla: '1-Hour Guaranteed Emergency SLA',
      features: [
        'Everything in Gold Corporate AMC included',
        'Option for dedicated on-site resident engineer',
        '24/7 emergency telephone & on-site dispatch',
        'Server room UPS and thermal environment audits',
        'Ransomware immutable air-gapped disaster drills',
        'Zero-labor charges on all hardware upgrades',
        'Executive CISO compliance & audit sign-off reports'
      ],
      popular: false
    }
  ];

  const currentPlan = plans.find((p) => p.id === activePlan) || plans[1];

  // Base 1-Year Infrastructure Costs
  const baseWorkstationCostAnnual = nodeCount * currentPlan.unitRate;
  const serverCostAnnual = serverCount * 4500;
  const networkCostAnnual = networkUnitCount * 2500;
  const subtotalPerYear = baseWorkstationCostAnnual + serverCostAnnual + networkCostAnnual;

  // Multi-Year Total (Multiplied by selected tenure)
  const rawContractTotal = subtotalPerYear * tenureYears;

  // Tenure Discount (5% for 2 years, 10% for 3 years)
  const discountRate = tenureYears === 3 ? 0.10 : tenureYears === 2 ? 0.05 : 0;
  const totalDiscountAmount = Math.round(rawContractTotal * discountRate);
  const finalContractTotal = rawContractTotal - totalDiscountAmount;

  // Effective annual & monthly rates
  const effectiveAnnualRate = Math.round(finalContractTotal / tenureYears);
  const monthlyEquivalent = Math.round(effectiveAnnualRate / 12);
  const estimatedDowntimeSavings = Math.round(finalContractTotal * 0.38);

  const handleSelectPlanClick = (planId: PlanTier) => {
    setActivePlan(planId);
    setIsCalculatorModalOpen(true);

    // Default node scale based on tier
    if (planId === 'silver' && nodeCount > 20) {
      setNodeCount(15);
    } else if (planId === 'gold' && (nodeCount < 20 || nodeCount > 75)) {
      setNodeCount(35);
    } else if (planId === 'platinum' && nodeCount < 75) {
      setNodeCount(80);
    }
  };

  const handleRequestQuotationWithDetails = () => {
    setIsCalculatorModalOpen(false);
    const summaryStr = `Annual Maintenance Contracts - ${currentPlan.name} (${nodeCount} Workstations, ${serverCount} Servers, ${networkUnitCount} Switches - ${tenureYears} Year Contract: ₹${finalContractTotal.toLocaleString('en-IN')})`;
    openQuoteModal(summaryStr);
  };

  const whatsAppText = encodeURIComponent(
    `Hi RA Tech Solutions, I calculated an AMC estimate for ${currentPlan.name}:\n` +
    `• Workstations: ${nodeCount} systems\n` +
    `• Servers: ${serverCount}\n` +
    `• Network/Firewalls: ${networkUnitCount}\n` +
    `• Contract Tenure: ${tenureYears} Year(s)\n` +
    `• Total ${tenureYears}-Year Value: ₹${finalContractTotal.toLocaleString('en-IN')} (Effective: ₹${effectiveAnnualRate.toLocaleString('en-IN')}/year)\n` +
    `Please schedule an on-site hardware audit at our facility in Tamil Nadu.`
  );

  return (
    <section id="amc-section" className="py-20 bg-slate-950 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="uppercase tracking-wider">Computer AMC Services Tamil Nadu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Guaranteed IT Uptime with Annual Maintenance Contracts
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            Eliminate unpredictable IT breakdown expenses. Select any plan below to open the interactive AMC Calculator popup with custom node counts, server add-ons, and multi-year estimates.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border p-8 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 text-[11px] font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Most Popular Across Tamil Nadu
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {plan.sla}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-medium mb-6">
                  Best for {plan.target} · {plan.scale}
                </p>

                <div className="flex items-baseline gap-2 pb-6 border-b border-slate-800">
                  <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                    Contract Deliverables:
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleSelectPlanClick(plan.id)}
                  className={`w-full py-3 px-4 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <Calculator className="w-4 h-4" />
                  <span>Select {plan.name.split(' ')[0]} AMC & Calculate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AMC Guarantee Strip - Zero Pill Unboxed Text */}
        <div className="mt-12 p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
          <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
          <div>
            <span className="font-semibold text-white">Standby Hardware Guarantee: </span>
            <span>Temporary backup laptops and network switches delivered within 3 hours during hardware repairs across Tamil Nadu.</span>
          </div>
        </div>
      </div>

      {/* Pop-up Window: Interactive AMC Cost Calculator Modal */}
      {isCalculatorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto relative shadow-2xl shadow-cyan-950/50">
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-t-2xl" />

            {/* Modal Header with Plan Switcher and Close Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  <Calculator className="w-4 h-4" />
                  <span>Interactive AMC Cost Calculator</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Calculate Contract: <span className="text-cyan-300">{currentPlan.name}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Adjust workstations, add-on servers, and select commitment tenure for an instant quotation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Plan Switcher Pills */}
                <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
                  {plans.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePlan(p.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        activePlan === p.id
                          ? 'bg-cyan-400 text-slate-950 font-bold shadow'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {p.name.split(' ')[0]} {p.popular ? '★' : ''}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsCalculatorModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close Calculator"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Sliders & Inputs (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. Workstation Count Slider */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-white block">
                        Desktop & Laptop Workstations
                      </label>
                      <span className="text-xs text-slate-400">
                        Annual rate: <strong className="text-cyan-400 font-mono">₹{currentPlan.unitRate}/node/yr</strong> ({currentPlan.sla})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={5}
                        max={300}
                        value={nodeCount}
                        onChange={(e) => setNodeCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 px-2 py-1 text-right font-mono font-bold text-base text-cyan-300 bg-slate-900 border border-cyan-500/40 rounded focus:outline-none"
                      />
                      <span className="text-xs text-slate-400 font-mono">nodes</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={5}
                    max={200}
                    step={1}
                    value={nodeCount}
                    onChange={(e) => setNodeCount(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />

                  {/* Quick Scale Presets */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                    <span>Quick presets:</span>
                    {[10, 25, 50, 75, 120].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setNodeCount(preset)}
                        className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          nodeCount === preset
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        {preset} nodes
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Add-on Infrastructure Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Servers Counter */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="text-xs font-semibold text-white block">Dedicated Servers</span>
                          <span className="text-[11px] text-slate-400 font-mono">+₹4,500 / server / yr</span>
                        </div>
                      </div>
                      <div className="flex items-center border border-slate-700 rounded overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setServerCount(Math.max(0, serverCount - 1))}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-white font-mono"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 bg-slate-900 font-mono text-xs font-bold text-white">
                          {serverCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setServerCount(serverCount + 1)}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-white font-mono"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Includes RAID health, SAS drive checks, VM audits & thermal surveillance.
                    </p>
                  </div>

                  {/* Network Switches & Firewalls */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-cyan-400" />
                        <div>
                          <span className="text-xs font-semibold text-white block">Managed Switches & Firewalls</span>
                          <span className="text-[11px] text-slate-400 font-mono">+₹2,500 / device / yr</span>
                        </div>
                      </div>
                      <div className="flex items-center border border-slate-700 rounded overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setNetworkUnitCount(Math.max(0, networkUnitCount - 1))}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-white font-mono"
                        >
                          -
                        </button>
                        <span className="px-3 py-0.5 bg-slate-900 font-mono text-xs font-bold text-white">
                          {networkUnitCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setNetworkUnitCount(networkUnitCount + 1)}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-white font-mono"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Fortinet/Cisco gateway firmware patches, VLAN audits & port security.
                    </p>
                  </div>
                </div>

                {/* 3. Contract Tenure Selector with Multi-Year Discounts */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-white block">Contract Commitment Tenure</span>
                    <span className="text-[11px] text-slate-400">Lock in rates against inflation & hardware price rises</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    {[
                      { years: 1, label: '1 Year', discount: null },
                      { years: 2, label: '2 Years', discount: '5% OFF' },
                      { years: 3, label: '3 Years', discount: '10% OFF' }
                    ].map((t) => (
                      <button
                        key={t.years}
                        type="button"
                        onClick={() => setTenureYears(t.years)}
                        className={`px-3 py-1.5 rounded border transition-colors cursor-pointer text-center ${
                          tenureYears === t.years
                            ? 'bg-cyan-400 text-slate-950 font-bold border-cyan-400 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div>{t.label}</div>
                        {t.discount && (
                          <div className="text-[9px] font-bold text-emerald-400 uppercase">
                            {t.discount}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Output Price Card & CTAs (5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-5 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    Calculated AMC Investment
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    SLA: {currentPlan.sla}
                  </span>
                </div>

                {/* Big Price Display */}
                <div>
                  <div className="text-xs text-slate-400">
                    Total {tenureYears}-Year Contract Value:
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                      ₹{finalContractTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      for {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'} (+GST)
                    </span>
                  </div>
                  {totalDiscountAmount > 0 && (
                    <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center justify-between">
                      <span>Multi-year savings ({tenureYears === 3 ? '10%' : '5%'} OFF):</span>
                      <span className="font-bold">-₹{totalDiscountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="text-xs text-cyan-300/90 font-mono mt-1">
                    Effective: ₹{effectiveAnnualRate.toLocaleString('en-IN')} / yr (≈ ₹{monthlyEquivalent.toLocaleString('en-IN')} / mo)
                  </div>
                </div>

                {/* Breakdown Summary */}
                <div className="space-y-2 text-xs border-t border-slate-800 pt-3 text-slate-300">
                  <div className="flex justify-between">
                    <span>{nodeCount} × {currentPlan.name} Nodes ({tenureYears} yr{tenureYears > 1 ? 's' : ''}):</span>
                    <span className="font-mono text-white">₹{(baseWorkstationCostAnnual * tenureYears).toLocaleString('en-IN')}</span>
                  </div>
                  {serverCount > 0 && (
                    <div className="flex justify-between">
                      <span>{serverCount} × Server Maintenance ({tenureYears} yr{tenureYears > 1 ? 's' : ''}):</span>
                      <span className="font-mono text-white">₹{(serverCostAnnual * tenureYears).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {networkUnitCount > 0 && (
                    <div className="flex justify-between">
                      <span>{networkUnitCount} × Network Switches ({tenureYears} yr{tenureYears > 1 ? 's' : ''}):</span>
                      <span className="font-mono text-white">₹{(networkCostAnnual * tenureYears).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {totalDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>{tenureYears}-Year Tenure Discount:</span>
                      <span className="font-mono">-₹{totalDiscountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-800/80 text-emerald-400 font-semibold">
                    <span>Est. Prevented Downtime Savings:</span>
                    <span className="font-mono">~₹{estimatedDowntimeSavings.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Included Guarantees */}
                <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Included at No Extra Charge:</span>
                  </div>
                  <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-300">
                    <li>{Math.max(1, Math.floor(nodeCount / 15))} Standby replacement laptops in reserve</li>
                    <li>Bi-weekly on-site preventive maintenance visits</li>
                    <li>Priority direct engineer dispatch from Mangadu, Chennai</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleRequestQuotationWithDetails}
                    className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/25 cursor-pointer"
                  >
                    <span>Request Quotation for This Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/917904463033?text=${whatsAppText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/70 text-emerald-300 font-semibold rounded-md text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Send Calculated Quote via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
