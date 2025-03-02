"use client"

import { Component } from "react"
import { Link } from "react-router-dom"
import { ticketService } from "../../services/ticketService"
import AdminTicketList from "../../components/tickets/AdminTicketList"
import TicketAnalytics from "../../components/dashboard/TicketAnalytics"
import AgentDashboard from "../../components/gamification/AgentDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, Settings, FileText } from "lucide-react"
import { motion } from "framer-motion"

class AdminDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: [],
      isLoading: true,
      error: null,
      stats: {
        totalTickets: 0,
        openTickets: 0,
        closedTickets: 0,
        averageResponseTime: 0,
      },
    }
  }

  componentDidMount() {
    this.fetchAllTickets()
    this.fetchStats()
  }

  fetchAllTickets = async () => {
    try {
      const tickets = await ticketService.getAllTickets()
      this.setState({ tickets, isLoading: false })
    } catch (error) {
      this.setState({ error: error.message, isLoading: false })
    }
  }

  fetchStats = async () => {
    // In a real application, you would fetch these stats from your backend
    // For now, we'll simulate it with mock data
    this.setState({
      stats: {
        totalTickets: 150,
        openTickets: 45,
        closedTickets: 105,
        averageResponseTime: 4.5,
      },
    })
  }

  render() {
    const { isLoading, error, tickets, stats } = this.state

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
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(stats).map(([key, value]) => (
            <motion.div key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{key.replace(/([A-Z])/g, " $1").trim()}</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full">
                <Link to="/admin/users">
                  <Users className="mr-2 h-4 w-4" /> Manage Users
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/admin/reports">
                  <BarChart className="mr-2 h-4 w-4" /> View Reports
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" /> System Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>A list of recent tickets from your team.</CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <AdminTicketList tickets={tickets.slice(0, 5)} />
              </motion.div>
            </CardContent>
          </Card>
        </div>

        <TicketAnalytics />

        <AgentDashboard agentId="admin1" />
      </motion.div>
    )
  }
}

export default AdminDashboard

