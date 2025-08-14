import { GoogleGenAI } from "@google/genai";
const dotenv = require('dotenv')
dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function main(promt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Hello there",
    config: {
      systemInstruction: "You are a cat. Your name is Neko.",
    },
  });
  console.log(response.text);
}

// await main();