import { FileText, Image, Film, Music, Archive, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

const getFileIcon = (fileType) => {
  switch (fileType) {
    case "image":
      return <Image className="w-6 h-6 text-blue-500" />
    case "video":
      return <Film className="w-6 h-6 text-purple-500" />
    case "audio":
      return <Music className="w-6 h-6 text-green-500" />
    case "archive":
      return <Archive className="w-6 h-6 text-yellow-500" />
    default:
      return <FileText className="w-6 h-6 text-gray-500" />
  }
}

const AttachmentList = ({ attachments }) => {
  return (
    <div className="space-y-2">
      {attachments.map((attachment, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-3">
            {getFileIcon(attachment.type)}
            <span className="text-sm font-medium">{attachment.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Download
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AttachmentList

