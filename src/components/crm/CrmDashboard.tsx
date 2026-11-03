import React from 'react';
import { PhoneCall, Clock, CheckCircle2, AlertTriangle, TrendingUp, AlertCircle } from 'lucide-react';
import type { DashboardStats } from '../../types/index.ts';

interface CrmDashboardProps {
  stats: DashboardStats | null;
  onFilterClick?: (status: string) => void;
}

export const CrmDashboard: React.FC<CrmDashboardProps> = ({ stats, onFilterClick }) => {
  if (!stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 bg-slate-900 rounded-lg border border-slate-800" />
        ))}
      </div>
    );
  }

  const kpis = [
    {
      id: 'total',
      label: 'Total Calls Logged',
      value: stats.totalCalls,
      icon: <PhoneCall className="w-4 h-4 text-cyan-400" />,
      filter: 'all',
      color: 'text-white'
    },
    {
      id: 'inprogress',
      label: 'In Progress (Active)',
      value: stats.inProgressCalls,
      icon: <Clock className="w-4 h-4 text-sky-400" />,
      filter: 'In Progress',
      color: 'text-sky-400'
    },
    {
      id: 'pending',
      label: 'Pending Action / Spares',
      value: stats.pendingCalls,
      icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
      filter: 'Pending',
      color: 'text-amber-400'
    },
    {
      id: 'resolved',
      label: 'Resolved & Closed',
      value: stats.resolvedCalls + stats.closedCalls,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      filter: 'Resolved',
      color: 'text-emerald-400'
    },
    {
      id: 'overdue',
      label: 'Overdue Follow-ups',
      value: stats.overdueFollowUps,
      icon: <AlertCircle className="w-4 h-4 text-rose-400" />,
      filter: 'overdue',
      color: stats.overdueFollowUps > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'
    },
    {
      id: 'rate',
      label: 'SLA Resolution Rate',
      value: `${stats.resolutionRatePercent}%`,
      icon: <TrendingUp className="w-4 h-4 text-cyan-400" />,
      filter: 'all',
      color: 'text-cyan-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {kpis.map((kpi) => (
        <button
          key={kpi.id}
          type="button"
          onClick={() => onFilterClick && onFilterClick(kpi.filter)}
          className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-left flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="truncate pr-1 text-[11px] font-medium">{kpi.label}</span>
            {kpi.icon}
          </div>
          <div className={`text-2xl font-bold font-mono tracking-tight tabular-nums ${kpi.color}`}>
            {kpi.value}
          </div>
        </button>
      ))}
    </div>
  );
};
