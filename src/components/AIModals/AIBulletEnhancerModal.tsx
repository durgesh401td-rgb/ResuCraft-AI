import React, { useState } from 'react';
import { Sparkles, X, Check, RefreshCw, ArrowRight } from 'lucide-react';
import { enhanceBulletPoint } from '../../services/aiService';

interface Props {
  isOpen: boolean;
  initialText: string;
  role?: string;
  onClose: () => void;
  onApply: (revised: string) => void;
}

export const AIBulletEnhancerModal: React.FC<Props> = ({
  isOpen,
  initialText,
  role,
  onClose,
  onApply,
}) => {
  const [text, setText] = useState(initialText);
  const [style, setStyle] = useState<'star' | 'metrics' | 'executive'>('star');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ improved: string; alternatives: string[] } | null>(null);

  React.useEffect(() => {
    setText(initialText);
    setResult(null);
  }, [initialText]);

  if (!isOpen) return null;

  const handleEnhance = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await enhanceBulletPoint(text, role, style);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (chosen: string) => {
    onApply(chosen);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Bullet Point Enhancer</h3>
              <p className="text-[11px] text-slate-400">Transform passive descriptions into high-impact STAR achievements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Style selection */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">Optimization Formula</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'star', label: 'STAR Method', desc: 'Situation, Action & Result' },
              { id: 'metrics', label: 'Metric-Driven', desc: 'High % numbers & stats' },
              { id: 'executive', label: 'Executive Tone', desc: 'Leadership & strategy' },
            ].map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStyle(s.id as any)}
                className={`p-2 rounded-xl text-left border transition ${
                  style === s.id
                    ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                    : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-white">{s.label}</div>
                <div className="text-[10px] text-slate-400">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Textarea */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Your Draft Bullet Point</label>
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. worked on fixing bugs and improving the website performance..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Trigger Button */}
        <button
          type="button"
          onClick={handleEnhance}
          disabled={loading || !text.trim()}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing & Rewriting...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Generate High-Impact Rewrites</span>
            </>
          )}
        </button>

        {/* Output Results */}
        {result && (
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Select an enhanced version to apply:</span>
            </span>

            {/* Recommended Top Choice */}
            <div
              onClick={() => handleSelectOption(result.improved)}
              className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/40 hover:border-blue-400 cursor-pointer transition group"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500 text-white">
                  Recommended (STAR)
                </span>
                <span className="text-xs text-blue-400 group-hover:translate-x-0.5 transition flex items-center gap-1">
                  Apply <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {result.improved}
              </p>
            </div>

            {/* Alternatives */}
            {result.alternatives.map((alt, i) => (
              <div
                key={i}
                onClick={() => handleSelectOption(alt)}
                className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-500 cursor-pointer transition group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Variation #{i + 1}
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-white transition flex items-center gap-1">
                    Apply <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {alt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
