import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In a real app, validate JWT token and get user ID
    const userId = "1" // Mock user ID

    // Gather all user data from database
    const userData = {
      profile: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@mit.edu",
        phone: "+1 (555) 123-4567",
        university: "MIT",
        degreeProgram: "Computer Science",
        graduationYear: "2025",
      },
      applications: [
        {
          id: 1,
          company: "TechFlow AI",
          position: "Frontend Developer Intern",
          status: "Interview Scheduled",
          appliedDate: "2024-01-15",
        },
      ],
      messages: [
        {
          id: 1,
          from: "Sarah Johnson",
          content: "Hi John! Thank you for applying...",
          timestamp: "2024-01-16T10:30:00Z",
        },
      ],
      settings: {
        notifications: true,
        privacy: "public",
        theme: "light",
      },
      exportDate: new Date().toISOString(),
    }

    const jsonData = JSON.stringify(userData, null, 2)

    return new NextResponse(jsonData, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": "attachment; filename=my-data.json",
      },
    })
  } catch (error) {
    console.error("Error exporting data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
