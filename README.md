# 🚀 ResuCraft AI — Next-Gen AI Resume Builder & ATS Optimizer
### CEP 2: Complex Engineering Project — Artificial Intelligence & Machine Learning Track

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![ATS Optimized](https://img.shields.io/badge/ATS-Optimized-10B981?style=for-the-badge&logo=checkmarx&logoColor=white)](https://resucraft.dev/)
[![Offline Capable](https://img.shields.io/badge/Dual_Engine-100%25_Offline-F59E0B?style=for-the-badge&logo=pwa&logoColor=white)](https://resucraft.dev/)

> **A production-grade, AI-powered resume engineering workspace featuring real-time split-screen rendering, 5 ATS-compliant templates, STAR-method bullet refinement, job description keyword matching, and instant high-fidelity PDF export.**

---

## 🌟 Key Features & Highlights

### 🧠 Dual AI Engine Architecture
- **Online Mode (Google Gemini API):** Seamlessly integrates with Google's latest Gemini models (`gemini-1.5-flash`, `gemini-2.0-flash`) for deep semantic text generation and job description alignment.
- **Offline / Smart Fallback Mode:** Built-in intelligent client-side heuristic engine utilizing the **Google XYZ / STAR formula**, power action verbs database, keyword frequency extraction, and ATS scoring algorithms. The application is **100% functional out of the box** without mandatory API keys or cloud dependencies.

### 🎨 5 ATS-Compliant Professional Templates
1. **Modern Clean:** Contemporary layout with accent bar, skill tags, and high-impact header.
2. **Executive Serif (Ivy League):** Classic Harvard/Ivy League formatting with horizontal rules, serif typography, and distinguished corporate appeal.
3. **Tech Minimalist:** Tailored for Software Engineers, AI/ML Specialists, and Data Scientists with terminal aesthetics, tech stack badges, and GitHub/demo links.
4. **Creative Two-Column:** Sleek dark sidebar housing contact info, education, skills, and languages with main body dedicated to experience and projects.
5. **Compact Single-Page:** Dense, high-efficiency single-page layout designed for university students and early-career engineers.

### ⚡ Interactive AI Capabilities
- **🎯 AI ATS Job Description Matcher:** Paste any job posting (LinkedIn, Indeed, Google, etc.) to get an instant **ATS Compatibility Score (0–100%)**, matched keyword highlights, missing critical keywords, and prioritized actionable recommendations.
- **✨ AI Bullet Point Enhancer:** Turns basic bullets into high-impact accomplishments using the Google XYZ formula (*"Accomplished [X] as measured by [Y] by doing [Z]"*). Offers STAR Method, Metric-Driven, and Executive tone options with 3 instant alternatives.
- **📝 AI Resume Summary Generator:** Generates punchy, 3-sentence executive summaries based on candidate's target role, experience level, and core skills.
- **💡 AI Skill Recommender:** Suggests trending industry skills tailored to 7+ tech tracks (AI/ML, Full Stack, Frontend, Backend, DevOps, Data Analyst, IoT).
- **✉️ AI Tailored Cover Letter Generator:** Crafts a personalized 3-paragraph business cover letter directly incorporating the candidate's actual projects, skills, and company targets.
- **🛡️ AI Resume Health & Impact Audit:** Evaluates power action verb variety, metric density (% numbers, multiplier tags), section completeness, and calculates an overall grade (A+, A, B, C, D).

### 📤 Multi-Format Export & Persistence
- **1-Click High-Resolution PDF Download:** Client-side vector rasterization using `html2canvas` and `jsPDF`.
- **Browser Native Print / Save PDF:** Dedicated `@media print` stylesheets with A4 dimensions and clean margin handling.
- **JSON Backup & Restore:** Export complete resume state to `.json` and restore backups anytime.
- **Plain Text (ATS Form Submission):** 1-click clipboard copy formatted for online job application text fields.
- **Real-Time Auto-Save:** Instant `localStorage` synchronization with zero data loss on browser refresh.

---

## 🏗️ System Architecture

```
+-----------------------------------------------------------------------------------+
|                                 ResuCraft AI UI                                   |
|   +--------------------------+    +-------------------------------------------+   |
|   |     Editor Controls      |    |        Live A4 Resume Canvas              |   |
|   |  - Personal Info / Bio   |    |  - Modern Clean                           |   |
|   |  - Summary & Objectives  |    |  - Executive Serif (Ivy League)           |   |
|   |  - Experience & Bullets  |    |  - Tech Minimalist                        |   |
|   |  - Academic Credentials  |    |  - Creative Two-Column                    |   |
|   |  - Projects & Tech Stack |    |  - Compact Single-Page                    |   |
|   |  - Categorized Skills    |    |  - Zoom Controls (50% - 150%)             |   |
|   +--------------------------+    +-------------------------------------------+   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                AI Processing Engine                               |
|   +------------------------------------+    +---------------------------------+   |
|   |         Online LLM Engine          |    |     Offline Heuristic Engine    |   |
|   |   - Google Gemini REST API         |    |   - STAR / XYZ Reformulator     |   |
|   |   - gemini-1.5-flash / 2.0-flash   |    |   - 50+ Power Verbs Database    |   |
|   |   - Semantic JD Parser             |    |   - Metric Density Calculator   |   |
|   +------------------------------------+    +---------------------------------+   |
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                Export & Storage                                   |
|   - 1-Click PDF (html2canvas + jsPDF)   - Browser Native Print (@media print)     |
|   - JSON State Backup / Import          - Plain Text ATS Clipboard Copy           |
|   - LocalStorage Auto-Sync Engine                                                 |
+-----------------------------------------------------------------------------------+
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher recommended, tested on Node v24.19)
- **npm** (v9+ or higher)

### Installation

```bash
# 1. Clone repository or navigate to project directory
cd "e:/CEP 2 AI resume builder"

# 2. Install dependencies
npm install

# 3. (Optional) Set up Gemini API key in .env
cp .env.example .env
# Edit .env and enter your VITE_GEMINI_API_KEY (optional, works offline without it)

# 4. Start Vite development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Production Build

```bash
# Compile TypeScript and bundle production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
CEP 2 AI resume builder/
├── index.html                   # HTML entry point with Google Fonts & SVG favicon
├── package.json                 # Dependencies (React 19, Vite, Tailwind, Lucide, jsPDF)
├── tailwind.config.js           # Custom typography and theme color extensions
├── postcss.config.js            # PostCSS configuration for Tailwind and Autoprefixer
├── tsconfig.json                # TypeScript root configuration
├── tsconfig.app.json            # Vite TypeScript app compiler options
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Main application state, split-view layout & modals
│   ├── index.css                # Tailwind directives and @media print stylesheets
│   ├── types/
│   │   └── resume.ts            # Resume, Theme, ATS Analysis, and Audit type definitions
│   ├── data/
│   │   └── sampleResumes.ts     # Pre-filled profiles: Durgesh Sonar (AI/ML), Cloud, Analyst
│   ├── services/
│   │   └── aiService.ts         # Dual AI Engine (Gemini API + Local Heuristic Evaluator)
│   ├── utils/
│   │   └── exportUtils.ts       # jsPDF, html2canvas, Native Print, JSON & Plain Text exporters
│   └── components/
│       ├── Navbar.tsx           # App header, template selector, theme picker, export buttons
│       ├── UI/
│       │   └── BrandIcons.tsx   # Custom SVG icons for GitHub, LinkedIn, etc.
│       ├── Editor/
│       │   ├── EditorContainer.tsx             # Section tab manager & visibility toggles
│       │   ├── PersonalInfoForm.tsx            # Contact information form
│       │   ├── SummaryForm.tsx                 # Summary editor with AI generation
│       │   ├── ExperienceForm.tsx              # Position history with AI bullet polish
│       │   ├── ProjectsForm.tsx                # Project showcase with demo/repo links
│       │   ├── EducationForm.tsx               # Academic credentials form
│       │   ├── SkillsForm.tsx                  # Categorized skill tags & role suggestions
│       │   └── CertificationsAndExtrasForm.tsx # Certs, honors, and language proficiency
│       ├── Templates/
│       │   ├── templateStyles.ts               # Color presets and spacing scale
│       │   ├── ResumePreviewContainer.tsx      # A4 canvas viewport with live zoom
│       │   ├── TemplateModern.tsx              # Clean contemporary template
│       │   ├── TemplateExecutive.tsx           # Ivy League serif ATS template
│       │   ├── TemplateTech.tsx                # Software developer & AI engineer template
│       │   ├── TemplateCreative.tsx            # Two-column sidebar template
│       │   └── TemplateCompact.tsx             # High-density single-page template
│       └── AIModals/
│           ├── AIBulletEnhancerModal.tsx       # STAR formula bullet optimizer
│           ├── AIAtsScannerModal.tsx           # Job description ATS matcher
│           ├── AICoverLetterModal.tsx          # Tailored cover letter generator
│           ├── AIHealthAuditModal.tsx          # Action verbs & metric health audit
│           └── ApiKeySettingsModal.tsx         # Gemini API key configuration
```

---

## 👨‍💻 Author & Engineering Credits

- **Developer:** Durgesh Sonar
- **Department:** Computer Science & Engineering (Artificial Intelligence & Machine Learning)
- **Institution:** Sandip University, Nashik, Maharashtra, India
- **GitHub:** [@durgesh401td-rgb](https://github.com/durgesh401td-rgb)
- **Portfolio:** [durgesh-sonar-portfolio](https://portfolio-7y8z72l36-durgesh401td-rgb.vercel.app/)

---

## 📜 License
Distributed under the **MIT License**.
