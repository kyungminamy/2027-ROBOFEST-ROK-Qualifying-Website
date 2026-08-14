# Contributors

2027 ROBOFEST World Championship 국내예선대회 (Korea National Qualifier) website
`https://robofestbusan2026.com`

> 🇰🇷 한국어판: [`CONTRIBUTORS.ko.md`](CONTRIBUTORS.ko.md)

---

## ⚠️ The commit history alone does not show who built this

Every commit in this repository was authored from one of **two shared
departmental accounts**, not personal ones. As a result GitHub attributes all
of the work to the single `luxroboeducation` account.

**This file exists to record who actually did the work.**

| git author on record | actual person |
| --- | --- |
| `lux_1 <lux_1@luxrobo.com>` | **Silas Lim (임수현)** · GitHub [@limsooh](https://github.com/limsooh) · lim.sooh5@gmail.com |
| `luxroboeducation <luxrobo.education@gmail.com>` | **Amy Lee (이경민)** · GitHub [@kyungminamy](https://github.com/kyungminamy) · kyungminamy@gmail.com |

> ℹ️ Both addresses above (`lux_1@luxrobo.com`, `luxrobo.education@gmail.com`)
> are **shared team accounts**, not any individual's. The names and personal
> addresses in the right-hand column identify the people who did the work.

---

## Who did what

### Silas Lim (임수현) — GitHub [@limsooh](https://github.com/limsooh)

**147 of 178 commits (83%)** · 2026-07-29 → 2026-08-14

Designed and built the entire site.

- Static site on **Next.js (App Router) + TypeScript + Tailwind**, deployed to
  Vercel with a custom domain (`robofestbusan2026.com`)
- Every page — home, about ROBOFEST, the 8 competition categories with detail
  pages, schedule, directions, FAQ, and registration
- **Google Forms registration**, deliberately architected so that no applicant
  personal data is ever stored on our own infrastructure (no database)
- **Designed to run unattended.** A bad content edit breaks the *build* rather
  than the site, so Vercel keeps serving the last good deploy instead of
  publishing something broken
- **Accessibility** — contrast ratios computed per header image to verify WCAG
  compliance (3:1 for headings, 4.5:1 for body text)
- **~4,600 lines of handover documentation** so a non-developer successor could
  operate the site from a browser: `docs/RUNBOOK.md` (1,134 lines),
  `docs/RUNBOOK-CLAUDE-CODE.md` (881), the decision log
  `docs/SESSION-LOG.md` (2,339 — started here, continued by Amy), and the
  project rules in `CLAUDE.md` (231)

### Amy Lee (이경민) — GitHub [@kyungminamy](https://github.com/kyungminamy)

**31 commits** · 2026-08-04 → 2026-08-14

- Header background photography, UI refinements, documentation updates

---

## Organisers

| Role | Organisation |
| --- | --- |
| Host (주최) | 부산광역시교육청 — Busan Metropolitan City Office of Education |
| Operator (주관·운영) | (주)럭스로보 — LUXROBO |

---

## How to verify

Every figure in this file comes straight from the git history.

**The counts above are fixed to one point in the history — commit `0ce1a06`
(2026-08-14 12:22), the last commit of Silas's final day.** They are
deliberately *not* "as of today": work continues on this repository, so a plain
count would drift away from these numbers and make the file look wrong. Pinning
the commit keeps every figure here true permanently.

```bash
# commits per author up to that point — returns 147 and 31
git log --format='%an <%ae>' 0ce1a06 | sort | uniq -c | sort -rn

# total commits at that point — returns 178
git rev-list --count 0ce1a06

# working period
git log --author="lux_1@luxrobo.com" 0ce1a06 --format='%ad' --date=short | sort | sed -n '1p;$p'
```

To see the *current* totals instead, drop `0ce1a06` from those commands. The
figures will be higher; that is expected and does not contradict anything above.

---

*Written 2026-08-14 · figures pinned to commit `0ce1a06` (2026-08-14)*
