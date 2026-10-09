import React, { useState } from 'react';
import { ResumeData, ThemeConfig } from '../../types/resume';
import { TemplateModern } from './TemplateModern';
import { TemplateExecutive } from './TemplateExecutive';
import { TemplateTech } from './TemplateTech';
import { TemplateCreative } from './TemplateCreative';
import { TemplateCompact } from './TemplateCompact';
import { ZoomIn, ZoomOut, Maximize2, FileText } from 'lucide-react';

interface Props {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ResumePreviewContainer: React.FC<Props> = ({ data, theme }) => {
  const [zoom, setZoom] = useState<number>(100);

  const renderTemplate = () => {
    switch (theme.template) {
      case 'executive':
        return <TemplateExecutive data={data} theme={theme} />;
      case 'tech':
        return <TemplateTech data={data} theme={theme} />;
      case 'creative':
        return <TemplateCreative data={data} theme={theme} />;
      case 'compact':
        return <TemplateCompact data={data} theme={theme} />;
      case 'modern':
      default:
        return <TemplateModern data={data} theme={theme} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 border-l border-slate-800">
      {/* Top Preview Controls Bar */}
      <div className="no-print h-12 border-b border-slate-800 bg-slate-900 px-4 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2 font-medium">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Live A4 Preview</span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 capitalize">
            {theme.template} Template
          </span>
        </div>

        {/* Zoom Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700/60">
          <button
            onClick={() => setZoom(prev => Math.max(50, prev - 10))}
            className="p-1 hover:text-white rounded hover:bg-slate-700 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono text-[11px] text-slate-300 select-none">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(prev => Math.min(150, prev + 10))}
            className="p-1 hover:text-white rounded hover:bg-slate-700 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(100)}
            className="p-1 hover:text-white rounded hover:bg-slate-700 transition ml-1"
            title="Reset Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable Viewport with A4 Paper simulation */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start print-container">
        <div
          id="resume-print-area"
          className="resume-paper-preview bg-white text-slate-900 shadow-2xl transition-transform origin-top w-full max-w-[210mm] min-h-[297mm] rounded-sm relative overflow-hidden"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
