import type { Metadata } from "next";
import Link from "next/link";
import { competition } from "@/config/competition";
import { FigureBand } from "@/components/FigureBand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";
import { ArrowRight, ExternalLink } from "@/components/icons";

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
 *   여기: 숫자 카드 → 질문과 답(Q&A) → 원칙 목록 → 흐름 표 → 기관 소개
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
  description: `ROBOFEST가 어떤 대회인지, 다른 로봇 대회와 무엇이 다른지 안내합니다. ${competition.aboutPage.summary}`,
};

export default function AboutPage() {
  const { aboutPage, about, links, worldChampionship } = competition;

  return (
    <>
      <PageHeader
        title="ROBOFEST 소개"
        description={aboutPage.summary}
        image={competition.headerImages.robot}
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

        {/* ------------------------------------------------------ 질문과 답
             홈에는 없는 형식입니다. 지도교사가 실제로 궁금해하는 순서대로
             질문을 놓았습니다. 순서를 바꾸지 마세요. */}
        <section className="py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              다른 로봇 대회와 무엇이 다른가요
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

        {/* ------------------------------------------------- 네 가지 원칙
             ⚠️ 홈과 같은 about.pillars 를 씁니다. 내용을 여기에 다시 적지
                마세요. 대신 모양을 다르게 했습니다 (홈: 2단 얇은 선 /
                여기: 번호가 붙은 세로 목록). */}
        <section className="bg-paper-soft py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              ROBOFEST의 네 가지 원칙
            </h2>
            <p className="mt-3 text-base text-ink-soft">
              어느 종목에 나가든 아래 네 가지는 똑같이 적용됩니다.
            </p>

            <ol className="mt-8 space-y-4">
              {about.pillars.map((pillar, index) => (
                /* ★ 상자 모양(테두리·여백·flex)을 li 에서 Reveal 로 옮겼습니다 ★
                     떠오르는 것이 '상자 전체'라서 테두리도 같이 움직여야
                     합니다. li 에 테두리를 남겨 두면 글자만 움직이고
                     테두리는 가만히 있어 어긋나 보입니다.
                   시간차는 위에서 아래로 차례차례 (네 개니까 최대 0.24초). */
                <li key={pillar.title}>
                  <Reveal
                    delayMs={index * 80}
                    className="flex gap-4 rounded-2xl border border-brand-100 bg-paper p-5 sm:gap-5 sm:p-6"
                  >
                    {/* 번호는 '네 가지 중 몇 번째'라는 정보를 담고 있어
                        화면에 드러냅니다. 낭독기에는 목록 번호가 이미
                        전달되므로 중복해서 읽지 않도록 숨깁니다. */}
                    <span
                      aria-hidden="true"
                      className="tabular shrink-0 text-2xl font-bold text-brand-200 sm:text-3xl"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-brand-900 sm:text-lg">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-base text-ink">{pillar.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------------- 참가 흐름
             ⚠️ 홈과 같은 about.journey 를 씁니다.
                홈은 세로 점선 목록, 여기는 번호 + 표 형식입니다. */}
        <section className="py-12 sm:py-16">
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
                  <dd className="text-base text-ink">{stage.body}</dd>
                </div>
              ))}
            </dl>

            {/* ⚠️ 진출 팀 수를 적지 마세요. 아직 정해지지 않았습니다. */}
            <p className="mt-6 rounded-2xl bg-paper-soft p-5 text-base text-ink sm:p-6">
              {worldChampionship.advancementNotice} 세계대회는{" "}
              {worldChampionship.period} {worldChampionship.location}에서
              열립니다. 국내예선 장소인 부산과는 다른 곳입니다.
            </p>

            {/* 세계대회에 나가게 된 팀이 받는 도움 — 계획서 Ⅳ-11 */}
            <div className="mt-4 rounded-2xl border-2 border-brand-200 bg-brand-50 p-5 sm:p-6">
              <p className="text-base font-bold text-brand-900 sm:text-lg">
                {aboutPage.worldSupport.heading}
              </p>
              <p className="mt-2 text-base text-ink">
                {aboutPage.worldSupport.body}
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- 기관 소개 */}
        <section className="bg-paper-soft py-12 sm:py-16">
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
        <section className="py-12 sm:py-16">
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
