import { Component } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import LoginPage from "./pages/Auth/LoginPage"
import SignupPage from "./pages/Auth/SignupPage"
import UserDashboard from "./pages/User/UserDashboard"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import UserManagement from "./pages/Admin/UserManagement"
import ReportingPage from "./pages/Admin/ReportingPage"
import SystemSettings from "./pages/Admin/SystemSettings"
import TicketsPage from "./pages/Tickets/TicketsPage"
import TicketDetailsPage from "./pages/Tickets/TicketDetailsPage"
import PrivateRoute from "./routes/PrivateRoute"
import Sidebar from "./components/layout/Sidebar"
import NotFoundPage from "./pages/NotFoundPage"
import "./App.css"

class App extends Component {
  static contextType = AuthContext

  render() {
    const { isAuthenticated, isLoading, error } = this.context

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl font-semibold">Loading...</div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl font-semibold text-red-600">Error: {error}</div>
        </div>
      )
    }

    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {isAuthenticated && <Sidebar />}
        <main className={`flex-1 overflow-auto ${isAuthenticated ? "ml-64" : ""}`}>
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute adminOnly={true}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <PrivateRoute adminOnly={true}>
                    <UserManagement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <PrivateRoute adminOnly={true}>
                    <ReportingPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <PrivateRoute adminOnly={true}>
                    <SystemSettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tickets"
                element={
                  <PrivateRoute>
                    <TicketsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ticket/:id"
                element={
                  <PrivateRoute>
                    <TicketDetailsPage />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    )
  }
}

export default App

