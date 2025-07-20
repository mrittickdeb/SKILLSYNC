"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react"

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

export default function StudentProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    bio: "",
    phone: "",
    location: "",

    // Academic Info
    degreeProgram: "",
    graduationYear: "",
    currentYear: "",
    gpa: "",

    // Skills
    skills: [] as Array<{ skill: string; level: string }>,

    // Interests
    industries: [] as string[],
    workType: "",
    companySize: "",

    // Availability
    hoursPerWeek: "",
    preferredDuration: "",
    startDate: "",

    // Portfolio
    portfolioUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    resume: null as File | null,
  })
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")

  const router = useRouter()
  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // Save profile data
    console.log("Profile data:", formData)
    // Redirect to dashboard
    router.push("/student/dashboard")
  }

  const addSkill = () => {
    if (selectedSkill && selectedLevel) {
      const newSkill = { skill: selectedSkill, level: selectedLevel }
      if (!formData.skills.find((s) => s.skill === selectedSkill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill],
        }))
      }
      setSelectedSkill("")
      setSelectedLevel("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.skill !== skillToRemove),
    }))
  }

  const toggleIndustry = (industry: string) => {
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter((i) => i !== industry)
        : [...prev.industries, industry],
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  value={formData.bio}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Academic Information</h2>
              <p className="text-gray-600">Share your educational background</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="degreeProgram">Degree Program</Label>
                <Input
                  id="degreeProgram"
                  placeholder="e.g., Computer Science, Business Administration"
                  value={formData.degreeProgram}
                  onChange={(e) => setFormData((prev) => ({ ...prev, degreeProgram: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentYear">Current Year</Label>
                  <Select
                    value={formData.currentYear}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, currentYear: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Freshman</SelectItem>
                      <SelectItem value="2">Sophomore</SelectItem>
                      <SelectItem value="3">Junior</SelectItem>
                      <SelectItem value="4">Senior</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    placeholder="2025"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData((prev) => ({ ...prev, graduationYear: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.01"
                  max="4.0"
                  placeholder="3.75"
                  value={formData.gpa}
                  onChange={(e) => setFormData((prev) => ({ ...prev, gpa: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Skills & Expertise</h2>
              <p className="text-gray-600">Add your skills and proficiency levels</p>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_SKILLS.filter((skill) => !formData.skills.find((s) => s.skill === skill)).map(
                      (skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={addSkill} disabled={!selectedSkill || !selectedLevel}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-2">
                    <span>
                      {skill.skill} ({skill.level})
                    </span>
                    <button onClick={() => removeSkill(skill.skill)} className="ml-2 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              {formData.skills.length === 0 && (
                <p className="text-gray-500 text-sm">Add at least 3 skills to continue</p>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Interests & Preferences</h2>
              <p className="text-gray-600">What kind of opportunities interest you?</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Industries of Interest</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {INDUSTRIES.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={industry}
                        checked={formData.industries.includes(industry)}
                        onCheckedChange={() => toggleIndustry(industry)}
                      />
                      <Label htmlFor={industry} className="text-sm">
                        {industry}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workType">Preferred Work Type</Label>
                  <Select
                    value={formData.workType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, workType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="companySize">Company Size Preference</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, companySize: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-10)</SelectItem>
                      <SelectItem value="small">Small (11-50)</SelectItem>
                      <SelectItem value="medium">Medium (51-200)</SelectItem>
                      <SelectItem value="large">Large (200+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Availability & Portfolio</h2>
              <p className="text-gray-600">When are you available and showcase your work</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                  <Select
                    value={formData.hoursPerWeek}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, hoursPerWeek: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hours" />
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
                    value={formData.preferredDuration}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredDuration: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
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

              <div>
                <Label htmlFor="startDate">Earliest Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Student Profile Setup</CardTitle>
          <CardDescription>Complete your profile to find the best opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{renderStep()}</CardContent>
      </Card>
      <div className="mt-6 flex space-x-4">
        <Button onClick={handlePrevious} disabled={currentStep === 1}>
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Progress value={progress} className="flex-1" />
        <Button onClick={handleNext}>
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
