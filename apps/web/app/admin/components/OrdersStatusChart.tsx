import { orderStatus, orderStatusTotal } from '@/lib/admin/mock-dashboard-data';

const SIZE = 168;
const STROKE = 22;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const CENTER = SIZE / 2;

/**
 * Donut chart of orders by status. Arc lengths are proportional to the actual
 * counts; the legend shows the labelled values/percentages from the spec.
 */
export function OrdersStatusChart() {
  const total = orderStatus.reduce((sum, s) => sum + s.value, 0) || 1;
  let offset = 0;

  const segments = orderStatus.map((s) => {
    const fraction = s.value / total;
    const dash = fraction * C;
    const seg = { color: s.color, dash, gap: C - dash, rotation: (offset / total) * 360 };
    offset += s.value;
    return seg;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={`Orders by status donut chart. ${orderStatusTotal} total orders.`}
        >
          <circle cx={CENTER} cy={CENTER} r={R} fill="none" stroke="#f1f3f5" strokeWidth={STROKE} />
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={CENTER}
              cy={CENTER}
              r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeDasharray={`${seg.dash.toFixed(2)} ${seg.gap.toFixed(2)}`}
              strokeLinecap="round"
              transform={`rotate(${seg.rotation - 90} ${CENTER} ${CENTER})`}
            />
          ))}
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontFamily: 'var(--admin-font-heading)', fontWeight: 700, fontSize: 30, color: 'var(--sunnova-dark)', lineHeight: 1 }}>
            {orderStatusTotal}
          </span>
          <span style={{ fontFamily: 'var(--admin-font-body)', fontSize: 11.5, color: 'var(--color-text-muted)', marginTop: 2 }}>
            Total Orders
          </span>
        </div>
      </div>

      <ul className="sa-legend" style={{ width: '100%', listStyle: 'none', margin: 0, padding: 0 }}>
        {orderStatus.map((s) => (
          <li key={s.label} className="sa-legend-row">
            <span className="sa-legend-dot" style={{ background: s.color }} />
            <span className="sa-legend-label">{s.label}</span>
            <span className="sa-legend-val">{s.value}</span>
            <span className="sa-legend-pct">({s.percent}%)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
