"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Brain, TrendingUp, Target, Zap, CheckCircle, AlertCircle, Users, Eye } from "lucide-react"

export function JobOptimizer() {
  const [jobDescription, setJobDescription] = useState("")
  const [optimization, setOptimization] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const optimizeJob = async () => {
    if (!jobDescription.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/ai/job-optimizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          companyInfo: "Tech startup",
          targetAudience: "Students and early career",
        }),
      })
      const data = await response.json()
      setOptimization(data)
    } catch (error) {
      console.error("Error optimizing job:", error)
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
            <h3 className="text-xl font-semibold">🤖 AI Optimizing Job Description</h3>
            <p className="text-gray-600">Analyzing language, inclusivity, and market appeal...</p>
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

  if (!optimization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>🚀 AI Job Description Optimizer</span>
          </CardTitle>
          <CardDescription>
            Optimize your job descriptions with AI to increase applications, improve inclusivity, and attract top talent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={12}
            className="min-h-[300px]"
          />
          <Button
            onClick={optimizeJob}
            disabled={!jobDescription.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Brain className="h-4 w-4 mr-2" />
            Optimize with AI
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Score Improvement */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-green-700">
                Score Improved: {optimization.currentScore} → {optimization.optimizedScore}
              </h3>
              <p className="text-green-600">
                +{optimization.optimizedScore - optimization.currentScore} point improvement
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                {Math.round(
                  ((optimization.optimizedScore - optimization.currentScore) / optimization.currentScore) * 100,
                )}
                % Better
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Before</span>
              <span>{optimization.currentScore}/100</span>
            </div>
            <Progress value={optimization.currentScore} className="h-2" />
            <div className="flex justify-between text-sm">
              <span>After</span>
              <span>{optimization.optimizedScore}/100</span>
            </div>
            <Progress value={optimization.optimizedScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="improvements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="improvements">📈 Improvements</TabsTrigger>
          <TabsTrigger value="keywords">🔍 Keywords</TabsTrigger>
          <TabsTrigger value="competitive">🏆 Competitive</TabsTrigger>
          <TabsTrigger value="optimized">✨ Optimized</TabsTrigger>
          <TabsTrigger value="predictions">🔮 Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="improvements" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Inclusivity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Before</span>
                    <span className="font-bold text-red-600">{optimization.improvements.inclusivity.before}%</span>
                  </div>
                  <Progress value={optimization.improvements.inclusivity.before} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">After</span>
                    <span className="font-bold text-green-600">{optimization.improvements.inclusivity.after}%</span>
                  </div>
                  <Progress value={optimization.improvements.inclusivity.after} className="h-2" />

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Changes Made:</h4>
                    {optimization.improvements.inclusivity.changes.map((change: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span>Clarity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Before</span>
                    <span className="font-bold text-orange-600">{optimization.improvements.clarity.before}%</span>
                  </div>
                  <Progress value={optimization.improvements.clarity.before} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">After</span>
                    <span className="font-bold text-green-600">{optimization.improvements.clarity.after}%</span>
                  </div>
                  <Progress value={optimization.improvements.clarity.after} className="h-2" />

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Changes Made:</h4>
                    {optimization.improvements.clarity.changes.map((change: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span>Appeal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Before</span>
                    <span className="font-bold text-yellow-600">{optimization.improvements.appeal.before}%</span>
                  </div>
                  <Progress value={optimization.improvements.appeal.before} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">After</span>
                    <span className="font-bold text-green-600">{optimization.improvements.appeal.after}%</span>
                  </div>
                  <Progress value={optimization.improvements.appeal.after} className="h-2" />

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Changes Made:</h4>
                    {optimization.improvements.appeal.changes.map((change: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{change}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🔍 Keyword Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">❌ Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {optimization.keywordOptimization.missing.map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-red-700 border-red-300">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">⚠️ Overused Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {optimization.keywordOptimization.overused.map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-orange-700 border-orange-300">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">🔥 Trending Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {optimization.keywordOptimization.trending.map((keyword: string, index: number) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700 mb-2">✅ Recommended Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {optimization.keywordOptimization.recommended.map((keyword: string, index: number) => (
                      <Badge key={index} className="bg-green-100 text-green-700">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>🏆 Competitive Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">💰 Salary Position</h4>
                    <p className="text-red-700">{optimization.competitiveAnalysis.salaryPosition}</p>
                    <div className="mt-2">
                      <AlertCircle className="h-4 w-4 text-red-600 inline mr-2" />
                      <span className="text-sm text-red-600">Consider salary adjustment</span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📦 Benefits Package</h4>
                    <p className="text-blue-700">{optimization.competitiveAnalysis.benefitsComparison}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🌟 Unique Selling Points</h4>
                    <div className="space-y-2">
                      {optimization.competitiveAnalysis.uniqueSellingPoints.map((point: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-700">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimized" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span>✨ AI-Optimized Job Description</span>
              </CardTitle>
              <CardDescription>
                Your job description has been optimized for better reach, inclusivity, and candidate appeal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gray-50 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {optimization.optimizedVersion}
                </pre>
              </div>
              <div className="mt-4 flex space-x-3">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                  <FileText className="h-4 w-4 mr-2" />
                  Copy Optimized Version
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>🔮 AI Predictions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {optimization.predictions.expectedApplications}
                    </div>
                    <div className="text-sm text-blue-700">Expected Applications</div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {optimization.predictions.qualityScore}/10
                    </div>
                    <div className="text-sm text-green-700">Quality Score</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{optimization.predictions.timeToFill}</div>
                    <div className="text-sm text-purple-700">Time to Fill</div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {optimization.predictions.responseRate}
                    </div>
                    <div className="text-sm text-orange-700">Response Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>💡 AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimization.aiRecommendations.map((rec: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                        <p className="text-gray-700 mt-1">{rec.suggestion}</p>
                        <p className="text-sm text-gray-600 mt-2">{rec.reasoning}</p>
                      </div>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
