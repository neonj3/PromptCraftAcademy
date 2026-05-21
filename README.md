# PromptCraft Academy

PromptCraft Academy is now a multi-page static website built from three beginner AI workbooks. It is designed for free GitHub deployment and includes a GitHub-backed workbook flow for registration, login, sessions, and practice records.

## What is inside

- `index.html`: landing page and study flow
- `curriculum.html`: full 100-lesson workbook explorer
- `chapters.html`: detailed beginner chapters with exercises
- `revision.html`: quick revision guide
- `teachers.html`: five-teacher dynamic learning view
- `practice.html`: interactive prompt drills
- `account.html`: GitHub workbook settings, registration, login, and sync status
- `app.js`: shared rendering, page logic, auth flow, GitHub workbook reads/writes, and practice scoring
- `styles.css`: shared responsive UI
- `data/site-content.json`: structured course content extracted from the uploaded DOCX files
- `data/promptcraft-github-database.xlsx`: workbook database template stored in the repo
- `scripts/build_site_assets.py`: rebuilds the JSON content and workbook template from the source DOCX files

## Source documents consolidated into the site

- `Detailed_Beginner_AI_Workbook.docx`
- `AI_Generative_AI_100_Page_Beginner_Workbook.docx`
- `Generative_AI_Workbook.docx`

The current site content includes:

- 100 workbook lessons across 20 topic tracks
- 5 longer beginner chapters
- 15 revision topics
- 5 teacher perspectives

## How login and registration work on GitHub Pages

This project stays fully static, so it does not use a paid backend or hosted database.

Instead:

1. Open `account.html`.
2. Enter the repo owner, repo name, branch, workbook path, and a GitHub token with repository contents write access.
3. Save the settings in the browser.
4. Register or login through the site.
5. The site reads `data/promptcraft-github-database.xlsx` from GitHub, updates the workbook, and writes it back through the GitHub Contents API.

The workbook is organized into these sheets:

- `Users`
- `Sessions`
- `Progress`
- `Activity`
- `Meta`

Important:

- This is practical for a zero-cost static deployment.
- The token is stored in the browser, so this is not production-grade secure authentication.
- Use it for controlled educational deployments, demos, or internal learning projects.

## Local development

Because the site fetches `data/site-content.json`, use a simple static server instead of opening the files directly with `file://`.

Example with Python:

```powershell
python -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`

## Rebuilding the content and workbook

If the workbook DOCX files change, rebuild the generated assets with:

```powershell
C:\Users\ASUS\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe scripts\build_site_assets.py
```

This refreshes:

- `data/site-content.json`
- `data/promptcraft-github-database.xlsx`

## Free deployment to GitHub Pages

1. Push the repo to GitHub.
2. In GitHub, open `Settings` -> `Pages`.
3. Choose `Deploy from a branch`.
4. Select your branch and the root folder.
5. Save.

After deployment:

- Use `account.html` to save the GitHub token and workbook path.
- Keep the workbook file in the same repo branch you configured.

## Verification completed

- `app.js` passes `node --check`
- `site-content.json` was validated after generation
- `promptcraft-github-database.xlsx` was created and sheet structure was verified

## Remaining limitation

The site is static and zero-cost, so there is no secure server-side auth layer. The GitHub token approach is the tradeoff that makes read/write workbook sync possible on GitHub Pages without adding a paid backend.
