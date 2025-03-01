import { Component } from "react"

class TicketForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      errors: {},
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
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

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.validateForm()) {
      const { title, description } = this.state
      this.props.onSubmit({ title, description })

      // Reset form
      this.setState({
        title: "",
        description: "",
        errors: {},
      })
    }
  }

  render() {
    const { title, description, errors } = this.state

    return (
      <form onSubmit={this.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Ticket Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={this.handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter a brief title for your issue"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={this.handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Please describe your issue in detail"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Submit Ticket
          </button>
        </div>
      </form>
    )
  }
}

export default TicketForm

