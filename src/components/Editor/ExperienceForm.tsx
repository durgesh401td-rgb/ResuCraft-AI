import React from 'react';
import { ExperienceItem } from '../../types/resume';
import { Plus, Trash2, Sparkles, Building, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  items: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
  onOpenBulletModal: (text: string, onApply: (revised: string) => void) => void;
}

export const ExperienceForm: React.FC<Props> = ({ items, onChange, onOpenBulletModal }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(items[0]?.id || null);

  const handleAddItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['Spearheaded key initiatives resulting in measurable improvements.']
    };
    onChange([...items, newItem]);
    setExpandedId(newItem.id);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<ExperienceItem>) => {
    onChange(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const handleAddBullet = (itemId: string) => {
    onChange(items.map(item => {
      if (item.id === itemId) {
        return { ...item, bullets: [...item.bullets, ''] };
      }
      return item;
    }));
  };

  const handleUpdateBullet = (itemId: string, index: number, text: string) => {
    onChange(items.map(item => {
      if (item.id === itemId) {
        const nextBullets = [...item.bullets];
        nextBullets[index] = text;
        return { ...item, bullets: nextBullets };
      }
      return item;
    }));
  };

  const handleRemoveBullet = (itemId: string, index: number) => {
    onChange(items.map(item => {
      if (item.id === itemId) {
        return { ...item, bullets: item.bullets.filter((_, i) => i !== index) };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">
          Work History & Internships ({items.length})
        </span>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 rounded-lg border border-dashed border-slate-700 text-center text-slate-500 text-xs">
          No work experience added yet. Click &quot;Add Position&quot; to list jobs, internships, or freelance roles.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="bg-slate-800/60 border border-slate-700/80 rounded-xl overflow-hidden transition">
                {/* Header card toggle */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/90 transition select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-blue-400" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100">
                        {item.role || item.company ? `${item.role || 'Role'} ${item.company ? `at ${item.company}` : ''}` : `Position #${index + 1}`}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {item.startDate || item.endDate ? `${item.startDate} – ${item.current ? 'Present' : item.endDate}` : 'No dates specified'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-md transition"
                      title="Delete experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Fields */}
                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-slate-700/60 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={item.company}
                          onChange={(e) => handleUpdateItem(item.id, { company: e.target.value })}
                          placeholder="e.g. Blinkit, Google, Freelance"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1">Job Title</label>
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => handleUpdateItem(item.id, { role: e.target.value })}
                          placeholder="e.g. Operations Associate, Software Engineer"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>Location</span>
                        </label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => handleUpdateItem(item.id, { location: e.target.value })}
                          placeholder="e.g. Nashik, India (or Remote)"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-[11px] font-medium text-slate-300 block mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>Start Date</span>
                          </label>
                          <input
                            type="text"
                            value={item.startDate}
                            onChange={(e) => handleUpdateItem(item.id, { startDate: e.target.value })}
                            placeholder="e.g. Oct 2025"
                            className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="text-[11px] font-medium text-slate-300 block mb-1">
                            End Date
                          </label>
                          <input
                            type="text"
                            value={item.current ? 'Present' : item.endDate}
                            disabled={item.current}
                            onChange={(e) => handleUpdateItem(item.id, { endDate: e.target.value })}
                            placeholder="e.g. Mar 2026"
                            className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id={`current-${item.id}`}
                          checked={item.current}
                          onChange={(e) => handleUpdateItem(item.id, { current: e.target.checked })}
                          className="rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-900"
                        />
                        <label htmlFor={`current-${item.id}`} className="text-xs text-slate-300 cursor-pointer">
                          I currently work here
                        </label>
                      </div>
                    </div>

                    {/* Bullet Points with individual AI Polisher */}
                    <div className="pt-2 border-t border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">
                          Key Achievements & Responsibilities
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet(item.id)}
                          className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-medium"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {item.bullets.map((bullet, bIndex) => (
                          <div key={bIndex} className="flex items-start gap-1.5 group">
                            <span className="text-slate-500 mt-2 text-xs select-none">•</span>
                            <div className="flex-1 relative">
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) => handleUpdateBullet(item.id, bIndex, e.target.value)}
                                placeholder="Describe what you built or accomplished using action verbs and measurable metrics..."
                                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                              />
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  onOpenBulletModal(bullet, (revised) => {
                                    handleUpdateBullet(item.id, bIndex, revised);
                                  });
                                }}
                                className="p-1 text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 rounded border border-amber-400/30 transition shadow-sm"
                                title="AI Polish (STAR & Metrics Method)"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveBullet(item.id, bIndex)}
                                className="p-1 text-slate-500 hover:text-red-400 rounded hover:bg-slate-700/50 transition"
                                title="Delete bullet"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
