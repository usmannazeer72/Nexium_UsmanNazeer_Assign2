import genAI from "@/app/utils/gemini";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "No text provided." }, { status: 400 });
    }

    // Use Gemini to translate text to Urdu
    let urdu = "";
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });
    const result = await model.generateContent(
      `Translate the following English sentence into Urdu, preserving meaning and grammar:\n\n"${text}"\n\nUrdu Translation:`
    );
    urdu =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No translation generated.";

    return NextResponse.json({ urdu });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
