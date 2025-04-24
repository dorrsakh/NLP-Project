import { useState } from "react";

export default function QuestionAnswering() {
  const [context, setContext] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    setLoading(true);
    setAnswer(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:8083/question-answering-engine/engine-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: context, question }),
      });

      const data = await res.json();
      setAnswer(data.Answer || "No answer found");
    } catch (err) {
      console.error("Error fetching answer:", err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">❓ Question Answering</h2>

        <textarea
          rows={4}
          placeholder="Enter your context (article/text)..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        {error && <p className="text-red-400 mt-4 font-medium">{error}</p>}

        {answer && (
          <div className="mt-6">
            <p className="text-lg font-medium">Answer:</p>
            <p className="text-xl font-bold mt-1 text-green-400">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
