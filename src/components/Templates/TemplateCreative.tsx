import React from 'react';
import { ResumeData, ThemeConfig } from '../../types/resume';
import { FONT_CLASSES, SPACING_CLASSES } from './templateStyles';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/BrandIcons';

interface Props {
  data: ResumeData;
  theme: ThemeConfig;
}

export const TemplateCreative: React.FC<Props> = ({ data, theme }) => {
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;
  const { personalInfo, activeSections } = data;

  return (
    <div className={`w-full bg-white text-slate-800 flex flex-col sm:flex-row min-h-full ${fontClass} leading-normal`}>
      {/* Left Sidebar */}
      <aside className="w-full sm:w-1/3 bg-slate-900 text-slate-100 p-6 sm:p-8 flex flex-col justify-between" style={{ backgroundColor: '#0f172a' }}>
        <div>
          {/* Candidate Initials / Avatar placeholder */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl text-white mb-4 shadow-inner" style={{ backgroundColor: theme.accentColor }}>
            {(personalInfo.fullName || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white uppercase">
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: theme.accentColor }}>
              {personalInfo.jobTitle}
            </p>
          )}

          {/* Contact Details */}
          <div className="mt-6 pt-4 border-t border-slate-700/60 space-y-2.5 text-xs text-slate-300">
            <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
              Contact
            </div>
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white break-all">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.github && (
              <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white break-all">
                <GithubIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white break-all">
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white break-all">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
          </div>

          {/* Education in sidebar */}
          {activeSections.education && data.education.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-2">
                Education
              </div>
              <div className="space-y-3 text-xs">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-white">{edu.degree}</div>
                    <div className="text-slate-300">{edu.fieldOfStudy}</div>
                    <div className="text-slate-400 text-[11px]">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                    {edu.gpa && <div className="text-slate-400 text-[11px]">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills in sidebar */}
          {activeSections.skills && data.skillCategories.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-2">
                Skills
              </div>
              <div className="space-y-2.5 text-xs">
                {data.skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <div className="font-semibold text-slate-200 text-[11px] mb-1">{cat.categoryName}</div>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] border border-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages in sidebar */}
          {activeSections.languages && data.languages.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-2">
                Languages
              </div>
              <div className="space-y-1 text-xs text-slate-300">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.language}</span>
                    <span className="text-slate-400 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="w-full sm:w-2/3 p-6 sm:p-8 flex-1">
        <div className={spacing.sectionGap}>
          {/* Summary */}
          {activeSections.summary && data.summary && (
            <section className={spacing.itemGap}>
              <h2 className="text-xs font-bold tracking-wider uppercase pb-1 border-b" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                Profile Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {activeSections.experience && data.experience.length > 0 && (
            <section className={spacing.itemGap}>
              <h2 className="text-xs font-bold tracking-wider uppercase pb-1 border-b" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                Professional Experience
              </h2>
              <div className={spacing.itemGap}>
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-xs font-medium text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="text-xs text-slate-600 mb-1 font-medium">{exp.company} {exp.location && `• ${exp.location}`}</div>
                    <ul className={`list-disc list-outside ml-4 text-xs sm:text-sm text-slate-700 ${spacing.bulletGap}`}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="pl-1 leading-snug">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {activeSections.projects && data.projects.length > 0 && (
            <section className={spacing.itemGap}>
              <h2 className="text-xs font-bold tracking-wider uppercase pb-1 border-b" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                Featured Projects
              </h2>
              <div className={spacing.itemGap}>
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                      <div className="flex items-center gap-2 text-xs">
                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-0.5">Live <ExternalLink className="w-2.5 h-2.5" /></a>}
                        {proj.github && <a href={`https://${proj.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-slate-600 hover:underline flex items-center gap-0.5">GitHub <ExternalLink className="w-2.5 h-2.5" /></a>}
                      </div>
                    </div>
                    {proj.techStack && <div className="text-xs text-slate-500 mb-1">{proj.techStack}</div>}
                    <ul className={`list-disc list-outside ml-4 text-xs sm:text-sm text-slate-700 ${spacing.bulletGap}`}>
                      {proj.bullets.map((b, i) => (
                        <li key={i} className="pl-1 leading-snug">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {activeSections.certifications && data.certifications.length > 0 && (
            <section className={spacing.itemGap}>
              <h2 className="text-xs font-bold tracking-wider uppercase pb-1 border-b" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                Certifications
              </h2>
              <div className="space-y-1.5 text-xs">
                {data.certifications.map((c) => (
                  <div key={c.id} className="flex justify-between">
                    <span><strong>{c.name}</strong> — {c.issuer}</span>
                    <span className="text-slate-500">{c.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {activeSections.awards && data.awards.length > 0 && (
            <section className={spacing.itemGap}>
              <h2 className="text-xs font-bold tracking-wider uppercase pb-1 border-b" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                Honors & Awards
              </h2>
              <div className="space-y-1.5 text-xs">
                {data.awards.map((a) => (
                  <div key={a.id} className="flex justify-between">
                    <span><strong>{a.title}</strong> — {a.issuer}</span>
                    <span className="text-slate-500">{a.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
