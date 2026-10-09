import { ResumeData, ATSAnalysisResult, ResumeAuditResult } from '../types/resume';

const LOCAL_STORAGE_KEY_GEMINI = 'resucraft_gemini_api_key';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY_GEMINI);
  if (stored) return stored.trim();
  return (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
}

export function setStoredApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (!key.trim()) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_GEMINI);
  } else {
    localStorage.setItem(LOCAL_STORAGE_KEY_GEMINI, key.trim());
  }
}

// Low-level caller to Gemini REST API
async function callGemini(prompt: string, apiKey: string): Promise<string | null> {
  if (!apiKey) return null;
  
  // Support gemini-1.5-flash and gemini-2.0-flash
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }),
      });

      if (!response.ok) {
        continue; // try next model
      }

      const data = await response.json();
      const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidateText) {
        return candidateText.trim();
      }
    } catch {
      // try next model or fallback
    }
  }
  return null;
}

// Power Action Verbs for ATS Optimization
export const POWER_ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Optimized',
  'Accelerated', 'Constructed', 'Formulated', 'Streamlined', 'Pioneered',
  'Implemented', 'Automated', 'Devised', 'Delivered', 'Designed',
  'Revamped', 'Transformed', 'Decreased', 'Increased', 'Maximized',
  'Cultivated', 'Synthesized', 'Benchmark-tested', 'Deployed', 'Refactored',
  'Overhauled', 'Augmented', 'Consolidated', 'Championed', 'Mentored'
];

// Fallback STAR / Metric Rule-based Enhancer
function smartLocalBulletEnhancement(rawBullet: string, _role = ''): { improved: string; alternatives: string[] } {
  let cleaned = rawBullet.trim().replace(/^[•\-\*]\s*/, '');
  if (!cleaned) {
    return {
      improved: "Spearheaded core software development initiatives, improving system responsiveness by 34% and cutting delivery lead times.",
      alternatives: [
        "Architected scalable modular components, reducing technical debt and bolstering pipeline throughput by 28%.",
        "Engineered robust automated workflows, resulting in a 40% reduction in manual effort across cross-functional sprints."
      ]
    };
  }

  // Remove passive / weak prefixes
  const weakPrefixes = [
    /^(i was )?responsible for\s+/i,
    /^(i )?worked on\s+/i,
    /^(i )?helped (with|to)\s+/i,
    /^(i )?assisted in\s+/i,
    /^(i )?did\s+/i,
    /^(i )?created\s+/i,
    /^(i )?made\s+/i,
    /^(i )?handled\s+/i,
    /^(i )?participated in\s+/i,
  ];

  for (const wp of weakPrefixes) {
    cleaned = cleaned.replace(wp, '');
  }

  // Capitalize first letter
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // If already starts with a strong verb, augment with metrics
  const startsWithPowerVerb = POWER_ACTION_VERBS.some(v => cleaned.toLowerCase().startsWith(v.toLowerCase()));
  const randomVerb = POWER_ACTION_VERBS[Math.floor(Math.random() * 8)]; // Top 8 are very impactful

  const option1 = startsWithPowerVerb
    ? `${cleaned.replace(/\.$/, '')}, yielding a 35% boost in operational efficiency and reducing latency by 40%.`
    : `${randomVerb} ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1).replace(/\.$/, '')}, boosting team throughput by 32% and exceeding SLA targets.`;

  const option2 = `Architected and deployed solutions for ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1).replace(/\.$/, '')}, optimizing system reliability to 99.9% while cutting operational costs by 22%.`;

  const option3 = `Spearheaded cross-functional execution of ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1).replace(/\.$/, '')}, accelerating sprint delivery cycles by 2.5x and elevating user satisfaction scores.`;

  return {
    improved: option1,
    alternatives: [option2, option3]
  };
}

export async function enhanceBulletPoint(
  rawBullet: string,
  role?: string,
  style: 'star' | 'metrics' | 'executive' = 'star'
): Promise<{ improved: string; alternatives: string[] }> {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    const prompt = `You are a world-class executive resume consultant and ATS specialist.
Enhance the following resume bullet point using the Google XYZ / STAR formula:
"Accomplished [X], as measured by [Y], by doing [Z]".
Make it punchy, beginning with a strong action verb, containing realistic quantifiable metrics, and free of fluff.

Role: ${role || 'Software & Technology Professional'}
Target Style: ${style.toUpperCase()} (STAR method, metric-driven, professional ATS impact)
Original Bullet: "${rawBullet}"

Return ONLY a valid JSON object in this exact format, with NO markdown backticks:
{
  "improved": "Primary best rewritten bullet point",
  "alternatives": [
    "Alternative rewritten version 1",
    "Alternative rewritten version 2"
  ]
}`;

    const geminiRes = await callGemini(prompt, apiKey);
    if (geminiRes) {
      try {
        const cleaned = geminiRes.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (parsed.improved && Array.isArray(parsed.alternatives)) {
          return parsed;
        }
      } catch {
        // Fallback to text parsing or local engine
      }
    }
  }

  // Use smart local heuristic engine
  return smartLocalBulletEnhancement(rawBullet, role);
}

export async function generateSummary(
  role: string,
  yearsExp: string,
  skills: string[],
  tone = 'Professional'
): Promise<string> {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    const prompt = `Write a high-impact, 3-4 sentence professional resume summary for:
Target Role: ${role || 'Software Engineer'}
Experience Level: ${yearsExp || 'Entry to Mid Level'}
Key Skills: ${skills.length ? skills.join(', ') : 'Modern Full-Stack, Problem Solving, Analytical Modeling'}
Tone: ${tone}

Ensure it starts with a strong profile identifier, emphasizes core technical proficiencies, mentions quantifiable value delivered, and outlines future commitment. Do not use first-person pronouns ("I", "my"). Return ONLY the summary paragraph text.`;

    const res = await callGemini(prompt, apiKey);
    if (res) return res.replace(/^["']|["']$/g, '');
  }

  // Smart heuristic template
  const skillsList = skills.length ? skills.slice(0, 4).join(', ') : 'modern engineering frameworks, algorithm design, and scalable system architectures';
  const roleTitle = role || 'Technology Professional';

  return `Performance-driven and analytical ${roleTitle} with a proven track record developing resilient solutions utilizing ${skillsList}. Experienced in translating intricate technical specifications into high-impact products while driving cross-functional alignment and code quality. Recognized for rapid adaptability, sharp problem-solving rigor, and continuous enthusiasm for architecting data-informed applications.`;
}

// ATS Keyword & Job Description Analyzer
const COMMON_TECH_KEYWORDS = [
  'react', 'typescript', 'javascript', 'python', 'c++', 'c', 'java', 'node.js',
  'next.js', 'sql', 'mysql', 'postgresql', 'mongodb', 'docker', 'kubernetes',
  'aws', 'gcp', 'azure', 'git', 'github', 'ci/cd', 'rest api', 'graphql',
  'tailwind', 'html5', 'css3', 'machine learning', 'deep learning', 'yolo',
  'opencv', 'computer vision', 'iot', 'esp8266', 'gemini api', 'llm', 'nlp',
  'data structures', 'algorithms', 'agile', 'scrum', 'jira', 'microservices',
  'tableau', 'power bi', 'bigquery', 'pandas', 'numpy', 'scikit-learn'
];

export async function scanJobDescription(
  resume: ResumeData,
  jobDescription: string
): Promise<ATSAnalysisResult> {
  const apiKey = getStoredApiKey();

  // Extract all text from resume
  const resumeTextParts: string[] = [
    resume.personalInfo.fullName,
    resume.personalInfo.jobTitle,
    resume.summary,
    ...resume.experience.map(e => `${e.company} ${e.role} ${e.bullets.join(' ')}`),
    ...resume.education.map(e => `${e.institution} ${e.degree} ${e.fieldOfStudy} ${(e.bullets || []).join(' ')}`),
    ...resume.projects.map(p => `${p.title} ${p.techStack} ${p.bullets.join(' ')}`),
    ...resume.skillCategories.flatMap(sc => sc.skills),
    ...resume.certifications.map(c => `${c.name} ${c.issuer}`)
  ];
  const fullResumeText = resumeTextParts.join(' ').toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  // If Gemini API is active, get a comprehensive deep semantic evaluation
  if (apiKey && jobDescription.trim().length > 30) {
    const prompt = `You are an elite Applicant Tracking System (ATS) parser and hiring manager.
Compare this candidate's resume with the target job description.

RESUME CONTENT:
"""
${resumeTextParts.join('\n')}
"""

TARGET JOB DESCRIPTION:
"""
${jobDescription}
"""

Analyze ATS compatibility and output ONLY valid JSON without backticks in this structure:
{
  "score": number between 40 and 98 based on real alignment,
  "matchedKeywords": ["list", "of", "matching", "important", "skills", "found", "in", "both"],
  "missingKeywords": ["important", "keywords", "in", "job", "description", "missing", "from", "resume"],
  "jobTitleMatch": boolean,
  "wordCount": estimated total words,
  "recommendations": [
    "Specific actionable tip 1 to raise ATS match",
    "Specific actionable tip 2",
    "Specific actionable tip 3"
  ],
  "summaryFeedback": "Brief critique of candidate summary vs JD",
  "skillsFeedback": "Brief critique of skills section vs JD",
  "experienceFeedback": "Brief critique of experience section vs JD"
}`;

    const res = await callGemini(prompt, apiKey);
    if (res) {
      try {
        const cleaned = res.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed: ATSAnalysisResult = JSON.parse(cleaned);
        if (typeof parsed.score === 'number') {
          return parsed;
        }
      } catch {
        // Fallback to local analyzer
      }
    }
  }

  // Local Rule-Based ATS Analyzer
  const jdWords = jdLower.match(/[a-zA-Z0-9+#.-]+/g) || [];
  const resumeWords = fullResumeText.match(/[a-zA-Z0-9+#.-]+/g) || [];
  const wordCount = resumeWords.length;

  // Find keywords present in JD
  const foundInJdKeywords = new Set<string>();
  COMMON_TECH_KEYWORDS.forEach(kw => {
    if (jdLower.includes(kw)) {
      foundInJdKeywords.add(kw);
    }
  });

  // Extract important capitalized / frequent terms from JD
  const candidateJdTerms = Array.from(new Set(jdWords.filter(w => w.length >= 4)));
  candidateJdTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const matches = jdLower.match(regex);
    if (matches && matches.length >= 2 && !['with', 'have', 'from', 'this', 'that', 'your', 'will', 'must', 'should', 'experience', 'ability', 'working'].includes(term)) {
      foundInJdKeywords.add(term);
    }
  });

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  foundInJdKeywords.forEach(kw => {
    if (fullResumeText.includes(kw)) {
      matchedKeywords.push(kw.toUpperCase());
    } else {
      missingKeywords.push(kw.toUpperCase());
    }
  });

  // Check job title alignment
  const candidateTitle = resume.personalInfo.jobTitle.toLowerCase();
  const jobTitleMatch = jdLower.includes(candidateTitle) || (candidateTitle.length > 3 && jdWords.some(w => candidateTitle.includes(w)));

  // Calculate heuristic score
  const totalRelevant = matchedKeywords.length + missingKeywords.length;
  let baseScore = 65;
  if (totalRelevant > 0) {
    const matchRatio = matchedKeywords.length / totalRelevant;
    baseScore = Math.round(50 + matchRatio * 45);
  }
  if (jobTitleMatch) baseScore = Math.min(98, baseScore + 5);

  const recommendations: string[] = [];
  if (missingKeywords.length > 0) {
    recommendations.push(`Incorporate high-priority missing keywords: ${missingKeywords.slice(0, 5).join(', ')} directly into your Skills or Experience bullets.`);
  }
  if (!jobTitleMatch) {
    recommendations.push(`Align your resume headline ("${resume.personalInfo.jobTitle || 'Your Title'}") closely with the target role title in the job posting.`);
  }
  if (resume.summary.length < 50) {
    recommendations.push("Expand your Professional Summary with 2-3 target keywords from the job description to pass ATS header filters.");
  }
  if (matchedKeywords.length >= 5) {
    recommendations.push(`Great keyword overlap on: ${matchedKeywords.slice(0, 4).join(', ')}. Ensure they are paired with measurable results.`);
  }

  return {
    score: Math.min(98, Math.max(45, baseScore)),
    matchedKeywords: matchedKeywords.slice(0, 12),
    missingKeywords: missingKeywords.slice(0, 10),
    jobTitleMatch,
    wordCount,
    recommendations,
    summaryFeedback: resume.summary ? "Summary is present. Tailor the opening sentence to reflect the exact job specification." : "Add a punchy 3-sentence summary highlighting your core tech stack.",
    skillsFeedback: `Detected ${matchedKeywords.length} matching core skills. Add ${missingKeywords.slice(0, 3).join(', ')} to boost ATS relevancy.`,
    experienceFeedback: "Ensure at least 50% of your experience bullet points include quantifiable metrics (% increase, $ saved, latency reduced)."
  };
}

// Resume Health & Quality Audit
export function auditResume(resume: ResumeData): ResumeAuditResult {
  const allBullets: string[] = [
    ...resume.experience.flatMap(e => e.bullets),
    ...resume.projects.flatMap(p => p.bullets),
    ...(resume.education.flatMap(e => e.bullets || []))
  ];

  const fullText = allBullets.join(' ');

  // 1. Action Verbs Check
  const detectedActionVerbs: string[] = [];
  POWER_ACTION_VERBS.forEach(verb => {
    const reg = new RegExp(`\\b${verb}\\b`, 'i');
    if (reg.test(fullText)) {
      detectedActionVerbs.push(verb);
    }
  });

  const actionVerbsScore = Math.min(100, Math.round((detectedActionVerbs.length / 8) * 100));

  // 2. Quantifiable Metrics Check (numbers, percentages, metrics)
  const metricRegex = /\b(\d+[\d,.]*|\d+%\s*|\$\d+[\d,.]*|\d+x|\d+\+\s*|sub-\d+ms|\d+\s*FPS)\b/gi;
  const metricsFound = Array.from(new Set(fullText.match(metricRegex) || []));
  const quantifiableMetricsScore = Math.min(100, Math.round((metricsFound.length / 5) * 100));

  // 3. Completeness Check
  let completePoints = 0;
  if (resume.personalInfo.fullName) completePoints += 15;
  if (resume.personalInfo.email && resume.personalInfo.phone) completePoints += 15;
  if (resume.summary && resume.summary.length > 40) completePoints += 15;
  if (resume.experience.length > 0) completePoints += 20;
  if (resume.education.length > 0) completePoints += 15;
  if (resume.skillCategories.some(sc => sc.skills.length > 0)) completePoints += 15;
  if (resume.projects.length > 0) completePoints += 5;
  const completenessScore = Math.min(100, completePoints);

  // 4. Skills Relevance
  const totalSkills = resume.skillCategories.flatMap(sc => sc.skills).length;
  const skillsRelevanceScore = Math.min(100, Math.round((totalSkills / 10) * 100));

  // Weighted Overall Score
  const overallScore = Math.round(
    completenessScore * 0.35 +
    actionVerbsScore * 0.25 +
    quantifiableMetricsScore * 0.25 +
    skillsRelevanceScore * 0.15
  );

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'C';
  if (overallScore >= 92) grade = 'A+';
  else if (overallScore >= 82) grade = 'A';
  else if (overallScore >= 70) grade = 'B';
  else if (overallScore >= 55) grade = 'C';
  else grade = 'D';

  const positives: string[] = [];
  const improvements: string[] = [];

  if (detectedActionVerbs.length >= 5) {
    positives.push(`Strong active vocabulary: Detected ${detectedActionVerbs.length} power verbs (${detectedActionVerbs.slice(0, 4).join(', ')}).`);
  } else {
    improvements.push(`Low action verb variety: Incorporate words like "Spearheaded", "Architected", "Engineered" at the start of your bullet points.`);
  }

  if (metricsFound.length >= 4) {
    positives.push(`High metric density: Found ${metricsFound.length} quantitative impact markers (${metricsFound.slice(0, 4).join(', ')}).`);
  } else {
    improvements.push(`Missing numbers & percentages: Quantify your achievements (e.g. "improved latency by 35%", "managed 5+ team members").`);
  }

  if (resume.projects.length >= 2) {
    positives.push(`Showcases ${resume.projects.length} distinct technical projects demonstrating practical implementation.`);
  }

  if (!resume.personalInfo.github && !resume.personalInfo.linkedin) {
    improvements.push("Add LinkedIn and GitHub/Portfolio links to strengthen your online engineering credibility.");
  }

  return {
    overallScore,
    grade,
    breakdown: {
      actionVerbsScore,
      quantifiableMetricsScore,
      completenessScore,
      skillsRelevanceScore
    },
    detectedActionVerbs,
    metricsFound: metricsFound.slice(0, 10),
    positives,
    improvements
  };
}

// Tailored Cover Letter Generator
export async function generateCoverLetter(
  resume: ResumeData,
  targetCompany: string,
  targetRole: string,
  jobDescription?: string
): Promise<string> {
  const apiKey = getStoredApiKey();
  const candidateName = resume.personalInfo.fullName || 'Candidate';
  const role = targetRole || resume.personalInfo.jobTitle || 'Software Engineer';
  const company = targetCompany || 'Hiring Team';

  if (apiKey) {
    const prompt = `Write a compelling, tailored, 3-paragraph professional cover letter for:
Candidate Name: ${candidateName}
Target Role: ${role}
Target Company: ${company}
Candidate's Key Skills: ${resume.skillCategories.flatMap(sc => sc.skills).slice(0, 6).join(', ')}
Candidate's Experience: ${resume.experience.map(e => `${e.role} at ${e.company}`).join('; ')}
Job Description excerpt: ${jobDescription || 'N/A'}

Format as standard professional business letter without placeholders. High conviction, polished tone.`;

    const res = await callGemini(prompt, apiKey);
    if (res) return res.trim();
  }

  // Heuristic Template
  const topSkills = resume.skillCategories.flatMap(sc => sc.skills).slice(0, 4).join(', ');
  const recentExp = resume.experience[0];
  const recentRoleText = recentExp ? `During my time as ${recentExp.role} at ${recentExp.company}, I honed my expertise in driving scalable implementations under tight deadlines.` : `My technical background has equipped me with strong analytical discipline and systematic problem-solving habits.`;

  return `Dear Hiring Manager at ${company},

I am writing to express my strong interest in the ${role} position at ${company}. With a rigorous foundation in ${topSkills || 'modern computer science and software development'} and a proven record of turning complex challenges into high-efficiency solutions, I am eager to contribute to your engineering and product objectives.

${recentRoleText} I pride myself on architecting dependable solutions, collaborating closely across cross-functional sprints, and prioritizing measurable business outcomes. The mission and technical trajectory at ${company} align directly with my professional dedication to excellence and rapid innovation.

Thank you for your time and consideration. I welcome the opportunity to discuss how my skill set, hands-on project experience, and work ethic can deliver immediate value to the ${company} team.

Warm regards,

${candidateName}
${resume.personalInfo.email || ''} | ${resume.personalInfo.phone || ''}
${resume.personalInfo.location || ''}`;
}

// Curated skills by role for quick suggestion
export const ROLE_SKILL_SUGGESTIONS: Record<string, string[]> = {
  'ai_ml': ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'Ultralytics YOLOv8', 'Google Gemini API', 'Hugging Face', 'Scikit-Learn', 'Pandas', 'NumPy', 'LLMs', 'Prompt Engineering', 'LangChain'],
  'frontend': ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'HTML5/CSS3', 'Vite', 'GraphQL', 'Responsive Design', 'Jest', 'Framer Motion'],
  'backend': ['Node.js', 'Python', 'Go', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'REST APIs', 'Microservices', 'GraphQL', 'Kafka', 'JWT Authentication'],
  'fullstack': ['React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'PostgreSQL', 'Docker', 'AWS', 'Git/GitHub', 'RESTful APIs', 'CI/CD Pipelines'],
  'devops': ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD Pipelines', 'GitHub Actions', 'Linux Bash', 'Prometheus', 'Grafana', 'Nginx', 'ArgoCD'],
  'data_analyst': ['Advanced SQL', 'Python (Pandas/NumPy)', 'Tableau', 'Power BI', 'Google BigQuery', 'Excel Financial Modeling', 'Statistical Analysis', 'A/B Testing', 'dbt'],
  'iot': ['ESP8266 / NodeMCU', 'ESP32', 'Arduino C++', 'MQTT Protocol', 'Sensors Integration', 'Raspberry Pi', 'Embedded C', 'UART/I2C/SPI', 'IoT Cloud Telemetry']
};
