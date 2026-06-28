import { CVData } from "./types";

export const initialCVData: CVData = {
  name: "UBAIDULLAH",
  title: "Full Stack Developer",
  email: "ubaidsoomro505@gmail.com",
  phone: "+92 3188 893 863",
  location: "Qasimabad, Hyderabad, Sindh, Pakistan",
  portfolio: "metawaveinnovations.com/US-Portfolio",
  portfolioLabel: "metawaveinnovations.com/US-Portfolio",
  linkedin: "https://www.linkedin.com/in/ubaid-soomro-2714982aa/",
  linkedinLabel: "linkedin.com/in/ubaid-soomro-2714982aa",
  summary: "Highly accomplished Full Stack Developer with a proven record of engineering scalable backend systems, responsive web applications, and dynamic digital solutions. Expert in uniting robust backend architectures (PHP, Laravel, Node.js, Express.js) with responsive frontend technologies (HTML5, CSS3, JavaScript, Tailwind, React.js) and robust databases (MySQL, MongoDB). Technical professional with extensive experience leading web projects, building RESTful APIs, optimizing query performance, and implementing secure application functionality from conception to production.",
  
  honors: [
    {
      title: "Backend Developer – DigiTech Software Company (Jan 2026 – Present)",
      description: "Developing scalable backend systems and dynamic web applications using PHP, Laravel, MERN (MongoDB, Express.js, React.js, Node.js), and MySQL, building RESTful APIs, optimizing database performance, and implementing secure and efficient application functionality."
    },
    {
      title: "Onboarding Project Lead – Meta Wave Innovations (Jan 2026 – Present)",
      description: "Designated as the critical onboarding leadership point for incoming engineering and development personnel, establishing workspace standardizations since January 2026."
    },

    {
      title: "IT Intern – DigiTech Software Company (May 2025 – Sep 2025)",
      description: "Supported the development team in building and maintaining web applications using PHP, Laravel, and MySQL, performed bug fixing and testing, and assisted in creating responsive and user-friendly interfaces."
    },
    {
      title: "Academic Distinction in Computer Science (BSCS) (2022 – 2025)",
      description: "Advanced academic standing at the University of Sindh, specializing in data structures, database administration, and software engineering."
    },
    {
      title: "Enterprise Software Engineering Mastery (Aptech Pakistan) (2022 – 2025)",
      description: "Completed rigorous multi-year professional tracks including CPISM (Certificate Proficiency in Information System Management), DISM (Diploma in Information System Management), and HDSE (Higher Diploma in Software Engineering), demonstrating full-cycle architectural proficiency."
    },
    {
      title: "Teaching Experience – Computer Programming & Web Development (Jan 2022 – Dec 2023)",
      description: "Trained and mentored students in PHP, Laravel, HTML, CSS, JavaScript, and coding best practices for modern web development."
    },
    {
      title: "Most Innovative Intern of the Year (2022)",
      description: "Awarded for outstanding development contributions, technical agility, and engineering initiative during early career full-stack projects."
    }
  ],

  techStack: {
    frontend: [
      "HTML5 / CSS3 / JavaScript (ES6+)",
      "Tailwind CSS / Bootstrap",
      "React.js / Node.js / Express.js",
      "Responsive UI/UX Layout Design"
    ],
    backend: [
      "PHP (Modern OOP)",
      "Laravel Framework",
      "MVC Architecture",
      "RESTful API Development & Third-Party Integrations",
      "Custom Business Logic",
      "Web Security Best Practices"
    ],
    database: [
      "MySQL / MongoDB / SQL Server",
      "Relational Database Schema Mapping",
      "Complex Query Optimization",
      "Data Validation",
      "Deployment, Server Configuration & System Maintenance"
    ],
    tools: [
      "VS Code / Git & GitHub Version Control",
      "XAMPP / Postman / NPM Package Manager",
      "Performance Diagnostics & Auditing",
      "Performance Tuning & Server Load Reduction"
    ]
  },

  projects: [
    {
      id: "p1",
      title: "HRMS SYSTEM",
      technologies: "Laravel, MySQL, Tailwind CSS",
      description: "Developed a comprehensive HRMS (Human Resource Management System) designed to automate corporate workflows, employee profiles, and payroll.",
      contribution: "Engineered system components for employee management, attendance tracking, secure payroll processing, and structured leave management subsystems.",
      result: "Slashed administrative processing overhead and replaced legacy manual tracking systems with fully secure, live software dashboards."
    },
    {
      id: "p2",
      title: "JOB PORTAL SYSTEM",
      technologies: "Laravel, MySQL, Bootstrap, Tailwind CSS",
      description: "Developed a modern job portal platform featuring dynamic candidate application channels, resume submissions, and robust employer management dashboards.",
      contribution: "Designed candidate filtering query structures, responsive dashboard displays, and optimized database storage pipelines.",
      result: "Delivered clean system performance with minimal backend server load, enabling smooth candidate application flows."
    }
  ],

  experience: [
    {
      id: "exp1",
      role: "Full Stack Developer & Onboarding Architect",
      company: "Meta Wave Innovations Pvt Limited",
      dates: "Jan 2026 – Present",
      bullets: [
        "Work as a Full Stack Developer at Meta Wave Innovation Pvt Limited since Jan 2026 developing modern full-stack applications and enterprise-level software solutions.",
        "Design highly responsive, aesthetic user interfaces and custom UI components utilizing Tailwind CSS, Bootstrap, and modern Javascript (React.js).",
        "Partner closely with backend engineering teams to integrate complex PHP/Laravel logical modules and database endpoints.",
        "Act as the Onboarding Project Lead, training and guiding incoming development groups in structural version control, package managers, and workflow standardizations."
      ]
    },
    {
      id: "exp2",
      role: "Backend Developer Laravel",
      company: "DigiTech Software Company",
      dates: "Jan 2026 – Present",
      bullets: [
        "Develop scalable backend systems and dynamic web applications using PHP, Laravel, and MySQL database engines.",
        "Build robust, secure RESTful APIs to integrate frontend client systems, third-party authentication protocols, and payment networks.",
        "Conduct direct database optimization, query mapping, indexing, and tuning to ensure minimal server latency under peak traffic.",
        "Implement secure application functionality including comprehensive input sanitization, token validations, and role-based access management."
      ]
    },
    {
      id: "exp3",
      role: "IT Intern",
      company: "DigiTech Software Company",
      dates: "May 2025 – Sep 2025",
      bullets: [
        "Supported the development team in building and maintaining web applications using PHP, Laravel, and MySQL.",
        "Performed rigorous testing, structural bug fixing, and tracing client-side rendering bottlenecks using browser diagnostics.",
        "Assisted in creating highly responsive and user-friendly web interfaces using HTML, CSS, Tailwind CSS, and Bootstrap."
      ]
    },
    {
      id: "exp4",
      role: "Freelance Web Developer",
      company: "Fiverr, Upwork & Local Clients",
      dates: "Feb 2022 – Mar 2024",
      bullets: [
        "Delivered custom, responsive, and cross-browser web applications with PHP Laravel and MySQL for international and local clients.",
        "Architected full-cycle digital systems and mobile-friendly layouts, boosting site speeds and client conversion ratios."
      ]
    },
    {
      id: "exp5",
      role: "Technical Instructor & Web Development Mentor",
      company: "Computer Programming & Web Development",
      dates: "Jan 2022 – Dec 2023",
      bullets: [
        "Trained and mentored students in PHP, Laravel, HTML, CSS, JavaScript, and programming best practices.",
        "Curated comprehensive technical course guides, led software engineering labs, and evaluated student project submissions."
      ]
    }
  ],

  deployments: [
    {
      id: "dep1",
      client: "Bhopali Delights",
      link: "www.bhopalidelights.com",
      role: "Full-Stack Developer",
      bullets: [
        "Developed and deployed a food ordering web app for a home-based kitchen service.",
        "Features include menu browsing, online ordering, and responsive UI."
      ]
    },
    {
      id: "dep2",
      client: "Smart Choice Yachts",
      link: "www.smartchoiceyachts.com",
      role: "Full-Stack Software Engineer",
      bullets: [
        "Built a yacht booking platform with online payments, user dashboards, and role-based admin control for bookings, drivers, and inspections."
      ]
    },
    {
      id: "dep3",
      client: "Stylo Store",
      link: "www.styleUp.com",
      role: "Full-Stack Developer",
      bullets: [
        "Developed an online clothing store with product management, order processing, and responsive design using Laravel, MySQL, and Tailwind CSS."
      ]
    }
  ],

  education: [
    {
      institution: "University of Sindh, Jamshoro",
      degree: "Bachelor of Science in Computer Science (BSCS)",
      dates: "2022 – 2025",
      details: "Focused on core computer science foundations, algorithms, object-oriented systems, database schemas, and advanced software engineering pipelines."
    },
    {
      institution: "Aptech Pakistan",
      degree: "Professional Diplomas — HDSE (Higher Diploma in Software Engineering)",
      details: "Mastered CPISM (Certificate Proficiency in Information System Management), DISM (Diploma in Information System Management), and HDSE core software development curricula."
    }
  ],

  skillsDesign: [
    "Responsive Web Design & Mobile-First Architectures",
    "Component-Driven Frontend Engineering (React, Vite)",
    "Modern Styling Workflows (Tailwind CSS, Bootstrap)",
    "Cross-Browser Compatibility & Interactive UI Layouts"
  ],
  skillsBusiness: [
    "Full-Cycle Agile Product Development & Scrum",
    "Technical Architecture Planning & Consultations",
    "System Performance Tuning & Database Optimization",
    "Version Control (Git/GitHub) & Developer Onboarding"
  ],

  coreAchievements: [
    {
      title: "System Blueprinting & API Design",
      description: "Mastered full-cycle system modeling, REST API architectures, and database configurations with high performance."
    },
    {
      title: "Tech Stack & Optimization",
      description: "Engineered high-efficiency full-stack applications, optimizing query speeds, asset loading, and server load execution."
    },
    {
      title: "Team Leadership & Onboarding",
      description: "Successfully led project onboardings, trained developer cohorts, and enforced robust version control workflows."
    }
  ],

  languages: [
    { language: "English", level: "Professional Working Proficiency" },
    { language: "Urdu", level: "Native / Bilingual Proficiency" },
    { language: "Sindhi", level: "Professional Proficiency" }
  ]
};
