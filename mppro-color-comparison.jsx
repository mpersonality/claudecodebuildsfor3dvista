import React, { useState } from 'react';
import { FileText, Check } from 'lucide-react';

const PALETTES = {
  studio: {
    label: 'Studio Dark',
    reason: "Dark UI mirrors professional editing software (Premiere, DaVinci Resolve, Photoshop) — M.P. Productions is a production company, so this evokes 'the tool a real editor uses,' not a generic dark theme for its own sake.",
    bg: '#14181A', panel: '#1B211F', text: '#EAF0EC', sub: '#8FA79B',
    primary: '#3D8361', accent: '#2F6FA8', border: 'rgba(255,255,255,0.08)',
  },
  heritage: {
    label: 'Heritage Light',
    reason: "True to the original logo (primarily green, blue outline) on a warm paper-cream background — evokes a print proof sheet, fitting since print/production is core to the business, and reads as established/trustworthy rather than trend-chasing.",
    bg: '#F5F3EC', panel: '#FFFFFF', text: '#1C2620', sub: '#5A6B5F',
    primary: '#2E5339', accent: '#26527A', border: '#E3DFD2',
  },
  hybrid: {
    label: 'Modern Hybrid',
    reason: "A brighter, more contemporary green-blue balance on near-white — same heritage colors, updated saturation and contrast for a site meant to compete with modern agency sites, not just honor the past.",
    bg: '#EEF3F0', panel: '#FFFFFF', text: '#152018', sub: '#4E6357',
    primary: '#1F6E4C', accent: '#1B6FA6', border: '#DCE6E0',
  },
};

export default function MPProColorCompare() {
  const [active, setActive] = useState('studio');
  const p = PALETTES[active];

  return (
    <div className="w-full min-h-screen p-6 transition-colors duration-300" style={{ background: p.bg }}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="text-[10px] tracking-[0.2em] uppercase font-mono mb-1" style={{ color: p.sub }}>
            M.P. Productions — Color Options
          </div>
          <h1 className="text-xl font-bold" style={{ color: p.text, fontFamily: "'Space Grotesk', sans-serif" }}>
            Pick a direction to preview
          </h1>
        </div>

        {/* Selector */}
        <div className="flex gap-2 mb-5">
          {Object.entries(PALETTES).map(([key, pal]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="flex-1 py-2.5 rounded-lg text-xs font-bold transition-all"
              style={{
                background: active === key ? pal.primary : 'rgba(120,120,120,0.12)',
                color: active === key ? '#fff' : p.sub,
              }}
            >
              {pal.label}
            </button>
          ))}
        </div>

        {/* Rationale */}
        <div
          className="rounded-xl p-4 mb-6 text-xs leading-relaxed"
          style={{ background: p.panel, border: `1px solid ${p.border}`, color: p.sub }}
        >
          <b style={{ color: p.primary }}>Why this one: </b>{p.reason}
        </div>

        {/* Sample UI: header */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${p.border}` }}>
          <div className="p-5" style={{ background: p.primary }}>
            <div className="text-[10px] tracking-[0.2em] font-mono mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
              M.P. PRODUCTIONS
            </div>
            <div className="text-lg font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Service Proposal
            </div>
          </div>

          {/* Sample line item */}
          <div className="p-4" style={{ background: p.panel }}>
            <div className="flex justify-between items-center pb-3 mb-3" style={{ borderBottom: `1px solid ${p.border}` }}>
              <div>
                <div className="text-sm font-medium" style={{ color: p.text }}>Virtual Expo Booth — Standard</div>
                <div className="text-[10px] font-mono" style={{ color: p.sub }}>1 × $550.00</div>
              </div>
              <div className="text-sm font-bold" style={{ color: p.text }}>$550.00</div>
            </div>
            <div className="flex justify-between items-center pb-3 mb-3" style={{ borderBottom: `1px solid ${p.border}` }}>
              <div>
                <div className="text-sm font-medium" style={{ color: p.text }}>Drone Add-On</div>
                <div className="text-[10px] font-mono" style={{ color: p.sub }}>1 × $225.00</div>
              </div>
              <div className="text-sm font-bold" style={{ color: p.text }}>$225.00</div>
            </div>
            <div className="flex justify-between items-center text-lg font-black pt-1" style={{ color: p.primary, fontFamily: "'Space Grotesk', sans-serif" }}>
              <span>Total</span><span>$875.00</span>
            </div>
          </div>
        </div>

        {/* Sample button + accent */}
        <div className="flex gap-2">
          <button
            className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
            style={{ background: p.primary }}
          >
            <FileText size={15} /> Print Proposal
          </button>
          <button
            className="w-12 rounded-xl flex items-center justify-center"
            style={{ background: p.accent }}
          >
            <Check size={16} color="#fff" />
          </button>
        </div>
        <div className="text-center mt-3 text-[10px] font-mono" style={{ color: p.sub }}>
          Green = primary actions · Blue = confirmation/accent
        </div>
      </div>
    </div>
  );
}
