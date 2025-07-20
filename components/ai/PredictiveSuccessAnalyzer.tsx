"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Users, Clock, Target, AlertTriangle, CheckCircle } from "lucide-react"

export function PredictiveSuccessAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState<any>(null)

  const runPrediction = async () => {
    setAnalyzing(true)
    try {
      const response = await fetch("/api/ai/predictive-success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentProfile: { id: "1", skills: ["React", "TypeScript", "Node.js"] },
          opportunityDetails: { role: "Frontend Developer", company: "TechStartup" },
        }),
      })
      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error("Error running prediction:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  if (analyzing) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-8">
          <div className="flex items-center space-x-4">
            <div className="animate-pulse">
              <Brain className="h-10 w-10 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-900">🔮 AI Predicting Success</h3>
              <p className="text-purple-700">Running advanced ML models to predict job performance...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!prediction) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span>🔮 Predictive Success Analyzer</span>
          </CardTitle>
          <CardDescription>
            Use advanced ML to predict job performance, retention, and career trajectory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runPrediction} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Brain className="h-4 w-4 mr-2" />
            Predict Success
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Success Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <span>🎯 Success Prediction Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-green-600 mb-2">{prediction.overallSuccessScore}%</div>
            <div className="text-lg text-green-700 mb-1">Predicted Success Score</div>
            <div className="text-sm text-gray-600">Confidence: {prediction.confidenceInterval}</div>
          </div>
          <Progress value={prediction.overallSuccessScore} className="h-3" />
        </CardContent>
      </Card>

      {/* Performance Prediction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>📊 Performance Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(prediction.performancePrediction).map(([metric, score]) => (
              <div key={metric} className="space-y-2">
                <div className="flex justify-between">
                  <span className="capitalize font-medium">{metric.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-sm text-gray-600">{score}%</span>
                </div>
                <Progress value={score as number} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Retention Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>🏢 Retention Prediction</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {prediction.retentionAnalysis.probabilityStay6Months}%
              </div>
              <div className="text-sm text-blue-700">6 Months</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {prediction.retentionAnalysis.probabilityStay1Year}%
              </div>
              <div className="text-sm text-green-700">1 Year</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {prediction.retentionAnalysis.probabilityStay2Years}%
              </div>
              <div className="text-sm text-purple-700">2 Years</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Key Retention Factors:</h4>
            <div className="space-y-2">
              {prediction.retentionAnalysis.keyRetentionFactors.map((factor: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            <span>⚠️ Risk Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Badge
              className={`${prediction.riskAssessment.overallRisk === "Low" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
            >
              Overall Risk: {prediction.riskAssessment.overallRisk}
            </Badge>
          </div>
          <div className="space-y-4">
            {prediction.riskAssessment.riskFactors.map((risk: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{risk.factor}</h5>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{risk.probability}% chance</Badge>
                    <Badge
                      className={risk.impact === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {risk.impact} impact
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Mitigation:</strong> {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>⚡ Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-800">Expected Productivity</div>
                <div className="text-sm text-blue-700">{prediction.performanceMetrics.expectedProductivity}</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-800">Time to Productivity</div>
                <div className="text-sm text-green-700">{prediction.performanceMetrics.timeToProductivity}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-semibold text-purple-800">Learning Curve</div>
                <div className="text-sm text-purple-700">{prediction.performanceMetrics.learningCurve}</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="font-semibold text-orange-800">Mentorship Needs</div>
                <div className="text-sm text-orange-700">{prediction.performanceMetrics.mentorshipNeeds}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>🤖 AI Insights & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Key Insights:</h4>
              <div className="space-y-2">
                {prediction.aiInsights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Brain className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Recommended Actions:</h4>
              <div className="space-y-2">
                {prediction.recommendedActions.map((action: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
