"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Briefcase,
  MessageSquare,
  TrendingUp,
  Plus,
  ArrowRight,
  Brain,
  Zap,
  Target,
  Star,
  AlertCircle,
  CheckCircle,
  Eye,
  Bot,
  Sparkles,
  Cpu,
  BarChart3,
  Lightbulb,
  Rocket,
  Award,
} from "lucide-react"
import Link from "next/link"
import { StartupLayout } from "@/components/layouts/StartupLayout"
import { SmartMatchingWidget } from "@/components/ai/SmartMatchingWidget"
import { AIInsightsPanel } from "@/components/ai/AIInsightsPanel"
import { PredictiveAnalytics } from "@/components/ai/PredictiveAnalytics"

export default function StartupDashboard() {
  const [user, setUser] = useState<any>(null)
  const [aiInsights, setAiInsights] = useState<any>(null)
  const [stats, setStats] = useState({
    activeOpportunities: 5,
    totalApplications: 23,
    newApplications: 7,
    messagesUnread: 3,
    aiScore: 94,
    predictedHires: 12,
    talentPoolQuality: 87,
    competitiveAdvantage: 23,
  })

  const [recentApplications, setRecentApplications] = useState([
    {
      id: 1,
      studentName: "Alex Chen",
      opportunity: "Frontend Developer Intern",
      matchScore: 95,
      aiScore: 92,
      appliedAt: "2 hours ago",
      status: "new",
      university: "Stanford University",
      skills: ["React", "TypeScript", "Node.js"],
      aiInsights: {
        successProbability: 89,
        cultureFit: 94,
        skillGrowthPotential: 87,
        retentionLikelihood: 91,
      },
      aiRecommendation: "Exceptional candidate - schedule interview within 24h",
      riskFactors: ["High demand candidate", "Multiple offers likely"],
    },
    {
      id: 2,
      studentName: "Sarah Johnson",
      opportunity: "UI/UX Designer",
      matchScore: 88,
      aiScore: 85,
      appliedAt: "5 hours ago",
      status: "reviewed",
      university: "MIT",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      aiInsights: {
        successProbability: 82,
        cultureFit: 88,
        skillGrowthPotential: 90,
        retentionLikelihood: 85,
      },
      aiRecommendation: "Strong design portfolio - emphasize creative freedom",
      riskFactors: ["Prefers larger companies"],
    },
    {
      id: 3,
      studentName: "Michael Brown",
      opportunity: "Data Analyst Intern",
      matchScore: 82,
      aiScore: 78,
      appliedAt: "1 day ago",
      status: "interview_scheduled",
      university: "UC Berkeley",
      skills: ["Python", "SQL", "Tableau"],
      aiInsights: {
        successProbability: 75,
        cultureFit: 80,
        skillGrowthPotential: 85,
        retentionLikelihood: 88,
      },
      aiRecommendation: "Focus on data impact stories during interview",
      riskFactors: ["Limited startup experience"],
    },
  ])

  const [aiRecommendations, setAiRecommendations] = useState([
    {
      type: "urgent",
      title: "High-Value Candidate Alert",
      message: "Alex Chen has 95% match score and 3 competing offers. Recommend immediate action.",
      action: "Schedule Interview",
      priority: "high",
    },
    {
      type: "optimization",
      title: "Job Description Enhancement",
      message: "Adding 'remote-first' to your React role could increase applications by 34%.",
      action: "Optimize Now",
      priority: "medium",
    },
    {
      type: "market",
      title: "Salary Intelligence",
      message: "Your UI/UX role is 15% below market rate. Consider adjustment for better candidates.",
      action: "View Analysis",
      priority: "medium",
    },
    {
      type: "prediction",
      title: "Hiring Forecast",
      message: "AI predicts you'll fill 3 positions this month with 87% confidence.",
      action: "View Details",
      priority: "low",
    },
  ])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    fetchAIInsights()
  }, [])

  const fetchAIInsights = async () => {
    try {
      const response = await fetch("/api/startup/ai-insights", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "user-id": "2",
        },
      })
      const data = await response.json()
      setAiInsights(data)
    } catch (error) {
      console.error("Error fetching AI insights:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700"
      case "reviewed":
        return "bg-yellow-100 text-yellow-700"
      case "interview_scheduled":
        return "bg-green-100 text-green-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "New"
      case "reviewed":
        return "Reviewed"
      case "interview_scheduled":
        return "Interview Scheduled"
      case "accepted":
        return "Accepted"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      case "low":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "optimization":
        return <Zap className="h-4 w-4 text-yellow-500" />
      case "market":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "prediction":
        return <Brain className="h-4 w-4 text-purple-500" />
      default:
        return <Lightbulb className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <StartupLayout>
      <div className="space-y-8">
        {/* AI-Enhanced Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.companyName || "Startup"}! 🚀</h1>
            <p className="text-gray-600 mt-1">AI-powered hiring intelligence at your fingertips</p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
                <Brain className="h-3 w-3 mr-1" />
                AI Score: {stats.aiScore}/100
              </Badge>
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700">
                <Target className="h-3 w-3 mr-1" />
                {stats.competitiveAdvantage}% Above Market
              </Badge>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link href="/startup/ai-assistant">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </Link>
            <Link href="/startup/opportunities/create">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                Post Opportunity
              </Button>
            </Link>
          </div>
        </div>

        {/* AI Insights Banner */}
        <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">🤖 AI Hiring Intelligence Dashboard</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-purple-600" />
                      <span className="text-purple-800">
                        AI processed {stats.totalApplications} applications with 94% accuracy
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800">
                        Predicted {stats.predictedHires} successful hires this quarter
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">
                        Talent pool quality: {stats.talentPoolQuality}% (Excellent)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Rocket className="h-4 w-4 text-orange-600" />
                      <span className="text-orange-800">Your hiring velocity is 23% above industry average</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Stats Cards with AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full -mr-10 -mt-10 opacity-20"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Opportunities</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeOpportunities}</p>
                  <div className="flex items-center mt-1">
                    <Brain className="h-3 w-3 text-blue-500 mr-1" />
                    <span className="text-xs text-blue-600">AI Optimized</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full -mr-10 -mt-10 opacity-20"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Match Score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.aiScore}%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+12% this week</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full -mr-10 -mt-10 opacity-20"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Predicted Hires</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.predictedHires}</p>
                  <div className="flex items-center mt-1">
                    <Zap className="h-3 w-3 text-purple-500 mr-1" />
                    <span className="text-xs text-purple-600">87% confidence</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full -mr-10 -mt-10 opacity-20"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Talent Quality</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.talentPoolQuality}%</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-orange-500 mr-1" />
                    <span className="text-xs text-orange-600">Excellent</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>🚀 AI Recommendations</span>
            </CardTitle>
            <CardDescription>Real-time AI insights to optimize your hiring process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getPriorityIcon(rec.type)}
                      <div>
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <p className="text-sm text-gray-700 mt-1">{rec.message}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      {rec.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs with AI Features */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">🤖 AI Applications</TabsTrigger>
            <TabsTrigger value="matching">🎯 Smart Matching</TabsTrigger>
            <TabsTrigger value="analytics">📊 Predictive Analytics</TabsTrigger>
            <TabsTrigger value="insights">🧠 AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">AI-Ranked Applications</h3>
              <Link href="/startup/applications">
                <Button variant="outline">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {recentApplications.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {app.studentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{app.studentName}</h4>
                            <p className="text-sm text-gray-600">{app.university}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Badge className="bg-green-100 text-green-700">
                              <Star className="h-3 w-3 mr-1" />
                              {app.matchScore}% Match
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700">
                              <Brain className="h-3 w-3 mr-1" />
                              AI: {app.aiScore}%
                            </Badge>
                            <Badge className={getStatusColor(app.status)}>{getStatusText(app.status)}</Badge>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-3">Applied for: {app.opportunity}</p>

                        {/* AI Insights Section */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-3">
                          <h5 className="font-semibold text-purple-900 mb-2 flex items-center">
                            <Brain className="h-4 w-4 mr-2" />
                            AI Analysis
                          </h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">
                                {app.aiInsights.successProbability}%
                              </div>
                              <div className="text-xs text-gray-600">Success Rate</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{app.aiInsights.cultureFit}%</div>
                              <div className="text-xs text-gray-600">Culture Fit</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-purple-600">
                                {app.aiInsights.skillGrowthPotential}%
                              </div>
                              <div className="text-xs text-gray-600">Growth Potential</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-orange-600">
                                {app.aiInsights.retentionLikelihood}%
                              </div>
                              <div className="text-xs text-gray-600">Retention</div>
                            </div>
                          </div>
                        </div>

                        {/* AI Recommendation */}
                        <div className="bg-green-50 p-3 rounded-lg mb-3">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="h-4 w-4 text-green-600 mt-0.5" />
                            <div>
                              <span className="font-medium text-green-800">AI Recommendation: </span>
                              <span className="text-green-700">{app.aiRecommendation}</span>
                            </div>
                          </div>
                        </div>

                        {/* Risk Factors */}
                        {app.riskFactors.length > 0 && (
                          <div className="bg-orange-50 p-3 rounded-lg mb-3">
                            <div className="flex items-start space-x-2">
                              <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <span className="font-medium text-orange-800">Risk Factors: </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {app.riskFactors.map((risk, index) => (
                                    <Badge key={index} variant="outline" className="text-xs text-orange-700">
                                      {risk}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2 mb-2">
                          {app.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">Applied {app.appliedAt}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          AI Interview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          AI Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matching" className="space-y-6">
            <SmartMatchingWidget type="startup" />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>🎯 AI Candidate Discovery</span>
                </CardTitle>
                <CardDescription>Find perfect candidates before they even apply</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Proactive Candidate Matching</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Emma Wilson", university: "Harvard", match: 96, status: "Available" },
                        { name: "David Kim", university: "Stanford", match: 94, status: "Interested" },
                        { name: "Lisa Zhang", university: "MIT", match: 91, status: "Open to offers" },
                      ].map((candidate, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{candidate.name}</div>
                              <div className="text-sm text-gray-600">{candidate.university}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{candidate.match}%</div>
                            <div className="text-xs text-gray-500">{candidate.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      <Zap className="h-4 w-4 mr-2" />
                      Discover More Candidates
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">AI Matching Insights</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800">Skill Compatibility</span>
                        </div>
                        <Progress value={87} className="mb-1" />
                        <span className="text-sm text-blue-700">87% of candidates match your tech stack</span>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">Culture Alignment</span>
                        </div>
                        <Progress value={92} className="mb-1" />
                        <span className="text-sm text-green-700">92% culture fit based on values analysis</span>
                      </div>

                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-purple-800">Growth Potential</span>
                        </div>
                        <Progress value={89} className="mb-1" />
                        <span className="text-sm text-purple-700">89% show high learning velocity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <PredictiveAnalytics />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <AIInsightsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </StartupLayout>
  )
}
