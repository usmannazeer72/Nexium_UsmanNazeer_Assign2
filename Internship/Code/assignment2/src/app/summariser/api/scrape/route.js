import genAI from "@/app/utils/gemini";
import { PrismaClient } from "@/generated/prisma";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import fetch from "node-fetch";
// Add Mongoose imports
import dbConnect from "../../../../../lib/mongoose";
import ScrapeData from "../../../../../lib/scrapeData.model";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "No URL provided." }, { status: 400 });
    }
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch URL." },
        { status: 500 }
      );
    }
    const html = await res.text();
    const $ = cheerio.load(html);
    // Remove unwanted elements: scripts, styles, ads, noscript, etc.
    $(
      "script, style, noscript, iframe, header, footer, nav, .ads, [class*='ad'], [id*='ad'], [class*='Ad'], [id*='Ad']"
    ).remove();
    // Extract only visible text from main, article, or body
    let text = $("main").text() || $("article").text() || $("body").text();
    // Remove extra whitespace and line breaks
    text = text.replace(/\s+/g, " ").trim();

    // Use Gemini to generate a summary
    let summary = "";
    if (text.length > 0) {
      const model = genAI.getGenerativeModel({
        model: "models/gemini-2.5-flash",
      });
      const result = await model.generateContent(
        `Summarize the following blog post in a concise paragraph:\n${text}`
      );
      summary =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No summary generated.";
    }

    await prisma.summary.create({
      data: {
        originalUrl: url,
        scrapedText: text,
        summary: summary,
      },
    });

    // Store scrape data in MongoDB
    await dbConnect();
    await ScrapeData.create({
      content: text,
      sourceUrl: url,
    });

    return NextResponse.json({ text, summary });
  } catch (error) {
    console.error("DB Save Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
