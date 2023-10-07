import OpenAI from 'openai';
import { configDotenv } from 'dotenv';

configDotenv();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractKeywords(textToAnalyze) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You will be provided with a block of text, and your task is to extract a list of keywords from it. Don't make any sentence",
        },
        {
          role: 'user',
          content: textToAnalyze,
        },
      ],
      temperature: 0.5,
      max_tokens: 20,
    });
    return response.choices[0].message.content.split(', ');
  } catch (error) {
    throw new Error(`Error extracting keywords`);
  }
}
