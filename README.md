# 2027 ROBOFEST 국내예선대회 — website (personal copy)

A copy of the website I worked on at LUXROBO, kept in sync with the original.

- **Original:** [luxroboeducation/2027-ROBOFEST-ROK-Qualifying-Website](https://github.com/luxroboeducation/2027-ROBOFEST-ROK-Qualifying-Website) (public)
- **Live site:** https://robofestbusan2026.com
- **The code and full history are on the [`live`](../../tree/live) branch** of this
  repository, updated automatically every day at 06:00 KST.

This branch (`main`) holds only this README and the sync workflow, so that the
automation cannot overwrite itself.

---

## About the commit attribution

Every commit in the original repository was authored from one of **two shared
departmental accounts**, not from personal ones. GitHub therefore attributes the
work to those shared accounts rather than to the individuals who did it.

I am **Amy Lee (이경민)** — the commits recorded as
`luxroboeducation <luxrobo.education@gmail.com>` are mine.

The upstream repository's
[`CONTRIBUTORS.md`](https://github.com/luxroboeducation/2027-ROBOFEST-ROK-Qualifying-Website/blob/main/CONTRIBUTORS.md)
records who did what, written and committed while both contributors were still
at the company. It is the authoritative record, not this file.

**My contribution:** 19 commits between 2026-08-04 and 2026-08-12 — header
background photography, UI refinements, and documentation updates. The site
itself was designed and built by
**Silas Lim (임수현)** ([@limsooh](https://github.com/limsooh)), who authored
137 of the first 156 commits.

I have not altered any commit author lines and have not claimed either shared
address on a personal account — both would misattribute a colleague's work.

---

## What the project is

A Korean-language information and registration site for the 2027 ROBOFEST World
Championship Korea National Qualifier, hosted by the Busan Metropolitan City
Office of Education and operated by LUXROBO.

- **Next.js (App Router) + TypeScript + Tailwind**, fully static, deployed on Vercel
- Registration runs through an embedded Google Form — no database, and no
  applicant personal data on the project's own infrastructure
- Built to run unattended: a bad content edit fails the *build*, so the last
  good deploy keeps serving rather than publishing something broken

## How the sync works

`.github/workflows/sync-upstream.yml` clones the public upstream anonymously and
force-pushes its `main` onto this repository's `live` branch, using the per-run
`GITHUB_TOKEN`. No company credential is involved, so the sync continues to work
independently of my former work access.

GitHub disables scheduled workflows after 60 days without repository activity
and emails a warning first; re-enabling is one click in the Actions tab. The
original site is retired when registration closes on 2026-10-16, after which
there is nothing further to sync — the copy here remains complete regardless.
