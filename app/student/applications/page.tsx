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
  Calendar,
  MapPin,
  Clock,
  Briefcase,
  MessageSquare,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  ExternalLink,
  Filter,
} from "lucide-react"
import { StudentLayout } from "@/components/layouts/StudentLayout"

export default function StudentApplications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [applications, setApplications] = useState([
    {
      id: 1,
      opportunity: {
        title: "Frontend Developer Intern",
        company: "TechFlow AI",
        type: "Internship",
        location: "San Francisco, CA",
        isRemote: true,
        logo: "/placeholder.svg?height=40&width=40&text=TF",
      },
      status: "interview_scheduled",
      appliedAt: "2024-01-15",
      lastUpdate: "2024-01-18",
      matchScore: 95,
      coverLetter: "I am excited to apply for the Frontend Developer Intern position...",
      interviewDate: "2024-01-22",
      interviewTime: "2:00 PM PST",
      feedback: "Great portfolio! Looking forward to our interview.",
      messages: 3,
    },
    {
      id: 2,
      opportunity: {
        title: "UI/UX Designer",
        company: "DesignCorp",
        type: "Part-time",
        location: "Los Angeles, CA",
        isRemote: false,
        logo: "/placeholder.svg?height=40&width=40&text=DC",
      },
      status: "under_review",
      appliedAt: "2024-01-10",
      lastUpdate: "2024-01-12",
      matchScore: 88,
      coverLetter: "As a passionate designer with experience in user-centered design...",
      feedback: "Application received and under review.",
      messages: 1,
    },
    {
      id: 3,
      opportunity: {
        title: "Data Analyst Intern",
        company: "DataDriven",
        type: "Internship",
        location: "Remote",
        isRemote: true,
        logo: "/placeholder.svg?height=40&width=40&text=DD",
      },
      status: "applied",
      appliedAt: "2024-01-08",
      lastUpdate: "2024-01-08",
      matchScore: 76,
      coverLetter: "I am writing to express my interest in the Data Analyst position...",
      messages: 0,
    },
    {
      id: 4,
      opportunity: {
        title: "Full Stack Developer",
        company: "InnovateLab",
        type: "Co-founder",
        location: "New York, NY",
        isRemote: true,
        logo: "/placeholder.svg?height=40&width=40&text=IL",
      },
      status: "accepted",
      appliedAt: "2024-01-05",
      lastUpdate: "2024-01-20",
      matchScore: 92,
      coverLetter: "I am thrilled to apply for the co-founder opportunity...",
      feedback: "Congratulations! We'd love to have you join our team.",
      messages: 8,
      startDate: "2024-02-01",
    },
    {
      id: 5,
      opportunity: {
        title: "Mobile App Developer",
        company: "AppVenture",
        type: "Micro-gig",
        location: "Seattle, WA",
        isRemote: true,
        logo: "/placeholder.svg?height=40&width=40&text=AV",
      },
      status: "rejected",
      appliedAt: "2024-01-03",
      lastUpdate: "2024-01-15",
      matchScore: 71,
      coverLetter: "I am interested in the mobile development opportunity...",
      feedback: "Thank you for your application. We've decided to move forward with other candidates.",
      messages: 2,
    },
  ])

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.opportunity.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-700"
      case "under_review":
        return "bg-yellow-100 text-yellow-700"
      case "interview_scheduled":
        return "bg-purple-100 text-purple-700"
      case "accepted":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "withdrawn":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4" />
      case "under_review":
        return <Eye className="h-4 w-4" />
      case "interview_scheduled":
        return <Calendar className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "withdrawn":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "applied":
        return "Applied"
      case "under_review":
        return "Under Review"
      case "interview_scheduled":
        return "Interview Scheduled"
      case "accepted":
        return "Accepted"
      case "rejected":
        return "Rejected"
      case "withdrawn":
        return "Withdrawn"
      default:
        return status
    }
  }

  const getApplicationStats = () => {
    const total = applications.length
    const pending = applications.filter((app) =>
      ["applied", "under_review", "interview_scheduled"].includes(app.status),
    ).length
    const accepted = applications.filter((app) => app.status === "accepted").length
    const rejected = applications.filter((app) => app.status === "rejected").length

    return { total, pending, accepted, rejected }
  }

  const stats = getApplicationStats()

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600 mt-1">Track and manage your job applications</p>
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
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0}%
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
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
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={application.opportunity.logo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {application.opportunity.company.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{application.opportunity.title}</h3>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{getStatusText(application.status)}</span>
                        </Badge>
                        <Badge className="bg-green-100 text-green-700">{application.matchScore}% Match</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{application.opportunity.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{application.opportunity.type}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{application.opportunity.location}</span>
                          {application.opportunity.isRemote && (
                            <Badge variant="secondary" className="ml-1 text-xs">
                              Remote
                            </Badge>
                          )}
                        </span>
                        <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="space-y-3">
                  {application.status === "interview_scheduled" && application.interviewDate && (
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-purple-700">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Interview Scheduled</span>
                      </div>
                      <p className="text-sm text-purple-600 mt-1">
                        {new Date(application.interviewDate).toLocaleDateString()} at {application.interviewTime}
                      </p>
                    </div>
                  )}

                  {application.status === "accepted" && application.startDate && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">Congratulations! You've been accepted</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Start date: {new Date(application.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {application.feedback && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Feedback:</span> {application.feedback}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Last updated: {new Date(application.lastUpdate).toLocaleDateString()}</span>
                      {application.messages > 0 && (
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{application.messages} messages</span>
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {application.messages > 0 && (
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Messages
                        </Button>
                      )}
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Job
                      </Button>
                    </div>
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
                <FileText className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search criteria"
                  : "You haven't applied to any opportunities yet"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Browse Opportunities</Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  )
}
