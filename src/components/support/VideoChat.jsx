"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react"

const VideoChat = ({ ticketId, userId }) => {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const localVideoRef = useRef()
  const remoteVideoRef = useRef()

  useEffect(() => {
    if (isCallActive) {
      startCall()
    } else {
      endCall()
    }
  }, [isCallActive])

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      localVideoRef.current.srcObject = stream

      // Here you would typically set up WebRTC peer connection
      // and signaling to connect with the other participant
      console.log("Starting call for ticket:", ticketId)
    } catch (error) {
      console.error("Error accessing media devices:", error)
    }
  }

  const endCall = () => {
    const stream = localVideoRef.current.srcObject
    const tracks = stream?.getTracks()
    tracks?.forEach((track) => track.stop())

    localVideoRef.current.srcObject = null
    remoteVideoRef.current.srcObject = null

    // Here you would typically close the WebRTC peer connection
    console.log("Ending call for ticket:", ticketId)
  }

  const toggleMute = () => {
    const audioTrack = localVideoRef.current.srcObject.getAudioTracks()[0]
    audioTrack.enabled = !audioTrack.enabled
    setIsMuted(!audioTrack.enabled)
  }

  const toggleVideo = () => {
    const videoTrack = localVideoRef.current.srcObject.getVideoTracks()[0]
    videoTrack.enabled = !videoTrack.enabled
    setIsVideoOff(!videoTrack.enabled)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <video ref={localVideoRef} autoPlay muted className="w-full h-48 bg-gray-200 rounded-lg" />
          <video ref={remoteVideoRef} autoPlay className="w-full h-48 bg-gray-200 rounded-lg" />
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <Button onClick={() => setIsCallActive(!isCallActive)}>
            {isCallActive ? <PhoneOff /> : <Video />}
            {isCallActive ? "End Call" : "Start Call"}
          </Button>
          <Button onClick={toggleMute} disabled={!isCallActive}>
            {isMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button onClick={toggleVideo} disabled={!isCallActive}>
            {isVideoOff ? <VideoOff /> : <Video />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default VideoChat

