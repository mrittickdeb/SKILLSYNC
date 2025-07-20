"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Brain, Eye, Mic, User, TrendingUp, AlertCircle, CheckCircle, Star, Target } from "lucide-react"

export function VideoInterviewAnalyzer() {
  const [videoUrl, setVideoUrl] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyzeVideo = async () => {
    if (!videoUrl.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/ai/video-interview-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl,
          candidateId: "sample",
          interviewType: "technical",
        }),
      })
      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("Error analyzing video:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <Video className="h-16 w-16 text-purple-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">🎥 AI Analyzing Video Interview</h3>
            <p className="text-gray-600">Advanced computer vision and speech analysis in progress...</p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Analyzing facial expressions...</div>
              <div className="text-sm text-gray-500">Processing speech patterns...</div>
              <div className="text-sm text-gray-500">Evaluating body language...</div>
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
            <Video className="h-5 w-5 text-blue-600" />
            <span>🎥 AI Video Interview Analyzer</span>
          </CardTitle>
          <CardDescription>
            Upload a video interview for comprehensive AI analysis including facial expressions, speech patterns, and
            body language assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter video URL or upload video file..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && analyzeVideo()}
          />
          <Button
            onClick={analyzeVideo}
            disabled={!videoUrl.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Brain className="h-4 w-4 mr-2" />
            Analyze Video Interview
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Analysis */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-green-700">Overall Score: {analysis.overallScore}/100</h3>
              <p className="text-green-600">Comprehensive video interview analysis complete</p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-700">
                <Star className="h-3 w-3 mr-1" />
                {analysis.hiringRecommendation.decision}
              </Badge>
            </div>
          </div>
          <Progress value={analysis.overallScore} className="h-3" />
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{analysis.confidenceLevel}%</div>
              <div className="text-sm text-gray-600">Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">{analysis.communicationSkills}%</div>
              <div className="text-sm text-gray-600">Communication</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{analysis.technicalCompetency}%</div>
              <div className="text-sm text-gray-600">Technical</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">{analysis.culturalFit}%</div>
              <div className="text-sm text-gray-600">Culture Fit</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="facial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="facial">👁️ Facial</TabsTrigger>
          <TabsTrigger value="speech">🎤 Speech</TabsTrigger>
          <TabsTrigger value="body">🤸 Body Language</TabsTrigger>
          <TabsTrigger value="personality">🧠 Personality</TabsTrigger>
          <TabsTrigger value="highlights">⭐ Highlights</TabsTrigger>
          <TabsTrigger value="recommendation">📋 Report</TabsTrigger>
        </TabsList>

        <TabsContent value="facial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <span>👁️ Facial Expression Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Eye Contact</span>
                      <span className="font-bold text-blue-600">{analysis.facialAnalysis.eyeContact}%</span>
                    </div>
                    <Progress value={analysis.facialAnalysis.eyeContact} className="h-2" />
                    <p className="text-sm text-blue-700 mt-2">Excellent eye contact throughout interview</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Engagement</span>
                      <span className="font-bold text-green-600">{analysis.facialAnalysis.engagement}%</span>
                    </div>
                    <Progress value={analysis.facialAnalysis.engagement} className="h-2" />
                    <p className="text-sm text-green-700 mt-2">Highly engaged and attentive</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Authenticity</span>
                      <span className="font-bold text-purple-600">{analysis.facialAnalysis.authenticity}%</span>
                    </div>
                    <Progress value={analysis.facialAnalysis.authenticity} className="h-2" />
                    <p className="text-sm text-purple-700 mt-2">Genuine and authentic responses</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">😊 Facial Expression Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Positive Expressions</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${analysis.facialAnalysis.facialExpressions.positive}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {analysis.facialAnalysis.facialExpressions.positive}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Neutral Expressions</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: `${analysis.facialAnalysis.facialExpressions.neutral}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {analysis.facialAnalysis.facialExpressions.neutral}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Negative Expressions</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${analysis.facialAnalysis.facialExpressions.negative}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {analysis.facialAnalysis.facialExpressions.negative}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="speech" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-5 w-5 text-green-600" />
                <span>🎤 Speech Pattern Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">🗣️ Speech Quality</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Clarity</span>
                        <span className="font-bold text-green-600">{analysis.speechAnalysis.clarity}%</span>
                      </div>
                      <Progress value={analysis.speechAnalysis.clarity} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pace</span>
                        <span className="font-bold text-blue-600">{analysis.speechAnalysis.pace}%</span>
                      </div>
                      <Progress value={analysis.speechAnalysis.pace} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Vocabulary</span>
                        <span className="font-bold text-purple-600">{analysis.speechAnalysis.vocabulary}%</span>
                      </div>
                      <Progress value={analysis.speechAnalysis.vocabulary} className="h-2" />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📊 Speech Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Filler Words</span>
                        <span className="text-sm font-medium">{analysis.speechAnalysis.fillerWords}/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Pause Pattern</span>
                        <span className="text-sm font-medium">{analysis.speechAnalysis.pausePatterns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Emotional Tone</span>
                        <span className="text-sm font-medium">{analysis.speechAnalysis.emotionalTone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">🎯 Response Quality</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Technical Accuracy</span>
                        <span className="font-bold text-purple-600">{analysis.responseQuality.technicalAccuracy}%</span>
                      </div>
                      <Progress value={analysis.responseQuality.technicalAccuracy} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Problem Solving</span>
                        <span className="font-bold text-green-600">{analysis.responseQuality.problemSolving}%</span>
                      </div>
                      <Progress value={analysis.responseQuality.problemSolving} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Creativity</span>
                        <span className="font-bold text-orange-600">{analysis.responseQuality.creativity}%</span>
                      </div>
                      <Progress value={analysis.responseQuality.creativity} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Structured Thinking</span>
                        <span className="font-bold text-blue-600">{analysis.responseQuality.structuredThinking}%</span>
                      </div>
                      <Progress value={analysis.responseQuality.structuredThinking} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="body" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-orange-600" />
                <span>🤸 Body Language Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Posture</span>
                      <span className="font-bold text-orange-600">{analysis.bodyLanguageAnalysis.posture}%</span>
                    </div>
                    <Progress value={analysis.bodyLanguageAnalysis.posture} className="h-2" />
                    <p className="text-sm text-orange-700 mt-2">Professional and confident posture</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Gestures</span>
                      <span className="font-bold text-blue-600">{analysis.bodyLanguageAnalysis.gestures}%</span>
                    </div>
                    <Progress value={analysis.bodyLanguageAnalysis.gestures} className="h-2" />
                    <p className="text-sm text-blue-700 mt-2">Natural and supportive hand gestures</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Professionalism</span>
                      <span className="font-bold text-green-600">{analysis.bodyLanguageAnalysis.professionalism}%</span>
                    </div>
                    <Progress value={analysis.bodyLanguageAnalysis.professionalism} className="h-2" />
                    <p className="text-sm text-green-700 mt-2">Excellent professional demeanor</p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Nervousness Level</span>
                      <span className="font-bold text-yellow-600">{analysis.bodyLanguageAnalysis.nervousness}%</span>
                    </div>
                    <Progress value={analysis.bodyLanguageAnalysis.nervousness} className="h-2" />
                    <p className="text-sm text-yellow-700 mt-2">Low nervousness - well composed</p>
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
                <Brain className="h-5 w-5 text-purple-600" />
                <span>🧠 Personality Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Big Five Personality Traits</h4>
                  {Object.entries(analysis.personalityInsights).map(([trait, score]: [string, any]) => {
                    if (typeof score === "number") {
                      return (
                        <div key={trait} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium capitalize">{trait.replace(/([A-Z])/g, " $1")}</span>
                            <span className="font-bold text-purple-600">{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      )
                    }
                    return null
                  })}
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">🎯 Key Insights</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Extroversion ({analysis.personalityInsights.extroversion}%):</strong> Balanced social
                        energy, comfortable in both individual and team settings
                      </p>
                      <p>
                        <strong>Conscientiousness ({analysis.personalityInsights.conscientiousness}%):</strong> Highly
                        organized and reliable, strong work ethic
                      </p>
                      <p>
                        <strong>Openness ({analysis.personalityInsights.openness}%):</strong> Creative and open to new
                        experiences, good for innovation
                      </p>
                      <p>
                        <strong>Agreeableness ({analysis.personalityInsights.agreeableness}%):</strong> Collaborative
                        team player with good interpersonal skills
                      </p>
                      <p>
                        <strong>Emotional Stability ({analysis.personalityInsights.emotionalStability}%):</strong> Good
                        stress management and emotional regulation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="highlights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>⭐ Interview Highlights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.interviewHighlights.map((highlight: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{highlight.type}</h4>
                        <p className="text-gray-700 mt-1">{highlight.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{highlight.score}/100</div>
                        <div className="text-sm text-gray-500">{highlight.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>💪 Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.strengths.map((strength: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  <span>🎯 Areas for Improvement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.improvementAreas.map((area: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-orange-50 rounded">
                      <Target className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-orange-800">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>📋 Hiring Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">Final Recommendation</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {analysis.hiringRecommendation.decision}
                    </div>
                    <div className="text-lg text-gray-600">Confidence: {analysis.hiringRecommendation.confidence}%</div>
                    <Progress value={analysis.hiringRecommendation.confidence} className="h-3 mt-2" />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Suggested Role</h4>
                    <p className="text-blue-700">{analysis.hiringRecommendation.suggestedRole}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      Recommended start: {analysis.hiringRecommendation.startDate}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Reasoning</h4>
                    <p className="text-gray-700 text-sm">{analysis.hiringRecommendation.reasoning}</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">🚀 Next Steps</h4>
                    <div className="space-y-2">
                      {analysis.recommendedNextSteps.map((step: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">
                            {index + 1}
                          </div>
                          <span className="text-sm text-purple-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {analysis.redFlags && analysis.redFlags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span>⚠️ Considerations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.redFlags.map((flag: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400"
                    >
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-yellow-800">{flag}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
