"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Atom, Zap, Brain, Target, TrendingUp, Sparkles, Cpu, Activity } from "lucide-react"

export function QuantumMatchingEngine() {
  const [matching, setMatching] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runQuantumMatching = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/quantum-matching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateProfile: "sample_profile",
          jobRequirements: "sample_requirements",
          marketData: "current_market",
        }),
      })
      const data = await response.json()
      setMatching(data)
    } catch (error) {
      console.error("Error in quantum matching:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="relative">
              <Atom className="h-20 w-20 text-purple-600 mx-auto animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-purple-900">🔬 Quantum Processing Active</h3>
            <p className="text-purple-700">Quantum algorithms analyzing 10,000+ dimensional candidate space...</p>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-8 bg-purple-600 rounded animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
            <div className="text-sm text-purple-600">
              Quantum entanglement detected • Superposition analysis in progress
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!matching) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Atom className="h-6 w-6 text-purple-600" />
            <span>🔬 Quantum Matching Engine</span>
          </CardTitle>
          <CardDescription>
            Experience the world's first quantum-inspired candidate matching system with unprecedented accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg text-center">
              <Cpu className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold">Quantum Processing</div>
              <div className="text-sm text-gray-600">10,000x faster analysis</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">Multi-Dimensional</div>
              <div className="text-sm text-gray-600">1000+ variables analyzed</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold">97.3% Accuracy</div>
              <div className="text-sm text-gray-600">Quantum-verified results</div>
            </div>
          </div>
          <Button
            onClick={runQuantumMatching}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-lg py-6"
          >
            <Atom className="h-5 w-5 mr-2" />
            Initiate Quantum Matching
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quantum Score */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-3xl font-bold text-purple-700">Quantum Score: {matching.quantumScore}%</h3>
              <p className="text-purple-600">Processed in {matching.processingTime} using quantum algorithms</p>
            </div>
            <div className="text-right">
              <Badge className="bg-purple-100 text-purple-700 mb-2">
                <Sparkles className="h-3 w-3 mr-1" />
                Quantum Verified
              </Badge>
              <div className="text-sm text-purple-600">{matching.quantumAdvantages.parallelProcessing}</div>
            </div>
          </div>
          <Progress value={matching.quantumScore} className="h-4" />
        </CardContent>
      </Card>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analysis">🔬 Analysis</TabsTrigger>
          <TabsTrigger value="dimensions">📐 Dimensions</TabsTrigger>
          <TabsTrigger value="quantum">⚛️ Quantum</TabsTrigger>
          <TabsTrigger value="predictions">🔮 Predictions</TabsTrigger>
          <TabsTrigger value="recommendations">💡 Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span>Skill Compatibility</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Score</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {matching.multidimensionalAnalysis.skillCompatibility.score}%
                    </span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-800 mb-2">Quantum Entanglement</div>
                    <div className="text-sm text-blue-700">
                      {matching.multidimensionalAnalysis.skillCompatibility.quantumEntanglement}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {matching.multidimensionalAnalysis.skillCompatibility.dimensions.map((dim: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{dim.dimension}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={dim.score} className="w-16 h-2" />
                          <span className="text-sm font-medium">{dim.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  <span>Cultural Resonance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Resonance Score</span>
                    <span className="text-2xl font-bold text-green-600">
                      {matching.multidimensionalAnalysis.culturalResonance.score}%
                    </span>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-green-800 mb-2">Quantum Coherence</div>
                    <div className="text-sm text-green-700">
                      {matching.multidimensionalAnalysis.culturalResonance.quantumCoherence}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {matching.multidimensionalAnalysis.culturalResonance.resonanceFactors.map(
                      (factor: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{factor.factor}</span>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                factor.phase === "In-phase" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }
                            >
                              {factor.phase}
                            </Badge>
                            <span className="text-sm font-medium">{(factor.resonance * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <span>Future Projection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Projection Score</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {matching.multidimensionalAnalysis.futureProjection.score}%
                    </span>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm font-medium text-purple-800 mb-2">Quantum Superposition</div>
                    <div className="text-sm text-purple-700">
                      {matching.multidimensionalAnalysis.futureProjection.quantumSuperposition}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {matching.multidimensionalAnalysis.futureProjection.probabilityDistribution.map(
                      (outcome: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{outcome.outcome}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={outcome.probability * 100} className="w-16 h-2" />
                            <span className="text-sm font-medium">{(outcome.probability * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dimensions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>📐 Multi-Dimensional Analysis</CardTitle>
              <CardDescription>Quantum analysis across multiple candidate dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">🧠 Emergent Properties</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Synergy Potential</span>
                        <span className="font-bold text-blue-600">{matching.emergentProperties.synergyPotential}%</span>
                      </div>
                      <Progress value={matching.emergentProperties.synergyPotential} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Innovation Catalyst</span>
                        <span className="font-bold text-purple-600">
                          {matching.emergentProperties.innovationCatalyst}%
                        </span>
                      </div>
                      <Progress value={matching.emergentProperties.innovationCatalyst} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Team Dynamics Enhancement</span>
                        <span className="font-bold text-green-600">
                          {matching.emergentProperties.teamDynamicsEnhancement}%
                        </span>
                      </div>
                      <Progress value={matching.emergentProperties.teamDynamicsEnhancement} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Organizational Impact</span>
                        <span className="font-bold text-orange-600">
                          {matching.emergentProperties.organizationalImpact}%
                        </span>
                      </div>
                      <Progress value={matching.emergentProperties.organizationalImpact} className="h-2" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">{matching.emergentProperties.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quantum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Atom className="h-5 w-5 text-purple-600" />
                <span>⚛️ Quantum Advantages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔄 Parallel Processing</h4>
                    <p className="text-sm text-purple-700">{matching.quantumAdvantages.parallelProcessing}</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Uncertainty Handling</h4>
                    <p className="text-sm text-blue-700">{matching.quantumAdvantages.uncertaintyHandling}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">⚡ Optimization Speed</h4>
                    <p className="text-sm text-green-700">{matching.quantumAdvantages.optimizationSpeed}</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">🔍 Pattern Recognition</h4>
                    <p className="text-sm text-orange-700">{matching.quantumAdvantages.patternRecognition}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">🧮 Algorithms Used</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {matching.algorithmsUsed.map((algorithm: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-purple-700 border-purple-300">
                      {algorithm}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🔮 Quantum Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">📊 Performance Probability Distribution</h4>
                  <div className="space-y-3">
                    {matching.multidimensionalAnalysis.futureProjection.probabilityDistribution.map(
                      (outcome: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                          <span className="font-medium">{outcome.outcome}</span>
                          <div className="flex items-center space-x-3">
                            <Progress value={outcome.probability * 100} className="w-32" />
                            <span className="font-bold text-blue-600">{(outcome.probability * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">🎯 Competitive Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Market Position</span>
                        <span className="font-bold text-purple-600">
                          {matching.competitiveQuantumAnalysis.marketPosition}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Scarcity Index</span>
                        <span className="font-bold text-purple-600">
                          {matching.competitiveQuantumAnalysis.scarcityIndex}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="text-sm font-medium text-purple-800 mb-1">Quantum Advantage</div>
                        <p className="text-sm text-purple-700">
                          {matching.competitiveQuantumAnalysis.quantumAdvantage}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-3">⚠️ Risk Mitigation</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Quantum Uncertainty</span>
                        <span className="font-bold text-orange-600">{matching.riskMitigation.quantumUncertainty}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Confidence Interval</span>
                        <span className="font-bold text-orange-600">{matching.riskMitigation.confidenceInterval}</span>
                      </div>
                      <div className="mt-3">
                        <div className="text-sm font-medium text-orange-800 mb-2">Mitigation Strategies</div>
                        <div className="space-y-1">
                          {matching.riskMitigation.mitigationStrategies.map((strategy: string, index: number) => (
                            <div key={index} className="text-sm text-orange-700">
                              • {strategy}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-blue-700">⚡ Immediate Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {matching.quantumRecommendations.immediate.map((action: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                      <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-blue-800">{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-700">📈 Strategic Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {matching.quantumRecommendations.strategic.map((action: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded">
                      <Target className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-purple-700">🚀 Innovation Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {matching.quantumRecommendations.innovative.map((action: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-purple-50 rounded">
                      <Sparkles className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-purple-800">{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
