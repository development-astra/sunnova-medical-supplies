'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  salesChart,
  salesHighlightIndex,
  salesTotalRevenue,
  salesTrendLabel,
} from '@/lib/admin/mock-dashboard-data';

const W = 680;
const H = 240;
const PAD = { top: 20, right: 16, bottom: 28, left: 44 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const Y_TICKS = [0, 10000, 20000, 30000, 40000];
const Y_MAX = 40000;

function fmtK(v: number) {
  return v === 0 ? '$0' : `$${v / 1000}K`;
}

export function SalesOverviewChart() {
  const [active, setActive] = useState<number>(salesHighlightIndex);

  const stepX = PLOT_W / (salesChart.length - 1);
  const pts = salesChart.map((p, i) => {
    const x = PAD.left + i * stepX;
    const y = PAD.top + PLOT_H * (1 - Math.min(p.value, Y_MAX) / Y_MAX);
    return { x, y, ...p };
  });

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1].x.toFixed(1)},${PAD.top + PLOT_H} L${pts[0].x.toFixed(1)},${PAD.top + PLOT_H} Z`;
  const activePt = pts[active];

  // Tooltip box position, clamped horizontally
  const tipW = 118;
  const tipX = Math.min(Math.max(activePt.x - tipW / 2, PAD.left), W - PAD.right - tipW);
  const tipY = Math.max(activePt.y - 56, 2);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 6 }}>
        <div>
          <p className="sa-metric-label" style={{ marginBottom: 4 }}>Total Revenue</p>
          <p className="sa-bignum">{salesTotalRevenue}</p>
          <p className="sa-metric-trend up" style={{ marginTop: 4 }}>
            <ArrowUpRight size={14} /> {salesTrendLabel}
          </p>
        </div>
        <label className="sa-select" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <select
            aria-label="Sales date range"
            defaultValue="30"
            style={{ border: 'none', background: 'transparent', font: 'inherit', color: 'inherit', cursor: 'pointer', outline: 'none' }}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </label>
      </div>

      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Sales overview line chart. Total revenue ${salesTotalRevenue}, ${salesTrendLabel}.`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="sales-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#004296" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#004296" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gridlines + Y labels */}
        {Y_TICKS.map((t) => {
          const y = PAD.top + PLOT_H * (1 - t / Y_MAX);
          return (
            <g key={t}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#eef0f2" strokeWidth="1" />
              <text x={PAD.left - 10} y={y + 4} textAnchor="end" fontSize="10.5" fontFamily="var(--admin-font-body)" fill="rgba(16,24,32,0.5)">
                {fmtK(t)}
              </text>
            </g>
          );
        })}

        {/* X labels */}
        {pts.map((p) => (
          <text key={p.label} x={p.x} y={H - 8} textAnchor="middle" fontSize="10.5" fontFamily="var(--admin-font-body)" fill="rgba(16,24,32,0.5)">
            {p.label}
          </text>
        ))}

        <path d={area} fill="url(#sales-area)" />
        <path d={line} fill="none" stroke="#004296" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Hover hit areas + dots */}
        {pts.map((p, i) => (
          <g key={p.label} onMouseEnter={() => setActive(i)}>
            <rect x={p.x - stepX / 2} y={PAD.top} width={stepX} height={PLOT_H} fill="transparent" style={{ cursor: 'pointer' }} />
            {i === active && (
              <>
                <line x1={p.x} y1={PAD.top} x2={p.x} y2={PAD.top + PLOT_H} stroke="#004296" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <circle cx={p.x} cy={p.y} r="5.5" fill="#fff" stroke="#004296" strokeWidth="2.5" />
              </>
            )}
          </g>
        ))}

        {/* Tooltip callout */}
        <g transform={`translate(${tipX}, ${tipY})`} pointerEvents="none">
          <rect width={tipW} height="46" rx="9" fill="#101820" />
          <text x="12" y="19" fontSize="11" fontFamily="var(--admin-font-body)" fill="rgba(255,255,255,0.7)">
            {activePt.label}, 2025
          </text>
          <text x="12" y="36" fontSize="14" fontWeight="700" fontFamily="var(--admin-font-heading)" fill="#fff">
            ${activePt.value.toLocaleString('en-US')}
          </text>
        </g>
      </svg>
    </div>
  );
}
