import React from 'react';
import { ResumeData, ThemeConfig } from '../../types/resume';
import { FONT_CLASSES, SPACING_CLASSES } from './templateStyles';

interface Props {
  data: ResumeData;
  theme: ThemeConfig;
}

export const TemplateExecutive: React.FC<Props> = ({ data, theme }) => {
  const fontClass = FONT_CLASSES[theme.fontFamily] || 'font-serif';
  const spacing = SPACING_CLASSES[theme.spacing] || SPACING_CLASSES.normal;
  const { personalInfo, activeSections } = data;

  return (
    <div className={`w-full bg-white text-neutral-900 p-8 sm:p-12 ${fontClass} leading-normal`}>
      {/* Centered Traditional Header */}
      <header className="text-center pb-4 mb-4 border-b border-neutral-300">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wider uppercase text-neutral-900">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-sm italic text-neutral-700 mt-1">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2 text-xs text-neutral-600">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>• <a href={`mailto:${personalInfo.email}`} className="underline hover:text-black">{personalInfo.email}</a></span>
          )}
          {personalInfo.linkedin && (
            <span>• <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="underline hover:text-black">LinkedIn</a></span>
          )}
          {personalInfo.github && (
            <span>• <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="underline hover:text-black">GitHub</a></span>
          )}
          {personalInfo.website && (
            <span>• <a href={personalInfo.website} target="_blank" rel="noreferrer" className="underline hover:text-black">Portfolio</a></span>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={spacing.sectionGap}>
        {data.sectionOrder.map((sectionKey) => {
          if (!activeSections[sectionKey as keyof typeof activeSections]) return null;

          switch (sectionKey) {
            case 'summary':
              return data.summary ? (
                <section key="summary" className={spacing.itemGap}>
                  <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase border-b pb-0.5 mb-2" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Professional Summary
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed text-justify">
                    {data.summary}
                  </p>
                </section>
              ) : null;

            case 'experience':
              return data.experience.length > 0 ? (
                <section key="experience" className={spacing.itemGap}>
                  <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase border-b pb-0.5 mb-2" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Experience
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm text-neutral-900">
                          <span>{exp.company}</span>
                          <span className="font-normal italic text-xs">{exp.location}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-xs italic text-neutral-700 mb-1">
                          <span>{exp.role}</span>
                          <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                        </div>
                        <ul className={`list-disc list-outside ml-4 text-xs sm:text-sm text-neutral-800 ${spacing.bulletGap}`}>
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
                  <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase border-b pb-0.5 mb-2" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Education
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm text-neutral-900">
                          <span>{edu.institution}</span>
                          <span className="font-normal italic text-xs">{edu.location}</span>
                        </div>
                        <div className="flex justify-between items-baseline text-xs text-neutral-700">
                          <span className="italic">{edu.degree} in {edu.fieldOfStudy}</span>
                          <span>{edu.startDate} – {edu.endDate}</span>
                        </div>
                        {edu.gpa && <div className="text-xs text-neutral-600 mt-0.5">Cumulative GPA: {edu.gpa}</div>}
                        {edu.bullets && edu.bullets.length > 0 && (
                          <ul className={`list-disc list-outside ml-4 text-xs text-neutral-700 ${spacing.bulletGap} mt-1`}>
                            {edu.bullets.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'projects':
              return data.projects.length > 0 ? (
                <section key="projects" className={spacing.itemGap}>
                  <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase border-b pb-0.5 mb-2" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Selected Projects
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-neutral-900">
                          <span>
                            {proj.title} {proj.techStack && <span className="font-normal text-xs text-neutral-600">({proj.techStack})</span>}
                          </span>
                          <div className="text-xs space-x-2 font-normal">
                            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="underline">View Live</a>}
                            {proj.github && <a href={`https://${proj.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="underline">Code</a>}
                          </div>
                        </div>
                        <ul className={`list-disc list-outside ml-4 text-xs sm:text-sm text-neutral-800 ${spacing.bulletGap} mt-1`}>
                          {proj.bullets.map((b, i) => (
                            <li key={i} className="pl-1 leading-snug">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'skills':
              return data.skillCategories.length > 0 ? (
                <section key="skills" className={spacing.itemGap}>
                  <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase border-b pb-0.5 mb-2" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Skills & Competencies
                  </h2>
                  <div className="text-xs sm:text-sm space-y-1">
                    {data.skillCategories.map((cat) => (
                      <div key={cat.id}>
                        <span className="font-bold text-neutral-900">{cat.categoryName}: </span>
                        <span className="text-neutral-700">{cat.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'certifications':
              return data.certifications.length > 0 ? (
                <section key="certifications" className={spacing.itemGap}>
                  <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase border-b pb-0.5 mb-2" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Certifications & Licenses
                  </h2>
                  <div className="space-y-1 text-xs sm:text-sm">
                    {data.certifications.map((c) => (
                      <div key={c.id} className="flex justify-between">
                        <span><strong>{c.name}</strong> — {c.issuer}</span>
                        <span className="text-neutral-600 text-xs">{c.date}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'awards':
              return data.awards.length > 0 ? (
                <section key="awards" className={spacing.itemGap}>
                  <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase border-b pb-0.5 mb-2" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Honors & Awards
                  </h2>
                  <div className="space-y-1 text-xs sm:text-sm">
                    {data.awards.map((a) => (
                      <div key={a.id} className="flex justify-between">
                        <span><strong>{a.title}</strong> — {a.issuer} {a.description && `(${a.description})`}</span>
                        <span className="text-neutral-600 text-xs">{a.date}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'languages':
              return data.languages.length > 0 ? (
                <section key="languages" className={spacing.itemGap}>
                  <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase border-b pb-0.5 mb-2" style={{ borderColor: theme.accentColor, color: theme.accentColor }}>
                    Languages
                  </h2>
                  <div className="text-xs sm:text-sm text-neutral-800">
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
