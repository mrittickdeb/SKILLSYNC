import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo
const opportunities: any[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "TechFlow AI",
    description: "Join our team to build cutting-edge AI interfaces using React and TypeScript.",
    type: "internship",
    location: "San Francisco, CA",
    isRemote: true,
    duration: "3-6 months",
    compensation: "$2,000/month",
    matchScore: 95,
    requiredSkills: ["React", "TypeScript", "CSS"],
    postedAt: new Date().toISOString(),
    applicants: 12,
    status: "active",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const type = searchParams.get("type")
    const location = searchParams.get("location")
    const remote = searchParams.get("remote")
    const search = searchParams.get("search")

    let filtered = [...opportunities]

    // Apply filters
    if (type && type !== "all") {
      filtered = filtered.filter((opp) => opp.type === type)
    }
    if (location && location !== "all") {
      filtered = filtered.filter((opp) => opp.location.includes(location))
    }
    if (remote === "true") {
      filtered = filtered.filter((opp) => opp.isRemote)
    }
    if (search) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(search.toLowerCase()) ||
          opp.company.toLowerCase().includes(search.toLowerCase()) ||
          opp.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOpportunities = filtered.slice(startIndex, endIndex)

    return NextResponse.json({
      opportunities: paginatedOpportunities,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(filtered.length / limit),
        total_items: filtered.length,
      },
    })
  } catch (error) {
    console.error("Error fetching opportunities:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newOpportunity = {
      id: (opportunities.length + 1).toString(),
      ...body,
      postedAt: new Date().toISOString(),
      applicants: 0,
      status: "active",
    }

    opportunities.push(newOpportunity)

    return NextResponse.json(
      { message: "Opportunity created successfully", opportunity: newOpportunity },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating opportunity:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
