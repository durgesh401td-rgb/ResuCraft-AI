import { ResumeData } from '../types/resume';

export const durgeshResume: ResumeData = {
  personalInfo: {
    fullName: "Durgesh Sonar",
    jobTitle: "B.Tech CSE (AI & ML) | IoT & AI Developer",
    email: "durgesh401td@gmail.com",
    phone: "+91 98765 43210",
    location: "Nashik, Maharashtra, India",
    website: "https://portfolio-7y8z72l36-durgesh401td-rgb.vercel.app",
    github: "github.com/durgesh401td-rgb",
    linkedin: "linkedin.com/in/durgesh-sonar-441231389",
  },
  summary: "Driven and analytical B.Tech Computer Science (AI & ML) student with hands-on experience developing real-time computer vision pipelines, IoT embedded systems (ESP8266), and intelligent web applications using Google Gemini API. Adept at rapid prototyping, algorithm optimization, and data-driven problem solving, supported by 6 months of operational rigor at Blinkit. Eager to engineer scalable AI/ML solutions in high-impact environments.",
  experience: [
    {
      id: "exp-1",
      company: "Blinkit",
      role: "Operations Associate & Picker-Packer",
      location: "Nashik, India",
      startDate: "Oct 2025",
      endDate: "Mar 2026",
      current: false,
      bullets: [
        "Managed high-volume order fulfillment with 99.4% accuracy under stringent 10-minute turnaround service-level agreements.",
        "Collaborated with cross-functional inventory teams to streamline SKU sorting, reducing item retrieval bottlenecks by 18%.",
        "Enforced strict quality inspection standards, zero-error packaging protocols, and automated barcode scanning routines.",
        "Cultivated exceptional discipline, operational time management, and resilience in high-velocity warehouse environments."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "Sandip University",
      degree: "Bachelor of Technology (B.Tech)",
      fieldOfStudy: "Computer Science & Engineering (AI & Machine Learning)",
      location: "Nashik, Maharashtra",
      startDate: "2023",
      endDate: "2027",
      gpa: "8.6 / 10.0",
      bullets: [
        "Core Coursework: Machine Learning, Deep Learning, Data Structures & Algorithms, Database Management Systems, IoT Architecture.",
        "Academic distinction in Object-Oriented Programming (C++/Python) and Applied Neural Networks."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Real-Time Object Detection & Event Logging Platform",
      techStack: "Python, YOLOv8, OpenCV, MySQL, Streamlit",
      github: "https://github.com/durgesh401td-rgb/realtime-yolo-logger",
      startDate: "Jan 2026",
      endDate: "Feb 2026",
      bullets: [
        "Engineered an end-to-end edge inference pipeline leveraging Ultralytics YOLOv8n to detect objects at 38+ FPS with dynamic confidence filtering.",
        "Integrated a MySQL telemetry engine with intelligent cooldown debounce algorithms, mitigating database write latency by 65%.",
        "Architected an interactive Streamlit analytics dashboard featuring live annotated video streaming, latency gauges, and CSV export."
      ]
    },
    {
      id: "proj-2",
      title: "ResuCraft AI — Next-Gen AI Resume & ATS Engine",
      techStack: "React, TypeScript, Tailwind CSS, Google Gemini API",
      link: "https://resucraft-ai.vercel.app",
      github: "https://github.com/durgesh401td-rgb/resucraft-ai",
      startDate: "Mar 2026",
      endDate: "Present",
      bullets: [
        "Developed a modern AI-powered resume builder equipped with instant ATS job description matching and STAR-method bullet refinement.",
        "Implemented real-time dual rendering with 5 ATS-compliant templates and client-side vector heuristic fallback for zero-downtime offline use.",
        "Achieved 100% responsive preview with custom A4 pagination stylesheets and instant high-fidelity PDF generation."
      ]
    },
    {
      id: "proj-3",
      title: "IoT Smart Plant & Environmental Monitoring System",
      techStack: "ESP8266, C++, Soil Sensors, DHT11, Cloud Telemetry",
      github: "https://github.com/durgesh401td-rgb/iot-smart-plant",
      startDate: "Aug 2025",
      endDate: "Nov 2025",
      bullets: [
        "Designed an autonomous IoT micro-controller station utilizing NodeMCU ESP8266 to capture ambient temperature, humidity, and soil moisture levels.",
        "Implemented smart threshold triggers and visual RGB/OLED status indicators, automating irrigation alert notifications."
      ]
    }
  ],
  skillCategories: [
    {
      id: "skills-1",
      categoryName: "Programming Languages",
      skills: ["Python", "C++", "C", "JavaScript (ES6+)", "TypeScript", "SQL"]
    },
    {
      id: "skills-2",
      categoryName: "AI, ML & Computer Vision",
      skills: ["Google Gemini API", "Ultralytics YOLOv8", "OpenCV", "MediaPipe", "Scikit-Learn", "Prompt Engineering"]
    },
    {
      id: "skills-3",
      categoryName: "Web & IoT Hardware",
      skills: ["React.js", "Tailwind CSS", "HTML5/CSS3", "Streamlit", "NodeMCU ESP8266", "Ultrasonic & DHT Sensors"]
    },
    {
      id: "skills-4",
      categoryName: "Tools & Methodologies",
      skills: ["Git & GitHub", "VS Code", "MySQL", "MSYS2", "Business Analytics", "STAR Method"]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Business Analytics Professional Track",
      issuer: "MyCaptain",
      date: "2025",
      url: "https://mycaptain.in"
    },
    {
      id: "cert-2",
      name: "Generative AI Fundamentals & Prompt Design",
      issuer: "Google Cloud Skills Boost",
      date: "2025",
      url: "https://cloud.google.com"
    }
  ],
  awards: [
    {
      id: "award-1",
      title: "First Runner-up — Annual Engineering Tech Expo",
      issuer: "Sandip University",
      date: "2025",
      description: "Recognized for innovation in IoT Automated Smart Lighting & Sensing prototype."
    }
  ],
  languages: [
    { id: "lang-1", language: "English", proficiency: "Professional" },
    { id: "lang-2", language: "Hindi", proficiency: "Native" },
    { id: "lang-3", language: "Marathi", proficiency: "Native" }
  ],
  customSections: [],
  activeSections: {
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    certifications: true,
    awards: true,
    languages: true,
    custom: false
  },
  sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications", "awards", "languages"]
};

export const alexRiveraResume: ResumeData = {
  personalInfo: {
    fullName: "Alex Rivera",
    jobTitle: "Senior Full Stack Cloud Engineer",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexrivera.dev",
    github: "github.com/alexrivera-tech",
    linkedin: "linkedin.com/in/alexrivera-cloud",
  },
  summary: "Results-driven Senior Full Stack Engineer with 6+ years designing scalable microservices, high-concurrency cloud infrastructure (AWS/GCP), and responsive web platforms. Expert in TypeScript, React, Go, and Kubernetes. Proven track record reducing infrastructure expenses by 32% while increasing system reliability to 99.98% uptime.",
  experience: [
    {
      id: "exp-2",
      company: "Apex Cloud Systems",
      role: "Lead Full Stack Engineer",
      location: "San Francisco, CA",
      startDate: "2023",
      endDate: "Present",
      current: true,
      bullets: [
        "Architected distributed event streaming backend using Kafka and Go, processing 45M+ events daily with sub-80ms p99 latency.",
        "Spearheaded migration of legacy frontend to Next.js 14 and Tailwind, reducing First Contentful Paint by 48%.",
        "Mentored team of 7 junior and mid-level engineers through code reviews, design sprints, and automated CI/CD practices."
      ]
    },
    {
      id: "exp-3",
      company: "Vanguard Tech Labs",
      role: "Software Engineer II",
      location: "San Jose, CA",
      startDate: "2020",
      endDate: "2023",
      current: false,
      bullets: [
        "Built modular customer billing portal processing $12M in annual recurring revenue with Stripe integration.",
        "Refactored PostgreSQL queries and implemented Redis caching, diminishing average database CPU loads by 41%."
      ]
    }
  ],
  education: [
    {
      id: "edu-2",
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      fieldOfStudy: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2016",
      endDate: "2020",
      gpa: "3.85 / 4.0",
      bullets: ["Dean's Honors List, Magna Cum Laude, President of Open Source Club."]
    }
  ],
  projects: [
    {
      id: "proj-4",
      title: "OmniMesh — Distributed Service Mesh Visualizer",
      techStack: "Go, React, WebGL, Docker, Kubernetes",
      github: "https://github.com/alexrivera-tech/omnimesh",
      bullets: [
        "Constructed real-time network topology visualizer rendering 10,000+ active nodes at 60 FPS using WebGL canvas.",
        "Adopted by 150+ developer organizations with 2,400+ GitHub stars."
      ]
    }
  ],
  skillCategories: [
    {
      id: "skills-alex-1",
      categoryName: "Languages",
      skills: ["TypeScript", "JavaScript", "Go", "Python", "SQL"]
    },
    {
      id: "skills-alex-2",
      categoryName: "Frameworks & Cloud",
      skills: ["React", "Next.js", "Node.js", "AWS (ECS, Lambda, S3)", "Docker", "Kubernetes", "GraphQL"]
    }
  ],
  certifications: [
    {
      id: "cert-alex-1",
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2024"
    }
  ],
  awards: [],
  languages: [
    { id: "lang-a1", language: "English", proficiency: "Native" },
    { id: "lang-a2", language: "Spanish", proficiency: "Conversational" }
  ],
  customSections: [],
  activeSections: {
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    certifications: true,
    awards: false,
    languages: true,
    custom: false
  },
  sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications", "languages"]
};

export const sophiaChenResume: ResumeData = {
  personalInfo: {
    fullName: "Sophia Chen",
    jobTitle: "Senior Business & Data Analyst",
    email: "sophia.chen@example.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    website: "https://sophiachen-analytics.com",
    linkedin: "linkedin.com/in/sophiachen-analytics",
  },
  summary: "Insight-driven Senior Business Intelligence Analyst with 5+ years converting complex multi-million row datasets into actionable executive insights. Proficient in SQL, Python, Tableau, and automated A/B experimentation frameworks. Identified $3.2M in annual cost-reduction opportunities across marketing and supply chain logistics.",
  experience: [
    {
      id: "exp-sophia-1",
      company: "Stratagem Financial",
      role: "Lead Business Analyst",
      location: "New York, NY",
      startDate: "2022",
      endDate: "Present",
      current: true,
      bullets: [
        "Spearheaded enterprise KPI dashboard deployed across 45 executives and business unit leaders, saving 15 hours of manual weekly reporting.",
        "Formulated statistical cohort retention models uncovering a 24% customer churn vulnerability in Q3, formulating targeted re-engagement campaigns.",
        "Partnered with engineering to build BigQuery semantic models reducing analytics query runtimes by 55%."
      ]
    }
  ],
  education: [
    {
      id: "edu-sophia-1",
      institution: "Columbia University",
      degree: "M.S. in Applied Analytics",
      fieldOfStudy: "Data Analytics & Statistics",
      location: "New York, NY",
      startDate: "2020",
      endDate: "2022",
      gpa: "3.9 / 4.0"
    }
  ],
  projects: [
    {
      id: "proj-sophia-1",
      title: "OmniChannel Attribution Engine",
      techStack: "Python, BigQuery, Scikit-Learn, Power BI",
      bullets: [
        "Devised Shapley-value algorithmic marketing attribution model assessing $18M ad spend efficacy across 6 social media channels."
      ]
    }
  ],
  skillCategories: [
    {
      id: "skills-sc-1",
      categoryName: "Analytics & Querying",
      skills: ["Advanced SQL", "Python (Pandas, NumPy, Scikit-Learn)", "R", "Statistical Hypothesis Testing", "A/B Testing"]
    },
    {
      id: "skills-sc-2",
      categoryName: "BI & Visualization",
      skills: ["Tableau Server", "Power BI", "Looker Studio", "Google BigQuery", "dbt", "Excel Financial Modeling"]
    }
  ],
  certifications: [
    {
      id: "cert-sc-1",
      name: "Tableau Certified Data Analyst",
      issuer: "Tableau",
      date: "2023"
    }
  ],
  awards: [],
  languages: [
    { id: "lang-s1", language: "English", proficiency: "Native" },
    { id: "lang-s2", language: "Mandarin", proficiency: "Fluent" }
  ],
  customSections: [],
  activeSections: {
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    certifications: true,
    awards: false,
    languages: true,
    custom: false
  },
  sectionOrder: ["summary", "skills", "experience", "education", "projects", "certifications", "languages"]
};

export const emptyResume: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: "",
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skillCategories: [
    {
      id: "skills-default",
      categoryName: "Technical Skills",
      skills: []
    }
  ],
  certifications: [],
  awards: [],
  languages: [],
  customSections: [],
  activeSections: {
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    certifications: true,
    awards: true,
    languages: true,
    custom: true
  },
  sectionOrder: ["summary", "skills", "experience", "projects", "education", "certifications", "awards", "languages"]
};
