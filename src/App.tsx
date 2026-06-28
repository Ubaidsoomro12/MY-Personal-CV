import React, { useState } from "react";
import { initialCVData } from "./initialData";
import { CVData, ThemeStyle } from "./types";
import CVPreview from "./components/CVPreview";
import { Sparkles, Printer } from "lucide-react";

export default function App() {
  const [cvData] = useState<CVData>(initialCVData);
  const activeTheme: ThemeStyle = "tech-emerald";

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Main Workspace Frame */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-start min-h-0">
        <div className="w-full h-full">
          <CVPreview cvData={cvData} activeTheme={activeTheme} />
        </div>
      </main>

      {/* Interactive Footer - Hidden on native print */}
      <footer className="no-print bg-[#05080e]/60 border-t border-slate-800/40 py-4 px-4 text-center mt-auto">
        <p className="text-xs text-slate-450 font-sans tracking-wide">
          Designed with elite executive design guidelines. Optimized for 100% human-verified readability &amp; machine parser compatibility.
        </p>
      </footer>
    </div>
  );
}

