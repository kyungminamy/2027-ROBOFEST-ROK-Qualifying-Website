# Beginner's Guide to Building a Website with Claude Code
### 2027 ROBOFEST 국내예선대회 website · 16-day blueprint

Written 2026-07-29 · For someone with no web development experience · Timeline: Jul 29 – Aug 14

> A Korean version of this guide is at `BUILD-GUIDE.ko.md` — useful if a Korean-speaking successor needs to understand how the site was built.

---

## How to use this guide

Read Parts 1–3 before you start. **Do not skip Part 2** — it accounts for roughly 90% of why beginners fail at vibe coding. Part 4 is the actual work schedule. Parts 5–7 are reference material to look up when you need them.

---
---

# Part 1 · Concepts — what you are actually building

You need this picture in your head before writing code. Without it, you won't understand what Claude tells you.

## The three parts of a website

```
   ① Browser                  ② Server                   ③ Database
   (parent's phone)        (Vercel's computer)            (Supabase)
        │                        │                          │
        │  "give me /apply"      │                          │
        ├───────────────────────►│                          │
        │◄───────────────────────┤  builds HTML, sends it   │
        │                        │                          │
        │  "save this form"      │                          │
        ├───────────────────────►├─────────────────────────►│
        │                        │  only the server can     │  saved
        │◄───────────────────────┤  reach the database      │
        │   "신청 완료"           │◄─────────────────────────┤
```

**Remember one principle above all: the browser never touches the database directly.** You are handling children's personal data. Always browser → server → database, in that order. If Claude suggests "let's connect to Supabase directly from the browser," say no.

## What each tool does

| Tool | Role | Analogy |
|---|---|---|
| **Node.js** | The engine that runs a website on your computer | Car engine |
| **Next.js** | The framework you build the site with | Car chassis |
| **TypeScript** | The language. Catches typos before they ship | Spellchecker |
| **Tailwind** | Design (colours, spacing, fonts) written as code | Style guide |
| **Git** | Change history. **The undo button** | Game save file |
| **GitHub** | Stores your Git history online | Cloud backup |
| **Vercel** | Puts the site on the actual internet | Server rental |
| **Supabase** | Stores 신청 (application) data | Locked filing cabinet |

## Eight terms you must know

- **local** — your own computer. `localhost:3000` is a practice site only you can see
- **deploy** — putting it on the internet so others can see it
- **commit** — saving your current state. **Creating a point you can return to**
- **push** — uploading commits to GitHub. Pushing triggers a Vercel deploy
- **terminal** — the black window where you type commands. Claude Code runs here
- **dependency** — code someone else wrote, fetched with `npm install`
- **env (environment variable)** — secret values like passwords. **Never commit these to GitHub**
- **RLS** — Supabase's lock. Turn it off and personal data becomes public

---
---

# Part 2 · How to work with Claude Code — the most important part

Claude Code writes the code. **The judgment is still yours.** Beginners fail in predictable ways, and most of them are preventable with the rules below.

## Rule 1 — Commits are your seatbelt ★★★

This is the big one. Claude **will** break working code at some point. If you've committed, recovery takes a minute. If you haven't, you lose a day.

**The habit:**
- Something works → commit immediately
- About to start something new → commit
- End of day → commit
- **Ten commits a day is not too many**

Tell Claude:
```
Commit the current state. Use a clear message describing what was added.
```

When something breaks:
```
The site broke after that last change. Revert to the last commit.
```

## Rule 2 — One thing at a time

**Bad:**
> Build the homepage and the category pages and add the application form and make it mobile-friendly

Five things at once means you can't tell which one broke.

**Good:**
> Build a hero section at the top of the homepage showing the competition name and dates. Read the dates from config/competition.ts.

→ Check it → Commit → Next.

## Rule 3 — It isn't done until you've looked at it

"Done!" from Claude doesn't mean done. **You have to see it in a browser.**

Check every time:
1. Does it actually render at `localhost:3000`?
2. Does it hold up at phone width? (F12 → phone icon)
3. Is the Korean text rendering correctly?
4. Did you click the links?

## Rule 4 — Paste errors in full

**Bad:** "I got an error"
**Good:** copy the entire red text and paste it

Claude reads error messages to find the cause. Summarising throws away the information it needs. A screenshot works too.

## Rule 5 — After three failures, change direction

Claude sometimes loops, fixing the same error repeatedly. After three attempts:

```
I've tried this three times and it still doesn't work. Explain why it's
failing first, then take a different and simpler approach.
```

Or revert to the last commit and ask differently.

## Rule 6 — When to say no to Claude

Even as a beginner, you need to refuse these:

| Suggestion | Why refuse |
|---|---|
| Connect to Supabase from the browser | Personal data exposure risk |
| Commit `.env.local` to GitHub | Leaks your secret key |
| Add an RLS policy of `using (true)` | Makes the whole table public |
| Add login / user accounts | Out of scope. Maintenance burden |
| Hardcode a date into a component | Dates live only in the config |
| Large refactor to "improve" working code | Before Aug 14, stability wins |

How to refuse:
```
Don't do that — it conflicts with the principles in CLAUDE.md.
Find another way.
```

## Rule 7 — Ask for a plan first

For anything large, get a plan before code.

```
I want to build the application form. Before writing any code, give me
a plan: which files you'll create and what each one does, as a list.
I'll approve it before you start.
```

## Rule 8 — Demand explanations for code you don't understand

```
Explain what that file you just created does, in terms a beginner can
follow. Use an analogy. Three sentences maximum.
```

You don't need to understand everything. But you need a rough sense of **what each file is for** — otherwise you can't write the handover documentation.

## Rule 9 — At the start of every session

Claude Code forgets previous conversations when you open a new session. Start with:

```
Read CLAUDE.md and config/competition.ts first. Today I'm working on [task].
```

---
---

# Part 3 · Environment setup (Windows)

## Install order

**1. Node.js**
[nodejs.org](https://nodejs.org) → download the **LTS version** → install (accept defaults)
Verify: run `node -v` in a terminal → a version like `v22.x.x` or `v24.x.x` means success

**2. Git**
[git-scm.com](https://git-scm.com) → download → install (keep defaults)
Verify: `git --version`

**3. VS Code** (optional but recommended)
[code.visualstudio.com](https://code.visualstudio.com) — for looking at your code. It has a built-in terminal, which is convenient.

**4. Claude Code**

In **PowerShell** (your prompt starts with `PS` — if it doesn't, you're in CMD, see below):

```powershell
irm https://claude.ai/install.ps1 | iex
```

🔴 **Then close PowerShell completely and open a new window.** The installer adds Claude to your PATH, but a terminal that's already running can't see the change. Skip this and `claude` will appear "not installed" even though it worked.

If you're in CMD instead (no `PS` in the prompt):
```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

**WSL is not required.** Native Windows is fully supported.

**Claude Code requires a paid plan** — Pro, Max, Team, or Enterprise. The free Claude.ai tier does not include access. First run opens a browser to log in with your Claude account; no API key needed.

Docs: [code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup)

> **Terminal giving you trouble?** The Claude **desktop app** can run Claude Code without a terminal at all. If PATH problems eat your first day, switch to that rather than lose the time — the end result is the same.

## Opening a terminal (Windows)

- **In VS Code:** Terminal menu → New Terminal (easiest)
- **Standalone:** Start → `Windows Terminal` or `PowerShell`

## How Claude Code knows which folder to work in

This trips up almost everyone at the start, so read it once carefully.

**Claude Code operates on whatever folder your terminal is sitting in when you launch it.** There is no menu where you "connect" a folder — the current directory *is* the connection. So the order is always:

```
1. create the folder
2. cd into it
3. launch claude
```

Not the other way round. Whatever folder you were in when you typed `claude` becomes the project root, and that's where Claude looks for `CLAUDE.md`.

**Create your project folder like this:**

```powershell
mkdir C:\Users\luxrobo\projects\robofest-qualifier
cd C:\Users\luxrobo\projects\robofest-qualifier
claude
```

Use one dedicated folder. Never build in Downloads or on the Desktop root. Avoid Korean characters and spaces in the path — an **English-only path** prevents a whole class of problems.

If you're ever unsure where you are, run `pwd` (PowerShell) — it prints the current folder.

**To resume work later**, you `cd` back to the same folder and launch `claude` again. Opening Claude Code from a different folder means it won't see your project.

## Minimum goal for Day 1

You're ready when these three work in a terminal:
```
node -v          →  v22.x.x (or newer)
git --version    →  git version 2.x.x
claude --version →  2.1.x (Claude Code)
```

If `claude` isn't found, in order: (1) did you restart the terminal after installing? (2) run `claude doctor`. (3) If that's also missing, add `%USERPROFILE%\.local\bin` to your User PATH via System Settings → Environment Variables, then restart the terminal.

**Getting stuck here on day one is normal.** It isn't a reflection of your ability — environment setup is just like this. Paste the error into Claude Code and ask.

---
---

# Part 4 · The 16-day blueprint

Overall shape: **information site first (days 1–5) → application form (days 6–10) → polish (days 11–13) → handover (days 14–16)**

The information site comes first because 홍보 (promotion) begins Aug 24 and you need something to show, and because it can be built without a database — which makes it the safest part.

---

## 【 Day 1 】 Setup + first screen

**Goal: see a website running on your own computer**

After installing Node, Git and Claude Code, create the folder and launch Claude inside it (see Part 3):

```powershell
mkdir C:\Users\luxrobo\projects\robofest-qualifier
cd C:\Users\luxrobo\projects\robofest-qualifier
claude
```

Then, in Claude Code:

```
Create a Next.js project in the current directory — use "." as the project
name so it does NOT create a subfolder.
- TypeScript, Tailwind CSS, App Router
- Then tell me how to start the development server
```

⚠️ **The "." matters.** If you give it a project name instead, it scaffolds a subfolder and your terminal ends up one level above the real project — which means Claude won't automatically find `CLAUDE.md`. Scaffolding in place keeps the folder you launch from as the permanent project root.

Success is the default page at `localhost:3000`. Then:

```
Initialise a git repository and make the first commit.
Verify that .gitignore includes .env.local.
```

Now add the prepared files. **Do this after scaffolding, not before** — `create-next-app` wants a mostly-empty folder and will complain about pre-existing files.

```
C:\Users\luxrobo\projects\robofest-qualifier\
├── CLAUDE.md              ← project root (Claude reads this automatically)
├── config\
│   └── competition.ts
└── docs\
    ├── ROBOFEST-KR-CONTEXT.md
    ├── BUILD-GUIDE.md
    └── schema.sql
```

```
Read CLAUDE.md and config/competition.ts. Follow these principles from now on.
```

✅ **Day 1 done when:** the site renders locally and you have at least one commit

---

## 【 Day 2 】 Design basics + homepage skeleton

```
Set up the basics for a Korean-language website.
- Apply the Pretendard font (best readability for Korean)
- Set lang="ko"
- Mobile-first responsive layout
- Colour theme: a calm blue, in keeping with 부산광역시교육청
```

```
Build the homepage. All values must be read from config/competition.ts.
1) Hero: competition name, dates, venue, D-day countdown
2) Registration notice: the 접수 period, emphasising 참가비 무료 (free entry)
3) Cards for all 8 종목 (name, Korean name, one-line summary, divisions, max team size)
4) Footer: 주최 / 주관 / 운영 organisations

Use the formatKoreanDate function for dates. Never hardcode a date.
All visible text must be in Korean.
```

**Check:** F12 → phone icon → does the layout hold up?

✅ **Done when:** changing one date in `competition.ts` updates the homepage

---

## 【 Day 3–4 】 Category (종목) pages

The most content-heavy part. This is what parents and teachers will actually read.

```
Build the /categories page.
- A comparison table of all 8 종목 (name, divisions, max team size, kit restrictions, difficulty)
- Each card links to a /categories/[slug] detail page
- All data from config/competition.ts
```

```
Build the category detail page template. Use exactly this order:
1) Who can enter (division, grade range, team size)
2) What the category involves
3) What you need to prepare (kit, laptop, pre-submissions)
4) Official rules (link to the ROBOFEST HQ page — open in a new tab)

Terminology warning: never use the English word "Qualifier" for
UMC, BottleSumo or VCC. See docs/ROBOFEST-KR-CONTEXT.md section 3.
All visible text in Korean.
```

The content for each category is in `ROBOFEST-KR-CONTEXT.md` §3.1.

✅ **Done when:** someone who knows nothing about robotics can read it and understand what their child needs to prepare

---

## 【 Day 5 】 Schedule · Venue · FAQ

```
Build /schedule: render the milestones from competition.ts as a chronological
timeline. If isEstimated is true, mark it 예정.
```

```
Build /faq. Base the questions on the 10-item Q&A from the 계획서, summarised
in docs/ROBOFEST-KR-CONTEXT.md. Use an accordion (expand/collapse) layout.
```

```
Build /venue using the venue data in competition.ts.
Use the venueDisplayName() function so 예정 is appended while unconfirmed.
Leave a placeholder for the map until the address is confirmed.
```

**Deploy for the first time here.**

```
Walk me through putting this on GitHub and deploying to Vercel.
This is my first time — tell me which buttons to click.
```

✅ **Done when:** you can open the site on your phone via a real URL · **this is your minimum viable outcome**

---

## 【 Day 6 】 Supabase setup

**You need the Pro plan ($25/month) from this point.** The free tier auto-pauses after a week of inactivity — meaning the database could be asleep when 접수 opens on Sept 1, after you've left on Aug 14.

1. Sign up at [supabase.com](https://supabase.com) — **using the shared 럭스로보 account**
2. New Project → **Region: Northeast Asia (Seoul)**
   - Seoul has had capacity shortages; creation can fail. If so use Tokyo, but note that this makes it a cross-border data transfer (개인정보 국외이전) requiring disclosure.
3. Upgrade to Pro
4. SQL Editor → paste all of `docs/schema.sql` → Run
5. Confirm `teams`, `students`, `category_capacity` in Table Editor

```
I've created a Supabase project. Please:
1) Install @supabase/supabase-js
2) Create .env.local with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
3) Confirm .env.local is in .gitignore
4) Create lib/supabase.ts — a server-only client that cannot be used from the browser
```

🔴 **`.env.local` must never reach GitHub.** Before committing:
```
Run git status and confirm .env.local is not in the list.
```

✅ **Done when:** three tables exist in Supabase and no secret key is in GitHub

---

## 【 Day 7–9 】 The application form

The longest stretch. **Break it into stages — do not attempt it in one go.**

**Day 7 — the form UI only, no saving**
```
Build the /apply form. Do not add saving yet — UI only.
Three steps:
1) Choose 종목 → 2) 지도자 (coach) details → 3) Student details + consent

Important:
- Selecting a 종목 changes the max number of students
  (Game 5 / UMC 4 / BottleSumo 3)
- Collect Korean name and romanised name separately (romanised is printed on medals)
- Every student requires a guardian name and phone number
- Must be comfortable to use on a phone
All visible text in Korean.
```

**Day 8 — saving**
```
Build the route handler that processes the form: app/api/apply/route.ts

Requirements:
- The browser must never touch Supabase. Server only.
- Re-validate everything server-side with zod (browser validation can't be trusted)
- Insert into teams and students in a single transaction
- Reject if the category is at capacity
- On success, return a confirmation including the edit_token
- Never write personal data into error logs
```

**Day 9 — capacity display + the fallback switch**
```
Read the v_capacity_status view and show remaining team slots per 종목.
Return counts only — never applicant details.
When a category is full, show 마감 and make it unselectable.
```

```
Add a mode field to registration in config/competition.ts.
'native' uses our own form; 'external' redirects to formUrl.
A non-technical person must be able to switch by changing one word.
```

✅ **Done when:** you submit a real application and see the row appear in Supabase

---

## 【 Day 10 】 Personal data handling (legally required)

🔴 **Have someone at 럭스로보 review this. I am not a lawyer.**

**Under 개인정보보호법, children under 14 require legal guardian consent.** The Junior division starts at 초5 (roughly age 11), so most Junior applicants are affected.

```
Build the personal data pages.
1) /privacy — 개인정보처리방침 covering: items collected, purpose,
   retention period, destruction, third-party processing, contact
2) Split the consent checkboxes on the form:
   - [required] 개인정보 수집·이용 동의
   - [required] 촬영 및 온라인 송출 (portrait rights) 동의
   - [required] coach confirms legal guardian consent was obtained
     for any participant under 14
   Each with the full text viewable inline
```

```
Run a security review:
- Is RLS enabled on every Supabase table?
- Is the service role key absent from all browser-side code?
- Does any personal data appear in console output or error logs?
- Is .env.local excluded from git?
Report what you find as a list.
```

✅ **Done when:** submission is impossible without consent, and a privacy policy exists

---

## 【 Day 11–13 】 Polish

```
Review the whole site:
- Every page at phone width
- Broken links
- Korean font rendering and line breaking
- Browser tab titles and social share previews (OG tags)
- A 404 page
```

**Real user testing (Day 12).** Have two colleagues complete an application on their phones. Watch, but do not help. **Wherever they get stuck is where you'll get phone calls in September.**

**Day 13 — prepare the fallback form**
Build a backup Google Form with the same fields, put its URL in `formUrl`, switch `mode` to `'external'`, confirm the redirect actually works, then switch back to `'native'`. **You hope never to use it. It is your insurance.**

---

## 【 Day 14–16 】 Handover ★ the most important part

**Stop coding.** These three days determine whether the project survives.

**Day 14 — account cleanup**
- [ ] GitHub, Vercel, Supabase, domain all owned by the **shared 럭스로보 account**
- [ ] Payment method is a corporate card (a personal card gets cut off in September)
- [ ] At least two people can access each account
- [ ] Passwords handed over via a team password manager or a sealed document

**Day 15 — write RUNBOOK.md**
```
Create docs/RUNBOOK.md written for someone with zero development knowledge.
Mark where screenshots should be inserted. Cover:
1) How to change a date (edit competition.ts on github.com)
2) How to post an announcement
3) How to check applications and download the spreadsheet
   (Supabase → v_team_export)
4) How to adjust category capacity
5) What to do if the form breaks — switch mode to 'external'
6) Where to log in to each account, and who owns it
7) A list of things never to do
Write it in Korean.
```

**Day 16 — handover rehearsal**
Have your successor (or any colleague) **do these themselves:**
- [ ] Change a date on github.com → confirm it appears on the site
- [ ] Download the applicant list as CSV from Supabase
- [ ] Switch the form to external and back

**Watch without touching anything.** If they can't do it, the RUNBOOK needs fixing — not them.

---
---

# Part 5 · Problems you will definitely hit

| Symptom | Cause | Fix |
|---|---|---|
| `npm: command not found` | Node not installed, or terminal not restarted | Close and reopen the terminal |
| `port 3000 already in use` | A previous server is still running | Ctrl+C in the old terminal |
| Korean shows as □□□ | Font not applied | Check the Pretendard setup |
| Works locally, breaks when deployed | Environment variables missing on Vercel | Vercel → Settings → Environment Variables |
| Dates are off by one day | Server timezone is UTC | Use `formatKoreanDate`. Never use `new Date().getDay()` directly |
| Supabase connection fails | Wrong key, or project paused | Check status in the dashboard |
| Everything suddenly breaks | A large change from Claude | Revert to the last commit |

## When you're stuck

```
[paste the entire error]

I got this error. I'm a beginner.
1) Explain what it means in plain terms
2) What caused it
3) How to fix it, step by step
```

---
---

# Part 6 · Never do these

1. **Commit `.env.local` to GitHub** — key leaked. If it happens, rotate the key in Supabase immediately
2. **Disable RLS or add a `using (true)` policy** — exposes every student's personal data
3. **Use the service role key in browser code** — same as above
4. **Work for hours without committing** — no way back
5. **Register the domain under a personal account** — unrecoverable after you leave
6. **Run on the free Supabase tier** — it will be paused when 접수 opens
7. **Refactor heavily on Aug 13** — the last three days are for stabilising only
8. **Move on without checking** — problems pile up and become untraceable

---
---

# Part 7 · Priorities (when you run out of time)

If you fall behind, **cut from the bottom.**

**🔴 Essential (the competition can't run without these)**
- Category, schedule and venue pages
- Application form saving to the database
- Consent handling and privacy policy
- RUNBOOK + account handover

**🟡 Good to have**
- Live capacity counters
- FAQ accordion
- Announcements
- OG tags

**🟢 Skippable**
- Edit-after-submit
- Admin dashboard (the Supabase dashboard is enough)
- Animation
- Multiple languages

**If the 🔴 items aren't finished by Aug 10, switch the form to a Google Form and spend the remaining time on handover.** Leaving behind a half-built form is the worst outcome.

---

## Finally

You aren't building a website. You're building **a system that runs without you.**

A site that's 70% finished with documentation a successor can follow beats a 90% site nobody can touch. Whenever you're deciding whether to add something, ask:

> **"Can the person who has to fix this in November do it without me?"**
