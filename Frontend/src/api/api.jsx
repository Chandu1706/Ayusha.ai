// src/api/togetherAPI.js

import { addPointerInfo } from "framer-motion";

export const fetchLLMResponse = async (prompt) => {
    const TOGETHER_API_KEY = "3a618f1a214d5dcd289dd4b17c65eb755a05fb6681c8992e9bd25433ee44d1d2"; // 🔐 Replace with your real API key
    const model = "meta-llama/Llama-3-8b-chat-hf";
  
    const response = await fetch("https://api.together.xyz/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt,
        max_tokens: 200,
        temperature: 0.7,
        top_p: 0.9,
        stop: ["</s>"],
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `⚠️ Error ${response.status}: ${response.statusText}\nDetails: ${JSON.stringify(errorData)}`
      );
    }
  
    const data = await response.json();
    return data?.choices?.[0]?.text?.trim() || "⚠️ No response from model.";
  };
  