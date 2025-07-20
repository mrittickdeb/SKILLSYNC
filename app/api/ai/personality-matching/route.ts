import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { candidateProfile, companyProfile, roleRequirements } = await request.json()

    // Simulate advanced AI personality matching
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const matching = {
      overallCompatibility: 89,
      personalityMatch: 87,
      workStyleAlignment: 92,
      valueAlignment: 85,
      communicationCompatibility: 91,

      personalityAnalysis: {
        candidate: {
          bigFive: {
            openness: 85,
            conscientiousness: 89,
            extraversion: 72,
            agreeableness: 78,
            neuroticism: 23,
          },
          workStyle: "Collaborative problem-solver",
          motivators: ["Learning", "Impact", "Autonomy", "Recognition"],
          stressors: ["Micromanagement", "Unclear expectations", "Isolation"],
          communicationStyle: "Direct but diplomatic",
          decisionMaking: "Data-driven with intuitive insights",
        },

        company: {
          culture: {
            innovation: 92,
            collaboration: 88,
            autonomy: 85,
            resultsOriented: 91,
            workLifeBalance: 78,
          },
          workEnvironment: "Fast-paced startup with flexible structure",
          teamDynamics: "Highly collaborative with flat hierarchy",
          communicationNorms: "Open, transparent, frequent feedback",
        },
      },

      compatibilityBreakdown: {
        workPaceAlignment: {
          score: 94,
          analysis: "Candidate thrives in fast-paced environments and enjoys startup energy",
        },

        autonomyMatch: {
          score: 91,
          analysis: "High alignment - both value independence and self-direction",
        },

        collaborationStyle: {
          score: 88,
          analysis: "Strong team player who contributes effectively to group efforts",
        },

        innovationMindset: {
          score: 92,
          analysis: "Excellent fit - candidate is creative and embraces new challenges",
        },

        feedbackReceptivity: {
          score: 85,
          analysis: "Open to feedback and uses it constructively for growth",
        },

        stressResilience: {
          score: 82,
          analysis: "Good ability to handle startup pressures and uncertainty",
        },
      },

      potentialChallenges: [
        {
          area: "Work-Life Balance",
          risk: "Medium",
          description: "Candidate values work-life balance more than typical startup pace allows",
          mitigation: "Discuss flexible hours and remote work options",
        },
        {
          area: "Structure Preference",
          risk: "Low",
          description: "Slight preference for more structure than startup provides",
          mitigation: "Provide clear goals and regular check-ins",
        },
      ],

      teamFitAnalysis: {
        existingTeam: [
          {
            member: "Sarah (CTO)",
            compatibility: 92,
            dynamics: "Excellent mentor-mentee potential",
          },
          {
            member: "Mike (Lead Dev)",
            compatibility: 87,
            dynamics: "Strong collaborative partnership",
          },
          {
            member: "Lisa (Designer)",
            compatibility: 89,
            dynamics: "Great cross-functional communication",
          },
        ],

        teamBalance: {
          personalityDiversity: 88,
          skillComplementarity: 91,
          communicationHarmony: 89,
          conflictResolution: 85,
        },
      },

      roleSpecificMatch: {
        leadershipPotential: 78,
        mentorshipCapability: 82,
        clientFacing: 75,
        technicalDepth: 89,
        projectManagement: 81,
      },

      longTermPotential: {
        growthTrajectory: "High - strong learning agility and ambition",
        retentionLikelihood: 87,
        promotionReadiness: 76,
        cultureCarrier: 89,
      },

      onboardingRecommendations: [
        "Pair with Sarah (CTO) for technical mentorship",
        "Provide clear project goals and success metrics",
        "Schedule regular feedback sessions (weekly initially)",
        "Introduce to team through collaborative project",
        "Discuss career growth path within first month",
      ],

      managementTips: [
        "Provide autonomy while maintaining clear expectations",
        "Recognize achievements publicly - high need for recognition",
        "Offer learning opportunities and skill development",
        "Be direct but supportive in feedback",
        "Involve in decision-making processes when appropriate",
      ],

      redFlags: [
        "May struggle with extremely ambiguous situations",
        "Could become disengaged without growth opportunities",
      ],

      greenFlags: [
        "Strong intrinsic motivation and self-direction",
        "Excellent problem-solving and analytical skills",
        "Natural collaborator who elevates team performance",
        "High emotional intelligence and communication skills",
        "Genuine passion for technology and innovation",
      ],

      culturalContribution: {
        diversityImpact: "Positive - brings different perspective and background",
        knowledgeSharing: "High - enjoys teaching and mentoring others",
        teamMorale: "Positive influence - optimistic and supportive",
        innovation: "Strong contributor to creative problem-solving",
      },

      finalRecommendation: {
        decision: "Strong Cultural Fit",
        confidence: 89,
        reasoning:
          "Candidate demonstrates excellent alignment with company values and team dynamics. Personality traits strongly support success in startup environment with minor considerations around work-life balance expectations.",
        riskLevel: "Low",
        successProbability: 87,
      },
    }

    return NextResponse.json(matching)
  } catch (error) {
    console.error("Error in personality matching:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
