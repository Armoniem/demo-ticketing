import { Component } from "react"
import { AuthContext } from "../../context/AuthContext"

class SignupForm extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  validateForm = () => {
    const { name, email, password, confirmPassword } = this.state
    const errors = {}

    if (!name) {
      errors.name = "Name is required"
    }

    if (!email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    this.setState({ errors })
    return Object.keys(errors).length === 0
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    if (this.validateForm()) {
      const { name, email, password } = this.state
      const { signup } = this.context

      await signup(name, email, password)
    }
  }

  render() {
    const { name, email, password, confirmPassword, errors } = this.state
    const { error, isLoading } = this.context

    return (
      <form onSubmit={this.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    )
  }
}

export default SignupForm

