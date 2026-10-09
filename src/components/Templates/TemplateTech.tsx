import React from 'react';
import { ResumeData, ThemeConfig } from '../../types/resume';
import { FONT_CLASSES, SPACING_CLASSES } from './templateStyles';
import { Terminal, Code, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/BrandIcons';

interface Props {
  data: ResumeData;
  theme: ThemeConfig;
}

export const TemplateTech: React.FC<Props> = ({ data, theme }) => {
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;
  const { personalInfo, activeSections } = data;

  return (
    <div className={`w-full bg-white text-slate-900 p-8 sm:p-10 ${fontClass} leading-normal`}>
      {/* Tech Header with Terminal Vibe */}
      <header className="border-l-4 pl-4 pb-2 mb-6" style={{ borderColor: theme.accentColor }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-3xl font-black font-mono tracking-tight text-slate-900">
              {personalInfo.fullName || 'DEV_NAME'}
            </h1>
            {personalInfo.jobTitle && (
              <div className="flex items-center gap-1.5 text-sm font-semibold font-mono mt-1" style={{ color: theme.accentColor }}>
                <Terminal className="w-3.5 h-3.5" />
                <span>{personalInfo.jobTitle}</span>
              </div>
            )}
          </div>
          <div className="text-xs font-mono text-slate-500 mt-2 sm:mt-0 text-left sm:text-right space-y-0.5">
            {personalInfo.email && (
              <div className="flex sm:justify-end items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex sm:justify-end items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex sm:justify-end items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Links bar */}
        <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-slate-100 text-xs font-mono text-slate-600">
          {personalInfo.github && (
            <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-black">
              <GithubIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-black">
              <LinkedinIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-black">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>
      </header>

      {/* Sections */}
      <div className={spacing.sectionGap}>
        {data.sectionOrder.map((sectionKey) => {
          if (!activeSections[sectionKey as keyof typeof activeSections]) return null;

          switch (sectionKey) {
            case 'summary':
              return data.summary ? (
                <section key="summary" className={spacing.itemGap}>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5">
                    <span className="text-emerald-600">~/summary</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {data.summary}
                  </p>
                </section>
              ) : null;

            case 'skills':
              return data.skillCategories.length > 0 ? (
                <section key="skills" className={spacing.itemGap}>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5">
                    <span className="text-emerald-600">~/tech_stack</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {data.skillCategories.map((cat) => (
                      <div key={cat.id} className="p-2 rounded bg-slate-50 border border-slate-200">
                        <div className="font-mono font-semibold text-slate-800 text-xs flex items-center gap-1 mb-1">
                          <Code className="w-3 h-3 text-slate-500" />
                          <span>{cat.categoryName}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cat.skills.map((s, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-white text-slate-700 font-mono text-[11px] border border-slate-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'projects':
              return data.projects.length > 0 ? (
                <section key="projects" className={spacing.itemGap}>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5">
                    <span className="text-emerald-600">~/open_source_and_projects</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </div>
                  <div className={spacing.itemGap}>
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="border-l-2 pl-3 border-slate-200">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
                            <span>{proj.title}</span>
                          </h3>
                          <div className="flex items-center gap-2 text-xs font-mono">
                            {proj.link && (
                              <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-blue-600 hover:underline">
                                [demo <ExternalLink className="w-2.5 h-2.5" />]
                              </a>
                            )}
                            {proj.github && (
                              <a href={`https://${proj.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-slate-700 hover:underline">
                                [repo <ExternalLink className="w-2.5 h-2.5" />]
                              </a>
                            )}
                          </div>
                        </div>
                        {proj.techStack && (
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                            Built with: <span className="font-semibold text-slate-700">{proj.techStack}</span>
                          </div>
                        )}
                        <ul className={`list-disc list-outside ml-4 text-xs sm:text-sm text-slate-700 ${spacing.bulletGap} mt-1`}>
                          {proj.bullets.map((b, i) => (
                            <li key={i} className="pl-1 leading-snug">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'experience':
              return data.experience.length > 0 ? (
                <section key="experience" className={spacing.itemGap}>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5">
                    <span className="text-emerald-600">~/experience</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </div>
                  <div className={spacing.itemGap}>
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 pl-3 border-slate-200">
                        <div className="flex justify-between items-baseline font-mono text-xs sm:text-sm">
                          <span className="font-bold text-slate-900">{exp.role} @ {exp.company}</span>
                          <span className="text-slate-500 text-xs">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                        </div>
                        {exp.location && <div className="text-[11px] text-slate-500 font-mono">{exp.location}</div>}
                        <ul className={`list-disc list-outside ml-4 text-xs sm:text-sm text-slate-700 ${spacing.bulletGap} mt-1`}>
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="pl-1 leading-snug">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'education':
              return data.education.length > 0 ? (
                <section key="education" className={spacing.itemGap}>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5">
                    <span className="text-emerald-600">~/education</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </div>
                  <div className={spacing.itemGap}>
                    {data.education.map((edu) => (
                      <div key={edu.id} className="border-l-2 pl-3 border-slate-200">
                        <div className="flex justify-between items-baseline font-mono text-xs sm:text-sm">
                          <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span>
                          <span className="text-slate-500 text-xs">{edu.startDate} – {edu.endDate}</span>
                        </div>
                        <div className="text-xs text-slate-600 font-mono">
                          {edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}
                        </div>
                        {edu.bullets && edu.bullets.length > 0 && (
                          <ul className={`list-disc list-outside ml-4 text-xs text-slate-600 ${spacing.bulletGap} mt-1`}>
                            {edu.bullets.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'certifications':
              return data.certifications.length > 0 ? (
                <section key="certifications" className={spacing.itemGap}>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5">
                    <span className="text-emerald-600">~/certifications</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {data.certifications.map((c) => (
                      <div key={c.id} className="flex justify-between p-1.5 bg-slate-50 rounded">
                        <span><strong>{c.name}</strong> ({c.issuer})</span>
                        <span className="text-slate-500">{c.date}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'awards':
              return data.awards.length > 0 ? (
                <section key="awards" className={spacing.itemGap}>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5">
                    <span className="text-emerald-600">~/awards</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </div>
                  <div className="space-y-1 text-xs font-mono">
                    {data.awards.map((a) => (
                      <div key={a.id} className="flex justify-between">
                        <span><strong>{a.title}</strong> — {a.issuer}</span>
                        <span className="text-slate-500">{a.date}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'languages':
              return data.languages.length > 0 ? (
                <section key="languages" className={spacing.itemGap}>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 flex items-center gap-2 mb-1.5">
                    <span className="text-emerald-600">~/languages</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {data.languages.map((l) => (
                      <span key={l.id} className="px-2 py-0.5 bg-slate-100 rounded text-slate-800">
                        {l.language}: {l.proficiency}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null;

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};
