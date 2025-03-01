import { Component } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

class PrivateRoute extends Component {
  static contextType = AuthContext

  render() {
    const { children, adminOnly = false } = this.props
    const { isAuthenticated, isLoading, user } = this.context

    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    if (adminOnly && user.role !== "admin") {
      return <Navigate to="/dashboard" replace />
    }

    return children
  }
}

export default PrivateRoute

