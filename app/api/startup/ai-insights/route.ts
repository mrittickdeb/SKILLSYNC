import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("user-id")

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock AI insights specific to startups
    const insights = {
      recommendations: [
        "Post opportunities on Tuesday-Thursday for 23% more applications",
        "Your response time of 4.2h is good, but under 2h increases acceptance by 18%",
        "Consider offering remote work to access 40% more candidates",
        "Micro-gigs are trending - 67% faster to fill than internships",
        "Your company culture score attracts top-tier university students",
      ],
      predictedHireQuality: 8.7,
      marketCompetitiveness: 82,
      talentPoolScore: 94,
      hiringTrends: [
        { skill: "React", demand: 95, supply: 78, competition: "High" },
        { skill: "Python", demand: 89, supply: 85, competition: "Medium" },
        { skill: "UI/UX", demand: 92, supply: 65, competition: "Very High" },
      ],
      competitorAnalysis: {
        averageResponseTime: "6.3 hours",
        averageSalary: "$2,800/month",
        topPerks: ["Remote Work", "Learning Budget", "Flexible Hours"],
        yourAdvantage: "15% faster hiring, 12% higher satisfaction",
      },
      candidateInsights: {
        peakApplicationTimes: ["Tuesday 2-4 PM", "Wednesday 10-12 PM"],
        preferredCommunication: "Direct message > Email",
        topMotivators: ["Learning opportunities", "Mentorship", "Real impact"],
      },
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Error fetching AI insights:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
