"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Summariser() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [scrapedText, setScrapedText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch scraped text and summary from API
  const handleSummarise = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setLoading(true);
    setError("");
    setScrapedText("");
    setSummary("");
    try {
      // First, check if summary exists in Postgres
      const checkRes = await fetch(
        `/summariser/api/scrape?url=${encodeURIComponent(url)}`
      );
      if (checkRes.ok) {
        const data = await checkRes.json();
        setScrapedText(data.text);
        setSummary(data.summary || "No summary generated.");
        setSubmitted(true);
        setLoading(false);
        return;
      }
      // If not found, proceed to scrape
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#e0c3fc] via-[#f5f7fa] to-[#a8edea]">
      <div className="absolute top-6 left-6 z-10">
        <Button
          variant="secondary"
          className="bg-gradient-to-r from-[#fbc2eb] via-[#f5f7fa] to-[#b9e4c9] text-[#6d6875] border-0 shadow-md px-6 py-2 rounded-full font-serif"
          onClick={() => router.push("/")}
        >
          ← Back to Home
        </Button>
      </div>
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <Toaster />
        <Card className="w-full max-w-xl rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center text-[#a084ca] mb-2 font-serif">
              Summarise a Blog Post
            </CardTitle>
            <div className="w-16 h-1 mx-auto my-2 bg-[#b9e4c9] rounded-full" />
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSummarise}
              className="flex flex-col gap-4 w-full mb-6"
            >
              <label
                htmlFor="blog-url"
                className="text-lg font-medium text-[#6d6875] font-serif"
              >
                Blog URL
              </label>
              <Input
                id="blog-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a blog URL here..."
                required
                className="focus:ring-2 focus:ring-[#b9e4c9] focus:border-[#b9e4c9] rounded-xl font-serif"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#b9e4c9] via-[#fbc2eb] to-[#f5f7fa] text-[#4f4a5a] rounded-2xl shadow-md py-4 text-lg font-semibold border-0 hover:brightness-105 font-serif"
              >
                {loading ? "Scraping & Summarising..." : "Summarise"}
              </Button>
            </form>
            {error && (
              <Card className="mt-4 bg-[#fbc2eb]/60 border-0 shadow-md rounded-xl">
                <CardContent className="text-[#b5838d] text-center font-serif">
                  {error}
                </CardContent>
              </Card>
            )}
            {submitted && (
              <div className="mt-6 w-full flex flex-col gap-6">
                <Card className="border-0 bg-gradient-to-r from-[#fbc2eb] via-[#f5f7fa] to-[#b9e4c9] shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#a084ca] font-serif">
                      Scraped Blog Text
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm whitespace-pre-line max-h-64 overflow-y-auto text-[#6d6875] font-serif">
                      {scrapedText}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-r from-[#a8edea] via-[#f5f7fa] to-[#fbc2eb] shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-[#b5838d] font-serif">
                      AI Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-base text-[#4f4a5a] font-serif">
                      {summary}
                    </div>
                    <Button
                      className="mt-4 w-full bg-gradient-to-r from-[#b9e4c9] via-[#fbc2eb] to-[#f5f7fa] text-[#4f4a5a] rounded-2xl shadow-md font-serif"
                      onClick={() =>
                        router.push(`/urdu?text=${encodeURIComponent(summary)}`)
                      }
                    >
                      Translate to Urdu
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="w-full py-4 text-center text-xs text-[#6d6875] border-t border-[#e0c3fc] bg-white/60 rounded-t-3xl font-serif">
        &copy; {new Date().getFullYear()} 2025 Nexium Assignment &mdash; Powered
        by Next.js & shadcn/ui
      </footer>
    </div>
  );
}
