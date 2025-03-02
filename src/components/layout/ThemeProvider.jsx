import { Component, createContext } from "react"

export const ThemeContext = createContext()

class ThemeProvider extends Component {
  constructor(props) {
    super(props)

    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    this.state = {
      isDarkMode: savedTheme ? savedTheme === "dark" : prefersDark,
    }
  }

  componentDidMount() {
    this.updateThemeClass()
  }

  componentDidUpdate() {
    this.updateThemeClass()
  }

  updateThemeClass = () => {
    const { isDarkMode } = this.state

    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Save preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      isDarkMode: !prevState.isDarkMode,
    }))
  }

  render() {
    const { children } = this.props
    const { isDarkMode } = this.state

    const value = {
      isDarkMode,
      toggleTheme: this.toggleTheme,
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  }
}

export default ThemeProvider

