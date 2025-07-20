"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronRight,
  Eye,
  FileText,
  MessageSquare,
  TrendingUp,
  Target,
} from "lucide-react"
import { StudentLayout } from "@/components/layouts/StudentLayout"
import { SmartMatchingWidget } from "@/components/ai/SmartMatchingWidget"
import { PersonalityAnalyzer } from "@/components/ai/PersonalityAnalyzer"
import { PredictiveSuccessAnalyzer } from "@/components/ai/PredictiveSuccessAnalyzer"
import { MarketIntelligenceDashboard } from "@/components/ai/MarketIntelligenceDashboard"
import { StudentSkillGapAnalyzer } from "@/components/unique/StudentSkillGapAnalyzer"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setDashboardData({
        profile: {
          name: "Alex Johnson",
          university: "Stanford University",
          major: "Computer Science",
          year: "Junior",
          gpa: 3.8,
          completionRate: 85,
        },
        stats: {
          profileViews: 234,
          applications: 12,
          matches: 8,
          interviews: 3,
        },
        recentActivity: [
          { type: "match", company: "TechFlow AI", role: "Frontend Intern", time: "2 hours ago" },
          { type: "view", company: "StartupX", time: "5 hours ago" },
          { type: "application", company: "WebCorp", role: "Full-stack Developer", time: "1 day ago" },
        ],
        opportunities: [
          {
            id: 1,
            company: "TechFlow AI",
            role: "Frontend Developer Intern",
            match: 94,
            salary: "$3,500/month",
            type: "Internship",
            skills: ["React", "TypeScript", "Node.js"],
          },
          {
            id: 2,
            company: "StartupX",
            role: "Full-stack Developer",
            match: 87,
            salary: "$4,000/month",
            type: "Part-time",
            skills: ["Python", "Django", "PostgreSQL"],
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <StudentLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's your latest activity.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {dashboardData.profile.name}! 👋</h1>
            <p className="text-gray-600 mt-1">
              {dashboardData.profile.major} • {dashboardData.profile.university} • GPA: {dashboardData.profile.gpa}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button>
              <Eye className="h-4 w-4 mr-2" />
              View Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.profileViews}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% this week</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.applications}</p>
                  <p className="text-sm text-gray-500 mt-2">3 pending responses</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Matches</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.matches}</p>
                  <p className="text-sm text-gray-500 mt-2">87% avg compatibility</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.interviews}</p>
                  <p className="text-sm text-gray-500 mt-2">2 scheduled</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-matching">AI Matching</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="success">Success Predictor</TabsTrigger>
            <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
            <TabsTrigger value="market">Market Intel</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Profile Completion</span>
                </CardTitle>
                <CardDescription>Complete your profile to get better matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-green-600">
                          {dashboardData.profile.completionRate}%
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Profile Strength</h3>
                        <p className="text-sm text-gray-600">Good progress! Add more skills to improve.</p>
                      </div>
                    </div>
                    <Button variant="outline">Complete Profile</Button>
                  </div>
                  <Progress value={dashboardData.profile.completionRate} className="h-2" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Basic Info</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Skills</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Portfolio</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span>Preferences</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "match"
                            ? "bg-purple-100"
                            : activity.type === "view"
                              ? "bg-blue-100"
                              : "bg-green-100"
                        }`}
                      >
                        {activity.type === "match" && <Target className="h-4 w-4 text-purple-600" />}
                        {activity.type === "view" && <Eye className="h-4 w-4 text-blue-600" />}
                        {activity.type === "application" && <FileText className="h-4 w-4 text-green-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {activity.type === "match" && `New match with ${activity.company}`}
                          {activity.type === "view" && `${activity.company} viewed your profile`}
                          {activity.type === "application" && `Applied to ${activity.company}`}
                        </p>
                        {activity.role && <p className="text-sm text-gray-600">{activity.role}</p>}
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Top AI Matches</span>
                </CardTitle>
                <CardDescription>Opportunities with highest compatibility scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.opportunities.map((opp: any) => (
                    <div key={opp.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{opp.role}</h3>
                          <p className="text-sm text-gray-600">{opp.company}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 mb-1">{opp.match}% match</Badge>
                          <p className="text-sm font-medium">{opp.salary}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {opp.skills.map((skill: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-matching" className="space-y-6">
            <SmartMatchingWidget studentId="1" type="student" />
          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            <PersonalityAnalyzer />
          </TabsContent>

          <TabsContent value="success" className="space-y-6">
            <PredictiveSuccessAnalyzer />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <StudentSkillGapAnalyzer />
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <MarketIntelligenceDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
