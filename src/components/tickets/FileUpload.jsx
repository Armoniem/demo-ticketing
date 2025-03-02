import React from "react"
import { Component } from "react"
import { Paperclip, X, File } from "lucide-react"

class FileUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      isDragging: false,
    }
    this.fileInputRef = React.createRef()
  }

  handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    this.addFiles(newFiles)
  }

  addFiles = (newFiles) => {
    this.setState((prevState) => ({
      files: [...prevState.files, ...newFiles],
    }))

    if (this.props.onChange) {
      this.props.onChange([...this.state.files, ...newFiles])
    }
  }

  removeFile = (index) => {
    this.setState((prevState) => {
      const updatedFiles = [...prevState.files]
      updatedFiles.splice(index, 1)

      if (this.props.onChange) {
        this.props.onChange(updatedFiles)
      }

      return { files: updatedFiles }
    })
  }

  handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isDragging: true })
  }

  handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isDragging: false })
  }

  handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ isDragging: false })

    const files = Array.from(e.dataTransfer.files)
    this.addFiles(files)
  }

  openFileDialog = () => {
    this.fileInputRef.current.click()
  }

  getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase()

    switch (extension) {
      case "pdf":
        return <File className="w-4 h-4 text-red-500" />
      case "doc":
      case "docx":
        return <File className="w-4 h-4 text-blue-500" />
      case "xls":
      case "xlsx":
        return <File className="w-4 h-4 text-green-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <File className="w-4 h-4 text-purple-500" />
      default:
        return <File className="w-4 h-4 text-gray-500" />
    }
  }

  formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  render() {
    const { files, isDragging } = this.state

    return (
      <div className="w-full">
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-700"
          }`}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
          onClick={this.openFileDialog}
        >
          <input type="file" ref={this.fileInputRef} onChange={this.handleFileChange} className="hidden" multiple />
          <Paperclip className="w-6 h-6 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Maximum file size: 10MB</p>
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Attached Files ({files.length})</h4>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex items-center">
                    {this.getFileIcon(file.name)}
                    <span className="ml-2 text-sm truncate max-w-xs">{file.name}</span>
                    <span className="ml-2 text-xs text-gray-500">({this.formatFileSize(file.size)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      this.removeFile(index)
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default FileUpload

