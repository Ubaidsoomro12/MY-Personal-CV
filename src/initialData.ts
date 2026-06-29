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
      title: "Global Web Application Recognition (Techwiz 4 & Techwiz 5)",
      description: "Represented team Code Sorcerers (Aptech Defence Hyderabad Center) across Aptech consecutive global web application development tracks, earning an international Certificate of Participation at Techwiz 4 (2023) and escalating to an international Certificate of Recognition for outstanding performance at Techwiz 5 (2024)."
    },
    {
      title: "Professional Microsoft Office Certification – Government College for Information Technology (2023)",
      description: "Successfully completed a 3-month comprehensive certification in Microsoft Office applications (from February 1, 2023 to May 18, 2023) held at the Government College for Information Technology, Qasimabad, Hyderabad, earning Certificate No. 209."
    },
    {
      title: "Software Engineering Showcase Distinction (Aptech Vision)",
      description: "Credentialed and consistently recognized for technical excellence and innovative software showcase contributions across consecutive Aptech Vision exhibitions from 2024 , spanning major technical showcases in Hyderabad and Karachi."
    },
    {
      title: "1st Runner-Up of Contest-Azm in Web Application Development – Aptech Learning Defence Center Hyd (2024)",
      description: "Awarded a Certificate of Appreciation for achieving 1st Runner-Up of Contest-Azm in Web Application Development at Aptech Learning Defence Center, Hyderabad, on November 23, 2024 (Sr No. 027122)."
    },
    {
      title: "Aptech Vision Software Exhibition Participation – Aptech Learning Hyderabad (2024)",
      description: "Awarded a Certificate of Participation in recognition of showcasing software talents at Aptech Vision 2024, held in Hyderabad on Thursday, November 21, 2024 (Sr No. 116426)."
    },

    {
      title: "As A Backend Developer – DigiTech Software Company (May 2025 – Till Now)",
      description: "Supported the development team in building and maintaining web applications using PHP, Laravel, and MySQL, performed bug fixing and testing, and assisted in creating responsive and user-friendly interfaces."
    },
    {
      title: "Enterprise Software Engineering Mastery (Aptech Pakistan) (2022 – 2025)",
      description: "Completed rigorous multi-year professional tracks including CPISM (Certificate Proficiency in Information System Management), DISM (Diploma in Information System Management), and HDSE (Higher Diploma in Software Engineering), demonstrating full-cycle architectural proficiency."
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
      link: "https://hr.digitechinfra.com/admin/",
      description: "Developed a comprehensive HRMS (Human Resource Management System) designed to automate corporate workflows, employee profiles, and payroll.",
      contribution: "Engineered system components for employee management, attendance tracking, secure payroll processing, and structured leave management subsystems.",
      result: "Slashed administrative processing overhead and replaced legacy manual tracking systems with fully secure, live software dashboards."
    },
    {
      id: "p2",
      title: "JOB PORTAL SYSTEM",
      technologies: "Laravel, MySQL, Bootstrap, Tailwind CSS",
      link: "https://www.kaasib.pk/",
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
      role: "Full Stack Developer Intern",
      company: "DigiTech Software Company",
      dates: "Jun 2025 – Aug 2025",
      bullets: [
        "Completed a 3-month intensive Full-Stack Development Internship, actively contributing to both front-end and back-end web solutions.",
        "Collaborated with senior engineers to build and maintain robust web applications using React, Node.js, and modern databases.",
        "Optimized existing codebases, performed testing, resolved rendering bottlenecks, and developed mobile-responsive user interfaces using Tailwind CSS."
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
    },
    {
      id: "dep4",
      client: "Online Shopping Mart",
      link: "https://www.bachatmart.pk/",
      role: "Full-Stack Developer",
      bullets: [
        "Developed Bachat Mart, a complete e-commerce online shopping mart featuring detailed product categories, dynamic search functionality, and seamless cart operations.",
        "Engineered home-delivery routing pipelines and intuitive checkout experiences, enabling customers to easily order and track favorite products directly to their home address.",
        "Built the robust architecture using PHP/Laravel for back-end APIs, MySQL for database optimization, and designed responsive user interfaces using Tailwind CSS and JavaScript."
      ]
    }
  ],

  education: [
    {
      institution: "BISE Hyderabad",
      degree: "Higher Secondary Certificate (HSC Part-II) in Pre-Engineering",
      dates: "2021",
      details: "Successfully passed the Higher Secondary Certificate Part-II Annual Examination in the Pre-Engineering group with an exceptional A1 Grade, held under the Board of Intermediate & Secondary Education, Hyderabad, Sindh in July 2021 (Seat No. 84065, Certificate S.No. 108048)."
    },
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
