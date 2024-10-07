import { AI_API_KEY, AI_MESSAGE } from "@env";

export const getCocktailRecommendationFromAI = async (prompt) => {
  const apiKey = AI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a cocktail expert." },
          {
            role: "user",
            content: `${AI_MESSAGE} ${prompt}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const aiRecommendation = data.choices[0]?.message?.content;

    if (!aiRecommendation) {
      throw new Error("No recommendation from AI");
    }

    return aiRecommendation.trim();
  } catch (error) {
    console.error("Error getting recommendation from AI:", error);
    return "";
  }
};
