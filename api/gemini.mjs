import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const GEMINI_API_KEY = "AIzaSyDm1IhyroXxADsQfilTsLVfUWsLalD1GWI";
  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: "Server misconfiguration: missing API key" });
    return;
  }
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    res.status(400).json({ error: "Invalid prompt" });
    return;
  }

  // Replace with your actual Gemini API endpoint and key name

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Updated to use a stable model
      contents: prompt,
    });

    const answer = response.text || "No answer received";

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Gemini API request error:", error);
    res.status(500).json({ error: "Failed to fetch from Gemini API" });
  }
}
