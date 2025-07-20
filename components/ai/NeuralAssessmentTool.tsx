"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Zap, Target, TrendingUp, Users, Award, Lightbulb, Activity } from "lucide-react"

export function NeuralAssessmentTool() {
  const [assessment, setAssessment] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runNeuralAssessment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/neural-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentType: "comprehensive",
          candidateData: "sample_data",
          jobContext: "software_engineer",
        }),
      })
      const data = await response.json()
      setAssessment(data)
    } catch (error) {
      console.error("Error in neural assessment:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="relative">
              <Brain className="h-20 w-20 text-blue-600 mx-auto animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="h-8 w-8 text-green-600 animate-bounce" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-blue-900">🧠 Neural Network Processing</h3>
            <p className="text-blue-700">175B parameter transformer analyzing cognitive patterns...</p>
            <div className="flex justify-center space-x-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-12 bg-gradient-to-t from-blue-600 to-green-600 rounded animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
            <div className="text-sm text-blue-600">
              Deep learning analysis • 24 neural layers active • 97.3% accuracy
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!assessment) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span>🧠 Neural Assessment Engine</span>
          </CardTitle>
          <CardDescription>
            Advanced neural network analysis for comprehensive candidate evaluation using 175B parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg text-center">
              <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">Cognitive Analysis</div>
              <div className="text-sm text-gray-600">IQ & reasoning patterns</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold">Emotional Intelligence</div>
              <div className="text-sm text-gray-600">EQ & social skills</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold">Personality Deep Dive</div>
              <div className="text-sm text-gray-600">Big Five & work style</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="font-semibold">Performance Prediction</div>
              <div className="text-sm text-gray-600">Future success modeling</div>
            </div>
          </div>
          <Button
            onClick={runNeuralAssessment}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg py-6"
          >
            <Brain className="h-5 w-5 mr-2" />
            Run Neural Assessment
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Neural Network Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-blue-700">Neural Assessment Complete</h3>
              <p className="text-blue-600">
                Processed in {assessment.processingTime} • {assessment.neuralNetworkArchitecture.accuracy} accuracy
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-blue-100 text-blue-700 mb-2">
                <Brain className="h-3 w-3 mr-1" />
                {assessment.neuralNetworkArchitecture.model}
              </Badge>
              <div className="text-sm text-blue-600">{assessment.neuralNetworkArchitecture.parameters} parameters</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg text-center">
              <div className="text-xl font-bold text-blue-600">{assessment.neuralNetworkArchitecture.layers}</div>
              <div className="text-sm text-gray-600">Neural Layers</div>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <div className="text-xl font-bold text-green-600">
                {assessment.neuralNetworkArchitecture.trainingData}
              </div>
              <div className="text-sm text-gray-600">Training Data</div>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <div className="text-xl font-bold text-purple-600">{assessment.neuralNetworkArchitecture.accuracy}</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cognitive" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="cognitive">🧠 Cognitive</TabsTrigger>
          <TabsTrigger value="emotional">❤️ Emotional</TabsTrigger>
          <TabsTrigger value="personality">👤 Personality</TabsTrigger>
          <TabsTrigger value="technical">💻 Technical</TabsTrigger>
          <TabsTrigger value="performance">📈 Performance</TabsTrigger>
          <TabsTrigger value="insights">💡 Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="cognitive" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span>Cognitive Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {assessment.cognitiveAnalysis.overallIQ}
                    </div>
                    <div className="text-sm text-blue-700">Overall IQ Score</div>
                    <Badge className="mt-2 bg-blue-100 text-blue-700">99th Percentile</Badge>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(assessment.cognitiveAnalysis.breakdown).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={(value / 160) * 100} className="w-20 h-2" />
                          <span className="font-bold text-blue-600">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Cognitive Style & Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-800 mb-1">Cognitive Type</div>
                    <div className="text-purple-700">{assessment.cognitiveAnalysis.cognitiveStyle.type}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <div className="font-bold text-green-600">
                        {assessment.cognitiveAnalysis.learningProfile.learningSpeed}%
                      </div>
                      <div className="text-sm text-green-700">Learning Speed</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                      <div className="font-bold text-blue-600">
                        {assessment.cognitiveAnalysis.learningProfile.retentionRate}%
                      </div>
                      <div className="text-sm text-blue-700">Retention Rate</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-orange-800 mb-1">Learning Style</div>
                    <div className="text-orange-700">
                      {assessment.cognitiveAnalysis.learningProfile.preferredLearningStyle}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emotional" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Emotional Intelligence</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {assessment.emotionalIntelligence.overallEQ}
                    </div>
                    <div className="text-sm text-green-700">Overall EQ Score</div>
                    <Badge className="mt-2 bg-green-100 text-green-700">Superior Range</Badge>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(assessment.emotionalIntelligence.components).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={(value / 150) * 100} className="w-20 h-2" />
                          <span className="font-bold text-green-600">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>👑 Leadership Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {assessment.emotionalIntelligence.leadershipPotential.score}%
                    </div>
                    <div className="text-sm text-purple-700">Leadership Score</div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-800 mb-2">Leadership Style</div>
                    <div className="text-blue-700">{assessment.emotionalIntelligence.leadershipPotential.style}</div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800 mb-2">Strengths</div>
                    <div className="flex flex-wrap gap-2">
                      {assessment.emotionalIntelligence.leadershipPotential.strengths.map(
                        (strength: string, index: number) => (
                          <Badge key={index} className="bg-green-100 text-green-700">
                            {strength}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800 mb-2">Development Areas</div>
                    <div className="flex flex-wrap gap-2">
                      {assessment.emotionalIntelligence.leadershipPotential.developmentAreas.map(
                        (area: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-orange-700 border-orange-300">
                            {area}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="personality" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🌟 Big Five Personality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(assessment.personalityDeepDive.bigFiveProfile).map(
                    ([trait, score]: [string, any]) => (
                      <div key={trait} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium capitalize">{trait}</span>
                          <span className="font-bold text-blue-600">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💼 Work Personality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-800 mb-1">Personality Type</div>
                    <div className="text-blue-700">{assessment.personalityDeepDive.workPersonality.type}</div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800 mb-2">Key Traits</div>
                    <div className="space-y-1">
                      {assessment.personalityDeepDive.workPersonality.traits.map((trait: string, index: number) => (
                        <div key={index} className="text-sm text-gray-700">
                          • {trait}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-gray-800 mb-2">Motivational Drivers</div>
                    <div className="space-y-1">
                      {assessment.personalityDeepDive.workPersonality.motivationalDrivers.map(
                        (driver: string, index: number) => (
                          <div key={index} className="text-sm text-gray-700">
                            • {driver}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🏢 Cultural Fit Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(assessment.personalityDeepDive.culturalFitPrediction).map(
                  ([environment, score]: [string, any]) => (
                    <div key={environment} className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{score}%</div>
                      <div className="text-sm text-gray-700 capitalize">{environment.replace(/([A-Z])/g, " $1")}</div>
                      <Progress value={score} className="mt-2 h-2" />
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>💻 Technical Competency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(assessment.technicalCompetencyMapping.currentSkillLevel).map(
                    ([skill, level]: [string, any]) => (
                      <div key={skill} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium capitalize">{skill.replace(/([A-Z])/g, " $1")}</span>
                          <span className="font-bold text-purple-600">{level}%</span>
                        </div>
                        <Progress value={level} className="h-2" />
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📈 Learning Trajectory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-800 mb-1">Growth Pattern</div>
                    <div className="text-green-700">
                      {assessment.technicalCompetencyMapping.learningTrajectory.projectedGrowth}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="font-semibold text-gray-800">Time to Expertise</div>
                    {Object.entries(assessment.technicalCompetencyMapping.learningTrajectory.timeToExpertise).map(
                      ([category, time]: [string, any]) => (
                        <div key={category} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm capitalize">{category.replace(/([A-Z])/g, " $1")}</span>
                          <span className="font-medium text-blue-600">{time}</span>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-800 mb-1">Specialization</div>
                    <div className="text-purple-700">
                      {assessment.technicalCompetencyMapping.learningTrajectory.specialization}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-orange-600" />
                <span>💡 Innovation Potential</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {assessment.technicalCompetencyMapping.innovationPotential.score}%
                  </div>
                  <div className="text-sm text-orange-700">Innovation Score</div>
                  <Badge className="mt-2 bg-orange-100 text-orange-700">Exceptional</Badge>
                </div>

                <div>
                  <div className="font-semibold text-gray-800 mb-3">Innovation Indicators</div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {assessment.technicalCompetencyMapping.innovationPotential.indicators.map(
                      (indicator: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-2 bg-orange-50 rounded">
                          <Zap className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-orange-800">{indicator}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>📊 Performance Prediction</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">First Year Performance</h4>
                    <div className="space-y-3">
                      {Object.entries(assessment.performancePrediction.firstYearPerformance.probability).map(
                        ([level, prob]: [string, any]) => (
                          <div key={level} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{level.replace(/([A-Z])/g, " $1")}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={prob * 100} className="w-20 h-2" />
                              <span className="font-bold text-green-600">{(prob * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Success Factors</h4>
                    <div className="space-y-1">
                      {assessment.performancePrediction.firstYearPerformance.keySuccessFactors.map(
                        (factor: string, index: number) => (
                          <div key={index} className="text-sm text-blue-700">
                            • {factor}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">Career Trajectory</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Promotion Timeline</span>
                        <span className="font-medium text-purple-600">
                          {assessment.performancePrediction.careerTrajectory.promotionTimeline}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Leadership Readiness</span>
                        <span className="font-medium text-purple-600">
                          {assessment.performancePrediction.careerTrajectory.leadershipReadiness}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Retention Probability</span>
                        <span className="font-medium text-purple-600">
                          {(assessment.performancePrediction.careerTrajectory.retentionProbability * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Specialist Track</h4>
                    <div className="text-orange-700">
                      {assessment.performancePrediction.careerTrajectory.specialistTrack}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚠️ Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {assessment.riskAssessment.overallRisk}
                    </div>
                    <div className="text-sm text-green-700">Overall Risk Level</div>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(assessment.riskAssessment.riskFactors).map(([factor, risk]: [string, any]) => (
                      <div key={factor} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{factor.replace(/([A-Z])/g, " $1")}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={risk * 100} className="w-20 h-2" />
                          <span className="font-bold text-red-600">{(risk * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Mitigation Strategies</h4>
                  <div className="space-y-2">
                    {assessment.riskAssessment.mitigationStrategies.map((strategy: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                        <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-800">{strategy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>🧠 Neural Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">🔍 Hidden Patterns</h4>
                  <div className="space-y-2">
                    {assessment.neuralInsights.hiddenPatterns.map((pattern: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded">
                        <Zap className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-green-800">{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">💪 Unique Strengths</h4>
                  <div className="space-y-2">
                    {assessment.neuralInsights.uniqueStrengths.map((strength: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                        <Award className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-800">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-700 mb-3">🚀 Development Areas</h4>
                  <div className="space-y-2">
                    {assessment.neuralInsights.developmentOpportunities.map((opportunity: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-orange-50 rounded">
                        <TrendingUp className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-orange-800">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Interview Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-3">Focus Areas</h4>
                  <div className="space-y-1">
                    {assessment.recommendedInterviewStrategy.focusAreas.map((area: string, index: number) => (
                      <div key={index} className="text-sm text-purple-700">
                        • {area}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-700 mb-3">Question Types</h4>
                  <div className="space-y-1">
                    {assessment.recommendedInterviewStrategy.questionTypes.map((type: string, index: number) => (
                      <div key={index} className="text-sm text-blue-700">
                        • {type}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700 mb-3">Evaluation Criteria</h4>
                  <div className="space-y-1">
                    {assessment.recommendedInterviewStrategy.evaluationCriteria.map(
                      (criteria: string, index: number) => (
                        <div key={index} className="text-sm text-green-700">
                          • {criteria}
                        </div>
                      ),
                    )}
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
