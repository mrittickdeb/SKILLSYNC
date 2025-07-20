"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Star,
  Github,
  Linkedin,
  Globe,
  Edit,
  Save,
  Plus,
  X,
  Upload,
  Award,
  Briefcase,
} from "lucide-react"
import { StudentLayout } from "@/components/layouts/StudentLayout"

const AVAILABLE_SKILLS = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "Java",
  "C++",
  "HTML/CSS",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Git",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Marketing",
  "Content Writing",
  "Project Management",
  "Leadership",
  "Communication",
]

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Gaming",
  "Social Media",
  "AI/ML",
  "Blockchain",
  "IoT",
  "Cybersecurity",
  "Fintech",
]

export default function StudentProfile() {
  const [user, setUser] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [profileData, setProfileData] = useState({
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
    bio: "Passionate computer science student with experience in full-stack development and machine learning. Looking for opportunities to apply my skills in real-world projects and contribute to innovative startups.",
    portfolioUrl: "https://johndoe.dev",
    githubUrl: "https://github.com/johndoe",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    skills: [
      { skill: "JavaScript", level: "Advanced" },
      { skill: "React", level: "Advanced" },
      { skill: "Python", level: "Intermediate" },
      { skill: "Node.js", level: "Intermediate" },
      { skill: "Machine Learning", level: "Beginner" },
      { skill: "AWS", level: "Beginner" },
    ],
    interests: ["Technology", "AI/ML", "Fintech"],
    workType: "Remote",
    companySize: "Startup",
    hoursPerWeek: "20-30",
    preferredDuration: "3-6 months",
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        url: "https://github.com/johndoe/ecommerce",
        image: "/placeholder.svg?height=200&width=300&text=E-commerce+Project",
      },
      {
        id: 2,
        title: "ML Stock Predictor",
        description: "Machine learning model to predict stock prices using Python and TensorFlow",
        technologies: ["Python", "TensorFlow", "Pandas", "NumPy"],
        url: "https://github.com/johndoe/stock-predictor",
        image: "/placeholder.svg?height=200&width=300&text=ML+Project",
      },
    ],
    achievements: [
      { title: "Dean's List", description: "Fall 2023, Spring 2024", icon: Award },
      { title: "Hackathon Winner", description: "MIT Hackathon 2024 - 1st Place", icon: Star },
      { title: "Open Source Contributor", description: "50+ contributions to React ecosystem", icon: Github },
    ],
  })

  const [newSkill, setNewSkill] = useState({ skill: "", level: "" })
  const [selectedIndustry, setSelectedIndustry] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const profileCompletion = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.bio,
      profileData.phone,
      profileData.location,
      profileData.degreeProgram,
      profileData.graduationYear,
      profileData.portfolioUrl,
      profileData.githubUrl,
    ]
    const completed = fields.filter((field) => field && field.trim() !== "").length
    const skillsBonus = profileData.skills.length >= 3 ? 1 : 0
    const projectsBonus = profileData.projects.length >= 1 ? 1 : 0
    return Math.round(((completed + skillsBonus + projectsBonus) / (fields.length + 2)) * 100)
  }

  const handleSave = async () => {
    // Save profile data to backend
    try {
      const response = await fetch("/api/student/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileData),
      })

      if (response.ok) {
        setEditing(false)
        // Show success message
      }
    } catch (error) {
      console.error("Error saving profile:", error)
    }
  }

  const addSkill = () => {
    if (newSkill.skill && newSkill.level) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }))
      setNewSkill({ skill: "", level: "" })
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.skill !== skillToRemove),
    }))
  }

  const addInterest = () => {
    if (selectedIndustry && !profileData.interests.includes(selectedIndustry)) {
      setProfileData((prev) => ({
        ...prev,
        interests: [...prev.interests, selectedIndustry],
      }))
      setSelectedIndustry("")
    }
  }

  const removeInterest = (interest: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }))
  }

  const getSkillLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "expert":
        return "bg-purple-100 text-purple-700"
      case "advanced":
        return "bg-green-100 text-green-700"
      case "intermediate":
        return "bg-blue-100 text-blue-700"
      case "beginner":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your profile and showcase your skills</p>
          </div>
          <Button
            onClick={editing ? handleSave : () => setEditing(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {editing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {editing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Profile Completion</h3>
                <p className="text-sm text-gray-600">Complete your profile to get better matches</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{profileCompletion()}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
            <Progress value={profileCompletion()} className="h-2" />
          </CardContent>
        </Card>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Profile Picture & Basic Info */}
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96&text=JD" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-600">{profileData.degreeProgram} Student</p>
                  <p className="text-sm text-gray-500">{profileData.university}</p>
                  {editing && (
                    <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Academic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={profileData.university}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, university: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="degreeProgram">Degree Program</Label>
                    <Input
                      id="degreeProgram"
                      value={profileData.degreeProgram}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, degreeProgram: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currentYear">Current Year</Label>
                    <Select
                      value={profileData.currentYear}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, currentYear: value }))}
                      disabled={!editing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Freshman">Freshman</SelectItem>
                        <SelectItem value="Sophomore">Sophomore</SelectItem>
                        <SelectItem value="Junior">Junior</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      value={profileData.graduationYear}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, graduationYear: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA (Optional)</Label>
                    <Input
                      id="gpa"
                      value={profileData.gpa}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, gpa: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    disabled={!editing}
                    rows={4}
                    placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {profileData.achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Technical & Soft Skills</CardTitle>
                <CardDescription>Add your skills and proficiency levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editing && (
                  <div className="flex space-x-2">
                    <Select
                      value={newSkill.skill}
                      onValueChange={(value) => setNewSkill((prev) => ({ ...prev, skill: value }))}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select a skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_SKILLS.filter((skill) => !profileData.skills.find((s) => s.skill === skill)).map(
                          (skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <Select
                      value={newSkill.level}
                      onValueChange={(value) => setNewSkill((prev) => ({ ...prev, level: value }))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addSkill} disabled={!newSkill.skill || !newSkill.level}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} className={`${getSkillLevelColor(skill.level)} flex items-center space-x-2`}>
                      <span>
                        {skill.skill} ({skill.level})
                      </span>
                      {editing && (
                        <button onClick={() => removeSkill(skill.skill)} className="ml-2 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Interests</CardTitle>
                <CardDescription>Select industries you're interested in working in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editing && (
                  <div className="flex space-x-2">
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.filter((industry) => !profileData.interests.includes(industry)).map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={addInterest} disabled={!selectedIndustry}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-2">
                      <span>{interest}</span>
                      {editing && (
                        <button onClick={() => removeInterest(interest)} className="ml-2 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Links</CardTitle>
                <CardDescription>Add links to your portfolio, GitHub, and social profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="portfolioUrl">Portfolio Website</Label>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <Input
                      id="portfolioUrl"
                      value={profileData.portfolioUrl}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, portfolioUrl: e.target.value }))}
                      disabled={!editing}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="githubUrl">GitHub Profile</Label>
                  <div className="flex items-center space-x-2">
                    <Github className="h-4 w-4 text-gray-400" />
                    <Input
                      id="githubUrl"
                      value={profileData.githubUrl}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                      disabled={!editing}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-4 w-4 text-gray-400" />
                    <Input
                      id="linkedinUrl"
                      value={profileData.linkedinUrl}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                      disabled={!editing}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Projects</span>
                  </span>
                  {editing && (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {profileData.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-3">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold">{project.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <Github className="h-4 w-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Preferences</CardTitle>
                <CardDescription>Set your availability and work preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workType">Preferred Work Type</Label>
                    <Select
                      value={profileData.workType}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, workType: value }))}
                      disabled={!editing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="On-site">On-site</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="companySize">Company Size Preference</Label>
                    <Select
                      value={profileData.companySize}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, companySize: value }))}
                      disabled={!editing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Startup">Startup (1-10)</SelectItem>
                        <SelectItem value="Small">Small (11-50)</SelectItem>
                        <SelectItem value="Medium">Medium (51-200)</SelectItem>
                        <SelectItem value="Large">Large (200+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                    <Select
                      value={profileData.hoursPerWeek}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, hoursPerWeek: value }))}
                      disabled={!editing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5-10">5-10 hours</SelectItem>
                        <SelectItem value="10-20">10-20 hours</SelectItem>
                        <SelectItem value="20-30">20-30 hours</SelectItem>
                        <SelectItem value="30-40">30-40 hours</SelectItem>
                        <SelectItem value="40+">40+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="preferredDuration">Preferred Duration</Label>
                    <Select
                      value={profileData.preferredDuration}
                      onValueChange={(value) => setProfileData((prev) => ({ ...prev, preferredDuration: value }))}
                      disabled={!editing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-4 weeks">1-4 weeks</SelectItem>
                        <SelectItem value="1-3 months">1-3 months</SelectItem>
                        <SelectItem value="3-6 months">3-6 months</SelectItem>
                        <SelectItem value="6+ months">6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
