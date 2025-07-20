"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, Target, AlertCircle, CheckCircle } from "lucide-react"

const personalityQuestions = [
  {
    id: 1,
    question: "I enjoy exploring new ideas and approaches to problems",
    trait: "openness",
  },
  {
    id: 2,
    question: "I prefer to work in organized, structured environments",
    trait: "conscientiousness",
  },
  {
    id: 3,
    question: "I feel energized when working with teams and meeting new people",
    trait: "extraversion",
  },
  {
    id: 4,
    question: "I prioritize helping others and maintaining harmony in teams",
    trait: "agreeableness",
  },
  {
    id: 5,
    question: "I often worry about project deadlines and outcomes",
    trait: "neuroticism",
  },
]

export function PersonalityAnalyzer() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleResponse = (questionId: number, value: number) => {
    setResponses({ ...responses, [questionId]: value })
  }

  const nextQuestion = () => {
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      analyzePersonality()
    }
  }

  const analyzePersonality = async () => {
    setAnalyzing(true)
    try {
      const response = await fetch("/api/ai/personality-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses, userId: "1" }),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error analyzing personality:", error)
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
              <h3 className="text-xl font-semibold text-purple-900">🧠 AI Analyzing Your Personality</h3>
              <p className="text-purple-700">Processing your responses using advanced psychological models...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (results) {
    return (
      <div className="space-y-6">
        {/* Personality Overview */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-green-600" />
              <span>🎯 Your Personality Profile</span>
            </CardTitle>
            <CardDescription>AI-powered psychological analysis for better job matching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Work Style</h4>
                <div className="space-y-2">
                  <Badge className="bg-blue-100 text-blue-800">{results.workStyle.primary}</Badge>
                  <p className="text-sm text-gray-600">Team Role: {results.workStyle.teamRole}</p>
                  <p className="text-sm text-gray-600">Communication: {results.workStyle.communicationStyle}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Cultural Fit</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Ideal Size: {results.culturalFit.startupSize}</p>
                  <p className="text-sm text-gray-600">Environment: {results.culturalFit.workEnvironment}</p>
                  <p className="text-sm text-gray-600">Management: {results.culturalFit.managementStyle}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Big Five Traits */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Personality Traits (Big Five Model)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(results.bigFiveTraits).map(([trait, score]) => (
                <div key={trait} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize font-medium">{trait}</span>
                    <span className="text-sm text-gray-600">{score}%</span>
                  </div>
                  <Progress value={score as number} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Industry Compatibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>🏢 Industry Compatibility Scores</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results.compatibilityScores).map(([industry, score]) => (
                <div key={industry} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="capitalize font-medium">{industry}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={score as number} className="w-20" />
                    <span className="text-sm font-bold">{score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>✅ AI Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-800">{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Red Flags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>⚠️ Potential Red Flags</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.redFlags.map((flag: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-800">{flag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = personalityQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-purple-600" />
          <span>🧠 AI Personality Analysis</span>
        </CardTitle>
        <CardDescription>
          Answer a few questions to get personalized job matching based on your personality
        </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>
              {currentQuestion + 1} of {personalityQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <RadioGroup
            value={responses[question.id]?.toString()}
            onValueChange={(value) => handleResponse(question.id, Number.parseInt(value))}
            className="space-y-3"
          >
            {[
              { value: "1", label: "Strongly Disagree" },
              { value: "2", label: "Disagree" },
              { value: "3", label: "Neutral" },
              { value: "4", label: "Agree" },
              { value: "5", label: "Strongly Agree" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button
          onClick={nextQuestion}
          disabled={!responses[question.id]}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
        >
          {currentQuestion === personalityQuestions.length - 1 ? "Analyze Personality" : "Next Question"}
        </Button>
      </CardContent>
    </Card>
  )
}
