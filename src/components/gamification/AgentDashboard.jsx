"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Zap } from "lucide-react"

const AgentDashboard = ({ agentId }) => {
  const [agentStats, setAgentStats] = useState(null)

  useEffect(() => {
    const fetchAgentStats = async () => {
      // In a real app, this would be an API call
      const stats = await mockFetchAgentStats(agentId)
      setAgentStats(stats)
    }

    fetchAgentStats()
  }, [agentId])

  if (!agentStats) return <div>Loading agent stats...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Experience</span>
                <span>
                  {agentStats.xp} / {agentStats.nextLevelXp} XP
                </span>
              </div>
              <Progress value={(agentStats.xp / agentStats.nextLevelXp) * 100} />
            </div>
            <div className="flex justify-between">
              <span>Level {agentStats.level}</span>
              <span>{agentStats.rank} Rank</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {agentStats.achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary">
                  {achievement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Customer Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">{agentStats.customerSatisfaction}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Tickets Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-center">{agentStats.ticketsResolved}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Mock function to simulate fetching agent stats
const mockFetchAgentStats = async (agentId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    xp: 7500,
    nextLevelXp: 10000,
    level: 15,
    rank: "Senior Support Specialist",
    achievements: ["Speed Demon", "Customer Favorite", "Problem Solver"],
    customerSatisfaction: 98,
    ticketsResolved: 1234,
  }
}

export default AgentDashboard

