import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ error: 'Invalid prompt' });
    return;
  }

  // Replace with your actual Gemini API endpoint and key name
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: 'Server misconfiguration: missing API key' });
    return;
  }

  try {
    const apiResponse = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      res.status(apiResponse.status).json({ error: errorText });
      return;
    }

    const jsonData = await apiResponse.json();
    const answer = jsonData.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer received';

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Gemini API request error:', error);
    res.status(500).json({ error: 'Failed to fetch from Gemini API' });
  }
}
