"use client";
export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function UrduTranslationContent() {
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
        $("#urdu-translation-result").css("background-color", "#f5f7fa");
      });
    }
  }, [urduText]);

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
              انگریزی سے اردو ترجمہ
            </CardTitle>
            <div className="w-16 h-1 mx-auto my-2 bg-[#b9e4c9] rounded-full" />
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleTranslate}
              className="flex flex-col gap-4 w-full mb-6"
            >
              <label
                htmlFor="english-text"
                className="text-lg font-medium text-[#6d6875] font-serif"
              >
                English Text
              </label>
              <Textarea
                id="english-text"
                value={englishText}
                onChange={(e) => setEnglishText(e.target.value)}
                placeholder="Enter English text to translate..."
                required
                className="focus:ring-2 focus:ring-[#b9e4c9] focus:border-[#b9e4c9] rounded-xl font-serif"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#b9e4c9] via-[#fbc2eb] to-[#f5f7fa] text-[#4f4a5a] rounded-2xl shadow-md py-4 text-lg font-semibold border-0 hover:brightness-105 font-serif"
              >
                {loading ? "Translating..." : "Translate to Urdu"}
              </Button>
            </form>
            {error && (
              <Card className="mt-4 bg-[#fbc2eb]/60 border-0 shadow-md rounded-xl">
                <CardContent className="text-[#b5838d] text-center font-serif">
                  {error}
                </CardContent>
              </Card>
            )}
            {urduText && (
              <Card className="mt-6 border-0 bg-gradient-to-r from-[#fbc2eb] via-[#f5f7fa] to-[#b9e4c9] shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#a084ca] font-serif">
                    اردو ترجمہ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    id="urdu-translation-result"
                    className="p-4 rounded text-base whitespace-pre-line text-[#6d6875] font-serif"
                  >
                    {urduText}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="w-full py-4 text-center text-xs text-[#6d6875] border-t border-[#e0c3fc] bg-white/60 rounded-t-3xl font-serif">
        &copy; {new Date().getFullYear()} Nexium Assignment &mdash; Powered by
        Next.js & shadcn/ui
      </footer>
    </div>
  );
}

export default function UrduTranslation() {
  return (
    <Suspense>
      <UrduTranslationContent />
    </Suspense>
  );
}
