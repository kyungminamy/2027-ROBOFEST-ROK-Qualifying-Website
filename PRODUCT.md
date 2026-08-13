# Product

<!-- impeccable:product-schema 1 -->

> 이 파일은 **디자인 작업용 제품 정보**만 담습니다. 프로젝트의 규칙과 지시는
> `CLAUDE.md` 하나뿐이며, 두 파일이 어긋나면 **CLAUDE.md가 우선합니다.**
> (This file is design-only product context. `CLAUDE.md` remains the single
> authority on how this project is built and maintained.)

## Platform

web

## Users

**Primary: 지도교사** (teachers coaching a team at 전국 초·중·고). They are deciding
whether to enter a team, then completing 접수 on behalf of students. Most have
never heard of Robofest and are evaluating an unfamiliar competition against the
effort it will cost them.

**Secondary: 학부모**, checking legitimacy, cost, dates, and travel before
consenting. **Students** (초5~고2) read it too, but never submit 접수 themselves.

Reading situation is decisive: **overwhelmingly phones**, often a school network
that may block Google or JavaScript, sometimes printed as a 공문. Readers arrive
cold — nothing may assume prior Robofest knowledge.

## Product Purpose

A Korean-language information site for the **2027 ROBOFEST World Championship
국내예선대회**, plus an `/apply` page that embeds a 구글폼 for 접수.

The site has exactly two jobs: explain the competition well enough that the right
teams self-select, and put the form in front of them. Success is a correctly
filled 신청 from a team that understood what they signed up for.

It is **not** a platform. No accounts, no database, no participant data of our
own — 접수 data lives only in Google's response sheet.

## Positioning

An **official qualifier** (공식 예선, confirmed), 주최·주관 by **부산광역시교육청**,
운영·공인 by **(주)럭스로보** and **ROBOFEST 본부 (Lawrence Technological
University)**. Free to enter, funded by 교육청 budget.

What makes Robofest itself distinct, and what the copy exists to convey:

- **100% 자율주행** — no human control during a match, at all
- **Any Kit, Any Language** — no mandated hardware or programming language
- **당일 공개되는 미지의 변수** — key parameters revealed only on competition day
- **학생이 직접 제작** — coaches are barred from the work area

## Operating Context

**The governing constraint: the person who built this site leaves on
2026-08-14.** 접수 opens 2026-09-01, 18 days later. The 대회 is 2026-11-27~28.

*Updated 2026-08-05: this used to end "No successor has been assigned."
Handover is done — 2–3 colleagues can operate the site and one is the
main contact (`docs/RUNBOOK.md` §12). The constraint softens but does not
lift: none of them built it, none owns it full time, and the main contact
is not a developer. `CLAUDE.md` holds the authoritative wording.*

Everything downstream follows from that:

- The site must run **months unattended**. Nothing may expire, pause, throttle, or
  need a human to notice it.
- It must be editable **by a non-technical person in a web browser** —
  github.com → edit one file → live in ~60 seconds. No terminal, no local setup.
- It must **fail safe**: a bad edit breaks the *build*, so Vercel refuses to deploy
  and the last good site stays up. Nothing broken ever reaches a visitor.

Known dated obligations a human still owns: turning off 구글폼 **응답 받기** on
마감일 (10/16), and re-measuring the iframe height whenever a form question changes.

## Capabilities and Constraints

**Confirmed facts** (as of 2026-07-29/30):

| | |
|---|---|
| 대회 일자 | 2026. 11. 27.(금) ~ 11. 28.(토) · 설치 11. 26.(목) |
| 장소 | **부산과학기술대학교 체육관** — ✅ confirmed 2026-08-11 · 부산광역시 북구 시랑로132번길 88 |
| 접수 기간 | 2026. 9. 1.(화) ~ 10. 16.(금) |
| 참가비 | 무료 |
| 참가 대상 | 전국 초·중·고 — Junior(초5~중2) / Senior(중3~고2) |
| 규모 | 100팀 내외 (학생 400여 명, 총 600여 명) |
| 종목 | 8종목 |
| 2027 세계대회 | 2027. 5. **서울 광운대학교** — not Busan |

**Technical constraints:**

- Fully static Next.js (App Router) + TypeScript + Tailwind on Vercel; `main`
  auto-deploys. No database, no writing API routes, no cron, no secret env vars.
- **All content lives in `config/competition.ts`.** Nothing copy-like may be
  hardcoded in a component — that is the single property making the site
  maintainable by a stranger.
- 접수 is gated **only** by Google's 응답 받기 toggle. `opensAt`/`closesAt` are
  display text; editing them closes nothing.
- The 구글폼 iframe is cross-origin: we cannot style inside it and cannot
  auto-fit its height. Height is a hardcoded per-breakpoint number in config.
- `applyMode: 'embed' | 'link'` is the safety valve — one word flips the iframe to
  a plain button if the frame is ever blocked. It must keep working.

**Terminology, binding:**

- Never call UMC / BottleSumo / VCC a **"Qualifier"** in English — LTU reserves
  that term for Game and Exhibition. Use 국내선발 / 대표 선발.
- 출전권 is **opportunity, never entitlement**: "상위팀에 세계대회 진출 기회 제공".
- 세계대회 = 서울. 예선 = 부산. Never conflate.

**Explicitly undecided — must not be presented as settled:**

- Korea's 2027 quota per 종목 is unknown. **Never state how many teams advance.**
- The 대회명 is not yet formally confirmed on paper.

## Brand Commitments

- **Name:** "2027 ROBOFEST World Championship 국내예선대회". The "(가칭)" prefix was
  removed 2026-07-30 — it read as unfinished to parents. Do not reinstate it.
- **Logo:** `public/robofest-logo.png`, already used as the home link.
- **Voice:** Korean, 존댓말, plain language. Jargon explained on first use
  (자율주행, 임팩트/impound, UTF). Warm and factual; never markety, never hype.
- **Typography:** Pretendard, self-hosted at `src/fonts/` (no CDN — a CDN outage
  would break the site unattended). Regular 400 + Bold 700 only, ~520KB total.
- **`word-break: keep-all`** is required, not stylistic: without it Korean breaks
  mid-word and '부산광역시교육청' splits across lines.
- **No official palette is mandated** (confirmed with the user 2026-07-31). 교육청
  color codes were expected but never supplied; palette choice is free, subject to
  the accessibility floor below.
- **Standing preference: the category convention, executed at full craft**
  (chosen 2026-07-31). Offered a rolled visual direction twice — 기록지 and
  대회장 사인 시스템 — the user took the standing exit both times. This is a
  durable commitment, not a one-off: build what an official robotics competition
  site is expected to look like, straight, with no irony and no smuggled quirk.
- **Craft bar: FIRST Robotics · World Robot Olympiad · VEX** (chosen 2026-07-31).
  The literal peer set. A 지도교사 comparing this site to those should find it
  familiar in structure and at least their equal in execution.

## Evidence on Hand

Real, in-repo, usable:

- 8 종목 with full detail — 참가 부문, 인원, 키트 제한, 난이도, 경기 방식, 준비물 —
  in `config/competition.ts` (`categories`, `categoryDetails`).
- Official LTU rules URLs per 종목 plus a 공통 규정집 PDF link.
- The ROBOFEST logo. 문의처: 카카오톡 채널, 이메일, 전화, 운영 시간.
- Milestones from 접수 through 대회 당일.

**Absences that must not be fabricated:** no photographs of past Korean events, no
venue imagery, no participant testimonials, no team counts, no advancement
quotas, no 스폰서 logos beyond the confirmed 주최/운영 기관. If a design needs a
picture of the competition, there isn't one — do not invent or source a stand-in
that implies it is this event.

## Product Principles

1. **Explain before asking.** A cold reader must learn what Robofest is before
   being invited to apply. 소개 always precedes 신청 권유.
2. **One source of truth, always.** Every fact has exactly one home in config, and
   every gate has exactly one control. Two things that could disagree is a defect.
3. **Degrade to something that still works.** No-JS, blocked-iframe, and
   old-phone paths are primary paths, not fallbacks — they are what a school
   network actually serves.
4. **Never render a dead end.** Empty config produces 준비 중 or omits the element;
   it never produces a broken button, dead link, or missing image.
5. **A stranger in November must be able to operate it.** Between two options,
   the simpler one to maintain wins — every time.

## Accessibility & Inclusion

- **Mobile first**, non-negotiable. Phone rendering is the design target; desktop
  is the adaptation.
- **Must work with JavaScript disabled or blocked.** The nav uses `<details>` so it
  opens without JS; `/apply` renders server-side for the same reason.
- **Contrast floor 4.5:1.** White text only on the 700+ steps of any scale.
- Keyboard skip-link to `#main`; visible `:focus-visible` outline; touch targets
  ≥44px; print styles, because schools print this as a 공문.
- **Legal, not optional:** a 개인정보 국외이전 안내 must appear *above* the form,
  before the applicant types anything — the iframe hides from them that they are
  submitting to Google. 만 14세 미만 참가자는 법정대리인 동의가 필수입니다.
