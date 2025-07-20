import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "30d"
    const userId = request.headers.get("user-id")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock analytics data - in real app, fetch from database
    const analytics = {
      opportunities: {
        total: 12,
        active: 8,
        paused: 2,
        closed: 2,
        totalViews: 1247,
        averageViews: 103.9,
        trend: "up",
        change: 23.5,
      },
      applications: {
        total: 156,
        new: 23,
        underReview: 45,
        interviewed: 32,
        accepted: 18,
        rejected: 38,
        conversionRate: 11.5,
        averageTimeToHire: 12.3,
        data: [
          { status: "New", count: 23, color: "#3B82F6" },
          { status: "Under Review", count: 45, color: "#F59E0B" },
          { status: "Interviewed", count: 32, color: "#8B5CF6" },
          { status: "Accepted", count: 18, color: "#10B981" },
          { status: "Rejected", count: 38, color: "#EF4444" },
        ],
      },
      candidates: {
        totalReached: 89,
        responseRate: 67.4,
        averageMatchScore: 82.3,
        topUniversities: [
          { name: "Stanford University", count: 12, percentage: 13.5 },
          { name: "MIT", count: 10, percentage: 11.2 },
          { name: "UC Berkeley", count: 8, percentage: 9.0 },
          { name: "Carnegie Mellon", count: 7, percentage: 7.9 },
          { name: "Harvard University", count: 6, percentage: 6.7 },
        ],
        topSkills: [
          { skill: "React", candidates: 45, percentage: 50.6 },
          { skill: "Python", candidates: 38, percentage: 42.7 },
          { skill: "Node.js", candidates: 34, percentage: 38.2 },
          { skill: "TypeScript", candidates: 29, percentage: 32.6 },
          { skill: "AWS", candidates: 25, percentage: 28.1 },
        ],
      },
      engagement: {
        messages: 234,
        responses: 158,
        responseRate: 67.5,
        averageResponseTime: 4.2,
        interviews: 32,
        interviewShowRate: 87.5,
      },
      performance: {
        costPerHire: 2150,
        timeToFill: 18.5,
        qualityScore: 4.3,
        retentionRate: 89.2,
        satisfactionScore: 4.6,
      },
      opportunityTypes: [
        { type: "Internships", count: 5, applications: 78, hires: 8 },
        { type: "Part-time", count: 3, applications: 34, hires: 4 },
        { type: "Micro-gigs", count: 2, applications: 28, hires: 3 },
        { type: "Co-founder", count: 2, applications: 16, hires: 3 },
      ],
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching startup analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
