import { Component } from "react"
import { X } from "lucide-react"
import TicketForm from "./TicketForm"

class CreateTicketModal extends Component {
  render() {
    const { isOpen, onClose, onSubmit } = this.props

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Create New Ticket</h2>
          <TicketForm
            onSubmit={(ticketData) => {
              onSubmit(ticketData)
              onClose()
            }}
          />
        </div>
      </div>
    )
  }
}

export default CreateTicketModal

