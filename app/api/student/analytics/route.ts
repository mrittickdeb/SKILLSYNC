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
      profileViews: {
        current: 156,
        previous: 134,
        change: 16.4,
        trend: "up",
        data: generateTimeSeriesData(timeRange, "views"),
      },
      applications: {
        total: 24,
        pending: 8,
        accepted: 3,
        rejected: 5,
        successRate: 12.5,
        averageResponseTime: 5.2,
        data: [
          { status: "Pending", count: 8, color: "#3B82F6" },
          { status: "Accepted", count: 3, color: "#10B981" },
          { status: "Rejected", count: 5, color: "#EF4444" },
          { status: "Withdrawn", count: 2, color: "#6B7280" },
          { status: "Expired", count: 6, color: "#F59E0B" },
        ],
      },
      matches: {
        total: 45,
        highMatch: 12,
        mediumMatch: 23,
        lowMatch: 10,
        averageScore: 78.5,
        topSkills: [
          { skill: "React", matches: 18, percentage: 40 },
          { skill: "TypeScript", matches: 15, percentage: 33 },
          { skill: "Node.js", matches: 12, percentage: 27 },
          { skill: "Python", matches: 10, percentage: 22 },
          { skill: "AWS", matches: 8, percentage: 18 },
        ],
      },
      engagement: {
        messages: 67,
        responses: 52,
        responseRate: 77.6,
        averageResponseTime: 2.3,
        interviews: 8,
        interviewRate: 33.3,
      },
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching student analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateTimeSeriesData(timeRange: string, metric: string) {
  const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
  const data = []

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      [metric]: Math.floor(Math.random() * 30) + 5,
    })
  }

  return data
}
