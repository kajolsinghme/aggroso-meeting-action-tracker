import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY,
});

export async function extractActionItems(transcript) {
  if (!transcript) throw new Error("Transcript required");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
You are an assistant that extracts action items from a meeting transcript.
Return a JSON array where each item has:
- task (string)
- owner (string, if any)
- dueDate (ISO date (YYYY-MM-DD), if any)
Make sure to use the meeting date as reference.

Meeting transcript:
${transcript}
      `.trim(),
    });

    let aiText = response.text;

    aiText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const actionItems = JSON.parse(aiText);
    return actionItems;
  } catch (err) {
    console.error("AI extraction error:", err.message);
    throw err;
  }
}
