import type { Metadata } from "next";
import Link from "next/link";
import { competition } from "@/config/competition";
import { FigureBand } from "@/components/FigureBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";
import { withBold } from "@/lib/emphasis";
import {
  ArrowRight,
  ExternalLink,
  MailOpen,
  Puzzle,
  Robot,
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
 *   여기: 숫자 카드 → 원칙 목록 → 흐름 표 → 질문과 답 → 기관 소개
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
const SECTION_ORDER = [
  "principles", // ROBOFEST의 네 가지 원칙
  "journey", // 참가부터 세계대회까지
  "faq", // (다음 단계에서 들어올 자리 — 비워 두는 중)
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
  const { aboutPage, about, links, worldChampionship } = competition;

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
                  {paragraph}
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
             ⚠️ 홈과 같은 about.journey 를 씁니다.
                홈은 세로 점선 목록, 여기는 번호 + 표 형식입니다. */}
        <section className={`${sectionTone("journey")} py-12 sm:py-16`}>
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              참가부터 세계대회까지
            </h2>

            <dl className="mt-8">
              {about.journey.map((stage, index) => (
                <div
                  key={stage.step}
                  className="grid gap-1 border-b border-brand-100 py-5 sm:grid-cols-[auto_1fr] sm:gap-6"
                >
                  <dt className="flex items-baseline gap-2 text-base font-bold text-brand-900 sm:w-48">
                    <span aria-hidden="true" className="tabular text-brand-500">
                      {index + 1}
                    </span>
                    {stage.step}
                  </dt>
                  {/* ℹ️ withBold 는 config 의 `**…**` 부분만 굵게 만듭니다
                         (2026-08-12, 4번 항목의 세계대회 문구 때문에 넣었습니다).
                         ⚠️ 홈 화면도 같은 글을 쓰므로 그쪽에도 같이 넣었습니다 —
                            한쪽만 넣으면 다른 쪽에 `**` 가 그대로 보입니다.
                         자세한 설명은 src/lib/emphasis.tsx 맨 위에 있습니다. */}
                  <dd className="text-base text-ink">{withBold(stage.body)}</dd>
                </div>
              ))}
            </dl>

            {/* ⚠️ 진출 팀 수를 적지 마세요. 아직 정해지지 않았습니다.

                ℹ️ 2026-08-13: 상자 색을 연파랑(bg-paper-soft)에서 흰색으로
                   바꿨습니다. 이 구역의 배경이 연파랑이 되면서, 상자와
                   배경이 똑같은 색이라 상자가 아예 보이지 않게 됐습니다.
                   ⚠️ bg-paper-soft 로 되돌리지 마세요 — 구역 배경색은 위
                      SECTION_ORDER 에서 자동으로 정해지므로, 되돌리면
                      글자만 남고 상자는 사라집니다. */}
            <p className="mt-6 rounded-2xl bg-paper p-5 text-base text-ink sm:p-6">
              {worldChampionship.advancementNotice} 세계대회는{" "}
              {worldChampionship.period} {worldChampionship.location}에서
              열립니다. 국내예선 장소인 부산과는 다른 곳입니다.
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
                {aboutPage.worldSupport.body}
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

        {/* ------------------------------------------------------ 질문과 답
             지도교사가 실제로 궁금해하는 순서대로 질문을 놓았습니다.
             순서를 바꾸지 마세요.

             ℹ️ 2026-08-13: 같은 자리에 있던 '다른 로봇 대회와 무엇이
                다른가요'를 지우고, 그 모양 그대로 이 구역을 넣었습니다.
                글만 바뀌었고 마크업은 예전 것과 같습니다. */}
        <section className={`${sectionTone("faq")} py-12 sm:py-16`}>
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              참가 전에 궁금한 것들
            </h2>

            {/* Reveal 은 <div> 를 그대로 그리므로, 예전 <div> 자리에
                그대로 끼워 넣었습니다. DOM 모양이 바뀌지 않아
                first:border-t-0(첫 항목의 윗줄 없애기)이 그대로 동작합니다.
                ⚠️ Reveal 을 <dl> 바로 안이 아닌 다른 겹으로 옮기지 마세요.
                   그러면 '첫 번째'를 못 찾아 첫 항목에 윗줄이 생깁니다. */}
            <dl className="mt-8">
              {aboutPage.faq.map((item) => (
                <Reveal
                  key={item.q}
                  className="border-t border-brand-100 py-6 first:border-t-0 first:pt-0"
                >
                  <dt className="text-lg font-bold text-brand-900 sm:text-xl">
                    {item.q}
                  </dt>
                  <dd className="mt-2 text-base text-ink sm:text-lg">
                    {item.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------- 기관 소개 */}
        <section className={`${sectionTone("organisers")} py-12 sm:py-16`}>
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              누가 여는 대회인가요
            </h2>

            <dl className="mt-8 space-y-5">
              {aboutPage.organisers.map((org) => {
                const href: string = links[org.linkKey];
                return (
                  <div
                    key={org.name}
                    className="rounded-2xl border border-brand-100 bg-paper p-5 sm:p-6"
                  >
                    <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                      {org.role}
                    </dt>
                    <dd className="mt-1.5">
                      <p className="text-lg font-bold text-brand-900">
                        {org.name}
                      </p>
                      <p className="mt-1.5 text-base text-ink">{org.body}</p>

                      {/* 주소가 있을 때만 링크를 만듭니다 */}
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-base font-bold text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-600"
                        >
                          누리집 바로가기
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
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
