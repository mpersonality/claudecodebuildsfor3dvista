import React, { useState, useMemo } from 'react';
import { Copy, Check, Zap, Timer, Eye } from 'lucide-react';

export default function ElementGenerator() {
  const [tab, setTab] = useState('pulse');
  const [copied, setCopied] = useState(false);

  // Pulse/Attention generator state
  const [pulseColor, setPulseColor] = useState('#E8B23D');
  const [pulseSpeed, setPulseSpeed] = useState(1.4);
  const [pulseScale, setPulseScale] = useState(1.15);

  // Show/Hide Timer generator state
  const [showAfter, setShowAfter] = useState(2);
  const [hideAfter, setHideAfter] = useState(6);
  const [elementTag, setElementTag] = useState('promo-banner');

  // Fade Transition generator state
  const [fadeDuration, setFadeDuration] = useState(0.6);
  const [fadeEasing, setFadeEasing] = useState('ease-in-out');

  const pulseCode = useMemo(() => `/* Paste into 3DVista element CSS/skin action */
@keyframes mpPulse_${elementTag.replace(/\s/g, '')} {
  0%   { transform: scale(1); box-shadow: 0 0 0 0 ${pulseColor}66; }
  50%  { transform: scale(${pulseScale}); box-shadow: 0 0 0 12px ${pulseColor}00; }
  100% { transform: scale(1); box-shadow: 0 0 0 0 ${pulseColor}00; }
}
.mp-pulse-target {
  animation: mpPulse_${elementTag.replace(/\s/g, '')} ${pulseSpeed}s infinite ease-in-out;
}`, [pulseColor, pulseSpeed, pulseScale, elementTag]);

  const timerCode = useMemo(() => `// Paste into a 3DVista "JavaScript Action" on scene load
(function() {
  var el = document.querySelector('[data-tag="${elementTag}"]');
  if (!el) return;
  el.style.display = 'none';
  setTimeout(function() {
    el.style.display = 'block';
    setTimeout(function() {
      el.style.display = 'none';
    }, ${hideAfter - showAfter} * 1000);
  }, ${showAfter} * 1000);
})();`, [showAfter, hideAfter, elementTag]);

  const fadeCode = useMemo(() => `/* Paste into 3DVista element CSS */
.mp-fade-target {
  transition: opacity ${fadeDuration}s ${fadeEasing};
  opacity: 0;
}
.mp-fade-target.mp-visible {
  opacity: 1;
}`, [fadeDuration, fadeEasing]);

  const currentCode = tab === 'pulse' ? pulseCode : tab === 'timer' ? timerCode : fadeCode;

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tabs = [
    { id: 'pulse', label: 'Attention Pulse', icon: Zap },
    { id: 'timer', label: 'Show/Hide Timer', icon: Timer },
    { id: 'fade', label: 'Fade Transition', icon: Eye },
  ];

  return (
    <div className="w-full min-h-screen p-6" style={{ background: '#12141A' }}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="text-[10px] tracking-[0.2em] uppercase font-mono mb-1" style={{ color: '#7A8494' }}>
            M.P. Productions — 3DVista Toolkit
          </div>
          <h1 className="text-xl font-bold" style={{ color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}>
            Interactive Element Generator
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex-1 py-2.5 rounded-lg text-[11px] font-bold flex flex-col items-center gap-1 transition-all"
                style={{ background: tab === t.id ? '#E0A62E' : 'rgba(255,255,255,0.06)', color: tab === t.id ? '#12141A' : '#8E99A8' }}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* PULSE TAB */}
        {tab === 'pulse' && (
          <div className="rounded-2xl p-5 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {/* Live preview */}
            <div className="flex items-center justify-center py-8 mb-4 rounded-xl" style={{ background: '#0A0B0F' }}>
              <div
                className="w-14 h-14 rounded-full"
                style={{
                  background: pulseColor,
                  animation: `mpPreviewPulse ${pulseSpeed}s infinite ease-in-out`,
                }}
              />
              <style>{`@keyframes mpPreviewPulse { 0%{transform:scale(1);box-shadow:0 0 0 0 ${pulseColor}66;} 50%{transform:scale(${pulseScale});box-shadow:0 0 0 14px ${pulseColor}00;} 100%{transform:scale(1);} }`}</style>
            </div>

            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>ELEMENT TAG (data-tag value)</label>
            <input value={elementTag} onChange={(e) => setElementTag(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-4" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />

            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>PULSE COLOR</label>
            <input type="color" value={pulseColor} onChange={(e) => setPulseColor(e.target.value)} className="w-full h-9 rounded-lg mb-4 cursor-pointer" />

            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>SPEED: {pulseSpeed}s</label>
            <input type="range" min="0.6" max="3" step="0.1" value={pulseSpeed} onChange={(e) => setPulseSpeed(Number(e.target.value))} className="w-full mb-4" />

            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>SCALE: {pulseScale}×</label>
            <input type="range" min="1.05" max="1.5" step="0.05" value={pulseScale} onChange={(e) => setPulseScale(Number(e.target.value))} className="w-full" />
          </div>
        )}

        {/* TIMER TAB */}
        {tab === 'timer' && (
          <div className="rounded-2xl p-5 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>ELEMENT TAG (data-tag value)</label>
            <input value={elementTag} onChange={(e) => setElementTag(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-4" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />

            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>SHOW AFTER: {showAfter}s</label>
            <input type="range" min="0" max="15" step="0.5" value={showAfter} onChange={(e) => setShowAfter(Number(e.target.value))} className="w-full mb-4" />

            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>HIDE AT: {hideAfter}s</label>
            <input type="range" min={showAfter + 1} max="30" step="0.5" value={hideAfter} onChange={(e) => setHideAfter(Number(e.target.value))} className="w-full" />

            <div className="mt-4 text-[10px] font-mono px-3 py-2 rounded-lg" style={{ background: 'rgba(224,166,46,0.1)', color: '#E0A62E' }}>
              Element visible from {showAfter}s to {hideAfter}s ({hideAfter - showAfter}s duration)
            </div>
          </div>
        )}

        {/* FADE TAB */}
        {tab === 'fade' && (
          <div className="rounded-2xl p-5 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>DURATION: {fadeDuration}s</label>
            <input type="range" min="0.1" max="2" step="0.1" value={fadeDuration} onChange={(e) => setFadeDuration(Number(e.target.value))} className="w-full mb-4" />

            <label className="block text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>EASING</label>
            <select value={fadeEasing} onChange={(e) => setFadeEasing(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }}>
              <option value="ease-in-out">ease-in-out</option>
              <option value="ease-in">ease-in</option>
              <option value="ease-out">ease-out</option>
              <option value="linear">linear</option>
            </select>
          </div>
        )}

        {/* Generated code output */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0A0B0F', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <span className="text-[10px] font-mono" style={{ color: '#7A8494' }}>GENERATED CODE — COPY & PASTE INTO 3DVISTA</span>
            <button onClick={copyCode} className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded" style={{ background: copied ? '#3FA66B' : '#E0A62E', color: '#12141A' }}>
              {copied ? <Check size={11} /> : <Copy size={11} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 text-[11px] overflow-x-auto" style={{ color: '#8FF0C0', fontFamily: 'monospace' }}>
            {currentCode}
          </pre>
        </div>

        <div className="text-center mt-4 text-[10px] font-mono" style={{ color: '#5B6472' }}>
          Adjust settings above — code updates in real time
        </div>
      </div>
    </div>
  );
}
