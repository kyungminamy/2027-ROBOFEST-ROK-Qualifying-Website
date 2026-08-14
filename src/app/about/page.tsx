import type { Metadata } from "next";
import Link from "next/link";
import { competition } from "@/config/competition";
import { FigureBand } from "@/components/FigureBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SequentialReveal } from "@/components/SequentialReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";
/* withBold 는 config 글 안의 `**…**` 부분만 굵게 만듭니다.
   이 화면에서 쓰는 곳 (2026-08-13 담당자 요청으로 굵기 표시를 넣었습니다):
     · aboutPage.intro          여는 글
     · aboutPage.worldSupport   '세계대회에 나가게 되면'
   ℹ️ 2026-08-14: 여기 있던 `aboutPage.faq` 줄을 지웠습니다. '참가 전에
      궁금한 것들' 구역이 없어지면서 그 데이터도 함께 없앴습니다.
   ℹ️ 두 필드 모두 이 화면에서만 씁니다. 그래서 `**` 를 넣어도 다른 화면에
      영향이 없습니다. (about.journey 처럼 홈과 함께 쓰는 글이라면 양쪽에
      모두 withBold 를 넣어야 합니다 — 자세한 규칙은 CLAUDE.md 참고)
   ⚠️ `**` 는 반드시 짝을 맞추세요. 홀수 개면 굵어지지 않고 화면에 `**` 가
      그대로 보입니다(일부러 그렇게 만들어 두었습니다). */
import { withBold } from "@/lib/emphasis";
import {
  ArrowRight,
  ExternalLink,
  MailOpen,
  Puzzle,
  Robot,
  Trophy,
  Wrench,
} from "@/components/icons";

/* ============================================================================
 *  ROBOFEST 소개 (/about)
 *
 *  ★ 이 파일에는 글이 직접 적혀 있지 않습니다. ★
 *    모두 config/competition.ts 에서 읽어옵니다.
 *      · 이 페이지 전용 글 → aboutPage
 *      · 특징 네 가지      → about.pillars  (홈과 같은 내용을 함께 씁니다)
 *      · 참가 흐름         → about.journey  (홈과 같은 내용)
 *      · 바깥 사이트 주소  → links
 *
 *  ★★★ 홈의 소개와 모양을 일부러 다르게 했습니다 ★★★
 *   홈: 큰 제목 + 얇은 선으로 나눈 특징 + 알약 모양 사실 + 세로 일정선
 *   여기: 숫자 카드 → 원칙 목록 → 흐름 표 → 기관 소개
 *   (2026-08-14: '흐름 표' 와 '기관 소개' 사이에 있던 질문과 답 구역을
 *    담당자 요청으로 없앴습니다)
 *
 *  ★ 구역 배경색은 손으로 적지 않습니다 ★
 *    아래 SECTION_ORDER 순서표에서 자동으로 정해집니다. 설명은 그 표
 *    위에 있습니다.
 *   같은 내용을 같은 모양으로 두 번 보여 주면, 방문자가 '아까 본 화면'으로
 *   착각하고 그냥 닫아 버립니다.
 *
 *  ⚠️ 용어 주의 (CLAUDE.md 참고)
 *   · UMC·BottleSumo·VCC 에 영문 Qualifier 를 쓰지 마세요.
 *   · 세계대회 진출은 '기회'까지만. 진출 팀 수를 쓰지 마세요.
 *   · 세계대회는 서울 광운대학교입니다. 부산과 혼동하지 마세요.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "ROBOFEST 소개",
  description: `ROBOFEST가 어떤 대회인지 안내합니다. ${competition.aboutPage.summary}`,
  /* 이 화면의 대표 주소. www 주소나 ?뒤에 붙는 값이 달라도
     검색엔진이 "원래 주소는 이것"이라고 알 수 있게 합니다. */
  alternates: { canonical: "/about" },
};

/* ============================================================================
 *  구역 배경색 — 아래 순서표에서 '자동으로' 정해집니다 (2026-08-13)
 *
 *  ★ <section> 에 흰색·연파랑을 직접 적지 마세요 ★
 *    순서표의 첫째가 흰색, 둘째가 연파랑, 셋째가 흰색 … 이렇게 번갈아
 *    정해집니다. 구역을 추가·삭제하거나 순서를 바꿀 때 이 목록만 고치면
 *    나머지 구역 색이 알아서 다시 계산됩니다.
 *
 *  【 왜 이렇게 바꿨나 】
 *   예전에는 구역마다 bg-paper-soft 를 손으로 적어 두었습니다. 그래서
 *   2026-08-13 에 맨 위 구역('다른 로봇 대회와 무엇이 다른가요') 하나를
 *   지웠더니 아래 구역이 전부 한 칸씩 밀려서, 색을 네 곳 모두 손으로
 *   다시 맞춰야 했습니다. 한 곳만 빠뜨려도 같은 색이 두 번 이어져
 *   두 구역이 한 덩어리로 보입니다. 이 표는 그 일을 막습니다.
 *
 *  【 구역을 추가할 때 】
 *   1. 아래 목록의 원하는 자리에 이름을 한 줄 넣습니다
 *   2. 새 <section> 의 className 에 sectionTone("그이름") 을 씁니다
 *   ⚠️ 목록에 없는 이름을 쓰면 배포 전에 오류가 나서 알려 줍니다.
 *      (오타로 색이 조용히 틀리는 것을 막는 안전장치입니다)
 *
 *
 *  ℹ️ 여는 글과 '숫자로 보는 ROBOFEST'(남색 띠)는 이 표에 없습니다.
 *     남색 띠는 색이 정해져 있고, 여는 글은 그 위에 있어 번갈이와
 *     상관이 없습니다.
 * ========================================================================== */
/* ℹ️ 2026-08-14: 여기 있던 "faq" ('참가 전에 궁금한 것들') 를 지웠습니다.
      이 목록에서 한 줄이 빠지면 아래 구역들의 차례가 한 칸씩 당겨지고,
      색은 이 표를 보고 다시 계산되므로 손으로 고칠 곳이 없습니다.
      지금은 흰색 → 연파랑 → 흰색 → 연파랑 으로 나옵니다. */
const SECTION_ORDER = [
  "principles", // ROBOFEST의 네 가지 원칙
  "journey", // 참가부터 세계대회까지
  "organisers", // 누가 여는 대회인가요
  "more", // 더 알아보기
] as const;

/** 순서표의 몇 번째인지 보고 배경색을 정합니다 (첫째=흰색, 둘째=연파랑, …) */
function sectionTone(name: (typeof SECTION_ORDER)[number]): string {
  return SECTION_ORDER.indexOf(name) % 2 === 0 ? "bg-paper" : "bg-paper-soft";
}

/* 'ROBOFEST의 네 가지 원칙' 카드에 붙는 아이콘 (2026-08-13).
 *
 * ★ 순서가 config 의 about.pillars 와 1:1로 맞아야 합니다 ★
 *     1 100% 자율주행        → 로봇
 *     2 학생이 직접 만듭니다   → 렌치
 *     3 당일 공개되는 미션     → 열린 봉투
 *     4 어떤 키트든, 어떤 언어든 → 퍼즐 조각
 *   ⚠️ config 에서 pillars 순서를 바꾸면 여기도 같이 바꿔야 합니다.
 *      (순서가 어긋나도 화면은 멀쩡히 나오므로 빌드가 잡아 주지 못합니다)
 *
 * ℹ️ 아이콘 자체는 src/components/icons.tsx 에 있습니다. 이 프로젝트에는
 *    아이콘 라이브러리가 없어서 같은 규격으로 직접 그렸습니다.
 */
const PILLAR_ICONS = [Robot, Wrench, MailOpen, Puzzle];

export default function AboutPage() {
  /* ℹ️ worldChampionship 은 2026-08-13 에 뺐습니다. 세계대회 안내 문단이
        config 의 aboutPage.timelineNotice 한 줄로 바뀌면서 쓸 일이
        없어졌습니다. (종목 상세 화면은 아직 씁니다) */
  const { aboutPage, about, links } = competition;

  return (
    <>
      <PageHeader
        title="ROBOFEST 소개"
        description={aboutPage.summary}
        /* ℹ️ 2026-08-12: 담당자 요청으로 robot(흰 실험실의 로봇 팔)에서
               robotTable(파란 탁자에 전시된 학생 로봇들)로 바꿨습니다.
               어디를 잘랐는지, position·overlay 를 왜 그 값으로 정했는지는
               config 의 headerImages.robotTable 위에 적어 두었습니다. */
        image={competition.headerImages.robotTable}
      />

      <main id="main" className="flex-1">
        {/* ------------------------------------------------------- 여는 글 */}
        <section className="py-12 sm:py-16">
          <div className={container}>
            <div className="space-y-4">
              {aboutPage.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base text-ink sm:text-lg"
                >
                  {withBold(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------- 숫자로 보는 ROBOFEST
             ★ 화면을 그리는 곳은 FigureBand 한 파일입니다 ★
               홈에도 똑같은 구역이 나오기 때문에, 두 곳이 어긋나지 않도록
               한 파일로 묶어 두었습니다. 고칠 일이 있으면 그 파일을
               고치세요. 여기에 다시 펼쳐 적지 마세요. */}
        <FigureBand />

        {/* ------------------------------------------------- 네 가지 원칙
             ⚠️ 홈과 같은 about.pillars 를 씁니다. 내용을 여기에 다시 적지
                마세요. 대신 모양을 다르게 했습니다 (홈: 2단 얇은 선 /
                여기: 아이콘이 붙은 2×2 카드). */}
        <section className={`${sectionTone("principles")} py-12 sm:py-16`}>
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              ROBOFEST의 네 가지 원칙
            </h2>
            <p className="mt-3 text-base text-ink-soft">
              어느 종목에 나가든 아래 네 가지는 똑같이 적용됩니다.
            </p>

            {/* ★ 2×2 격자 (2026-08-13) ★
                  auto-fit + minmax(240px,1fr) 이라 칸이 240px 밑으로 좁아지면
                  브라우저가 알아서 1열로 접습니다. 화면 크기를 sm: 처럼
                  일일이 지정하지 않아도 됩니다.
                  · 휴대폰 375px → 본문 폭 335px → 240×2+12=492 가 안 되므로 1열
                  · 640px 이상   → 2열

                ⚠️ minmax 의 240px 을 키우면 2열이 되는 시점이 늦어지고,
                   줄이면 좁은 화면에서 글자가 눌립니다.

                items-stretch 는 격자의 기본값이지만, '같은 줄 카드 높이를
                맞추는 것이 의도'라는 뜻으로 남겨 둡니다. */}
            <ol className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-stretch gap-3">
              {about.pillars.map((pillar, index) => {
                /* 카드마다 아이콘이 다릅니다. config 의 pillars 순서와
                   1:1로 맞춰 둔 목록이라, ⚠️ config 에서 순서를 바꾸면
                   여기 순서도 같이 바꿔야 합니다.
                   항목이 4개보다 많아지면 아이콘 없이 그립니다(빈 화면이
                   되는 것보다 낫습니다). */
                const Icon = PILLAR_ICONS[index];

                return (
                  <li key={pillar.title} className="h-full">
                    {/* ★ 상자 모양(테두리·여백)을 li 가 아니라 Reveal 에 둡니다 ★
                          떠오르는 것이 '상자 전체'라서 테두리도 같이 움직여야
                          합니다. li 에 테두리를 남겨 두면 글자만 움직이고
                          테두리는 가만히 있어 어긋나 보입니다.

                        ⚠️ h-full 이 필요합니다. Reveal 이 카드를 한 겹 감싸므로,
                           이 겹이 칸 높이를 꽉 채우지 않으면 같은 줄 카드의
                           높이가 서로 어긋납니다. (홈 종목 카드와 같은 처리) */}
                    <Reveal
                      delayMs={index * 80}
                      className="h-full rounded-2xl border border-brand-100 bg-paper p-5 sm:p-6"
                    >
                      {/* 장식입니다. 뜻은 아래 제목 글자가 전부 전달하므로
                          화면 낭독기에는 읽히지 않습니다(aria-hidden 은
                          icons.tsx 에서 이미 붙습니다). */}
                      {Icon && <Icon className="h-6 w-6 text-brand-600" />}
                      <h3 className="mt-2.5 text-base font-bold text-brand-900 sm:text-lg">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-base text-ink">{pillar.body}</p>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- 참가 흐름
             ⚠️ 글은 aboutPage.timeline 에서 옵니다 — 홈이 쓰는
                about.journey 와 **다른 목록**입니다. 왜 나눠 두었는지는
                config 의 timeline 위 설명을 꼭 읽어 보세요. */}
        <section className={`${sectionTone("journey")} py-12 sm:py-16`}>
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              참가부터 세계대회까지
            </h2>

            {/* ★ 가로 타임라인 — 카드 4장 (2026-08-13) ★
                  auto-fit 이라 넓으면 4열, 좁아지면 3열 → 2열로 알아서 접힙니다.

                ⚠️ 아주 좁은 화면에서 1열이 되게 하려면 grid-cols-1 이 따로
                   필요합니다. minmax(130px,1fr) 만 두면 휴대폰(본문 폭 335px)
                   에서도 130×2+8=268 이 들어가 버려 2열이 됩니다.
                   그래서 420px 미만은 1열로 못 박았습니다.
                   ★ 375px 에서 1열이어야 한다는 것이 담당자 요구사항입니다 ★ */}
            {/* 순서대로 하나씩 나타납니다 (1→2→3→4).
                  · 400ms 동안, 아래에서 8px 올라오며
                  · 카드마다 120ms 씩 늦게 시작
                  · 묶음 전체에 관찰자 하나 → 한 번 나타나면 관찰을 끊습니다
                  · '동작 줄이기'를 켰거나 자바스크립트가 막히면 그냥 보입니다
                자세한 설명은 src/components/SequentialReveal.tsx 맨 위와
                globals.css 의 .seq-reveal 규칙에 있습니다.

                ⚠️ 홈 화면이 쓰는 Reveal 과 다른 컴포넌트입니다. 바꿔 쓰지 마세요. */}
            <SequentialReveal className="mt-8 grid grid-cols-1 gap-2 min-[420px]:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
              {aboutPage.timeline.map((stage, index) => {
                const isLast = index === aboutPage.timeline.length - 1;

                return (
                  /* ⚠️ 나타나는 효과는 이 <li> 에 걸립니다
                        (globals.css 의 `.seq-reveal > *`). 그래서 카드 모양
                        (테두리·배경·여백)도 <li> 에 둡니다. 안쪽에 <div> 를
                        하나 더 끼우면 테두리는 가만히 있고 글자만 움직여
                        어긋나 보입니다. */
                  <li
                    key={stage.step}
                    className={`flex h-full flex-col rounded-2xl bg-paper p-4 ${
                      isLast
                        ? "border-2 border-brand-600"
                        : "border border-brand-100"
                    }`}
                  >
                      {/* 첫 줄 — 왼쪽 번호 배지, 오른쪽 아이콘 */}
                      <div className="flex items-center justify-between">
                        <span
                          aria-hidden="true"
                          className="tabular flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700"
                        >
                          {index + 1}
                        </span>

                        {isLast ? (
                          /* 마지막 칸만 트로피입니다. 다음 칸이 없으니
                             화살표를 두면 어디론가 더 이어지는 것처럼 보입니다. */
                          <Trophy className="h-4 w-4 shrink-0 text-brand-600" />
                        ) : (
                          /* ⚠️ 1열로 접히면 화살표를 숨깁니다.
                                카드가 세로로 쌓이는데 오른쪽 화살표가 남아
                                있으면 방향이 어긋나 보입니다.
                                숨기는 기준(420px)은 위 격자와 같은 값입니다.
                                ★ 한쪽만 고치지 마세요 ★ */
                          <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand-300 min-[420px]:block" />
                        )}
                      </div>

                      {/* ⚠️ 여기는 <h3> 가 아니라 <p> 입니다 (일부러 그렇습니다).
                             globals.css 가 h1~h4 를 모두 font-weight:700 으로
                             정해 두어서, <h3> 에 font-medium 을 줘도 굵게
                             나옵니다. 담당자가 요청한 것은 '중간 굵기'라
                             !important 로 그 규칙과 싸우는 대신 <p> 를 썼습니다.
                             단계 이름은 짧은 이름표이고, '네 단계가 순서대로'
                             라는 뜻은 바깥 <ol>/<li> 가 이미 전달합니다. */}
                    <p className="mt-3 text-sm font-medium text-brand-900">
                      {stage.step}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">{stage.body}</p>
                  </li>
                );
              })}
            </SequentialReveal>

            {/* ⚠️ 진출 팀 수를 적지 마세요. 아직 정해지지 않았습니다.
                   위 4번 칸이 '세계대회 진출' 이라고만 적혀 있어서, 진출이
                   정해진 것처럼 읽히지 않게 잡아 주는 것이 이 문단입니다.
                   ★ 지우거나 타임라인에서 멀리 떼어 놓지 마세요 ★

                ℹ️ 2026-08-13: 상자 색을 연파랑(bg-paper-soft)에서 흰색으로
                   바꿨습니다. 이 구역의 배경이 연파랑이 되면서, 상자와
                   배경이 똑같은 색이라 상자가 아예 보이지 않게 됐습니다.
                   ⚠️ bg-paper-soft 로 되돌리지 마세요 — 구역 배경색은 위
                      SECTION_ORDER 에서 자동으로 정해지므로, 되돌리면
                      글자만 남고 상자는 사라집니다. */}
            <p className="mt-6 rounded-2xl bg-paper p-5 text-base text-ink sm:p-6">
              {aboutPage.timelineNotice}
            </p>

            {/* 세계대회에 나가게 된 팀이 받는 도움 — 계획서 Ⅳ-11

                ℹ️ 2026-08-11: 옅은 파란 상자(테두리 있는 bg-brand-50)에서
                   바로 위 상자와 같은 모양으로 바꿨습니다. 담당자 요청입니다.
                   글은 그대로이고 상자만 바뀌었습니다.

                ★ 위 상자와 같은 값을 쓰세요 ★
                  rounded-2xl · bg-paper · p-5 sm:p-6 · 테두리 없음.
                  두 상자가 나란히 붙어 있어서, 한쪽만 테두리가 있으면
                  같은 종류의 글인데 다른 무게로 보입니다.
                  ⚠️ border-2 나 bg-brand-50 을 다시 붙이지 마세요.

                ℹ️ 2026-08-13: 위 상자와 함께 연파랑 → 흰색으로 바꿨습니다.
                   이유는 바로 위 상자의 설명을 보세요. */}
            <div className="mt-4 rounded-2xl bg-paper p-5 sm:p-6">
              <p className="text-base font-bold text-brand-900 sm:text-lg">
                {aboutPage.worldSupport.heading}
              </p>
              <p className="mt-2 text-base text-ink">
                {withBold(aboutPage.worldSupport.body)}
              </p>
            </div>

            {/* 대회장 사진 (2026-08-05 부산광역시교육청 요청)

                ★ 아래 설명(caption)을 지우지 마세요 ★
                 세계대회 사진이지 부산 국내예선 사진이 아닙니다.
                 설명이 없으면 '부산 대회장이 이렇게 생겼구나' 하고
                 오해하게 됩니다. 부산 장소는 아직 확정 전입니다.

                ⚠️ next/image 를 쓰지 않는 이유는 venue 화면과 같습니다 —
                   설정이 필요해 비개발자가 유지하기 어렵습니다.
                   대신 화면 크기에 따라 두 장 중 하나만 내려받도록
                   srcSet 을 지정했습니다. 좁은 화면은 900px 짜리만
                   받으므로 휴대폰 데이터가 덜 듭니다. */}
            <figure className="mt-10">
              {/* eslint-disable-next-line @next/next/no-img-element -- next/image 는 설정이 필요해 비개발자가 유지하기 어렵습니다. public 폴더의 사진만 쓰므로 기본 img 로 충분합니다. */}
              <img
                src={aboutPage.photo.wide}
                srcSet={`${aboutPage.photo.small} 900w, ${aboutPage.photo.wide} 1600w`}
                sizes="(min-width: 640px) 42rem, 100vw"
                alt={aboutPage.photo.alt}
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-2xl border border-brand-100"
              />
              <figcaption className="mt-3 text-sm text-ink-soft">
                {aboutPage.photo.caption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ℹ️ 2026-08-14: 여기 있던 '참가 전에 궁금한 것들' 구역을 담당자
               요청으로 없앴습니다. 접었다 펴는 문답 8개가 있었고, config 의
               `aboutPage.faq` 데이터도 함께 지웠습니다 (이 구역만 쓰던
               데이터입니다). 위 SECTION_ORDER 에서도 "faq" 를 뺐습니다.

               ★ 길이 막히지 않는 이유 ★
                 같은 질문 대부분이 '자주 묻는 질문'(/faq) 화면에 있고,
                 그 화면은 모든 화면 맨 위 메뉴에서 바로 갈 수 있습니다.
               다시 넣고 싶으면 git 기록에서 이 커밋 직전을 보세요. */}

        {/* ------------------------------------------------------- 기관 소개 */}
        <section className={`${sectionTone("organisers")} py-12 sm:py-16`}>
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              누가 여는 대회인가요
            </h2>

            {/* ★ 가로 3칸 (2026-08-13) ★
                  minmax(180px,1fr) 이라 좁아지면 알아서 2열 → 1열이 됩니다.
                  휴대폰(본문 폭 335px)에서는 180×2+12=372 가 안 들어가므로
                  따로 지정하지 않아도 1열이 됩니다.
                  (타임라인과 달리 grid-cols-1 을 못 박을 필요가 없습니다) */}
            <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] items-stretch gap-3">
              {aboutPage.organisers.map((org) => {
                const href: string = links[org.linkKey];

                return (
                  /* ⚠️ 카드 배경은 반드시 흰색(bg-paper)입니다.
                        로고 파일 배경이 흰색이라, 카드에 회색이나 연파랑을
                        주면 로고 둘레에 흰 네모가 드러납니다.
                        ★ bg-paper 를 바꾸지 마세요 ★
                        ℹ️ 2026-08-14: 구역 배경이 연파랑에서 흰색으로 바뀌어
                           (위 구역 하나가 없어지면서 차례가 당겨졌습니다)
                           지금은 흰 배경에 흰 카드가 놓입니다. 카드는
                           테두리(border-brand-100)로 구분됩니다 — 바로 위
                           '네 가지 원칙' 구역과 같은 구조입니다. */
                  <li
                    key={org.name}
                    className="flex h-full flex-col rounded-2xl border border-brand-100 bg-paper p-5 sm:p-6"
                  >
                    {/* ① 로고
                        ⚠️ 세 파일 모두 높이 96px 로 맞춰진 보정본이라
                           똑같이 h-8(32px) 만 주면 크기가 나란히 맞습니다.
                           ★ 로고마다 다른 높이를 주지 마세요 ★
                        ⚠️ padding 을 더하지 마세요 — 여백은 파일 안에
                           이미 들어 있습니다.
                        ⚠️ object-fit 으로 자르지 마세요.
                        ★ self-start 를 지우지 마세요 ★ 카드가 flex-col 이라
                          기본값(align-items: stretch)이 그림을 카드 폭까지
                          옆으로 늘여 버립니다. 실제로 320×96 로고가
                          182×32 로 찌그러졌습니다(2026-08-13 확인).
                        width/height 는 그림이 뜨기 전에 자리를 잡아 두어
                        글이 밀리지 않게 하려고 적습니다(높이는 항상 96). */}
                    {/* eslint-disable-next-line @next/next/no-img-element -- next/image 는 설정이 필요해 비개발자가 유지하기 어렵습니다. public 폴더의 사진만 쓰므로 기본 img 로 충분합니다. */}
                    <img
                      src={org.logo}
                      alt={org.logoAlt}
                      width={org.logoWidth}
                      height={96}
                      loading="lazy"
                      decoding="async"
                      className="mb-3.5 block h-8 w-auto self-start"
                    />

                    {/* ② 역할 배지 */}
                    <span className="inline-flex self-start rounded-full bg-brand-100 px-2.5 py-[3px] text-xs font-bold text-brand-700">
                      {org.role}
                    </span>

                    {/* ③ 기관명 — <h3> 가 아니라 <p> 입니다.
                        globals.css 가 h1~h4 를 font-weight:700 으로 못 박아
                        두어서 <h3> 로는 '중간 굵기'가 나오지 않습니다. */}
                    <p className="mt-2.5 text-[15px] font-bold text-brand-900">
                      {org.name}
                    </p>

                    {/* ④ 부제 — ⚠️ 없는 칸도 빈 줄을 남깁니다.
                           그래야 세 카드의 설명·링크 줄이 나란히 맞습니다.
                           부제가 없으면 줄바꿈 없는 공백( )을 넣습니다.
                           ⚠️ 그냥 " " 를 넣으면 안 됩니다 — HTML 은 보통
                              공백을 지워 버려서 줄 높이가 생기지 않습니다.
                           ★ org.subtitle 이 비었다고 이 줄을 통째로 지우지
                             마세요 — 카드 줄맞춤이 깨집니다 ★ */}
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {org.subtitle || " "}
                    </p>

                    {/* ⑤ 설명 */}
                    <p className="mt-2.5 text-[13px] text-ink">{org.body}</p>

                    {/* ⑥ 링크 — mt-auto 로 카드 맨 아래에 붙습니다.
                           설명 길이가 달라도 세 카드의 링크가 한 줄로
                           맞춰집니다. ⚠️ mt-auto 를 지우지 마세요.
                           주소가 없으면 링크를 아예 만들지 않습니다. */}
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-bold text-brand-700 transition-colors hover:text-accent-600"
                      >
                        누리집 바로가기
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------- 다음에 볼 곳 */}
        <section className={`${sectionTone("more")} py-12 sm:py-16`}>
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              더 알아보기
            </h2>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/categories"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-2 border-brand-200 bg-paper px-7 text-base font-bold text-brand-700 transition-colors hover:border-brand-400 sm:text-lg"
              >
                종목 안내
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/apply"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 text-base font-bold text-white shadow-lg shadow-accent-600/20 transition-colors hover:bg-accent-700 sm:text-lg"
              >
                참가 신청
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* ⚠️ 바깥 사이트이고 영문입니다. 새 창에서 열립니다. */}
            <p className="mt-6">
              <a
                href={links.robofestGetStarted}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-bold text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-600"
              >
                ROBOFEST 본부 공식 안내 (영문)
                <ExternalLink className="h-4 w-4" />
              </a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
