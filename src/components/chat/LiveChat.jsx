"use client"

import { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

const LiveChat = ({ ticketId, userId }) => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const socketRef = useRef()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = io("http://localhost:3001")

    // Join the room for this specific ticket
    socketRef.current.emit("joinRoom", ticketId)

    // Listen for incoming messages
    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    // Cleanup on component unmount
    return () => socketRef.current.disconnect()
  }, [ticketId])

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim() !== "") {
      const messageData = {
        ticketId,
        userId,
        content: inputMessage,
        timestamp: new Date().toISOString(),
      }
      socketRef.current.emit("sendMessage", messageData)
      setInputMessage("")
    }
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Live Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${msg.userId === userId ? "bg-blue-100 ml-auto" : "bg-gray-100"} max-w-[70%]`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="p-4 border-t">
        <form onSubmit={sendMessage} className="flex space-x-2">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}

export default LiveChat

