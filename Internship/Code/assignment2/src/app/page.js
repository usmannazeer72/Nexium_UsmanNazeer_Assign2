"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-background text-foreground">
      <main className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold mb-2 text-center">Blog Summariser</h1>
        <p className="text-lg text-center max-w-xl mb-6">
          Instantly get concise summaries of any blog post. Paste a blog link or
          text and let our AI do the rest!
        </p>
        <button
          className="rounded-full bg-foreground text-background px-8 py-3 text-lg font-semibold shadow hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
          onClick={() => router.push("/summariser")}
        >
          Summarise a Blog
        </button>
      </main>
    </div>
  );
}
