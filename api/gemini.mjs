import { GoogleGenAI } from "@google/genai";

async function main() {
  const GEMINI_API_KEY = "AIzaSyDm1IhyroXxADsQfilTsLVfUWsLalD1GWI";

  if (!GEMINI_API_KEY) {
    console.error("Server misconfiguration: missing API key");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  // Get prompt from command line arguments
  const prompt = `hi`

  if (!prompt) {
    console.error("Invalid prompt: Please provide a non-empty prompt as a command line argument.");
    process.exit(2);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const answer = response.text || "No answer received";
    console.log("Answer:", answer);
    process.exit(0);
  } catch (error) {
    console.error("Gemini API request error:", error);
    process.exit(3);
  }
}

main();
