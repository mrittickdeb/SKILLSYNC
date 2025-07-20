"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  Globe,
  MapPin,
  Users,
  Calendar,
  Edit,
  Save,
  Plus,
  X,
  Upload,
  Linkedin,
  Twitter,
  Github,
  Mail,
  Phone,
} from "lucide-react"
import { StartupLayout } from "@/components/layouts/StartupLayout"

export default function StartupProfile() {
  const [user, setUser] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    companyName: "TechFlow AI",
    website: "https://techflow.ai",
    description:
      "We're building the next generation of AI-powered user interfaces that make complex technology accessible to everyone. Our platform helps businesses create intelligent, conversational interfaces that understand and respond to user needs in real-time.",
    mission:
      "To democratize AI technology and make it accessible to businesses of all sizes through intuitive, powerful interfaces.",
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
    values: ["Innovation", "Transparency", "Work-Life Balance", "Continuous Learning", "Diversity & Inclusion"],
    perks: ["Flexible Hours", "Remote Work", "Health Insurance", "Learning Budget", "Stock Options", "Free Lunch"],
    hiringGoals:
      "We're looking to hire talented students who are passionate about AI and want to gain real-world experience building products that impact thousands of users. We typically hire for frontend, backend, and ML engineering roles.",
    typicalProjects:
      "Students work on our core AI interface platform, building React components, training ML models, and developing APIs. Recent projects include a conversational AI chatbot, automated testing framework, and mobile app development.",
    mentorshipApproach:
      "Every student is paired with a senior engineer mentor who provides weekly 1:1s, code reviews, and career guidance. We believe in hands-on learning with real responsibility and impact.",
    teamPhotos: [
      "/placeholder.svg?height=200&width=300&text=Team+Photo+1",
      "/placeholder.svg?height=200&width=300&text=Team+Photo+2",
      "/placeholder.svg?height=200&width=300&text=Office+Photo",
    ],
    achievements: [
      { title: "Y Combinator S23", description: "Selected for YC Summer 2023 batch" },
      { title: "Product Hunt #1", description: "Featured as Product of the Day" },
      { title: "10K+ Users", description: "Growing user base across 50+ countries" },
    ],
  })

  const [newValue, setNewValue] = useState("")
  const [newPerk, setNewPerk] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleSave = async () => {
    // Save profile data to backend
    try {
      const response = await fetch("/api/startup/profile", {
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

  const addValue = () => {
    if (newValue.trim() && !profileData.values.includes(newValue.trim())) {
      setProfileData((prev) => ({
        ...prev,
        values: [...prev.values, newValue.trim()],
      }))
      setNewValue("")
    }
  }

  const removeValue = (valueToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      values: prev.values.filter((v) => v !== valueToRemove),
    }))
  }

  const addPerk = () => {
    if (newPerk.trim() && !profileData.perks.includes(newPerk.trim())) {
      setProfileData((prev) => ({
        ...prev,
        perks: [...prev.perks, newPerk.trim()],
      }))
      setNewPerk("")
    }
  }

  const removePerk = (perkToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      perks: prev.perks.filter((p) => p !== perkToRemove),
    }))
  }

  return (
    <StartupLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
            <p className="text-gray-600 mt-1">Manage your company profile and attract top talent</p>
          </div>
          <Button
            onClick={editing ? handleSave : () => setEditing(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {editing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
            {editing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Company Details</TabsTrigger>
            <TabsTrigger value="culture">Culture & Values</TabsTrigger>
            <TabsTrigger value="hiring">Hiring Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Company Logo & Basic Info */}
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96&text=TF" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {profileData.companyName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{profileData.companyName}</h3>
                  <p className="text-gray-600">{profileData.industry}</p>
                  <p className="text-sm text-gray-500">{profileData.location}</p>
                  {editing && (
                    <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Company Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Founded {profileData.founded}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{profileData.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{profileData.workEnvironment}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{profileData.stage}</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>About {profileData.companyName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={profileData.description}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, description: e.target.value }))}
                    disabled={!editing}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    value={profileData.mission}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, mission: e.target.value }))}
                    disabled={!editing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Company Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {profileData.achievements.map((achievement, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <h4 className="font-semibold text-blue-600">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {/* Company Details */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={profileData.industry}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, industry: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stage">Company Stage</Label>
                    <Input
                      id="stage"
                      value={profileData.stage}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, stage: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size">Company Size</Label>
                    <Input
                      id="size"
                      value={profileData.size}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, size: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="funding">Funding</Label>
                    <Input
                      id="funding"
                      value={profileData.funding}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, funding: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="workEnvironment">Work Environment</Label>
                    <Input
                      id="workEnvironment"
                      value={profileData.workEnvironment}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, workEnvironment: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={profileData.contactName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, contactName: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactTitle">Title</Label>
                    <Input
                      id="contactTitle"
                      value={profileData.contactTitle}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, contactTitle: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <Input
                        id="contactEmail"
                        value={profileData.contactEmail}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, contactEmail: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <Input
                        id="contactPhone"
                        value={profileData.contactPhone}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn</Label>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-4 w-4 text-gray-400" />
                    <Input
                      id="linkedinUrl"
                      value={profileData.linkedinUrl}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                      disabled={!editing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="twitterUrl">Twitter</Label>
                    <div className="flex items-center space-x-2">
                      <Twitter className="h-4 w-4 text-gray-400" />
                      <Input
                        id="twitterUrl"
                        value={profileData.twitterUrl}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, twitterUrl: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub</Label>
                    <div className="flex items-center space-x-2">
                      <Github className="h-4 w-4 text-gray-400" />
                      <Input
                        id="githubUrl"
                        value={profileData.githubUrl}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="culture" className="space-y-6">
            {/* Company Values */}
            <Card>
              <CardHeader>
                <CardTitle>Company Values</CardTitle>
                <CardDescription>What principles guide your company?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editing && (
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
                )}

                <div className="flex flex-wrap gap-2">
                  {profileData.values.map((value, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700 flex items-center space-x-2">
                      <span>{value}</span>
                      {editing && (
                        <button onClick={() => removeValue(value)} className="ml-2 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Perks */}
            <Card>
              <CardHeader>
                <CardTitle>Perks & Benefits</CardTitle>
                <CardDescription>What benefits do you offer to employees?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editing && (
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
                )}

                <div className="flex flex-wrap gap-2">
                  {profileData.perks.map((perk, index) => (
                    <Badge key={index} className="bg-green-100 text-green-700 flex items-center space-x-2">
                      <span>{perk}</span>
                      {editing && (
                        <button onClick={() => removePerk(perk)} className="ml-2 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Team & Office Photos</span>
                  {editing && (
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Photo
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {profileData.teamPhotos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Team photo ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      {editing && (
                        <Button variant="destructive" size="sm" className="absolute top-2 right-2">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hiring" className="space-y-6">
            {/* Hiring Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Hiring Goals</CardTitle>
                <CardDescription>What are you looking to achieve with student hires?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={profileData.hiringGoals}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, hiringGoals: e.target.value }))}
                  disabled={!editing}
                  rows={4}
                  placeholder="Describe your hiring goals and what roles you typically hire for..."
                />
              </CardContent>
            </Card>

            {/* Typical Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Typical Projects</CardTitle>
                <CardDescription>What kind of projects do students work on?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={profileData.typicalProjects}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, typicalProjects: e.target.value }))}
                  disabled={!editing}
                  rows={4}
                  placeholder="Describe the types of projects students typically work on..."
                />
              </CardContent>
            </Card>

            {/* Mentorship Approach */}
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Approach</CardTitle>
                <CardDescription>How do you mentor and support student workers?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={profileData.mentorshipApproach}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, mentorshipApproach: e.target.value }))}
                  disabled={!editing}
                  rows={4}
                  placeholder="Describe your mentorship and support approach..."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StartupLayout>
  )
}
