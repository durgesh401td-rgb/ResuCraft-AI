import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Zap, BarChart3 } from 'lucide-react';
import { ResumeData } from '../../types/resume';
import { auditResume } from '../../services/aiService';

interface Props {
  isOpen: boolean;
  resume: ResumeData;
  onClose: () => void;
}

export const AIHealthAuditModal: React.FC<Props> = ({ isOpen, resume, onClose }) => {
  if (!isOpen) return null;

  const audit = auditResume(resume);

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'B':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'C':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Resume Health & Impact Audit</h3>
              <p className="text-xs text-slate-400">Deep analysis of action verbs, metric density, and ATS readiness</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Score Overview */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-black ${getGradeBadge(audit.grade)}`}>
              <span className="text-2xl">{audit.grade}</span>
              <span className="text-[9px] uppercase tracking-wider">{audit.overallScore}/100</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {audit.overallScore >= 85 ? 'Top-Tier Resume Profile' : audit.overallScore >= 70 ? 'Competitive Engineering Resume' : 'Needs Optimization'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated against Google XYZ and Fortune 500 ATS screening standards
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown Meters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-1">Action Verbs</div>
            <div className="text-lg font-mono font-bold text-blue-400">{audit.breakdown.actionVerbsScore}%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${audit.breakdown.actionVerbsScore}%` }}></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-1">Metrics & Stats</div>
            <div className="text-lg font-mono font-bold text-purple-400">{audit.breakdown.quantifiableMetricsScore}%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: `${audit.breakdown.quantifiableMetricsScore}%` }}></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-1">Completeness</div>
            <div className="text-lg font-mono font-bold text-emerald-400">{audit.breakdown.completenessScore}%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${audit.breakdown.completenessScore}%` }}></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 mb-1">Skill Depth</div>
            <div className="text-lg font-mono font-bold text-amber-400">{audit.breakdown.skillsRelevanceScore}%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${audit.breakdown.skillsRelevanceScore}%` }}></div>
            </div>
          </div>
        </div>

        {/* Verbs & Metrics Found */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Power Action Verbs Used ({audit.detectedActionVerbs.length})</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {audit.detectedActionVerbs.length > 0 ? (
                audit.detectedActionVerbs.map((v, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-mono">
                    {v}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-xs">None detected yet.</span>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
              <span>Quantified Impact Tokens ({audit.metricsFound.length})</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {audit.metricsFound.length > 0 ? (
                audit.metricsFound.map((m, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono">
                    {m}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-xs">No metrics found. Add numbers like &quot;35%&quot;, &quot;2x&quot;.</span>
              )}
            </div>
          </div>
        </div>

        {/* Positives & Improvements */}
        <div className="space-y-3 pt-2">
          {audit.positives.length > 0 && (
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resume Strengths</span>
              </h5>
              <ul className="space-y-1 text-xs text-slate-300">
                {audit.positives.map((p, i) => (
                  <li key={i} className="pl-4 relative before:content-['•'] before:absolute before:left-1 before:text-emerald-400">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {audit.improvements.length > 0 && (
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Recommended Enhancements</span>
              </h5>
              <ul className="space-y-1 text-xs text-slate-300">
                {audit.improvements.map((imp, i) => (
                  <li key={i} className="pl-4 relative before:content-['•'] before:absolute before:left-1 before:text-amber-400">
                    {imp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
