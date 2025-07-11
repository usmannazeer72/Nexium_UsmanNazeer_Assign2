"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UrduTranslation() {
  const [englishText, setEnglishText] = useState("");
  const [urduText, setUrduText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const textFromQuery = searchParams.get("text");
    if (textFromQuery) {
      setEnglishText(textFromQuery);
    }
  }, [searchParams]);

  const handleTranslate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUrduText("");
    try {
      const res = await fetch("/urdu/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: englishText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Translation failed.");
      setUrduText(data.urdu);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Dynamically import jQuery only on the client
    if (urduText) {
      import("jquery").then(($) => {
        $("#urdu-translation-result").css("background-color", "lightgreen");
      });
    }
  }, [urduText]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-background text-foreground">
      <main className="flex flex-col items-center gap-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          انگریزی سے اردو ترجمہ
        </h1>
        <form onSubmit={handleTranslate} className="flex flex-col gap-4 w-full">
          <label htmlFor="english-text" className="text-lg font-medium">
            English Text
          </label>
          <textarea
            id="english-text"
            value={englishText}
            onChange={(e) => setEnglishText(e.target.value)}
            placeholder="Enter English text to translate..."
            className="border rounded px-4 py-2 text-base w-full min-h-[100px]"
            required
          />
          <button
            type="submit"
            className="rounded bg-foreground text-background px-6 py-2 text-lg font-semibold shadow hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate to Urdu"}
          </button>
        </form>
        {error && (
          <div className="text-red-600 bg-red-100 dark:bg-red-900 p-3 rounded w-full text-center">
            {error}
          </div>
        )}
        {urduText && (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold mb-2">اردو ترجمہ</h2>
            <div
              id="urdu-translation-result"
              className="bg-green-100 dark:bg-green-900 p-4 rounded text-base whitespace-pre-line"
            >
              {urduText}
            </div>
          </div>
        )}
        <button
          className="mt-4 rounded-full bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow hover:bg-blue-900 dark:hover:bg-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
          onClick={() => router.push("/")}
        >
          Back to Home
        </button>
      </main>
    </div>
  );
}
