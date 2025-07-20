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
    const { email, password } = body

    console.log("Login attempt:", { email, password })

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user with exact match
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!user) {
      console.log(
        "User not found. Available users:",
        users.map((u) => ({ email: u.email, type: u.user_type })),
      )
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create a simple demo token (replace with real JWT in production)
    const token = `demo-token-${user.id}-${Date.now()}`

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    console.log("Login successful for:", email)

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error", details: (error as Error).message }, { status: 500 })
  }
}
