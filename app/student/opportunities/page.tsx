"use client"

import { useState, useEffect } from "react"
import { StudentLayout } from "@/components/layouts/StudentLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LinkedInComparison } from "@/components/unique/LinkedInComparison"
import { StudentSkillGapAnalyzer } from "@/components/unique/StudentSkillGapAnalyzer"
import { MapPin, Clock, DollarSign, Users, Search, Filter, Briefcase, Zap, TrendingUp, Star } from "lucide-react"

// Mock data for opportunities
const opportunities = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechFlow AI",
    type: "Internship",
    location: "Remote",
    salary: "$3,000/month",
    duration: "3 months",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    description: "Join our AI startup to build cutting-edge user interfaces",
    compatibility: 87,
    posted: "2 days ago",
    applicants: 12,
    equity: "0.1-0.3%",
  },
  {
    id: 2,
    title: "ML Research Assistant",
    company: "DataVision Labs",
    type: "Part-time",
    location: "San Francisco, CA",
    salary: "$25/hour",
    duration: "6 months",
    skills: ["Python", "TensorFlow", "Research"],
    description: "Research and develop machine learning models for computer vision",
    compatibility: 92,
    posted: "1 day ago",
    applicants: 8,
    equity: null,
  },
  {
    id: 3,
    title: "Co-founder (CTO)",
    company: "GreenTech Startup",
    type: "Co-founder",
    location: "Austin, TX",
    salary: "Equity-based",
    duration: "Long-term",
    skills: ["Full-stack", "Leadership", "Blockchain"],
    description: "Looking for a technical co-founder to revolutionize sustainable energy",
    compatibility: 78,
    posted: "3 days ago",
    applicants: 5,
    equity: "15-25%",
  },
]

export default function StudentOpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities)

  useEffect(() => {
    let filtered = opportunities

    if (searchTerm) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((opp) => opp.type.toLowerCase() === filterType)
    }

    setFilteredOpportunities(filtered)
  }, [searchTerm, filterType])

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50"
    if (score >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Smart Opportunities</h1>
          <p className="text-gray-600 mt-2">AI-powered matching finds your perfect startup opportunities</p>
        </div>

        {/* Unique Features Showcase */}
        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="skill-gap">Skill Analysis</TabsTrigger>
            <TabsTrigger value="vs-linkedin">vs LinkedIn</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search opportunities, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="internship">Internships</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="co-founder">Co-founder</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* AI Insights Banner */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Market Intelligence</h3>
                    <p className="text-sm text-gray-600">
                      Web3 opportunities increased by <span className="font-bold text-green-600">49%</span> this month.
                      ML roles show <span className="font-bold text-blue-600">87% compatibility</span> with your
                      profile.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opportunities Grid */}
            <div className="grid gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{opportunity.title}</h3>
                        <p className="text-gray-600">{opportunity.company}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCompatibilityColor(opportunity.compatibility)}`}
                      >
                        <Star className="h-4 w-4 inline mr-1" />
                        {opportunity.compatibility}% Match
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{opportunity.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{opportunity.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{opportunity.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{opportunity.applicants} applicants</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                      {opportunity.equity && (
                        <Badge className="bg-green-100 text-green-800">
                          <Zap className="h-3 w-3 mr-1" />
                          {opportunity.equity} equity
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{opportunity.posted}</span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skill-gap">
            <StudentSkillGapAnalyzer />
          </TabsContent>

          <TabsContent value="vs-linkedin">
            <LinkedInComparison />
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
