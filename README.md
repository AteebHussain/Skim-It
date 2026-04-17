# SkimIt — Read Less. Know More.

Paste any URL and get a structured visual brief instead of reading the whole thing. 
Gemini analyzes the content and streams back a headline, 3 key insights, complexity 
rating, bias indicator, prerequisite level, and a worth-your-time verdict — 
animating in card by card as the analysis arrives.

**[Try it live → skim-it.vercel.app](https://skim-it.vercel.app)**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Gemini](https://img.shields.io/badge/Gemini-1.5-orange?logo=google)

## What it does

- **Streaming card animation** — each section animates in sequentially as Gemini streams the response
- **Content-type theming** — headline card color shifts based on article type (tutorial, research, news, docs, blog)
- **3 key insights** — the most important takeaways, distilled from the full content
- **Complexity meter** — rated 1–10 from Beginner to Expert
- **Bias indicator** — Neutral, Opinion, Marketing, Academic, or Advocacy
- **Prerequisite level** — what background knowledge you need before reading
- **Verdict** — Worth It, Skim It, or Skip It
- **Dual-path URL fetching** — Cheerio primary fetch with Jina Reader fallback for JS-rendered pages

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework and API routes |
| TypeScript | Type safety across the codebase |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Streaming card animations |
| Google Gemini 1.5 Flash | AI content analysis with structured JSON output |
| Cheerio | HTML parsing for URL content extraction |
| Jina Reader | Fallback fetcher for JS-rendered pages |
| Zod | Schema validation for Gemini output |
| Vercel | Hosting and deployment |

## Getting Started

### 1. Clone & install
```bash
git clone https://github.com/AteebHussain/skimit.git
cd skimit
npm install
```

### 2. Set up environment

Get your API key from [Google AI Studio](https://aistudio.google.com).
```bash
cp .env.example .env.local
```

### 3. Run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key |

## License

MIT