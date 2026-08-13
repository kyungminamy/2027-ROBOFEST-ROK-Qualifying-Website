# Design

<!-- impeccable:design-schema 1 -->

> 이 파일은 **지금 만들어져 있는 화면을 그대로 적어 둔 기록**입니다.
> 규칙과 지시는 `CLAUDE.md` 하나뿐이며, 어긋나면 **CLAUDE.md가 우선합니다.**
> 색·글자 크기의 실제 값은 `src/app/globals.css` 에 있습니다. 값을 바꿀
> 때는 그 파일을 고치고, 이 문서도 같이 고쳐 주세요.

## Direction

**The category standard, executed at full craft.** 2026-07-31, 두 번의 디자인
방향 제안(기록지 / 대회장 사인 시스템)을 모두 물리고 **관례적인 대회 사이트**를
선택했습니다. 그러므로 이 사이트는 "남다르게" 보이려 하지 않습니다. 처음 보는
학부모가 **공식 로봇 대회 사이트로 즉시 알아보는 것**이 목표입니다.

기준으로 삼은 사이트: **FIRST Robotics · World Robot Olympiad · VEX**.

### 방향 계약 (direction contract)

> ℹ️ 2026-08-05까지 이 내용은 `src/app/layout.tsx` 안에 있었고, 모든 페이지의
> HTML 소스에 숨은 주석으로 딸려 나갔습니다(페이지마다 약 1KB). 방문자에게
> 보이지도 않고, 내부 작업 과정을 담은 영문 메모라 교육청 관계자가 소스를
> 열어 보면 어색합니다. 그래서 **기록은 이 문서로 옮기고 페이지에서는
> 뺐습니다.** 디자인 기록의 제자리는 여기입니다.

```
THESIS: Owns instant recognition as an official robotics qualifier. Refuses an
invented visual world: offered a rolled direction twice, the user took the
category standard both times, so convention is the commitment, played straight.

OWN-WORLD: Competition navy (brand-900 ground, brand-700 structure) with a
single signal orange (accent-600) reserved for the primary action and the open
state. White cards, 1px navy-tinted rules, drawn SVG icons, Pretendard 400/700,
tabular numerals. Photography is used — LTU world-championship images, labelled
as such wherever a reader could mistake them for 부산 (see 사진에 대하여).

STORY: A teacher who has never heard of Robofest learns what it is, believes it
is official and free, and reaches the 구글폼 on /apply.

FIRST VIEWPORT: 대회명 large over a photographed hall under a navy scrim, then
대회기간, then the orange 참가 신청 button. 주최·주관 sits in the footer as a
credential strip, never as an eyebrow.

FORM: category canon (standing exit), outside the grounded list; seed c2a062bf.
```

## Color

대회 네이비 + 신호 주황. 국제 로봇대회가 공통으로 쓰는 조합입니다.

| 역할 | 토큰 | 값 |
|---|---|---|
| 히어로·푸터 바탕 | `brand-900` | `#0e2547` |
| 기본 브랜드색 (제목·링크) | `brand-700` | `#17407c` |
| 중간 강조 | `brand-500` | `#2e69b8` |
| 테두리 | `brand-100` / `brand-200` | `#d9e6f6` / `#b4cdec` |
| 옅은 안내 박스 | `brand-50` | `#eef4fb` |
| **주요 행동 (버튼)** | `accent-600` | `#c2410c` |
| 본문 글자 | `ink` | `#1f2733` |
| 흐린 글자 | `ink-soft` | `#5a6675` |
| 번갈아 나오는 섹션 배경 | `paper-soft` | `#f2f6fb` |

**색 전략은 Restrained입니다.** 네이비가 구조를 잡고, 주황은 **오직 하나의
뜻**으로만 씁니다 — "지금 누르세요". 참가 신청 버튼, 접수 중 표시, 현재 메뉴
표시. 그 밖에 주황을 쓰면 정작 중요한 버튼이 묻힙니다.

**대비 기준:** 흰 글자는 `brand-500` 이상 또는 `accent-600` 에만 올립니다
(`accent-500` 은 흰 글자 3.6:1 로 큰 글자·그래픽 전용). `ink-soft` 는 흰
배경에서 5.8:1 입니다.

## Typography

**Pretendard 400 / 700 두 가지뿐**이며 `src/fonts/` 에 직접 포함되어 있습니다
(CDN 미사용 — 아무도 지켜보지 않는 사이 CDN이 끊기면 글꼴이 깨집니다).

- 히어로 제목: `text-[1.75rem]` → `sm:text-4xl` → `lg:text-5xl`
- 페이지 제목: `text-2xl` → `sm:text-3xl` → `lg:text-4xl`
- 구역 제목: `text-2xl` → `sm:text-3xl`
- 본문: `text-base` → `sm:text-lg`, `line-height: 1.75`
- 제목 자간 `-0.02em`, `line-height: 1.3`, `text-wrap: balance`

**`word-break: keep-all` 는 필수입니다.** 없으면 '부산광역시교육청' 같은 낱말이
가운데서 잘립니다. 날짜처럼 잘리면 안 되는 값은 `whitespace-nowrap` 으로
따로 감쌉니다 (Hero 의 일정 칸 참고).

숫자는 `.tabular` (= `font-variant-numeric: tabular-nums`) 로 자리를 맞춥니다.

## Components

- **버튼** — 높이 `min-h-[52px]`, `rounded-lg`. 주요 = `accent-600` + 흰 글자 +
  그림자, 보조 = `border-2 border-brand-200` + 흰 바탕. 모든 누를 수 있는
  요소는 최소 44px 입니다.
- **카드** (`CategoryCard`) — 흰 바탕, `border-brand-100`, `rounded-xl`,
  hover 시 테두리가 진해지고 그림자가 생깁니다. 카드 전체가 링크입니다.
- **안내 박스** — `rounded-2xl` + `border-2 border-brand-200`. 법적 안내처럼
  무게가 필요한 것은 머리띠(`bg-brand-700` 흰 글자)를 답니다.
- **네이비 띠** (`Hero`, `PageHeader`) — `.hero-field`, 44px 격자무늬.
- **세로 일정표** — 왼쪽 2px 선 + `brand-600` 점, `ring-4 ring-paper`.
- **아이콘** — `src/components/icons.tsx` 의 직접 그린 SVG 3종
  (ArrowRight · ExternalLink · ChevronDown), 선 굵기 1.75 통일, `currentColor`.
  **'→' 같은 글자를 아이콘 대신 쓰지 마세요.**

## Layout & Rhythm

- 폭은 `src/lib/layout.ts` 의 `container` 하나로 관리합니다
  (`max-w-3xl`). 일부러 한 가지만 씁니다 — 넓은 구역을 따로 만들면 한글
  본문이 한 줄에 너무 길어집니다.
- 구역 여백: `py-14 sm:py-20` (홈), `py-12 sm:py-16` (하위 페이지).
- **제목 위 여백을 아래보다 넓게** 둡니다. 이웃한 두 구역이 같은 여백을 쓰면
  가운데가 텅 비어 보여서, 앞 구역의 아래 여백을 줄였습니다.
- 배경은 흰색 → `paper-soft` → 흰색 순으로 번갈아 나옵니다.

## Motion

첫 화면에서 **딱 한 번**, 히어로의 세 덩어리가 아주 살짝 올라옵니다
(`.rise` / `.rise-2` / `.rise-3`, 0.7s, exponential ease-out).

**투명도가 아니라 위치만 움직입니다.** 투명에서 시작하면 애니메이션이 막힌
환경에서 글자가 영영 안 보일 수 있기 때문입니다.
`prefers-reduced-motion` 에서는 꺼집니다.

## 절대 바꾸면 안 되는 것 (Non-negotiables)

디자인을 다시 손볼 때도 아래는 그대로 두세요. 전부 이유가 있습니다.

1. **`ApplyForm`** — 개인정보·국외이전 안내가 폼보다 **위**, 새 창 링크가
   iframe보다 **위**, `applyMode: 'embed' | 'link'` 전환이 살아 있을 것.
2. **`RegistrationNotice`** — `"use client"` + `useIsClient()`. 이게 빠지면
   접수 상태가 배포일에 얼어붙어, 9월 1일이 되어도 계속 '접수 예정'입니다.
3. **`SiteNav` 의 `<details>` 메뉴** — 자바스크립트 없이 열려야 합니다.
   학교 인터넷에서 JS가 막혀도 사이트를 돌아다닐 수 있어야 합니다.
4. **`word-break: keep-all` 과 `src/fonts/` 의 Pretendard.**
5. **문구를 컴포넌트에 직접 쓰지 않기.** 전부 `config/competition.ts` 에서
   옵니다. 이 디자인 작업에서 `config/competition.ts` 는 한 글자도
   건드리지 않았습니다.

## 사진에 대하여

> ### ⚠️ 2026-08-05: 이 원칙은 뒤집혔습니다 ⚠️
>
> 원래 규칙은 **"사진을 쓰지 않는다"** 였습니다. 아래에 그대로 남겨 둡니다.
> 지금 사이트는 그 규칙을 따르지 않으므로, **아래 글만 읽고 '사진이 잘못
> 들어갔다'고 판단하지 마세요.**

**지금은 사진을 씁니다.** (2026-08-13 기준)

| 어디 | 몇 장 | 무엇이 찍혀 있나 |
| --- | --- | --- |
| 첫 화면 슬라이드 | 3장 | 미국 LTU 세계대회 |
| 각 화면 머리띠 | **6장** | 아래 참고 |
| 'ROBOFEST 소개' 본문 | 1장 | 미국 LTU 세계대회 |
| '오시는 길' 장소 사진 | 1장 | **부산과학기술대학교 캠퍼스** |
| '오시는 길' 지도 | 1장 | 네이버 지도 캡처 |

**머리띠 6장의 출처가 서로 다릅니다.**

| 화면 | 항목 | 무엇이 찍혀 있나 |
| --- | --- | --- |
| ROBOFEST 소개 | `robotTable` | 탁자에 전시된 학생 로봇들 |
| 종목 안내 | `modi` | 선반 위 자율주행 로봇들 |
| 오시는 길 | `entrance` | 대회장 입구로 이어지는 길 |
| 일정 | `build` | 로봇 조립 중인 모습 |
| 자주 묻는 질문 | `frontDesk` | 운영진 책상 |
| 참가 신청 | `awards` | 시상식 |

**오해를 막는 규칙은 그대로입니다.** 다른 대회 사진은 이 대회 사진처럼
보일 수 있습니다. 사진을 쓰되 **오해할 수 있는 자리에는 반드시 설명을
붙입니다.**

- 'ROBOFEST 소개' 본문 사진 아래: **'지난 ROBOFEST 세계대회 현장'**
  → 이 문구를 지우지 마세요. 사진을 쓰기로 한 조건입니다.
- ⚠️ **LTU 세계대회 사진을 부산 대회장인 것처럼 쓰지 마세요.**
  (2026-08-13 정정: 예전에는 '장소가 아직 확정 전'이라는 이유를 함께
  적었습니다. **장소는 2026-08-11 에 부산과학기술대학교로 확정되었고,**
  '오시는 길' 화면에는 **실제 부산과학기술대학교 캠퍼스 사진**이 들어가
  있습니다. 그러니 이제 문제는 '장소 미확정'이 아니라 **'미국 사진과 부산
  사진이 섞여 있다'** 는 것입니다. 어느 쪽인지 헷갈릴 자리에는 설명을
  붙이세요.)
- ⚠️ **`일정`(build) 머리띠에는 학생(미성년자)의 옆얼굴이 알아볼 수 있게
  나옵니다.** 막에 덮이지만 윤곽이 읽힙니다. 초상권 동의를 받은 자료인지
  확인이 필요합니다 (2026-08-12 제기, 아직 확인 전).

**`.hero-field`(옅은 격자무늬)는 그대로 남아 있습니다.** `config` 의
`heroSlides` 가 비면 그 격자무늬가 나옵니다. 사진 경로가 잘못돼도 화면이
깨지지 않게 하는 대비책입니다. 지우지 마세요.

---

<details>
<summary>2026-08-05 이전의 원칙 (기록용)</summary>

**이 대회 사진은 한 장도 없습니다.** 아직 열린 적이 없는 대회입니다.
다른 대회 사진을 가져다 쓰면 이 대회 사진인 것처럼 오해를 줍니다. 그래서
히어로는 사진 대신 옅은 격자무늬(`.hero-field`)를 씁니다.

실제 대회 사진이 생기면 그때 격자무늬 자리에 넣으면 됩니다. 그전까지는
**없는 사진을 만들어 넣지 마세요.**

</details>
