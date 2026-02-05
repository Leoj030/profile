import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o-mini"; // "openai/gpt-4o";

const openai = new OpenAI({ baseURL: endpoint, apiKey: token });

export async function analyzeResume(resumeText: string, prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: modelName,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: "You are a professional resume evaluator",
        },
        {
          role: "user",
          content: `${prompt}\n\nResume:\n${resumeText}`
        }
      ],
      max_completion_tokens: 1000
    });

    const content = completion.choices[0].message?.content;
    if (!content) return { error: "Empty response from AI" };
    return JSON.parse(content);

  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return { error: "Invalid JSON response" };
  }
}

