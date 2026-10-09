import React from 'react';
import { ResumeData, ThemeConfig } from '../../types/resume';
import { FONT_CLASSES, SPACING_CLASSES } from './templateStyles';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/BrandIcons';

interface Props {
  data: ResumeData;
  theme: ThemeConfig;
}

export const TemplateCompact: React.FC<Props> = ({ data, theme }) => {
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const spacing = SPACING_CLASSES['compact'];
  const { personalInfo, activeSections } = data;

  return (
    <div className={`w-full bg-white text-slate-800 p-6 sm:p-8 ${fontClass} leading-tight text-xs`}>
      {/* Super Compact Header */}
      <header className="border-b pb-2 mb-3" style={{ borderColor: theme.accentColor }}>
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            {personalInfo.jobTitle && (
              <span className="text-xs font-bold" style={{ color: theme.accentColor }}>
                {personalInfo.jobTitle}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-slate-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-0.5 hover:underline">
                <Mail className="w-2.5 h-2.5" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-0.5">
                <Phone className="w-2.5 h-2.5" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.github && (
              <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:underline">
                <GithubIcon className="w-2.5 h-2.5" />
                <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:underline">
                <LinkedinIcon className="w-2.5 h-2.5" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:underline">
                <Globe className="w-2.5 h-2.5" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className={spacing.sectionGap}>
        {data.sectionOrder.map((sectionKey) => {
          if (!activeSections[sectionKey as keyof typeof activeSections]) return null;

          switch (sectionKey) {
            case 'summary':
              return data.summary ? (
                <section key="summary" className={spacing.itemGap}>
                  <div className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Summary
                  </div>
                  <p className="text-slate-700 leading-snug text-justify">
                    {data.summary}
                  </p>
                </section>
              ) : null;

            case 'skills':
              return data.skillCategories.length > 0 ? (
                <section key="skills" className={spacing.itemGap}>
                  <div className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Technical Skills
                  </div>
                  <div className="space-y-0.5">
                    {data.skillCategories.map((c) => (
                      <div key={c.id}>
                        <span className="font-bold text-slate-900">{c.categoryName}: </span>
                        <span className="text-slate-700">{c.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'experience':
              return data.experience.length > 0 ? (
                <section key="experience" className={spacing.itemGap}>
                  <div className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Work Experience
                  </div>
                  <div className={spacing.itemGap}>
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>{exp.role} — <span className="font-normal text-slate-700">{exp.company}</span></span>
                          <span className="font-normal text-slate-500 text-[10px]">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                        </div>
                        <ul className="list-disc list-outside ml-3.5 text-slate-700 space-y-0.5 mt-0.5">
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="pl-0.5 leading-snug">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'projects':
              return data.projects.length > 0 ? (
                <section key="projects" className={spacing.itemGap}>
                  <div className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Projects
                  </div>
                  <div className={spacing.itemGap}>
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>{proj.title} {proj.techStack && <span className="font-normal text-[10px] text-slate-500">[{proj.techStack}]</span>}</span>
                          <span className="font-normal text-slate-500 text-[10px] space-x-1">
                            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="underline">Link</a>}
                            {proj.github && <a href={`https://${proj.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="underline">GitHub</a>}
                          </span>
                        </div>
                        <ul className="list-disc list-outside ml-3.5 text-slate-700 space-y-0.5 mt-0.5">
                          {proj.bullets.map((b, i) => (
                            <li key={i} className="pl-0.5 leading-snug">{b}</li>
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
                  <div className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Education
                  </div>
                  <div className={spacing.itemGap}>
                    {data.education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline">
                        <div>
                          <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span>
                          <span className="text-slate-600"> — {edu.institution} {edu.gpa && `(GPA: ${edu.gpa})`}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'certifications':
              return data.certifications.length > 0 ? (
                <section key="certifications" className={spacing.itemGap}>
                  <div className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Certifications
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-slate-800">
                    {data.certifications.map((c) => (
                      <span key={c.id}>• <strong>{c.name}</strong> ({c.issuer})</span>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'awards':
              return data.awards.length > 0 ? (
                <section key="awards" className={spacing.itemGap}>
                  <div className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Honors & Awards
                  </div>
                  <div className="space-y-0.5">
                    {data.awards.map((a) => (
                      <div key={a.id} className="flex justify-between">
                        <span>• <strong>{a.title}</strong> — {a.issuer}</span>
                        <span className="text-[10px] text-slate-500">{a.date}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'languages':
              return data.languages.length > 0 ? (
                <section key="languages" className={spacing.itemGap}>
                  <div className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Languages
                  </div>
                  <div className="text-slate-800">
                    {data.languages.map((l) => `${l.language} (${l.proficiency})`).join(' • ')}
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
