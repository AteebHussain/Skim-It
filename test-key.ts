import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContentStream('Hi');
    let fullText = '';
    for await (const chunk of result.stream) {
      fullText += chunk.text();
    }
    console.log('SUCCESS:', fullText);
  } catch (error) {
    console.error('API Error:', error);
  }
}

run();
