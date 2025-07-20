"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, TrendingUp, Brain, Target, Zap } from "lucide-react"

export function LinkedInComparison() {
  const comparisons = [
    {
      feature: "Target Audience",
      linkedin: "General professionals",
      skillsync: "Students & Startups specifically",
      advantage: "skillsync",
    },
    {
      feature: "Matching Algorithm",
      linkedin: "Basic keyword matching",
      skillsync: "AI-powered 87.5% compatibility scoring",
      advantage: "skillsync",
    },
    {
      feature: "Skill Gap Analysis",
      linkedin: "None",
      skillsync: "Personalized learning paths with timeline",
      advantage: "skillsync",
    },
    {
      feature: "Market Predictions",
      linkedin: "Basic job trends",
      skillsync: "Real-time talent market forecasting",
      advantage: "skillsync",
    },
    {
      feature: "Opportunity Types",
      linkedin: "Full-time jobs mainly",
      skillsync: "Micro-gigs, hackathons, co-founder matching",
      advantage: "skillsync",
    },
    {
      feature: "Resume Optimization",
      linkedin: "Manual editing",
      skillsync: "AI-powered ATS optimization",
      advantage: "skillsync",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SkillSync vs LinkedIn
          </CardTitle>
          <CardDescription>Why SkillSync is the future of student-startup matching</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="font-medium text-gray-900">{item.feature}</div>
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-gray-600">{item.linkedin}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-700 font-medium">{item.skillsync}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">87.5%</div>
            <div className="text-sm text-green-600">AI Matching Accuracy</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">23%</div>
            <div className="text-sm text-blue-600">Faster Hiring Process</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">78%</div>
            <div className="text-sm text-purple-600">Success Rate Prediction</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">45%</div>
            <div className="text-sm text-orange-600">Avg Salary Increase</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
