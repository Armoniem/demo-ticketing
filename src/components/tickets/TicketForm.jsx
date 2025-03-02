import { Component } from "react"
import FileUpload from "./FileUpload"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { aiService } from "../../services/aiService"

class TicketForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      priority: "medium",
      category: "",
      attachments: [],
      errors: {},
      isProcessing: false,
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handlePriorityChange = (value) => {
    this.setState({ priority: value })
  }

  handleAttachmentsChange = (files) => {
    this.setState({ attachments: files })
  }

  validateForm = () => {
    const { title, description } = this.state
    const errors = {}

    if (!title.trim()) {
      errors.title = "Title is required"
    }

    if (!description.trim()) {
      errors.description = "Description is required"
    }

    this.setState({ errors })
    return Object.keys(errors).length === 0
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    if (this.validateForm()) {
      this.setState({ isProcessing: true })

      const { title, description, priority, attachments } = this.state

      // Use AI to categorize and suggest priority
      const suggestedCategory = await aiService.categorizeTicket(description)
      const suggestedPriority = await aiService.suggestPriority(description)

      this.setState({
        category: suggestedCategory,
        priority: suggestedPriority.toLowerCase(),
        isProcessing: false,
      })

      // You can choose to automatically use these suggestions or present them to the user for confirmation
      this.props.onSubmit({
        title,
        description,
        priority: suggestedPriority.toLowerCase(),
        category: suggestedCategory,
        attachments,
      })

      // Reset form
      this.setState({
        title: "",
        description: "",
        priority: "medium",
        category: "",
        attachments: [],
        errors: {},
      })
    }
  }

  render() {
    const { title, description, priority, category, errors, isProcessing } = this.state

    return (
      <form onSubmit={this.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ticket Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={this.handleChange}
            className={errors.title ? "border-red-500" : ""}
            placeholder="Enter a brief title for your issue"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={this.handleChange}
            rows="4"
            className={errors.description ? "border-red-500" : ""}
            placeholder="Please describe your issue in detail"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <Select value={priority} onValueChange={this.handlePriorityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {category && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Suggested Category
            </label>
            <Input type="text" value={category} readOnly className="bg-gray-100" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Attachments</label>
          <FileUpload onChange={this.handleAttachmentsChange} />
        </div>

        <div>
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Submit Ticket"}
          </Button>
        </div>
      </form>
    )
  }
}

export default TicketForm

