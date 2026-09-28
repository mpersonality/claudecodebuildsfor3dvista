import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CalloutGenerator() {
  const [style, setStyle] = useState('lineExtend');
  const [direction, setDirection] = useState('right');
  const [color, setColor] = useState('#E0A62E');
  const [title, setTitle] = useState('Booth 12');
  const [subtitle, setSubtitle] = useState('Harbourside Coffee');
  const [copied, setCopied] = useState(false);

  const styles = [
    { id: 'lineExtend', label: 'Line Extend' },
    { id: 'flipOpen', label: 'Flip Open' },
    { id: 'simple', label: 'Simple' },
    { id: 'subtitle', label: 'With Subtitle' },
  ];
  const directions = ['left', 'right', 'top', 'bottom'];

  const dirTransform = {
    right: { boxOrigin: 'left center' },
    left: { boxOrigin: 'right center' },
    top: { boxOrigin: 'center bottom' },
    bottom: { boxOrigin: 'center top' },
  };

  const code = useMemo(() => `<!-- Paste into 3DVista hotspot HTML/skin element -->
<div class="mp-callout mp-callout-${style} mp-dir-${direction}">
  <div class="mp-callout-dot"></div>
  <div class="mp-callout-line"></div>
  <div class="mp-callout-box">
    <div class="mp-callout-title">${title}</div>
    ${style === 'subtitle' ? `<div class="mp-callout-subtitle">${subtitle}</div>` : ''}
  </div>
</div>

<style>
.mp-callout-dot { width: 10px; height: 10px; border-radius: 50%; background: ${color}; }
.mp-callout-line { width: 40px; height: 2px; background: ${color}; }
.mp-callout-box { background: rgba(20,20,24,0.9); color: #fff; padding: 8px 14px; border-radius: 6px; border-left: 3px solid ${color}; }
.mp-callout-title { font-weight: bold; font-size: 13px; }
.mp-callout-subtitle { font-size: 11px; opacity: 0.7; margin-top: 2px; }
${style === 'flipOpen' ? `.mp-callout-box { animation: mpFlip 0.4s ease-out; transform-origin: ${dirTransform[direction].boxOrigin}; }
@keyframes mpFlip { from { transform: scaleX(0); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }` : ''}
</style>`, [style, direction, color, title, subtitle]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full min-h-screen p-6" style={{ background: '#12141A' }}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="text-[10px] tracking-[0.2em] uppercase font-mono mb-1" style={{ color: '#7A8494' }}>
            M.P. Productions — 3DVista Toolkit
          </div>
          <h1 className="text-xl font-bold" style={{ color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}>
            Callout Generator
          </h1>
          <p className="text-xs mt-1" style={{ color: '#7A8494' }}>Live, editable — not a static file to open in Photoshop</p>
        </div>

        {/* Live preview */}
        <div className="rounded-2xl p-8 mb-4 flex items-center justify-center min-h-[160px]" style={{ background: '#0A0B0F', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center" style={{
            flexDirection: direction === 'top' ? 'column-reverse' : direction === 'bottom' ? 'column' : direction === 'left' ? 'row-reverse' : 'row',
          }}>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
            <div style={{
              width: direction === 'top' || direction === 'bottom' ? '2px' : '32px',
              height: direction === 'top' || direction === 'bottom' ? '24px' : '2px',
              background: color,
            }} />
            <div
              className="px-3.5 py-2 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderLeft: direction !== 'left' ? `3px solid ${color}` : 'none',
                borderRight: direction === 'left' ? `3px solid ${color}` : 'none',
                animation: style === 'flipOpen' ? 'mpFlipPreview 0.5s ease-out' : undefined,
              }}
            >
              <div className="text-sm font-bold text-white">{title}</div>
              {style === 'subtitle' && <div className="text-[11px] mt-0.5" style={{ color: '#9AA5B4' }}>{subtitle}</div>}
            </div>
            <style>{`@keyframes mpFlipPreview { from { transform: scaleX(0); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }`}</style>
          </div>
        </div>

        {/* Controls */}
        <div className="rounded-2xl p-5 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>STYLE</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {styles.map((s) => (
              <button key={s.id} onClick={() => setStyle(s.id)} className="py-2 rounded-lg text-xs font-bold"
                style={{ background: style === s.id ? '#E0A62E' : 'rgba(255,255,255,0.06)', color: style === s.id ? '#12141A' : '#A8B2C0' }}>
                {s.label}
              </button>
            ))}
          </div>

          <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>DIRECTION</label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {directions.map((d) => (
              <button key={d} onClick={() => setDirection(d)} className="py-2 rounded-lg text-[10px] font-bold capitalize"
                style={{ background: direction === d ? '#E0A62E' : 'rgba(255,255,255,0.06)', color: direction === d ? '#12141A' : '#A8B2C0' }}>
                {d}
              </button>
            ))}
          </div>

          <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>ACCENT COLOR</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-9 rounded-lg mb-4 cursor-pointer" />

          <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>TITLE</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-3" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />

          {style === 'subtitle' && (
            <>
              <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>SUBTITLE</label>
              <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />
            </>
          )}
        </div>

        {/* Code output */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0A0B0F', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <span className="text-[10px] font-mono" style={{ color: '#7A8494' }}>GENERATED CODE</span>
            <button onClick={copyCode} className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded" style={{ background: copied ? '#3FA66B' : '#E0A62E', color: '#12141A' }}>
              {copied ? <Check size={11} /> : <Copy size={11} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 text-[10px] overflow-x-auto max-h-48" style={{ color: '#8FF0C0', fontFamily: 'monospace' }}>{code}</pre>
        </div>
      </div>
    </div>
  );
}
