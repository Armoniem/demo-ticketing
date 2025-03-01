import { Component } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import LoginForm from "../../components/auth/LoginForm"

class LoginPage extends Component {
  static contextType = AuthContext

  render() {
    const { isAuthenticated, user } = this.context

    if (isAuthenticated) {
      return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
    }

    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Support Portal</h1>
        <LoginForm />
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default LoginPage

