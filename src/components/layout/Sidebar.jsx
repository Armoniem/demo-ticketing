import { Component } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { Home, Ticket, FileText, Settings, HelpCircle, Users, BarChart, LogOut } from "lucide-react"

class Sidebar extends Component {
  static contextType = AuthContext

  render() {
    const { user, logout } = this.context
    const isAdmin = user && user.role === "admin"

    return (
      <div className="h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 overflow-y-auto z-10">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Support Portal</h2>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Home className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/tickets" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <Ticket className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span>Tickets</span>
              </Link>
            </li>

            {!isAdmin && (
              <li>
                <Link
                  to="/new-ticket"
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FileText className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>Create Ticket</span>
                </Link>
              </li>
            )}

            {isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/users"
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Users className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>User Management</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/reports"
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <BarChart className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>Reports</span>
                  </Link>
                </li>
              </>
            )}

            <li className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/knowledge-base"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <HelpCircle className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span>Knowledge Base</span>
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span>Settings</span>
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar

