# CLAUDE.md — 2027 ROBOFEST 국내예선대회 웹사이트

Read this before doing anything. Full domain reference lives in `docs/ROBOFEST-KR-CONTEXT.md`.

---

## The one constraint that governs every decision

**The person who builds this site leaves the company on 2026-08-14. 접수 opens 2026-09-01 — 18 days later. The 대회 is 2026-11-27~28. No successor has been assigned.**

So the site must:
1. **Run unattended for months.** No component may expire, pause, throttle, or require a human to notice something.
2. **Be editable by a non-technical person through a web browser.** No terminal. No local setup.
3. **Fail safe.** A bad edit must break the *build* (so Vercel refuses to deploy and the old site stays up), never deploy broken.

When choosing between two approaches, pick the one a stranger can operate in November. Simplicity beats features. Every time.

---

## Scope

**Build:** a Korean-language information site for the competition, plus a 신청 page that hands off to an external form.

**Do NOT build:** user accounts, login, a database, file uploads, transactional email, admin dashboards, or a custom form backend. These were considered and deliberately rejected — they all create unattended failure modes. If a future developer wants them, `docs/ROBOFEST-KR-CONTEXT.md` §4 has the full data model spec.

접수 itself runs on **네이버 폼** (chosen over 구글폼 to avoid 개인정보 국외이전 disclosure for a 교육청 event). The site links/embeds it. We do not touch participant PII in our own infrastructure.

---

## Stack

- **Next.js (App Router) + TypeScript + Tailwind**, static export where possible
- **Vercel** for hosting, connected to GitHub — pushes to `main` auto-deploy
- **No database. No API routes that write. No cron. No env vars holding secrets.**

Rationale for TypeScript over plain JSON for content: a malformed edit fails the build, so Vercel keeps serving the last good version instead of publishing something broken. That is a safety feature for an unattended site, not developer preference.

---

## The content principle — this is the most important rule

**Every date, name, number, and piece of copy that could change must live in `config/competition.ts` or `content/*.md`. Nothing hardcoded in components. Ever.**

The successor's entire job is: open github.com → edit one file → wait 60 seconds → the site is updated. If they have to find a string inside a React component, this project has failed.

Checklist when adding anything:
- Is this a date? → `config/competition.ts`
- Is this a 종목 rule or description? → `config/competition.ts` categories array
- Is this prose (안내문, FAQ answer, 공지)? → `content/*.md`
- Is this a phone number, email, 장소? → `config/competition.ts`

Add a Korean comment above every field explaining what it is and what changes if you edit it.

---

## Confirmed facts (as of 2026-07-29)

| | |
|---|---|
| 대회명 | (가칭) 2027 ROBOFEST World Championship 국내예선대회 |
| 대회 일자 | **2026. 11. 27.(금) ~ 11. 28.(토)** ✅ confirmed · 설치 11. 26.(목) |
| 장소 | 부산보건대학교 체육관 (예정) |
| 주최·주관 | 부산광역시교육청 |
| 운영·공인 | (주)럭스로보 · ROBOFEST 본부 (Lawrence Technological University) |
| 공식 예선 여부 | ✅ 공식 예선 (official qualifier) — confirmed |
| 참가 대상 | 전국 초·중·고 — Junior(초5~중2) / Senior(중3~고2) |
| 참가 규모 | 100팀 내외 (학생 400여 명, 총 600여 명) |
| 접수 기간 | 2026. 9. 1.(화) ~ **10. 16.(금)** ⚠️ 마감일 미확정 — see below |
| 참가비 | **무료** (부산광역시교육청 예산) |
| 2027 세계대회 | **2027. 5. 서울 광운대학교** — Seoul, NOT Busan |

**⚠️ Unconfirmed, do not present as settled:**
- 접수 마감 could be 10/30 instead of 10/16. One-line change in the config.
- Korea's 2027 quota per 종목 is unknown. **Never state a number of teams that will advance.**
- 부산보건대학교 is 예정, not contracted. Word it as such until confirmed.

---

## Terminology guardrails

- **Never call UMC / BottleSumo / VCC a "Qualifier" in English.** LTU reserves that term for Game and Exhibition only, and will read it as a rules error. Korea's situation is genuinely different (see `docs/ROBOFEST-KR-CONTEXT.md` §3.0), but use **국내선발** / **대표 선발** in Korean and avoid the English word entirely.
- **출전권 must be described as opportunity, not entitlement**: "상위팀에 세계대회 진출 기회 제공" — not "1위 팀은 세계대회에 진출합니다". The quota is unknown and likely allows only ~1 team per category+division.
- **세계대회 = 서울 광운대학교.** Busan is the 예선 venue. Never conflate them.
- Robofest's identity, useful for copy: **100% 자율주행** (경기 중 조종 일절 불가), **Any Kit, Any Language**, **당일 공개되는 미지의 변수**, **학생이 직접 제작** (코치는 작업 구역 출입 불가).

---

## Writing for the audience

Readers are 지도교사, 학부모, and students across 전국 초·중·고. Most have never heard of Robofest.

- Korean, 존댓말, plain language. Explain jargon on first use — 자율주행, 임팩트/impound, UTF, Qualifier.
- **Mobile first.** Teachers and parents will read this on phones.
- Every 종목 page must answer, in this order: 누가 나갈 수 있나 → 무엇을 하나 → 무엇을 준비해야 하나 → 어디서 규정을 확인하나.
- Link to LTU's official rules PDFs rather than paraphrasing rules in detail. Rules change; links don't. Summarize for orientation, defer for authority.

---

## Before you start work each session

1. Skim `config/competition.ts` — it is the source of truth, not this file.
2. If asked to add a date or fact, put it in the config and reference it. Do not inline it.
3. If a task would require a database, login, or email sending, stop and say so — it's out of scope by design, and explain the unattended-failure reason.

## Definition of done for handover (target 2026-08-14)

- [ ] All accounts under a shared 럭스로보 address, not a personal one
- [ ] `docs/RUNBOOK.md` — how to change a date, post a 공지, check 신청 현황, who to call
- [ ] Successor has personally edited one file and seen it go live, while being watched
- [ ] 네이버 폼 owned by a shared account, with 신청 data visible to more than one person
