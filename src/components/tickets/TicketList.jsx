import { Component } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"

class TicketList extends Component {
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
    const { tickets } = this.props

    return (
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Link key={ticket.id} to={`/ticket/${ticket.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    <p className="text-gray-600 mt-1">{ticket.description}</p>
                    <div className="mt-2 text-sm text-gray-500">Created on {this.formatDate(ticket.createdAt)}</div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${this.getStatusBadgeClass(ticket.status)}`}
                  >
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
  }
}

export default TicketList

