# CLAUDE.md — 2027 ROBOFEST 국내예선대회 웹사이트

Read this before doing anything. Full domain reference lives in `docs/ROBOFEST-KR-CONTEXT.md`.

**This file is the single set of instructions for this project.** Do not add a second one — no `AGENTS.md`, no `.cursorrules`, no `CONTRIBUTING.md` full of build rules. `create-next-app` generates an `AGENTS.md`; it was deleted deliberately. If two instruction files disagree, a successor with no one to ask has no way to tell which is authoritative — so there is only ever one. Corrections and new conventions get edited **into this file**.

**The one exception, added 2026-07-31: `PRODUCT.md` and `DESIGN.md`.** They are context for the Impeccable design tooling (`npx impeccable`, installed into `.claude/`) — `PRODUCT.md` records who the users are and what must not be fabricated; `DESIGN.md` records what the current look actually is (colors, type, spacing) so a later redesign knows what it is replacing. They hold **no build rules and no instructions**, and they are not a second authority: **where they and this file disagree, this file wins.** They exist because the design tooling reads them; if that tooling is ever removed, delete both with it. Facts in them are copies — the live source of truth is still `config/competition.ts`, and the live colors are still `src/app/globals.css`.

---

## The one constraint that governs every decision

**The person who builds this site leaves the company on 2026-08-14. 접수 opens 2026-09-01 — 18 days later. The 대회 is 2026-11-27~28. No successor has been assigned.**

So the site must:
1. **Run unattended for months.** No component may expire, pause, throttle, or require a human to notice something. The Supabase Pro plan is bought specifically to satisfy this — see the Supabase section.
2. **Be editable by a non-technical person through a web browser.** No terminal. No local setup.
3. **Fail safe.** A bad edit must break the *build* (so Vercel refuses to deploy and the old site stays up), never deploy broken.

When choosing between two approaches, pick the one a stranger can operate in November. Simplicity beats features. Every time.

---

## Scope

**Build:** a Korean-language information site for the competition, plus a `/apply` page that **embeds a Google Form**.

**Do NOT build:** a database, participant accounts or login, file uploads, transactional email, cron jobs, or an admin dashboard. All rejected — each is an unattended failure mode, and none is needed once 구글폼 holds the 접수 data.

접수 runs entirely inside the embedded 구글폼. **We never store participant 개인정보 in our own infrastructure.** The site's only job is to explain the competition well and put the form in front of the right people.

**Decision log — read this before "fixing" anything that looks inconsistent.**
- Original plan: hand off to **네이버 폼** (구글폼 rejected over 개인정보 국외이전).
- 2026-07-30, morning: switched to a **native form on Supabase**.
- **2026-07-30, current: switched to an embedded 구글폼.** Decided with the 지도교수/advisor. This supersedes both plans above.

**Consequently these files are stale and must not be followed:** `docs/BUILD-GUIDE.md` and `docs/BUILD-GUIDE.ko.md` Days 6–10 (Supabase, RLS, native form), and `docs/schema.sql` (the rejected data model). They are kept only as a record of what was considered. **This file wins.**

---

## Stack

- **Next.js (App Router) + TypeScript + Tailwind**, fully static
- **Vercel** for hosting, connected to GitHub — pushes to `main` auto-deploy
- **구글폼** for 접수, embedded in an `<iframe>` on `/apply`
- **No database. No API routes that write. No cron. No env vars holding secrets.**

Rationale for TypeScript over plain JSON for content: a malformed edit fails the build, so Vercel keeps serving the last good version instead of publishing something broken. That is a safety feature for an unattended site, not developer preference.

---

## The embedded 구글폼 — what to know before touching `/apply`

**The form is not ours and we cannot style it.** An embedded form is a cross-origin iframe: we control the box, Google controls everything inside it. Pretendard, 브랜드 색, `word-break: keep-all` — none of it crosses the boundary. Do not spend time trying. The design job is to make the page *around* the form good.

**⚠️ Since 2026-07-31 the 구글폼 contains a file-upload question, and that changes what the embed actually shows.** Google will not render questions inside a third-party iframe when the form has an upload question — uploading needs a Google login, which cannot happen inside someone else's page. So the frame shows **only the form title, the form's 설명글, and Google's own `설문지 작성` button**. No questions. This is Google policy, not our bug, and it cannot be fixed from our side. Everything below about height still applies, but read the trigger carefully.

**2026-08-04 decision: `applyMode` stays `'embed'`.** The 설명글 carries 참가 규정, 팀 구성, 준비 사항 and the 개인정보 안내, and an applicant should be able to read that without clicking. `'link'` remains correct if the frame ever goes fully blank (school network blocking Google) — and note it would also remove the height chore entirely.

**The iframe cannot auto-fit its height.** Browsers forbid measuring inside a cross-origin frame and Google exposes no resize signal, so the height lives in `config/competition.ts` as `embedHeight` — an object with five breakpoints (`narrowPhone` / `phone` / `largePhone` / `desktop` / `wideDesktop`), not a single number. Consequences a successor must know:
- Too short → the form scrolls inside a box while the page also scrolls. Two scrollbars on a phone.
- **Re-measure when the form's 설명글 or title changes — not when a question changes.** Questions are not rendered (see above), so adding or removing one does not move the height. This is the one recurring manual task in the project — `docs/RUNBOOK.md` §4 explains it.

**Never rebuild the form's inputs in our own components.** It is technically possible to POST our own themed fields to Google's `formResponse` endpoint. It was considered and rejected, for reasons that still apply:
- The endpoint is undocumented; Google can break it silently.
- Cross-origin rules mean **we could not tell whether a submission saved**, so the site would show 접수 완료 without knowing. A silently lost 신청 means a team cannot compete.
- The `entry.XXXX` field IDs would be hardcoded, so editing the 구글폼 would require a developer — destroying the one property that made 구글폼 the right choice.

**Google's "응답 받기" toggle is the only 접수 gate. The site has none.**

`/apply` shows the form at all times, regardless of `opensAt` / `closesAt`. Those dates are display text only.

This was deliberate (2026-07-30). An earlier version hid the form outside the 접수 period, which protected nothing — the 구글폼 URL is public, so anyone with the link could submit anyway. All it did was create two gates that could disagree, and CLAUDE.md's own rule is that a successor must never have to reconcile two sources of truth. One gate, in one place:

- **To close 접수:** 구글폼 → 응답 탭 → turn off **응답 받기**. Google then renders "더 이상 응답을 받지 않습니다" inside the frame on our page automatically.
- **Editing `closesAt` does not close 접수.** It only changes the sentence on the page.
- **Someone must own doing this on 마감일.** It is the one dated manual action in the whole project.

A side benefit: with no date logic, `ApplyForm` needs no JavaScript, so the form renders server-side and works on locked-down school browsers.

---

## 개인정보 — the tradeoff we accepted, and the duty that comes with it

구글폼 was **originally rejected** because Google processes data outside Korea, so a 교육청 event collecting minors' PII triggers **개인정보 국외이전 고지·동의 의무**. On 2026-07-30 we chose 구글폼 anyway, with the advisor's agreement. That is a legitimate decision, but it is a decision to *disclose*, not a problem that went away. Embedding changes nothing: the iframe is Google's page collecting the data directly — and it *hides* from the applicant that they are submitting to Google, which makes explicit disclosure more important, not less.

So the following are requirements, not polish:

- **A 국외이전 안내 must appear above the form on `/apply`**, before the applicant starts typing. Wording lives in `config/competition.ts` so a 담당자 can revise it without touching code.
- **The 구글폼's own first question must be an explicit 국외이전 동의** (필수). Our page's notice is context; the consent record has to live with the data, in Google's response sheet.
- **만 14세 미만 참가자는 법정대리인 동의가 필수입니다.** Junior starts at 초5 (~11세), so this covers most Junior participants. Add a 필수 question having 지도교사 confirm they obtained it. A 담당자 must decide whether that indirect confirmation suffices — it is weaker than verifying directly, and that is their call to make, not ours.
- **Do not collect more than you need.** Every extra field is 개인정보 we are responsible for. 주민등록번호는 절대 수집하지 마세요. 생년월일보다 학년이 충분합니다.
- **Restrict who can see the responses.** The response 스프레드시트 must not be link-shared publicly, and must be visible to more than one person.
- Name a **개인정보 보호책임자** who is still at the company after 2026-08-14.

---

## The content principle — this is the most important rule

**Every date, name, number, and piece of copy that could change must live in `config/competition.ts` or `content/*.md`. Nothing hardcoded in components. Ever.**

The successor's entire job is: open github.com → edit one file → wait 60 seconds → the site is updated. If they have to find a string inside a React component, this project has failed.

Checklist when adding anything:
- Is this a date? → `config/competition.ts`
- Is this a 종목 rule or description? → `config/competition.ts` categories array
- Is this prose (안내문, FAQ answer, 공지)? → `content/*.md`
- Is this a phone number, email, 장소? → `config/competition.ts`
- Is this the 구글폼 주소, its embed height, or the 국외이전 안내 문구? → `config/competition.ts` `registration`

**The form must degrade to a plain link.** Keep the `registration.applyMode` switch (`'embed'` / `'link'`). If the iframe misbehaves — blocked on a school network, unusable on some phone, Google changes something — a non-technical person changes one word and applicants get a big button to the form instead. Test it once before 09-01. This is the most important safety valve in the project, because it needs no developer.

**Never let a broken link be the failure mode.** If `formUrl` is empty the page must say 준비 중, never render a dead button. And the `/apply` page always shows a direct "새 창에서 열기" link *above* the iframe, so an applicant whose network blocks the frame can still reach the form.

It sat *underneath* the iframe until 2026-07-31. That put it in the worst possible place: someone whose school network blocks Google sees an empty box roughly a screen and a half tall, and had to scroll past all of it to find the one control that still worked. The person who most needs the escape hatch found it last. Above the frame, they see it before they ever hit the blank space. **Keep it above the iframe** — do not "fix" this back.

Add a Korean comment above every field explaining what it is and what changes if you edit it.

---

## Confirmed facts (as of 2026-07-29)

| | |
|---|---|
| 대회명 | 2027 ROBOFEST World Championship 국내예선대회 — **the site drops the "(가칭)" prefix** (removed 2026-07-30; it read as unfinished to parents). The name is still not formally confirmed on paper, so if it changes, edit `competition.name`. |
| 대회 일자 | **2026. 11. 27.(금) ~ 11. 28.(토)** ✅ confirmed · 설치 11. 26.(목) |
| 장소 | 부산보건대학교 체육관 — still 예정, not contracted. **The site shows the name without a "(예정)" suffix** (removed 2026-08-04 at the 담당자's request); the caveat is carried by the 안내 박스 on `/venue` instead. See the 예정 note below. |
| 주최·주관 | 부산광역시교육청 |
| 운영·공인 | (주)럭스로보 · ROBOFEST 본부 (Lawrence Technological University) |
| 공식 예선 여부 | ✅ 공식 예선 (official qualifier) — confirmed |
| 참가 대상 | 전국 초·중·고 — Junior(초5~중2) / Senior(중3~고2) |
| 참가 규모 | 100팀 내외 (학생 400여 명, 총 600여 명) |
| 접수 기간 | 2026. 9. 1.(화) ~ **10. 16.(금)** ✅ confirmed 2026-07-30 |
| 참가비 | **무료** (부산광역시교육청 예산) |
| 2027 세계대회 | **2027. 5. 서울 광운대학교** — Seoul, NOT Busan |

**⚠️ Unconfirmed, do not present as settled:**
- Korea's 2027 quota per 종목 is unknown. **Never state a number of teams that will advance.**
- 부산보건대학교 is 예정, not contracted. Say so until it is confirmed — but **one place says it, not two.**

  **2026-08-04 decision, requested by the 담당자:** `venueDisplayName()` no longer appends "(예정)" to the venue name. The name renders plain in all four spots (홈 2곳, `/venue` 헤더·장소명). The "아직 예정" disclosure did *not* go away — it moved entirely to the **`장소는 아직 확정 전입니다` 안내 박스** at the top of `/venue`, which still renders while `venue.isConfirmed` is `false` and explicitly warns against booking travel on it.

  Two consequences a successor must not get wrong:
  - **Do not "fix" the missing "(예정)" back onto the name.** It was removed on purpose. The revert snippet is in the comment above `venueDisplayName()` if the 담당자 ever asks for it back.
  - **`venue.isConfirmed` now controls the 안내 박스 only.** Flipping it to `true` is still the correct action when the contract is signed, but what it removes is the box — the name does not change. `docs/RUNBOOK.md` §2-2 is written to match.

**Resolved since first writing:** 접수 마감 is **10/16, confirmed 2026-07-30** — the 10/30 alternative was dropped. It may now be stated as a fixed date.

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

1. Skim `config/competition.ts` — it is the source of truth for competition facts, not this file.
2. If asked to add a date or fact, put it in the config and reference it. Do not inline it.
3. If a task would require a database, login, file uploads, email sending, cron, or an admin UI, stop and say so — out of scope by design; explain the unattended-failure reason.
4. Anything touching `/apply`: confirm the 국외이전 안내 still renders above the form, the direct link still renders above the iframe (moved there 2026-07-31 — see the 구글폼 section), and the `applyMode` fallback still works.

## Definition of done for handover (target 2026-08-14)

- [ ] All accounts (GitHub, Vercel, **구글 계정 owning the 폼**, 도메인) under a shared 럭스로보 address, not `lux_1@luxrobo.com`
- [x] `docs/RUNBOOK.md` — how to change a date, check 신청 현황, re-measure `embedHeight` after editing the 폼's 설명글, flip `applyMode` to `'link'`, close 접수 (구글폼 응답 받기 — the config date does *not* close it), who to call. Plus `docs/RUNBOOK-CLAUDE-CODE.md` for the same job via Claude Code. **Written 2026-08-03/04.** Its remaining `확인 필요` rows are listed in the RUNBOOK itself and are the departing owner's to fill.
  - *(A 공지 feature was considered and dropped — announcements go in `config/competition.ts` directly. It used to be listed here; removed 2026-08-04 so this checklist stops asking for something that does not exist.)*
- [ ] Successor has personally edited one file and seen it go live, while being watched
- [ ] **구글폼 owned by a shared 럭스로보 구글 계정** — not a personal one. If it stays on a personal account, 접수 dies when that account does.
- [ ] **응답 스프레드시트 visible to at least two people**, and not publicly link-shared
- [ ] **`applyMode: 'link'` tested once**, then switched back to `'embed'`
- [ ] **국외이전 동의 and 법정대리인 동의 questions present in the 구글폼**, reviewed by a 담당자
- [ ] Someone owns turning off **응답 받기** on 접수 마감일
