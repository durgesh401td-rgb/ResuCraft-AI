import React, { useState } from 'react';
import { SkillCategory } from '../../types/resume';
import { Plus, Trash2, X, Sparkles, Code2, Lightbulb } from 'lucide-react';
import { ROLE_SKILL_SUGGESTIONS } from '../../services/aiService';

interface Props {
  categories: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ categories, onChange }) => {
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `skills-${Date.now()}`,
      categoryName: 'Technical Skills',
      skills: []
    };
    onChange([...categories, newCat]);
  };

  const handleRemoveCategory = (id: string) => {
    onChange(categories.filter(c => c.id !== id));
  };

  const handleUpdateCategoryName = (id: string, name: string) => {
    onChange(categories.map(c => c.id === id ? { ...c, categoryName: name } : c));
  };

  const handleAddSkillToCat = (catId: string) => {
    const skillText = (newSkillInput[catId] || '').trim();
    if (!skillText) return;

    onChange(categories.map(cat => {
      if (cat.id === catId && !cat.skills.includes(skillText)) {
        return { ...cat, skills: [...cat.skills, skillText] };
      }
      return cat;
    }));

    setNewSkillInput({ ...newSkillInput, [catId]: '' });
  };

  const handleRemoveSkill = (catId: string, skillToRemove: string) => {
    onChange(categories.map(cat => {
      if (cat.id === catId) {
        return { ...cat, skills: cat.skills.filter(s => s !== skillToRemove) };
      }
      return cat;
    }));
  };

  const handleApplyRoleSkills = (roleKey: string) => {
    const suggested = ROLE_SKILL_SUGGESTIONS[roleKey] || [];
    if (categories.length === 0) {
      onChange([
        {
          id: `skills-${Date.now()}`,
          categoryName: 'Core Competencies',
          skills: suggested
        }
      ]);
    } else {
      // Add to first category or create dedicated category
      const targetCat = categories[0];
      const merged = Array.from(new Set([...targetCat.skills, ...suggested]));
      onChange(categories.map((c, i) => i === 0 ? { ...c, skills: merged } : c));
    }
    setShowRoleSuggestions(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">
          Skill Categories & Tags
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowRoleSuggestions(!showRoleSuggestions)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Suggest by Role</span>
          </button>
          <button
            type="button"
            onClick={handleAddCategory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Role Suggestions Drawer */}
      {showRoleSuggestions && (
        <div className="p-3.5 rounded-xl bg-slate-800/90 border border-amber-500/30 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Select a role to auto-populate high-relevance ATS skills:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { key: 'ai_ml', label: 'AI / ML Engineer' },
              { key: 'fullstack', label: 'Full Stack Dev' },
              { key: 'frontend', label: 'Frontend Dev' },
              { key: 'backend', label: 'Backend Dev' },
              { key: 'data_analyst', label: 'Data Analyst' },
              { key: 'devops', label: 'DevOps & Cloud' },
              { key: 'iot', label: 'IoT & Embedded' },
            ].map(r => (
              <button
                key={r.key}
                type="button"
                onClick={() => handleApplyRoleSkills(r.key)}
                className="text-left px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-amber-500/20 text-xs text-slate-200 border border-slate-700 hover:border-amber-500/40 transition"
              >
                + {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="p-6 rounded-lg border border-dashed border-slate-700 text-center text-slate-500 text-xs">
          No skill categories defined. Click &quot;Add Category&quot; or &quot;AI Suggest by Role&quot;.
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="p-3.5 bg-slate-800/60 border border-slate-700/80 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <Code2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <input
                    type="text"
                    value={cat.categoryName}
                    onChange={(e) => handleUpdateCategoryName(cat.id, e.target.value)}
                    placeholder="e.g. Programming Languages, Tools, AI/ML"
                    className="bg-transparent text-xs font-bold text-slate-100 border-b border-transparent hover:border-slate-600 focus:border-blue-500 focus:outline-none px-1 py-0.5 w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(cat.id)}
                  className="p-1 text-slate-500 hover:text-red-400 rounded transition"
                  title="Remove category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-1.5 min-h-[30px] p-2 bg-slate-900/70 rounded-lg border border-slate-700/50">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700 shadow-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(cat.id, skill)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {/* Input for new skill */}
                <div className="inline-flex items-center gap-1">
                  <input
                    type="text"
                    value={newSkillInput[cat.id] || ''}
                    onChange={(e) => setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkillToCat(cat.id);
                      }
                    }}
                    placeholder="Type skill & press Enter..."
                    className="bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none px-2 py-0.5 w-40"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkillToCat(cat.id)}
                    className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 px-1.5 py-0.5 rounded bg-blue-500/10 hover:bg-blue-500/20"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
