import React, { useState } from 'react';
import { Sparkles, RefreshCw, Wand2, Check } from 'lucide-react';
import { generateSummary } from '../../services/aiService';

interface Props {
  summary: string;
  role: string;
  skills: string[];
  onChange: (updated: string) => void;
  onOpenBulletModal?: (text: string, onApply: (revised: string) => void) => void;
}

export const SummaryForm: React.FC<Props> = ({ summary, role, skills, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const generated = await generateSummary(role, 'Entry to Mid Level', skills, 'Professional & Impactful');
      onChange(generated);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300">
          Professional Profile / Career Summary
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={loading}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition shadow-sm"
            title="Generate AI summary based on role and skills"
          >
            {loading ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3 text-amber-300" />
            )}
            <span>{summary ? 'AI Rewrite' : 'AI Generate'}</span>
          </button>

          {summary && (
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 transition"
              title="Copy text"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : 'Copy'}
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a concise 3-4 sentence professional summary highlighting your primary technical proficiencies, major achievements, and career focus..."
          className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 leading-relaxed"
        />
        <div className="flex justify-between items-center text-[11px] text-slate-500 px-1 mt-1">
          <span className="flex items-center gap-1">
            <Wand2 className="w-3 h-3 text-blue-400" />
            Tip: Keep between 40-75 words for optimal ATS density.
          </span>
          <span>{summary.trim() ? summary.trim().split(/\s+/).length : 0} words</span>
        </div>
      </div>
    </div>
  );
};
