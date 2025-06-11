const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function chat(prompt) {
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      body,
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    return "AI request failed.";
  }
}

module.exports = { chat };
