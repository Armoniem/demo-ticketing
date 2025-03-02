// Mock ticket service
const tickets = [
  {
    id: "1",
    title: "Cannot access my account",
    description: "I am unable to login to my account since yesterday.",
    status: "open",
    priority: "high",
    userId: "1",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    replies: [],
    attachments: [],
  },
  {
    id: "2",
    title: "Feature request",
    description: "I would like to request a new feature for the dashboard.",
    status: "in-progress",
    priority: "medium",
    userId: "1",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    replies: [],
    attachments: [],
  },
  {
    id: "3",
    title: "Billing issue",
    description: "I was charged twice for my subscription.",
    status: "closed",
    priority: "high",
    userId: "3",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    replies: [],
    attachments: [],
  },
]

export const ticketService = {
  getUserTickets: async (userId) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userTickets = tickets.filter((ticket) => ticket.userId === userId)
        resolve(userTickets)
      }, 500)
    })
  },

  getAllTickets: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...tickets])
      }, 500)
    })
  },

  getTicketById: async (ticketId) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticket = tickets.find((t) => t.id === ticketId)
        if (ticket) {
          resolve({ ...ticket })
        } else {
          reject(new Error("Ticket not found"))
        }
      }, 500)
    })
  },

  createTicket: async (ticketData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTicket = {
          id: Math.random().toString(36).substr(2, 9),
          ...ticketData,
          status: "open",
          priority: ticketData.priority || "medium",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          replies: [],
          attachments: [],
        }
        tickets.push(newTicket)
        resolve(newTicket)
      }, 500)
    })
  },

  updateTicketStatus: async (ticketId, status) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticketIndex = tickets.findIndex((t) => t.id === ticketId)
        if (ticketIndex !== -1) {
          tickets[ticketIndex] = {
            ...tickets[ticketIndex],
            status,
            updatedAt: new Date().toISOString(),
          }
          resolve(tickets[ticketIndex])
        } else {
          reject(new Error("Ticket not found"))
        }
      }, 500)
    })
  },

  updateTicketPriority: async (ticketId, priority) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticketIndex = tickets.findIndex((t) => t.id === ticketId)
        if (ticketIndex !== -1) {
          tickets[ticketIndex] = {
            ...tickets[ticketIndex],
            priority,
            updatedAt: new Date().toISOString(),
          }
          resolve(tickets[ticketIndex])
        } else {
          reject(new Error("Ticket not found"))
        }
      }, 500)
    })
  },

  addReplyToTicket: async (ticketId, reply) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticketIndex = tickets.findIndex((t) => t.id === ticketId)
        if (ticketIndex !== -1) {
          tickets[ticketIndex] = {
            ...tickets[ticketIndex],
            replies: [...tickets[ticketIndex].replies, reply],
            updatedAt: new Date().toISOString(),
          }
          resolve(tickets[ticketIndex])
        } else {
          reject(new Error("Ticket not found"))
        }
      }, 500)
    })
  },
}

