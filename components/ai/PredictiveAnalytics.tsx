"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Award,
  Zap,
  BarChart3,
  PieChartIcon,
} from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function PredictiveAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAnalytics({
        hiringForecast: {
          next30Days: [
            { date: "Week 1", applications: 45, hires: 3, interviews: 12 },
            { date: "Week 2", applications: 52, hires: 4, interviews: 15 },
            { date: "Week 3", applications: 48, hires: 5, interviews: 18 },
            { date: "Week 4", applications: 55, hires: 6, interviews: 20 },
          ],
          predictions: {
            totalApplications: 200,
            expectedHires: 18,
            successRate: 89,
            confidence: 87,
          },
        },
        marketTrends: [
          { month: "Jan", demand: 65, supply: 45, competition: 70 },
          { month: "Feb", demand: 70, supply: 48, competition: 75 },
          { month: "Mar", demand: 75, supply: 52, competition: 72 },
          { month: "Apr", demand: 80, supply: 55, competition: 78 },
          { month: "May", demand: 85, supply: 58, competition: 80 },
          { month: "Jun", demand: 88, supply: 60, competition: 82 },
        ],
        riskAnalysis: {
          overallRisk: 23,
          factors: [
            { factor: "Market Competition", risk: 35, trend: "increasing" },
            { factor: "Salary Expectations", risk: 28, trend: "stable" },
            { factor: "Skill Availability", risk: 15, trend: "decreasing" },
            { factor: "Economic Conditions", risk: 20, trend: "stable" },
          ],
          mitigation: [
            {
              risk: "Market Competition",
              action: "Increase salary by 8-12%",
              impact: "High",
              timeline: "Immediate",
            },
            {
              risk: "Skill Availability",
              action: "Expand remote hiring",
              impact: "Medium",
              timeline: "2-4 weeks",
            },
          ],
        },
        performanceMetrics: {
          currentQuarter: {
            applicationsReceived: 156,
            interviewsScheduled: 45,
            offersExtended: 12,
            hiresCompleted: 8,
            averageTimeToHire: 18,
            costPerHire: 3200,
          },
          predictions: {
            nextQuarter: {
              applicationsReceived: 185,
              interviewsScheduled: 55,
              offersExtended: 16,
              hiresCompleted: 12,
              averageTimeToHire: 15,
              costPerHire: 2800,
            },
          },
        },
        candidateSegmentation: [
          { name: "High Performers", value: 35, color: "#0088FE" },
          { name: "Good Fit", value: 45, color: "#00C49F" },
          { name: "Potential", value: 15, color: "#FFBB28" },
          { name: "Low Match", value: 5, color: "#FF8042" },
        ],
      })
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600 animate-pulse" />
            <span>📊 Predictive Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded"></div>
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
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <span>📊 Predictive Analytics</span>
        </CardTitle>
        <CardDescription>AI-powered hiring forecasts and market predictions with 89% accuracy</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="forecast" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forecast">Hiring Forecast</TabsTrigger>
            <TabsTrigger value="market">Market Trends</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-6">
            {/* Key Predictions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {analytics.hiringForecast.predictions.totalApplications}
                </div>
                <div className="text-sm text-blue-700">Expected Applications</div>
                <div className="text-xs text-blue-600">Next 30 days</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {analytics.hiringForecast.predictions.expectedHires}
                </div>
                <div className="text-sm text-green-700">Predicted Hires</div>
                <div className="text-xs text-green-600">89% confidence</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {analytics.hiringForecast.predictions.successRate}%
                </div>
                <div className="text-sm text-purple-700">Success Rate</div>
                <div className="text-xs text-purple-600">Predicted</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {analytics.hiringForecast.predictions.confidence}%
                </div>
                <div className="text-sm text-orange-700">AI Confidence</div>
                <div className="text-xs text-orange-600">Model accuracy</div>
              </div>
            </div>

            {/* Hiring Forecast Chart */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                30-Day Hiring Forecast
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.hiringForecast.next30Days}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="interviews" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="hires" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Candidate Segmentation */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <PieChartIcon className="h-4 w-4 mr-2 text-purple-600" />
                Candidate Quality Distribution
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.candidateSegmentation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analytics.candidateSegmentation.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {analytics.candidateSegmentation.map((segment: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="font-medium">{segment.name}</span>
                      </div>
                      <span className="font-bold">{segment.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                Market Trend Analysis
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.marketTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="demand" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="supply" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="competition" stackId="3" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Demand Trend</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">+23%</div>
                <div className="text-sm text-blue-700">Increasing demand for tech talent</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Supply Growth</span>
                </div>
                <div className="text-2xl font-bold text-green-600">+15%</div>
                <div className="text-sm text-green-700">More candidates entering market</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">Competition</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">+18%</div>
                <div className="text-sm text-orange-700">Increased hiring competition</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            {/* Overall Risk Score */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                  Overall Hiring Risk
                </h4>
                <Badge className="bg-yellow-100 text-yellow-700">{analytics.riskAnalysis.overallRisk}% Risk</Badge>
              </div>
              <Progress value={analytics.riskAnalysis.overallRisk} className="mb-2" />
              <div className="text-sm text-orange-700">Low to moderate risk - manageable with proper actions</div>
            </div>

            {/* Risk Factors */}
            <div>
              <h4 className="font-semibold mb-4">Risk Factor Analysis</h4>
              <div className="space-y-3">
                {analytics.riskAnalysis.factors.map((factor: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{factor.factor}</span>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            factor.risk > 30
                              ? "bg-red-100 text-red-700"
                              : factor.risk > 20
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }
                        >
                          {factor.risk}% risk
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            factor.trend === "increasing"
                              ? "text-red-600"
                              : factor.trend === "decreasing"
                                ? "text-green-600"
                                : "text-gray-600"
                          }
                        >
                          {factor.trend}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={factor.risk} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Mitigation */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-blue-600" />
                Recommended Actions
              </h4>
              <div className="space-y-3">
                {analytics.riskAnalysis.mitigation.map((action: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-blue-900 mb-1">Risk: {action.risk}</div>
                        <div className="text-sm text-blue-800 mb-2">Action: {action.action}</div>
                        <div className="flex items-center space-x-4 text-xs text-blue-700">
                          <span>Impact: {action.impact}</span>
                          <span>Timeline: {action.timeline}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Implement
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Current vs Predicted Performance */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-green-600" />
                  Current Quarter Performance
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Applications Received</span>
                    <span className="font-bold">
                      {analytics.performanceMetrics.currentQuarter.applicationsReceived}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Interviews Scheduled</span>
                    <span className="font-bold">{analytics.performanceMetrics.currentQuarter.interviewsScheduled}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Offers Extended</span>
                    <span className="font-bold">{analytics.performanceMetrics.currentQuarter.offersExtended}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Hires Completed</span>
                    <span className="font-bold">{analytics.performanceMetrics.currentQuarter.hiresCompleted}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-purple-600" />
                  Next Quarter Predictions
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">Applications Received</span>
                    <div className="text-right">
                      <span className="font-bold">
                        {analytics.performanceMetrics.predictions.nextQuarter.applicationsReceived}
                      </span>
                      <div className="text-xs text-green-600">+19% increase</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">Interviews Scheduled</span>
                    <div className="text-right">
                      <span className="font-bold">
                        {analytics.performanceMetrics.predictions.nextQuarter.interviewsScheduled}
                      </span>
                      <div className="text-xs text-green-600">+22% increase</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">Offers Extended</span>
                    <div className="text-right">
                      <span className="font-bold">
                        {analytics.performanceMetrics.predictions.nextQuarter.offersExtended}
                      </span>
                      <div className="text-xs text-green-600">+33% increase</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">Hires Completed</span>
                    <div className="text-right">
                      <span className="font-bold">
                        {analytics.performanceMetrics.predictions.nextQuarter.hiresCompleted}
                      </span>
                      <div className="text-xs text-green-600">+50% increase</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-600" />
                    Average Time to Hire
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {analytics.performanceMetrics.currentQuarter.averageTimeToHire} days
                    </div>
                    <div className="text-sm text-blue-700">Current</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {analytics.performanceMetrics.predictions.nextQuarter.averageTimeToHire} days
                    </div>
                    <div className="text-sm text-green-700">Predicted</div>
                  </div>
                </div>
                <div className="text-xs text-green-600 mt-2">17% improvement expected</div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    Cost Per Hire
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      ${analytics.performanceMetrics.currentQuarter.costPerHire.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">Current</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${analytics.performanceMetrics.predictions.nextQuarter.costPerHire.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700">Predicted</div>
                  </div>
                </div>
                <div className="text-xs text-green-600 mt-2">13% cost reduction expected</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
