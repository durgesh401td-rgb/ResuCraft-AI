import React, { useState } from 'react';
import { X, Target, CheckCircle2, AlertCircle, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { ResumeData, ATSAnalysisResult } from '../../types/resume';
import { scanJobDescription } from '../../services/aiService';

interface Props {
  isOpen: boolean;
  resume: ResumeData;
  onClose: () => void;
  onAddMissingSkill?: (skill: string) => void;
}

export const AIAtsScannerModal: React.FC<Props> = ({ isOpen, resume, onClose, onAddMissingSkill }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSAnalysisResult | null>(null);

  if (!isOpen) return null;

  const handleScan = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    try {
      const res = await scanJobDescription(resume, jobDescription);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 border-emerald-500 bg-emerald-500/10';
    if (score >= 70) return 'text-blue-400 border-blue-500 bg-blue-500/10';
    if (score >= 55) return 'text-amber-400 border-amber-500 bg-amber-500/10';
    return 'text-rose-400 border-rose-500 bg-rose-500/10';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI ATS Job Description Matcher</h3>
              <p className="text-xs text-slate-400">Scan your resume against any job description to maximize ATS pass rate</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input JD */}
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Target Job Description (Paste from LinkedIn, Indeed, Google, etc.)
          </label>
          <textarea
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job requirements, skills list, and role responsibilities here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed font-sans"
          />
        </div>

        {/* Scan Button */}
        <button
          type="button"
          onClick={handleScan}
          disabled={loading || !jobDescription.trim()}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Keywords & Match Probability...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Calculate ATS Compatibility Score</span>
            </>
          )}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            {/* Score Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border-2 font-mono font-black ${getScoreColor(result.score)}`}>
                  <span className="text-2xl leading-none">{result.score}%</span>
                  <span className="text-[9px] uppercase tracking-wider mt-0.5">Match</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {result.score >= 85 ? 'Outstanding ATS Compatibility!' : result.score >= 70 ? 'Strong Match with Minor Gaps' : 'Needs Optimization for ATS'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Job Title Match: <span className={result.jobTitleMatch ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                      {result.jobTitleMatch ? 'Aligned' : 'Adjust Headline'}
                    </span> • Resume Length: ~{result.wordCount} words
                  </p>
                </div>
              </div>
            </div>

            {/* Keyword Matches & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Matched */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Matched Keywords ({result.matchedKeywords.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {result.matchedKeywords.length > 0 ? (
                    result.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">No direct keywords matched yet.</span>
                  )}
                </div>
              </div>

              {/* Missing */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Missing Keywords ({result.missingKeywords.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {result.missingKeywords.length > 0 ? (
                    result.missingKeywords.map((kw, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => onAddMissingSkill && onAddMissingSkill(kw)}
                        className="group flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition"
                        title="Click to add to Skills"
                      >
                        <span>{kw}</span>
                        <span className="text-[9px] text-rose-400 group-hover:text-rose-200">+</span>
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">All major keywords present!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold text-slate-200">Actionable Steps to Reach 90%+ Match</h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
