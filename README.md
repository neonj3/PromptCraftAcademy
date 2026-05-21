# PromptCraft Academy

PromptCraft Academy is a zero-cost, static web game that teaches generative AI from basic to intermediate level through short lessons and scored prompt missions.

## What it teaches

- Prompt foundations: role, task, audience, and format
- Context and constraints
- Output design and evaluation
- Hallucination awareness and verification
- Few-shot prompting and workflow chaining
- Grounding and simple RAG behavior

## Why this version is zero-cost

- No backend
- No paid API dependency
- No paid database
- Runs entirely in the browser
- Uses `IndexedDB` in the browser for users, progress, and activity
- Exports browser database records to Excel with SheetJS

That means you can host it on free static hosting such as GitHub Pages, Netlify, or Cloudflare Pages.

## Project files

- `index.html`: app structure
- `styles.css`: clean responsive UI
- `app.js`: lessons, auth flow, IndexedDB logic, mission scoring, analytics, and export tools
- `PromptCraft-Academy-Blueprint.docx`: consolidated project document

## How to run locally

1. Download or clone this folder.
2. Open `index.html` in a browser.

You do not need Node, Python, or any package install to play the game.

## New features added

- Timed registration popup after a few seconds
- Client-side registration and login authentication
- IndexedDB browser database for users, progress, and activity
- Excel export with separate sheets for users, progress, and activity
- JSON export for raw backup
- More interactive UI with live prompt coach, activity feed, and scaffold button

## How to deploy for free

### Option 1: GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, and `app.js` to the repository root.
3. In GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and `/root`.
6. Save. GitHub will publish your site and give you a public URL.

Important:

- The current authentication is browser-side and suitable for a static GitHub Pages deployment.
- The current database is browser-side `IndexedDB`, which means data is stored per device/browser, not in a shared cloud database.
- If you later want production-grade login and shared cloud data, you will need a backend or a hosted auth/database service.

### Option 2: Netlify

1. Sign in to Netlify.
2. Drag this project folder into Netlify Drop, or connect the GitHub repository.
3. No build command is needed.
4. No publish directory is needed if the files are in the root.

### Option 3: Cloudflare Pages

1. Create a Pages project in Cloudflare.
2. Connect the GitHub repo.
3. Framework preset: `None`.
4. Build command: leave blank.
5. Output directory: `/`.

## How to ask Codex to help deploy it

If you want OpenAI Codex to help with deployment, give it this repo and ask:

`Deploy this static site to GitHub Pages. Do not add a backend or paid service.`

or

`Prepare this static project for Netlify deployment and verify that it remains fully static.`

Because this is already a static site, Codex should not need to install a framework or rewrite the architecture.

## Learning sources used to shape the curriculum

- Learn Prompting: beginner prompt engineering, hallucinations, bias, and responsible use
- Microsoft Generative AI for Beginners: lesson-based learning plus build-oriented progression
- Hugging Face LLM Course: LLM/NLP foundations and advanced topics like fine-tuning
- Google Cloud Beginner: Introduction to Generative AI: high-level GenAI, LLM, and responsible AI progression

## Suggested next improvements

- Add more missions for images, code, and spreadsheets
- Add a teacher dashboard or printable worksheets
- Add sample policy documents for richer grounding missions
- Add adaptive hints based on weak prompt patterns
