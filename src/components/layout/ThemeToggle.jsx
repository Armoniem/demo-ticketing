import { Component } from "react"
import { ThemeContext } from "./ThemeProvider"
import { Moon, Sun } from "lucide-react"

class ThemeToggle extends Component {
  static contextType = ThemeContext

  render() {
    const { isDarkMode, toggleTheme } = this.context

    return (
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    )
  }
}

export default ThemeToggle

