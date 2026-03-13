# SkimIt — How to Not Look Vibe-Coded
### A practical reference for writing, designing, and shipping like a senior dev

---

## What "Vibe-Coded" Actually Means (For This Project)

SkimIt converts any URL into a visual brief using Google Gemini. Its core users — developers, researchers, anyone who reads a lot online — will immediately recognize lazy engineering. A vibe-coded SkimIt is one where the URL input barely validates, cards flash in all at once instead of streaming, error states are blank, and the whole thing looks like a hastily themed Shadcn template. This guide exists to make sure SkimIt looks and feels like it was built by someone who has shipped production software — because you have.

---

## 1. Code Quality

### Name things like you mean it
Lazy names signal lazy thinking. Every variable, function, and type should communicate intent.

```
❌ const data = await fetch("/api/brief")
✅ const briefResult = await fetch("/api/brief")

❌ function handleClick()
✅ function handleUrlSubmit(url: string)

❌ const res = useRef({})
✅ const streamedBriefRef = useRef<Partial<BriefData>>({})
```

### No magic strings scattered across components
Content type labels like `"tutorial"`, `"research"`, sentiment values like `"positive"` — these should be defined as constants or enums in a shared file, not hardcoded inline across components.

```
❌ if (contentType === "research") { ... }
✅ if (contentType === CONTENT_TYPES.RESEARCH) { ... }
```

### TypeScript — use it properly
`BriefData`, `InsightItem`, `StreamPhase` should all be typed explicitly. Never use `any`. If Gemini returns something unexpected, type it with `unknown` and validate with Zod.

```
❌ const parsed: any = JSON.parse(chunk)
✅ const parsed = briefSchema.safeParse(JSON.parse(chunk))
```

Define `BriefData`, `InsightItem`, `StreamPhase`, `ContentType`, `Sentiment`, `Verdict` in a single `types/index.ts` file. Every shared type belongs there — not inline inside components.

### Functions do one thing
The streaming API route handles URL validation, content fetching, Gemini prompting, and response streaming. Each of these should be its own function. A recruiter reading your API route should understand it in under 30 seconds.

### No dead code in the repo
No commented-out experimental prompts, no unused imports, no leftover `console.log` calls. Run ESLint before every commit. If it is not running, it should not be in the file.

### Consistent async handling
You are using `async/await` with `try/catch`. Keep it that way. Do not mix `.then()` chains into the same codebase. Pick the pattern and never deviate.

---

## 2. Component Architecture

### Every component has one job

```
UrlInput          → captures the URL. Does not call the API directly.
BriefCard         → lays out the card grid. Does not fetch. Does not parse.
HeadlineCard      → displays title and metadata. Does not know about insights.
InsightCard       → displays one insight. Does not know about other insights.
SentimentTag      → renders the sentiment badge. Does not compute sentiment.
DifficultyMeter   → renders the difficulty bar. Does not know the article content.
VerdictBadge      → renders the final verdict. Knows nothing else.
```

If a component is doing two of these things, split it.

### Props should be typed and minimal
If you are passing more than 5 props to a component, consider whether some of them belong in a shared state layer. `InsightCard` receiving `title` and `body` is correct. It should never receive the entire `BriefData` object.

### Keep components in the right folder
`components/brief/` is for the card system. `components/ui/` is for generic primitives. Do not mix them. Do not dump files into the root of `components/`.

---

## 3. State Management

### `page.tsx` is your single source of truth
The streaming state, the parsed brief data, the current URL — all of it lives at the page level or in a dedicated hook. Do not duplicate any of this state inside child components.

### Local state for local concerns only
Whether a card has finished its entrance animation is local UI state. It belongs inside the card component. Whether the brief is still streaming belongs in the streaming hook. These should never cross.

### The streaming ref exists for a reason
During token-by-token streaming, React state updates are batched. If you are accumulating streamed JSON tokens, use a `useRef` for the real-time buffer and sync to state periodically. Do not try to rely solely on `useState` for high-frequency streaming updates.

### Never mutate state directly
Always spread or copy before updating:

```
❌ briefData.insights.push(newInsight)
✅ setBriefData(prev => ({ ...prev, insights: [...prev.insights, newInsight] }))
```

---

## 4. Error Handling — The Biggest Tell

This is where most AI tools built at speed fall apart completely. SkimIt fetches URLs and calls Gemini. Both will fail. Every failure must be handled gracefully and communicated clearly.

### The states every brief must handle

| State | What the user sees |
|---|---|
| Idle | URL input, empty brief area with subtle placeholder message |
| Fetching URL | Progress indicator: "Fetching article..." |
| Streaming | Cards animate in one by one as data arrives |
| Complete | Full brief with all cards rendered |
| Error | Clear error message explaining what went wrong |

A blank screen on error is half-built.

### URL fetch errors must show real messages
Paywall blocked? Bot detection? Empty page? The error message should tell the user *why* it failed — not just "Something went wrong."

```
❌ catch { setError("Error") }
✅ catch (err) { setError(err instanceof Error ? err.message : "Failed to fetch article content") }
```

### Handle the case where the URL is inaccessible
Not every URL will return usable content. JS-rendered SPAs, paywalled articles, and bot-blocked pages are the reality. The fallback to Jina Reader must be invisible to the user, and if both paths fail, the error should explain it clearly.

### Handle slow or stalled streams
If Gemini takes more than 15 seconds to return its first chunk, the user needs feedback. Add a timeout message: "Taking longer than expected..." — not silence.

---

## 5. UI and Visual Polish

### Spacing must be consistent
You are using Tailwind's spacing scale. Stick to it. Do not mix `p-5`, `p-[18px]`, and `padding: 16px` for the same type of element. Define the system and apply it without exceptions.

### The color palette is defined — use it everywhere
Define your palette as CSS custom properties in `globals.css`. Every component references the variables. No hardcoded hex values scattered across files.

| Token | Usage |
|---|---|
| `--bg-primary` | Page background |
| `--bg-card` | Card surfaces, input areas |
| `--accent` | Primary action button, active states |
| `--text-primary` | All body and heading text |
| `--text-muted` | Labels, metadata, placeholders |

The accent color appears in the submit button and active states. Nowhere else. Overusing the accent destroys the visual hierarchy.

### Content-type theming must be consistent
Each content type gets a color: blue for docs, orange for news, green for tutorials, purple for research, neutral for articles. These colors appear in the headline card badge and the card border accent. Define them once, reference them everywhere.

### Typography has three levels — use only three

| Level | Usage |
|---|---|
| Heading | Brief title, page heading |
| Body | Insight text, descriptions |
| Label | Badges, metadata, sentiment tags |

Do not introduce a fourth size. Do not use `font-semibold` on body text.

### Empty states are not optional
Before any URL is submitted, the brief area should not be blank. Show a subtle centered message:

```
"Paste a URL above and watch the brief build itself."
```

This communicates the product's purpose to first-time visitors before they interact.

### No glowing hover states
Hover states should be subtle background shifts. No box-shadow glows, no pulsing borders on idle elements. The animated card entrances are the show — everything else should be quiet.

### Every interactive element needs a visible hover state
The submit button, history entries, card actions. If clicking it does something, it must look interactive before the click.

---

## 6. The Streaming Experience Specifically

This is your demo moment. It must be flawless.

### Cards must animate in sequentially — not all at once
The headline card appears first. Then insights slot in one by one (150ms stagger). Then sentiment fades in. Then difficulty fills. Then the verdict drops in last with spring physics. If everything appears simultaneously, the streaming is not wired properly.

### Each card section appears only when its data is ready
Do not show empty cards with placeholder text. A card should mount only when Gemini has streamed enough JSON for that section to be parsed. The progressive JSON parser drives the animation — not arbitrary timeouts.

### The verdict is the finale
The verdict badge must be the last element to appear. It uses spring physics with a slight overshoot — the "satisfying thud." If it appears before the insights are done, the sequence is broken.

### Never show a broken card
If Gemini errors mid-stream, the cards must transition cleanly to an error state. No half-rendered JSON. No stuck spinners. No cards with `undefined` text.

---

## 7. The Brief Archive Feature

### Briefs must persist across page refreshes
Use `localStorage` with a key like `skimit-briefs`. Limit stored entries to the last 30 to avoid hitting storage limits.

### Each stored brief must be self-contained
A stored brief must contain: the original URL, the complete brief data (title, insights, sentiment, difficulty, verdict, content type), and the timestamp. When a user clicks a history entry, the full brief must restore exactly as it appeared.

### History entries need individual delete
Each entry should have its own delete action. Users will want to remove specific briefs, not just nuke the whole archive.

### Handle localStorage being full or unavailable
If localStorage is full, fail silently — do not crash the app. If the user is in private browsing mode and localStorage is unavailable, the app should still work — just without persistence.

---

## 8. URL Fetching — The Hidden Risk

### The fetcher must be invisible to the user
The user pastes a URL and sees "Analyzing..." — they should never know or care whether the content was fetched directly or via Jina Reader. The fallback is an implementation detail.

### Set realistic timeouts
Primary fetch: 10 second timeout. Jina fallback: 15 second timeout. Total: if both fail within 25 seconds, show the error. Do not let the user stare at a spinner for a minute.

### Strip the HTML properly
After fetching, the content must be clean text — no script tags, no nav elements, no cookie banners, no footer links. Cheerio extraction should target `<article>`, `<main>`, or fall back to `<body>`, stripping everything non-textual.

### Content length matters
If the extracted text is under 100 characters, it is probably not real content (bot block, empty page). Reject it early with a clear message: "Could not extract meaningful content from this URL."

---

## 9. Git Hygiene

This is visible to every recruiter who clicks your GitHub.

### Commit messages tell a story

```
✅ Added streaming brief generation with Gemini
✅ Fixed Jina Reader fallback when primary fetch is blocked
✅ Refactored URL content parser into standalone module
✅ Styled content-type color theming to headline cards

❌ "fix stuff"
❌ "wip"
❌ "changes"
```


### `.env.local` must never be committed
It is already in `.gitignore` via `.env*`. Add a `.env.example` file with key names but no values:

```env
GEMINI_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

This tells other developers exactly what they need without exposing your credentials.

### No API keys, no secrets, no tokens in the codebase
Not in config files, not in comments, not in commit messages. If a key appears anywhere in `git log`, the repo is compromised. Use environment variables for everything sensitive.

---

## 10. Pre-Launch Checklist

Before you share the link, verify every item:

- [ ] Paste a real URL — all 6 card sections render with streaming animation
- [ ] Paste a paywalled/inaccessible URL — clear error message appears
- [ ] Paste an invalid URL — validation error before any fetch attempt
- [ ] Cards animate sequentially: headline → insights → sentiment → difficulty → verdict
- [ ] Verdict badge drops in last with spring physics
- [ ] Brief is saved to localStorage and appears in history
- [ ] History persists across page refresh
- [ ] Individual brief delete works in history
- [ ] Auth flow: sign-up → sign-in → protected routes redirect
- [ ] No `console.log`, `console.error`, or `any` types in production code
- [ ] No API keys or secrets anywhere in the codebase or git history
- [ ] `npm run build` completes with zero errors and zero warnings
- [ ] Empty state visible before first URL is submitted
- [ ] Mobile layout works at 375px, 768px, 1024px+
- [ ] README has a live demo link
- [ ] `.env.example` is in the repo; `.env.local` is not
- [ ] Commit history is clean — no "wip" or "fix stuff" messages

---

## The Single Most Important Rule

**The unhappy path is the product.**

What happens when the URL is paywalled? What happens when Gemini is rate-limited? What happens when the user pastes a JavaScript SPA that returns empty HTML? What happens when the stream cuts out halfway through?

Every feature that only works on the happy path is half a feature. A brief tool where the URL fetch fails gracefully with a clear, actionable error message is more impressive than one that either works perfectly or breaks silently.

Error handling is not defensive programming. For a portfolio project, it is the proof that you think like a senior engineer.
