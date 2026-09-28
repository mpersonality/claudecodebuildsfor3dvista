import React, { useState, useMemo } from 'react';
import { Check, Lock, Unlock, MapPin, RotateCcw, Settings } from 'lucide-react';

export default function UniversalTourTracker() {
  const [mode, setMode] = useState('demo'); // 'demo' | 'config'
  const [checkpoints, setCheckpoints] = useState([
    { id: 1, label: 'Main Entrance', visited: false, required: true },
    { id: 2, label: 'Gallery Hall A', visited: false, required: true },
    { id: 3, label: 'Gallery Hall B', visited: false, required: true },
    { id: 4, label: 'Gift Shop', visited: false, required: false },
    { id: 5, label: 'Rooftop View', visited: false, required: true },
  ]);
  const [rewardText, setRewardText] = useState('TOUR-COMPLETE-2026');
  const [requireAllOptional, setRequireAllOptional] = useState(false);

  const relevant = useMemo(
    () => checkpoints.filter((c) => (requireAllOptional ? true : c.required)),
    [checkpoints, requireAllOptional]
  );
  const done = relevant.filter((c) => c.visited).length;
  const total = relevant.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const complete = total > 0 && done === total;

  const toggle = (id) =>
    setCheckpoints((cs) => cs.map((c) => (c.id === id ? { ...c, visited: !c.visited } : c)));

  const reset = () => setCheckpoints((cs) => cs.map((c) => ({ ...c, visited: false })));

  const updateLabel = (id, label) =>
    setCheckpoints((cs) => cs.map((c) => (c.id === id ? { ...c, label } : c)));

  const toggleRequired = (id) =>
    setCheckpoints((cs) => cs.map((c) => (c.id === id ? { ...c, required: !c.required } : c)));

  const addCheckpoint = () =>
    setCheckpoints((cs) => [
      ...cs,
      { id: Math.max(0, ...cs.map((c) => c.id)) + 1, label: `Stop ${cs.length + 1}`, visited: false, required: true },
    ]);

  const removeCheckpoint = (id) => setCheckpoints((cs) => cs.filter((c) => c.id !== id));

  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center" style={{ background: '#0F1117' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: '#5B6472' }}>
              Universal Tour Tracker
            </div>
            <h1 className="text-xl font-bold leading-tight" style={{ color: '#F2F4F8', fontFamily: "'Space Grotesk', sans-serif" }}>
              {complete ? 'Tour Complete' : 'Explore the Tour'}
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              title="Reset"
            >
              <RotateCcw size={15} color="#8E99A8" />
            </button>
            <button
              onClick={() => setMode(mode === 'demo' ? 'config' : 'demo')}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: mode === 'config' ? '#4C8DFF' : 'rgba(255,255,255,0.06)' }}
              title="Configure"
            >
              <Settings size={15} color={mode === 'config' ? '#0F1117' : '#8E99A8'} />
            </button>
          </div>
        </div>

        {/* Progress ring + bar */}
        <div
          className="rounded-2xl p-5 mb-5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-sm font-mono" style={{ color: '#8E99A8' }}>
              {done} of {total} complete
            </span>
            <span className="text-3xl font-black" style={{ color: '#4C8DFF', fontFamily: "'Space Grotesk', sans-serif" }}>
              {pct}%
            </span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${pct}%`,
                background: complete ? 'linear-gradient(90deg,#3FD98A,#4C8DFF)' : 'linear-gradient(90deg,#4C8DFF,#8B7BFF)',
              }}
            />
          </div>
        </div>

        {/* Checkpoints */}
        <div className="flex flex-col gap-2 mb-5">
          {checkpoints.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{
                background: c.visited ? 'rgba(76,141,255,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${c.visited ? 'rgba(76,141,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                opacity: !c.required && !requireAllOptional ? 0.65 : 1,
              }}
            >
              <button
                onClick={() => toggle(c.id)}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: c.visited ? '#4C8DFF' : 'rgba(255,255,255,0.07)' }}
              >
                {c.visited ? <Check size={16} color="#0F1117" strokeWidth={3} /> : <MapPin size={14} color="#8E99A8" />}
              </button>

              {mode === 'config' ? (
                <input
                  value={c.label}
                  onChange={(e) => updateLabel(c.id, e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none border-b"
                  style={{ color: '#F2F4F8', borderColor: 'rgba(255,255,255,0.15)' }}
                />
              ) : (
                <span className="flex-1 text-sm" style={{ color: c.visited ? '#F2F4F8' : '#A8B2C0' }}>
                  {c.label}
                </span>
              )}

              {mode === 'config' ? (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => toggleRequired(c.id)}
                    className="text-[9px] px-2 py-1 rounded font-mono font-bold"
                    style={{
                      background: c.required ? 'rgba(76,141,255,0.2)' : 'rgba(255,255,255,0.06)',
                      color: c.required ? '#4C8DFF' : '#5B6472',
                    }}
                  >
                    {c.required ? 'REQ' : 'OPT'}
                  </button>
                  <button
                    onClick={() => removeCheckpoint(c.id)}
                    className="text-[9px] px-2 py-1 rounded font-mono"
                    style={{ background: 'rgba(255,90,90,0.15)', color: '#FF7A7A' }}
                  >
                    DEL
                  </button>
                </div>
              ) : (
                <span className="text-[9px] font-mono" style={{ color: c.visited ? '#4C8DFF' : '#5B6472' }}>
                  {c.visited ? 'VISITED' : c.required ? 'REQUIRED' : 'OPTIONAL'}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Config extras */}
        {mode === 'config' && (
          <div
            className="rounded-xl p-4 mb-5 flex flex-col gap-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <button
              onClick={addCheckpoint}
              className="w-full py-2.5 rounded-lg text-sm font-bold"
              style={{ background: 'rgba(76,141,255,0.15)', color: '#4C8DFF' }}
            >
              + Add Checkpoint
            </button>
            <div>
              <div className="text-[10px] font-mono mb-1.5" style={{ color: '#5B6472' }}>
                REWARD / UNLOCK MESSAGE
              </div>
              <input
                value={rewardText}
                onChange={(e) => setRewardText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#F2F4F8' }}
              />
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: '#A8B2C0' }}>
              <input
                type="checkbox"
                checked={requireAllOptional}
                onChange={(e) => setRequireAllOptional(e.target.checked)}
              />
              Count optional stops toward completion
            </label>
          </div>
        )}

        {/* Reward */}
        <div
          className="rounded-2xl p-6 text-center transition-all duration-500"
          style={{
            background: complete ? 'linear-gradient(135deg,#3FD98A,#4C8DFF)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${complete ? '#3FD98A' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          {complete ? (
            <>
              <Unlock size={26} color="#0F1117" className="mx-auto mb-2" />
              <div className="font-black text-lg" style={{ color: '#0F1117', fontFamily: "'Space Grotesk', sans-serif" }}>
                {rewardText}
              </div>
            </>
          ) : (
            <>
              <Lock size={20} color="#5B6472" className="mx-auto mb-2" />
              <div className="text-xs font-mono" style={{ color: '#5B6472' }}>
                {total - done} more stop{total - done !== 1 ? 's' : ''} to unlock
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-4 text-[10px] font-mono" style={{ color: '#3D4552' }}>
          {mode === 'config' ? 'Config mode — edit labels, add/remove stops' : 'Click any stop to simulate a visit'}
        </div>
      </div>
    </div>
  );
}
