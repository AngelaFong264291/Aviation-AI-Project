export async function getAIInsight(incident, question, mode = "insight") {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return "Missing VITE_GEMINI_API_KEY in your .env file.";
  }

  const prompt =
    mode === "question"
      ? `
You are an aviation safety assistant.

Incident:
Title: ${incident.title}
Severity: ${incident.severity}
Cause: ${incident.cause}
Description: ${incident.description}

User question: ${question}

Answer the user's question directly and clearly.
Focus on the specific question asked.
Use plain text only.
Do not use markdown symbols like **, #, or bullets with *.
`
      : `
You are an aviation safety assistant.

Incident:
Title: ${incident.title}
Severity: ${incident.severity}
Cause: ${incident.cause}
Description: ${incident.description}

User question: ${question}

Answer clearly and concisely.
Return plain text using exactly these section headings:
Summary:
Possible Causes:
Recommendations:
Keep each section brief and scannable.
Use 1 short paragraph for Summary.
Use 3 short lines for Possible Causes.
Use 3 short lines for Recommendations.
Use plain text only.
Do not use markdown symbols like **, #, or bullets with *.
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
  
