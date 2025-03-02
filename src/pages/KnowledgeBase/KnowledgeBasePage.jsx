import { Component } from "react"
import { Link } from "react-router-dom"
import { Search, Book, FileText, HelpCircle, ChevronRight } from "lucide-react"

class KnowledgeBasePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
      categories: [
        {
          id: "1",
          name: "Getting Started",
          icon: Book,
          articles: [
            { id: "1", title: "How to create an account", views: 1245 },
            { id: "2", title: "Logging in for the first time", views: 987 },
            { id: "3", title: "Understanding the dashboard", views: 756 },
          ],
        },
        {
          id: "2",
          name: "Account Management",
          icon: FileText,
          articles: [
            { id: "4", title: "Changing your password", views: 1102 },
            { id: "5", title: "Updating profile information", views: 843 },
            { id: "6", title: "Managing notification settings", views: 621 },
          ],
        },
        {
          id: "3",
          name: "Troubleshooting",
          icon: HelpCircle,
          articles: [
            { id: "7", title: "Common login issues", views: 1532 },
            { id: "8", title: "What to do if you can't access your account", views: 1245 },
            { id: "9", title: "Resolving payment problems", views: 978 },
          ],
        },
      ],
      popularArticles: [
        { id: "7", title: "Common login issues", views: 1532 },
        { id: "1", title: "How to create an account", views: 1245 },
        { id: "8", title: "What to do if you can't access your account", views: 1245 },
        { id: "4", title: "Changing your password", views: 1102 },
      ],
    }
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  render() {
    const { searchQuery, categories, popularArticles } = this.state

    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Knowledge Base</h1>
          <p className="text-gray-600 mb-6">Find answers to common questions and learn how to use our platform</p>

          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for articles..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article) => (
              <Link
                key={article.id}
                to={`/knowledge-base/article/${article.id}`}
                className="p-4 border rounded-lg hover:bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-gray-500">{article.views} views</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center">
                    <category.icon className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </div>
                <ul className="divide-y">
                  {category.articles.map((article) => (
                    <li key={article.id}>
                      <Link to={`/knowledge-base/article/${article.id}`} className="block p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <span>{article.title}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default KnowledgeBasePage

