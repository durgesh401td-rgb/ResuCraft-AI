import React from 'react';
import { ResumeData, ThemeConfig } from '../../types/resume';
import { FONT_CLASSES, SPACING_CLASSES } from './templateStyles';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/BrandIcons';

interface Props {
  data: ResumeData;
  theme: ThemeConfig;
}

export const TemplateModern: React.FC<Props> = ({ data, theme }) => {
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-sans';
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;
  const { personalInfo, activeSections } = data;

  return (
    <div className={`w-full bg-white text-slate-800 p-8 sm:p-10 ${fontClass} leading-normal`}>
      {/* Header */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: theme.accentColor }}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-lg font-semibold mt-1 tracking-wide" style={{ color: theme.accentColor }}>
                {personalInfo.jobTitle}
              </p>
            )}
            
            {/* Contact Pills */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-3 text-xs sm:text-sm text-slate-600">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {personalInfo.github && (
                <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900">
                  <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {personalInfo.linkedin && (
                <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900">
                  <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Rendered According to sectionOrder */}
      <div className={spacing.sectionGap}>
        {data.sectionOrder.map((sectionKey) => {
          if (!activeSections[sectionKey as keyof typeof activeSections]) return null;

          switch (sectionKey) {
            case 'summary':
              return data.summary ? (
                <section key="summary" className={spacing.itemGap}>
                  <h2 className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: theme.accentColor }}>
                    <span>Professional Summary</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                    {data.summary}
                  </p>
                </section>
              ) : null;

            case 'skills':
              return data.skillCategories.length > 0 ? (
                <section key="skills" className={spacing.itemGap}>
                  <h2 className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: theme.accentColor }}>
                    <span>Skills & Expertise</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {data.skillCategories.map((cat) => (
                      <div key={cat.id} className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="font-semibold text-slate-800">{cat.categoryName}: </span>
                        <span className="text-slate-600">{cat.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'experience':
              return data.experience.length > 0 ? (
                <section key="experience" className={spacing.itemGap}>
                  <h2 className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: theme.accentColor }}>
                    <span>Work Experience</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900">
                            {exp.role} <span className="font-normal text-slate-600">at {exp.company}</span>
                          </h3>
                          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="text-xs text-slate-500 mb-1">{exp.location}</div>
                        )}
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

            case 'projects':
              return data.projects.length > 0 ? (
                <section key="projects" className={spacing.itemGap}>
                  <h2 className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: theme.accentColor }}>
                    <span>Key Projects</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                            <span>{proj.title}</span>
                            {proj.techStack && (
                              <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                                {proj.techStack}
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            {proj.link && (
                              <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-blue-600 hover:underline">
                                Live <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                            {proj.github && (
                              <a href={`https://${proj.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-slate-600 hover:underline">
                                GitHub <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
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

            case 'education':
              return data.education.length > 0 ? (
                <section key="education" className={spacing.itemGap}>
                  <h2 className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: theme.accentColor }}>
                    <span>Education</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900">
                            {edu.degree} in {edu.fieldOfStudy}
                          </h3>
                          <div className="text-xs sm:text-sm text-slate-600">
                            {edu.institution} {edu.location && `• ${edu.location}`}
                          </div>
                          {edu.bullets && edu.bullets.length > 0 && (
                            <ul className={`list-disc list-outside ml-4 text-xs text-slate-600 ${spacing.bulletGap} mt-1`}>
                              {edu.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="text-right text-xs">
                          <span className="font-semibold text-slate-500">{edu.startDate} – {edu.endDate}</span>
                          {edu.gpa && <div className="text-slate-600 font-medium">GPA: {edu.gpa}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'certifications':
              return data.certifications.length > 0 ? (
                <section key="certifications" className={spacing.itemGap}>
                  <h2 className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: theme.accentColor }}>
                    <span>Certifications</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {data.certifications.map((cert) => (
                      <div key={cert.id} className="flex justify-between items-baseline border-l-2 pl-2" style={{ borderColor: theme.accentColor }}>
                        <div>
                          <span className="font-bold text-slate-800">{cert.name}</span>
                          <span className="text-slate-500 block text-xs">{cert.issuer}</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'awards':
              return data.awards.length > 0 ? (
                <section key="awards" className={spacing.itemGap}>
                  <h2 className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: theme.accentColor }}>
                    <span>Honors & Awards</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </h2>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    {data.awards.map((award) => (
                      <div key={award.id} className="flex justify-between items-baseline">
                        <div>
                          <span className="font-bold text-slate-800">{award.title}</span>
                          <span className="text-slate-600"> — {award.issuer}</span>
                          {award.description && <p className="text-xs text-slate-500 mt-0.5">{award.description}</p>}
                        </div>
                        <span className="text-xs font-semibold text-slate-500">{award.date}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'languages':
              return data.languages.length > 0 ? (
                <section key="languages" className={spacing.itemGap}>
                  <h2 className="text-sm font-bold tracking-wider uppercase flex items-center gap-2" style={{ color: theme.accentColor }}>
                    <span>Languages</span>
                    <span className="flex-1 h-px bg-slate-200"></span>
                  </h2>
                  <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                    {data.languages.map((l) => (
                      <span key={l.id} className="px-2.5 py-1 bg-slate-100 rounded text-slate-700 font-medium">
                        {l.language} <span className="text-slate-400 font-normal">({l.proficiency})</span>
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
