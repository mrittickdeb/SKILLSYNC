"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Brain, TrendingUp, BookOpen, Clock, Lightbulb, Zap, Star, Award } from "lucide-react"

export function SkillGapAnalyzer() {
  const [targetRole, setTargetRole] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyzeSkillGap = async () => {
    if (!targetRole.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/ai/skill-gap-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentProfile: "Sample student profile",
          targetRole,
          industryTrends: "Current market trends",
        }),
      })
      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("Error analyzing skill gap:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <Brain className="h-16 w-16 text-purple-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">🤖 AI Analyzing Skill Gaps</h3>
            <p className="text-gray-600">Comparing your skills with market requirements...</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div
                className="w-3 h-3 bg-green-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>🎯 AI Skill Gap Analyzer</span>
          </CardTitle>
          <CardDescription>
            Analyze your skill gaps for any role and get personalized learning recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter target role (e.g., Full-Stack Developer, Data Scientist)"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && analyzeSkillGap()}
          />
          <Button
            onClick={analyzeSkillGap}
            disabled={!targetRole.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Brain className="h-4 w-4 mr-2" />
            Analyze Skill Gap
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Readiness */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-blue-700">Role Readiness: {analysis.overallReadiness}%</h3>
              <p className="text-blue-600">For {targetRole} position</p>
            </div>
            <div className="text-right">
              <Badge className="bg-blue-100 text-blue-700">
                <Star className="h-3 w-3 mr-1" />
                {analysis.overallReadiness >= 80
                  ? "Excellent"
                  : analysis.overallReadiness >= 60
                    ? "Good"
                    : "Needs Work"}
              </Badge>
            </div>
          </div>
          <Progress value={analysis.overallReadiness} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="gaps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="gaps">🎯 Skill Gaps</TabsTrigger>
          <TabsTrigger value="strengths">💪 Strengths</TabsTrigger>
          <TabsTrigger value="career">📈 Career Path</TabsTrigger>
          <TabsTrigger value="learning">📚 Learning Plan</TabsTrigger>
          <TabsTrigger value="insights">🔍 Market Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="gaps" className="space-y-6">
          <div className="space-y-6">
            {analysis.skillGaps.map((gap: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{gap.skill}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge
                          className={
                            gap.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : gap.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }
                        >
                          {gap.priority} Priority
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700">Market Demand: {gap.marketDemand}%</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{gap.salaryImpact}</div>
                      <div className="text-sm text-gray-600">Salary Impact</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Current Level</span>
                          <span>{gap.currentLevel}%</span>
                        </div>
                        <Progress value={gap.currentLevel} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Required Level</span>
                          <span>{gap.requiredLevel}%</span>
                        </div>
                        <Progress value={gap.requiredLevel} className="h-2" />
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span>{gap.timeToLearn}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-green-600" />
                          <span>{gap.resources.length} resources</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">📚 Learning Path</h4>
                        <div className="space-y-2">
                          {gap.learningPath.map((step: string, stepIndex: number) => (
                            <div key={stepIndex} className="flex items-start space-x-2">
                              <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                {stepIndex + 1}
                              </div>
                              <span className="text-sm text-gray-700">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🔗 Resources</h4>
                        <div className="space-y-1">
                          {gap.resources.map((resource: string, resIndex: number) => (
                            <div key={resIndex} className="text-sm text-blue-600 hover:underline cursor-pointer">
                              • {resource}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                    <Button size="sm" variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Set Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strengths" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {analysis.strengths.map((strength: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{strength.skill}</h3>
                      <Badge className="bg-green-100 text-green-700 mt-2">{strength.marketValue} Market Value</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{strength.level}%</div>
                      <div className="text-sm text-gray-600">Proficiency</div>
                    </div>
                  </div>
                  <Progress value={strength.level} className="h-2 mb-3" />
                  <p className="text-sm text-gray-700">{strength.competitiveAdvantage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="career" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>📈 Career Trajectory</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-800 mb-2">Current Position</h4>
                    <div className="text-lg font-bold text-blue-600 mb-1">
                      {analysis.careerProjections.currentTrajectory.role}
                    </div>
                    <div className="text-sm text-blue-700 mb-2">
                      {analysis.careerProjections.currentTrajectory.salaryRange}
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">
                      {analysis.careerProjections.currentTrajectory.timeframe}
                    </Badge>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <h4 className="font-semibold text-green-800 mb-2">With Skill Development</h4>
                    <div className="text-lg font-bold text-green-600 mb-1">
                      {analysis.careerProjections.withSkillDevelopment.role}
                    </div>
                    <div className="text-sm text-green-700 mb-2">
                      {analysis.careerProjections.withSkillDevelopment.salaryRange}
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      {analysis.careerProjections.withSkillDevelopment.timeframe}
                    </Badge>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-800 mb-2">Long-term Potential</h4>
                    <div className="text-lg font-bold text-purple-600 mb-1">
                      {analysis.careerProjections.longTermPotential.role}
                    </div>
                    <div className="text-sm text-purple-700 mb-2">
                      {analysis.careerProjections.longTermPotential.salaryRange}
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">
                      {analysis.careerProjections.longTermPotential.timeframe}
                    </Badge>
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">💡 Personalized Recommendations</h4>
                    <div className="space-y-4">
                      {analysis.personalizedRecommendations.map((rec: any, index: number) => (
                        <div key={index} className="flex items-start space-x-4 p-3 bg-white rounded-lg">
                          <div className="p-2 bg-blue-100 rounded-full">
                            {rec.type === "Immediate Action" && <Zap className="h-4 w-4 text-blue-600" />}
                            {rec.type === "Project Suggestion" && <Target className="h-4 w-4 text-green-600" />}
                            {rec.type === "Networking" && <Award className="h-4 w-4 text-purple-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-gray-900">{rec.title}</h5>
                              <Badge
                                className={
                                  rec.impact === "High"
                                    ? "bg-red-100 text-red-700"
                                    : rec.impact === "Medium"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                }
                              >
                                {rec.impact} Impact
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{rec.timeline}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>📚 12-Week Learning Plan</span>
              </CardTitle>
              <CardDescription>AI-generated personalized learning roadmap to achieve your career goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analysis.learningPlan).map(([period, tasks]: [string, any]) => (
                  <div key={period} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3 capitalize">
                      {period.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {tasks.map((task: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex space-x-3">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start Learning Plan
                </Button>
                <Button variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Set Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>🔍 Industry Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🔥 Trending Skills</h4>
                    <div className="space-y-3">
                      {analysis.industryInsights.trendingSkills.map((skill: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{skill.skill}</div>
                            <div className="text-sm text-gray-600">{skill.demand} demand</div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">{skill.growth}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🚀 Emerging Opportunities</h4>
                    <div className="space-y-2">
                      {analysis.industryInsights.emergingOpportunities.map((opp: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-blue-800">{opp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">🔮 Market Predictions</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="font-medium text-yellow-800">Next Quarter</div>
                        <div className="text-sm text-yellow-700">
                          {analysis.industryInsights.marketPredictions.nextQuarter}
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800">Next Year</div>
                        <div className="text-sm text-green-700">
                          {analysis.industryInsights.marketPredictions.nextYear}
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="font-medium text-purple-800">Long Term</div>
                        <div className="text-sm text-purple-700">
                          {analysis.industryInsights.marketPredictions.longTerm}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
