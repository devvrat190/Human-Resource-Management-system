const GEMINI_API_KEY ='AIzaSyCS_9SQtJMLPQD6WoqafErnfRiscJgpB_w';

export const askGemini = async (context, question) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: context },
              { text: `Question: ${question}` },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
};
