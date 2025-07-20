"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Shield,
  MessageSquare,
  Target,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react"

export function NegotiationAssistant() {
  const [userType, setUserType] = useState("")
  const [currentOffer, setCurrentOffer] = useState("")
  const [assistance, setAssistance] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getAssistance = async () => {
    if (!userType) return

    setLoading(true)
    try {
      const response = await fetch("/api/ai/negotiation-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType,
          currentOffer: currentOffer ? Number.parseInt(currentOffer) : null,
          marketData: {},
          candidateProfile: {},
          companyProfile: {},
        }),
      })
      const data = await response.json()
      setAssistance(data)
    } catch (error) {
      console.error("Error getting negotiation assistance:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <DollarSign className="h-16 w-16 text-green-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-semibold">💰 AI Analyzing Negotiation Strategy</h3>
            <p className="text-gray-600">Preparing personalized negotiation recommendations...</p>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Analyzing market data...</div>
              <div className="text-sm text-gray-500">Calculating negotiation power...</div>
              <div className="text-sm text-gray-500">Generating strategy...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!assistance) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>💰 AI Negotiation Assistant</span>
          </CardTitle>
          <CardDescription>
            Get personalized negotiation strategies, market insights, and tactical advice powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger>
                <SelectValue placeholder="I am a..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">🎓 Student/Candidate</SelectItem>
                <SelectItem value="startup">🚀 Startup/Employer</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Current offer amount (optional)"
              value={currentOffer}
              onChange={(e) => setCurrentOffer(e.target.value)}
              type="number"
            />
          </div>
          <Button
            onClick={getAssistance}
            disabled={!userType}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Get AI Negotiation Strategy
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Market Position */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-green-700">Negotiation Power: {assistance.negotiationPower}%</h3>
              <p className="text-green-600">Market Position: {assistance.marketPosition}</p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-700">
                <Star className="h-3 w-3 mr-1" />
                {assistance.negotiationStrategy === "candidate" ? "Candidate" : "Employer"} Strategy
              </Badge>
            </div>
          </div>
          <Progress value={assistance.negotiationPower} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="analysis">💰 Analysis</TabsTrigger>
          <TabsTrigger value="points">🎯 Points</TabsTrigger>
          <TabsTrigger value="script">💬 Script</TabsTrigger>
          <TabsTrigger value="tactics">🧠 Tactics</TabsTrigger>
          <TabsTrigger value="alternatives">🔄 Options</TabsTrigger>
          <TabsTrigger value="intelligence">📊 Intel</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>💰 Salary Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Current Offer</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${assistance.salaryAnalysis.currentOffer.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Market Average</span>
                    <span className="font-medium text-gray-600">
                      ${assistance.salaryAnalysis.marketAverage.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recommended Target</span>
                    <span className="font-bold text-blue-600">
                      ${assistance.salaryAnalysis.recommendedTarget.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-100 rounded text-sm text-yellow-800">
                    {assistance.salaryAnalysis.positionVsMarket}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 Market Range</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>25th Percentile:</span>
                      <span>${assistance.salaryAnalysis.marketRange.p25.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>50th Percentile:</span>
                      <span>${assistance.salaryAnalysis.marketRange.p50.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>75th Percentile:</span>
                      <span>${assistance.salaryAnalysis.marketRange.p75.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>90th Percentile:</span>
                      <span>${assistance.salaryAnalysis.marketRange.p90.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span>📈 Equity Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Current Equity</span>
                    <span className="text-xl font-bold text-purple-600">{assistance.equityAnalysis.currentEquity}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Typical Range</span>
                    <span className="font-medium text-gray-600">{assistance.equityAnalysis.typicalRange}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Company Stage</span>
                    <span className="font-medium text-purple-600">{assistance.equityAnalysis.companyStage}</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">💎 Equity Value</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Value:</span>
                      <span className="font-medium">{assistance.equityAnalysis.equityValue.current}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potential Value:</span>
                      <span className="font-medium text-green-600">
                        {assistance.equityAnalysis.equityValue.potential}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <Badge variant="outline">{assistance.equityAnalysis.equityValue.riskLevel}</Badge>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-blue-100 rounded text-sm text-blue-800">
                    {assistance.equityAnalysis.recommendation}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="points" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>🎯 Negotiation Points</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assistance.negotiationPoints.map((point: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{point.category}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">Current: {point.current}</span>
                          <span className="text-sm font-medium text-blue-600">Target: {point.target}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            point.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : point.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }
                        >
                          {point.priority} Priority
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">Success: {point.likelihood}%</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{point.justification}</p>
                    <Progress value={point.likelihood} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="script" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <span>💬 Negotiation Script</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🚀 Opening</h4>
                <p className="text-green-700 italic">"{assistance.negotiationScript.opening}"</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💰 Salary Discussion</h4>
                <p className="text-blue-700 italic">"{assistance.negotiationScript.salaryNegotiation}"</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">📈 Equity Discussion</h4>
                <p className="text-purple-700 italic">"{assistance.negotiationScript.equityDiscussion}"</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">🎁 Benefits Discussion</h4>
                <p className="text-orange-700 italic">"{assistance.negotiationScript.benefitsNegotiation}"</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">🤝 Closing</h4>
                <p className="text-gray-700 italic">"{assistance.negotiationScript.closing}"</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tactics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>🧠 Tactical Advice</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />✅ Do's
                    </h4>
                    <div className="space-y-2">
                      {assistance.tacticalAdvice.dosList.map((item: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">🎯 Your Leverage</h4>
                    <div className="space-y-2">
                      {assistance.tacticalAdvice.leverage.map((item: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Star className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-blue-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />❌ Don'ts
                    </h4>
                    <div className="space-y-2">
                      {assistance.tacticalAdvice.dontsList.map((item: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Risk Assessment</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Offer Withdrawal:</span>
                        <span className="font-medium text-yellow-700">{assistance.riskAssessment.offerWithdrawal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Counter Offer:</span>
                        <span className="font-medium text-green-700">
                          {assistance.riskAssessment.counterOfferLikelihood}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Full Acceptance:</span>
                        <span className="font-medium text-blue-700">
                          {assistance.riskAssessment.fullAcceptanceLikelihood}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">🎯 Key Strategy Points</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Timing:</span>
                    <p className="text-purple-700">{assistance.tacticalAdvice.timing}</p>
                  </div>
                  <div>
                    <span className="font-medium">Approach:</span>
                    <p className="text-purple-700">{assistance.tacticalAdvice.approach}</p>
                  </div>
                  <div>
                    <span className="font-medium">Style:</span>
                    <p className="text-purple-700">Data-driven and collaborative</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <span>🔄 Alternative Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assistance.alternativeOptions.map((option: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{option.option}</h4>
                    <p className="text-gray-700 text-sm mb-3">{option.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded">
                        <h5 className="font-medium text-green-800 mb-2">✅ Pros</h5>
                        <div className="space-y-1">
                          {option.pros.map((pro: string, proIndex: number) => (
                            <div key={proIndex} className="text-sm text-green-700">
                              • {pro}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-red-50 rounded">
                        <h5 className="font-medium text-red-800 mb-2">❌ Cons</h5>
                        <div className="space-y-1">
                          {option.cons.map((con: string, conIndex: number) => (
                            <div key={conIndex} className="text-sm text-red-700">
                              • {con}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>📊 Market Intelligence</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">🏢 Competitor Offers</h4>
                    <div className="space-y-3">
                      {assistance.marketIntelligence.competitorOffers.map((offer: any, index: number) => (
                        <div key={index} className="p-3 bg-white rounded border">
                          <div className="font-medium text-gray-900">{offer.company}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Salary: {offer.salary} | Equity: {offer.equity} | Benefits: {offer.benefits}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">📈 Industry Trends</h4>
                    <div className="space-y-2">
                      {assistance.marketIntelligence.industryTrends.map((trend: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-700">{trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">🧠 Psychological Insights</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Company Perspective:</span>
                        <p className="text-purple-700">{assistance.psychologicalInsights.companyPerspective}</p>
                      </div>
                      <div>
                        <span className="font-medium">Decision Makers:</span>
                        <p className="text-purple-700">{assistance.psychologicalInsights.decisionMakers}</p>
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span>
                        <p className="text-purple-700">{assistance.psychologicalInsights.timeframe}</p>
                      </div>
                    </div>
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
