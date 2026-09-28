import React, { useState } from 'react';
import { FileText, Store, Check } from 'lucide-react';

const MG_OPTIONS = {
  spotlight: {
    label: 'Gallery Spotlight',
    bg: '#1C1B22', panel: '#232229', text: '#F3EFE6', sub: '#8A8A92', primary: '#E8B23D', accent: '#C1443C',
    reason: "Corrected reasoning: not 'nighttime,' but a museum/jewelry-case spotlight effect — dark field makes lit exhibits read as premium and draws focus to what's on display, the same principle stores use for high-value items.",
  },
  daylight: {
    label: 'Daylight Market',
    bg: '#F7F4EC', panel: '#FFFFFF', text: '#1C1B22', sub: '#6B6B73', primary: '#C1443C', accent: '#2F5D8C',
    reason: "Honest correction to the original flaw: real trade shows happen in bright, busy daylight. This option matches that reality — warm neutral background, color used for wayfinding and booth numbers rather than staged drama.",
  },
  hybrid: {
    label: 'Hybrid Directory',
    bg: '#F7F4EC', panel: '#FFFFFF', text: '#1C1B22', sub: '#6B6B73', primary: '#E8B23D', accent: '#1C1B22',
    reason: "Bright, readable main interface (like Daylight Market) but keeps a dark 'deals ticker' strip at the header only — gets the readability of daytime with a touch of the spotlight drama exactly where urgency matters most.",
  },
};

const MP_OPTIONS = {
  heritage: {
    label: 'Heritage Green',
    bg: '#F5F3EC', panel: '#FFFFFF', text: '#1C2620', sub: '#5A6B5F', primary: '#2E5339', accent: '#26527A',
    reason: "True to the actual original logo (primarily green, blue outline). Reads as established and trustworthy — the honest, historical option.",
  },
  boldmin: {
    label: 'Bold Minimal',
    bg: '#0F0F10', panel: '#18181A', text: '#F5F5F5', sub: '#9A9A9E', primary: '#6CBBD9', accent: '#FFFFFF',
    reason: "Grounded in real competitor research: Zulu Alpha Kilo — a top-tier, award-winning independent Canadian agency — uses exactly this family (black, near-white, a distinctive sky blue). Proves black+blue genuinely performs at the top of this market, not just green.",
  },
  editorial: {
    label: 'Warm Editorial',
    bg: '#F4EDE4', panel: '#FFFFFF', text: '#2A2520', sub: '#7A6F63', primary: '#B85C38', accent: '#2A2520',
    reason: "A third, genuinely different family — warm paper tones with a single terracotta accent, evoking print/photography proofs. Aligns directly with M.P. Productions' actual print and production services, not decoration for its own sake.",
  },
};

export default function FullColorVariety() {
  const [brand, setBrand] = useState('mg');
  const [mgTab, setMgTab] = useState('spotlight');
  const [mpTab, setMpTab] = useState('heritage');

  const opts = brand === 'mg' ? MG_OPTIONS : MP_OPTIONS;
  const activeKey = brand === 'mg' ? mgTab : mpTab;
  const setActive = brand === 'mg' ? setMgTab : setMpTab;
  const p = opts[activeKey];

  return (
    <div className="w-full min-h-screen p-6 transition-colors duration-300" style={{ background: p.bg }}>
      <div className="max-w-md mx-auto">
        {/* Brand switch */}
        <div className="flex gap-2 mb-5">
          <button onClick={() => setBrand('mg')} className="flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
            style={{ background: brand === 'mg' ? '#1C1B22' : 'rgba(120,120,120,0.15)', color: brand === 'mg' ? '#E8B23D' : '#6B6B73' }}>
            <Store size={13} /> Market Guides
          </button>
          <button onClick={() => setBrand('mp')} className="flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
            style={{ background: brand === 'mp' ? '#1C1B22' : 'rgba(120,120,120,0.15)', color: brand === 'mp' ? '#F3EFE6' : '#6B6B73' }}>
            <FileText size={13} /> M.P. Productions
          </button>
        </div>

        <h1 className="text-lg font-bold mb-4" style={{ color: p.text, fontFamily: "'Space Grotesk', sans-serif" }}>
          {brand === 'mg' ? 'Three real directions for Market Guides' : 'Three genuinely different directions for M.P. Productions'}
        </h1>

        {/* Option selector */}
        <div className="flex gap-2 mb-4">
          {Object.entries(opts).map(([key, o]) => (
            <button key={key} onClick={() => setActive(key)} className="flex-1 py-2 rounded-lg text-[11px] font-bold"
              style={{ background: activeKey === key ? o.primary : 'rgba(120,120,120,0.15)', color: activeKey === key ? '#fff' : p.sub }}>
              {o.label}
            </button>
          ))}
        </div>

        {/* Rationale */}
        <div className="rounded-xl p-4 mb-5 text-xs leading-relaxed" style={{ background: p.panel, border: `1px solid ${p.sub}33`, color: p.sub }}>
          <b style={{ color: p.primary }}>Why this one: </b>{p.reason}
        </div>

        {/* Sample card */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${p.sub}33` }}>
          <div className="p-4" style={{ background: p.primary }}>
            <div className="text-[10px] tracking-[0.15em] font-mono mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {brand === 'mg' ? 'MARKET GUIDES' : 'M.P. PRODUCTIONS'}
            </div>
            <div className="text-base font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {brand === 'mg' ? 'Featured Booth' : 'Service Proposal'}
            </div>
          </div>
          <div className="p-4" style={{ background: p.panel }}>
            <div className="flex justify-between items-center pb-2 mb-2" style={{ borderBottom: `1px solid ${p.sub}22` }}>
              <span className="text-sm" style={{ color: p.text }}>{brand === 'mg' ? 'Harbourside Coffee' : 'Virtual Booth Setup'}</span>
              <span className="text-sm font-bold" style={{ color: p.text }}>{brand === 'mg' ? '20% off' : '$550'}</span>
            </div>
            <button className="w-full mt-2 py-2.5 rounded-lg font-bold text-sm text-white flex items-center justify-center gap-1.5" style={{ background: p.accent }}>
              <Check size={13} /> {brand === 'mg' ? 'Visit Booth' : 'Accept Proposal'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
