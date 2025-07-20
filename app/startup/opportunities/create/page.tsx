"use client"

import type React from "react"

import { useState } from "react"
import { StartupLayout } from "@/components/layouts/StartupLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StartupTalentPredictor } from "@/components/unique/StartupTalentPredictor"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, X, DollarSign, Brain, TrendingUp, Target } from "lucide-react"

export default function CreateOpportunityPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    type: "",
    location: "",
    salary: "",
    equity: "",
    duration: "",
    skills: [] as string[],
    benefits: [] as string[],
    remote: false,
    urgent: false,
  })

  const [newSkill, setNewSkill] = useState("")
  const [newBenefit, setNewBenefit] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }))
      setNewBenefit("")
    }
  }

  const removeBenefit = (benefit: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((b) => b !== benefit),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating opportunity:", formData)
  }

  return (
    <StartupLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Smart Opportunity</h1>
          <p className="text-gray-600 mt-2">Use AI insights to create opportunities that attract top talent</p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Opportunity</TabsTrigger>
            <TabsTrigger value="market-intel">Market Intelligence</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>Opportunity Details</CardTitle>
                    <CardDescription>Create an opportunity that stands out to top students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Job Title</Label>
                          <Input
                            id="title"
                            placeholder="e.g. Frontend Developer Intern"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Opportunity Type</Label>
                          <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="internship">Internship</SelectItem>
                              <SelectItem value="part-time">Part-time</SelectItem>
                              <SelectItem value="full-time">Full-time</SelectItem>
                              <SelectItem value="co-founder">Co-founder</SelectItem>
                              <SelectItem value="freelance">Freelance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the role, responsibilities, and what makes your startup unique..."
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requirements">Requirements</Label>
                        <Textarea
                          id="requirements"
                          placeholder="List the required skills, experience, and qualifications..."
                          rows={3}
                          value={formData.requirements}
                          onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            placeholder="e.g. Remote, San Francisco"
                            value={formData.location}
                            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salary">Salary/Compensation</Label>
                          <Input
                            id="salary"
                            placeholder="e.g. $3,000/month"
                            value={formData.salary}
                            onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="equity">Equity (optional)</Label>
                          <Input
                            id="equity"
                            placeholder="e.g. 0.1-0.5%"
                            value={formData.equity}
                            onChange={(e) => setFormData((prev) => ({ ...prev, equity: e.target.value }))}
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <Label>Required Skills</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                          />
                          <Button type="button" onClick={addSkill}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                              <span>{skill}</span>
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-2">
                        <Label>Benefits & Perks</Label>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add a benefit"
                            value={newBenefit}
                            onChange={(e) => setNewBenefit(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                          />
                          <Button type="button" onClick={addBenefit}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="flex items-center space-x-1">
                              <span>{benefit}</span>
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeBenefit(benefit)} />
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Switches */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="remote">Remote Work Available</Label>
                            <p className="text-sm text-gray-500">Allow remote or hybrid work</p>
                          </div>
                          <Switch
                            id="remote"
                            checked={formData.remote}
                            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, remote: checked }))}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="urgent">Urgent Hiring</Label>
                            <p className="text-sm text-gray-500">Need to fill this position quickly</p>
                          </div>
                          <Switch
                            id="urgent"
                            checked={formData.urgent}
                            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, urgent: checked }))}
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                        Create Opportunity
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span>AI Optimization Tips</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Title Optimization</span>
                      </div>
                      <p className="text-xs text-gray-600">Adding "Remote" increases applications by 40%</p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Salary Insights</span>
                      </div>
                      <p className="text-xs text-gray-600">Market rate for this role: $3,200-4,800/month</p>
                    </div>

                    <div className="p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Trending Skills</span>
                      </div>
                      <p className="text-xs text-gray-600">TypeScript, React, and AI/ML are in high demand</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-sm">Predicted Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expected Applications</span>
                      <span className="text-sm font-medium">15-25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Time to Fill</span>
                      <span className="text-sm font-medium">2-3 weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quality Score</span>
                      <span className="text-sm font-medium text-green-600">High</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="market-intel">
            <StartupTalentPredictor />
          </TabsContent>
        </Tabs>
      </div>
    </StartupLayout>
  )
}
