"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  DollarSign,
  Users,
  Lightbulb,
  Zap,
} from "lucide-react"

export function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyzeResume = async () => {
    if (!resumeText.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/ai/resume-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription: "Frontend Developer position",
          candidateId: "sample",
        }),
      })
      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("Error analyzing resume:", error)
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
            <h3 className="text-xl font-semibold">🤖 AI Analyzing Resume</h3>
            <p className="text-gray-600">Advanced machine learning algorithms are processing the resume...</p>
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
            <FileText className="h-5 w-5 text-blue-600" />
            <span>🧠 AI Resume Analyzer</span>
          </CardTitle>
          <CardDescription>
            Upload or paste a resume for comprehensive AI analysis including ATS compatibility, skill matching, and
            career insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste the resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={10}
            className="min-h-[200px]"
          />
          <Button
            onClick={analyzeResume}
            disabled={!resumeText.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Brain className="h-4 w-4 mr-2" />
            Analyze with AI
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-green-700">Overall Score: {analysis.overallScore}/100</h3>
              <p className="text-green-600">Comprehensive AI analysis complete</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-blue-600">ATS Compatible: {analysis.atsCompatibility}%</div>
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                Analysis Complete
              </Badge>
            </div>
          </div>
          <Progress value={analysis.overallScore} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="skills">🎯 Skills</TabsTrigger>
          <TabsTrigger value="experience">💼 Experience</TabsTrigger>
          <TabsTrigger value="personality">🧠 Personality</TabsTrigger>
          <TabsTrigger value="career">📈 Career</TabsTrigger>
          <TabsTrigger value="salary">💰 Salary</TabsTrigger>
          <TabsTrigger value="interview">🎤 Interview</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Skills Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">✅ Matched Skills</h4>
                  <div className="space-y-2">
                    {analysis.skillsMatch.matched.map((skill: string, index: number) => (
                      <Badge key={index} className="bg-green-100 text-green-700 mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{analysis.skillsMatch.score}%</div>
                    <div className="text-sm text-green-700">Skills Match Score</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">⚠️ Missing Skills</h4>
                  <div className="space-y-2">
                    {analysis.skillsMatch.missing.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-orange-700 border-orange-300 mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <div className="text-sm text-orange-700">Consider learning these skills to improve match score</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">🎯 Bonus Skills</h4>
                  <div className="space-y-2">
                    {analysis.skillsMatch.bonus.map((skill: string, index: number) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700 mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-700">Additional valuable skills that set you apart</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>💼 Experience Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Relevant Experience</span>
                      <span className="font-bold text-blue-600">{analysis.experienceAnalysis.relevantExperience}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Project Quality</span>
                      <span className="font-bold text-green-600">{analysis.experienceAnalysis.projectQuality}%</span>
                    </div>
                    <Progress value={analysis.experienceAnalysis.projectQuality} className="h-2" />
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Leadership Indicators</span>
                      <span className="font-bold text-purple-600">
                        {analysis.experienceAnalysis.leadershipIndicators}%
                      </span>
                    </div>
                    <Progress value={analysis.experienceAnalysis.leadershipIndicators} className="h-2" />
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Innovation Score</span>
                      <span className="font-bold text-orange-600">{analysis.experienceAnalysis.innovationScore}%</span>
                    </div>
                    <Progress value={analysis.experienceAnalysis.innovationScore} className="h-2" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3">💪 Key Strengths</h4>
                    <div className="space-y-2">
                      {analysis.strengths.map((strength: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-800">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 mb-3">🚨 Red Flags</h4>
                    <div className="space-y-2">
                      {analysis.redFlags.map((flag: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 rounded">
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-800">{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>🧠 Personality & Culture Fit</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Work Style</h4>
                    <p className="text-purple-700">{analysis.personalityInsights.workStyle}</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Communication Style</h4>
                    <p className="text-blue-700">{analysis.personalityInsights.communicationStyle}</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Problem Solving</h4>
                    <p className="text-green-700">{analysis.personalityInsights.problemSolving}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-3">🚀 Startup Readiness</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Startup Readiness</span>
                        <span className="font-bold text-purple-600">
                          {analysis.cultureFitAnalysis.startupReadiness}%
                        </span>
                      </div>
                      <Progress value={analysis.cultureFitAnalysis.startupReadiness} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Adaptability</span>
                        <span className="font-bold text-blue-600">{analysis.cultureFitAnalysis.adaptability}%</span>
                      </div>
                      <Progress value={analysis.cultureFitAnalysis.adaptability} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Risk Tolerance</span>
                        <span className="font-bold text-green-600">{analysis.cultureFitAnalysis.riskTolerance}%</span>
                      </div>
                      <Progress value={analysis.cultureFitAnalysis.riskTolerance} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Innovation Mindset</span>
                        <span className="font-bold text-orange-600">
                          {analysis.cultureFitAnalysis.innovationMindset}%
                        </span>
                      </div>
                      <Progress value={analysis.cultureFitAnalysis.innovationMindset} className="h-2" />
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Learning Agility</h4>
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      {analysis.personalityInsights.learningAgility}%
                    </div>
                    <p className="text-sm text-yellow-700">Exceptional ability to learn and adapt</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>📈 Career Trajectory Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Current Level</h4>
                  <div className="text-xl font-bold text-blue-600 mb-2">{analysis.careerTrajectory.currentLevel}</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Growth Potential</span>
                      <span className="font-bold text-blue-600">{analysis.careerTrajectory.growthPotential}%</span>
                    </div>
                    <Progress value={analysis.careerTrajectory.growthPotential} className="h-2" />
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Next Role Readiness</h4>
                  <div className="text-xl font-bold text-green-600 mb-2">
                    {analysis.careerTrajectory.nextRoleReadiness}%
                  </div>
                  <p className="text-sm text-green-700">Ready for senior-level responsibilities with some mentoring</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Specializations</h4>
                  <div className="space-y-1">
                    {analysis.careerTrajectory.specializations.map((spec: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-purple-700 border-purple-300 mr-1 mb-1">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>💰 Salary Intelligence</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">Predicted Salary Range</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">{analysis.salaryPrediction.range}</div>
                    <p className="text-sm text-gray-600">Based on skills, experience, and market data</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">Salary Factors</h4>
                    <div className="space-y-2">
                      {analysis.salaryPrediction.factors.map((factor: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-blue-700">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">💡 Negotiation Tips</h4>
                    <div className="space-y-2">
                      {analysis.salaryPrediction.negotiationTips.map((tip: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Lightbulb className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-purple-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">📊 Market Position</h4>
                    <p className="text-sm text-orange-700 mb-3">
                      Your profile is in the top 25% of candidates for similar roles
                    </p>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Strong negotiating position</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span>🎤 Interview Preparation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-3">🎯 Likely Questions</h4>
                    <div className="space-y-3">
                      {analysis.interviewPrep.likelyQuestions.map((question: string, index: number) => (
                        <div key={index} className="p-3 bg-white rounded border-l-4 border-yellow-400">
                          <p className="text-sm text-gray-700">{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">💡 Answer Strategies</h4>
                    <div className="space-y-3">
                      {analysis.interviewPrep.suggestedAnswers.map((strategy: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-700">{strategy}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Key Focus Areas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">
                          Highlight technical projects with measurable impact
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">Demonstrate problem-solving methodology</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">Show enthusiasm for learning and growth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Improvement Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-orange-600" />
            <span>🚀 AI Improvement Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.improvementAreas.map((area: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-orange-800">{area}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex space-x-3">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              Generate Optimized Resume
            </Button>
            <Button variant="outline">
              <Brain className="h-4 w-4 mr-2" />
              Get Learning Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
