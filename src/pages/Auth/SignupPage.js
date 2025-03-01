import { Component } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import SignupForm from "../../components/auth/SignupForm"

class SignupPage extends Component {
  static contextType = AuthContext

  render() {
    const { isAuthenticated, user } = this.context

    if (isAuthenticated) {
      return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />
    }

    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        <SignupForm />
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default SignupPage

