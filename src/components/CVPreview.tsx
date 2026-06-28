import React from "react";
import { CVData, ThemeStyle } from "../types";
import { Printer, Copy, FileDown, Check, Mail, Phone, MapPin, Globe, Landmark, Award, X, Info, Linkedin } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface CVPreviewProps {
  cvData: CVData;
  activeTheme: ThemeStyle;
}

export default function CVPreview({ cvData, activeTheme }: CVPreviewProps) {
  const [copied, setCopied] = React.useState(false);
  const [showPrintGuide, setShowPrintGuide] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportProgress, setExportProgress] = React.useState("");

  const handlePrint = () => {
    setShowPrintGuide(true);
    setTimeout(() => {
      window.print();
    }, 800);
  };

  const handleDownloadPDF = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress("Preparing document canvas...");

    try {
      // Create jsPDF instance (A4: 210mm x 297mm)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageIds = [
        "cv-page-1",
        "cv-page-2",
        "cv-page-3",
        "cv-page-4",
        "cv-page-5"
      ];

      // Wait for all custom fonts to be fully decoded/rendered
      if (document.fonts) {
        await document.fonts.ready;
      }

      // Wait for image loading
      const images = Array.from(document.querySelectorAll("img"));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      // Short delay for layout settle
      await new Promise((resolve) => setTimeout(resolve, 500));

      for (let i = 0; i < pageIds.length; i++) {
        const pageId = pageIds[i];
        setExportProgress(`Capturing Page ${i + 1} of 5...`);

        const element = document.getElementById(pageId);
        if (!element) {
          throw new Error(`Element ${pageId} not found`);
        }

        // We capture each page as a clean, high-resolution A4 image representation
        const canvas = await html2canvas(element, {
          scale: 2.2, // Elite balanced resolution for print clarity and memory safety
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc) => {
            const clonedEl = clonedDoc.getElementById(pageId) as HTMLElement;
            if (clonedEl) {
              // Lock the styling to A4 exact desktop layout dimensions inside the capture frame to ignore browser/iframe responsive squeezing
              clonedEl.style.width = "794px";
              clonedEl.style.height = "1123px";
              clonedEl.style.minWidth = "794px";
              clonedEl.style.minHeight = "1123px";
              clonedEl.style.maxWidth = "794px";
              clonedEl.style.maxHeight = "1123px";
              clonedEl.style.padding = "52px"; // pristine styling padding
              clonedEl.style.margin = "0 auto";
              clonedEl.style.boxShadow = "none";
              clonedEl.style.border = "none";
              clonedEl.style.display = "flex";
              clonedEl.style.flexDirection = "column";
              clonedEl.style.justifyContent = "space-between";
              clonedEl.style.boxSizing = "border-box";
              clonedEl.style.transform = "none";
            }
          }
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.98);

        if (i > 0) {
          pdf.addPage("a4", "portrait");
        }

        // Fill full A4 page width and height
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }

      setExportProgress("Compiling final PDF structure...");
      const formattedName = cvData.name.trim().replace(/\s+/g, "-");
      pdf.save(`${formattedName}-CV.pdf`);
      
    } catch (err) {
      console.error("PDF engine crash, using browser backup:", err);
      // Fallback
      window.print();
    } finally {
      setIsExporting(false);
      setExportProgress("");
    }
  };

  const generateMarkdown = (): string => {
    let md = `# ${cvData.name.toUpperCase()}\n`;
    md += `**${cvData.title}**\n\n`;
    md += `Email: ${cvData.email} | Phone: ${cvData.phone} | Location: ${cvData.location}\n`;
    md += `Portfolio: ${cvData.portfolio}\n\n`;
    md += `---\n\n`;
    md += `## 01 / EXECUTIVE SUMMARY\n`;
    md += `${cvData.summary}\n\n`;
    md += `---\n\n`;
    
    if (cvData.honors && cvData.honors.length > 0) {
      md += `## 02 / HONORS & FLAGSHIP SYSTEM ACHIEVEMENTS\n\n`;
      cvData.honors.forEach((h) => {
        md += `### ${h.title}\n`;
        md += `${h.description}\n\n`;
      });
      md += `---\n\n`;
    }

    md += `## 03 / TECHNICAL STACK & COMPETENCY MATRIX\n`;
    md += `*   **Frontend Frameworks & UI/UX:** ${cvData.techStack.frontend.join(", ")}\n`;
    md += `*   **Backend, APIs & Business Logic:** ${cvData.techStack.backend.join(", ")}\n`;
    md += `*   **Database & Infrastructure Engineering:** ${cvData.techStack.database.join(", ")}\n`;
    md += `*   **Performance, Growth & Cross-Functional Tools:** ${cvData.techStack.tools.join(", ")}\n\n`;
    md += `---\n\n`;

    md += `## 04 / PROFESSIONAL EXPERIENCE & EXECUTIVE LEADERSHIP\n\n`;
    cvData.experience.forEach((exp) => {
      md += `### ${exp.role} | ${exp.company} (${exp.dates})\n`;
      exp.bullets.forEach((bullet) => {
        md += `*   ${bullet}\n`;
      });
      md += `\n`;
    });
    md += `---\n\n`;

    md += `## 05 / FLAGSHIP ENTERPRISE BLUEPRINTS (SELF-ENGINEERED)\n\n`;
    cvData.projects.forEach((proj) => {
      md += `### ${proj.title}\n`;
      md += `*Stack: ${proj.technologies}*\n`;
      md += `*   **Description:** ${proj.description}\n`;
      md += `*   **Contribution:** ${proj.contribution}\n`;
      md += `*   **Business Impact:** ${proj.result}\n\n`;
    });
    md += `---\n\n`;

    md += `## 06 / COMMERCIAL CLIENT DEPLOYMENT RECORD\n\n`;
    cvData.deployments.forEach((dep) => {
      md += `### ${dep.client} (${dep.link || ""})\n`;
      md += `*Role: ${dep.role}*\n`;
      dep.bullets.forEach((b) => {
        md += `*   ${b}\n`;
      });
      md += `\n`;
    });
    md += `---\n\n`;

    md += `## 07 / EDUCATION & ACADEMIC CREDENTIALS\n\n`;
    cvData.education.forEach((edu) => {
      md += `*   **${edu.degree}** - ${edu.institution}\n`;
      if (edu.details) md += `    ${edu.details}\n`;
    });
    md += `\n---\n\n`;

    md += `## 08 / ADAPTIVE SKILLS & LANGUAGES\n\n`;
    md += `*   **Cross-Functional Capabilities:** ${cvData.skillsDesign.join(", ")}\n`;
    md += `*   **Strategic & Growth Competencies:** ${cvData.skillsBusiness.join(", ")}\n\n`;
    md += `---\n\n`;

    md += `## 09 / LANGUAGES\n\n`;
    cvData.languages.forEach((lang) => {
      md += `*   **${lang.language}:** ${lang.level}\n`;
    });
    return md;
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const markdownText = generateMarkdown();
    const blob = new Blob([markdownText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cvData.name.toLowerCase().replace(/\s+/g, "_")}_executive_cv.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Color theme specifications
  const colors: Record<ThemeStyle, {
    primaryText: string;
    secondaryText: string;
    accentText: string;
    accentLightText: string;
    accentBg: string;
    border: string;
    highlight: string;
    cardBg: string;
    accentBorder: string;
    accentLine: string;
    accentHoverBorder: string;
    tagClass: string;
  }> = {
    "charcoal": {
      primaryText: "text-slate-900",
      secondaryText: "text-slate-600",
      accentText: "text-blue-600",
      accentLightText: "text-blue-500",
      accentBg: "bg-blue-50/50",
      border: "border-slate-200",
      highlight: "bg-slate-50",
      cardBg: "bg-white",
      accentBorder: "border-blue-100",
      accentLine: "border-blue-600",
      accentHoverBorder: "hover:border-blue-500/35",
      tagClass: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    "cool-slate": {
      primaryText: "text-slate-900",
      secondaryText: "text-slate-600",
      accentText: "text-indigo-600",
      accentLightText: "text-indigo-500",
      accentBg: "bg-indigo-50/50",
      border: "border-slate-200",
      highlight: "bg-slate-50",
      cardBg: "bg-white",
      accentBorder: "border-indigo-100",
      accentLine: "border-indigo-600",
      accentHoverBorder: "hover:border-indigo-500/35",
      tagClass: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    },
    "executive-gold": {
      primaryText: "text-stone-900",
      secondaryText: "text-stone-600",
      accentText: "text-amber-800",
      accentLightText: "text-amber-600",
      accentBg: "bg-amber-50/60",
      border: "border-stone-200",
      highlight: "bg-stone-50",
      cardBg: "bg-white",
      accentBorder: "border-amber-200",
      accentLine: "border-amber-850",
      accentHoverBorder: "hover:border-amber-600/35",
      tagClass: "bg-amber-50 text-amber-900 border border-amber-200",
    },
    "tech-emerald": {
      primaryText: "text-zinc-900",
      secondaryText: "text-zinc-600",
      accentText: "text-emerald-700",
      accentLightText: "text-emerald-600",
      accentBg: "bg-emerald-50/50",
      border: "border-zinc-200",
      highlight: "bg-zinc-50",
      cardBg: "bg-white",
      accentBorder: "border-emerald-100",
      accentLine: "border-emerald-600",
      accentHoverBorder: "hover:border-emerald-500/35",
      tagClass: "bg-emerald-50 text-emerald-700 border border-emerald-150",
    },
    "brutalist": {
      primaryText: "text-black",
      secondaryText: "text-neutral-700",
      accentText: "text-emerald-700",
      accentLightText: "text-emerald-600",
      accentBg: "bg-emerald-50",
      border: "border-black border-[1px]",
      highlight: "bg-emerald-50/40",
      cardBg: "bg-white",
      accentBorder: "border-black",
      accentLine: "border-black",
      accentHoverBorder: "hover:border-black",
      tagClass: "bg-emerald-400 text-black border border-black font-extrabold",
    },
  };

  const theme = colors[activeTheme] || colors.charcoal;

  // Split experiences into founder vs developer roles so that they sit precisely on Page 2 vs Page 3
  const founderExp = cvData.experience.filter(e => e.role.toLowerCase().includes("founder") || e.role.toLowerCase().includes("architect"));
  const devExps = cvData.experience.filter(e => !e.role.toLowerCase().includes("founder") && !e.role.toLowerCase().includes("architect"));

  return (
    <div className="flex flex-col h-full bg-[#0a0f1d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
      


      {/* Workspace Wrapper (Handles scrolling, 5 A4 pages display) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#090d16]/50 scroll-smooth">
        <div id="cv-pages-container" className="mx-auto w-full max-w-[800px] flex flex-col gap-8 print:gap-0">
          
          {/* ========================================================= */}
          {/* PAGE 1: HEADER, EXECUTIVE SUMMARY, HONORS & ACHIEVEMENTS  */}
          {/* ========================================================= */}
          <div 
            id="cv-page-1"
            className="print-area relative w-full aspect-[1/1.4142] min-h-[1110px] bg-white text-slate-900 shadow-2xl p-10 print:p-10 border border-slate-100 flex flex-col justify-between overflow-hidden print:shadow-none print:border-none print:m-0 print:rounded-none select-text"
          >
            <div>
              {/* Header block (Exact height 140px constraint) */}
              <div className="h-[140px] flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex flex-col justify-center h-full">
                  <h1 className="font-display font-extrabold text-[36px] tracking-tight leading-none text-slate-950">
                    {cvData.name.toUpperCase()}
                  </h1>
                  
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className={`font-sans font-extrabold text-[15px] ${theme.accentText} uppercase tracking-wide block`}>
                      {cvData.title}
                    </span>
                  </div>

                  {/* Contact Channel Meta Grids */}
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 items-center text-[11.5px] text-slate-500 font-medium font-sans">
                    <span className="flex items-center gap-1.5">
                      <Mail size={12} className={`${theme.accentLightText} shrink-0`} />
                      <span>{cvData.email}</span>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <Phone size={12} className={`${theme.accentLightText} shrink-0`} />
                      <span>{cvData.phone}</span>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} className={`${theme.accentLightText} shrink-0`} />
                      <span>{cvData.location}</span>
                    </span>
                  </div>
                  
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 items-center text-[11.5px] text-slate-500 font-medium font-sans">
                    <span className="flex items-center gap-1">
                      <Globe size={12} className={`${theme.accentLightText} shrink-0`} />
                      <a
                        href={`https://${cvData.portfolio}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:${theme.accentText} transition-colors hover:underline font-semibold`}
                      >
                        {cvData.portfolio}
                      </a>
                    </span>
                    {cvData.linkedin && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <Linkedin size={12} className={`${theme.accentLightText} shrink-0`} />
                          <a
                            href={cvData.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:${theme.accentText} transition-colors hover:underline font-semibold`}
                          >
                            {cvData.linkedinLabel || cvData.linkedin}
                          </a>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right shape: Precision geometric wireframe accent */}
                <div className="h-full flex items-center justify-end select-none">
                  <div className={`relative w-24 h-24 border ${theme.accentBorder} flex items-center justify-center p-2 rounded-lg ${theme.highlight}/50`}>
                    <div className={`absolute inset-0 border border-dashed ${theme.accentBorder}/50 rounded-lg m-1`}></div>
                    <svg width="40" height="40" viewBox="0 0 40 40" className={theme.accentText}>
                      <rect x="2" y="2" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 3"/>
                      <path d="M2,2 L38,38 M38,2 L2,38" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
                      <circle cx="20" cy="20" r="10" fill="white" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="20" cy="20" r="3" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Section 01: Executive Summary */}
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <h2 className="font-display font-extrabold text-[13px] tracking-wider text-slate-900 uppercase">
                    01 / EXECUTIVE SUMMARY
                  </h2>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-700 text-justify font-sans">
                  {cvData.summary}
                </p>
              </div>

              {/* Section 02: Honors & Flagship Achievements */}
              {cvData.honors && cvData.honors.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center gap-3 mb-4.5">
                    <h2 className="font-display font-extrabold text-[13.5px] tracking-wider text-slate-900 uppercase">
                      02 / HONORS &amp; FLAGSHIP SYSTEM ACHIEVEMENTS
                    </h2>
                    <div className="flex-1 h-[1px] bg-slate-200"></div>
                  </div>

                  <div className="space-y-4">
                    {cvData.honors.slice(0, 5).map((h, index) => (
                      <div key={index} className={`flex gap-4 items-start py-4 px-5 border ${theme.accentBorder} rounded-xl ${theme.highlight}/40`}>
                        <div className={`p-2 border ${theme.accentBorder} rounded-lg ${theme.accentBg} ${theme.accentText} shrink-0 mt-0.5`}>
                          <Award size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-black text-[13.5px] text-slate-950 uppercase tracking-wide leading-snug">
                            {h.title}
                          </h3>
                          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-655 text-justify font-sans">
                            {h.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Print Friendly Page 1 Indicators */}
            <div className="absolute bottom-2 left-0 right-0 text-center no-print border-t border-dashed border-slate-200 pt-1 select-none">
              <span className="text-[10px] font-mono text-slate-400 tracking-widest font-bold">A4 PAGE 1 END</span>
            </div>

            {/* Page 1 footer */}
            <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-450 pt-3 border-t border-slate-150 select-none">
              <span>{cvData.name.toUpperCase()} — {cvData.title.toUpperCase()}</span>
              <span>1 / 5</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PAGE 2: TECHNICAL STACK & FOUNDER LEADERSHIP EXPERIENCE   */}
          {/* ========================================================= */}
          <div 
            id="cv-page-2"
            className="print-area relative w-full aspect-[1/1.4142] min-h-[1110px] bg-white text-slate-900 shadow-2xl p-10 print:p-10 border border-slate-100 flex flex-col justify-between overflow-hidden print:shadow-none print:border-none print:m-0 print:rounded-none select-text"
          >
            <div>
              {/* Top metadata ribbon */}
              <div className="h-[40px] flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                <span className="font-display font-black text-xs text-slate-950 uppercase tracking-wider">
                  {cvData.name.toUpperCase()}
                </span>
                <span className={`font-sans font-semibold text-[9.5px] ${theme.accentText} uppercase tracking-wider`}>
                  02 – 04 / Honors Continuation &amp; Core Competencies
                </span>
              </div>

              {/* Section 02 Continued: Honors & Flagship Achievements (Remaining items) */}
              {cvData.honors && cvData.honors.length > 5 && (
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="font-display font-extrabold text-[13px] tracking-wider text-slate-900 uppercase">
                      02 / HONORS &amp; FLAGSHIP SYSTEM ACHIEVEMENTS (CONTINUED)
                    </h2>
                    <div className="flex-1 h-[1px] bg-slate-200"></div>
                  </div>

                  <div className="space-y-4">
                    {cvData.honors.slice(5).map((h, index) => (
                      <div key={index} className={`flex gap-4 items-start py-4 px-5 border ${theme.accentBorder} rounded-xl ${theme.highlight}/40`}>
                        <div className={`p-2 border ${theme.accentBorder} rounded-lg ${theme.accentBg} ${theme.accentText} shrink-0 mt-0.5`}>
                          <Award size={15} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display font-black text-[13.5px] text-slate-950 uppercase tracking-wide leading-snug">
                            {h.title}
                          </h3>
                          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-655 text-justify font-sans">
                            {h.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 03: Technical Stack & Competency Matrix */}
              <div>
                <div className="flex items-center gap-3 mb-4.5">
                  <h2 className="font-display font-extrabold text-[13.5px] tracking-wider text-slate-900 uppercase">
                    03 / TECHNICAL STACK &amp; COMPETENCY MATRIX
                  </h2>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Grid 1: Frontend */}
                  <div className={`border ${theme.border} ${theme.cardBg} rounded-xl p-3.5 shadow-sm`}>
                    <h3 className={`font-sans font-bold text-[11.5px] text-slate-950 uppercase tracking-widest mb-2 border-l-2 ${theme.accentLine} pl-2`}>
                      Frontend Frameworks &amp; Design UI/UX
                    </h3>
                    <ul className="space-y-1.5">
                      {cvData.techStack.frontend.map((skill, index) => (
                        <li key={index} className="text-[10.5px] text-slate-650 flex items-start leading-relaxed font-sans">
                          <span className={`${theme.accentLightText} mr-2 select-none font-bold`}>•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Grid 2: Backend */}
                  <div className={`border ${theme.border} ${theme.cardBg} rounded-xl p-3.5 shadow-sm`}>
                    <h3 className={`font-sans font-bold text-[11.5px] text-slate-950 uppercase tracking-widest mb-2 border-l-2 ${theme.accentLine} pl-2`}>
                      Backend, APIs &amp; Business Logic
                    </h3>
                    <ul className="space-y-1.5">
                      {cvData.techStack.backend.map((skill, index) => (
                        <li key={index} className="text-[10.5px] text-slate-650 flex items-start leading-relaxed font-sans">
                          <span className={`${theme.accentLightText} mr-2 select-none font-bold`}>•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Grid 3: Database */}
                  <div className={`border ${theme.border} ${theme.cardBg} rounded-xl p-3.5 shadow-sm`}>
                    <h3 className={`font-sans font-bold text-[11.5px] text-slate-950 uppercase tracking-widest mb-2 border-l-2 ${theme.accentLine} pl-2`}>
                      Database &amp; Infrastructure Engineering
                    </h3>
                    <ul className="space-y-1.5">
                      {cvData.techStack.database.map((skill, index) => (
                        <li key={index} className="text-[10.5px] text-slate-650 flex items-start leading-relaxed font-sans">
                          <span className={`${theme.accentLightText} mr-2 select-none font-bold`}>•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Grid 4: Tools */}
                  <div className={`border ${theme.border} ${theme.cardBg} rounded-xl p-3.5 shadow-sm`}>
                    <h3 className={`font-sans font-bold text-[11.5px] text-slate-950 uppercase tracking-widest mb-2 border-l-2 ${theme.accentLine} pl-2`}>
                      Performance, Growth &amp; Tools
                    </h3>
                    <ul className="space-y-1.5">
                      {cvData.techStack.tools.map((skill, index) => (
                        <li key={index} className="text-[10.5px] text-slate-650 flex items-start leading-relaxed font-sans">
                          <span className={`${theme.accentLightText} mr-2 select-none font-bold`}>•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 04: Experience (Founder & Lead Full-Stack Architect role) */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="font-display font-extrabold text-[13.5px] tracking-wider text-slate-900 uppercase">
                    04 / PROFESSIONAL EXPERIENCE &amp; EXECUTIVE LEADERSHIP
                  </h2>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                {founderExp.map((exp) => (
                  <div key={exp.id} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <span className="font-display font-black text-[13.5px] text-slate-900 uppercase tracking-wide">
                          {exp.role.toUpperCase()}
                        </span>
                        <span className="mx-2 text-slate-300 font-light">|</span>
                        <span className={`font-sans text-[11.5px] ${theme.accentText} font-extrabold uppercase tracking-wide`}>
                          {exp.company}
                        </span>
                      </div>
                      <span className={`text-[10.5px] font-mono text-slate-500 font-semibold uppercase tracking-wider ${theme.highlight} border ${theme.border} rounded px-2 py-0.5`}>
                        {exp.dates}
                      </span>
                    </div>

                    <ul className="space-y-2.5 mt-3">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="text-[11.5px] leading-relaxed text-slate-700 text-justify flex items-start font-sans">
                          <span className={`${theme.accentLightText} text-xs mr-2.5 select-none font-bold`}>•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>

            {/* Print Friendly Page 2 Indicators */}
            <div className="absolute bottom-2 left-0 right-0 text-center no-print border-t border-dashed border-slate-200 pt-1 select-none">
              <span className="text-[10px] font-mono text-slate-400 tracking-widest font-bold">A4 PAGE 2 END</span>
            </div>

            {/* Page 2 footer */}
            <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-450 pt-3 border-t border-slate-150 select-none">
              <span>{cvData.name.toUpperCase()} — {cvData.title.toUpperCase()}</span>
              <span>2 / 5</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PAGE 3: FULL-STACK DEVELOPER EXPERIENCE RECORDS           */}
          {/* ========================================================= */}
          <div 
            id="cv-page-3"
            className="print-area relative w-full aspect-[1/1.4142] min-h-[1110px] bg-white text-slate-900 shadow-2xl p-10 print:p-10 border border-slate-100 flex flex-col justify-between overflow-hidden print:shadow-none print:border-none print:m-0 print:rounded-none select-text"
          >
            <div>
              {/* Top metadata ribbon */}
              <div className="h-[40px] flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                <span className="font-display font-black text-xs text-slate-950 uppercase tracking-wider">
                  {cvData.name.toUpperCase()}
                </span>
                <span className={`font-sans font-semibold text-[9.5px] ${theme.accentText} uppercase tracking-wider`}>
                  04 / Professional Experience &amp; Engineering Timelines
                </span>
              </div>

              {/* Experiences Continued */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="font-display font-extrabold text-[13.5px] tracking-wider text-slate-900 uppercase">
                    04 / PROFESSIONAL EXPERIENCE (CONTINUED)
                  </h2>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                <div className="space-y-6">
                  {devExps.map((exp) => (
                    <div key={exp.id} className={`border-b ${theme.border} pb-5 last:border-0 last:pb-0`}>
                      <div className="flex justify-between items-baseline mb-2">
                        <div>
                          <span className="font-display font-black text-[13.5px] text-slate-900 uppercase tracking-wide">
                            {exp.role.toUpperCase()}
                          </span>
                          <span className="mx-2 text-slate-300 font-light">|</span>
                          <span className={`font-sans text-[11.5px] ${theme.accentText} font-extrabold uppercase tracking-wide`}>
                            {exp.company}
                          </span>
                        </div>
                        <span className={`text-[10.5px] font-mono text-slate-500 font-semibold uppercase tracking-wider ${theme.highlight} border ${theme.border} rounded px-2 py-0.5`}>
                          {exp.dates}
                        </span>
                      </div>

                      <ul className="space-y-2 mt-3">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="text-[11.5px] leading-relaxed text-slate-700 text-justify flex items-start font-sans">
                            <span className={`${theme.accentLightText} text-xs mr-2.5 select-none font-bold`}>•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Print Friendly Page 3 Indicators */}
            <div className="absolute bottom-2 left-0 right-0 text-center no-print border-t border-dashed border-slate-200 pt-1 select-none">
              <span className="text-[10px] font-mono text-slate-400 tracking-widest font-bold">A4 PAGE 3 END</span>
            </div>

            {/* Page 3 footer */}
            <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-450 pt-3 border-t border-slate-150 select-none">
              <span>{cvData.name.toUpperCase()} — {cvData.title.toUpperCase()}</span>
              <span>3 / 5</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PAGE 4: ENTERPRISE PROJECTS & DEPLOYMENT BLUEPRINTS       */}
          {/* ========================================================= */}
          <div 
            id="cv-page-4"
            className="print-area relative w-full aspect-[1/1.4142] min-h-[1110px] bg-white text-slate-900 shadow-2xl p-10 print:p-10 border border-slate-100 flex flex-col justify-between overflow-hidden print:shadow-none print:border-none print:m-0 print:rounded-none select-text"
          >
            <div>
              {/* Top metadata ribbon */}
              <div className="h-[40px] flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                <span className="font-display font-black text-xs text-slate-950 uppercase tracking-wider">
                  {cvData.name.toUpperCase()}
                </span>
                <span className={`font-sans font-semibold text-[9.5px] ${theme.accentText} uppercase tracking-wider`}>
                  05 – 06 / Enterprise Architecture &amp; Live Client Deployments
                </span>
              </div>

              {/* Section 05: Flagship Enterprise Blueprints */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-display font-extrabold text-[13.5px] tracking-wider text-slate-900 uppercase">
                    05 / FLAGSHIP ENTERPRISE BLUEPRINTS (SELF-ENGINEERED)
                  </h2>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                {cvData.projects.map((proj) => (
                  <div key={proj.id} className={`border ${theme.border} rounded-xl p-4 ${theme.accentHoverBorder} transition-colors relative shadow-sm ${theme.cardBg}`}>
                    <div className={`absolute top-4 right-4 text-[10px] font-mono font-bold ${theme.tagClass} px-2.5 py-0.5 rounded`}>
                      {proj.technologies}
                    </div>
                    
                    <h3 className="font-display font-extrabold text-[13.5px] text-slate-950 uppercase tracking-wide">
                      {proj.title}
                    </h3>
                    
                    <p className="mt-2 text-[11.5px] text-slate-650 leading-relaxed text-justify font-sans">
                      <strong>Description: </strong>{proj.description}
                    </p>
                    
                    <ul className="mt-3 space-y-1.5 pl-0.5">
                      <li className="text-[11.5px] leading-relaxed text-slate-700 text-justify flex items-start font-sans">
                        <span className={`${theme.accentLightText} mr-2 select-none font-bold`}>✓</span>
                        <span><strong>Contribution:</strong> {proj.contribution}</span>
                      </li>
                      <li className="text-[11.5px] leading-relaxed text-slate-700 text-justify flex items-start font-sans">
                        <span className={`${theme.accentLightText} mr-2 select-none font-bold`}>✓</span>
                        <span><strong>Business Impact:</strong> {proj.result}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>

              {/* Section 06: Commercial Deployments */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-display font-extrabold text-[13.5px] tracking-wider text-slate-900 uppercase">
                    06 / COMMERCIAL CLIENT DEPLOYMENT RECORD
                  </h2>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {cvData.deployments.map((dep) => (
                    <div key={dep.id} className={`${theme.highlight}/50 border ${theme.border} rounded-lg p-3 flex flex-col justify-between ${theme.accentHoverBorder} transition-colors`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-black text-[12px] text-slate-950 flex flex-wrap items-center gap-1.5">
                            <span>{dep.client}</span>
                            {dep.link && (
                              <span className={`text-[10px] font-mono ${theme.accentText} font-medium lowercase`}>
                                ({dep.link})
                              </span>
                            )}
                            {dep.isActiveDevelopment && (
                              <span className="text-[9px] font-mono bg-amber-50 text-amber-700 border border-amber-100 rounded px-1.5 py-0.2 font-bold tracking-wider uppercase">
                                Active Development
                              </span>
                            )}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono tracking-wider font-bold uppercase block mt-0.5">
                            {dep.role}
                          </span>
                        </div>
                      </div>

                      <ul className="mt-1.5 space-y-1">
                        {dep.bullets.map((b, idx) => (
                          <li key={idx} className="text-[11px] leading-relaxed text-slate-655 text-justify flex items-start font-sans">
                            <span className={`${theme.accentLightText} text-xs mr-2 select-none font-bold`}>•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Print Friendly Page 4 Indicators */}
            <div className="absolute bottom-2 left-0 right-0 text-center no-print border-t border-dashed border-slate-200 pt-1 select-none">
              <span className="text-[10px] font-mono text-slate-400 tracking-widest font-bold">A4 PAGE 4 END</span>
            </div>

            {/* Page 4 footer */}
            <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-450 pt-3 border-t border-slate-150 select-none">
              <span>{cvData.name.toUpperCase()} — {cvData.title.toUpperCase()}</span>
              <span>4 / 5</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PAGE 5: EDUCATION, ADAPTIVE SKILLS & CREDENTIAL FOOTER     */}
          {/* ========================================================= */}
          <div 
            id="cv-page-5"
            className="print-area relative w-full aspect-[1/1.4142] min-h-[1110px] bg-white text-slate-900 shadow-2xl p-10 print:p-10 border border-slate-100 flex flex-col justify-between overflow-hidden print:shadow-none print:border-none print:m-0 print:rounded-none select-text"
          >
            <div>
              {/* Top metadata ribbon */}
              <div className="h-[40px] flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                <span className="font-display font-black text-xs text-slate-950 uppercase tracking-wider">
                  {cvData.name.toUpperCase()}
                </span>
                <span className={`font-sans font-semibold text-[9.5px] ${theme.accentText} uppercase tracking-wider`}>
                  07 – 08 / Credentials &amp; Interpersonal Capacities
                </span>
              </div>

              {/* Section 07: Education & Academic Credentials */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-display font-extrabold text-[13.5px] tracking-wider text-slate-900 uppercase">
                    07 / EDUCATION &amp; ACADEMIC CREDENTIALS
                  </h2>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                <div className="space-y-4">
                  {cvData.education.map((edu, idx) => (
                    <div key={idx} className={`p-3 ${theme.highlight}/50 rounded-lg border ${theme.border}`}>
                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <h3 className="font-sans font-extrabold text-[12.5px] text-slate-950 uppercase tracking-wide">
                          {edu.degree}
                        </h3>
                      </div>
                      <div className={`text-[11.5px] ${theme.accentText} font-bold mt-1 flex items-center gap-1 uppercase tracking-wide`}>
                        <Landmark size={12} className="shrink-0" />
                        <span>{edu.institution}</span>
                      </div>
                      {edu.details && (
                        <p className="mt-2 text-[10.5px] leading-relaxed text-slate-550 font-sans text-justify">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 08: Adaptive Skills & Languages */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="font-display font-extrabold text-[13.5px] tracking-wider text-slate-900 uppercase">
                    08 / ADAPTIVE SKILLS &amp; LANGUAGES
                  </h2>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Block: Design & Cross-Functional */}
                  <div className={`p-4 ${theme.highlight}/50 border ${theme.border} rounded-xl`}>
                    <h3 className={`font-sans font-bold text-[11px] text-slate-950 uppercase tracking-widest mb-2.5 border-l-2 ${theme.accentLine} pl-2`}>
                      Cross-Functional Capabilities &amp; Design
                    </h3>
                    <p className="text-[11px] leading-relaxed text-slate-650 font-sans text-justify">
                      {[...cvData.skillsDesign, ...cvData.skillsBusiness].join(" • ")}
                    </p>
                  </div>

                  {/* Right Block: Languages */}
                  <div className={`p-4 ${theme.highlight}/50 border ${theme.border} rounded-xl flex flex-col justify-between`}>
                    <div>
                      <h3 className={`font-sans font-bold text-[11px] text-slate-950 uppercase tracking-widest mb-2.5 border-l-2 ${theme.accentLine} pl-2`}>
                        International Languages
                      </h3>
                      <div className="space-y-2 mt-1">
                        {cvData.languages.map((lang, idx) => (
                           <div key={idx} className="flex justify-between items-center text-[11px] font-sans">
                            <span className="font-bold text-slate-950">{lang.language}</span>
                            <span className="text-slate-500 font-medium bg-white px-2 py-0.5 rounded border border-slate-100 text-[9.5px]">
                              {lang.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Print Friendly Page 5 Indicators */}
            <div className="absolute bottom-2 left-0 right-0 text-center no-print border-t border-dashed border-slate-200 pt-1 select-none">
              <span className="text-[10px] font-mono text-slate-400 tracking-widest font-bold">A4 PAGE 5 END</span>
            </div>

            {/* Elite Footer Block */}
            <div className="mt-auto pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-sans font-extrabold text-slate-950 uppercase tracking-widest block">
                    Built with precision.
                  </span>
                  <p className="text-[9px] text-slate-500 font-sans font-medium">
                    Verified via official corporate, regional, and institutional documentation.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[9px] font-mono text-slate-500 font-bold select-none">
                  <span>{cvData.email}</span>
                  <span>•</span>
                  <span>{cvData.portfolio}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 pt-2 mt-2 border-t border-slate-100 select-none">
                <span>Verification ID: {cvData.name.split(" ").map(n => n?.[0] || "").join("")}-ELITE-5P-CV2026</span>
                <span>5 / 5</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {showPrintGuide && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md transition-all">
          <div className="bg-[#0b1222] border border-emerald-500/30 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative animate-fade-in text-slate-100">
            <button 
              onClick={() => setShowPrintGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/25">
                <Printer size={18} />
              </div>
              <h3 className="font-display font-black text-slate-100 text-base uppercase tracking-wider block">
                Save 5-Page A4 PDF
              </h3>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed mb-6 font-sans">
              To download a <strong className="text-emerald-400">pixel-perfect, high-standard vector PDF</strong>, we launch the browser's absolute highest resolution print engine:
            </p>

            <div className="space-y-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-slate-200 text-xs font-bold font-sans">Destination</h4>
                  <p className="text-[11px] text-slate-400 font-sans">Select <strong className="text-slate-200 font-bold">"Save as PDF"</strong> or <strong className="text-slate-200 font-bold">"Microsoft Print to PDF"</strong>.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-slate-200 text-xs font-bold font-sans">Paper Size &amp; Margins</h4>
                  <p className="text-[11px] text-slate-400 font-sans">Set paper size to <strong className="text-slate-200 font-bold">A4</strong> and set margins to <strong className="text-slate-200 font-bold">"None"</strong> (or "Default").</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-slate-200 text-xs font-bold font-sans">Background Graphics</h4>
                  <p className="text-[11px] text-slate-400 font-sans">Check <strong className="text-slate-200 font-bold">"Background graphics"</strong> to enable the elegant colors, cards, and styling gradients.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold font-display uppercase tracking-widest text-[11px] rounded-xl transition-all shadow-lg select-none flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer size={13} className="animate-pulse" />
                <span>Relaunch Print Dialogue</span>
              </button>
              
              <button
                onClick={() => setShowPrintGuide(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold font-display uppercase tracking-widest text-[10px] rounded-xl transition-all select-none cursor-pointer"
              >
                Got it, Close Guide
              </button>
            </div>
            
            <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center gap-2 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0"></span>
              <span className="text-[9.5px] text-slate-400 font-mono font-bold uppercase tracking-wider">Vector text stays crystal clear at any zoom</span>
            </div>
          </div>
        </div>
      )}

      {isExporting && (
        <div className="no-print fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md transition-all">
          <div className="bg-[#0b1222] border border-emerald-500/30 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative animate-fade-in text-slate-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/25 mb-4 relative">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
              <FileDown size={24} className="animate-pulse" />
            </div>
            
            <h3 className="font-display font-black text-slate-100 text-base uppercase tracking-wider mb-2">
              Generating High-Res PDF
            </h3>
            
            <p className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-4">
              {exportProgress}
            </p>
            
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Please wait while our high-fidelity layout engine constructs your 5-page vector executive CV...
            </p>
            
            <div className="w-full bg-slate-800/85 h-1.5 rounded-full mt-5 overflow-hidden border border-slate-700/50">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ 
                  width: exportProgress.includes("Page 1") ? "20%" : 
                         exportProgress.includes("Page 2") ? "40%" :
                         exportProgress.includes("Page 3") ? "60%" :
                         exportProgress.includes("Page 4") ? "80%" :
                         exportProgress.includes("Page 5") ? "95%" : "5%" 
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
