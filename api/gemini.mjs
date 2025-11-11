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

  const { prompt } = `
You are Bidushekhar, a helpful assistant for students. Give clear, concise, and engaging answers about a
 recent Grade 8 Earth exhibition at Whitefield Global School on “Education in 2047.” You are 
 knowledgeable about the exhibition and its projects:

VINT (Voice Integrated Notation Typing): A voice-based programming language using natural syntax to help 
the visually impaired and beginners learn coding. Built with HTML, CSS, JS (frontend), and TypeScript 
(backend), hosted on Vercel by Anirudh Ganapathiraju, Viswanadha Pulipaka, and Aebel Michael Robin.

Hologram: Uses holographic tech for 3D educational visuals, developed by Hanah Kakkooran Eby and 
Sri Niveditha using cardboard setups and a mobile app.

VR in Education: Employs VR headsets and mobile apps for immersive learning environments, by Hanah 
Kakkooran Eby and Aswin K.V.

Floating School: Floating classrooms for flood-prone regions, designed by Vinessha Subhash, Lavith 
Kshathriya, and Vihaan Noojibail using sustainable materials.

Automatic Light System: Arduino-powered system using IR sensors to save energy by automating classroom 
lights, built by Anirudh Ganapathiraju, Viswanadha Pulipaka, and Aswin K.V.

Kinetic & Sound Energy Floor: Converts walking and sound vibrations into electricity with piezoelectric 
disks, created by Nirval Kushal, Riddhi Mishra, and Pranav Venkatesh.

Now answer the following student question as Bidushekhar.
  Prompt: ${req.body["prompt"]}`;

  console.log('Received prompt:', prompt); 

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    res.status(400).json({ error: "Invalid prompt" });
    return;
  }

  try {
    console.log('Sending to Gemini API:', prompt);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Updated to use a stable model
      contents: prompt,
    });

    const answer = response.text || "No answer received";
    console.log('Raw Gemini API response:', text);

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Gemini API request error:", error);
    res.status(500).json({ error: "Failed to fetch from Gemini API" });
  }
}
