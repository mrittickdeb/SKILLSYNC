import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo
const profiles: any = {}

export async function GET(request: NextRequest) {
  try {
    // In a real app, get user ID from JWT token
    const userId = "1" // Mock user ID

    const profile = profiles[userId] || {
      id: userId,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@mit.edu",
      phone: "+1 (555) 123-4567",
      location: "Cambridge, MA",
      university: "MIT",
      degreeProgram: "Computer Science",
      graduationYear: "2025",
      currentYear: "Junior",
      gpa: "3.85",
      bio: "Passionate computer science student with experience in full-stack development.",
      portfolioUrl: "https://johndoe.dev",
      githubUrl: "https://github.com/johndoe",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      skills: [
        { skill: "JavaScript", level: "Advanced" },
        { skill: "React", level: "Advanced" },
        { skill: "Python", level: "Intermediate" },
      ],
      interests: ["Technology", "AI/ML", "Fintech"],
      workType: "Remote",
      companySize: "Startup",
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const userId = "1" // Mock user ID

    profiles[userId] = { ...profiles[userId], ...body, id: userId }

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: profiles[userId],
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
