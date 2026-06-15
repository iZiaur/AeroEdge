import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScanSearch, Activity, ClipboardList } from 'lucide-react';
import './Features.css';

/* ── animation helpers ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

/* ═══════════════════════════════════════════════
   Mockup 1 — Defect Detection Viewer
   ═══════════════════════════════════════════════ */
function DefectMockup() {
  return (
    <div className="defect-viewer">
      {/* bounding boxes */}
      <div className="defect-box defect-box-1" />
      <div className="defect-box defect-box-2" />
      <div className="defect-box defect-box-3" />

      {/* labels */}
      <span className="defect-label">fatigue_crack 97%</span>
      <span className="defect-label-secondary">corrosion 89%</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Mockup 2 — Engine Health Bar Chart (pure CSS)
   ═══════════════════════════════════════════════ */
const bars = [
  { height: 65, color: '#7c3aed', label: 'N2' },
  { height: 90, color: '#10b981', label: 'T24' },
  { height: 45, color: '#7c3aed', label: 'Ps30' },
  { height: 78, color: '#10b981', label: 'phi' },
  { height: 55, color: '#7c3aed', label: 'NRf' },
  { height: 100, color: '#10b981', label: 'BPR' },
];

function EngineChartMockup() {
  return (
    <div className="engine-chart">
      <span className="engine-chart-title">Sensor Importance</span>
      <div className="engine-bars">
        {bars.map((b) => (
          <div className="engine-bar-group" key={b.label}>
            <div
              className="engine-bar"
              style={{
                height: `${b.height}%`,
                background: b.color,
              }}
            />
            <span className="engine-bar-label">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Mockup 3 — Work Orders Mini Table
   ═══════════════════════════════════════════════ */
const rows = [
  { part: 'AE-4012', desc: 'Fan Blade Assy', badge: 'High', badgeClass: 'high' },
  { part: 'AE-7890', desc: 'Turbine Disk', badge: 'OK', badgeClass: 'ok' },
  { part: 'AE-2231', desc: 'Oil Filter Unit', badge: 'Pending', badgeClass: 'pending' },
];

function WorkOrderMockup() {
  return (
    <div className="wo-table">
      <div className="wo-header-row">
        <span>Part No.</span>
        <span>Description</span>
        <span>Status</span>
      </div>

      {rows.map((r) => (
        <div
          className={`wo-row${r.badgeClass === 'high' ? ' highlight' : ''}`}
          key={r.part}
        >
          <span>{r.part}</span>
          <span>{r.desc}</span>
          <span className={`wo-badge ${r.badgeClass}`}>
            {r.badgeClass === 'high' ? `Priority: ${r.badge}` : r.badge}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Card data
   ═══════════════════════════════════════════════ */
const features = [
  {
    Icon: ScanSearch,
    title: 'Defect Detection',
    desc: 'Real-time aircraft surface inspection using YOLOv8-nano. Detects cracks, corrosion, dents, and 3 more defect types in under 50ms.',
    tag: 'Vision Agent • YOLOv8-nano • <50ms',
    Mockup: DefectMockup,
  },
  {
    Icon: Activity,
    title: 'Engine Health Prediction',
    desc: 'Temporal Fusion Transformer predicts engine remaining life with explainable confidence intervals and sensor importance rankings.',
    tag: 'RUL Agent • TFT Model • RMSE ~13 cycles',
    Mockup: EngineChartMockup,
  },
  {
    Icon: ClipboardList,
    title: 'Smart Work Orders',
    desc: 'Autonomous generation of compliance-verified maintenance plans with cost estimates, priority ranking, and regulatory cross-referencing.',
    tag: 'Work Order Agent • LLM-powered • Auto-generated',
    Mockup: WorkOrderMockup,
  },
];

/* ═══════════════════════════════════════════════
   Features Section
   ═══════════════════════════════════════════════ */
export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="features-section" id="features">
      <div className="features-inner">
        <p className="features-label">MULTI-AGENT AI SYSTEM</p>
        <h2 className="features-heading">
          One platform. Built for safety, speed, and precision.
        </h2>
        <p className="features-subtitle">
          Discover how 4 specialized AI agents work together to transform
          aircraft maintenance
        </p>

        <motion.div
          ref={ref}
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((f) => (
            <motion.div
              className="feature-card"
              key={f.title}
              variants={cardVariants}
            >
              <div className="feature-icon-circle">
                <f.Icon size={22} />
              </div>

              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>

              <f.Mockup />

              <span className="feature-tag">{f.tag}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
