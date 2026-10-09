import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SummaryForm } from './SummaryForm';
import { ExperienceForm } from './ExperienceForm';
import { ProjectsForm } from './ProjectsForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { CertificationsAndExtrasForm } from './CertificationsAndExtrasForm';
import { User, FileText, Briefcase, FolderGit2, GraduationCap, Code2, Award, Eye, EyeOff } from 'lucide-react';

interface Props {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  onOpenBulletModal: (text: string, onApply: (revised: string) => void) => void;
}

type TabType = 'personal' | 'summary' | 'experience' | 'projects' | 'skills' | 'education' | 'extras';

export const EditorContainer: React.FC<Props> = ({ resume, onChange, onOpenBulletModal }) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  const tabs: { id: TabType; label: string; icon: React.ReactNode; sectionKey?: keyof ResumeData['activeSections'] }[] = [
    { id: 'personal', label: 'Contact', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'summary', label: 'Summary', icon: <FileText className="w-3.5 h-3.5" />, sectionKey: 'summary' },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-3.5 h-3.5" />, sectionKey: 'experience' },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-3.5 h-3.5" />, sectionKey: 'projects' },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-3.5 h-3.5" />, sectionKey: 'skills' },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-3.5 h-3.5" />, sectionKey: 'education' },
    { id: 'extras', label: 'Extras', icon: <Award className="w-3.5 h-3.5" />, sectionKey: 'certifications' },
  ];

  const toggleSectionVisibility = (key: keyof ResumeData['activeSections']) => {
    onChange({
      ...resume,
      activeSections: {
        ...resume.activeSections,
        [key]: !resume.activeSections[key],
      },
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      {/* Horizontal Tabs Navigation */}
      <div className="no-print border-b border-slate-800 bg-slate-950/70 p-2 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isVisible = tab.sectionKey ? resume.activeSections[tab.sectionKey] : true;

          return (
            <div key={tab.id} className="flex items-center">
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition select-none ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>

              {tab.sectionKey && (
                <button
                  type="button"
                  onClick={() => toggleSectionVisibility(tab.sectionKey!)}
                  className={`p-1 ml-0.5 rounded text-[10px] transition ${
                    isVisible ? 'text-slate-500 hover:text-slate-300' : 'text-rose-400 hover:text-rose-300'
                  }`}
                  title={isVisible ? 'Visible in resume (click to hide)' : 'Hidden from resume (click to show)'}
                >
                  {isVisible ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {activeTab === 'personal' && (
          <PersonalInfoForm
            data={resume.personalInfo}
            onChange={(updated) => onChange({ ...resume, personalInfo: updated })}
          />
        )}

        {activeTab === 'summary' && (
          <SummaryForm
            summary={resume.summary}
            role={resume.personalInfo.jobTitle}
            skills={resume.skillCategories.flatMap((c) => c.skills)}
            onChange={(updated) => onChange({ ...resume, summary: updated })}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            items={resume.experience}
            onChange={(updated) => onChange({ ...resume, experience: updated })}
            onOpenBulletModal={onOpenBulletModal}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsForm
            items={resume.projects}
            onChange={(updated) => onChange({ ...resume, projects: updated })}
            onOpenBulletModal={onOpenBulletModal}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsForm
            categories={resume.skillCategories}
            onChange={(updated) => onChange({ ...resume, skillCategories: updated })}
          />
        )}

        {activeTab === 'education' && (
          <EducationForm
            items={resume.education}
            onChange={(updated) => onChange({ ...resume, education: updated })}
          />
        )}

        {activeTab === 'extras' && (
          <CertificationsAndExtrasForm
            certifications={resume.certifications}
            awards={resume.awards}
            languages={resume.languages}
            onUpdateCertifications={(items) => onChange({ ...resume, certifications: items })}
            onUpdateAwards={(items) => onChange({ ...resume, awards: items })}
            onUpdateLanguages={(items) => onChange({ ...resume, languages: items })}
          />
        )}
      </div>
    </div>
  );
};
