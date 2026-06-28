import React from "react";
import { CVData } from "../types";
import { Plus, Trash2, Edit3, RotateCcw, Check, Briefcase, Award, GraduationCap, Languages, Sparkles } from "lucide-react";

interface CVEditorProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
  onReset: () => void;
}

export default function CVEditor({ cvData, onChange, onReset }: CVEditorProps) {
  const [activeTab, setActiveTab] = React.useState<"basic" | "skills" | "experience" | "deployments" | "education" | "achievements">("basic");

  // Helper field updater
  const updateField = (field: keyof CVData, value: any) => {
    onChange({
      ...cvData,
      [field]: value
    });
  };

  const handleTechStackChange = (key: keyof CVData["techStack"], value: string) => {
    onChange({
      ...cvData,
      techStack: {
        ...cvData.techStack,
        [key]: value.split(",").map(s => s.trim()).filter(Boolean)
      }
    });
  };

  const handleProjectChange = (idx: number, field: string, value: string) => {
    const updated = [...cvData.projects];
    updated[idx] = {
      ...updated[idx],
      [field]: value
    };
    updateField("projects", updated);
  };

  const handleExpChange = (idx: number, field: string, value: string) => {
    const updated = [...cvData.experience];
    updated[idx] = {
      ...updated[idx],
      [field]: value
    };
    updateField("experience", updated);
  };

  const handleExpBulletChange = (expIdx: number, bulletIdx: number, value: string) => {
    const updated = [...cvData.experience];
    updated[expIdx].bullets[bulletIdx] = value;
    updateField("experience", updated);
  };

  const addExpBullet = (expIdx: number) => {
    const updated = [...cvData.experience];
    updated[expIdx].bullets.push("New metric-driven performance action item detail...");
    updateField("experience", updated);
  };

  const removeExpBullet = (expIdx: number, bulletIdx: number) => {
    const updated = [...cvData.experience];
    updated[expIdx].bullets.splice(bulletIdx, 1);
    updateField("experience", updated);
  };

  // CLIENT DEPLOYMENTS HANDLERS
  const handleDeploymentChange = (idx: number, field: string, value: any) => {
    const updated = [...cvData.deployments];
    updated[idx] = {
      ...updated[idx],
      [field]: value
    };
    updateField("deployments", updated);
  };

  const handleDeploymentBulletChange = (depIdx: number, bulletIdx: number, value: string) => {
    const updated = [...cvData.deployments];
    updated[depIdx].bullets[bulletIdx] = value;
    updateField("deployments", updated);
  };

  const addDeploymentBullet = (depIdx: number) => {
    const updated = [...cvData.deployments];
    updated[depIdx].bullets.push("Engineered modern high-availability modules maximizing active user retention.");
    updateField("deployments", updated);
  };

  const removeDeploymentBullet = (depIdx: number, bulletIdx: number) => {
    const updated = [...cvData.deployments];
    updated[depIdx].bullets.splice(bulletIdx, 1);
    updateField("deployments", updated);
  };

  const addDeployment = () => {
    const newDep = {
      id: "dep_" + Date.now(),
      client: "New Commercial Client",
      link: "clientweb.com",
      role: "Lead Full-Stack Developer",
      bullets: ["Architected clean administrative panels and automated key transaction pipelines."]
    };
    updateField("deployments", [...cvData.deployments, newDep]);
  };

  const removeDeployment = (idx: number) => {
    const updated = [...cvData.deployments];
    updated.splice(idx, 1);
    updateField("deployments", updated);
  };

  // EDUCATION & SKILLS
  const handleEduChange = (idx: number, field: string, value: string) => {
    const updated = [...cvData.education];
    updated[idx] = {
      ...updated[idx],
      [field]: value
    };
    updateField("education", updated);
  };

  const handleDesignSkillsChange = (value: string) => {
    updateField("skillsDesign", value.split(",").map(s => s.trim()).filter(Boolean));
  };

  const handleBusinessSkillsChange = (value: string) => {
    updateField("skillsBusiness", value.split(",").map(s => s.trim()).filter(Boolean));
  };

  const handleAchievementChange = (idx: number, field: "title" | "description", value: string) => {
    const updated = [...cvData.coreAchievements];
    updated[idx] = {
      ...updated[idx],
      [field]: value
    };
    updateField("coreAchievements", updated);
  };

  const handleHonorChange = (idx: number, field: "title" | "description", value: string) => {
    const updated = [...(cvData.honors || [])];
    updated[idx] = {
      ...updated[idx],
      [field]: value
    };
    updateField("honors", updated);
  };

  const handleLanguageChange = (idx: number, field: "language" | "level", value: string) => {
    const updated = [...cvData.languages];
    updated[idx] = {
      ...updated[idx],
      [field]: value
    };
    updateField("languages", updated);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a101f] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Editor top card */}
      <div className="bg-[#060914] p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 className="text-emerald-400" size={16} />
          <h2 className="font-display font-medium text-xs tracking-wider text-slate-200 uppercase">
            CV Data Customizer
          </h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-red-400 hover:bg-slate-800/80 active:bg-slate-950 px-2 py-1 rounded transition-colors font-mono cursor-pointer border border-slate-800/50"
          title="Reset back to standard verified recruitment parameters"
        >
          <RotateCcw size={10} />
          <span>Reset Original</span>
        </button>
      </div>

      {/* Selector Tabs navigation */}
      <div className="bg-[#050810] p-1 flex border-b border-slate-850 gap-1 overflow-x-auto select-none">
        {(["basic", "skills", "experience", "deployments", "education", "achievements"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 px-3 rounded text-[10px] uppercase font-bold tracking-wider transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-slate-800 text-white shadow-inner"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Editor Inner fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* BASIC TAB */}
        {activeTab === "basic" && (
          <div className="space-y-3">
            <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
              EXECUTIVE CONTACTS &amp; SUMMARY
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Name</label>
                <input
                  type="text"
                  value={cvData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[9px] font-bold text-slate-440 uppercase tracking-wider mb-1">Professional Title</label>
                <input
                  type="text"
                  value={cvData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-440 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  value={cvData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-440 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="text"
                  value={cvData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-440 uppercase tracking-wider mb-1">Location</label>
                <input
                  type="text"
                  value={cvData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-440 uppercase tracking-wider mb-1">Portfolio (Link / Label)</label>
                <input
                  type="text"
                  value={cvData.portfolio}
                  onChange={(e) => updateField("portfolio", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-440 uppercase tracking-wider mb-1">
                Executive Profile Summary (Maximum 3 concise lines)
              </label>
              <textarea
                rows={4}
                value={cvData.summary}
                onChange={(e) => updateField("summary", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2.5 rounded text-xs focus:outline-none font-sans leading-relaxed"
              ></textarea>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === "skills" && (
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
              CORE METRIC COMPETENCIES &amp; SKILLS
            </h3>
            <p className="text-[10px] text-slate-550 italic font-semibold leading-normal -mt-1.5">
              Separate various listings using standard commas.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Frontend Frameworks</label>
                <textarea
                  rows={2}
                  value={cvData.techStack.frontend.join(", ")}
                  onChange={(e) => handleTechStackChange("frontend", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Backend, APIs &amp; Logic</label>
                <textarea
                  rows={2}
                  value={cvData.techStack.backend.join(", ")}
                  onChange={(e) => handleTechStackChange("backend", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Database &amp; Infrastructure</label>
                <textarea
                  rows={2}
                  value={cvData.techStack.database.join(", ")}
                  onChange={(e) => handleTechStackChange("database", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Performance &amp; Growth Tools</label>
                <textarea
                  rows={2}
                  value={cvData.techStack.tools.join(", ")}
                  onChange={(e) => handleTechStackChange("tools", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none font-mono"
                />
              </div>

              <div className="border-t border-slate-850 pt-3">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Visual Architecture Design Skills</label>
                <input
                  type="text"
                  value={cvData.skillsDesign.join(", ")}
                  onChange={(e) => handleDesignSkillsChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Commerce, Growth &amp; Training Skills</label>
                <input
                  type="text"
                  value={cvData.skillsBusiness.join(", ")}
                  onChange={(e) => handleBusinessSkillsChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-200 p-2 rounded text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === "experience" && (
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
              EXPERIENCE &amp; TECHNICAL BLUEPRINTS
            </h3>

            {/* Experience items */}
            {cvData.experience.map((exp, idx) => (
              <div key={exp.id} className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Role / Position</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleExpChange(idx, "role", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 p-1.5 rounded text-xs focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Enterprise Operations</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleExpChange(idx, "company", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 p-1.5 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Active Tenure Dates</label>
                    <input
                      type="text"
                      value={exp.dates}
                      onChange={(e) => handleExpChange(idx, "dates", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 p-1.5 rounded text-xs focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Technical Actions &amp; Achievements Bullets
                  </label>
                  
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-start">
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleExpBulletChange(idx, bIdx, e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-850 text-slate-300 p-1.5 rounded text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => removeExpBullet(idx, bIdx)}
                        className="p-1 px-2 bg-slate-900 border border-slate-800 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded cursor-pointer mt-1"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addExpBullet(idx)}
                    className="text-[10px] text-emerald-405 font-bold hover:underline py-1 block cursor-pointer text-left"
                  >
                    + Add Experience Detail Accent Bullet
                  </button>
                </div>
              </div>
            ))}

            <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-blue-500 pl-2 mt-6">
              FLAGSHIP ENTERPRISE BLUEPRINTS
            </h3>

            {cvData.projects.map((proj, idx) => (
              <div key={proj.id} className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Blueprint Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-200 font-bold focus:outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Technologies Stack</label>
                    <input
                      type="text"
                      value={proj.technologies}
                      onChange={(e) => handleProjectChange(idx, "technologies", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-emerald-400 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-bold text-slate-550 uppercase tracking-wider mb-0.5">Description</label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-bold text-slate-550 uppercase tracking-wider mb-0.5">Contribution Details</label>
                  <input
                    type="text"
                    value={proj.contribution}
                    onChange={(e) => handleProjectChange(idx, "contribution", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-350 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[8px] font-bold text-slate-550 uppercase tracking-wider mb-0.5">Business / Operational Impact Outcome</label>
                  <input
                    type="text"
                    value={proj.result}
                    onChange={(e) => handleProjectChange(idx, "result", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-blue-400 font-bold focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CLIENT DEPLOYMENTS TAB */}
        {activeTab === "deployments" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
                05 / CLIENT DEPLOYMENT RECORD
              </h3>
              <button
                onClick={addDeployment}
                className="flex items-center gap-1 text-[9px] bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-2 py-1 rounded transition-colors font-bold uppercase tracking-wider cursor-pointer"
              >
                <Plus size={10} />
                <span>Add Record</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-550 italic font-medium -mt-2 leading-tight">
              Manage Commercial deployments of active websites and applications.
            </p>

            {cvData.deployments.map((dep, idx) => (
              <div key={dep.id} className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg space-y-3 relative">
                <button
                  onClick={() => removeDeployment(idx)}
                  className="absolute top-3 right-3 p-1 px-2 bg-slate-900 border border-slate-800 hover:bg-red-950/20 text-red-400 hover:text-red-350 rounded cursor-pointer transition-colors"
                  title="Remove this Commercial Deployment slot"
                >
                  <Trash2 size={12} />
                </button>

                <div className="grid grid-cols-2 gap-2 pr-10">
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Client Brand Name</label>
                    <input
                      type="text"
                      value={dep.client}
                      onChange={(e) => handleDeploymentChange(idx, "client", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 p-1.5 rounded text-xs focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Live Url Link</label>
                    <input
                      type="text"
                      value={dep.link || ""}
                      onChange={(e) => handleDeploymentChange(idx, "link", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-350 p-1.5 rounded text-xs focus:outline-none font-mono"
                      placeholder="brandweb.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 items-center">
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Assigned Role</label>
                    <input
                      type="text"
                      value={dep.role}
                      onChange={(e) => handleDeploymentChange(idx, "role", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-305 p-1.5 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 self-end pb-2">
                    <input
                      type="checkbox"
                      id={`chk_${dep.id}`}
                      checked={!!dep.isActiveDevelopment}
                      onChange={(e) => handleDeploymentChange(idx, "isActiveDevelopment", e.target.checked)}
                      className="bg-slate-950 rounded border-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor={`chk_${dep.id}`} className="text-[10px] text-slate-300 font-semibold cursor-pointer select-none">
                      Active Development
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[8px] font-bold text-slate-450 uppercase tracking-wider">
                    Execution &amp; Optimization Deliverables Bullets
                  </label>
                  
                  {dep.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-start">
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleDeploymentBulletChange(idx, bIdx, e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-850 text-slate-300 p-1.5 rounded text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => removeDeploymentBullet(idx, bIdx)}
                        className="p-1 px-2 bg-slate-900 border border-slate-800 text-red-400 hover:bg-slate-800 rounded cursor-pointer mt-1"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addDeploymentBullet(idx)}
                    className="text-[10px] text-emerald-400 font-bold hover:underline py-1 block cursor-pointer"
                  >
                    + Append Deliverable Bullet
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION & RECOGNITION */}
        {activeTab === "education" && (
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-emerald-500 pl-2 text-justify">
              06 / EDUCATION &amp; ACADEMIC ADVANCEMENT
            </h3>

            {cvData.education.map((edu, idx) => (
              <div key={idx} className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg space-y-2">
                <span className="block text-[10px] font-mono text-emerald-400 font-bold">Academic Slot #{idx+1}</span>
                <div>
                  <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Degree Title</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEduChange(idx, "degree", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-205 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Institution / Authority</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEduChange(idx, "institution", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[8px] font-bold text-slate-550 uppercase tracking-wider mb-0.5">Modules / Details Focus</label>
                  <textarea
                    rows={2}
                    value={edu.details || ""}
                    onChange={(e) => handleEduChange(idx, "details", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-350 focus:outline-none font-sans"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACHIEVEMENTS & LANGUAGES */}
        {activeTab === "achievements" && (
          <div className="space-y-4">
            {cvData.honors && cvData.honors.length > 0 && (
              <>
                <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
                  02 / HONORS &amp; FLAGSHIP SYSTEM ACHIEVEMENTS
                </h3>

                <div className="space-y-3 mb-6">
                  {cvData.honors.map((h, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg space-y-2">
                      <span className="block text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wide">
                        Honor / Recognition Item #{idx+1}
                      </span>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Recognition Title</label>
                        <input
                          type="text"
                          value={h.title}
                          onChange={(e) => handleHonorChange(idx, "title", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-200 font-bold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Detailed Description</label>
                        <textarea
                          rows={2}
                          value={h.description}
                          onChange={(e) => handleHonorChange(idx, "description", e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-300 focus:outline-none font-sans"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-emerald-500 pl-2">
              08 / CORE ACHIEVEMENTS MATRICES
            </h3>

            <div className="space-y-3">
              {cvData.coreAchievements.map((ach, idx) => (
                <div key={idx} className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg space-y-2">
                  <span className="block text-[9px] font-mono font-bold text-blue-400 uppercase tracking-wide">
                    Achievement Item #{idx+1}
                  </span>
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Achievement Title</label>
                    <input
                      type="text"
                      value={ach.title}
                      onChange={(e) => handleAchievementChange(idx, "title", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-200 font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Detailed Summary Impact</label>
                    <textarea
                      rows={2}
                      value={ach.description}
                      onChange={(e) => handleAchievementChange(idx, "description", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-1.5 rounded text-xs text-slate-300 focus:outline-none font-sans"
                    />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-mono text-[10px] font-bold text-slate-450 uppercase tracking-widest border-l-2 border-emerald-500 pl-2 mt-6">
              09 / INTERNATIONAL LANGUAGES
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {cvData.languages.map((lang, idx) => (
                <div key={idx} className="p-3 bg-[#070b14] border border-slate-800 rounded-lg space-y-2 col-span-2 sm:col-span-1">
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Language</label>
                    <input
                      type="text"
                      value={lang.language}
                      onChange={(e) => handleLanguageChange(idx, "language", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-1 rounded text-xs text-slate-100 font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Certification Level</label>
                    <input
                      type="text"
                      value={lang.level}
                      onChange={(e) => handleLanguageChange(idx, "level", e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-1 rounded text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="no-print bg-[#050810] p-3 border-t border-slate-850 text-center select-none">
        <p className="text-[10px] text-slate-500 font-bold">Editable inputs update live, keeping printable spacing perfectly balanced.</p>
      </div>
    </div>
  );
}
