"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Pie } from "react-chartjs-2"
import { ticketService } from "../../services/ticketService"

const TicketAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await ticketService.getTicketAnalytics()
      setAnalyticsData(data)
    }

    fetchAnalytics()
  }, [])

  if (!analyticsData) return <div>Loading analytics...</div>

  const statusData = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        data: [
          analyticsData.statusCounts.open,
          analyticsData.statusCounts.inProgress,
          analyticsData.statusCounts.closed,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  }

  const priorityData = {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [
      {
        label: "Tickets by Priority",
        data: [
          analyticsData.priorityCounts.low,
          analyticsData.priorityCounts.medium,
          analyticsData.priorityCounts.high,
          analyticsData.priorityCounts.critical,
        ],
        backgroundColor: ["#4BC0C0", "#FFCE56", "#FF9F40", "#FF6384"],
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tickets by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie data={statusData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tickets by Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={priorityData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default TicketAnalytics

