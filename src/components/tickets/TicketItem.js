import { Component } from "react"

class TicketItem extends Component {
  getStatusBadgeClass = (status) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  render() {
    const { ticket } = this.props
    const statusClass = this.getStatusBadgeClass(ticket.status)

    return (
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{ticket.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{ticket.description}</p>
        <div className="mt-3 text-sm text-gray-500">Created on {this.formatDate(ticket.createdAt)}</div>
      </div>
    )
  }
}

export default TicketItem

