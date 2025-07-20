import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo
const startupProfiles: any = {}

export async function GET(request: NextRequest) {
  try {
    // In a real app, get user ID from JWT token
    const userId = "2" // Mock startup user ID

    const profile = startupProfiles[userId] || {
      id: userId,
      companyName: "TechFlow AI",
      website: "https://techflow.ai",
      description: "We're building the next generation of AI-powered user interfaces.",
      mission: "To democratize AI technology and make it accessible to businesses of all sizes.",
      founded: "2023",
      location: "San Francisco, CA",
      industry: "AI/ML",
      stage: "Seed",
      size: "11-50 employees",
      funding: "$3M Seed Round",
      workEnvironment: "Hybrid",
      contactName: "Sarah Johnson",
      contactTitle: "CEO & Founder",
      contactEmail: "sarah@techflow.ai",
      contactPhone: "+1 (555) 123-4567",
      linkedinUrl: "https://linkedin.com/company/techflow-ai",
      twitterUrl: "https://twitter.com/techflowai",
      githubUrl: "https://github.com/techflow-ai",
      values: ["Innovation", "Transparency", "Work-Life Balance"],
      perks: ["Flexible Hours", "Remote Work", "Health Insurance"],
      hiringGoals: "We're looking to hire talented students who are passionate about AI.",
      typicalProjects: "Students work on our core AI interface platform.",
      mentorshipApproach: "Every student is paired with a senior engineer mentor.",
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error fetching startup profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const userId = "2" // Mock startup user ID

    startupProfiles[userId] = { ...startupProfiles[userId], ...body, id: userId }

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: startupProfiles[userId],
    })
  } catch (error) {
    console.error("Error updating startup profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
