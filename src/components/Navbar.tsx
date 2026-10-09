import React, { useRef } from 'react';
import { ResumeData, ThemeConfig, TemplateType, FontType } from '../types/resume';
import { COLOR_PRESETS } from './Templates/templateStyles';
import { durgeshResume, alexRiveraResume, sophiaChenResume, emptyResume } from '../data/sampleResumes';
import { triggerPrint, downloadPdfFromElement, exportToJson, exportToPlainText } from '../utils/exportUtils';
import {
  Sparkles,
  Download,
  Printer,
  FileCode,
  FileText,
  Upload,
  Key,
  Target,
  ShieldCheck,
  Palette,
  Layers,
  Check
} from 'lucide-react';

interface Props {
  resume: ResumeData;
  theme: ThemeConfig;
  onUpdateResume: (data: ResumeData) => void;
  onUpdateTheme: (theme: ThemeConfig) => void;
  onOpenAtsModal: () => void;
  onOpenCoverLetterModal: () => void;
  onOpenAuditModal: () => void;
  onOpenApiKeyModal: () => void;
  activeView: 'split' | 'editor' | 'preview';
  onViewChange: (view: 'split' | 'editor' | 'preview') => void;
  atsScore?: number;
}

export const Navbar: React.FC<Props> = ({
  resume,
  theme,
  onUpdateResume,
  onUpdateTheme,
  onOpenAtsModal,
  onOpenCoverLetterModal,
  onOpenAuditModal,
  onOpenApiKeyModal,
  activeView,
  onViewChange,
  atsScore,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloading, setDownloading] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState(false);

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      const fileName = `${(resume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
      await downloadPdfFromElement('resume-print-area', fileName);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyPlainText = () => {
    const text = exportToPlainText(resume);
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.personalInfo) {
          onUpdateResume(json);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="no-print bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-slate-200 select-none">
      {/* Brand & CEP Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                ResuCraft <span className="text-blue-400">AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                CEP 2
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden sm:block">
              Intelligent ATS Resume Engine & Studio
            </div>
          </div>
        </div>

        {/* Load Sample Dropdown */}
        <div className="hidden lg:flex items-center ml-2 border-l border-slate-800 pl-3">
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'durgesh') onUpdateResume(durgeshResume);
              if (val === 'alex') onUpdateResume(alexRiveraResume);
              if (val === 'sophia') onUpdateResume(sophiaChenResume);
              if (val === 'empty') onUpdateResume(emptyResume);
              e.target.value = '';
            }}
            defaultValue=""
            className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none hover:border-slate-600 transition"
          >
            <option value="" disabled>Load Sample Resume...</option>
            <option value="durgesh">⚡ Durgesh Sonar (AI & ML / IoT)</option>
            <option value="alex">☁️ Alex Rivera (Cloud Full Stack)</option>
            <option value="sophia">📊 Sophia Chen (Data & BI Analyst)</option>
            <option value="empty">📄 Blank Canvas</option>
          </select>
        </div>
      </div>

      {/* Template & Styling Controls */}
      <div className="flex items-center flex-wrap gap-2 text-xs">
        {/* Template Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={theme.template}
            onChange={(e) => onUpdateTheme({ ...theme, template: e.target.value as TemplateType })}
            className="bg-transparent text-slate-200 focus:outline-none text-xs font-medium cursor-pointer"
          >
            <option value="modern" className="bg-slate-900">Modern Clean</option>
            <option value="executive" className="bg-slate-900">Executive Serif (Ivy)</option>
            <option value="tech" className="bg-slate-900">Tech Minimalist</option>
            <option value="creative" className="bg-slate-900">Creative Two-Column</option>
            <option value="compact" className="bg-slate-900">Compact Single-Page</option>
          </select>
        </div>

        {/* Color Palette Picker */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
          <Palette className="w-3.5 h-3.5 text-slate-400 mr-0.5" />
          <div className="flex items-center gap-1">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => onUpdateTheme({ ...theme, accentColor: color.hex })}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  theme.accentColor === color.hex ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-950' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Font Family Selector */}
        <select
          value={theme.fontFamily}
          onChange={(e) => onUpdateTheme({ ...theme, fontFamily: e.target.value as FontType })}
          className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-300 focus:outline-none cursor-pointer hidden md:block"
        >
          <option value="inter" className="bg-slate-900">Inter Sans</option>
          <option value="serif" className="bg-slate-900">Merriweather Serif</option>
          <option value="mono" className="bg-slate-900">JetBrains Mono</option>
          <option value="display" className="bg-slate-900">Poppins Display</option>
        </select>
      </div>

      {/* AI Super-Tools & Modals */}
      <div className="flex items-center gap-2">
        {/* ATS Scanner Button */}
        <button
          type="button"
          onClick={onOpenAtsModal}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition shadow-sm"
          title="Scan against Job Description"
        >
          <Target className="w-3.5 h-3.5" />
          <span>ATS Scanner</span>
          {atsScore && (
            <span className="ml-0.5 px-1.5 py-0.2 rounded font-mono text-[10px] bg-emerald-500 text-slate-950 font-bold">
              {atsScore}%
            </span>
          )}
        </button>

        {/* Cover Letter Button */}
        <button
          type="button"
          onClick={onOpenCoverLetterModal}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition shadow-sm"
          title="Generate Tailored Cover Letter"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Cover Letter</span>
        </button>

        {/* Resume Health Audit */}
        <button
          type="button"
          onClick={onOpenAuditModal}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition shadow-sm"
          title="Inspect Action Verbs & Metrics"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Audit</span>
        </button>

        {/* API Key Modal Button */}
        <button
          type="button"
          onClick={onOpenApiKeyModal}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition"
          title="Configure Gemini API Key"
        >
          <Key className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Export & View Actions */}
      <div className="flex items-center gap-2">
        {/* View Switcher (Desktop and Mobile) */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => onViewChange('editor')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
              activeView === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onViewChange('split')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium hidden md:block transition ${
              activeView === 'split' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Split
          </button>
          <button
            type="button"
            onClick={() => onViewChange('preview')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
              activeView === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Direct PDF Download */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={downloading}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition shadow-md shadow-blue-500/20 disabled:opacity-50"
          title="Download High-Resolution PDF"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{downloading ? 'Exporting...' : 'PDF'}</span>
        </button>

        {/* Native Print / Save */}
        <button
          type="button"
          onClick={triggerPrint}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition"
          title="Browser Print / Save as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print</span>
        </button>

        {/* More Actions Dropdown (JSON, TXT) */}
        <div className="relative group">
          <button
            type="button"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            title="More Export Options"
          >
            <FileCode className="w-3.5 h-3.5" />
          </button>

          <div className="absolute right-0 top-full mt-1 w-44 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl py-1 hidden group-hover:block z-50 text-xs">
            <button
              type="button"
              onClick={handleCopyPlainText}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center gap-2 text-slate-300"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied ATS Text!' : 'Copy Plain Text (ATS)'}</span>
            </button>
            <button
              type="button"
              onClick={() => exportToJson(resume)}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center gap-2 text-slate-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup to JSON</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left px-3 py-1.5 hover:bg-slate-800 flex items-center gap-2 text-slate-300"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Restore from JSON</span>
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleJsonUpload}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>
    </header>
  );
};
