import axios from "axios"

const API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions"
const API_KEY = import.meta.env.OPENAI_API_KEY

export const aiService = {
  categorizeTicket: async (ticketDescription) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          prompt: `Categorize the following support ticket: "${ticketDescription}"\nCategory:`,
          max_tokens: 60,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      )

      return response.data.choices[0].text.trim()
    } catch (error) {
      console.error("Error categorizing ticket:", error)
      return "Uncategorized"
    }
  },

  suggestPriority: async (ticketDescription) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          prompt: `Suggest a priority level (Low, Medium, High, Critical) for the following support ticket: "${ticketDescription}"\nPriority:`,
          max_tokens: 60,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      )

      return response.data.choices[0].text.trim()
    } catch (error) {
      console.error("Error suggesting priority:", error)
      return "Medium"
    }
  },
}

