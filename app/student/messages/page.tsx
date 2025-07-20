"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Search, Paperclip, MoreVertical, Phone, Video, Info, ImageIcon, Smile } from "lucide-react"
import { StudentLayout } from "@/components/layouts/StudentLayout"

export default function StudentMessages() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [conversations, setConversations] = useState([
    {
      id: 1,
      company: "TechFlow AI",
      contact: "Sarah Johnson",
      role: "HR Manager",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      lastMessage: "Great! Looking forward to our interview tomorrow.",
      lastMessageTime: "2:30 PM",
      unreadCount: 0,
      isOnline: true,
      opportunity: "Frontend Developer Intern",
      status: "Interview Scheduled",
    },
    {
      id: 2,
      company: "StartupX",
      contact: "Mike Chen",
      role: "CTO",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      lastMessage: "Can you share your portfolio?",
      lastMessageTime: "1:15 PM",
      unreadCount: 2,
      isOnline: false,
      opportunity: "React Developer - Micro Gig",
      status: "Under Review",
    },
    {
      id: 3,
      company: "InnovateLab",
      contact: "Emily Davis",
      role: "Founder",
      avatar: "/placeholder.svg?height=40&width=40&text=ED",
      lastMessage: "Welcome to the team! 🎉",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      isOnline: true,
      opportunity: "Full Stack Developer",
      status: "Hired",
    },
    {
      id: 4,
      company: "DesignCorp",
      contact: "Alex Rodriguez",
      role: "Design Lead",
      avatar: "/placeholder.svg?height=40&width=40&text=AR",
      lastMessage: "Your design skills are impressive!",
      lastMessageTime: "2 days ago",
      unreadCount: 1,
      isOnline: false,
      opportunity: "UI/UX Designer",
      status: "Application Sent",
    },
  ])

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        sender: "Sarah Johnson",
        content:
          "Hi John! Thank you for applying to our Frontend Developer Intern position. I've reviewed your application and I'm impressed with your portfolio.",
        timestamp: "10:30 AM",
        isMe: false,
        type: "text",
      },
      {
        id: 2,
        sender: "Me",
        content:
          "Thank you so much! I'm really excited about the opportunity to work with TechFlow AI. Your company's work in AI-powered interfaces is fascinating.",
        timestamp: "10:45 AM",
        isMe: true,
        type: "text",
      },
      {
        id: 3,
        sender: "Sarah Johnson",
        content:
          "I'm glad you're interested! I'd love to schedule a quick interview to discuss the role further. Are you available tomorrow at 2 PM?",
        timestamp: "11:00 AM",
        isMe: false,
        type: "text",
      },
      {
        id: 4,
        sender: "Me",
        content: "Yes, I'm available tomorrow at 2 PM. Should this be a video call or phone interview?",
        timestamp: "11:15 AM",
        isMe: true,
        type: "text",
      },
      {
        id: 5,
        sender: "Sarah Johnson",
        content:
          "Perfect! Let's do a video call. I'll send you the Zoom link shortly. We'll discuss your experience with React and TypeScript, and I'll tell you more about our current projects.",
        timestamp: "2:15 PM",
        isMe: false,
        type: "text",
      },
      {
        id: 6,
        sender: "Me",
        content:
          "Sounds great! I'll prepare some questions about the team structure and the specific projects I'd be working on.",
        timestamp: "2:20 PM",
        isMe: true,
        type: "text",
      },
      {
        id: 7,
        sender: "Sarah Johnson",
        content: "Great! Looking forward to our interview tomorrow.",
        timestamp: "2:30 PM",
        isMe: false,
        type: "text",
      },
    ],
    2: [
      {
        id: 1,
        sender: "Mike Chen",
        content: "Hey John! I saw your application for our React micro-gig. Your GitHub profile looks solid.",
        timestamp: "12:30 PM",
        isMe: false,
        type: "text",
      },
      {
        id: 2,
        sender: "Me",
        content:
          "Hi Mike! Thanks for reaching out. I'm really interested in the project. Could you tell me more about the specific requirements?",
        timestamp: "12:45 PM",
        isMe: true,
        type: "text",
      },
      {
        id: 3,
        sender: "Mike Chen",
        content:
          "We need a landing page built with React and Tailwind CSS. It's for our new product launch. The design is ready, we just need someone to implement it.",
        timestamp: "1:00 PM",
        isMe: false,
        type: "text",
      },
      {
        id: 4,
        sender: "Mike Chen",
        content: "Can you share your portfolio?",
        timestamp: "1:15 PM",
        isMe: false,
        type: "text",
      },
    ],
    3: [
      {
        id: 1,
        sender: "Emily Davis",
        content: "Congratulations John! We're excited to have you join our team at InnovateLab.",
        timestamp: "Yesterday 3:00 PM",
        isMe: false,
        type: "text",
      },
      {
        id: 2,
        sender: "Me",
        content: "Thank you so much! I'm thrilled to be part of the team. When do I start?",
        timestamp: "Yesterday 3:15 PM",
        isMe: true,
        type: "text",
      },
      {
        id: 3,
        sender: "Emily Davis",
        content: "Welcome to the team! 🎉",
        timestamp: "Yesterday 4:00 PM",
        isMe: false,
        type: "text",
      },
    ],
    4: [
      {
        id: 1,
        sender: "Alex Rodriguez",
        content: "Hi John! I've been reviewing your design portfolio and I'm really impressed with your work.",
        timestamp: "2 days ago",
        isMe: false,
        type: "text",
      },
      {
        id: 2,
        sender: "Alex Rodriguez",
        content: "Your design skills are impressive!",
        timestamp: "2 days ago",
        isMe: false,
        type: "text",
      },
    ],
  })

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.opportunity.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentConversation = conversations.find((conv) => conv.id === selectedConversation)
  const currentMessages = messages[selectedConversation as keyof typeof messages] || []

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: currentMessages.length + 1,
        sender: "Me",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
        type: "text" as const,
      }

      setMessages((prev) => ({
        ...prev,
        [selectedConversation]: [...(prev[selectedConversation as keyof typeof prev] || []), newMsg],
      }))

      // Update conversation last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation
            ? {
                ...conv,
                lastMessage: newMessage,
                lastMessageTime: "Now",
                unreadCount: 0,
              }
            : conv,
        ),
      )

      setNewMessage("")

      // Simulate typing indicator and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        // Simulate a response (in real app, this would come from WebSocket)
        const responseMsg = {
          id: currentMessages.length + 2,
          sender: currentConversation?.contact || "Contact",
          content: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: false,
          type: "text" as const,
        }

        setMessages((prev) => ({
          ...prev,
          [selectedConversation]: [...(prev[selectedConversation as keyof typeof prev] || []), responseMsg],
        }))
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const markAsRead = (conversationId: number) => {
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hired":
        return "bg-green-100 text-green-700"
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-700"
      case "Under Review":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentMessages])

  useEffect(() => {
    if (selectedConversation) {
      markAsRead(selectedConversation)
    }
  }, [selectedConversation])

  return (
    <StudentLayout>
      <div className="h-[calc(100vh-12rem)]">
        <Card className="h-full">
          <CardContent className="p-0 h-full">
            <div className="flex h-full">
              {/* Conversations List */}
              <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Messages</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-2">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation === conversation.id
                            ? "bg-blue-50 border-l-4 border-blue-500"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                              {conversation.contact
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate">{conversation.contact}</p>
                            <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{conversation.company}</p>
                          <Badge className={`text-xs ${getStatusColor(conversation.status)} mb-1`}>
                            {conversation.status}
                          </Badge>
                          <p className="text-xs text-gray-500 truncate">{conversation.opportunity}</p>
                          <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                        </div>

                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-blue-600 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {currentConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={currentConversation.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                              {currentConversation.contact
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {currentConversation.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{currentConversation.contact}</h3>
                          <p className="text-sm text-gray-600">
                            {currentConversation.role} at {currentConversation.company}
                          </p>
                          <Badge className={`text-xs ${getStatusColor(currentConversation.status)}`}>
                            {currentConversation.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" title="Voice Call">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Video Call">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Info">
                          <Info className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="More Options">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4 bg-gray-50">
                      <div className="space-y-4">
                        {currentMessages.map((message) => (
                          <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.isMe
                                  ? "bg-blue-600 text-white rounded-br-sm"
                                  : "bg-white text-gray-900 border rounded-bl-sm"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              <p className={`text-xs mt-1 ${message.isMe ? "text-blue-100" : "text-gray-500"}`}>
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}

                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white text-gray-900 border rounded-lg px-4 py-2 max-w-xs">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" title="Attach File">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Add Image">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Add Emoji">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1"
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <div className="text-gray-400 mb-4">
                        <Send className="h-12 w-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                      <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
