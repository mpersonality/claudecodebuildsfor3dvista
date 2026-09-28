import React, { useState, useRef } from 'react';
import { Mic, MicOff, MapPin, Check } from 'lucide-react';

export default function VoiceNavAssistant() {
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const [matched, setMatched] = useState(null);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  const panoramas = ['Main Entrance', 'Gallery Hall A', 'Gallery Hall B', 'Gift Shop', 'Rooftop View', 'Booth Twelve'];

  // Simple fuzzy match: lowercase, check if spoken words overlap significantly with a panorama name
  const fuzzyMatch = (spoken) => {
    const s = spoken.toLowerCase();
    let best = null, bestScore = 0;
    panoramas.forEach((p) => {
      const words = p.toLowerCase().split(' ');
      const score = words.filter((w) => s.includes(w)).length / words.length;
      if (score > bestScore) { bestScore = score; best = p; }
    });
    return bestScore >= 0.4 ? best : null;
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setSupported(false); return; }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => { setListening(true); setHeard(''); setMatched(null); };
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setHeard(transcript);
      setMatched(fuzzyMatch(transcript));
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center justify-center" style={{ background: '#0D0F14' }}>
      <div className="w-full max-w-sm text-center">
        <div className="text-[10px] tracking-[0.2em] uppercase font-mono mb-1" style={{ color: '#6B7A94' }}>
          M.P. Productions — 3DVista Toolkit
        </div>
        <h1 className="text-xl font-bold mb-1" style={{ color: '#F0F4FA', fontFamily: "'Space Grotesk', sans-serif" }}>
          Voice Navigation
        </h1>
        <p className="text-xs mb-6" style={{ color: '#6B7A94' }}>Say a panorama name to jump there</p>

        {!supported && (
          <div className="text-xs p-3 rounded-lg mb-4" style={{ background: 'rgba(255,90,90,0.1)', color: '#FF8A8A' }}>
            Speech recognition isn't supported in this browser — try Chrome or Edge.
          </div>
        )}

        {/* Mic button */}
        <button
          onClick={startListening}
          disabled={!supported}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all"
          style={{
            background: listening ? '#4C8DFF' : 'rgba(255,255,255,0.06)',
            boxShadow: listening ? '0 0 0 12px rgba(76,141,255,0.15)' : 'none',
          }}
        >
          {listening ? <Mic size={32} color="#fff" /> : <MicOff size={28} color="#6B7A94" />}
        </button>

        <div className="text-xs font-mono mb-6" style={{ color: listening ? '#4C8DFF' : '#4A5568' }}>
          {listening ? 'Listening...' : 'Tap the mic and speak'}
        </div>

        {/* Heard + matched result */}
        {heard && (
          <div className="rounded-xl p-4 mb-4 text-left" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-[10px] font-mono mb-1" style={{ color: '#6B7A94' }}>YOU SAID</div>
            <div className="text-sm mb-3" style={{ color: '#F0F4FA' }}>"{heard}"</div>
            {matched ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: 'rgba(63,166,107,0.15)' }}>
                <Check size={14} color="#3FA66B" />
                <span className="text-sm font-bold" style={{ color: '#3FA66B' }}>Navigating to {matched}</span>
              </div>
            ) : (
              <div className="text-xs" style={{ color: '#FF8A8A' }}>No close match found — try again</div>
            )}
          </div>
        )}

        {/* Available panoramas */}
        <div className="text-left">
          <div className="text-[10px] font-mono mb-2" style={{ color: '#6B7A94' }}>AVAILABLE PANORAMAS</div>
          <div className="flex flex-wrap gap-1.5">
            {panoramas.map((p) => (
              <span key={p} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px]" style={{ background: 'rgba(255,255,255,0.05)', color: '#A8B2C0' }}>
                <MapPin size={10} /> {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
