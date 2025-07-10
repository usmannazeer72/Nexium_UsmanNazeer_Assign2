"use client";
import { useState } from "react";

export default function Summariser() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [scrapedText, setScrapedText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch scraped text and summary from API
  const handleSummarise = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setLoading(true);
    setError("");
    setScrapedText("");
    setSummary("");
    try {
      const res = await fetch("/summariser/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to scrape blog text.");
      setScrapedText(data.text);
      setSummary(data.summary || "No summary generated.");
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-background text-foreground">
      <main className="flex flex-col items-center gap-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Summariser</h1>
        <form onSubmit={handleSummarise} className="flex flex-col gap-4 w-full">
          <label htmlFor="blog-url" className="text-lg font-medium">
            Blog URL
          </label>
          <input
            id="blog-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a blog URL here..."
            className="border rounded px-4 py-2 text-base w-full"
            required
          />
          <button
            type="submit"
            className="rounded bg-foreground text-background px-6 py-2 text-lg font-semibold shadow hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
            disabled={loading}
          >
            {loading ? "Scraping & Summarising..." : "Summarise"}
          </button>
        </form>
        {error && (
          <div className="text-red-600 bg-red-100 dark:bg-red-900 p-3 rounded w-full text-center">
            {error}
          </div>
        )}
        {submitted && (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold mb-2">Scraped Blog Text</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 text-sm whitespace-pre-line max-h-64 overflow-y-auto">
              {scrapedText}
            </div>
            <h2 className="text-xl font-semibold mb-2">AI Summary</h2>
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-base">
              {summary}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
