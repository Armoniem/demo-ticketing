"use client"

import { Component } from "react"
import { ticketService } from "../../services/ticketService"
import TicketList from "../../components/tickets/TicketList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { motion } from "framer-motion"

class TicketsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: [],
      filteredTickets: [],
      isLoading: true,
      error: null,
      searchQuery: "",
      statusFilter: "all",
      sortBy: "newest",
    }
  }

  componentDidMount() {
    this.fetchTickets()
  }

  fetchTickets = async () => {
    try {
      const tickets = await ticketService.getAllTickets()
      this.setState({ tickets, filteredTickets: tickets, isLoading: false })
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }
  }

  handleSearchChange = (e) => {
    const searchQuery = e.target.value
    this.setState({ searchQuery }, this.filterTickets)
  }

  handleStatusFilterChange = (value) => {
    this.setState({ statusFilter: value }, this.filterTickets)
  }

  handleSortChange = (value) => {
    this.setState({ sortBy: value }, this.filterTickets)
  }

  filterTickets = () => {
    const { tickets, searchQuery, statusFilter, sortBy } = this.state
    let filteredTickets = tickets

    if (searchQuery) {
      filteredTickets = filteredTickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filteredTickets = filteredTickets.filter((ticket) => ticket.status === statusFilter)
    }

    filteredTickets.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt)
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return 0
    })

    this.setState({ filteredTickets })
  }

  render() {
    const { filteredTickets, isLoading, error, searchQuery, statusFilter, sortBy } = this.state

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
          <h1 className="text-3xl font-bold">Tickets</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter and Sort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
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
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={this.handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <TicketList tickets={filteredTickets} />
        </motion.div>
      </motion.div>
    )
  }
}

export default TicketsPage

