/**
 * Professional experience and education, newest first. Feeds the experience
 * overview on the home page and the career progression on the About page.
 * Source: the resume in /public.
 */
export interface ExperienceEntry {
  /** e.g. "03/2026 — Present". */
  period: string;
  role: string;
  organisation: string;
  summary: string;
  /** Concrete points: systems owned, scope, decisions led. */
  highlights?: string[];
  /** Placeholder entries are labelled on the page and hidden with drafts. */
  placeholder?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    period: '03/2026 — Present',
    role: 'Fullstack Developer',
    organisation: 'HQGroups',
    summary:
      'Leading technical architecture and system design, and building backend services in Go and Laravel on cloud-native infrastructure.',
    highlights: [
      'Lead technical architecture and system design for scalable, maintainable and reliable backend solutions.',
      'Design and develop backend services in Go and Laravel, applying Clean Architecture, modular design and scalable service patterns.',
      'Design and operate cloud-native infrastructure on Docker, Kubernetes, Linux, Nginx, PostgreSQL, Redis and Cloudflare.',
      'Build and maintain CI/CD pipelines with GitHub Actions, containerised deployments, automated workflows and production monitoring.',
      'Established coding standards, architecture guidelines and code review practices across development teams.',
      'Apply AI tools and LLM technologies to development, technical research, debugging and system design.',
    ],
  },
  {
    period: '01/2025 — 02/2026',
    role: 'Team Leader',
    organisation: 'tabtab.me',
    summary:
      'Led architecture and an 11-member cross-functional team building a real estate social networking platform with ERP/CRM capabilities.',
    highlights: [
      'Led technical architecture and system design, focusing on scalability, reliability and maintainability.',
      'Designed and developed backend services in Go, alongside Lumen and NestJS, following Clean Architecture and modular design.',
      'Architected and operated cloud-native systems on Google Cloud Platform and Kubernetes, with Docker-based CI/CD pipelines.',
      'Designed core ERP/CRM workflows: customer management, lead tracking, sales pipelines and the transaction lifecycle.',
      'Established coding standards and code review practices while mentoring an 11-member cross-functional team.',
      'Integrated third-party services including the OpenAI API, and used Cloudflare for security, performance and traffic management.',
      'Drove technical planning and long-term architecture decisions across the product.',
    ],
  },
  {
    period: '10/2020 — 01/2025',
    role: 'Fullstack Developer',
    organisation: 'NTQ Solution',
    summary: 'Developed and maintained enterprise systems for international clients in Japan and the United States.',
    highlights: [
      'Worked with Go, Laravel, Vue, Yii and Docker-based environments.',
      'Took part in system design, database design and technical discussions.',
      'Supported deployment, monitoring, maintenance and operations.',
      'Collaborated closely with QA, project management and client-side teams.',
    ],
  },
  {
    period: '03/2023 — 01/2025',
    role: 'Teacher (side role)',
    organisation: 'Techmaster',
    summary: 'Taught PHP fundamentals, object-oriented programming, MVC and the Laravel framework.',
    highlights: [
      'Designed course materials, coding exercises and real-world projects.',
      'Mentored students on clean code, best practices and backend architecture.',
    ],
  },
];

export interface EducationEntry {
  period: string;
  institution: string;
  qualification: string;
}

export const education: EducationEntry[] = [
  {
    period: '2018 — 2022',
    institution: 'University of Transport Technology',
    qualification: 'Information Systems Engineering',
  },
];
