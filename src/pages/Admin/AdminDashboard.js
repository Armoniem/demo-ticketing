import { Component } from "react"
import { ticketService } from "../../services/ticketService"
import AdminTicketList from "../../components/tickets/AdminTicketList"

class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: [],
      isLoading: true,
      error: null,
      statusFilter: "all",
    }
  }

  componentDidMount() {
    this.fetchAllTickets()
  }

  fetchAllTickets = async () => {
    try {
      const tickets = await ticketService.getAllTickets()
      this.setState({ tickets, isLoading: false })
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }
  }

  handleStatusChange = async (ticketId, newStatus) => {
    try {
      await ticketService.updateTicketStatus(ticketId, newStatus)
      this.setState((prevState) => ({
        tickets: prevState.tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket,
        ),
      }))
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  handleFilterChange = (e) => {
    this.setState({ statusFilter: e.target.value })
  }

  getFilteredTickets = () => {
    const { tickets, statusFilter } = this.state
    if (statusFilter === "all") {
      return tickets
    }
    return tickets.filter((ticket) => ticket.status === statusFilter)
  }

  render() {
    const { isLoading, error, statusFilter } = this.state
    const filteredTickets = this.getFilteredTickets()

    if (isLoading) {
      return <div className="text-center py-8">Loading...</div>
    }

    if (error) {
      return <div className="text-center py-8 text-red-600">Error: {error}</div>
    }

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="mb-6">
          <label htmlFor="statusFilter" className="mr-2 font-medium">
            Filter by status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={this.handleFilterChange}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
          {filteredTickets.length > 0 ? (
            <AdminTicketList tickets={filteredTickets} onStatusChange={this.handleStatusChange} />
          ) : (
            <p className="text-gray-500">No tickets found.</p>
          )}
        </div>
      </div>
    )
  }
}

export default AdminDashboard

