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
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react"

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
  "SaaS",
  "Mobile Apps",
  "Web Development",
]

const COMPANY_STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+", "Growth Stage", "Public"]

const COMPANY_SIZES = ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "500+ employees"]

export default function StartupProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "",
    website: "",
    description: "",
    mission: "",
    founded: "",
    location: "",

    // Company Details
    industry: "",
    stage: "",
    size: "",
    funding: "",

    // Contact Info
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",

    // Company Culture
    values: [] as string[],
    perks: [] as string[],
    workEnvironment: "",

    // Social Links
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "",

    // Hiring Info
    hiringGoals: "",
    typicalProjects: "",
    mentorshipApproach: "",

    // Media
    logo: null as File | null,
    photos: [] as File[],
  })

  const [newValue, setNewValue] = useState("")
  const [newPerk, setNewPerk] = useState("")

  const router = useRouter()
  const totalSteps = 4
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
    console.log("Startup profile data:", formData)
    // Redirect to dashboard
    router.push("/startup/dashboard")
  }

  const addValue = () => {
    if (newValue.trim() && !formData.values.includes(newValue.trim())) {
      setFormData((prev) => ({
        ...prev,
        values: [...prev.values, newValue.trim()],
      }))
      setNewValue("")
    }
  }

  const removeValue = (valueToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((v) => v !== valueToRemove),
    }))
  }

  const addPerk = () => {
    if (newPerk.trim() && !formData.perks.includes(newPerk.trim())) {
      setFormData((prev) => ({
        ...prev,
        perks: [...prev.perks, newPerk.trim()],
      }))
      setNewPerk("")
    }
  }

  const removePerk = (perkToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      perks: prev.perks.filter((p) => p !== perkToRemove),
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Company Information</h2>
              <p className="text-gray-600">Tell us about your startup</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Your startup name"
                  value={formData.companyName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://yourcompany.com"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your company does, your products/services, and what makes you unique..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  placeholder="What is your company's mission and vision?"
                  value={formData.mission}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mission: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="founded">Founded Year</Label>
                  <Input
                    id="founded"
                    type="number"
                    placeholder="2023"
                    value={formData.founded}
                    onChange={(e) => setFormData((prev) => ({ ...prev, founded: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
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
              <h2 className="text-2xl font-bold mb-2">Company Details</h2>
              <p className="text-gray-600">Help students understand your company better</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stage">Company Stage</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, stage: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_STAGES.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Select
                    value={formData.size}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="funding">Funding Information (Optional)</Label>
                <Input
                  id="funding"
                  placeholder="e.g., $2M Series A, Bootstrapped, etc."
                  value={formData.funding}
                  onChange={(e) => setFormData((prev) => ({ ...prev, funding: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="workEnvironment">Work Environment</Label>
                <Select
                  value={formData.workEnvironment}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, workEnvironment: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Fully Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Contact & Culture</h2>
              <p className="text-gray-600">Share your contact info and company culture</p>
            </div>

            <div className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      placeholder="Your name"
                      value={formData.contactName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contactName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactTitle">Title</Label>
                    <Input
                      id="contactTitle"
                      placeholder="CEO, Founder, etc."
                      value={formData.contactTitle}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contactTitle: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone (Optional)</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Company Values */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Values</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a company value..."
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addValue()}
                  />
                  <Button onClick={addValue} disabled={!newValue.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.values.map((value, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-2">
                      <span>{value}</span>
                      <button onClick={() => removeValue(value)} className="ml-2 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Company Perks */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Perks & Benefits</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a perk or benefit..."
                    value={newPerk}
                    onChange={(e) => setNewPerk(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addPerk()}
                  />
                  <Button onClick={addPerk} disabled={!newPerk.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.perks.map((perk, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-2">
                      <span>{perk}</span>
                      <button onClick={() => removePerk(perk)} className="ml-2 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Hiring & Social Links</h2>
              <p className="text-gray-600">Final details about your hiring approach</p>
            </div>

            <div className="space-y-6">
              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Links</h3>
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn Company Page</Label>
                  <Input
                    id="linkedinUrl"
                    placeholder="https://linkedin.com/company/yourcompany"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="twitterUrl">Twitter (Optional)</Label>
                    <Input
                      id="twitterUrl"
                      placeholder="https://twitter.com/yourcompany"
                      value={formData.twitterUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, twitterUrl: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub (Optional)</Label>
                    <Input
                      id="githubUrl"
                      placeholder="https://github.com/yourcompany"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Hiring Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hiring Information</h3>
                <div>
                  <Label htmlFor="hiringGoals">Hiring Goals</Label>
                  <Textarea
                    id="hiringGoals"
                    placeholder="What are you looking to achieve with student hires? What roles are you typically hiring for?"
                    value={formData.hiringGoals}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hiringGoals: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="typicalProjects">Typical Projects</Label>
                  <Textarea
                    id="typicalProjects"
                    placeholder="What kind of projects do students typically work on at your company?"
                    value={formData.typicalProjects}
                    onChange={(e) => setFormData((prev) => ({ ...prev, typicalProjects: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="mentorshipApproach">Mentorship Approach</Label>
                  <Textarea
                    id="mentorshipApproach"
                    placeholder="How do you mentor and support student workers?"
                    value={formData.mentorshipApproach}
                    onChange={(e) => setFormData((prev) => ({ ...prev, mentorshipApproach: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Startup Profile Setup</CardTitle>
          <CardDescription>Complete your company profile to attract the best student talent</CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">{renderStep()}</CardContent>
      </Card>

      <div className="mt-6 flex justify-between w-full max-w-3xl">
        <Button onClick={handlePrevious} disabled={currentStep === 1} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="text-sm text-gray-500 flex items-center">
          Step {currentStep} of {totalSteps}
        </div>
        <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600">
          {currentStep === totalSteps ? "Complete Setup" : "Next"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
