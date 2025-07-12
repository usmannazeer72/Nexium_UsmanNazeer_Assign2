"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#e0c3fc] via-[#f5f7fa] to-[#a8edea]">
      <main className="flex flex-1 flex-col items-center justify-center p-8 gap-8">
        <Toaster />
        <Card className="w-full max-w-xl rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle
              className="text-4xl font-extrabold text-center text-[#a084ca] mb-2"
              style={{ fontFamily: "serif" }}
            >
              Blog Summariser
            </CardTitle>
            <div className="w-16 h-1 mx-auto my-2 bg-[#b9e4c9] rounded-full" />
          </CardHeader>
          <CardContent>
            <p
              className="text-lg text-center max-w-xl mb-8 text-[#6d6875]"
              style={{ fontFamily: "serif" }}
            >
              Instantly get concise summaries of any blog post. Paste a blog
              link or text and let our AI do the rest!
            </p>
            <Button
              className="w-full text-lg font-semibold bg-gradient-to-r from-[#b9e4c9] via-[#fbc2eb] to-[#f5f7fa] text-[#4f4a5a] rounded-2xl shadow-md py-6 border-0 hover:brightness-105"
              size="lg"
              style={{ fontFamily: "serif" }}
              onClick={() => router.push("/summariser")}
            >
              Summarise a Blog
            </Button>
          </CardContent>
        </Card>
      </main>
      <footer
        className="w-full py-4 text-center text-xs text-[#6d6875] border-t border-[#e0c3fc] bg-white/60 rounded-t-3xl"
        style={{ fontFamily: "serif" }}
      >
        &copy; {new Date().getFullYear()} Nexium Assignment &mdash; Powered by
        Next.js & shadcn/ui
      </footer>
    </div>
  );
}
