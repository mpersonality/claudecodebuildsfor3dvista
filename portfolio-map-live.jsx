import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Filter, Plus, X, Trash2, Loader } from 'lucide-react';

const CATEGORIES = [
  { id: 'retail', label: 'Retail', color: '#3FA66B' },
  { id: 'realestate', label: 'Real Estate', color: '#4C8DFF' },
  { id: 'expo', label: 'Expo/Trade Show', color: '#C1443C' },
  { id: 'other', label: 'Other', color: '#E0A62E' },
];

export default function PortfolioMapLive() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'retail', desc: '', url: '', x: 50, y: 50 });
  const [saveError, setSaveError] = useState('');

  // Load saved projects on mount
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get('portfolio-projects', false);
        setLocations(result ? JSON.parse(result.value) : []);
      } catch (e) {
        setLocations([]); // key doesn't exist yet — that's fine, start empty
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveLocations = async (next) => {
    setLocations(next);
    try {
      const result = await window.storage.set('portfolio-projects', JSON.stringify(next), false);
      if (!result) setSaveError('Save may not have worked — try again.');
      else setSaveError('');
    } catch (e) {
      setSaveError('Could not save. Your changes are visible now but may not persist.');
    }
  };

  const addProject = () => {
    if (!form.name.trim()) return;
    const next = [...locations, { ...form, id: Date.now() }];
    saveLocations(next);
    setForm({ name: '', category: 'retail', desc: '', url: '', x: 50, y: 50 });
    setEditing(false);
  };

  const deleteProject = (id) => {
    saveLocations(locations.filter((l) => l.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const catColor = (id) => CATEGORIES.find((c) => c.id === id)?.color || '#E0A62E';
  const filtered = filter === 'all' ? locations : locations.filter((l) => l.category === filter);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center" style={{ background: '#12141A' }}>
        <Loader className="animate-spin" size={24} color="#E0A62E" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6" style={{ background: '#12141A' }}>
      <div className="max-w-md mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase font-mono mb-1" style={{ color: '#7A8494' }}>
              M.P. Productions — Tour Portfolio
            </div>
            <h1 className="text-xl font-bold" style={{ color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}>
              Our Virtual Tours
            </h1>
          </div>
          <button onClick={() => setEditing(!editing)} className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: editing ? '#3FA66B' : 'rgba(255,255,255,0.06)' }}>
            {editing ? <X size={15} color="#12141A" /> : <Plus size={15} color="#8E99A8" />}
          </button>
        </div>

        {saveError && (
          <div className="text-[10px] p-2 rounded-lg mb-3" style={{ background: 'rgba(255,90,90,0.1)', color: '#FF8A8A' }}>{saveError}</div>
        )}

        {/* Add project form */}
        {editing && (
          <div className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-[10px] font-mono mb-3" style={{ color: '#7A8494' }}>ADD A REAL PROJECT</div>
            <input placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-2" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-2" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <input placeholder="Short description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-2" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />
            <input placeholder="Real tour URL (https://...)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-2" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />
            <div className="flex gap-2 mb-3">
              <div className="flex-1">
                <label className="text-[9px] font-mono" style={{ color: '#7A8494' }}>MAP X %</label>
                <input type="number" min="0" max="100" value={form.x} onChange={(e) => setForm({ ...form, x: Number(e.target.value) })} className="w-full px-2 py-1.5 rounded-lg text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />
              </div>
              <div className="flex-1">
                <label className="text-[9px] font-mono" style={{ color: '#7A8494' }}>MAP Y %</label>
                <input type="number" min="0" max="100" value={form.y} onChange={(e) => setForm({ ...form, y: Number(e.target.value) })} className="w-full px-2 py-1.5 rounded-lg text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }} />
              </div>
            </div>
            <button onClick={addProject} className="w-full py-2.5 rounded-lg font-bold text-sm" style={{ background: '#E0A62E', color: '#12141A' }}>
              Add Project
            </button>
          </div>
        )}

        {/* Filter chips */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button onClick={() => { setFilter('all'); setSelected(null); }} className="px-3 py-1.5 rounded-full text-[11px] font-bold" style={{ background: filter === 'all' ? '#E0A62E' : 'rgba(255,255,255,0.06)', color: filter === 'all' ? '#12141A' : '#A8B2C0' }}>
            All ({locations.length})
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => { setFilter(c.id); setSelected(null); }} className="px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5" style={{ background: filter === c.id ? c.color : 'rgba(255,255,255,0.06)', color: filter === c.id ? '#12141A' : '#A8B2C0' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: filter === c.id ? '#12141A' : c.color }} />
              {c.label}
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="relative rounded-2xl mb-4" style={{ background: '#1A1D24', border: '1px solid rgba(255,255,255,0.08)', aspectRatio: '4/3' }}>
          {filtered.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono" style={{ color: '#4A5568' }}>
              No projects yet — tap + to add your first one
            </div>
          )}
          {filtered.map((l) => (
            <button key={l.id} onClick={() => setSelected(l)} className="absolute flex flex-col items-center transition-transform hover:scale-110" style={{ left: `${l.x}%`, top: `${l.y}%`, transform: 'translate(-50%,-50%)' }}>
              <MapPin size={selected?.id === l.id ? 26 : 20} color={catColor(l.category)} fill={selected?.id === l.id ? catColor(l.category) : 'transparent'} strokeWidth={2} />
            </button>
          ))}
        </div>

        {/* Selected detail card */}
        {selected ? (
          <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${catColor(selected.category)}55` }}>
            <div className="flex items-start justify-between mb-1">
              <div className="text-[9px] font-mono uppercase" style={{ color: catColor(selected.category) }}>
                {CATEGORIES.find((c) => c.id === selected.category)?.label}
              </div>
              <button onClick={() => deleteProject(selected.id)}><Trash2 size={13} color="#5B6472" /></button>
            </div>
            <div className="text-base font-bold mb-1" style={{ color: '#F5F7FA' }}>{selected.name}</div>
            <div className="text-xs mb-3" style={{ color: '#9AA5B4' }}>{selected.desc}</div>
            <a
              href={selected.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2"
              style={{ background: catColor(selected.category), color: '#12141A', opacity: selected.url ? 1 : 0.5, pointerEvents: selected.url ? 'auto' : 'none' }}
            >
              <ExternalLink size={14} /> {selected.url ? 'View Tour' : 'No URL set'}
            </a>
          </div>
        ) : (
          <div className="text-center text-xs font-mono flex items-center justify-center gap-2" style={{ color: '#5B6472' }}>
            <Filter size={12} /> Tap a pin to view that project
          </div>
        )}
      </div>
    </div>
  );
}
