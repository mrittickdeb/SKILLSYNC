"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, BookOpen, Clock, Target } from "lucide-react"

export function StudentSkillGapAnalyzer() {
  const skillGaps = [
    {
      skill: "React.js",
      current: 65,
      required: 85,
      demand: "High",
      timeToLearn: "3 weeks",
      resources: 12,
    },
    {
      skill: "Machine Learning",
      current: 30,
      required: 75,
      demand: "Very High",
      timeToLearn: "8 weeks",
      resources: 24,
    },
    {
      skill: "TypeScript",
      current: 45,
      required: 80,
      demand: "High",
      timeToLearn: "4 weeks",
      resources: 8,
    },
    {
      skill: "Web3/Blockchain",
      current: 20,
      required: 70,
      demand: "Emerging",
      timeToLearn: "6 weeks",
      resources: 15,
    },
  ]

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "Very High":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Emerging":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-600" />
          <span>AI Skill Gap Analysis</span>
        </CardTitle>
        <CardDescription>Personalized learning path based on market demand and your career goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {skillGaps.map((skill, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{skill.skill}</h3>
                <Badge className={getDemandColor(skill.demand)}>{skill.demand} Demand</Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Current Level</span>
                  <span>{skill.current}%</span>
                </div>
                <Progress value={skill.current} className="h-2" />

                <div className="flex justify-between text-sm">
                  <span>Required Level</span>
                  <span>{skill.required}%</span>
                </div>
                <Progress value={skill.required} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{skill.timeToLearn} to master</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span>{skill.resources} learning resources</span>
                </div>
              </div>

              <Button size="sm" className="mt-3 w-full">
                Start Learning Path
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Market Prediction</span>
          </div>
          <p className="text-sm text-gray-700">
            Based on current trends, focusing on Machine Learning and Web3 skills could increase your salary potential
            by <span className="font-bold text-green-600">35-45%</span> in the next 12 months.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
