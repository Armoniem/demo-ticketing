import { Component, createContext } from "react"
import { authService } from "../services/authService"

export const AuthContext = createContext()

export class AuthProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,
    }
  }

  componentDidMount() {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        this.setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        this.setState({ isLoading: false })
      }
    } else {
      this.setState({ isLoading: false })
    }
  }

  login = async (email, password) => {
    try {
      this.setState({ isLoading: true, error: null })
      const user = await authService.login(email, password)
      localStorage.setItem("user", JSON.stringify(user))
      this.setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
      return true
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
      })
      return false
    }
  }

  signup = async (name, email, password) => {
    try {
      this.setState({ isLoading: true, error: null })
      const user = await authService.signup(name, email, password)
      localStorage.setItem("user", JSON.stringify(user))
      this.setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      })
      return true
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
      })
      return false
    }
  }

  logout = () => {
    localStorage.removeItem("user")
    this.setState({
      user: null,
      isAuthenticated: false,
    })
  }

  render() {
    const { children } = this.props
    const { user, isAuthenticated, isLoading, error } = this.state

    const value = {
      user,
      isAuthenticated,
      isLoading,
      error,
      login: this.login,
      signup: this.signup,
      logout: this.logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }
}

