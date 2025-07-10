import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

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
    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
