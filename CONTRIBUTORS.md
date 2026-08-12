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
| `luxroboeducation <luxrobo.education@gmail.com>` | **Amy Lee (이경민)** · kyungminamy@gmail.com |

> ℹ️ Both addresses above (`lux_1@luxrobo.com`, `luxrobo.education@gmail.com`)
> are **shared team accounts**, not any individual's. The names and personal
> addresses in the right-hand column identify the people who did the work.

---

## Who did what

### Silas Lim (임수현) — GitHub [@limsooh](https://github.com/limsooh)

**136 of 153 commits (89%)** · 2026-07-29 → 2026-08-12

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
- **~3,900 lines of handover documentation** so a non-developer successor could
  operate the site from a browser: `docs/RUNBOOK.md` (1,124 lines),
  `docs/RUNBOOK-CLAUDE-CODE.md` (864), the decision log
  `docs/SESSION-LOG.md` (1,718), and the project rules in `CLAUDE.md`

### Amy Lee (이경민)

**17 commits** · 2026-08-04 → 2026-08-12

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

```bash
# commits per author — returns 136 and 17
git log --format='%an <%ae>' | sort | uniq -c | sort -rn

# working period
git log --author="lux_1@luxrobo.com" --format='%ad' --date=short | sort | sed -n '1p;$p'
```

---

*Written 2026-08-12*
