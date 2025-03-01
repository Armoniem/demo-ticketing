import { Component } from "react"

class AdminTicketList extends Component {
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

  handleStatusChange = (ticketId, e) => {
    const newStatus = e.target.value
    this.props.onStatusChange(ticketId, newStatus)
  }

  render() {
    const { tickets } = this.props

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Created</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{ticket.id}</td>
                <td className="py-3 px-4 font-medium">{ticket.title}</td>
                <td className="py-3 px-4 text-sm">{ticket.description.substring(0, 50)}...</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${this.getStatusBadgeClass(ticket.status)}`}
                  >
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">{this.formatDate(ticket.createdAt)}</td>
                <td className="py-3 px-4">
                  <select
                    value={ticket.status}
                    onChange={(e) => this.handleStatusChange(ticket.id, e)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminTicketList

