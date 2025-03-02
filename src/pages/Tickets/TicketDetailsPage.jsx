"use client"

import { Component } from "react"
import { useParams, Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { ticketService } from "../../services/ticketService"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import AttachmentList from "../../components/tickets/AttachmentList"
import LiveChat from "../../components/chat/LiveChat"
import AIChat from "../../components/chat/AIChat"
import VideoChat from "../../components/support/VideoChat"
import { Paperclip, ChevronLeft, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"

class TicketDetailsPage extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      ticket: null,
      isLoading: true,
      error: null,
      reply: "",
      newAttachments: [],
      newStatus: "",
      newPriority: "",
    }
  }

  componentDidMount() {
    this.fetchTicket(this.props.id)
  }

  fetchTicket = async (ticketId) => {
    try {
      const ticket = await ticketService.getTicketById(ticketId)
      this.setState({
        ticket,
        isLoading: false,
        newStatus: ticket.status,
        newPriority: ticket.priority,
      })
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }
  }

  handleReplyChange = (e) => {
    this.setState({ reply: e.target.value })
  }

  handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files)
    this.setState((prevState) => ({
      newAttachments: [...prevState.newAttachments, ...files],
    }))
  }

  handleSubmitReply = async (e) => {
    e.preventDefault()
    const { reply, newAttachments, ticket } = this.state
    const { user } = this.context

    try {
      const newReply = {
        content: reply,
        attachments: newAttachments,
        author: user.name,
        isAdmin: user.role === "admin",
        createdAt: new Date().toISOString(),
      }

      const updatedTicket = await ticketService.addReplyToTicket(ticket.id, newReply)
      this.setState({
        ticket: updatedTicket,
        reply: "",
        newAttachments: [],
      })
    } catch (error) {
      console.error("Error submitting reply:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  handleStatusChange = async (value) => {
    try {
      const updatedTicket = await ticketService.updateTicketStatus(this.state.ticket.id, value)
      this.setState({ ticket: updatedTicket, newStatus: value })
    } catch (error) {
      console.error("Error updating ticket status:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  handlePriorityChange = async (value) => {
    try {
      const updatedTicket = await ticketService.updateTicketPriority(this.state.ticket.id, value)
      this.setState({ ticket: updatedTicket, newPriority: value })
    } catch (error) {
      console.error("Error updating ticket priority:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  render() {
    const { ticket, isLoading, error, reply, newAttachments, newStatus, newPriority } = this.state
    const { user } = this.context
    const isAdmin = user && user.role === "admin"

    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (error) {
      return <div className="flex justify-center items-center h-screen text-red-600">Error: {error}</div>
    }

    if (!ticket) {
      return <div className="flex justify-center items-center h-screen">Ticket not found</div>
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-6"
      >
        <div className="flex items-center justify-between">
          <Link to="/tickets" className="flex items-center text-blue-600 hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Tickets
          </Link>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">Last updated: {new Date(ticket.updatedAt).toLocaleString()}</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{ticket.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    Status: <span className="font-medium">{ticket.status}</span>
                  </div>
                  <div>
                    Priority: <span className="font-medium">{ticket.priority}</span>
                  </div>
                  <div>
                    Created: <span className="font-medium">{new Date(ticket.createdAt).toLocaleString()}</span>
                  </div>
                  <div>
                    Ticket ID: <span className="font-medium">{ticket.id}</span>
                  </div>
                </div>
              </div>
              {ticket.attachments && ticket.attachments.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Attachments</h3>
                  <AttachmentList attachments={ticket.attachments} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticket.replies &&
                ticket.replies.map((reply, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${reply.isAdmin ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-800"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-8 h-8 rounded-full ${reply.isAdmin ? "bg-blue-200" : "bg-gray-200"} flex items-center justify-center`}
                      >
                        <span className={`${reply.isAdmin ? "text-blue-600" : "text-gray-600"} font-semibold`}>
                          {reply.author[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{reply.author}</p>
                        <p className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                    {reply.attachments && reply.attachments.length > 0 && (
                      <div className="mt-2">
                        <AttachmentList attachments={reply.attachments} />
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Response</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={this.handleSubmitReply}>
              <div className="mb-4">
                <Textarea
                  value={reply}
                  onChange={this.handleReplyChange}
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Type your reply..."
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    id="attachment"
                    className="hidden"
                    multiple
                    onChange={this.handleAttachmentChange}
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("attachment").click()}>
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach Files
                  </Button>
                  {newAttachments.length > 0 && (
                    <span className="text-sm text-gray-500">{newAttachments.length} file(s) selected</span>
                  )}
                </div>
                <Button type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Ticket Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <Select value={newStatus} onValueChange={this.handleStatusChange}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <Select value={newPriority} onValueChange={this.handlePriorityChange}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiveChat ticketId={ticket.id} userId={user.id} />
          <AIChat ticketId={ticket.id} />
        </div>
        <VideoChat ticketId={ticket.id} userId={user.id} />
      </motion.div>
    )
  }
}

// Wrapper to get URL params
const TicketDetailsPageWrapper = () => {
  const { id } = useParams()
  return <TicketDetailsPage id={id} />
}

export default TicketDetailsPageWrapper

