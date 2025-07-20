import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { responses, userId } = body

    // Simulate advanced AI personality analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const personalityAnalysis = {
      bigFiveTraits: {
        openness: 78,
        conscientiousness: 85,
        extraversion: 62,
        agreeableness: 91,
        neuroticism: 23,
      },
      workStyle: {
        primary: "Collaborative Innovator",
        secondary: "Detail-Oriented Executor",
        teamRole: "Creative Problem Solver",
        communicationStyle: "Direct and Empathetic",
        decisionMaking: "Data-Driven with Intuition",
      },
      culturalFit: {
        startupSize: "Small to Medium (10-50 people)",
        workEnvironment: "Hybrid with flexibility",
        managementStyle: "Collaborative leadership",
        companyValues: ["Innovation", "Transparency", "Growth"],
      },
      careerMotivation: {
        primary: "Learning and Growth",
        secondary: "Making Impact",
        riskTolerance: "Medium-High",
        autonomyPreference: "High",
        stabilityImportance: "Medium",
      },
      compatibilityScores: {
        techStartup: 92,
        fintech: 87,
        healthtech: 89,
        edtech: 94,
        enterprise: 45,
      },
      recommendations: [
        "You thrive in collaborative environments with clear goals",
        "Consider startups that value innovation and continuous learning",
        "Your high agreeableness makes you excellent for customer-facing roles",
        "Look for companies with transparent communication and flat hierarchies",
      ],
      redFlags: [
        "Avoid highly bureaucratic organizations",
        "Be cautious of micromanagement environments",
        "Large corporations may not suit your innovation drive",
      ],
    }

    return NextResponse.json(personalityAnalysis)
  } catch (error) {
    console.error("Error in personality analysis:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
