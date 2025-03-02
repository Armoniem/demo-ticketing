import { Component } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Download } from "lucide-react"

class ReportingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedReport: "ticketVolume",
      reportData: [
        { date: "2023-05-01", newTickets: 15, resolvedTickets: 12 },
        { date: "2023-05-02", newTickets: 18, resolvedTickets: 14 },
        { date: "2023-05-03", newTickets: 12, resolvedTickets: 16 },
        { date: "2023-05-04", newTickets: 20, resolvedTickets: 18 },
        { date: "2023-05-05", newTickets: 16, resolvedTickets: 15 },
      ],
    }
  }

  handleReportChange = (value) => {
    this.setState({ selectedReport: value })
  }

  render() {
    const { selectedReport, reportData } = this.state

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Reporting</h1>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Generate Report</CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={selectedReport} onValueChange={this.handleReportChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select report" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ticketVolume">Ticket Volume</SelectItem>
                  <SelectItem value="responseTime">Response Time</SelectItem>
                  <SelectItem value="customerSatisfaction">Customer Satisfaction</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <BarChart className="h-64 w-full" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>New Tickets</TableHead>
                  <TableHead>Resolved Tickets</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.newTickets}</TableCell>
                    <TableCell>{row.resolvedTickets}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default ReportingPage

