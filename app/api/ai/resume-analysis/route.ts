import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeText, targetRole } = body

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Mock AI resume analysis
    const analysis = {
      overallScore: 78,
      atsCompatibility: 85,
      readabilityScore: 92,
      keywordOptimization: 67,

      strengths: [
        "Strong technical skills section with relevant technologies",
        "Quantified achievements with specific metrics",
        "Clear project descriptions with impact statements",
        "Good use of action verbs and industry terminology",
      ],

      improvements: [
        "Add more keywords related to 'React' and 'TypeScript'",
        "Include soft skills like 'team collaboration' and 'problem-solving'",
        "Quantify more achievements with numbers and percentages",
        "Add a brief professional summary at the top",
      ],

      missingKeywords: [
        { keyword: "Agile", importance: "High", frequency: 89 },
        { keyword: "Git", importance: "High", frequency: 95 },
        { keyword: "API", importance: "Medium", frequency: 76 },
        { keyword: "Testing", importance: "Medium", frequency: 68 },
      ],

      skillsAnalysis: {
        technical: {
          score: 85,
          strengths: ["React", "JavaScript", "Node.js"],
          gaps: ["Docker", "AWS", "Testing frameworks"],
        },
        soft: {
          score: 65,
          strengths: ["Communication"],
          gaps: ["Leadership", "Project management", "Mentoring"],
        },
      },

      industryBenchmark: {
        averageScore: 72,
        topPercentile: 90,
        yourRanking: "Top 25%",
        improvementPotential: "+15 points possible",
      },

      optimizedSections: {
        summary:
          "Results-driven Computer Science student with 3+ years of experience in full-stack development using React, Node.js, and TypeScript. Proven track record of delivering scalable web applications with 99.9% uptime. Seeking to leverage strong problem-solving skills and passion for innovation in a dynamic startup environment.",

        skills: [
          "Frontend: React, TypeScript, HTML5, CSS3, Tailwind CSS",
          "Backend: Node.js, Express.js, Python, RESTful APIs",
          "Database: MongoDB, PostgreSQL, Redis",
          "Tools: Git, Docker, AWS, Agile/Scrum, Jest, CI/CD",
        ],
      },

      nextSteps: [
        "Add the suggested keywords naturally throughout your resume",
        "Include 2-3 more quantified achievements",
        "Create a compelling professional summary",
        "Optimize for ATS by using standard section headings",
      ],
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error in resume analysis:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
