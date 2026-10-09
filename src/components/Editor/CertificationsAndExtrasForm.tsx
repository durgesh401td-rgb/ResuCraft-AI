import React from 'react';
import { CertificationItem, AwardItem, LanguageItem } from '../../types/resume';
import { Award, Award as CertIcon, Globe2, Plus, Trash2 } from 'lucide-react';

interface Props {
  certifications: CertificationItem[];
  awards: AwardItem[];
  languages: LanguageItem[];
  onUpdateCertifications: (items: CertificationItem[]) => void;
  onUpdateAwards: (items: AwardItem[]) => void;
  onUpdateLanguages: (items: LanguageItem[]) => void;
}

export const CertificationsAndExtrasForm: React.FC<Props> = ({
  certifications,
  awards,
  languages,
  onUpdateCertifications,
  onUpdateAwards,
  onUpdateLanguages,
}) => {
  // Certifications Helpers
  const handleAddCert = () => {
    onUpdateCertifications([
      ...certifications,
      { id: `cert-${Date.now()}`, name: '', issuer: '', date: '' }
    ]);
  };
  const handleRemoveCert = (id: string) => {
    onUpdateCertifications(certifications.filter(c => c.id !== id));
  };
  const handleUpdateCert = (id: string, updates: Partial<CertificationItem>) => {
    onUpdateCertifications(certifications.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  // Awards Helpers
  const handleAddAward = () => {
    onUpdateAwards([
      ...awards,
      { id: `award-${Date.now()}`, title: '', issuer: '', date: '' }
    ]);
  };
  const handleRemoveAward = (id: string) => {
    onUpdateAwards(awards.filter(a => a.id !== id));
  };
  const handleUpdateAward = (id: string, updates: Partial<AwardItem>) => {
    onUpdateAwards(awards.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  // Languages Helpers
  const handleAddLang = () => {
    onUpdateLanguages([
      ...languages,
      { id: `lang-${Date.now()}`, language: '', proficiency: 'Professional' }
    ]);
  };
  const handleRemoveLang = (id: string) => {
    onUpdateLanguages(languages.filter(l => l.id !== id));
  };
  const handleUpdateLang = (id: string, updates: Partial<LanguageItem>) => {
    onUpdateLanguages(languages.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  return (
    <div className="space-y-6">
      {/* Certifications Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CertIcon className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-semibold text-slate-200">Certifications & Licenses</h4>
          </div>
          <button
            type="button"
            onClick={handleAddCert}
            className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300"
          >
            <Plus className="w-3 h-3" />
            <span>Add Certification</span>
          </button>
        </div>

        {certifications.map((c) => (
          <div key={c.id} className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
            <input
              type="text"
              value={c.name}
              onChange={(e) => handleUpdateCert(c.id, { name: e.target.value })}
              placeholder="Certification Title (e.g. AWS Solutions Architect)"
              className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500"
            />
            <input
              type="text"
              value={c.issuer}
              onChange={(e) => handleUpdateCert(c.id, { issuer: e.target.value })}
              placeholder="Issuer (e.g. Google Cloud, Coursera)"
              className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={c.date}
                onChange={(e) => handleUpdateCert(c.id, { date: e.target.value })}
                placeholder="Date (e.g. 2025)"
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500 w-24"
              />
              <button
                type="button"
                onClick={() => handleRemoveCert(c.id)}
                className="p-1 text-slate-500 hover:text-red-400 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Honors & Awards */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-semibold text-slate-200">Honors & Awards</h4>
          </div>
          <button
            type="button"
            onClick={handleAddAward}
            className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300"
          >
            <Plus className="w-3 h-3" />
            <span>Add Award</span>
          </button>
        </div>

        {awards.map((a) => (
          <div key={a.id} className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
            <input
              type="text"
              value={a.title}
              onChange={(e) => handleUpdateAward(a.id, { title: e.target.value })}
              placeholder="Award Title (e.g. Hackathon 1st Place)"
              className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500"
            />
            <input
              type="text"
              value={a.issuer}
              onChange={(e) => handleUpdateAward(a.id, { issuer: e.target.value })}
              placeholder="Organization / Issuer"
              className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={a.date}
                onChange={(e) => handleUpdateAward(a.id, { date: e.target.value })}
                placeholder="Date (e.g. 2025)"
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500 w-24"
              />
              <button
                type="button"
                onClick={() => handleRemoveAward(a.id)}
                className="p-1 text-slate-500 hover:text-red-400 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-semibold text-slate-200">Languages</h4>
          </div>
          <button
            type="button"
            onClick={handleAddLang}
            className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300"
          >
            <Plus className="w-3 h-3" />
            <span>Add Language</span>
          </button>
        </div>

        {languages.map((l) => (
          <div key={l.id} className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg flex items-center gap-2">
            <input
              type="text"
              value={l.language}
              onChange={(e) => handleUpdateLang(l.id, { language: e.target.value })}
              placeholder="Language (e.g. English, Hindi, German)"
              className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 placeholder-slate-500 flex-1"
            />
            <select
              value={l.proficiency}
              onChange={(e) => handleUpdateLang(l.id, { proficiency: e.target.value as LanguageItem['proficiency'] })}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-100 focus:outline-none"
            >
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Professional">Professional</option>
              <option value="Conversational">Conversational</option>
              <option value="Basic">Basic</option>
            </select>
            <button
              type="button"
              onClick={() => handleRemoveLang(l.id)}
              className="p-1 text-slate-500 hover:text-red-400 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
