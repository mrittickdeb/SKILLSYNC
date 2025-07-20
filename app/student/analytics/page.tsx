"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Target,
  MessageSquare,
  Award,
  Brain,
  Zap,
  Download,
  Share,
  RefreshCw,
} from "lucide-react"
import { StudentLayout } from "@/components/layouts/StudentLayout"

export default function StudentAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [aiInsights, setAiInsights] = useState<any>(null)

  useEffect(() => {
    fetchAnalytics()
    fetchAIInsights()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/student/analytics?timeRange=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "user-id": "1",
        },
      })
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAIInsights = async () => {
    try {
      const response = await fetch("/api/student/ai-insights", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "user-id": "1",
        },
      })
      const data = await response.json()
      setAiInsights(data)
    } catch (error) {
      console.error("Error fetching AI insights:", error)
    }
  }

  if (loading || !analytics) {
    return (
      <StudentLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your performance and get AI-powered insights</p>
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

  const COLORS = ["#3B82F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6"]

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your performance and get AI-powered insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchAnalytics}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* AI Insights Banner */}
        {aiInsights && (
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">🤖 AI-Powered Insights</h3>
                  <div className="space-y-2">
                    {aiInsights.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <Badge className="bg-purple-100 text-purple-700">
                      Predicted Success Rate: {aiInsights.predictedSuccessRate}%
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700">
                      Market Demand Score: {aiInsights.marketDemandScore}/100
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.profileViews.current}</p>
                  <div className="flex items-center mt-2">
                    {analytics.profileViews.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm ${analytics.profileViews.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {analytics.profileViews.change}%
                    </span>
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
                  <p className="text-2xl font-bold text-gray-900">{analytics.applications.total}</p>
                  <p className="text-sm text-gray-500 mt-2">{analytics.applications.successRate}% success rate</p>
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
                  <p className="text-sm font-medium text-gray-600">Match Score</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.matches.averageScore}</p>
                  <p className="text-sm text-gray-500 mt-2">{analytics.matches.total} total matches</p>
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
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.engagement.responseRate}%</p>
                  <p className="text-sm text-gray-500 mt-2">{analytics.engagement.interviews} interviews</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Views Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Views Trend</CardTitle>
                  <CardDescription>Your profile visibility over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analytics.profileViews.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="views" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Skills Demand */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills in Demand</CardTitle>
                  <CardDescription>Your skills vs market demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.matches.topSkills.map((skill: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{skill.skill}</Badge>
                          <span className="text-sm text-gray-600">{skill.matches} matches</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={skill.percentage} className="w-20" />
                          <span className="text-sm font-medium">{skill.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Performance Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {analytics.applications.averageResponseTime}
                    </div>
                    <div className="text-sm text-green-700">Days Avg Response Time</div>
                    <div className="text-xs text-green-600 mt-1">23% faster than average</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{analytics.engagement.interviewRate}%</div>
                    <div className="text-sm text-blue-700">Interview Rate</div>
                    <div className="text-xs text-blue-600 mt-1">Above platform average</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">{analytics.matches.averageScore}</div>
                    <div className="text-sm text-purple-700">Average Match Score</div>
                    <div className="text-xs text-purple-600 mt-1">Excellent compatibility</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Application Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>Current status of your applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analytics.applications.data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {analytics.applications.data.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Application Success Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Success Metrics</CardTitle>
                  <CardDescription>Your application performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-sm text-gray-600">{analytics.applications.successRate}%</span>
                    </div>
                    <Progress value={analytics.applications.successRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Response Rate</span>
                      <span className="text-sm text-gray-600">{analytics.engagement.responseRate}%</span>
                    </div>
                    <Progress value={analytics.engagement.responseRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Interview Rate</span>
                      <span className="text-sm text-gray-600">{analytics.engagement.interviewRate}%</span>
                    </div>
                    <Progress value={analytics.engagement.interviewRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Match Quality Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Match Quality Distribution</CardTitle>
                  <CardDescription>Quality of your opportunity matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { quality: "High (90-100%)", count: analytics.matches.highMatch, color: "#10B981" },
                        { quality: "Medium (70-89%)", count: analytics.matches.mediumMatch, color: "#F59E0B" },
                        { quality: "Low (50-69%)", count: analytics.matches.lowMatch, color: "#EF4444" },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quality" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skill Improvement Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>🎯 AI Skill Recommendations</CardTitle>
                  <CardDescription>Skills to learn for better matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { skill: "Machine Learning", demand: 95, growth: "+45%" },
                      { skill: "Docker", demand: 87, growth: "+32%" },
                      { skill: "GraphQL", demand: 78, growth: "+28%" },
                      { skill: "Kubernetes", demand: 72, growth: "+25%" },
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{skill.skill}</div>
                          <div className="text-sm text-gray-600">Market demand: {skill.demand}%</div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">{skill.growth}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Communication Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Communication Performance</CardTitle>
                  <CardDescription>Your messaging and response patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analytics.engagement.messages}</div>
                      <div className="text-sm text-blue-700">Messages Sent</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{analytics.engagement.responses}</div>
                      <div className="text-sm text-green-700">Responses Received</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Response Rate</span>
                      <span className="text-sm text-gray-600">{analytics.engagement.responseRate}%</span>
                    </div>
                    <Progress value={analytics.engagement.responseRate} className="h-2" />
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-semibold text-purple-600">
                      {analytics.engagement.averageResponseTime} hours
                    </div>
                    <div className="text-sm text-purple-700">Average Response Time</div>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Interview Performance</CardTitle>
                  <CardDescription>Your interview success metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">{analytics.engagement.interviews}</div>
                    <div className="text-lg text-green-700 mb-1">Total Interviews</div>
                    <div className="text-sm text-gray-600">{analytics.engagement.interviewRate}% of applications</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Interview Conversion</span>
                      <span className="text-sm font-medium">{analytics.engagement.interviewRate}%</span>
                    </div>
                    <Progress value={analytics.engagement.interviewRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
