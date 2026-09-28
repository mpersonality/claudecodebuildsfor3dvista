import React, { useState } from 'react';
import { Check, Lock, Unlock, MapPin } from 'lucide-react';

export default function CheckpointTracker() {
  const [visited, setVisited] = useState([false, false, false, false, false]);
  const checkpoints = ['Booth 1', 'Booth 2', 'Booth 3', 'Booth 4', 'Booth 5'];
  const completedCount = visited.filter(Boolean).length;
  const isComplete = completedCount === checkpoints.length;

  const toggle = (i) => {
    const next = [...visited];
    next[i] = !next[i];
    setVisited(next);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6" style={{ background: '#12241C' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-2">
          <div className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: '#6FA88A' }}>
            3DVista Checkpoint Tracker — Prototype
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: '#F5F1E8', fontFamily: "'Space Grotesk', sans-serif" }}>
            Visit All Booths to Unlock Your Discount
          </h1>
        </div>

        {/* Progress bar */}
        <div className="my-6">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-mono" style={{ color: '#F5F1E8' }}>
              {completedCount} / {checkpoints.length} visited
            </span>
            <span className="text-2xl font-black" style={{ color: '#E8A23D', fontFamily: "'Space Grotesk', sans-serif" }}>
              {Math.round((completedCount / checkpoints.length) * 100)}%
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / checkpoints.length) * 100}%`, background: 'linear-gradient(90deg, #6FA88A, #E8A23D)' }}
            />
          </div>
        </div>

        {/* Checkpoint constellation path */}
        <div className="relative flex flex-col gap-3 mb-6">
          {checkpoints.map((name, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="flex items-center gap-3 p-3 rounded-xl transition-all text-left"
              style={{
                background: visited[i] ? 'rgba(111,168,138,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${visited[i] ? '#6FA88A' : 'rgba(255,255,255,0.1)'}`
              }}
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: visited[i] ? '#6FA88A' : 'rgba(255,255,255,0.08)' }}
              >
                {visited[i] ? <Check size={16} color="#12241C" strokeWidth={3} /> : <MapPin size={14} color="#6FA88A" />}
              </span>
              <span className="text-sm font-medium" style={{ color: visited[i] ? '#F5F1E8' : 'rgba(245,241,232,0.6)', fontFamily: "'Inter', sans-serif" }}>
                {name}
              </span>
              <span className="ml-auto text-[10px] font-mono" style={{ color: '#6FA88A' }}>
                {visited[i] ? 'visited' : 'not yet'}
              </span>
            </button>
          ))}
        </div>

        {/* Trigger/unlock reveal */}
        <div
          className="rounded-xl p-5 text-center transition-all duration-500"
          style={{
            background: isComplete ? 'linear-gradient(135deg, #E8A23D, #6FA88A)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${isComplete ? '#E8A23D' : 'rgba(255,255,255,0.1)'}`,
            transform: isComplete ? 'scale(1)' : 'scale(0.98)',
            opacity: isComplete ? 1 : 0.6
          }}
        >
          {isComplete ? (
            <>
              <Unlock size={24} color="#12241C" className="mx-auto mb-2" />
              <div className="font-black text-lg" style={{ color: '#12241C', fontFamily: "'Space Grotesk', sans-serif" }}>
                Unlocked! Code: MG-EXPLORE20
              </div>
            </>
          ) : (
            <>
              <Lock size={20} color="#6B7280" className="mx-auto mb-2" />
              <div className="text-xs font-mono" style={{ color: '#6B7280' }}>
                Complete all checkpoints to unlock
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-4 text-[10px] font-mono" style={{ color: '#4A5D53' }}>
          Click any booth above to simulate a visit
        </div>
      </div>
    </div>
  );
}
