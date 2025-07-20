import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo (replace with database in production)
const users: any[] = [
  {
    id: "1",
    email: "student@demo.com",
    password: "password123",
    user_type: "student",
    firstName: "John",
    lastName: "Doe",
    university: "MIT",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    email: "startup@demo.com",
    password: "password123",
    user_type: "startup",
    companyName: "TechFlow AI",
    created_at: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, user_type, firstName, lastName, companyName, university, phone } = body

    console.log("Registration attempt:", { email, user_type, firstName, lastName, companyName })

    // Validate required fields
    if (!email || !password || !user_type) {
      return NextResponse.json({ error: "Email, password, and user type are required" }, { status: 400 })
    }

    // Validate user type specific fields
    if (user_type === "student" && (!firstName || !lastName)) {
      return NextResponse.json({ error: "First name and last name are required for students" }, { status: 400 })
    }

    if (user_type === "startup" && !companyName) {
      return NextResponse.json({ error: "Company name is required for startups" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password, // In production, hash this password
      user_type,
      firstName: user_type === "student" ? firstName : undefined,
      lastName: user_type === "student" ? lastName : undefined,
      companyName: user_type === "startup" ? companyName : undefined,
      university: user_type === "student" ? university : undefined,
      phone,
      created_at: new Date().toISOString(),
      profile_completed: false,
    }

    users.push(newUser)

    // Create a simple demo token (replace with real JWT in production)
    const token = `demo-token-${newUser.id}-${Date.now()}`

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    console.log("Registration successful for:", email, "User type:", user_type)

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userWithoutPassword,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error", details: (error as Error).message }, { status: 500 })
  }
}
