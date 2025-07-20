"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Target, Zap, Star, TrendingUp, Users, Sparkles, Award, CheckCircle } from "lucide-react"

interface SmartMatchingWidgetProps {
  type: "student" | "startup"
}

export function SmartMatchingWidget({ type }: SmartMatchingWidgetProps) {
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [matchingStats, setMatchingStats] = useState({
    totalMatches: 0,
    averageScore: 0,
    topMatch: 0,
    aiAccuracy: 94,
  })

  useEffect(() => {
    fetchMatches()
  }, [type])

  const fetchMatches = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (type === "startup") {
        setMatches([
          {
            id: 1,
            name: "Alex Chen",
            university: "Stanford University",
            major: "Computer Science",
            matchScore: 96,
            skills: ["React", "TypeScript", "Node.js", "Python"],
            experience: "2 years",
            projects: 8,
            gpa: 3.9,
            aiInsights: {
              cultureFit: 94,
              skillAlignment: 98,
              growthPotential: 92,
              retentionProbability: 89,
            },
            availability: "Available",
            location: "San Francisco, CA",
          },
          {
            id: 2,
            name: "Sarah Johnson",
            university: "MIT",
            major: "Software Engineering",
            matchScore: 94,
            skills: ["Python", "Machine Learning", "TensorFlow", "AWS"],
            experience: "1.5 years",
            projects: 12,
            gpa: 3.8,
            aiInsights: {
              cultureFit: 91,
              skillAlignment: 96,
              growthPotential: 95,
              retentionProbability: 87,
            },
            availability: "Available in 2 weeks",
            location: "Boston, MA",
          },
          {
            id: 3,
            name: "Michael Brown",
            university: "UC Berkeley",
            major: "Data Science",
            matchScore: 91,
            skills: ["Python", "SQL", "Tableau", "R"],
            experience: "1 year",
            projects: 6,
            gpa: 3.7,
            aiInsights: {
              cultureFit: 88,
              skillAlignment: 93,
              growthPotential: 90,
              retentionProbability: 92,
            },
            availability: "Available",
            location: "Berkeley, CA",
          },
        ])

        setMatchingStats({
          totalMatches: 47,
          averageScore: 87,
          topMatch: 96,
          aiAccuracy: 94,
        })
      } else {
        setMatches([
          {
            id: 1,
            name: "TechFlow AI",
            industry: "Artificial Intelligence",
            size: "50-100 employees",
            matchScore: 95,
            roles: ["Frontend Developer", "ML Engineer", "Product Manager"],
            location: "San Francisco, CA",
            funding: "Series B",
            culture: ["Innovation", "Remote-first", "Learning"],
            benefits: ["Equity", "Health", "Learning Budget"],
            aiInsights: {
              careerGrowth: 96,
              cultureFit: 93,
              compensationMatch: 91,
              workLifeBalance: 89,
            },
          },
          {
            id: 2,
            name: "DataViz Solutions",
            industry: "Data Analytics",
            size: "20-50 employees",
            matchScore: 92,
            roles: ["Data Scientist", "Backend Developer", "DevOps Engineer"],
            location: "Austin, TX",
            funding: "Series A",
            culture: ["Collaboration", "Innovation", "Impact"],
            benefits: ["Flexible Hours", "Remote Work", "Stock Options"],
            aiInsights: {
              careerGrowth: 89,
              cultureFit: 95,
              compensationMatch: 88,
              workLifeBalance: 94,
            },
          },
        ])

        setMatchingStats({
          totalMatches: 23,
          averageScore: 84,
          topMatch: 95,
          aiAccuracy: 91,
        })
      }
    } catch (error) {
      console.error("Error fetching matches:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600 animate-pulse" />
            <span>🤖 AI Smart Matching</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>🤖 AI Smart Matching</span>
        </CardTitle>
        <CardDescription>
          AI-powered {type === "startup" ? "candidate" : "opportunity"} matching with {matchingStats.aiAccuracy}%
          accuracy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="matches" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="matches">Top Matches</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-4">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{matchingStats.totalMatches}</div>
                <div className="text-sm text-blue-700">Total Matches</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{matchingStats.averageScore}%</div>
                <div className="text-sm text-green-700">Avg Score</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{matchingStats.topMatch}%</div>
                <div className="text-sm text-purple-700">Top Match</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{matchingStats.aiAccuracy}%</div>
                <div className="text-sm text-orange-700">AI Accuracy</div>
              </div>
            </div>

            {/* Match Results */}
            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="p-4 border rounded-lg hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {match.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">{match.name}</h4>
                          <p className="text-sm text-gray-600">
                            {type === "startup"
                              ? `${match.university} • ${match.major}`
                              : `${match.industry} • ${match.size}`}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          <Star className="h-3 w-3 mr-1" />
                          {match.matchScore}% Match
                        </Badge>
                      </div>

                      {/* Skills/Roles */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(type === "startup" ? match.skills : match.roles)
                          .slice(0, 4)
                          .map((item: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                      </div>

                      {/* AI Insights */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        {Object.entries(match.aiInsights).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-sm font-bold text-purple-600">{value}%</div>
                            <div className="text-xs text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {type === "startup" ? (
                          <>
                            <span>📍 {match.location}</span>
                            <span>💼 {match.experience}</span>
                            <span>🚀 {match.projects} projects</span>
                            <span>📊 GPA: {match.gpa}</span>
                          </>
                        ) : (
                          <>
                            <span>📍 {match.location}</span>
                            <span>💰 {match.funding}</span>
                            <span>🏢 {match.size}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              <Zap className="h-4 w-4 mr-2" />
              Find More Matches
            </Button>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center">
                  <Target className="h-4 w-4 mr-2 text-blue-600" />
                  Matching Performance
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Skill Compatibility</span>
                      <span className="text-sm text-blue-600">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Culture Alignment</span>
                      <span className="text-sm text-green-600">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Growth Potential</span>
                      <span className="text-sm text-purple-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
                  AI Recommendations
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Award className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-yellow-800">High-Priority Match</div>
                        <div className="text-sm text-yellow-700">
                          Alex Chen shows 96% compatibility - recommend immediate contact
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-800">Trending Skills</div>
                        <div className="text-sm text-blue-700">
                          React and TypeScript are in high demand - prioritize these candidates
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Users className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-800">Team Fit</div>
                        <div className="text-sm text-green-700">
                          Sarah Johnson's profile suggests excellent team collaboration
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
