import React from 'react';
import { EducationItem } from '../../types/resume';
import { Plus, Trash2, GraduationCap, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  items: EducationItem[];
  onChange: (updated: EducationItem[]) => void;
}

export const EducationForm: React.FC<Props> = ({ items, onChange }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(items[0]?.id || null);

  const handleAddItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      bullets: []
    };
    onChange([...items, newItem]);
    setExpandedId(newItem.id);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<EducationItem>) => {
    onChange(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">
          Education & Academic Credentials ({items.length})
        </span>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 rounded-lg border border-dashed border-slate-700 text-center text-slate-500 text-xs">
          No education history added yet. Click &quot;Add Education&quot; to include university degrees, diplomas, or relevant coursework.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="bg-slate-800/60 border border-slate-700/80 rounded-xl overflow-hidden transition">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/90 transition select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100">
                        {item.degree ? `${item.degree} in ${item.fieldOfStudy || 'Field'}` : `Education #${index + 1}`}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {item.institution ? `${item.institution} (${item.startDate} – ${item.endDate})` : 'Institution not set'}
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
                      title="Delete education"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-slate-700/60 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-medium text-slate-300 block mb-1">Institution / University</label>
                        <input
                          type="text"
                          value={item.institution}
                          onChange={(e) => handleUpdateItem(item.id, { institution: e.target.value })}
                          placeholder="e.g. Sandip University, Nashik"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1">Degree Type</label>
                        <input
                          type="text"
                          value={item.degree}
                          onChange={(e) => handleUpdateItem(item.id, { degree: e.target.value })}
                          placeholder="e.g. B.Tech, B.S., M.S., Diploma"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1">Major / Field of Study</label>
                        <input
                          type="text"
                          value={item.fieldOfStudy}
                          onChange={(e) => handleUpdateItem(item.id, { fieldOfStudy: e.target.value })}
                          placeholder="e.g. Computer Science (AI & ML)"
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
                          placeholder="e.g. Nashik, Maharashtra"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1">GPA / CGPA / Honors</label>
                        <input
                          type="text"
                          value={item.gpa || ''}
                          onChange={(e) => handleUpdateItem(item.id, { gpa: e.target.value })}
                          placeholder="e.g. 8.6 / 10.0 or 3.8 / 4.0"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-[11px] font-medium text-slate-300 block mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>Start Year</span>
                          </label>
                          <input
                            type="text"
                            value={item.startDate}
                            onChange={(e) => handleUpdateItem(item.id, { startDate: e.target.value })}
                            placeholder="e.g. 2023"
                            className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="text-[11px] font-medium text-slate-300 block mb-1">
                            Graduation Year
                          </label>
                          <input
                            type="text"
                            value={item.endDate}
                            onChange={(e) => handleUpdateItem(item.id, { endDate: e.target.value })}
                            placeholder="e.g. 2027"
                            className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
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
