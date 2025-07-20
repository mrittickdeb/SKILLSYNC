"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  MoreVertical,
} from "lucide-react"
import { StartupLayout } from "@/components/layouts/StartupLayout"

export default function StartupOpportunities() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: "Frontend Developer Intern",
      type: "Internship",
      status: "active",
      location: "San Francisco, CA",
      isRemote: true,
      duration: "3-6 months",
      compensation: "$2,000/month",
      applications: 12,
      views: 45,
      postedAt: "2024-01-15",
      deadline: "2024-02-15",
      requiredSkills: ["React", "TypeScript", "CSS"],
      description: "Join our team to build cutting-edge AI interfaces using React and TypeScript.",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      type: "Part-time",
      status: "active",
      location: "Los Angeles, CA",
      isRemote: false,
      duration: "Ongoing",
      compensation: "$25/hour",
      applications: 8,
      views: 32,
      postedAt: "2024-01-10",
      deadline: "2024-02-10",
      requiredSkills: ["Figma", "Adobe XD", "Prototyping"],
      description: "Create beautiful and intuitive user experiences for our mobile and web applications.",
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      type: "Internship",
      status: "paused",
      location: "Remote",
      isRemote: true,
      duration: "4 months",
      compensation: "$1,800/month",
      applications: 5,
      views: 28,
      postedAt: "2024-01-05",
      deadline: "2024-02-05",
      requiredSkills: ["Python", "SQL", "Tableau"],
      description: "Analyze user data and create insights to drive product decisions.",
    },
    {
      id: 4,
      title: "Mobile App Developer",
      type: "Micro-gig",
      status: "closed",
      location: "Seattle, WA",
      isRemote: true,
      duration: "2 weeks",
      compensation: "$1,500 fixed",
      applications: 15,
      views: 67,
      postedAt: "2024-01-01",
      deadline: "2024-01-20",
      requiredSkills: ["React Native", "JavaScript", "Mobile"],
      description: "Build a mobile app prototype for our new product concept.",
    },
  ])

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || opp.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "paused":
        return "bg-yellow-100 text-yellow-700"
      case "closed":
        return "bg-red-100 text-red-700"
      case "draft":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "paused":
        return "Paused"
      case "closed":
        return "Closed"
      case "draft":
        return "Draft"
      default:
        return status
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "internship":
        return "bg-blue-100 text-blue-700"
      case "micro-gig":
        return "bg-purple-100 text-purple-700"
      case "part-time":
        return "bg-indigo-100 text-indigo-700"
      case "co-founder":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getOpportunityStats = () => {
    const total = opportunities.length
    const active = opportunities.filter((opp) => opp.status === "active").length
    const totalApplications = opportunities.reduce((sum, opp) => sum + opp.applications, 0)
    const totalViews = opportunities.reduce((sum, opp) => sum + opp.views, 0)

    return { total, active, totalApplications, totalViews }
  }

  const stats = getOpportunityStats()

  const handleStatusChange = (id: number, newStatus: string) => {
    setOpportunities((prev) => prev.map((opp) => (opp.id === id ? { ...opp, status: newStatus } : opp)))
  }

  const handleDelete = (id: number) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id))
  }

  return (
    <StartupLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Opportunities</h1>
            <p className="text-gray-600 mt-1">Manage your job postings and track applications</p>
          </div>
          <Link href="/startup/opportunities/create">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              Post New Opportunity
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Opportunities</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
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
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Eye className="h-6 w-6 text-orange-600" />
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
                  placeholder="Search opportunities..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold">{opportunity.title}</h3>
                      <Badge className={getStatusColor(opportunity.status)}>{getStatusText(opportunity.status)}</Badge>
                      <Badge className={getTypeColor(opportunity.type)}>{opportunity.type}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{opportunity.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{opportunity.location}</span>
                        {opportunity.isRemote && (
                          <Badge variant="secondary" className="ml-1 text-xs">
                            Remote
                          </Badge>
                        )}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{opportunity.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{opportunity.compensation}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Posted {new Date(opportunity.postedAt).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-6 text-sm">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{opportunity.applications}</span>
                      <span className="text-gray-500">applications</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{opportunity.views}</span>
                      <span className="text-gray-500">views</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.requiredSkills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {opportunity.requiredSkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{opportunity.requiredSkills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {opportunity.status === "active" ? (
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(opportunity.id, "paused")}>
                        Pause
                      </Button>
                    ) : opportunity.status === "paused" ? (
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(opportunity.id, "active")}>
                        Activate
                      </Button>
                    ) : null}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(opportunity.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Eye className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search criteria"
                  : "You haven't posted any opportunities yet"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Link href="/startup/opportunities/create">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Your First Opportunity
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </StartupLayout>
  )
}
