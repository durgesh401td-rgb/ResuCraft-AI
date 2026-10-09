import React from 'react';
import { ProjectItem } from '../../types/resume';
import { Plus, Trash2, Sparkles, FolderGit2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon } from '../UI/BrandIcons';

interface Props {
  items: ProjectItem[];
  onChange: (updated: ProjectItem[]) => void;
  onOpenBulletModal: (text: string, onApply: (revised: string) => void) => void;
}

export const ProjectsForm: React.FC<Props> = ({ items, onChange, onOpenBulletModal }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(items[0]?.id || null);

  const handleAddItem = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      techStack: '',
      link: '',
      github: '',
      bullets: ['Architected core functionality delivering high performance and responsive user interaction.']
    };
    onChange([...items, newItem]);
    setExpandedId(newItem.id);
  };

  const handleRemoveItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<ProjectItem>) => {
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
          Technical Projects ({items.length})
        </span>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 rounded-lg border border-dashed border-slate-700 text-center text-slate-500 text-xs">
          No projects added yet. Click &quot;Add Project&quot; to showcase your software, IoT, or AI creations.
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
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100">
                        {item.title || `Project #${index + 1}`}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {item.techStack || 'No tech stack specified'}
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
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-1 border-t border-slate-700/60 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1">Project Name</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                          placeholder="e.g. Real-Time Object Detection Platform"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1">Tech Stack & Tools</label>
                        <input
                          type="text"
                          value={item.techStack}
                          onChange={(e) => handleUpdateItem(item.id, { techStack: e.target.value })}
                          placeholder="e.g. Python, YOLOv8, OpenCV, MySQL, Streamlit"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1 flex items-center gap-1">
                          <GithubIcon className="w-3 h-3 text-slate-400" />
                          <span>GitHub Repository Link</span>
                        </label>
                        <input
                          type="text"
                          value={item.github || ''}
                          onChange={(e) => handleUpdateItem(item.id, { github: e.target.value })}
                          placeholder="e.g. https://github.com/user/repo"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-300 block mb-1 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                          <span>Live Demo / Production URL</span>
                        </label>
                        <input
                          type="text"
                          value={item.link || ''}
                          onChange={(e) => handleUpdateItem(item.id, { link: e.target.value })}
                          placeholder="e.g. https://myproject.vercel.app"
                          className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="pt-2 border-t border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">
                          Implementation Details & Impact
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
                                placeholder="Engineered high-performance module reducing processing latency by 35%..."
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
