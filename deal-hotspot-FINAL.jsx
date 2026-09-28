import React, { useState, useMemo, useEffect } from 'react';
import { Tag, X, ShoppingCart, Clock, Code, Copy, Check } from 'lucide-react';

export default function DealHotspotFinal() {
  const [open, setOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dealName, setDealName] = useState('Harbourside Coffee — 1lb Bag');
  const [price, setPrice] = useState('14.40');
  const [originalPrice, setOriginalPrice] = useState('18.00');
  const [checkoutUrl, setCheckoutUrl] = useState('https://market-guides.myshopify.com/products/harbourside-coffee');
  const [badgeText, setBadgeText] = useState('20% OFF');
  const [durationHours, setDurationHours] = useState(4);
  const [timeLeft, setTimeLeft] = useState(durationHours * 3600);

  useEffect(() => {
    setTimeLeft(durationHours * 3600);
  }, [durationHours]);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const s = String(timeLeft % 60).padStart(2, '0');

  const integrationCode = useMemo(() => `<!-- PRODUCTION CODE - paste into a 3DVista hotspot's HTML panel -->
<div class="mp-deal-hotspot" onclick="mpOpenDeal()">
  <div class="mp-hotspot-marker"></div>
</div>

<div class="mp-deal-card" id="mp-deal-card" style="display:none;">
  <button onclick="mpCloseDeal()">Close</button>
  <div class="mp-badge">${badgeText}</div>
  <h3>${dealName}</h3>
  <div class="mp-price">$${price} <span class="mp-strike">$${originalPrice}</span></div>
  <div class="mp-timer" id="mp-timer"></div>
  <a href="${checkoutUrl}" target="_blank">Shop This Deal</a>
</div>

<script>
function mpOpenDeal() {
  document.getElementById('mp-deal-card').style.display = 'block';
}
function mpCloseDeal() {
  document.getElementById('mp-deal-card').style.display = 'none';
}
var dealEndTime = new Date().getTime() + ${durationHours * 3600 * 1000};
setInterval(function() {
  var remaining = Math.max(0, dealEndTime - new Date().getTime());
  var hrs = Math.floor(remaining / 3600000);
  var mins = Math.floor((remaining % 3600000) / 60000);
  var secs = Math.floor((remaining % 60000) / 1000);
  var el = document.getElementById('mp-timer');
  if (el) el.textContent = hrs + 'h ' + mins + 'm ' + secs + 's left';
}, 1000);
</script>`, [dealName, price, originalPrice, checkoutUrl, badgeText, durationHours]);

  const copyCode = () => {
    navigator.clipboard.writeText(integrationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const resetTimer = () => setTimeLeft(durationHours * 3600);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 20%, #2A2E3F 0%, #14161F 55%, #0B0C12 100%)' }}>
      <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
        <div className="text-xs tracking-widest uppercase font-mono" style={{ color: '#6B7280' }}>
          Deal Hotspot — Final
        </div>
        <button onClick={() => setShowCode(!showCode)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: showCode ? '#3FA66B' : 'rgba(255,255,255,0.1)' }}>
          <Code size={13} color={showCode ? '#0B0C12' : '#fff'} />
        </button>
      </div>

      {!open && !showCode && (
        <button onClick={() => setOpen(true)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group" aria-label="Open deal">
          <span className="absolute w-16 h-16 rounded-full animate-ping" style={{ background: 'rgba(232,72,44,0.35)' }} />
          <span className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110" style={{ background: '#E8482C', boxShadow: '0 0 0 4px rgba(255,255,255,0.15), 0 8px 24px rgba(232,72,44,0.5)' }}>
            <Tag size={22} color="#FAFAF7" strokeWidth={2.5} />
          </span>
        </button>
      )}

      {open && !showCode && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] rounded-2xl overflow-hidden" style={{ background: 'rgba(20,22,31,0.72)', backdropFilter: 'blur(20px) saturate(160%)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <button onClick={() => setOpen(false)} className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center z-10" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <X size={14} color="#FAFAF7" />
          </button>
          <div className="h-36 flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #F0B429 0%, #E8482C 100%)' }}>
            <span className="font-black text-4xl tracking-tight text-center px-4" style={{ color: 'rgba(20,22,31,0.25)' }}>{badgeText}</span>
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold" style={{ background: '#14161F', color: '#F0B429' }}>MARKET GUIDES DEAL</div>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold mb-2" style={{ color: '#FAFAF7' }}>{dealName}</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-black" style={{ color: '#F0B429' }}>${price}</span>
              <span className="text-sm line-through" style={{ color: '#6B7280' }}>${originalPrice}</span>
            </div>
            <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg" style={{ background: 'rgba(232,72,44,0.15)', border: '1px solid rgba(232,72,44,0.3)' }}>
              <Clock size={14} color="#E8482C" />
              <span className="font-mono text-sm font-bold ml-auto" style={{ color: '#E8482C' }}>{h}:{m}:{s}</span>
            </div>
            <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm" style={{ background: '#3FA66B', color: '#0B0C12' }}>
              <ShoppingCart size={16} /> Shop This Deal
            </a>
          </div>
        </div>
      )}

      {showCode && (
        <div className="absolute inset-0 p-8 overflow-y-auto" style={{ background: '#0B0C12' }}>
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="text-[10px] font-mono" style={{ color: '#6B7280' }}>DEAL NAME</label>
              <input value={dealName} onChange={(e) => setDealName(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm mt-1" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }} />
            </div>
            <div className="mb-4">
              <label className="text-[10px] font-mono" style={{ color: '#6B7280' }}>BADGE TEXT (e.g. "20% OFF", "SALE")</label>
              <input value={badgeText} onChange={(e) => setBadgeText(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm mt-1" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }} />
            </div>
            <div className="flex gap-2 mb-4">
              <div className="flex-1"><label className="text-[10px] font-mono" style={{ color: '#6B7280' }}>SALE PRICE</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm mt-1" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }} /></div>
              <div className="flex-1"><label className="text-[10px] font-mono" style={{ color: '#6B7280' }}>ORIGINAL PRICE</label>
                <input value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm mt-1" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }} /></div>
            </div>
            <div className="mb-4">
              <label className="text-[10px] font-mono" style={{ color: '#6B7280' }}>DEAL DURATION (HOURS)</label>
              <input type="number" value={durationHours} onChange={(e) => setDurationHours(Math.max(1, Number(e.target.value)))} className="w-full px-3 py-2 rounded-lg text-sm mt-1" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }} />
            </div>
            <div className="mb-5">
              <label className="text-[10px] font-mono" style={{ color: '#6B7280' }}>REAL SHOPIFY PRODUCT URL</label>
              <input value={checkoutUrl} onChange={(e) => setCheckoutUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm mt-1 font-mono" style={{ background: 'rgba(255,255,255,0.06)', color: '#F0B429' }} />
            </div>
            <button onClick={resetTimer} className="w-full mb-4 py-2 rounded-lg text-xs font-bold" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}>Reset Countdown to Full Duration</button>
            <div className="rounded-2xl overflow-hidden" style={{ background: '#0A0B0F', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="text-[10px] font-mono" style={{ color: '#7A8494' }}>REAL INTEGRATION CODE</span>
                <button onClick={copyCode} className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded" style={{ background: copied ? '#3FA66B' : '#F0B429', color: '#0B0C12' }}>
                  {copied ? <Check size={11} /> : <Copy size={11} />} {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 text-[9px] overflow-x-auto max-h-72" style={{ color: '#8FF0C0', fontFamily: 'monospace' }}>{integrationCode}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
