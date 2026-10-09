export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  github?: string;
  linkedin?: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  bullets?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  techStack: string;
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string; // e.g. "Languages & Frameworks", "AI & Machine Learning", "Tools & Cloud"
  skills: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Basic';
}

export interface CustomSectionItem {
  id: string;
  sectionTitle: string;
  items: {
    id: string;
    title: string;
    subtitle?: string;
    date?: string;
    bullets: string[];
  }[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  languages: LanguageItem[];
  customSections: CustomSectionItem[];
  activeSections: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    skills: boolean;
    certifications: boolean;
    awards: boolean;
    languages: boolean;
    custom: boolean;
  };
  sectionOrder: string[];
}

export type TemplateType = 'modern' | 'executive' | 'tech' | 'creative' | 'compact';
export type FontType = 'inter' | 'serif' | 'mono' | 'display' | 'roboto';
export type SpacingType = 'compact' | 'normal' | 'relaxed';

export interface ThemeConfig {
  template: TemplateType;
  accentColor: string; // Hex color code
  fontFamily: FontType;
  spacing: SpacingType;
  showPhoto: boolean;
}

export interface ATSAnalysisResult {
  score: number; // 0 - 100
  matchedKeywords: string[];
  missingKeywords: string[];
  jobTitleMatch: boolean;
  wordCount: number;
  recommendations: string[];
  summaryFeedback: string;
  skillsFeedback: string;
  experienceFeedback: string;
}

export interface ResumeAuditResult {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    actionVerbsScore: number;
    quantifiableMetricsScore: number;
    completenessScore: number;
    skillsRelevanceScore: number;
  };
  detectedActionVerbs: string[];
  metricsFound: string[];
  positives: string[];
  improvements: string[];
}
