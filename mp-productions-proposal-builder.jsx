import React, { useState, useMemo } from 'react';
import { FileText, Plus, Minus, Printer, ChevronRight, Check } from 'lucide-react';

export default function ProposalBuilder() {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState({ name: '', company: '', email: '' });
  const [path, setPath] = useState(null); // 'comprehensive' | 'direct'
  const [items, setItems] = useState({});
  const [discount, setDiscount] = useState(0);

  const services = [
    { cat: 'Production', list: [
      { id: 'prod-photo', name: 'Product Photography (per product)', price: 25 },
      { id: 'prod-session', name: 'Product Photo Session (up to 20)', price: 350 },
      { id: 'spin-video', name: '360° Spin Video/GIF (per product)', price: 40 },
      { id: 'spin-event', name: 'Spin Platform Event Experience (2 hrs)', price: 375 },
      { id: 'drone', name: 'Drone Add-On (per session)', price: 225 },
    ]},
    { cat: 'Virtual Tours', list: [
      { id: 'tour-basic', name: 'Basic Virtual Tour (under 2,000 sq ft)', price: 200 },
      { id: 'tour-std', name: 'Standard Tour (drone + floor plan)', price: 399 },
      { id: 'booth-basic', name: 'Virtual Expo Booth — Basic (setup)', price: 225 },
      { id: 'booth-std', name: 'Virtual Expo Booth — Standard (setup)', price: 550 },
      { id: 'booth-prem', name: 'Virtual Expo Booth — Premium (setup)', price: 1150 },
    ]},
    { cat: 'Promotion', list: [
      { id: 'extreme', name: 'Extreme Promotion (full ground campaign, per event)', price: 850 },
      { id: 'demo-rep', name: 'Demonstration Rep (per event day)', price: 450 },
      { id: 'print-mgmt', name: 'Print Design & Distribution Management', price: 400 },
    ]},
    { cat: 'Consultation', list: [
      { id: 'consult', name: 'Strategy Consultation (per hour, first 30 min free)', price: 60 },
    ]},
  ];

  const setQty = (id, delta) =>
    setItems((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta);
      const copy = { ...prev };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });

  const flat = services.flatMap((s) => s.list);
  const lines = Object.entries(items).map(([id, qty]) => {
    const svc = flat.find((s) => s.id === id);
    return { ...svc, qty, total: svc.price * qty };
  });
  const subtotal = lines.reduce((a, l) => a + l.total, 0);
  const discAmt = subtotal * (discount / 100);
  const afterDisc = subtotal - discAmt;
  const hst = afterDisc * 0.13;
  const grand = afterDisc + hst;

  const money = (n) => `$${n.toFixed(2)}`;

  return (
    <div className="w-full min-h-screen p-5" style={{ background: '#12141A' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-[10px] tracking-[0.2em] uppercase font-mono mb-1" style={{ color: '#7A8494' }}>
            M.P. Productions
          </div>
          <h1 className="text-2xl font-black" style={{ color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}>
            Proposal Builder
          </h1>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-1.5 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full" style={{ background: step >= s ? '#E0A62E' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>

        {/* STEP 1 — Client */}
        {step === 1 && (
          <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="text-base font-bold mb-4" style={{ color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}>
              Client Details
            </h2>
            {[
              { k: 'name', label: 'Contact Name' },
              { k: 'company', label: 'Company' },
              { k: 'email', label: 'Email' },
            ].map((f) => (
              <div key={f.k} className="mb-3">
                <div className="text-[10px] font-mono mb-1.5" style={{ color: '#7A8494' }}>{f.label.toUpperCase()}</div>
                <input
                  value={client[f.k]}
                  onChange={(e) => setClient({ ...client, [f.k]: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#F5F7FA' }}
                />
              </div>
            ))}
            <button
              onClick={() => setStep(2)}
              className="w-full mt-2 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              style={{ background: '#E0A62E', color: '#12141A' }}
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2 — Path choice (The Weave) */}
        {step === 2 && (
          <div>
            <h2 className="text-base font-bold mb-1" style={{ color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}>
              How would you like to work together?
            </h2>
            <p className="text-xs mb-4" style={{ color: '#7A8494' }}>
              There's no wrong answer — this just helps shape the conversation.
            </p>
            {[
              {
                id: 'comprehensive',
                title: 'Comprehensive Review',
                desc: "Walk through my business together first — you'll assess what's actually working before recommending anything.",
              },
              {
                id: 'direct',
                title: 'I Know What I Need',
                desc: "I have a clear idea already. Let's confirm the details and get pricing.",
              },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => { setPath(o.id); setStep(3); }}
                className="w-full text-left p-4 rounded-2xl mb-3 transition-all"
                style={{
                  background: path === o.id ? 'rgba(224,166,46,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${path === o.id ? '#E0A62E' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="font-bold text-sm mb-1" style={{ color: '#F5F7FA' }}>{o.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: '#7A8494' }}>{o.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 — Services */}
        {step === 3 && (
          <div>
            {path === 'direct' && (
              <div className="rounded-xl p-3 mb-4 text-xs" style={{ background: 'rgba(76,141,255,0.1)', border: '1px solid rgba(76,141,255,0.3)', color: '#A8C4F5' }}>
                A few quick questions will follow — just to make sure what you've picked is genuinely the right fit.
              </div>
            )}
            <h2 className="text-base font-bold mb-4" style={{ color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}>
              Select Services
            </h2>
            {services.map((group) => (
              <div key={group.cat} className="mb-4">
                <div className="text-[10px] font-mono mb-2 tracking-wider" style={{ color: '#E0A62E' }}>
                  {group.cat.toUpperCase()}
                </div>
                {group.list.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 p-3 rounded-xl mb-2"
                    style={{
                      background: items[s.id] ? 'rgba(224,166,46,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${items[s.id] ? 'rgba(224,166,46,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    <div className="flex-1">
                      <div className="text-xs font-medium mb-0.5" style={{ color: '#F5F7FA' }}>{s.name}</div>
                      <div className="text-[11px] font-mono" style={{ color: '#7A8494' }}>{money(s.price)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQty(s.id, -1)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <Minus size={12} color="#A8B2C0" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold" style={{ color: items[s.id] ? '#E0A62E' : '#5B6472' }}>
                        {items[s.id] || 0}
                      </span>
                      <button onClick={() => setQty(s.id, 1)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(224,166,46,0.2)' }}>
                        <Plus size={12} color="#E0A62E" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => setStep(4)}
              disabled={lines.length === 0}
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ background: lines.length ? '#E0A62E' : 'rgba(255,255,255,0.08)', color: lines.length ? '#12141A' : '#5B6472' }}
            >
              Review Proposal
            </button>
          </div>
        )}

        {/* STEP 4 — Proposal output */}
        {step === 4 && (
          <div className="rounded-2xl overflow-hidden" style={{ background: '#FAFAF7' }}>
            <div className="p-5" style={{ background: '#12141A' }}>
              <div className="text-[10px] tracking-[0.2em] font-mono mb-1" style={{ color: '#E0A62E' }}>M.P. PRODUCTIONS</div>
              <div className="text-lg font-black" style={{ color: '#F5F7FA', fontFamily: "'Space Grotesk', sans-serif" }}>Service Proposal</div>
              <div className="text-xs mt-1" style={{ color: '#7A8494' }}>
                {client.company || 'Client Company'} · {client.name || 'Contact'}
              </div>
            </div>

            <div className="p-5">
              {lines.map((l) => (
                <div key={l.id} className="flex justify-between items-start mb-2.5 pb-2.5" style={{ borderBottom: '1px solid #E5E1D8' }}>
                  <div className="flex-1 pr-3">
                    <div className="text-xs font-medium" style={{ color: '#12141A' }}>{l.name}</div>
                    <div className="text-[10px] font-mono" style={{ color: '#8A8A92' }}>{l.qty} × {money(l.price)}</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: '#12141A' }}>{money(l.total)}</div>
                </div>
              ))}

              <div className="mt-4 mb-3">
                <div className="text-[10px] font-mono mb-1.5" style={{ color: '#8A8A92' }}>DISCOUNT %</div>
                <input
                  type="number" min="0" max="100" value={discount}
                  onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: '#EFEDE6', color: '#12141A' }}
                />
              </div>

              <div className="text-xs space-y-1.5 pt-3" style={{ borderTop: '2px solid #12141A', color: '#4A5568' }}>
                <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between" style={{ color: '#C1443C' }}><span>Discount ({discount}%)</span><span>−{money(discAmt)}</span></div>}
                <div className="flex justify-between"><span>HST (13%)</span><span>{money(hst)}</span></div>
                <div className="flex justify-between pt-2 text-lg font-black" style={{ color: '#12141A', fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span>Total</span><span>{money(grand)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg text-[10px] leading-relaxed" style={{ background: '#EFEDE6', color: '#4A5568' }}>
                First 30 minutes of consultation are complimentary. Proposal valid 30 days. Prices in CAD.
              </div>

              <button
                onClick={() => window.print()}
                className="w-full mt-4 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                style={{ background: '#12141A', color: '#E0A62E' }}
              >
                <Printer size={15} /> Print / Save as PDF
              </button>
              <button onClick={() => setStep(3)} className="w-full mt-2 py-2 text-xs" style={{ color: '#8A8A92' }}>
                ← Edit services
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
