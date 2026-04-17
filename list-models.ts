import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from 'fs';

async function listModels() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error('No API key found!');
    return;
  }
  
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    if (data.models) {
      const names = data.models.map((m: any) => m.name);
      fs.writeFileSync('models.txt', names.join('\n'));
      console.log('Saved to models.txt');
    } else {
      console.log('Error/No models:', Math.random());
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

listModels();
