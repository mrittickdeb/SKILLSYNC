"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Download,
  ExternalLink,
  User,
  GraduationCap,
  MapPin,
} from "lucide-react"
import { StartupLayout } from "@/components/layouts/StartupLayout"

export default function StartupApplications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [opportunityFilter, setOpportunityFilter] = useState("all")
  const [applications, setApplications] = useState([
    {
      id: 1,
      student: {
        name: "Alex Chen",
        email: "alex.chen@stanford.edu",
        university: "Stanford University",
        year: "Junior",
        major: "Computer Science",
        gpa: "3.9",
        location: "Palo Alto, CA",
        avatar: "/placeholder.svg?height=40&width=40&text=AC",
      },
      opportunity: {
        id: 1,
        title: "Frontend Developer Intern",
        type: "Internship",
      },
      status: "new",
      appliedAt: "2024-01-20",
      matchScore: 95,
      coverLetter:
        "I am excited to apply for the Frontend Developer Intern position at TechFlow AI. With my strong background in React and TypeScript, along with my passion for AI-powered interfaces, I believe I would be a great fit for your team...",
      resume: "alex_chen_resume.pdf",
      portfolio: "https://alexchen.dev",
      skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
      projects: [
        { name: "E-commerce Platform", tech: ["React", "Node.js", "MongoDB"] },
        { name: "ML Stock Predictor", tech: ["Python", "TensorFlow"] },
      ],
      availability: "20-30 hours/week",
      startDate: "2024-02-01",
    },
    {
      id: 2,
      student: {
        name: "Sarah Johnson",
        email: "sarah.j@mit.edu",
        university: "MIT",
        year: "Senior",
        major: "Design",
        gpa: "3.8",
        location: "Cambridge, MA",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      },
      opportunity: {
        id: 2,
        title: "UI/UX Designer",
        type: "Part-time",
      },
      status: "interview_scheduled",
      appliedAt: "2024-01-18",
      matchScore: 88,
      coverLetter:
        "As a passionate designer with experience in user-centered design, I am thrilled to apply for the UI/UX Designer position...",
      resume: "sarah_johnson_resume.pdf",
      portfolio: "https://sarahdesigns.com",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "HTML/CSS"],
      projects: [
        { name: "Mobile Banking App", tech: ["Figma", "Prototyping"] },
        { name: "E-learning Platform", tech: ["Adobe XD", "User Research"] },
      ],
      availability: "15-20 hours/week",
      startDate: "2024-01-25",
      interviewDate: "2024-01-25",
      interviewTime: "2:00 PM EST",
    },
    {
      id: 3,
      student: {
        name: "Michael Brown",
        email: "m.brown@berkeley.edu",
        university: "UC Berkeley",
        year: "Sophomore",
        major: "Data Science",
        gpa: "3.7",
        location: "Berkeley, CA",
        avatar: "/placeholder.svg?height=40&width=40&text=MB",
      },
      opportunity: {
        id: 3,
        title: "Data Analyst Intern",
        type: "Internship",
      },
      status: "under_review",
      appliedAt: "2024-01-15",
      matchScore: 82,
      coverLetter: "I am writing to express my strong interest in the Data Analyst Intern position...",
      resume: "michael_brown_resume.pdf",
      portfolio: "https://github.com/mbrown",
      skills: ["Python", "SQL", "Tableau", "R", "Machine Learning"],
      projects: [
        { name: "Sales Analytics Dashboard", tech: ["Python", "Tableau"] },
        { name: "Customer Segmentation", tech: ["R", "Machine Learning"] },
      ],
      availability: "25-30 hours/week",
      startDate: "2024-02-15",
    },
    {
      id: 4,
      student: {
        name: "Emily Davis",
        email: "emily.davis@cmu.edu",
        university: "Carnegie Mellon",
        year: "Graduate",
        major: "Computer Science",
        gpa: "3.9",
        location: "Pittsburgh, PA",
        avatar: "/placeholder.svg?height=40&width=40&text=ED",
      },
      opportunity: {
        id: 4,
        title: "Mobile App Developer",
        type: "Micro-gig",
      },
      status: "accepted",
      appliedAt: "2024-01-10",
      matchScore: 92,
      coverLetter: "I am excited to apply for the Mobile App Developer micro-gig...",
      resume: "emily_davis_resume.pdf",
      portfolio: "https://emilydev.com",
      skills: ["React Native", "JavaScript", "Swift", "Kotlin", "Firebase"],
      projects: [
        { name: "Fitness Tracking App", tech: ["React Native", "Firebase"] },
        { name: "Social Media App", tech: ["Swift", "Kotlin"] },
      ],
      availability: "Full-time for 2 weeks",
      startDate: "2024-01-22",
      acceptedAt: "2024-01-21",
    },
  ])

  const opportunities = [
    { id: 1, title: "Frontend Developer Intern" },
    { id: 2, title: "UI/UX Designer" },
    { id: 3, title: "Data Analyst Intern" },
    { id: 4, title: "Mobile App Developer" },
  ]

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.opportunity.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesOpportunity = opportunityFilter === "all" || app.opportunity.id.toString() === opportunityFilter

    return matchesSearch && matchesStatus && matchesOpportunity
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700"
      case "under_review":
        return "bg-yellow-100 text-yellow-700"
      case "interview_scheduled":
        return "bg-purple-100 text-purple-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="h-4 w-4" />
      case "under_review":
        return <Eye className="h-4 w-4" />
      case "interview_scheduled":
        return <Calendar className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "New"
      case "under_review":
        return "Under Review"
      case "interview_scheduled":
        return "Interview Scheduled"
      case "accepted":
        return "Accepted"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  const getApplicationStats = () => {
    const total = applications.length
    const newApps = applications.filter((app) => app.status === "new").length
    const interviews = applications.filter((app) => app.status === "interview_scheduled").length
    const accepted = applications.filter((app) => app.status === "accepted").length

    return { total, newApps, interviews, accepted }
  }

  const stats = getApplicationStats()

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
  }

  return (
    <StartupLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-1">Review and manage student applications</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.newApps}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.interviews}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={opportunityFilter} onValueChange={setOpportunityFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by opportunity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Opportunities</SelectItem>
                  {opportunities.map((opp) => (
                    <SelectItem key={opp.id} value={opp.id.toString()}>
                      {opp.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={application.student.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">
                        {application.student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{application.student.name}</h3>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{getStatusText(application.status)}</span>
                        </Badge>
                        <Badge className="bg-green-100 text-green-700">
                          <Star className="h-3 w-3 mr-1" />
                          {application.matchScore}% Match
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <GraduationCap className="h-4 w-4" />
                            <span>{application.student.university}</span>
                          </span>
                          <span>
                            {application.student.year} • {application.student.major}
                          </span>
                          <span>GPA: {application.student.gpa}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{application.student.location}</span>
                          </span>
                          <span>Applied for: {application.opportunity.title}</span>
                        </div>
                        <div>
                          <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span>Available: {application.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {application.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Cover Letter Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{application.coverLetter}</p>
                </div>

                {/* Interview Info */}
                {application.status === "interview_scheduled" && application.interviewDate && (
                  <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-purple-700">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Interview Scheduled</span>
                    </div>
                    <p className="text-sm text-purple-600 mt-1">
                      {new Date(application.interviewDate).toLocaleDateString()} at {application.interviewTime}
                    </p>
                  </div>
                )}

                {/* Accepted Info */}
                {application.status === "accepted" && application.acceptedAt && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Application Accepted</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      Accepted on {new Date(application.acceptedAt).toLocaleDateString()}
                      <span className="mx-2">•</span>
                      Start date: {new Date(application.startDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Portfolio
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    {application.status === "new" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(application.id, "under_review")}
                        >
                          Review
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(application.id, "interview_scheduled")}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Schedule Interview
                        </Button>
                      </>
                    )}
                    {application.status === "under_review" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(application.id, "rejected")}
                          className="text-red-600 hover:text-red-700"
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(application.id, "interview_scheduled")}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Schedule Interview
                        </Button>
                      </>
                    )}
                    {application.status === "interview_scheduled" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(application.id, "rejected")}
                          className="text-red-600 hover:text-red-700"
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(application.id, "accepted")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Accept
                        </Button>
                      </>
                    )}
                    {(application.status === "accepted" || application.status === "rejected") && (
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <User className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== "all" || opportunityFilter !== "all"
                  ? "Try adjusting your search criteria"
                  : "No applications have been received yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </StartupLayout>
  )
}
