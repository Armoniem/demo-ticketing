import { Component } from "react"
import TicketItem from "./TicketItem"

class TicketList extends Component {
  render() {
    const { tickets } = this.props

    return (
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    )
  }
}

export default TicketList

