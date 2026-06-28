import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialize Gemini client or handle missing key gracefully
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("Missing GEMINI_API_KEY environment variable. Please configure it in your Secrets panel.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint to analyze CV against Job Description
app.post("/api/analyze-cv", async (req, res) => {
  try {
    const { jobDescription, targetRole, cvData } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are an elite silicon valley recruiter, ATS algorithms expert, and technical career coach. 
Your goal is to evaluate the CV of Ali Hassan Chand (Technical Founder, Full-Stack Architect, Business Development Specialist) against any provided Job Description.

Analyze how well his profile matches the Job Description, compute a realistic ATS score, extract critical missing keywords, identify structural gaps/red flags, rewrite or provide high-impact tailored bullet points based on his experience, and provide 3 interview talking points.

Ali Hassan Chand's core stack & value proposition:
- Technical Founder, Full-Stack Software Architect, Business Development Specialist.
- Core Stack: Laravel, React, Vue, PHP, MySQL, Tailwind CSS, Chrome DevTools, AWS/Cloud Deployments, REST APIs, Hosting/Server management, Web Gaming.
- Focus: Reducing overhead, accelerating speeds, increasing conversions, database optimization.

Return the response in strict JSON matching the requested schema.`;

    const userPrompt = `
Job Description / Role Information:
Target Role: ${targetRole || "Full-Stack Software Engineer / Dev Lead"}
Content:
${jobDescription}

Candidate Current Custom CV Content:
Name: ${cvData?.name || "Ali Hassan Chand"}
Title: ${cvData?.title || "Technical Founder & Full-Stack Architect"}
Executive Summary: ${cvData?.summary || ""}
Skills: ${JSON.stringify(cvData?.skills || {})}
Experience Highlights: ${JSON.stringify(cvData?.experience || [])}
Projects: ${JSON.stringify(cvData?.projects || [])}

Perform deep ATS compatibility scoring and produce practical, conversion-optimized recommendations.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Realistic ATS compatibility score from 0 to 100",
            },
            summary: {
              type: Type.STRING,
              description: "A professional analysis (3-4 sentences) summarizing his alignment with the JD and why his stack matches or lacks specific credentials.",
            },
            missingKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 4-8 critical tools, competencies, or keywords mentioned in the description that he should highlight.",
            },
            redFlags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Formatting, skills gaps, or phrasing red flags for this specific job application.",
            },
            tailoredBullets: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: {
                    type: Type.STRING,
                    description: "The CV section target, e.g. 'Executive Summary', 'Founder Experience', 'Full-Stack Engineer Experience', or 'Skills'",
                  },
                  original: {
                    type: Type.STRING,
                    description: "A bullet point or sentence from Ali's current profile that could be improved.",
                  },
                  replacement: {
                    type: Type.STRING,
                    description: "An optimized, metrics-driven replacement bullet point custom tailored for the job.",
                  },
                  impactExplanation: {
                    type: Type.STRING,
                    description: "Highlighting which keyword was injected and why this converts better.",
                  },
                },
              },
              description: "3-4 direct actionable bullet point upgrades tailored specifically to align his experience to the target job description.",
            },
            interviewPrep: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 high-yield interview tips or talking points custom-crafted for Ali to stand out in front of technical directors.",
            },
          },
          required: ["score", "summary", "missingKeywords", "redFlags", "tailoredBullets", "interviewPrep"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error analyzing CV:", error);
    return res.status(500).json({
      error: error.message || "An unexpected error occurred during analysis.",
    });
  }
});

// Start server and handle Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
