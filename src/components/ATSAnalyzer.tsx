import React, { useState } from "react";
import { ATSAnalysisResult, CVData } from "../types";
import { Sparkles, Loader2, Play, Check, AlertCircle } from "lucide-react";

interface ATSAnalyzerProps {
  cvData: CVData;
  onUpdateCV: (data: CVData) => void;
}

export default function ATSAnalyzer({ cvData, onUpdateCV }: ATSAnalyzerProps) {
  const [targetRole, setTargetRole] = useState("Full Stack Web Developer");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ATSAnalysisResult | null>(null);
  const [appliedIndices, setAppliedIndices] = useState<Record<number, boolean>>({});

  // Preset job descriptions matching the "Elite Layout Strategy"
  const PRESETS = [
    {
      title: "Senior Full Stack Dev (Laravel / React)",
      role: "Senior Full Stack Developer",
      desc: "Seeking a senior engineer to deploy corporate web applications. Need advanced mastery in PHP and Laravel web frameworks, MySQL indexing & database query optimization, REST APIs, and responsive design with Tailwind CSS and React.js. Responsibilities include building multi-tenant databases, reducing web-page load times, and designing lightweight client-side dashboards to automate admin workflows.",
    },
    {
      title: "Front-End UI Engineer (React / Vue)",
      role: "Front-End Developer",
      desc: "Looking for a creative UI developer with solid experience in HTML5, CSS3, ES6+ Javascript, React, and Vue.js. Experience using Chrome Developer Tools for memory leak analysis and rendering optimization is highly valued. Passion for modular UI/UX design, Figma mockup translations, fast page performance, and smooth animation flows.",
    },
    {
      title: "Technical Founder & Lead Architect",
      role: "Technical Founder & Principal Architect",
      desc: "High-scale engineering role. Establish full-stack systems engineering practices. Build scalable backend REST interfaces, manage multi-server cloud deployment pipelines, design database schemas, optimize caching, acquire clients through solid business strategy, and translate software architectures into tangible business conversion metrics.",
    }
  ];

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setTargetRole(preset.role);
    setJobDescription(preset.desc);
    setResult(null);
    setAppliedIndices({});
    setError(null);
  };

  const runAnalysis = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a corporate description or click on one of the custom presets below.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setAppliedIndices({});

    try {
      const response = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          targetRole,
          cvData: {
            name: cvData.name,
            title: cvData.title,
            summary: cvData.summary,
            skills: [
              ...cvData.techStack.frontend,
              ...cvData.techStack.backend,
              ...cvData.techStack.database,
              ...cvData.techStack.tools
            ],
            experience: cvData.experience.map(e => ({
              role: e.role,
              company: e.company,
              bullets: e.bullets
            })),
            projects: cvData.projects.map(p => ({
              title: p.title,
              description: p.description
            }))
          },
        }),
      });

      if (!response.ok) {
        throw new Error("CV Evaluation failed. Please make sure your GEMINI_API_KEY secret is defined and valid.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected parser connection failure has occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTailoredBullet = (bullet: typeof result["tailoredBullets"][0], index: number) => {
    const updatedCV = { ...cvData };
    const sectionNormalized = bullet.section.toLowerCase();

    if (sectionNormalized.includes("summary") || sectionNormalized.includes("executive")) {
      updatedCV.summary = bullet.replacement;
    } else if (sectionNormalized.includes("experience") || sectionNormalized.includes("role") || sectionNormalized.includes("developer")) {
      if (updatedCV.experience.length > 0 && updatedCV.experience[0].bullets.length > 0) {
        // Try to replace a matching bullet OR default to the first one
        const bIdx = updatedCV.experience[0].bullets.findIndex(
          b => b.trim().slice(0, 15).toLowerCase() === bullet.original.trim().slice(0, 15).toLowerCase()
        );
        if (bIdx !== -1) {
          updatedCV.experience[0].bullets[bIdx] = bullet.replacement;
        } else {
          updatedCV.experience[0].bullets[0] = bullet.replacement;
        }
      }
    } else if (sectionNormalized.includes("project") || sectionNormalized.includes("plantnest")) {
      // Try to replace first project description
      if (updatedCV.projects.length > 0) {
        updatedCV.projects[0].description = bullet.replacement;
      }
    } else if (sectionNormalized.includes("skills") || sectionNormalized.includes("tech")) {
      // Parse as comma list and append to tools
      const tags = bullet.replacement.split(",").map(t => t.trim()).filter(Boolean);
      updatedCV.techStack.tools = Array.from(new Set([...updatedCV.techStack.tools, ...tags]));
    }

    onUpdateCV(updatedCV);
    setAppliedIndices({ ...appliedIndices, [index]: true });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header element */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <Sparkles className="text-emerald-400" size={16} />
          <h2 className="font-display font-medium text-xs tracking-wider text-slate-200 uppercase">
            AI-Engineered ATS Optimizer
          </h2>
        </div>
        <span className="text-[9px] bg-emerald-950 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded border border-emerald-900/60 uppercase">
          AI Evaluator
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* JD Assessment parameters */}
        <div className="space-y-3">
          <div>
            <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-wider mb-1">
              Target Corporate Role Name
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Full Stack Web Developer, Laravel Architect"
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-200 p-2 rounded text-xs focus:outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-wider mb-1">
              Target Opportunity Description / Responsibilities
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the corporate description or key responsibilities of the role you want to optimize for..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-slate-350 p-2.5 rounded text-xs focus:outline-none font-sans leading-relaxed text-justify"
            />
          </div>

          {/* Inline opportunities recommendations */}
          <div className="space-y-1 select-none">
            <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest pl-0.5">
              Select Preset Target Opportunities
            </span>
            <div className="flex flex-col gap-1.5">
              {PRESETS.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => applyPreset(preset)}
                  className="p-2 bg-slate-950/60 hover:bg-slate-950 text-slate-300 text-[10px] font-medium rounded border border-slate-850 hover:border-slate-700 transition-all text-left cursor-pointer"
                >
                  🎯 <span className="font-bold text-slate-200">{preset.title}</span> – <span className="text-slate-400 font-mono text-[9px]">Match credentials</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trigger button */}
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-2.5 rounded-lg shadow-lg hover:shadow-emerald-950/25 text-xs tracking-wider uppercase transition-all cursor-pointer mt-4"
          >
            {loading ? (
              <>
                <Loader2 size={12} className="animate-spin text-white" />
                <span>Running Machine Compatibility Check...</span>
              </>
            ) : (
              <>
                <Play size={10} fill="currentColor" />
                <span>Initiate Alignment Engine</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-950/20 border border-red-900/40 p-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-red-450 shrink-0 mt-0.5 text-red-400" size={13} />
            <div className="text-xs text-red-200 font-medium leading-relaxed">
              {error}
            </div>
          </div>
        )}

        {/* Evaluation Output Diagnostics */}
        {result && (
          <div className="border-t border-slate-850 pt-4 space-y-4">
            
            {/* Score Ring Widget */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0 select-none">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke={result.score >= 80 ? "#10b981" : result.score >= 60 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - result.score / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-display font-black text-slate-100">{result.score}%</span>
                  <span className="text-[8px] font-mono font-bold text-slate-450 uppercase tracking-widest -mt-1">
                    ATS FLOW
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-1 text-center sm:text-left text-justify">
                <div className="text-xs font-bold text-slate-350 uppercase tracking-wider">
                  Alignment Evaluation Result
                </div>
                <p className="text-[10px] text-slate-400 leading-normal font-sans">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Keyword mismatches list */}
            <div className="space-y-1">
              <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest pl-0.5">
                Keywords Missing from Current View Model
              </span>
              <div className="flex flex-wrap gap-1">
                {result.missingKeywords.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-red-950/15 border border-red-500/10 text-red-400 font-mono text-[9px] rounded"
                  >
                    ⚠ {tag}
                  </span>
                ))}
                {result.missingKeywords.length === 0 && (
                  <span className="text-[11px] text-emerald-400 font-bold font-mono py-1">
                    ✓ Profile covers all required keywords!
                  </span>
                )}
              </div>
            </div>

            {/* Format flags */}
            {result.redFlags && result.redFlags.length > 0 && (
              <div className="bg-amber-950/10 border border-amber-500/10 p-3 rounded-lg">
                <h4 className="text-[8px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1.5">
                  Corporate Screening Flags
                </h4>
                <ul className="space-y-1 text-[10px] text-amber-200">
                  {result.redFlags.map((flag, i) => (
                    <li key={i} className="flex gap-1.5 items-start font-medium text-justify">
                      <span className="text-amber-500 shrink-0">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tailored Upgrades 1-Click integration */}
            <div className="space-y-2">
              <span className="block text-[8px] font-mono text-slate-550 uppercase tracking-widest pl-0.5">
                Tailored 1-Click Upgrade Options
              </span>

              <div className="space-y-2.5">
                {result.tailoredBullets.map((bullet, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2 text-justify">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded uppercase">
                        Section: {bullet.section}
                      </span>
                      <button
                        onClick={() => handleApplyTailoredBullet(bullet, idx)}
                        disabled={appliedIndices[idx]}
                        className={`flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                          appliedIndices[idx]
                            ? "bg-slate-850 text-emerald-400 border border-emerald-950/40"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
                        }`}
                      >
                        {appliedIndices[idx] ? (
                          <>
                            <Check size={9} />
                            <span>Aligned ✓</span>
                          </>
                        ) : (
                          <>
                            <Check size={9} />
                            <span>Apply Upgrade</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[10px] leading-relaxed">
                      <div className="text-slate-500 line-through">
                        <strong>Draft:</strong> "{bullet.original}"
                      </div>
                      <div className="text-emerald-350 font-medium mt-1">
                        <strong>Optimized:</strong> "{bullet.replacement}"
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-450 bg-slate-900/60 p-1.5 rounded italic leading-normal">
                      <strong>Impact Logic:</strong> {bullet.impactExplanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation insights */}
            {result.interviewPrep && result.interviewPrep.length > 0 && (
              <div className="bg-emerald-950/15 border border-emerald-500/10 p-3 rounded-lg">
                <h4 className="text-[8px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1.5">
                  Strategic Interview Talking Points
                </h4>
                <ul className="space-y-1.5 text-[10px] text-emerald-200">
                  {result.interviewPrep.map((tip, i) => (
                    <li key={i} className="flex gap-1.5 items-start text-justify">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="no-print bg-slate-950 p-3 border-t border-slate-850 text-center select-none">
        <p className="text-[9px] text-slate-500 font-medium">To test, paste details from real jobs or select a preset target opportunity.</p>
      </div>
    </div>
  );
}
