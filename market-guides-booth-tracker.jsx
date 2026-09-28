import React, { useState } from 'react';
import { Check, Lock, Unlock, Store, RotateCcw, Tag } from 'lucide-react';

export default function MarketGuidesTracker() {
  const [booths, setBooths] = useState([
    { id: 1, name: 'Harbourside Coffee', aisle: 'AISLE 04 · BOOTH 12', visited: false },
    { id: 2, name: 'Northern Threads', aisle: 'AISLE 02 · BOOTH 07', visited: false },
    { id: 3, name: 'Prairie Skincare Co.', aisle: 'AISLE 03 · BOOTH 21', visited: false },
    { id: 4, name: 'Maple & Co. Home Goods', aisle: 'AISLE 01 · BOOTH 05', visited: false },
    { id: 5, name: 'Kits & Co. Baby', aisle: 'AISLE 05 · BOOTH 18', visited: false },
  ]);

  const done = booths.filter((b) => b.visited).length;
  const total = booths.length;
  const pct = Math.round((done / total) * 100);
  const complete = done === total;

  const toggle = (id) => setBooths((bs) => bs.map((b) => (b.id === id ? { ...b, visited: !b.visited } : b)));
  const reset = () => setBooths((bs) => bs.map((b) => ({ ...b, visited: false })));

  return (
    <div className="w-full min-h-screen p-5 flex flex-col items-center" style={{ background: '#1C1B22' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase font-mono mb-1" style={{ color: '#E8B23D' }}>
              Market Guides
            </div>
            <h1 className="text-xl font-bold leading-tight" style={{ color: '#F3EFE6', fontFamily: "'Space Grotesk', sans-serif" }}>
              {complete ? 'Hall Complete!' : 'Walk the Aisles'}
            </h1>
            <p className="text-xs mt-1" style={{ color: '#8A8A92' }}>
              Visit every booth to unlock your discount
            </p>
          </div>
          <button
            onClick={reset}
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <RotateCcw size={15} color="#8A8A92" />
          </button>
        </div>

        {/* Progress */}
        <div className="rounded-2xl p-5 mb-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-sm font-mono" style={{ color: '#8A8A92' }}>
              {done} of {total} booths visited
            </span>
            <span className="text-3xl font-black" style={{ color: '#E8B23D', fontFamily: "'Space Grotesk', sans-serif" }}>
              {pct}%
            </span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${pct}%`,
                background: complete ? 'linear-gradient(90deg,#3FA66B,#E8B23D)' : 'linear-gradient(90deg,#C1443C,#E8B23D)',
              }}
            />
          </div>
        </div>

        {/* Booths */}
        <div className="flex flex-col gap-2 mb-5">
          {booths.map((b) => (
            <button
              key={b.id}
              onClick={() => toggle(b.id)}
              className="flex items-center gap-3 p-3.5 rounded-xl text-left transition-all"
              style={{
                background: b.visited ? 'rgba(232,178,61,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${b.visited ? 'rgba(232,178,61,0.5)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: b.visited ? '#E8B23D' : 'rgba(255,255,255,0.07)' }}
              >
                {b.visited ? <Check size={17} color="#1C1B22" strokeWidth={3} /> : <Store size={15} color="#8A8A92" />}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-mono mb-0.5" style={{ color: b.visited ? '#E8B23D' : '#6B6B73' }}>
                  {b.aisle}
                </div>
                <div className="text-sm font-medium truncate" style={{ color: b.visited ? '#F3EFE6' : '#A8A8B0' }}>
                  {b.name}
                </div>
              </div>
              {b.visited && <Check size={14} color="#E8B23D" />}
            </button>
          ))}
        </div>

        {/* Reward */}
        <div
          className="rounded-2xl p-6 text-center transition-all duration-500"
          style={{
            background: complete ? 'linear-gradient(135deg,#E8B23D,#C1443C)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${complete ? '#E8B23D' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          {complete ? (
            <>
              <Unlock size={26} color="#1C1B22" className="mx-auto mb-2" />
              <div className="text-[10px] font-mono mb-1" style={{ color: 'rgba(28,27,34,0.7)' }}>
                YOUR DISCOUNT CODE
              </div>
              <div className="font-black text-xl tracking-wide" style={{ color: '#1C1B22', fontFamily: "'Space Grotesk', sans-serif" }}>
                MG-EXPLORE20
              </div>
              <div className="text-[10px] mt-1" style={{ color: 'rgba(28,27,34,0.7)' }}>
                20% off any booth · valid 7 days
              </div>
            </>
          ) : (
            <>
              <Lock size={20} color="#6B6B73" className="mx-auto mb-2" />
              <div className="text-xs font-mono" style={{ color: '#6B6B73' }}>
                {total - done} more booth{total - done !== 1 ? 's' : ''} to unlock your discount
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-4">
          <Tag size={11} color="#4A4A52" />
          <span className="text-[10px] font-mono" style={{ color: '#4A4A52' }}>
            Click any booth to simulate a visit
          </span>
        </div>
      </div>
    </div>
  );
}
