"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import {
  TrendingUp,
  FileText,
  Target,
  DollarSign,
  Clock,
  Award,
  Brain,
  Zap,
  Download,
  Share,
  RefreshCw,
  GraduationCap,
} from "lucide-react"
import { StartupLayout } from "@/components/layouts/StartupLayout"

export default function StartupAnalytics() {
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
      const response = await fetch(`/api/startup/analytics?timeRange=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "user-id": "2",
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

  if (loading || !analytics) {
    return (
      <StartupLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track hiring performance and get AI-powered insights</p>
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
      </StartupLayout>
    )
  }

  const COLORS = ["#3B82F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6"]

  return (
    <StartupLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track hiring performance and get AI-powered insights</p>
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
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">🤖 AI Hiring Intelligence</h3>
                  <div className="space-y-2">
                    {aiInsights.recommendations.map((rec: any, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-green-600" />
                        <span className="text-green-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <Badge className="bg-green-100 text-green-700">
                      Predicted Hire Quality: {aiInsights.predictedHireQuality}/10
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700">
                      Market Competitiveness: {aiInsights.marketCompetitiveness}%
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-700">
                      Talent Pool Score: {aiInsights.talentPoolScore}/100
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
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.applications.total}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">{analytics.opportunities.change}%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.applications.conversionRate}%</p>
                  <p className="text-sm text-gray-500 mt-2">{analytics.applications.accepted} hired</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost per Hire</p>
                  <p className="text-2xl font-bold text-gray-900">${analytics.performance.costPerHire}</p>
                  <p className="text-sm text-gray-500 mt-2">15% below average</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time to Fill</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.performance.timeToFill}</p>
                  <p className="text-sm text-gray-500 mt-2">days average</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Application Pipeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Pipeline</CardTitle>
                  <CardDescription>Current status of all applications</CardDescription>
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

              {/* Opportunity Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Performance</CardTitle>
                  <CardDescription>Performance by opportunity type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.opportunityTypes.map((type: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{type.type}</div>
                          <div className="text-sm text-gray-600">
                            {type.count} opportunities • {type.applications} applications
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{type.hires} hires</div>
                          <div className="text-xs text-gray-500">
                            {((type.hires / type.applications) * 100).toFixed(1)}% rate
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Performance Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Key Performance Indicators</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{analytics.performance.qualityScore}</div>
                    <div className="text-sm text-blue-700">Quality Score</div>
                    <div className="text-xs text-blue-600 mt-1">Out of 5.0</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">{analytics.performance.retentionRate}%</div>
                    <div className="text-sm text-green-700">Retention Rate</div>
                    <div className="text-xs text-green-600 mt-1">90-day retention</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {analytics.performance.satisfactionScore}
                    </div>
                    <div className="text-sm text-purple-700">Satisfaction Score</div>
                    <div className="text-xs text-purple-600 mt-1">Student feedback</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">{analytics.candidates.responseRate}%</div>
                    <div className="text-sm text-orange-700">Response Rate</div>
                    <div className="text-xs text-orange-600 mt-1">Initial outreach</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Application Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Flow Analysis</CardTitle>
                  <CardDescription>Conversion rates at each stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: "Applications Received", count: analytics.applications.total, rate: 100 },
                      { stage: "Initial Screening", count: analytics.applications.underReview, rate: 71.2 },
                      { stage: "Interviews Scheduled", count: analytics.applications.interviewed, rate: 45.7 },
                      { stage: "Final Interviews", count: 24, rate: 27.4 },
                      { stage: "Offers Extended", count: analytics.applications.accepted, rate: 15.4 },
                    ].map((stage, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">{stage.stage}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">{stage.count} candidates</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={stage.rate} className="w-20" />
                            <span className="text-sm font-medium w-12">{stage.rate}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hiring Efficiency */}
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Efficiency Metrics</CardTitle>
                  <CardDescription>Time and cost optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{analytics.performance.timeToFill}</div>
                      <div className="text-sm text-green-700">Days to Fill</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">${analytics.performance.costPerHire}</div>
                      <div className="text-sm text-blue-700">Cost per Hire</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Interview Show Rate</span>
                      <span className="text-sm text-gray-600">{analytics.engagement.interviewShowRate}%</span>
                    </div>
                    <Progress value={analytics.engagement.interviewShowRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Offer Acceptance Rate</span>
                      <span className="text-sm text-gray-600">78.3%</span>
                    </div>
                    <Progress value={78.3} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* University Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>Top Universities</span>
                  </CardTitle>
                  <CardDescription>Where your candidates come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.candidates.topUniversities.map((uni: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <span className="font-medium">{uni.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">{uni.count} students</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={uni.percentage} className="w-20" />
                            <span className="text-sm font-medium w-12">{uni.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Most In-Demand Skills</CardTitle>
                  <CardDescription>Skills your candidates possess</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.candidates.topSkills.map((skill: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{skill.skill}</Badge>
                          <span className="text-sm text-gray-600">{skill.candidates} candidates</span>
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

            {/* Candidate Quality Insights */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 AI Candidate Quality Insights</CardTitle>
                <CardDescription>Machine learning analysis of your candidate pool</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {analytics.candidates.averageMatchScore}
                    </div>
                    <div className="text-sm text-purple-700">Average Match Score</div>
                    <div className="text-xs text-purple-600 mt-1">AI-calculated compatibility</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">8.7/10</div>
                    <div className="text-sm text-green-700">Predicted Performance</div>
                    <div className="text-xs text-green-600 mt-1">Based on similar hires</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">92%</div>
                    <div className="text-sm text-blue-700">Culture Fit Score</div>
                    <div className="text-xs text-blue-600 mt-1">AI personality analysis</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* ROI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>ROI & Cost Analysis</CardTitle>
                  <CardDescription>Return on investment for your hiring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">$12,450</div>
                      <div className="text-sm text-green-700">Total Hiring Cost</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">340%</div>
                      <div className="text-sm text-blue-700">ROI</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Platform Fees</span>
                      <span className="text-sm font-medium">$2,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Time Investment</span>
                      <span className="text-sm font-medium">$8,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Onboarding Costs</span>
                      <span className="text-sm font-medium">$2,150</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Total Cost per Hire</span>
                      <span>${analytics.performance.costPerHire}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benchmarking */}
              <Card>
                <CardHeader>
                  <CardTitle>Industry Benchmarking</CardTitle>
                  <CardDescription>How you compare to similar companies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Time to Fill</span>
                        <span className="text-sm text-green-600">23% faster</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={77} className="flex-1" />
                        <span className="text-sm">{analytics.performance.timeToFill}d vs 24d avg</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Cost per Hire</span>
                        <span className="text-sm text-green-600">15% lower</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="flex-1" />
                        <span className="text-sm">${analytics.performance.costPerHire} vs $2,530 avg</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Quality Score</span>
                        <span className="text-sm text-green-600">8% higher</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={86} className="flex-1" />
                        <span className="text-sm">{analytics.performance.qualityScore}/5 vs 4.0/5 avg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>🚀 AI Performance Recommendations</span>
                </CardTitle>
                <CardDescription>Data-driven suggestions to optimize your hiring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-600">✅ What's Working Well</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">High interview show rate (87.5%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Strong candidate quality from top universities</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Below-average cost per hire</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-orange-600">🎯 Optimization Opportunities</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Expand to more universities for diversity</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Improve initial response time (currently 4.2h)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Consider micro-gig opportunities for quick wins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StartupLayout>
  )
}
