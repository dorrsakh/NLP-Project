import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SentimentAnalyzer from "./pages/SentimentAnalyzer/SentimentAnalyzerPage";
import QuestionAnswering from "./pages/QuestionAnswering/QuestionAnsweringPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="fixed w-full bg-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">🧠 AI Tools</h1>
          <div className="space-x-4">
            <Link
              to="/sentiment-analyzer"
              className="text-white hover:text-blue-400 transition font-medium"
            >
              Sentiment Analyzer
            </Link>
            <Link
              to="/qa"
              className="text-white hover:text-blue-400 transition font-medium"
            >
              Q&A Engine
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/sentiment-analyzer" element={<SentimentAnalyzer />} />
          <Route path="/qa" element={<QuestionAnswering />} />
        </Routes>
      </div>
    </Router>
  );
}
