"use client";
import { useState } from "react";

export default function Summariser() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [scrapedText, setScrapedText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Simulate scraping and AI summary
  const handleSummarise = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate scraped text
    setScrapedText(
      "This is the simulated scraped text from the blog. It would normally be extracted from the provided URL."
    );
    // Simulate AI summary
    setSummary(
      "This is a static AI summary of the blog post. It provides a concise overview of the main points discussed in the article."
    );
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
          >
            Summarise
          </button>
        </form>
        {submitted && (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold mb-2">Scraped Blog Text</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4 text-sm whitespace-pre-line">
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
