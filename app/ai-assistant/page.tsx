"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Send,
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  Lightbulb,
  Zap,
} from "lucide-react"

export default function AIAssistantPage() {
  const [activeContext, setActiveContext] = useState("general")
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/ai/chat",
    body: {
      context: activeContext,
    },
  })

  const quickActions = [
    {
      id: "analyze-candidate",
      title: "Analyze Candidate",
      description: "Get AI insights on candidate profiles",
      icon: <Users className="h-5 w-5" />,
      prompt: "Analyze this candidate profile and provide hiring recommendations",
    },
    {
      id: "optimize-job",
      title: "Optimize Job Post",
      description: "Improve job descriptions with AI",
      icon: <FileText className="h-5 w-5" />,
      prompt: "Help me optimize this job description to attract better candidates",
    },
    {
      id: "market-insights",
      title: "Market Intelligence",
      description: "Get real-time hiring market data",
      icon: <TrendingUp className="h-5 w-5" />,
      prompt: "What are the current market trends for frontend developers?",
    },
    {
      id: "salary-guidance",
      title: "Salary Guidance",
      description: "AI-powered compensation analysis",
      icon: <Target className="h-5 w-5" />,
      prompt: "What should I offer for a senior React developer in San Francisco?",
    },
    {
      id: "interview-prep",
      title: "Interview Questions",
      description: "Generate smart interview questions",
      icon: <MessageSquare className="h-5 w-5" />,
      prompt: "Generate technical interview questions for a full-stack developer role",
    },
    {
      id: "hiring-strategy",
      title: "Hiring Strategy",
      description: "Strategic hiring recommendations",
      icon: <Lightbulb className="h-5 w-5" />,
      prompt: "Help me develop a hiring strategy for scaling my engineering team",
    },
  ]

  const handleQuickAction = (prompt: string) => {
    handleSubmit(new Event("submit") as any, {
      data: { message: prompt },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🤖 AI Hiring Assistant
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your intelligent hiring companion powered by advanced machine learning. Get instant insights, optimize your
            process, and make data-driven hiring decisions.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-green-100 text-green-700">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge className="bg-blue-100 text-blue-700">
              <Brain className="h-3 w-3 mr-1" />
              Real-time Analysis
            </Badge>
            <Badge className="bg-purple-100 text-purple-700">
              <Zap className="h-3 w-3 mr-1" />
              Instant Insights
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">💬 AI Chat</TabsTrigger>
            <TabsTrigger value="quick-actions">⚡ Quick Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="h-5 w-5" />
                      <span>AI Assistant</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Ask me anything about hiring, candidates, market trends, or optimization
                    </CardDescription>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center py-12">
                        <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          👋 Hi! I'm your AI hiring assistant
                        </h3>
                        <p className="text-gray-500 mb-4">
                          I can help you with candidate analysis, job optimization, market insights, and more!
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {quickActions.slice(0, 3).map((action) => (
                            <Button
                              key={action.id}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickAction(action.prompt)}
                              className="text-xs"
                            >
                              {action.icon}
                              <span className="ml-1">{action.title}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.role === "assistant" && (
                            <div className="flex items-center space-x-2 mb-2">
                              <Bot className="h-4 w-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-600">AI Assistant</span>
                            </div>
                          )}
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4 text-purple-600 animate-pulse" />
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>

                  {/* Input */}
                  <div className="p-4 border-t">
                    <form onSubmit={handleSubmit} className="flex space-x-2">
                      <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask me about hiring, candidates, market trends..."
                        className="flex-1"
                        disabled={isLoading}
                      />
                      <Button type="submit" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>

              {/* Context Selector */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">🎯 Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { id: "general", label: "General Hiring", icon: "💼" },
                      { id: "candidate-analysis", label: "Candidate Analysis", icon: "👤" },
                      { id: "job-optimization", label: "Job Optimization", icon: "📝" },
                      { id: "market-intelligence", label: "Market Intel", icon: "📊" },
                      { id: "interview-prep", label: "Interview Prep", icon: "🎤" },
                      { id: "salary-negotiation", label: "Salary Guidance", icon: "💰" },
                    ].map((context) => (
                      <Button
                        key={context.id}
                        variant={activeContext === context.id ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => setActiveContext(context.id)}
                      >
                        <span className="mr-2">{context.icon}</span>
                        {context.label}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">🔥 Popular Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "What salary should I offer?",
                      "How to improve job descriptions?",
                      "Best interview questions?",
                      "Market trends for developers?",
                      "How to assess cultural fit?",
                    ].map((question, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs h-auto p-2 text-left"
                        onClick={() => handleQuickAction(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quick-actions" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action) => (
                <Card key={action.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">{action.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                          onClick={() => handleQuickAction(action.prompt)}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Try Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Capabilities Showcase */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>🚀 AI Capabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">🎯 For Startups</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span>AI-powered candidate screening and ranking</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span>Job description optimization for better reach</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span>Real-time market intelligence and salary insights</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span>Predictive hiring analytics and forecasting</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">👨‍🎓 For Students</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span>Personalized skill gap analysis and learning paths</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span>AI resume optimization and ATS compatibility</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span>Smart job matching based on profile analysis</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                        <span>Career trajectory predictions and guidance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
