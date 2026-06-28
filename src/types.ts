export interface SectionProject {
  id: string;
  title: string;
  technologies: string;
  description: string;
  contribution: string;
  result: string;
}

export interface SectionExperience {
  id: string;
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface ClientDeployment {
  id: string;
  client: string;
  link?: string;
  role: string;
  bullets: string[];
  isActiveDevelopment?: boolean;
}

export interface SectionEducation {
  institution: string;
  degree: string;
  dates?: string;
  details?: string;
}

export interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  portfolioLabel: string;
  linkedin?: string;
  linkedinLabel?: string;
  summary: string;
  
  // Section 02: Honors & Achievements
  honors?: {
    title: string;
    description: string;
  }[];
  
  // Section 03: Technical Stack & Competency Matrix
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };

  // Section 03: Flagship Enterprise Blueprints (Self Projects)
  projects: SectionProject[];

  // Section 04: Experience & Technical Leadership
  experience: SectionExperience[];

  // Section 05: Client Deployment Record (Commercial Work)
  deployments: ClientDeployment[];

  // Section 06: Education & Academic Advancement
  education: SectionEducation[];

  // Section 07: Adaptive Cross-Functional Skills
  skillsDesign: string[];
  skillsBusiness: string[];

  // Section 08: Core Achievements
  coreAchievements: {
    title: string;
    description: string;
  }[];

  // Section 09: Languages
  languages: {
    language: string;
    level: string;
  }[];
}

export interface ATSAnalysisResult {
  score: number;
  summary: string;
  missingKeywords: string[];
  redFlags: string[];
  tailoredBullets: {
    section: string;
    original: string;
    replacement: string;
    impactExplanation: string;
  }[];
  interviewPrep: string[];
}

export type ThemeStyle = "charcoal" | "cool-slate" | "executive-gold" | "tech-emerald" | "brutalist";
