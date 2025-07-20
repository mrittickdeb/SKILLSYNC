"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, CheckCircle, Award, Users, Zap, Lock } from "lucide-react"

export function BlockchainVerificationSystem() {
  const [verification, setVerification] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runVerification = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/blockchain-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credentials: "sample_credentials",
          candidateId: "candidate_123",
          verificationType: "comprehensive",
        }),
      })
      const data = await response.json()
      setVerification(data)
    } catch (error) {
      console.error("Error in blockchain verification:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="relative">
              <Shield className="h-20 w-20 text-green-600 mx-auto animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="h-8 w-8 text-blue-600 animate-bounce" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-green-900">🔐 Blockchain Verification</h3>
            <p className="text-green-700">Immutable credential verification in progress...</p>
            <div className="flex justify-center space-x-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-green-600 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
            <div className="text-sm text-green-600">Smart contracts executing • Ethereum network • Gas optimized</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!verification) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-green-600" />
            <span>🔐 Blockchain Verification System</span>
          </CardTitle>
          <CardDescription>
            Immutable credential verification using smart contracts and distributed ledger technology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-semibold">Immutable Records</div>
              <div className="text-sm text-gray-600">Tamper-proof verification</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">Credential Validation</div>
              <div className="text-sm text-gray-600">Multi-source verification</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold">Trust Network</div>
              <div className="text-sm text-gray-600">Peer endorsements</div>
            </div>
            <div className="p-4 bg-white rounded-lg text-center">
              <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="font-semibold">Smart Contracts</div>
              <div className="text-sm text-gray-600">Automated verification</div>
            </div>
          </div>
          <Button onClick={runVerification} className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-lg py-6">
            <Shield className="h-5 w-5 mr-2" />
            Start Blockchain Verification
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Verification Status */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-green-700">Verification Complete</h3>
              <p className="text-green-600">Blockchain Hash: {verification.blockchainHash.substring(0, 20)}...</p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-100 text-green-700 mb-2">
                <CheckCircle className="h-3 w-3 mr-1" />
                {verification.status.toUpperCase()}
              </Badge>
              <div className="text-sm text-green-600">Trust Score: {verification.trustScore.overall}%</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-white rounded-lg text-center">
              <div className="text-xl font-bold text-green-600">{verification.smartContractDetails.confirmations}</div>
              <div className="text-sm text-gray-600">Confirmations</div>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <div className="text-xl font-bold text-blue-600">{verification.smartContractDetails.gasUsed}</div>
              <div className="text-sm text-gray-600">Gas Used</div>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <div className="text-xl font-bold text-purple-600">{verification.smartContractDetails.network}</div>
              <div className="text-sm text-gray-600">Network</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="credentials" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="credentials">🎓 Credentials</TabsTrigger>
          <TabsTrigger value="experience">💼 Experience</TabsTrigger>
          <TabsTrigger value="skills">🛠️ Skills</TabsTrigger>
          <TabsTrigger value="projects">🚀 Projects</TabsTrigger>
          <TabsTrigger value="trust">🔒 Trust Score</TabsTrigger>
        </TabsList>

        <TabsContent value="credentials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span>🎓 Education Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{verification.credentialAnalysis.education.institution}</h4>
                      <p className="text-gray-600">{verification.credentialAnalysis.education.degree}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-700 mb-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      <div className="text-sm text-gray-600">
                        Score: {verification.credentialAnalysis.education.verificationScore}%
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">GPA:</span> {verification.credentialAnalysis.education.gpa}
                    </div>
                    <div>
                      <span className="font-medium">Graduation:</span>{" "}
                      {verification.credentialAnalysis.education.graduationDate}
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                    <span className="font-medium">Blockchain Record:</span>{" "}
                    {verification.credentialAnalysis.education.blockchainRecord}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🏆 Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verification.credentialAnalysis.certifications.map((cert: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-gray-600">{cert.issuer}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-blue-100 text-blue-700 mb-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                        <div className="text-sm text-gray-600">Score: {cert.verificationScore}%</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Issued:</span> {cert.issueDate}
                      </div>
                      <div>
                        <span className="font-medium">Expires:</span> {cert.expiryDate}
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                      <span className="font-medium">Blockchain:</span> {cert.blockchainRecord}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>💼 Work Experience Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verification.credentialAnalysis.workExperience.map((exp: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-700 mb-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                        <div className="text-sm text-gray-600">Score: {exp.verificationScore}%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>
                        <span className="font-medium">Duration:</span> {exp.duration}
                      </span>
                      <span>
                        <span className="font-medium">Endorsements:</span> {exp.endorsements}
                      </span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded text-xs">
                      <span className="font-medium">Blockchain:</span> {exp.blockchainRecord}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>💻 Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verification.credentialAnalysis.skills.technicalSkills.map((skill: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{skill.skill}</span>
                          <Badge className="ml-2 bg-blue-100 text-blue-700">{skill.level}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-green-600">{skill.confidenceScore}%</div>
                          <div className="text-xs text-gray-600">{skill.endorsements} endorsements</div>
                        </div>
                      </div>
                      <Progress value={skill.confidenceScore} className="h-2" />
                      <div className="text-xs text-gray-600">Projects completed: {skill.projectsCompleted}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🤝 Soft Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verification.credentialAnalysis.skills.softSkills.map((skill: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{skill.skill}</span>
                          <Badge className="ml-2 bg-purple-100 text-purple-700">{skill.level}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-green-600">{skill.confidenceScore}%</div>
                          <div className="text-xs text-gray-600">{skill.endorsements} endorsements</div>
                        </div>
                      </div>
                      <Progress value={skill.confidenceScore} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Project Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {verification.credentialAnalysis.projects.map((project: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-gray-600 text-sm">{project.description}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Code Quality Score</div>
                        <div className="flex items-center space-x-2">
                          <Progress value={project.codeQualityScore} className="flex-1 h-2" />
                          <span className="text-sm font-bold text-blue-600">{project.codeQualityScore}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Innovation Score</div>
                        <div className="flex items-center space-x-2">
                          <Progress value={project.innovationScore} className="flex-1 h-2" />
                          <span className="text-sm font-bold text-purple-600">{project.innovationScore}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, techIndex: number) => (
                          <Badge key={techIndex} variant="outline" className="text-blue-700 border-blue-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <a href={project.githubUrl} className="text-blue-600 hover:underline">
                        GitHub
                      </a>
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="text-green-600 hover:underline">
                          Live Demo
                        </a>
                      )}
                    </div>

                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
                      <span className="font-medium">Blockchain:</span> {project.blockchainRecord}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trust" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>🔒 Trust Score Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="text-4xl font-bold text-green-600 mb-2">{verification.trustScore.overall}%</div>
                  <div className="text-lg text-green-700 mb-4">Overall Trust Score</div>
                  <Badge className="bg-green-100 text-green-700">Highly Trusted</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Trust Factors</h4>
                    <div className="space-y-3">
                      {Object.entries(verification.trustScore.factors).map(([factor, score]: [string, any]) => (
                        <div key={factor} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm capitalize">{factor.replace(/([A-Z])/g, " $1")}</span>
                            <span className="font-bold text-green-600">{score}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Risk Assessment</h4>
                    <div className="space-y-3">
                      {Object.entries(verification.trustScore.riskAssessment).map(([risk, level]: [string, any]) => (
                        <div key={risk} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm capitalize">{risk.replace(/([A-Z])/g, " $1")}</span>
                          <Badge
                            className={
                              level === "Very Low" || level === "Low"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }
                          >
                            {level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Verification Summary</h4>
                  <p className="text-blue-700 mb-3">{verification.verificationReport.summary}</p>

                  <div className="space-y-2">
                    <div className="font-medium text-blue-800">Key Recommendations:</div>
                    {verification.verificationReport.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="text-sm text-blue-700">
                        • {rec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Compliance Status</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">GDPR Compliant</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data Retention</span>
                        <span className="text-sm font-medium">{verification.complianceCheck.dataRetention}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Right to Erasure</span>
                        <span className="text-sm font-medium">{verification.complianceCheck.rightToErasure}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data Portability</span>
                        <span className="text-sm font-medium">{verification.complianceCheck.dataPortability}</span>
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
