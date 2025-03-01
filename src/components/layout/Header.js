import { Component } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

class Header extends Component {
  static contextType = AuthContext

  render() {
    const { isAuthenticated, user, logout } = this.context

    return (
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Support Ticket System
          </Link>

          <nav>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user.role === "admin" ? (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                    Dashboard
                  </Link>
                )}
                <span className="text-gray-600">
                  {user.name} ({user.role})
                </span>
                <button onClick={logout} className="text-red-600 hover:text-red-800">
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    )
  }
}

export default Header

