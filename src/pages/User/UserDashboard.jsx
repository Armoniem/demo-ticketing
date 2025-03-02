"use client"

import { Component } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ticketService } from "../../services/ticketService"
import TicketList from "../../components/tickets/TicketList"
import CreateTicketModal from "../../components/tickets/CreateTicketModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Search, Plus } from "lucide-react"
import { motion } from "framer-motion"

class UserDashboard extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      tickets: [],
      filteredTickets: [],
      isLoading: true,
      error: null,
      isCreateTicketModalOpen: false,
      statusFilter: "all",
      searchQuery: "",
      currentPage: 1,
      ticketsPerPage: 5,
      sortBy: null,
    }
  }

  componentDidMount() {
    this.fetchUserTickets()
  }

  fetchUserTickets = async () => {
    try {
      const { user } = this.context
      const tickets = await ticketService.getUserTickets(user.id)
      this.setState({ tickets, filteredTickets: tickets, isLoading: false })
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }
  }

  handleCreateTicket = async (ticketData) => {
    try {
      const { user } = this.context
      const newTicket = await ticketService.createTicket({
        ...ticketData,
        userId: user.id,
      })
      this.setState((prevState) => ({
        tickets: [...prevState.tickets, newTicket],
        filteredTickets: [...prevState.filteredTickets, newTicket],
        isCreateTicketModalOpen: false,
      }))
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  toggleCreateTicketModal = () => {
    this.setState((prevState) => ({
      isCreateTicketModalOpen: !prevState.isCreateTicketModalOpen,
    }))
  }

  handleStatusFilterChange = (value) => {
    this.setState({ statusFilter: value }, this.filterTickets)
  }

  handleSearchChange = (e) => {
    const searchQuery = e.target.value
    this.setState({ searchQuery }, this.filterTickets)
  }

  filterTickets = () => {
    const { tickets, statusFilter, searchQuery } = this.state
    let filteredTickets = tickets

    if (statusFilter !== "all") {
      filteredTickets = filteredTickets.filter((ticket) => ticket.status === statusFilter)
    }

    if (searchQuery) {
      filteredTickets = filteredTickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    this.setState({ filteredTickets, currentPage: 1 })
  }

  getTicketStatistics = () => {
    const { tickets } = this.state
    return {
      total: tickets.length,
      open: tickets.filter((ticket) => ticket.status === "open").length,
      inProgress: tickets.filter((ticket) => ticket.status === "in-progress").length,
      closed: tickets.filter((ticket) => ticket.status === "closed").length,
    }
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }

  render() {
    const { filteredTickets, isLoading, error, searchQuery, statusFilter, sortBy } = this.state
    const { user } = this.context
    const stats = this.getTicketStatistics()

    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (error) {
      return <div className="flex justify-center items-center h-screen text-red-600">Error: {error}</div>
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <Button onClick={this.toggleCreateTicketModal}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(stats).map(([key, value]) => (
            <motion.div key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{key.replace(/([A-Z])/g, " $1").trim()}</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Support Tickets</CardTitle>
            <CardDescription>Manage and track your support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={this.handleSearchChange}
                  className="w-full"
                  icon={<Search className="w-4 h-4 text-gray-500" />}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={this.handleStatusFilterChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tickets</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <TicketList tickets={filteredTickets} />
            </motion.div>
          </CardContent>
        </Card>

        <CreateTicketModal
          isOpen={this.state.isCreateTicketModalOpen}
          onClose={this.toggleCreateTicketModal}
          onSubmit={this.handleCreateTicket}
        />
      </motion.div>
    )
  }
}

export default UserDashboard

