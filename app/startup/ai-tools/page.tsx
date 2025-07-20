"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoInterviewAnalyzer } from "@/components/ai/VideoInterviewAnalyzer"
import { CodeAssessmentTool } from "@/components/ai/CodeAssessmentTool"
import { NegotiationAssistant } from "@/components/ai/NegotiationAssistant"
import { Badge } from "@/components/ui/badge"
import { Video, Code, DollarSign, Brain, Zap, Target, Users, TrendingUp } from "lucide-react"

export default function AIToolsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🤖 Advanced AI Hiring Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leverage cutting-edge AI technology to revolutionize your hiring process with video analysis, code assessment,
          and negotiation assistance
        </p>
        <div className="flex justify-center space-x-2">
          <Badge className="bg-purple-100 text-purple-700">🧠 AI-Powered</Badge>
          <Badge className="bg-blue-100 text-blue-700">⚡ Real-time Analysis</Badge>
          <Badge className="bg-green-100 text-green-700">🎯 Data-Driven</Badge>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <Video className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🎥 Video Interview AI</h3>
            <p className="text-sm text-purple-600">
              Advanced facial expression, speech pattern, and body language analysis
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🔍 Code Assessment AI</h3>
            <p className="text-sm text-blue-600">Comprehensive code quality, security, and performance analysis</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-green-200">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">💰 Negotiation AI</h3>
            <p className="text-sm text-green-600">Smart negotiation strategies and market intelligence</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="video" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="video" className="flex items-center space-x-2">
            <Video className="h-4 w-4" />
            <span>🎥 Video Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>🔍 Code Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="negotiation" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>💰 Negotiation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>🎥 AI Video Interview Analyzer</span>
              </CardTitle>
              <CardDescription>
                Revolutionary AI technology that analyzes candidate interviews using computer vision and natural
                language processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-purple-700">Accuracy Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bol text-blue-600">12+</div>
                  <div className="text-sm text-blue-700">Analysis Points</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">3min</div>
                  <div className="text-sm text-green-700">Analysis Time</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">Real-time</div>
                  <div className="text-sm text-orange-700">Processing</div>
                </div>
              </div>
              <VideoInterviewAnalyzer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span>🔍 AI Code Assessment Tool</span>
              </CardTitle>
              <CardDescription>
                Advanced static code analysis with security vulnerability detection and performance optimization
                suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-blue-700">Languages</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-green-700">Quality Checks</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">Security</div>
                  <div className="text-sm text-red-700">Vulnerability Scan</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">AI</div>
                  <div className="text-sm text-purple-700">Feedback</div>
                </div>
              </div>
              <CodeAssessmentTool />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="negotiation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>💰 AI Negotiation Assistant</span>
              </CardTitle>
              <CardDescription>
                Intelligent negotiation strategies powered by market data analysis and behavioral psychology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">Market</div>
                  <div className="text-sm text-green-700">Intelligence</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">Custom</div>
                  <div className="text-sm text-blue-700">Strategies</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">Risk</div>
                  <div className="text-sm text-purple-700">Assessment</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">Scripts</div>
                  <div className="text-sm text-orange-700">Generated</div>
                </div>
              </div>
              <NegotiationAssistant />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Features Preview */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>🚀 Coming Soon: More AI Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <h4 className="font-semibold text-gray-800">🤝 Team Compatibility AI</h4>
              <p className="text-sm text-gray-600">Analyze team dynamics and cultural fit</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <Brain className="h-8 w-8 text-green-600 mb-2" />
              <h4 className="font-semibold text-gray-800">🧠 Personality Matching</h4>
              <p className="text-sm text-gray-600">Deep personality compatibility analysis</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <Target className="h-8 w-8 text-orange-600 mb-2" />
              <h4 className="font-semibold text-gray-800">📊 Predictive Analytics</h4>
              <p className="text-sm text-gray-600">Predict candidate success and retention</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
