// Mock authentication service
export const authService = {
  login: async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, hardcoded credentials
        if (email === "user@example.com" && password === "password") {
          resolve({
            id: "1",
            name: "John Doe",
            email: "user@example.com",
            role: "user",
          })
        } else if (email === "admin@example.com" && password === "password") {
          resolve({
            id: "2",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          })
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  },

  signup: async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real app, you would validate and create a user
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          role: "user", // Default role for new users
        })
      }, 1000)
    })
  },
}

