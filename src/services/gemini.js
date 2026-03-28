export async function getAIInsight(incident) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
    if (!apiKey) {
      return "Missing VITE_GEMINI_API_KEY in your .env file.";
    }
  
    const prompt = `
  You are an aviation safety assistant.
  
  Analyze this incident:
  
  Title: ${incident.title}
  Severity: ${incident.severity}
  Cause: ${incident.cause}
  Description: ${incident.description}
  
Provide:
1. Short summary
2. Possible causes
3. Recommended actions

Use plain text only.
Do not use markdown symbols like **, #, or bullets with *.
Keep the response concise.

  `;
  
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
  
    const data = await response.json();
  
    if (!response.ok) {
      return data.error?.message || "Gemini request failed.";
    }
  
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Empty Gemini response.";
  }
  