import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Button asChild>
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage

