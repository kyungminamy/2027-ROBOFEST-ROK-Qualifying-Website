# ROBOFEST 국내예선대회 — Project Context Brief
**Purpose:** single reference document to paste into Claude Code (as `CLAUDE.md` or `/docs/context.md`) so it never has to re-derive the domain.
**Compiled:** 2026-07-29 · Sources: 프로젝트 계획(안) PDF v2026.7, 마일스톤 xlsx, robofest.net official rules PDFs, ltu.edu press release.

---

## 0. TL;DR — what we are building

A **Korean-language registration + information website** for the **(가칭) 2027 ROBOFEST World Championship 국내예선대회**, hosted by 부산광역시교육청 and operated by (주)럭스로보.

- **Not** the world championship site. This is the 예선 only.
- **Primary job: take applications from teams.** Everything else (rules, schedule, venue) is supporting content.
- Registration window: **2026-09-01 → 2026-10-16** (see conflict §1.2). Site must be live and taking applications by **Sept 1** — that is the hard deadline, ~5 weeks from now.
- Audience: 전국 초·중·고 지도교사 / 학부모 / 학생. Korean first. Not English.
- Scale: ~100 teams, ~400 students, ~600 total attendees. Small. Do not over-engineer.

---

## 1. ⚠️ FACTS TO CORRECT BEFORE WRITING ANY COPY

These are real contradictions found across the source documents. Get them resolved before the site publishes anything.

### 1.1 The World Championship is in **SEOUL**, not Busan
The 2027 Robofest World Championship (28th) will be at **광운대학교 (KwangWoon University), Seoul, May 2027** — the first time in Robofest's history it leaves the US. MOA signed 2026-05-13 at LTU; 럭스로보 CEO 오상훈 was a signatory and is named "director of Robofest Korea."

**Busan is the 예선 venue (부산과학기술대학교 체육관 — confirmed 2026-08-11), not the world championship venue.** Any site copy saying "부산에서 세계대회" is wrong.

### 1.2 ✅ RESOLVED — Competition dates
**Confirmed 2026-07-29 by 교육사업부: 대회는 2026. 11. 27.(금) ~ 11. 28.(토).** 설치 11. 26.(목).
This is the 계획(안) PDF §Ⅲ/§Ⅳ-3 version. The 마일스톤 xlsx (11/28~29) and PDF §Ⅳ-4-다 (2일차를 11/29로 표기) are **both superseded** — correct them at source so nobody re-introduces the conflict.

⚠️ **접수 마감 is a dependent assumption, not yet confirmed.** The two source documents pair their dates:
- PDF: 대회 11/27–28 **+ 접수 마감 10/16(금)** ← currently assumed, since the 대회 date came from here
- xlsx: 대회 11/28–29 **+ 접수 마감 10/30(금)**

Taking 11/27–28 implies **10/16**. But 10/30 would add two more weeks of recruiting against a 100팀 target, and the only hard dependency is that 마감 must fall after the 2027 Game 미션 공개 (late Sept–early Oct) and leave time for 대진 편성 by 11/6. **Both work. Someone should choose deliberately rather than inherit it.** Single point of change: `config/competition.ts` → `registration.closesAt`.

Calendar check: 2026-11-26 = 목, 11-27 = 금, 11-28 = 토, 11-29 = 일.

### 1.3 Budget total doesn't add up
PDF says 총 소요액 **60,800,000원** but the table 합계 is **59,250,000원**. Irrelevant to the website, but flag it to whoever owns the 계획서.

### 1.4 ⚠️ PARTIALLY RESOLVED — Qualifier status confirmed, gatekeeper still open
**Confirmed 2026-07-29 by 교육사업부: this event IS an official qualifier.** The site may state that 국내예선 결과가 세계대회 진출로 연결된다.

**Still unverified, and it still matters:**

Two Korean "International Directors" are listed on robofest.net:
1. 최효림 (Hyorim Choi) — 사단법인 상상 (imagine.or.kr)
2. 오상훈 (Sang Hun Oh) — 럭스로보 (korea.luxrobo.com)

The 2026 RMS Korea advancement site said **"Only coaches approved by Mr. Hyorim Choi … may register teams here."** Official-qualifier status implies 럭스로보 now holds the pipeline, but that inference is not the same as confirmation.

**Two things to get in writing from LTU before Aug 14:**
1. That **럭스로보** is the director of record advancing teams from this event.
2. **Korea's 2027 quota per category+division** (see §3.0 — this determines how many teams we can honestly promise will advance).

Until #2 is answered, the site should describe 출전권 in outcome terms ("상위팀에 세계대회 진출 기회 제공") and avoid committing to a number. This remains the largest reputational exposure on the site — a family that believes 1등 = 세계대회 진출 and finds out otherwise in December is the failure case.

### 1.5 Existing/legacy Korean claims to be aware of
- `world-robofest.com` (한국로봇교육콘텐츠협회, 부천) ran Korean Robofest selection trials up to ~2021. Dormant but the domain exists.
- `luxacademy.co.kr/robofest` (럭스아카데미 — a Seocho math academy, **legally unrelated to 럭스로보**) has a stale cached claim to hold "한국 국가대표 선발권."
- 럭스로보 appears to already own **RMS Coach account 6763 (Seoul)** — teams "Lux lab" (Vcc 3rd), "MAKO is All you need!" (Sr Exhibition 3rd), "WOW" (Sr RoboMed Special Achievement) at WC 2026. Recover the password rather than creating a new coach ID.

---

## 2. What Robofest is (background for copywriting)

- Founded **1999** at **Lawrence Technological University (LTU)**, Southfield, Michigan.
- 27 seasons; **38,700+ students, 39+ countries** (계획서 says 39개국 38,700명 — matches LTU's Jan 2026 figure).
- Core identity, and the thing that differentiates it from FLL/WRO:
  1. **100% autonomous** — no human control, no remote, no joystick, during any run.
  2. **Any Kit, Any Language** — LEGO, Arduino, Raspberry Pi, VEX, anything. (Two exceptions: UMC and BottleSumo *Classic* restrict to LEGO NXT/EV3/SPIKE Prime/Robot Inventor or VEX IQ.)
  3. **Unknown factors** — the mission's variables are revealed on competition day. Teams cannot pre-bake a solution.
  4. **Students do all the work** — coaches may not assemble robots or write code, ever, and cannot enter the pit during work time.
- Grades: **Junior = 5–8**, **Senior = 9–12**, **RoboParade = Expanded Junior 4–8** (US grades). 계획서 maps this to **Junior 초5~중2 / Senior 중3~고2**.
- Effort level: LTU positions it at "about 2/3 of FLL" — useful for 학교 recruiting copy.

---

## 3. The 8 categories — authoritative table

계획서 lists all 8. Note the **Qualifier vs Open** distinction — it is LTU's formal taxonomy, and it does *not* mean what it sounds like for a member country such as Korea. Read §3.0 before writing any 출전권 copy.

| 종목 | 부문 | 최대 인원 | 키트 제한 | LTU 분류 | 계획서 분류 |
|---|---|---|---|---|---|
| **Game** | Jr / Sr | 5 | 자유 | **Qualifier** | Qualifier ✅ |
| **Exhibition** | Jr / Sr | 5 | 자유 | **Qualifier** | Qualifier ✅ |
| **UMC** | Jr / Sr | **4** | LEGO NXT/EV3/SPIKE/VEX IQ only | Open | Qualifier ⚠️ |
| **BottleSumo** | Jr Classic / Jr Unlimited / Sr Classic / Sr Unlimited | **3** | Classic: LEGO/VEX only · Unlimited: 자유 | Open | Qualifier ⚠️ |
| **VCC** | Sr only | 5 (2 권장) | 자유, 카메라 1대 | Open | Qualifier ⚠️ |
| **RoboParade** | Expanded Jr (4–8학년) | 5 | 자유 | Open | Open ✅ |
| **RoboArts** | Jr / Sr | 5 | 자유 | Open | Open ✅ |
| **RoboMed** | Jr / Sr | 5 | 자유 | Open | Open ✅ |

### 3.0 Where the Qualifier/Open classification comes from — and why 계획서 is *not* simply wrong

**Source: General Competition Rules 2026 V1, Section 3 (pp. 22–26)** — https://www.robofest.net/images/2526/General2026_V1.pdf
The section has exactly three slides, and the split is structural, not editorial:

- **p.24 "2026 Qualifier Categories"** — the table contains **only Game and Exhibition**. Header text: *"Teams must first compete at a 2026 In-Person or Video Qualifier competition in order to advance to the Robofest World Championship Final events at LTU on May 16, 2026."*
- **p.25 "2026 Open Categories – Game Style"** — BottleSumo, UMC, Vcc.
- **p.26 "2026 Open Categories – Exhibition Style"** — RoboArts, RoboMed, RoboParade.

Corroborating sources:
- **Get Started page** (the URL you sent) marks **"(Qualifier Category)"** in the description column for Game and Exhibition **only**. The other six carry no marker.
- **UMC category page**: *"There are no qualifying competitions for this challenge."*
- **General Rules p.37 "Advancing to World Championship"** is scoped entirely to *"the Robofest World Championship **Game and Exhibition** Finals."*

**⚠️ The nuance I got wrong the first time.** The "no qualification necessary" clause on pp.25–26 reads in full:

> *"Any team from **US or non-member countries** may register as long as space is available, with no qualification necessary. … **International Member Country Delegates are selected by their Director based on the quota on page 43.**"*

Korea is a **member country**. So p.42 governs us instead:

> *"International **Game, Exhibition and Open Category** teams in Member Countries will compete at Member Country Events … Qualified teams will be advanced to the World Championship **through their Director**."*

And the p.43 quota table has **two rows of categories, not one** — a Game/Exhibition quota *and* a separate Open Category quota, both keyed to how many teams competed at the local event.

**Practical conclusion:** for Korea, the 예선 result feeds selection in **all 8 종목**, not just two — the Director allocates against quota. 계획서 §Ⅲ-2's "Qualifier (세계대회 선발)" grouping is therefore defensible in substance; it just borrows LTU's reserved term for something LTU calls director selection. **Do not use the English word "Qualifier" on the site for UMC/BottleSumo/VCC** — LTU staff will read it as a rules error. Use 국내선발 / 대표 선발 instead, or just describe the outcome.

**Country quota (2026 rules, p.43 — likely similar for 2027):**
- Game / Exhibition: 5–49 local teams in that category+division → **1** advancing; 50+ → **2**. Max **2 per country** overall.
- Open categories: 5–74 local teams in that category+division → **1** entry; 75+ → **2**. Max **2 per category**. If a country doesn't host an open category, one team may still be selected.
- Conditional on the Director fulfilling the LOA, and a **group photo verifying student/team counts per division** is required.

⚠️ At ~100 teams spread across 8 종목 × 2 부문, most category+divisions will land in the 5–49 band → **1 advancing team each**. The site's 출전권 messaging must not over-promise "부문별 상위팀." Get the 2027 quota in writing from LTU, and note the quota is *earned by turnout* — more registrations directly increases how many Korean teams go to Seoul. That is a genuine recruiting message.

### 3.1 Per-category detail (for building the 종목 소개 pages)

**Game** — the flagship. 2026 mission was "Building Bridges." Robot builds a bridge on a **75×182cm folding table**, delivers a tennis ball, stops on a UTF-specified spot displaying the answer to a math equation. Max robot **50×35cm**, no height/weight limit. Jr = 1 controller, no camera; Sr = unlimited controllers, camera allowed. **2 rounds**, each: UTF 공개 → **30분 작업** → 임팩트/impound → **2분 런** (1회 리셋 허용, −3점). 100점 만점. 순위 = (최고점 + 평균) / 2.
**2027 mission 공개: 9월 말~10월 초** (LTU publishes with the season rules; 2026 season's dropped 9/26/25). This is the single biggest schedule dependency in the whole project.

**Exhibition** — robotics science fair. Any autonomous, sensor-using, interactive project. **4분 발표 + 2분 Q&A** (4:30 초과 시 30초당 1점 감점). 부스 **최대 64 ft² (5.95 m²)** including table. Requires 3 pre-submissions: 프로젝트 설명, **프리뷰 영상 (4~5분, Team ID·팀명·팀원 소개 포함)**, **소스코드 PDF 1개 파일** (파일명에 팀번호+팀명). 14-item weighted rubric.

**UMC** — kit arrives **fully disassembled**. Mission revealed that morning. No adult help after unveiling. No internet, no phones, no build instructions, no starting jigs, no multiplexers. Scoring method itself is unveiled at the event. 계획서's "2시간" figure is our own operational choice — LTU doesn't publish a duration.

**BottleSumo** — Session 1: **Time Trial** (push 5 bottles off a 75×182cm table raised 12.75cm, max 120s, 3초 지연 출발 필수) seeds the bracket. Session 2: **single-elimination head-to-head, no bottles**, first to 2 wins. Weight limits: Jr Classic 1.2kg / Sr Classic 1.5kg / Jr UL 2.5kg / Sr UL 3kg. Note **Jr Unlimited is new for 2026** — 계획서's Jr/Sr-only framing needs a 4-division update.

**VCC** — Senior only. 2026 challenge = "Robo-Driver: Traffic Sign Challenge": a **single USB camera** ≥0.4m from a monitor reads 15 Level-1 + 15 Level-2 US traffic-sign images (6s each) and must **print AND speak** the answer. 90점 만점. Any wrong utterance in the window = 0 for that image, even if self-corrected. Wi-Fi and cloud tools (Colab) now allowed. **⚠️ US traffic signs** — worth deciding whether we localize this for a Korean 예선, and whether LTU permits deviation.

**RoboParade** — 한 부문만 (4–8학년). Decorated autonomous float follows a black line, detects the float ahead, stops, restarts. Width ≤35cm, total length ≤60cm, rear bumper ≥10cm tall × ≥28cm wide at 2.54cm height. **Speed must be 7–16 cm/s and displayed on-screen.** 2026 theme was "The Animal Kingdom" — **local hosts may set their own theme**, so 부산 예선 can pick a Korean theme. Test Parade Checklist gate (7 items) is worth 20% of the rubric. Two 12-minute rounds (clockwise + counter-clockwise). Includes a **written math test** (3%).

**RoboArts** — robots that dance, paint, play music, perform. Same 4분+2분 format, same 64 ft² limit, same 3 pre-submissions as Exhibition. 20% of rubric is artistic concept.

**RoboMed** — (bio)medical robotics with an **entrepreneurship** angle: rubric explicitly rewards "budget and business plans on how to commercialize" (8%) and "Opportunity Recognition / Value Creation" language in the project description. Same 3 pre-submissions.

---

## 4. Registration data model

Design our Korean form to be **a superset of what LTU's RMS needs**, so advancing teams' data can be re-keyed without chasing people in December.

### 4.1 LTU RMS hierarchy (mirror this)
```
Coach (numeric Coach ID + password, email double-opt-in)
 └─ Site Registration (per event, per season)
     └─ Team  →  Team ID = "{CoachID}-{n}"   e.g. 6763-1
         ├─ Students (1–5)
         ├─ Volunteers (≤4)
         └─ Sponsors (≤4)
```
- One coach owns many teams. Registration is **per event**.
- Re-entering at a second qualifier = **new team number + new fee**.

### 4.2 Fields to collect

**지도자 (Coach)** — account owner
- 성명 (한글) · **성명 (영문/로마자)** ⚠️
- 이메일 (인증 필수 — 유일한 공식 연락 채널) · 이메일 재입력
- 휴대전화
- 소속 기관 (학교/기관명) · 직위
- 시·도 / 시·군·구
- ☑ 지도자 서약 (Coach Pledge 국문 번역)
- ☑ 개인정보 수집·이용 동의
- ☑ 촬영 및 온라인 송출(초상권) 동의 ← 계획서 §Ⅳ-7 makes this **필수 항목**

**팀 (Team)** — repeatable under one coach
- 팀명 (한글) · **팀명 (영문)** ⚠️
- 참가 종목 + 부문 (Jr/Sr; BottleSumo Classic/Unlimited)
- 소속 기관명
- 사용 로봇 플랫폼 (LEGO EV3 / SPIKE / VEX IQ / Arduino / Raspberry Pi / MODI / 기타)
- 사용 프로그래밍 언어
- 프로젝트 설명 (Exhibition·RoboArts·RoboMed 필수, 자유서술)
- 프리뷰 영상 URL (Exhibition·RoboArts·RoboMed 필수, YouTube/Vimeo 링크)
- 소스코드 PDF 업로드 (Exhibition·RoboArts·RoboMed, 대회 1주 전)
- 팀 사진 / 로봇 사진 업로드 (4:3 or 16:9)
- 부문 상향/하향 신청 (Age Division Waiver) + 사유

**학생 (per member, max 5 — cap by category: Game/Exhibition/RoboArts/RoboMed/RoboParade/VCC=5, UMC=4, BottleSumo=3)**
- 성명 (한글) · **성명 (영문/로마자)** ⚠️ ← 메달·상장에 그대로 인쇄됨
- 생년월일 · 성별
- 학교명 · 학년
- 학생 이메일 (선택)
- **보호자 이메일 (필수)** ← 동의서 자동 발송 트리거
- 보호자 성명 · 보호자 연락처
- ☑ 참가 동의 · 초상권 및 온라인 송출 동의 (보호자 서명)
- 알레르기/특이사항 (선택, 안전관리용)

### 4.3 Rules the form must enforce
- 한 학생은 **여러 종목 참가 가능, 단 동일 종목에는 1개 팀만**. → validate by (학생 식별자, 종목).
- 종목별 정원제, **정원 도달 시 조기 마감** → per-category capacity counter with live remaining-slots display.
- 팀당 인원 상한이 종목별로 다름 (5/4/3) → dynamic form.
- 참가비 **무료** (부산광역시교육청 예산) → no payment integration needed. Big simplification vs. LTU's $100 PayPal flow.
- **로마자 표기 필수**: RMS accepts English alphabet only, and prints names verbatim on medals/certificates. Collect 한글 + 로마자 separately, and add a confirmation step on the romanized spelling.

### 4.4 Korean-context features LTU's RMS does NOT have — but Korean schools expect
Legacy Korean operator `world-robofest.com` offered these. Consider them:
- **대회 참가 공문 신청** (official letter to the school so the student's absence is authorized) — this is close to mandatory for 공립학교 participation
- **수상실적 증명 신청**
- **상장 재발급 신청**
- 출장/공가 처리용 참가확인서

---

## 5. Suggested site map

```
/                     메인 — 히어로, D-day 카운트다운, 접수 CTA, 8종목 카드
/about                대회 소개 — ROBOFEST란, 주최/주관, 2027 세계대회(서울 광운대) 연계
/categories           종목 안내 (8종목 인덱스 + 비교표: 부문/인원/키트/난이도)
/categories/[slug]    종목별 상세 — 규정 요약, 필드 사진/도면, 공식 규정 PDF 링크, FAQ
/schedule             일정 — 접수·설명회·미션 공개·대회 2일차 타임테이블
/apply                참가 신청 (지도자 계정 → 팀 등록 → 학생 등록 → 동의)
/apply/status         신청 조회·수정 (마감 전까지 수정 가능)
/venue                오시는 길 (부산과학기술대학교 체육관), 교통안내, 주차
/faq                  자주 묻는 질문 (계획서 §Ⅷ 10문항 그대로 사용 가능)
/notice               공지사항 (미션 공개, 대진표, 설명회 안내)
/downloads            규정집 국문 요약, 동의서, 참가확인서 양식, 포스터
/live                 유튜브 생중계 임베드 (대회 당일)
/admin                운영자 — 팀 목록, 정원 현황, CSV/XLSX 내보내기, 대진 편성 보조
```

**Admin export is not optional.** 심판·진행팀 will work from spreadsheets on the day. Build XLSX export of: 종목별 팀 목록, 명찰 인쇄용 명단, 검수 체크리스트, 대진표 시드, 상장 인쇄용 (한글명 + 로마자명).

---

## 6. Build guidance for Claude Code

**Scale reality:** ~100 teams, ~400 students, one 6-week registration window, one weekend event. This is a **small** application. The failure mode here is over-architecting, not under-building.

Suggested stack (adjust to what 럭스로보 already runs):
- **Next.js (App Router) + TypeScript + Tailwind** — SSG for content pages, server actions for the form.
- **Supabase or Postgres + Prisma** — relational is right; the coach→team→student hierarchy has real constraints.
- File uploads (소스코드 PDF, 사진) → Supabase Storage or S3.
- Email → 이메일 인증 + 동의서 링크 발송. Korean deliverability matters (Naver/Daum/Hanmail). Use a provider with decent KR reputation; test against naver.com early.
- Hosting: Vercel is fine. If 교육청 requires domestic hosting or a `.kr` domain, that constraint changes everything — **ask early**.

**Non-negotiables:**
1. **모바일 우선.** Korean parents and teachers will register on phones.
2. **개인정보보호법 compliance** — minors' data, 보호자 동의 필수, 수집 항목·보유 기간 명시, 파기 시점 정의. Get a 개인정보처리방침 page written and reviewed.
3. **A single `config/competition.ts`** holding dates, capacities, category definitions, venue. Every date on the site reads from it. The dates *will* change.
4. **Capacity + waitlist logic** from day one — 조기 마감 is explicitly planned.
5. **Edit-after-submit** until the deadline. Team rosters always change.
6. 교육청 브랜딩: 부산광역시교육청 CI usage rules apply. Get the official logo files and the CI guidelines.

**Sequencing suggestion:**
- Week 1: config + content pages + 종목 안내 (can ship before the form is done — recruiting starts in 8월)
- Week 2–3: registration flow + admin
- Week 4: 동의서 email flow, exports, load-test the naver email path
- **Sept 1 hard launch.** Mission 공개 (Sept 말~Oct 초) then drives a content update, not a code change.

---

## 7. Key dates (from 계획서 + 마일스톤 — reconcile §1.2 first)

| 시기 | 내용 |
|---|---|
| 2026. 8. 10 | 개최 계획 확정 (교육청 결재) |
| 2026. 8. 14 | LTU 본부 국내예선 **공인 확정** ← blocks 출전권 messaging |
| 2026. 8. 24~ | 모집 공고·홍보 개시, 전국 시도교육청 공문 |
| **2026. 9. 1** | **온라인 접수 페이지 오픈** ← 웹사이트 하드 데드라인 |
| 2026. 9. 18 | 심판단 16명 구성 |
| **2026. 9월 말~10월 초** | **2027 Game 미션 본부 공개** (xlsx: 10/2 예상) |
| 2026. 10. 8 | 참가팀 온라인 룰 설명회 |
| **2026. 10. 16** | **접수 마감** ⚠️ assumed from date pairing — see §1.2 |
| 2026. 11. 6 | 참가팀 확정·대진 편성, 대진표 공지 |
| 2026. 11. 13 / 11. 20 | 심판 교육 1·2차, 전체 리허설 |
| 2026. 11. 26 | 시설 설치 (D-1) |
| **2026. 11. 27(금) ~ 11. 28(토)** | **대회 개최** ✅ confirmed |
| 2026. 12. 4 | 우승팀 출전권 부여, 1차 컨설팅 |
| 2026. 12. 14 | 결과·정산 보고 (종료 후 15일 이내) |
| **2027. 5** | **2027 ROBOFEST World Championship — 서울 광운대학교** |

---

## 8. Official source links

**Rules (2026 season — 2027 versions publish ~Sept 2026):**
- General Rules: https://www.robofest.net/images/2526/General2026_V1.pdf
- Game V7 "Building Bridges": https://www.robofest.net/images/2526/Game2026_V7.pdf
- Exhibition: https://www.robofest.net/images/2526/Exhibition2026_V1.pdf · [Rubric](https://www.robofest.net/images/2526/Exhibition2026Rubric.pdf)
- UMC: https://www.robofest.net/images/2526/UMC2026_V1.pdf
- BottleSumo V3: https://www.robofest.net/images/2526/BottleSumo2026_V3.pdf
- VCC V3.5: https://www.robofest.net/images/2526/VCC_2026_V3.5.pdf
- RoboParade: https://www.robofest.net/images/2526/RoboParade2026_V1.pdf · [Rubric](https://www.robofest.net/images/2526/RoboParade2026Rubric.pdf) · [Checklist](https://www.robofest.net/images/2526/RoboParade2026Checklist.pdf)
- RoboArts: https://www.robofest.net/images/2526/RoboArts2026_V1.pdf · [Rubric](https://www.robofest.net/images/2526/RoboArts2026Rubric.pdf)
- RoboMed: https://www.robofest.net/images/2526/RoboMed2026_V2.pdf · [Rubric](https://www.robofest.net/images/2526/RoboMed2026Rubric.pdf)
- Consent form: https://www.robofest.net/RobofestConsentReleaseForm.pdf
- Privacy policy: https://robofest.net/LTU-Robofest-Privacy-Policy.pdf

**Reference:**
- Get Started: https://www.robofest.net/index.php/current-competitions/overview
- FAQs: https://www.robofest.net/index.php/about/faqs
- For Site Hosts: https://www.robofest.net/index.php/for-site-hosts
- International Directors: https://www.robofest.net/index.php/about/international-directors
- 2027 WC 발표 (LTU): https://ltu.edu/world-robofest-2027-to-be-hosted-at-kwangwoon-university-in-seoul-south-korea/
- 국내 보도 (로봇신문): https://www.irobotnews.com/news/articleView.html?idxno=46589
- RMS 사이트 목록: https://www.robofest.net/rms/SharedPagesServlet?cmd=getSitesTable

---

## 9. Open questions — status as of 2026-07-29

### ✅ Resolved
1. ~~Which date set is authoritative?~~ → **11/27(금)~11/28(토)**, 설치 11/26.
2. ~~Is this an official Qualifier?~~ → **Yes**, confirmed by 교육사업부.
3. ~~교육청 hosting/domain/웹접근성 constraints?~~ → **None imposed** (not yet formally asked — if they raise 웹 접근성 인증 later it materially changes the build).

### 🔴 Must close before Aug 14 (departure date)
4. **접수 마감 10/16 or 10/30?** Currently assumed 10/16 by pairing. One-line change in `config/competition.ts`. See §1.2.
5. **Korea's 2027 advancement quota per category+division**, in writing from LTU. Determines what the site can honestly promise. See §3.0.
6. **Is 럭스로보 the director of record**, or 상상(최효림)? See §1.4.
7. **Who owns the accounts?** Domain, GitHub, Vercel, 네이버/구글 must all be registered to a shared 럭스로보 address that survives the handover — **not** `lux_1@luxrobo.com`. Do this before creating anything.
8. **Who is the successor?** Unassigned as of 07-29. Every architecture decision in this project assumes the least-technical plausible answer.

### 🟡 Shaping — decide before the 종목 pages are written
9. Is VCC run with **US traffic signs** as LTU specifies, or localized to Korean signs? Affects whether Korean teams can realistically enter, and what the 종목 page can promise.
10. Who chooses the RoboParade theme — LTU's, or a Busan-specific one? (Local hosts are explicitly permitted to set their own.)
11. Do we need 참가 공문 / 참가확인서 generation? Likely yes for 공립학교 participation — but at 100팀 this can be a manual template, not a feature.

### 🟢 Later / post-handover
12. Does 럭스로보 still have access to RMS coach account 6763? (Recover, don't recreate — see §1.5.)
13. Will the site host the 유튜브 생중계 embed, or will 교육청 handle it on their own channel?
14. Should the form's data shape allow bulk export into LTU's RMS, or will advancing teams re-register manually in December? (Manual is fine for ~2 teams.)
15. Bilingual (KO/EN)? Not needed for the 예선, but the 2027 WC in Seoul will need it — is this site the seed for that?
