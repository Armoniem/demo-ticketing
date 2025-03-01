import { Component } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ticketService } from "../../services/ticketService"
import TicketList from "../../components/tickets/TicketList"
import TicketForm from "../../components/tickets/TicketForm"

class UserDashboard extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      tickets: [],
      isLoading: true,
      error: null,
      showTicketForm: false,
    }
  }

  componentDidMount() {
    this.fetchUserTickets()
  }

  fetchUserTickets = async () => {
    try {
      const { user } = this.context
      const tickets = await ticketService.getUserTickets(user.id)
      this.setState({ tickets, isLoading: false })
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
        showTicketForm: false,
      }))
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  toggleTicketForm = () => {
    this.setState((prevState) => ({
      showTicketForm: !prevState.showTicketForm,
    }))
  }

  render() {
    const { tickets, isLoading, error, showTicketForm } = this.state
    const { user } = this.context

    if (isLoading) {
      return <div className="text-center py-8">Loading...</div>
    }

    if (error) {
      return <div className="text-center py-8 text-red-600">Error: {error}</div>
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <button
            onClick={this.toggleTicketForm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showTicketForm ? "Cancel" : "Create New Ticket"}
          </button>
        </div>

        {showTicketForm ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New Support Ticket</h2>
            <TicketForm onSubmit={this.handleCreateTicket} />
          </div>
        ) : null}

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Support Tickets</h2>
          {tickets.length > 0 ? (
            <TicketList tickets={tickets} />
          ) : (
            <p className="text-gray-500">You don't have any support tickets yet.</p>
          )}
        </div>
      </div>
    )
  }
}

export default UserDashboard

