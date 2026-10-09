import React, { useState, useEffect } from 'react';
import { ResumeData, ThemeConfig } from './types/resume';
import { durgeshResume } from './data/sampleResumes';
import { Navbar } from './components/Navbar';
import { EditorContainer } from './components/Editor/EditorContainer';
import { ResumePreviewContainer } from './components/Templates/ResumePreviewContainer';
import { AIBulletEnhancerModal } from './components/AIModals/AIBulletEnhancerModal';
import { AIAtsScannerModal } from './components/AIModals/AIAtsScannerModal';
import { AICoverLetterModal } from './components/AIModals/AICoverLetterModal';
import { AIHealthAuditModal } from './components/AIModals/AIHealthAuditModal';
import { ApiKeySettingsModal } from './components/AIModals/ApiKeySettingsModal';

const STORAGE_KEY_RESUME = 'resucraft_resume_data_v2';
const STORAGE_KEY_THEME = 'resucraft_theme_config_v2';

export const App: React.FC = () => {
  // Load initial resume from localStorage or default to Durgesh's pre-populated project profile
  const [resume, setResume] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_RESUME);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore error
        }
      }
    }
    return durgeshResume;
  });

  // Load initial theme
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore error
        }
      }
    }
    return {
      template: 'modern',
      accentColor: '#4f46e5',
      fontFamily: 'inter',
      spacing: 'normal',
      showPhoto: false,
    };
  });

  // View mode
  const [activeView, setActiveView] = useState<'split' | 'editor' | 'preview'>('split');

  // Modals state
  const [bulletModal, setBulletModal] = useState<{
    isOpen: boolean;
    initialText: string;
    onApply: (revised: string) => void;
  }>({
    isOpen: false,
    initialText: '',
    onApply: () => {},
  });

  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [coverLetterModalOpen, setCoverLetterModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [apiKeyVersion, setApiKeyVersion] = useState(0);

  // Auto-save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(theme));
  }, [theme]);

  // Handle open AI Bullet Enhancer Modal
  const handleOpenBulletModal = (text: string, onApply: (revised: string) => void) => {
    setBulletModal({
      isOpen: true,
      initialText: text,
      onApply,
    });
  };

  // Add missing keyword from ATS Scanner directly to Skills section
  const handleAddMissingSkill = (skill: string) => {
    if (resume.skillCategories.length === 0) {
      setResume({
        ...resume,
        skillCategories: [
          {
            id: `skills-${Date.now()}`,
            categoryName: 'Target ATS Competencies',
            skills: [skill],
          },
        ],
      });
    } else {
      const firstCat = resume.skillCategories[0];
      if (!firstCat.skills.includes(skill)) {
        setResume({
          ...resume,
          skillCategories: resume.skillCategories.map((cat, i) =>
            i === 0 ? { ...cat, skills: [...cat.skills, skill] } : cat
          ),
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      {/* Top Application Bar */}
      <Navbar
        resume={resume}
        theme={theme}
        onUpdateResume={setResume}
        onUpdateTheme={setTheme}
        onOpenAtsModal={() => setAtsModalOpen(true)}
        onOpenCoverLetterModal={() => setCoverLetterModalOpen(true)}
        onOpenAuditModal={() => setAuditModalOpen(true)}
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* Main Workspace (Split View / Editor / Preview) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        {(activeView === 'split' || activeView === 'editor') && (
          <div
            className={`h-full overflow-hidden transition-all duration-200 ${
              activeView === 'split' ? 'w-full md:w-1/2 lg:w-[48%] xl:w-[45%]' : 'w-full'
            }`}
          >
            <EditorContainer
              resume={resume}
              onChange={setResume}
              onOpenBulletModal={handleOpenBulletModal}
            />
          </div>
        )}

        {/* Live Resume Preview Panel */}
        {(activeView === 'split' || activeView === 'preview') && (
          <div
            className={`h-full overflow-hidden transition-all duration-200 ${
              activeView === 'split' ? 'hidden md:flex flex-1' : 'w-full flex'
            }`}
          >
            <ResumePreviewContainer data={resume} theme={theme} />
          </div>
        )}
      </div>

      {/* AI Bullet Point Enhancer Modal */}
      <AIBulletEnhancerModal
        isOpen={bulletModal.isOpen}
        initialText={bulletModal.initialText}
        role={resume.personalInfo.jobTitle}
        onClose={() => setBulletModal(prev => ({ ...prev, isOpen: false }))}
        onApply={bulletModal.onApply}
      />

      {/* AI ATS Scanner Modal */}
      <AIAtsScannerModal
        isOpen={atsModalOpen}
        resume={resume}
        onClose={() => setAtsModalOpen(false)}
        onAddMissingSkill={handleAddMissingSkill}
      />

      {/* AI Tailored Cover Letter Modal */}
      <AICoverLetterModal
        isOpen={coverLetterModalOpen}
        resume={resume}
        onClose={() => setCoverLetterModalOpen(false)}
      />

      {/* AI Resume Health & Impact Audit Modal */}
      <AIHealthAuditModal
        isOpen={auditModalOpen}
        resume={resume}
        onClose={() => setAuditModalOpen(false)}
      />

      {/* API Key Settings Modal */}
      <ApiKeySettingsModal
        key={apiKeyVersion}
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onKeyUpdated={() => setApiKeyVersion(prev => prev + 1)}
      />
    </div>
  );
};

export default App;
