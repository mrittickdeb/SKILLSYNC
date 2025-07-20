"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  Zap,
  BarChart3,
  Users,
  DollarSign,
  Clock,
  Award,
  Lightbulb,
} from "lucide-react"

export function AIInsightsPanel() {
  const [insights, setInsights] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInsights()
  }, [])

  const fetchInsights = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setInsights({
        marketTrends: {
          topSkills: [
            { skill: "React", demand: 95, growth: "+23%" },
            { skill: "TypeScript", demand: 89, growth: "+31%" },
            { skill: "Python", demand: 92, growth: "+18%" },
            { skill: "Node.js", demand: 87, growth: "+15%" },
            { skill: "AWS", demand: 84, growth: "+27%" },
          ],
          salaryTrends: {
            average: 85000,
            growth: "+12%",
            topPaying: [
              { role: "ML Engineer", salary: 120000 },
              { role: "Full Stack Developer", salary: 95000 },
              { role: "DevOps Engineer", salary: 110000 },
            ],
          },
          competitionAnalysis: {
            yourPosition: 78,
            marketAverage: 65,
            topCompetitors: [
              { name: "TechCorp", score: 92 },
              { name: "InnovateLab", score: 88 },
              { name: "StartupX", score: 85 },
            ],
          },
        },
        candidateInsights: {
          qualityScore: 87,
          availabilityTrends: {
            immediate: 34,
            within2weeks: 45,
            within1month: 21,
          },
          skillGaps: [
            { skill: "Machine Learning", gap: 23, priority: "high" },
            { skill: "Cloud Architecture", gap: 18, priority: "medium" },
            { skill: "DevOps", gap: 15, priority: "medium" },
          ],
          geographicDistribution: [
            { location: "San Francisco", percentage: 35 },
            { location: "New York", percentage: 28 },
            { location: "Austin", percentage: 15 },
            { location: "Seattle", percentage: 22 },
          ],
        },
        predictions: {
          hiringSuccess: 89,
          timeToHire: 18,
          retentionRate: 92,
          recommendations: [
            {
              type: "urgent",
              title: "Salary Adjustment Needed",
              description: "Your React developer role is 15% below market rate",
              impact: "high",
              action: "Increase by $8,000-$12,000",
            },
            {
              type: "opportunity",
              title: "Emerging Skill Demand",
              description: "TypeScript demand increased 31% - prioritize these candidates",
              impact: "medium",
              action: "Update job requirements",
            },
            {
              type: "risk",
              title: "Competition Alert",
              description: "3 competitors are targeting similar candidates",
              impact: "high",
              action: "Accelerate hiring process",
            },
          ],
        },
      })
    } catch (error) {
      console.error("Error fetching insights:", error)
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
            <span>🧠 AI Market Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
          <span>🧠 AI Market Intelligence</span>
        </CardTitle>
        <CardDescription>Real-time market insights and hiring intelligence powered by AI</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="market" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market">Market Trends</TabsTrigger>
            <TabsTrigger value="candidates">Candidate Insights</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-6">
            {/* Top Skills in Demand */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                Top Skills in Demand
              </h4>
              <div className="space-y-3">
                {insights.marketTrends.topSkills.map((skill: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{skill.skill}</div>
                        <div className="text-sm text-gray-600">Demand: {skill.demand}%</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {skill.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Trends */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                Salary Intelligence
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${insights.marketTrends.salaryTrends.average.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-700">Average Salary</div>
                  <div className="text-xs text-green-600 mt-1">
                    {insights.marketTrends.salaryTrends.growth} YoY growth
                  </div>
                </div>
                <div className="space-y-2">
                  {insights.marketTrends.salaryTrends.topPaying.map((role: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{role.role}</span>
                      <span className="font-bold">${role.salary.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Competition Analysis */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Target className="h-4 w-4 mr-2 text-purple-600" />
                Competition Analysis
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Your Competitive Position</span>
                    <Badge className="bg-purple-100 text-purple-700">
                      {insights.marketTrends.competitionAnalysis.yourPosition}/100
                    </Badge>
                  </div>
                  <Progress value={insights.marketTrends.competitionAnalysis.yourPosition} className="mb-2" />
                  <div className="text-sm text-purple-700">
                    {insights.marketTrends.competitionAnalysis.yourPosition -
                      insights.marketTrends.competitionAnalysis.marketAverage}{" "}
                    points above market average
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Top Competitors:</div>
                  {insights.marketTrends.competitionAnalysis.topCompetitors.map((competitor: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{competitor.name}</span>
                      <span className="text-sm font-bold">{competitor.score}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            {/* Candidate Quality Score */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold flex items-center">
                  <Award className="h-4 w-4 mr-2 text-blue-600" />
                  Candidate Pool Quality
                </h4>
                <div className="text-2xl font-bold text-blue-600">{insights.candidateInsights.qualityScore}/100</div>
              </div>
              <Progress value={insights.candidateInsights.qualityScore} className="mb-2" />
              <div className="text-sm text-blue-700">Excellent quality - top 15% of all platforms</div>
            </div>

            {/* Availability Trends */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-green-600" />
                Candidate Availability
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {insights.candidateInsights.availabilityTrends.immediate}%
                  </div>
                  <div className="text-sm text-green-700">Immediate</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {insights.candidateInsights.availabilityTrends.within2weeks}%
                  </div>
                  <div className="text-sm text-yellow-700">Within 2 weeks</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {insights.candidateInsights.availabilityTrends.within1month}%
                  </div>
                  <div className="text-sm text-orange-700">Within 1 month</div>
                </div>
              </div>
            </div>

            {/* Skill Gaps */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-red-600" />
                Skill Gap Analysis
              </h4>
              <div className="space-y-3">
                {insights.candidateInsights.skillGaps.map((gap: any, index: number) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{gap.skill}</span>
                      <Badge
                        className={
                          gap.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : gap.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }
                      >
                        {gap.priority} priority
                      </Badge>
                    </div>
                    <div className="text-sm text-red-700 mb-2">{gap.gap}% skill gap in market</div>
                    <Progress value={100 - gap.gap} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-600" />
                Geographic Distribution
              </h4>
              <div className="space-y-2">
                {insights.candidateInsights.geographicDistribution.map((location: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{location.location}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${location.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold">{location.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            {/* Key Predictions */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{insights.predictions.hiringSuccess}%</div>
                <div className="text-sm text-green-700">Hiring Success Rate</div>
                <div className="text-xs text-green-600 mt-1">Predicted for next quarter</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{insights.predictions.timeToHire}</div>
                <div className="text-sm text-blue-700">Days to Hire</div>
                <div className="text-xs text-blue-600 mt-1">Average prediction</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{insights.predictions.retentionRate}%</div>
                <div className="text-sm text-purple-700">Retention Rate</div>
                <div className="text-xs text-purple-600 mt-1">12-month prediction</div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                AI Recommendations
              </h4>
              <div className="space-y-4">
                {insights.predictions.recommendations.map((rec: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      rec.type === "urgent"
                        ? "border-red-500 bg-red-50"
                        : rec.type === "opportunity"
                          ? "border-green-500 bg-green-50"
                          : "border-yellow-500 bg-yellow-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {rec.type === "urgent" ? (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          ) : rec.type === "opportunity" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Zap className="h-4 w-4 text-yellow-600" />
                          )}
                          <span className="font-semibold">{rec.title}</span>
                          <Badge
                            className={
                              rec.impact === "high"
                                ? "bg-red-100 text-red-700"
                                : rec.impact === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }
                          >
                            {rec.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                        <p className="text-sm font-medium text-gray-900">Recommended Action: {rec.action}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
