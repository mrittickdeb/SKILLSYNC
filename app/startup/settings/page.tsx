"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Building, Bell, Shield, Users, Mail, Phone, Globe, Save, Upload, Download, CreditCard } from "lucide-react"
import { StartupLayout } from "@/components/layouts/StartupLayout"
import { useToast } from "@/hooks/use-toast"

export default function StartupSettings() {
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const [companySettings, setCompanySettings] = useState({
    companyName: "TechFlow AI",
    website: "https://techflow.ai",
    email: "contact@techflow.ai",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    industry: "AI/ML",
    size: "11-50 employees",
    founded: "2023",
    description: "We're building the next generation of AI-powered user interfaces.",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newApplications: true,
    applicationUpdates: true,
    messages: true,
    systemUpdates: true,
    weeklyReports: true,
    marketingEmails: false,
    frequency: "immediate",
  })

  const [privacySettings, setPrivacySettings] = useState({
    companyVisibility: "public",
    showContactInfo: true,
    allowDirectMessages: true,
    showEmployeeCount: true,
    dataProcessing: true,
    analytics: true,
  })

  const [billingSettings, setBillingSettings] = useState({
    plan: "Pro",
    billingCycle: "monthly",
    nextBillingDate: "2024-02-15",
    paymentMethod: "**** **** **** 1234",
    billingEmail: "billing@techflow.ai",
  })

  const [teamSettings, setTeamSettings] = useState({
    allowTeamInvites: true,
    requireApproval: true,
    defaultRole: "member",
    maxTeamSize: 10,
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleSaveCompany = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/startup/settings/company", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(companySettings),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Company settings updated successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update company settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/startup/settings/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(notificationSettings),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Notification settings updated successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSavePrivacy = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/startup/settings/privacy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(privacySettings),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Privacy settings updated successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update privacy settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <StartupLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
          <p className="text-gray-600 mt-1">Manage your company profile and platform preferences</p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Company</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Team</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80&text=TF" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {companySettings.companyName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Logo
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or SVG. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companySettings.companyName}
                      onChange={(e) => setCompanySettings((prev) => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <Input
                        id="website"
                        value={companySettings.website}
                        onChange={(e) => setCompanySettings((prev) => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Company Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={companySettings.email}
                        onChange={(e) => setCompanySettings((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={companySettings.phone}
                        onChange={(e) => setCompanySettings((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={companySettings.industry}
                      onValueChange={(value) => setCompanySettings((prev) => ({ ...prev, industry: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size">Company Size</Label>
                    <Select
                      value={companySettings.size}
                      onValueChange={(value) => setCompanySettings((prev) => ({ ...prev, size: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                        <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                        <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                        <SelectItem value="200+ employees">200+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="founded">Founded</Label>
                    <Input
                      id="founded"
                      value={companySettings.founded}
                      onChange={(e) => setCompanySettings((prev) => ({ ...prev, founded: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveCompany} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about platform activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Notification Types</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>New Applications</Label>
                      <Switch
                        checked={notificationSettings.newApplications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, newApplications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Application Updates</Label>
                      <Switch
                        checked={notificationSettings.applicationUpdates}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, applicationUpdates: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Messages</Label>
                      <Switch
                        checked={notificationSettings.messages}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, messages: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>System Updates</Label>
                      <Switch
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, systemUpdates: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Weekly Reports</Label>
                      <Switch
                        checked={notificationSettings.weeklyReports}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, weeklyReports: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Marketing Emails</Label>
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) =>
                          setNotificationSettings((prev) => ({ ...prev, marketingEmails: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label htmlFor="frequency">Notification Frequency</Label>
                  <Select
                    value={notificationSettings.frequency}
                    onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, frequency: value }))}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveNotifications} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your company's visibility and data usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="companyVisibility">Company Profile Visibility</Label>
                  <Select
                    value={privacySettings.companyVisibility}
                    onValueChange={(value) => setPrivacySettings((prev) => ({ ...prev, companyVisibility: value }))}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can view</SelectItem>
                      <SelectItem value="private">Private - Only invited users</SelectItem>
                      <SelectItem value="verified">Verified Students Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Information Visibility</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Show Contact Information</Label>
                      <Switch
                        checked={privacySettings.showContactInfo}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({ ...prev, showContactInfo: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Show Employee Count</Label>
                      <Switch
                        checked={privacySettings.showEmployeeCount}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({ ...prev, showEmployeeCount: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Allow Direct Messages</Label>
                      <Switch
                        checked={privacySettings.allowDirectMessages}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({ ...prev, allowDirectMessages: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Data Usage</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Data Processing</Label>
                        <p className="text-sm text-gray-500">Allow us to process data to improve matching</p>
                      </div>
                      <Switch
                        checked={privacySettings.dataProcessing}
                        onCheckedChange={(checked) =>
                          setPrivacySettings((prev) => ({ ...prev, dataProcessing: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Analytics</Label>
                        <p className="text-sm text-gray-500">Help us improve the platform with usage analytics</p>
                      </div>
                      <Switch
                        checked={privacySettings.analytics}
                        onCheckedChange={(checked) => setPrivacySettings((prev) => ({ ...prev, analytics: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSavePrivacy} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>Manage your subscription and payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-blue-900">Current Plan: {billingSettings.plan}</h4>
                      <p className="text-sm text-blue-700">Billed {billingSettings.billingCycle}</p>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Next Billing Date</Label>
                    <p className="text-sm text-gray-600 mt-1">{billingSettings.nextBillingDate}</p>
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <p className="text-sm text-gray-600 mt-1">{billingSettings.paymentMethod}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="billingEmail">Billing Email</Label>
                  <Input
                    id="billingEmail"
                    type="email"
                    value={billingSettings.billingEmail}
                    onChange={(e) => setBillingSettings((prev) => ({ ...prev, billingEmail: e.target.value }))}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline">Update Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Team Management */}
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage team access and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Team Invites</Label>
                    <p className="text-sm text-gray-500">Let team members invite others</p>
                  </div>
                  <Switch
                    checked={teamSettings.allowTeamInvites}
                    onCheckedChange={(checked) => setTeamSettings((prev) => ({ ...prev, allowTeamInvites: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Approval</Label>
                    <p className="text-sm text-gray-500">Require admin approval for new team members</p>
                  </div>
                  <Switch
                    checked={teamSettings.requireApproval}
                    onCheckedChange={(checked) => setTeamSettings((prev) => ({ ...prev, requireApproval: checked }))}
                  />
                </div>

                <div>
                  <Label htmlFor="defaultRole">Default Role for New Members</Label>
                  <Select
                    value={teamSettings.defaultRole}
                    onValueChange={(value) => setTeamSettings((prev) => ({ ...prev, defaultRole: value }))}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
                  <Input
                    id="maxTeamSize"
                    type="number"
                    value={teamSettings.maxTeamSize}
                    onChange={(e) =>
                      setTeamSettings((prev) => ({ ...prev, maxTeamSize: Number.parseInt(e.target.value) }))
                    }
                    className="mt-2"
                  />
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Team Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StartupLayout>
  )
}
