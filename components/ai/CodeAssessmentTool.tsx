"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  Brain,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  Award,
  TrendingUp,
  Shield,
  Clock,
  Lightbulb,
  BarChart3,
} from "lucide-react"

export function CodeAssessmentTool() {
  const [code, setCode] = useState("")
  const [assessment, setAssessment] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyzeCode = async () => {
    if (!code.trim()) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setAssessment({
        overallScore: 87,
        language: "JavaScript",
        complexity: "Medium",
        maintainability: 92,
        performance: 78,
        security: 85,
        testCoverage: 65,
        codeQuality: {
          readability: 89,
          structure: 85,
          documentation: 72,
          bestPractices: 88,
        },
        strengths: [
          "Clean and readable code structure",
          "Good use of modern JavaScript features",
          "Proper error handling implementation",
          "Consistent naming conventions",
          "Well-organized function structure",
        ],
        improvementAreas: [
          "Add more comprehensive comments",
          "Implement unit tests for better coverage",
          "Consider performance optimization for loops",
          "Add input validation for edge cases",
          "Improve error messages for better debugging",
        ],
        securityVulnerabilities: [
          {
            severity: "Medium",
            issue: "Potential XSS vulnerability in user input handling",
            line: 23,
            suggestion: "Sanitize user inputs before processing",
          },
          {
            severity: "Low",
            issue: "Missing input validation",
            line: 45,
            suggestion: "Add proper input validation and sanitization",
          },
        ],
        performanceInsights: [
          {
            type: "Optimization",
            description: "Loop optimization opportunity",
            impact: "Medium",
            suggestion: "Consider using map() instead of forEach() for better performance",
          },
          {
            type: "Memory",
            description: "Potential memory leak",
            impact: "Low",
            suggestion: "Clear event listeners in cleanup functions",
          },
        ],
        testingSuggestions: [
          "Add unit tests for core functions",
          "Implement integration tests for API calls",
          "Add edge case testing for input validation",
          "Consider adding performance benchmarks",
        ],
        nextLevelRecommendations: [
          "Implement TypeScript for better type safety",
          "Add comprehensive error logging",
          "Consider implementing design patterns",
          "Add automated code quality checks",
        ],
        comparisonWithPeers: {
          percentile: 78,
          aboveAverage: ["Code Structure", "Error Handling", "Readability"],
          belowAverage: ["Test Coverage", "Documentation"],
        },
      })
    } catch (error) {
      console.error("Error analyzing code:", error)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-50"
    if (score >= 70) return "bg-yellow-50"
    return "bg-red-50"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-blue-600" />
          <span>🔍 AI Code Assessment Tool</span>
        </CardTitle>
        <CardDescription>
          Advanced AI-powered code analysis with security, performance, and quality insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Code Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Paste your code for analysis:</label>
          <Textarea
            placeholder="// Paste your JavaScript, Python, or other code here...
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">{code.length} characters</div>
            <Button
              onClick={analyzeCode}
              disabled={!code.trim() || loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {loading ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Code
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Assessment Results */}
        {assessment && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className={`p-6 rounded-lg ${getScoreBg(assessment.overallScore)}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Overall Assessment</h3>
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                  <Award className="h-3 w-3 mr-1" />
                  {assessment.overallScore}/100
                </Badge>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.maintainability)}`}>
                    {assessment.maintainability}
                  </div>
                  <div className="text-sm text-gray-600">Maintainability</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.performance)}`}>
                    {assessment.performance}
                  </div>
                  <div className="text-sm text-gray-600">Performance</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.security)}`}>
                    {assessment.security}
                  </div>
                  <div className="text-sm text-gray-600">Security</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.testCoverage)}`}>
                    {assessment.testCoverage}
                  </div>
                  <div className="text-sm text-gray-600">Test Coverage</div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="quality" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="quality">Quality</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="testing">Testing</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="quality" className="space-y-4">
                {/* Code Quality Metrics */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
                    Code Quality Metrics
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(assessment.codeQuality).map(([key, value]) => (
                      <div key={key} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className={`font-bold ${getScoreColor(value as number)}`}>{value}/100</span>
                        </div>
                        <Progress value={value as number} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Strengths
                  </h4>
                  <div className="space-y-2">
                    {(assessment.strengths || []).map((strength: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-green-800">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvement Areas */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                    Areas for Improvement
                  </h4>
                  <div className="space-y-2">
                    {(assessment.improvementAreas || []).map((area: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-yellow-50 rounded">
                        <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-yellow-800">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-red-600" />
                    Security Analysis
                  </h4>
                  {(assessment.securityVulnerabilities || []).length > 0 ? (
                    <div className="space-y-3">
                      {assessment.securityVulnerabilities.map((vuln: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg bg-red-50 border-red-200">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="font-medium">Line {vuln.line}</span>
                            </div>
                            <Badge
                              className={
                                vuln.severity === "High"
                                  ? "bg-red-100 text-red-700"
                                  : vuln.severity === "Medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-blue-100 text-blue-700"
                              }
                            >
                              {vuln.severity}
                            </Badge>
                          </div>
                          <div className="text-sm text-red-800 mb-2">{vuln.issue}</div>
                          <div className="text-sm text-red-700 bg-red-100 p-2 rounded">
                            <strong>Suggestion:</strong> {vuln.suggestion}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-green-800 font-medium">No security vulnerabilities detected!</div>
                      <div className="text-sm text-green-700">Your code follows security best practices.</div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-orange-600" />
                    Performance Insights
                  </h4>
                  <div className="space-y-3">
                    {(assessment.performanceInsights || []).map((insight: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-orange-600" />
                            <span className="font-medium">{insight.type}</span>
                          </div>
                          <Badge
                            className={
                              insight.impact === "High"
                                ? "bg-red-100 text-red-700"
                                : insight.impact === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }
                          >
                            {insight.impact} Impact
                          </Badge>
                        </div>
                        <div className="text-sm text-orange-800 mb-2">{insight.description}</div>
                        <div className="text-sm text-orange-700 bg-orange-100 p-2 rounded">
                          <strong>Suggestion:</strong> {insight.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="testing" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-purple-600" />
                    Testing Recommendations
                  </h4>
                  <div className="space-y-2">
                    {(assessment.testingSuggestions || []).map((suggestion: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-purple-50 rounded">
                        <Target className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-purple-800">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                    Next Level Recommendations
                  </h4>
                  <div className="space-y-2">
                    {(assessment.nextLevelRecommendations || []).map((rec: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded">
                        <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-green-600" />
                    Peer Comparison
                  </h4>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-green-600">
                        {assessment.comparisonWithPeers?.percentile || 0}th
                      </div>
                      <div className="text-sm text-green-700">Percentile</div>
                      <div className="text-xs text-gray-600">
                        Your code quality ranks above {assessment.comparisonWithPeers?.percentile || 0}% of submissions
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="font-medium text-green-800 mb-2">Above Average:</div>
                        <div className="space-y-1">
                          {(assessment.comparisonWithPeers?.aboveAverage || []).map((item: string, index: number) => (
                            <Badge key={index} className="bg-green-100 text-green-700 mr-1 mb-1">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-orange-800 mb-2">Below Average:</div>
                        <div className="space-y-1">
                          {(assessment.comparisonWithPeers?.belowAverage || []).map((item: string, index: number) => (
                            <Badge key={index} className="bg-orange-100 text-orange-700 mr-1 mb-1">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
