import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userType, currentOffer, marketData, candidateProfile, companyProfile } = await request.json()

    // Simulate AI negotiation analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const assistance = {
      negotiationStrategy: userType === "student" ? "candidate" : "employer",
      marketPosition: "Strong",
      negotiationPower: 78,

      salaryAnalysis: {
        currentOffer: currentOffer || 85000,
        marketAverage: 92000,
        marketRange: {
          p25: 78000,
          p50: 92000,
          p75: 108000,
          p90: 125000,
        },
        positionVsMarket: "7% below market average",
        negotiationRoom: 15000,
        recommendedTarget: 98000,
      },

      equityAnalysis: {
        currentEquity: "0.15%",
        typicalRange: "0.1% - 0.5%",
        companyStage: "Series A",
        equityValue: {
          current: "$15,000",
          potential: "$150,000 - $500,000",
          riskLevel: "Medium-High",
        },
        recommendation: "Request 0.25% with vesting schedule",
      },

      negotiationPoints: [
        {
          category: "Salary",
          current: "$85,000",
          target: "$98,000",
          justification: "Market rate alignment and candidate's strong technical skills",
          priority: "High",
          likelihood: 85,
        },
        {
          category: "Equity",
          current: "0.15%",
          target: "0.25%",
          justification: "Early employee contribution and market standards",
          priority: "High",
          likelihood: 70,
        },
        {
          category: "Vacation Days",
          current: "15 days",
          target: "20 days",
          justification: "Work-life balance and industry standards",
          priority: "Medium",
          likelihood: 90,
        },
        {
          category: "Learning Budget",
          current: "$1,000",
          target: "$2,500",
          justification: "Professional development and skill advancement",
          priority: "Medium",
          likelihood: 75,
        },
        {
          category: "Remote Work",
          current: "2 days/week",
          target: "3 days/week",
          justification: "Productivity and work-life balance",
          priority: "Medium",
          likelihood: 80,
        },
      ],

      negotiationScript: {
        opening:
          "Thank you for the offer. I'm excited about the opportunity and would like to discuss a few aspects of the compensation package.",

        salaryNegotiation:
          "Based on my research and the value I bring with my technical skills and experience, I was hoping we could discuss the base salary. The market rate for similar positions is around $92,000-$98,000. Would there be flexibility to adjust the salary to $98,000?",

        equityDiscussion:
          "I'm also interested in discussing the equity component. Given my early employee status and the contribution I plan to make, would it be possible to increase the equity to 0.25%?",

        benefitsNegotiation:
          "Additionally, I'd like to discuss the vacation policy and learning budget. Would there be flexibility to increase vacation days to 20 and the learning budget to $2,500 annually?",

        closing:
          "I'm very interested in joining the team and believe these adjustments would create a package that reflects the market value and my commitment to the company's success.",
      },

      tacticalAdvice: {
        timing: "Best to negotiate within 48-72 hours of receiving offer",
        approach: "Professional, data-driven, and collaborative",
        leverage: [
          "Strong technical skills in high-demand areas",
          "Multiple interview rounds completed successfully",
          "Cultural fit demonstrated",
          "Market demand for your skill set",
        ],

        dosList: [
          "Research market rates thoroughly",
          "Prepare specific justifications for each request",
          "Show enthusiasm for the role and company",
          "Be flexible and open to creative solutions",
          "Get final agreement in writing",
        ],

        dontsList: [
          "Don't make ultimatums or threats",
          "Don't negotiate multiple times on same points",
          "Don't compare to other offers unless relevant",
          "Don't negotiate via email for complex discussions",
          "Don't accept immediately - take time to consider",
        ],
      },

      riskAssessment: {
        offerWithdrawal: "Low (5%)",
        counterOfferLikelihood: "High (85%)",
        fullAcceptanceLikelihood: "Medium (60%)",
        partialAcceptanceLikelihood: "High (90%)",
      },

      alternativeOptions: [
        {
          option: "Performance-based salary increase",
          description: "Start at current offer with guaranteed review and increase after 6 months",
          pros: ["Lower initial risk for company", "Demonstrates confidence"],
          cons: ["Delayed gratification", "Performance metrics must be clear"],
        },
        {
          option: "Additional equity in lieu of salary",
          description: "Accept lower salary for higher equity percentage",
          pros: ["Higher upside potential", "Aligns with company growth"],
          cons: ["Higher risk", "Longer time to realize value"],
        },
        {
          option: "Flexible benefits package",
          description: "Customize benefits to personal priorities",
          pros: ["Personalized value", "Often cost-neutral for company"],
          cons: ["May be complex to administer"],
        },
      ],

      marketIntelligence: {
        competitorOffers: [
          { company: "Similar Startup A", salary: "$95,000", equity: "0.2%", benefits: "Standard" },
          { company: "Similar Startup B", salary: "$88,000", equity: "0.3%", benefits: "Premium" },
          { company: "Tech Corp", salary: "$110,000", equity: "0.05%", benefits: "Excellent" },
        ],

        industryTrends: [
          "Salaries increased 8% year-over-year",
          "Equity packages becoming more generous",
          "Remote work flexibility now standard",
          "Learning budgets increasingly important",
        ],
      },

      psychologicalInsights: {
        companyPerspective: "Likely has budget flexibility but wants to maintain internal equity",
        decisionMakers: "Usually involves hiring manager and HR/founder",
        timeframe: "Expect 2-5 business days for response",
        negotiationStyle: "Startups often more flexible on non-salary items",
      },

      successMetrics: {
        winWinOutcome: "Both parties feel satisfied with final agreement",
        relationshipPreservation: "Maintain positive relationship for future working relationship",
        marketAlignment: "Final package aligns with market standards",
        personalSatisfaction: "Package meets your key priorities and needs",
      },

      followUpStrategy: {
        afterNegotiation: [
          "Send thank you email summarizing discussion",
          "Confirm timeline for decision",
          "Prepare for potential counter-proposals",
          "Have backup plans ready",
        ],

        ifAccepted: [
          "Request offer letter with all agreed terms",
          "Confirm start date and onboarding process",
          "Begin relationship building with future team",
          "Plan transition from current role if applicable",
        ],

        ifRejected: [
          "Ask for specific feedback on concerns",
          "Explore alternative arrangements",
          "Maintain professional relationship",
          "Consider if role is still attractive at current terms",
        ],
      },
    }

    return NextResponse.json(assistance)
  } catch (error) {
    console.error("Error in negotiation assistance:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
