import OpenAI from "openai";
import { Groq } from 'groq-sdk';

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o-mini"; // "openai/gpt-4o";

const openai = new OpenAI({ baseURL: endpoint, apiKey: token });

export async function analyzeResume1(resumeText: string, prompt: string) {
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

const groq = new Groq({ apiKey: process.env.LLAMA_API_KEY });

export async function analyzeResume(resumeText: string, prompt: string) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a professional resume evaluator. Make sure to follow the instructions in the prompt carefully and provide feedback in the specified JSON format.",
      },
      {
        role: "user",
        content: `${prompt}\n\nResume:\n${resumeText}`
      }
      // {
      //   role: "user",
      //   content: [
      //     { type: "text", text: "Analyze this resume PDF for formatting and ATS optimization." },
      //     {
      //       type: "image_url",
      //       image_url: {
      //         url: "https://hngtpbvmmsnwaxwlxsgh.supabase.co/storage/v1/object/sign/ResumeIMG/1770514952415-Beige%20Neutral%20Minimalist%20Classic%20Simple%20Professional%20Graphic%20Designer%20Resume.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8yYmM4Yzg5Yi00MmE3LTRlODktOTRiMy0zZDY0YzczMzczZjUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJSZXN1bWVJTUcvMTc3MDUxNDk1MjQxNS1CZWlnZSBOZXV0cmFsIE1pbmltYWxpc3QgQ2xhc3NpYyBTaW1wbGUgUHJvZmVzc2lvbmFsIEdyYXBoaWMgRGVzaWduZXIgUmVzdW1lLnBkZiIsImlhdCI6MTc3MTU5MjYyNiwiZXhwIjoxNzcyMTk3NDI2fQ.lDtTrQ4kRBvOumPaHAzti7M48qJBh4YJ0w2P047rVUY", // Your Supabase Storage Public URL
      //       },
      //     },
      //   ],
      // },
    ],
    "response_format": { "type": "json_object" },
    "model": "meta-llama/llama-4-scout-17b-16e-instruct",
    "temperature": 0.1,
    "stream": false,
  });

  const content =  chatCompletion.choices[0]?.message?.content;
  if (!content) return { error: "Empty response from AI" };
  return JSON.parse(content);
}