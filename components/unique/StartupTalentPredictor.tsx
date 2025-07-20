"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, DollarSign, Clock, AlertTriangle } from "lucide-react"

export function StartupTalentPredictor() {
  const predictions = [
    {
      role: "Full-Stack Developer",
      demand: "Very High",
      avgSalary: "$85,000",
      timeToHire: "2-3 weeks",
      competition: "High",
      riskFactors: ["High demand", "Limited supply"],
      recommendation: "Offer equity + competitive base",
    },
    {
      role: "ML Engineer",
      demand: "Extreme",
      avgSalary: "$120,000",
      timeToHire: "4-6 weeks",
      competition: "Very High",
      riskFactors: ["Scarce talent", "Big tech competition"],
      recommendation: "Remote-first + learning budget",
    },
    {
      role: "UI/UX Designer",
      demand: "High",
      avgSalary: "$70,000",
      timeToHire: "1-2 weeks",
      competition: "Medium",
      riskFactors: ["Portfolio quality varies"],
      recommendation: "Focus on culture fit",
    },
  ]

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "Extreme":
        return "bg-red-100 text-red-800"
      case "Very High":
        return "bg-orange-100 text-orange-800"
      case "High":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <span>AI Talent Market Predictor</span>
        </CardTitle>
        <CardDescription>Real-time hiring intelligence and market predictions for your startup</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {predictions.map((pred, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{pred.role}</h3>
                <Badge className={getDemandColor(pred.demand)}>{pred.demand}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">{pred.avgSalary}</div>
                    <div className="text-xs text-gray-500">Avg Salary</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium">{pred.timeToHire}</div>
                    <div className="text-xs text-gray-500">Time to Hire</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium">{pred.competition}</div>
                    <div className="text-xs text-gray-500">Competition</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <div>
                    <div className="text-sm font-medium">{pred.riskFactors.length}</div>
                    <div className="text-xs text-gray-500">Risk Factors</div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm font-medium text-gray-700 mb-1">Risk Factors:</div>
                <div className="flex flex-wrap gap-1">
                  {pred.riskFactors.map((risk, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {risk}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg mb-3">
                <div className="text-sm font-medium text-blue-800 mb-1">AI Recommendation:</div>
                <div className="text-sm text-blue-700">{pred.recommendation}</div>
              </div>

              <Button size="sm" className="w-full">
                View Matching Candidates
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="font-semibold">Market Intelligence</span>
          </div>
          <p className="text-sm text-gray-700">
            The talent market is shifting towards remote-first opportunities. Startups offering flexible work
            arrangements are seeing <span className="font-bold text-purple-600">40% faster hiring</span> and{" "}
            <span className="font-bold text-purple-600">25% lower costs</span>.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
