import { Component } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"
import LoginPage from "./pages/Auth/LoginPage"
import SignupPage from "./pages/Auth/SignupPage"
import UserDashboard from "./pages/User/UserDashboard"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import PrivateRoute from "./routes/PrivateRoute"
import Header from "./components/layout/Header"
import "./App.css"

class App extends Component {
  static contextType = AuthContext

  render() {
    return (
      <div className="app">
        <Header />
        <main className="container mx-auto px-4 py-8">
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
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    )
  }
}

export default App

