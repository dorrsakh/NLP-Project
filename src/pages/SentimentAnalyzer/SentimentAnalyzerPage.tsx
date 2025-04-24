import { useState } from "react";

export default function SentimentAnalyzer() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    setPrediction(null);

    try {
      const res = await fetch(
        "http://localhost:8083/sentiment-analyzer/detect-sentiment-api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ text }),
        }
      );

      const data = await res.json();

      const result = data.Sentiment || "No sentiment found";
      setPrediction(result);
    } catch (error) {
      setError(error as string);
      console.error("Error during prediction:", error);
      setPrediction("Error processing request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex min-h-screen items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">🤖 Sentiment Analyzer</h2>

        <textarea
          rows={4}
          placeholder="Type a sentence to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {error && <p className="text-red-400 mt-4 font-medium">{error}</p>}

        {prediction && (
          <div className="mt-6">
            <p className="text-lg font-medium">Prediction:</p>
            <p
              className={`text-2xl font-bold mt-1 ${
                prediction.toLowerCase().includes("positive")
                  ? "text-green-400"
                  : prediction.toLowerCase().includes("negative")
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {prediction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
