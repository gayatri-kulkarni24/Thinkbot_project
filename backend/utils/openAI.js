import 'dotenv/config';

const getGeminiResponse = async (message) => {
  const API_KEY = process.env.API_KEY;

  const payload = {
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: message
      }
    ]
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("OpenRouter raw response:", JSON.stringify(data, null, 2));

    // SAFE STRING EXTRACT (closest to your old candidates[0]....text)
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("OpenRouter returned no message content");
    }

    return text;
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    throw error;
  }
};

export default getGeminiResponse;
