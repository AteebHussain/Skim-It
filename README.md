# SkimIt

Paste any URL — article, blog post, research paper, docs — and get back a beautifully animated visual brief instead of a wall of text. Cards deal in one by one as Gemini streams the analysis. Built for people who read too much internet.

**[Try it live →](#)**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Gemini](https://img.shields.io/badge/Gemini-AI-orange?logo=google)

## Features

- **Paste & go** — drop any URL, get a structured visual digest in seconds
- **Streaming card animation** — headline, insights, sentiment, difficulty, and verdict animate in sequentially as Gemini streams
- **Content-type theming** — card colors adapt based on article type (news, tutorial, research, docs)
- **Key insights** — the 3 most important takeaways, distilled
- **Sentiment & difficulty** — instant read on tone and complexity
- **"Worth your time?" verdict** — a bottom-line call: Worth It, Skim It, or Skip It
- **Brief archive** — saved briefs persist in localStorage so you can revisit past reads
- **Dark theme** — sleek dark UI with glassmorphism cards

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety across the codebase |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Card entrance animations |
| Google Gemini | AI analysis via streaming |
| Vercel AI SDK | Streaming response helpers |
| Cheerio | HTML parsing for URL content extraction |
| Clerk | Authentication |
| Vercel | Hosting and deployment |

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/AteebHussain/skimit.git
cd skimit
npm install
```

### 2. Set up environment

Get API keys from [Google AI Studio](https://aistudio.google.com) and [Clerk](https://clerk.com).

```bash
cp .env.example .env.local
# Then paste your keys in .env.local
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
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |

## License

MIT
