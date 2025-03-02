import { Component } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import ThemeToggle from "./ThemeToggle"

class Header extends Component {
  static contextType = AuthContext

  render() {
    const { isAuthenticated, user, logout } = this.context

    return (
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Support Ticket System
          </Link>

          <nav className="flex items-center">
            <ThemeToggle />

            <div className="ml-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {user.role === "admin" ? (
                    <Link
                      to="/admin"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Dashboard
                    </Link>
                  )}
                  <span className="text-gray-600 dark:text-gray-400">
                    {user.name} ({user.role})
                  </span>
                  <button
                    onClick={logout}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header

