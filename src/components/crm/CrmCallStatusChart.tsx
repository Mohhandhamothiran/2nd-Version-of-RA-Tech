import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import type { DashboardStats } from '../../types/index.ts';

interface CrmCallStatusChartProps {
  stats: DashboardStats;
  onFilterClick?: (status: string) => void;
}

interface StatusDataPoint {
  name: string;
  value: number;
  color: string;
  filterKey: string;
}

export const CrmCallStatusChart: React.FC<CrmCallStatusChartProps> = ({ stats, onFilterClick }) => {
  const chartData: StatusDataPoint[] = [
    {
      name: 'New',
      value: stats.newCalls,
      color: '#38bdf8', // sky-400
      filterKey: 'New'
    },
    {
      name: 'In-Progress',
      value: stats.inProgressCalls,
      color: '#06b6d4', // cyan-500
      filterKey: 'In Progress'
    },
    {
      name: 'Pending',
      value: stats.pendingCalls,
      color: '#f59e0b', // amber-500
      filterKey: 'Pending'
    },
    {
      name: 'Resolved',
      value: stats.resolvedCalls,
      color: '#10b981', // emerald-500
      filterKey: 'Resolved'
    },
    {
      name: 'Closed',
      value: stats.closedCalls,
      color: '#64748b', // slate-500
      filterKey: 'Closed'
    }
  ].filter((item) => item.value > 0);

  const totalFiltered = chartData.reduce((acc, curr) => acc + curr.value, 0);

  // Custom Dark Mode Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as StatusDataPoint;
      const percent = totalFiltered > 0 ? ((data.value / totalFiltered) * 100).toFixed(1) : 0;
      return (
        <div className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-md shadow-xl text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="font-semibold text-white">{data.name} Status</span>
          </div>
          <div className="text-slate-300 font-mono flex items-center justify-between gap-4">
            <span>Volume: <strong className="text-white">{data.value} calls</strong></span>
            <span className="text-cyan-400">({percent}%)</span>
          </div>
          <div className="text-[10px] text-slate-400 italic">
            Click slice to filter table
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Call Status Distribution & Team Performance
            </h3>
            <p className="text-[11px] text-slate-400">
              Interactive Recharts breakdown across New, In-Progress, Pending, and Resolved tickets
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Overall Resolution SLA:</span>
          <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            {stats.resolutionRatePercent}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Recharts Donut Pie Chart (7 cols) */}
        <div className="lg:col-span-7 h-64 relative flex items-center justify-center">
          {chartData.length === 0 ? (
            <div className="text-xs text-slate-500 italic">No call records available for visualization.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                  cursor="pointer"
                  onClick={(entry: any) => onFilterClick && onFilterClick(entry.payload?.filterKey || entry.name || 'all')}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#0f172a"
                      strokeWidth={2}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry: any) => {
                    const data = entry.payload as StatusDataPoint;
                    return (
                      <span className="text-xs text-slate-300 font-mono hover:text-white cursor-pointer mr-3">
                        {value}: <strong className="text-white">{data.value}</strong>
                      </span>
                    );
                  }}
                  onClick={(e: any) => {
                    if (e && e.payload && onFilterClick) {
                      onFilterClick(e.payload.filterKey);
                    }
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}

          {/* Center Donut Label */}
          {chartData.length > 0 && (
            <div className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="text-2xl font-bold font-mono text-white tracking-tight tabular-nums block">
                {stats.totalCalls}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block -mt-1">
                Total Calls
              </span>
            </div>
          )}
        </div>

        {/* Right: Operational Health & Team Workload Metrics (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
            Workload & Efficiency Audit:
          </span>

          {/* Metric 1: Active Workload */}
          <div
            onClick={() => onFilterClick && onFilterClick('In Progress')}
            className="p-2.5 rounded bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                  Active In-Progress Workload
                </div>
                <div className="text-[11px] text-slate-400">Assigned field engineers on-site</div>
              </div>
            </div>
            <span className="text-base font-bold font-mono text-cyan-400 tabular-nums">
              {stats.inProgressCalls}
            </span>
          </div>

          {/* Metric 2: Pending Attention */}
          <div
            onClick={() => onFilterClick && onFilterClick('Pending')}
            className="p-2.5 rounded bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-amber-300">
                  Pending Customer Action / Parts
                </div>
                <div className="text-[11px] text-slate-400">Waiting client clearance or spare parts</div>
              </div>
            </div>
            <span className="text-base font-bold font-mono text-amber-400 tabular-nums">
              {stats.pendingCalls}
            </span>
          </div>

          {/* Metric 3: Resolved & Closed */}
          <div
            onClick={() => onFilterClick && onFilterClick('Resolved')}
            className="p-2.5 rounded bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                  Successfully Resolved Cases
                </div>
                <div className="text-[11px] text-slate-400">Tested and acknowledged by client</div>
              </div>
            </div>
            <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">
              {stats.resolvedCalls + stats.closedCalls}
            </span>
          </div>

          {/* Overdue Alert banner if any */}
          {stats.overdueFollowUps > 0 && (
            <div
              onClick={() => onFilterClick && onFilterClick('overdue')}
              className="p-2.5 rounded bg-rose-950/40 border border-rose-800/80 hover:bg-rose-950/60 transition-colors flex items-center justify-between cursor-pointer text-xs"
            >
              <div className="flex items-center gap-2 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-semibold">{stats.overdueFollowUps} Overdue Follow-ups require attention</span>
              </div>
              <span className="font-mono text-rose-300 font-bold underline">Filter</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
