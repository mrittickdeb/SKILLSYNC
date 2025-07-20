"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { VideoInterviewAnalyzer } from "@/components/ai/VideoInterviewAnalyzer"
import { CodeAssessmentTool } from "@/components/ai/CodeAssessmentTool"
import { NegotiationAssistant } from "@/components/ai/NegotiationAssistant"
import { QuantumMatchingEngine } from "@/components/ai/QuantumMatchingEngine"
import { NeuralAssessmentTool } from "@/components/ai/NeuralAssessmentTool"
import { BlockchainVerificationSystem } from "@/components/ai/BlockchainVerificationSystem"
import { Brain, Atom, Shield, Video, Code, Handshake, Sparkles, Zap, Target } from "lucide-react"

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState("quantum")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Next-Generation AI Tools • Enterprise Grade • 99.9% Uptime</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🚀 Advanced{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Tools</span>{" "}
            Suite
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the world's most advanced AI-powered hiring and assessment tools. From quantum matching to
            blockchain verification, revolutionize your talent acquisition process.
          </p>
        </div>

        {/* Tool Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Atom className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Quantum AI</h3>
                  <p className="text-sm text-gray-600">Next-gen processing</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-700">Quantum Matching</Badge>
                <Badge className="bg-purple-100 text-purple-700">Neural Assessment</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Blockchain Security</h3>
                  <p className="text-sm text-gray-600">Immutable verification</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-700">Credential Verification</Badge>
                <Badge className="bg-blue-100 text-blue-700">Smart Contracts</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Video className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Assessment Tools</h3>
                  <p className="text-sm text-gray-600">Comprehensive evaluation</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-100 text-purple-700">Video Analysis</Badge>
                <Badge className="bg-orange-100 text-orange-700">Code Assessment</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Tools Interface */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="text-2xl text-center">🛠️ AI Tools Dashboard</CardTitle>
            <CardDescription className="text-center">
              Select an AI tool to experience the future of talent assessment and matching
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 h-16 bg-gray-50">
                <TabsTrigger value="quantum" className="flex flex-col space-y-1">
                  <Atom className="h-4 w-4" />
                  <span className="text-xs">Quantum</span>
                </TabsTrigger>
                <TabsTrigger value="neural" className="flex flex-col space-y-1">
                  <Brain className="h-4 w-4" />
                  <span className="text-xs">Neural</span>
                </TabsTrigger>
                <TabsTrigger value="blockchain" className="flex flex-col space-y-1">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">Blockchain</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex flex-col space-y-1">
                  <Video className="h-4 w-4" />
                  <span className="text-xs">Video</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex flex-col space-y-1">
                  <Code className="h-4 w-4" />
                  <span className="text-xs">Code</span>
                </TabsTrigger>
                <TabsTrigger value="negotiation" className="flex flex-col space-y-1">
                  <Handshake className="h-4 w-4" />
                  <span className="text-xs">Negotiation</span>
                </TabsTrigger>
              </TabsList>

              <div className="p-8">
                <TabsContent value="quantum" className="mt-0">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">⚛️ Quantum Matching Engine</h3>
                    <p className="text-gray-600">
                      Revolutionary quantum-inspired algorithms for unprecedented matching accuracy. Process 10,000+
                      dimensional candidate spaces in seconds.
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Badge className="bg-purple-100 text-purple-700">
                        <Zap className="h-3 w-3 mr-1" />
                        1000x Faster
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700">
                        <Target className="h-3 w-3 mr-1" />
                        97.3% Accuracy
                      </Badge>
                      <Badge className="bg-green-100 text-green-700">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Quantum Verified
                      </Badge>
                    </div>
                  </div>
                  <QuantumMatchingEngine />
                </TabsContent>

                <TabsContent value="neural" className="mt-0">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-blue-700 mb-2">🧠 Neural Assessment Engine</h3>
                    <p className="text-gray-600">
                      Advanced neural networks with 175B parameters for comprehensive candidate evaluation. Analyze
                      cognitive patterns, emotional intelligence, and performance prediction.
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Badge className="bg-blue-100 text-blue-700">
                        <Brain className="h-3 w-3 mr-1" />
                        175B Parameters
                      </Badge>
                      <Badge className="bg-green-100 text-green-700">
                        <Target className="h-3 w-3 mr-1" />
                        97.3% Accuracy
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700">
                        <Sparkles className="h-3 w-3 mr-1" />
                        24 Neural Layers
                      </Badge>
                    </div>
                  </div>
                  <NeuralAssessmentTool />
                </TabsContent>

                <TabsContent value="blockchain" className="mt-0">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-green-700 mb-2">🔐 Blockchain Verification System</h3>
                    <p className="text-gray-600">
                      Immutable credential verification using smart contracts and distributed ledger technology. Ensure
                      100% authentic and tamper-proof candidate credentials.
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Badge className="bg-green-100 text-green-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Immutable Records
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700">
                        <Zap className="h-3 w-3 mr-1" />
                        Smart Contracts
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700">
                        <Target className="h-3 w-3 mr-1" />
                        100% Verified
                      </Badge>
                    </div>
                  </div>
                  <BlockchainVerificationSystem />
                </TabsContent>

                <TabsContent value="video" className="mt-0">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-purple-700 mb-2">📹 Video Interview Analyzer</h3>
                    <p className="text-gray-600">
                      AI-powered video interview analysis with facial expression recognition, speech pattern analysis,
                      and behavioral assessment for comprehensive candidate evaluation.
                    </p>
                  </div>
                  <VideoInterviewAnalyzer />
                </TabsContent>

                <TabsContent value="code" className="mt-0">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-orange-700 mb-2">💻 Code Assessment Tool</h3>
                    <p className="text-gray-600">
                      Advanced code analysis with quality metrics, security vulnerability detection, and performance
                      optimization suggestions powered by machine learning.
                    </p>
                  </div>
                  <CodeAssessmentTool />
                </TabsContent>

                <TabsContent value="negotiation" className="mt-0">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-green-700 mb-2">🤝 Negotiation Assistant</h3>
                    <p className="text-gray-600">
                      AI-powered negotiation strategies with market intelligence, salary benchmarking, and personalized
                      recommendations for optimal outcomes.
                    </p>
                  </div>
                  <NegotiationAssistant />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Coming Soon Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">🔮 Coming Soon: Next-Gen AI Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">🧬 DNA-Level Matching</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Biological compatibility analysis for ultimate team chemistry prediction
                </p>
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                  Q2 2024
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 border-gray-300 hover:border-green-400 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">🌐 Metaverse Interviews</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Virtual reality interview environments with spatial intelligence analysis
                </p>
                <Badge variant="outline" className="text-green-600 border-green-300">
                  Q3 2024
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 border-gray-300 hover:border-purple-400 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">🤖 AI Interviewer Clones</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Digital twins of top interviewers for consistent, bias-free assessments
                </p>
                <Badge variant="outline" className="text-purple-600 border-purple-300">
                  Q4 2024
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
