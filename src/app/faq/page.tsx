import type { Metadata } from "next";
import Link from "next/link";
import { competition, formatKoreanDateRange } from "@/config/competition";
import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";
import { ArrowRight, ChevronDown } from "@/components/icons";

/* ============================================================================
 *  자주 묻는 질문 (/faq)
 *
 *  ★ 질문과 답은 config/competition.ts 의 faqPage 에 있습니다. ★
 *    이 파일은 '어떻게 보여줄지'만 담당합니다.
 *
 *  ★★★ 왜 <details> 로 접었다 폈다 하나 ★★★
 *
 *   질문이 10개라 모두 펼쳐 두면 화면이 매우 길어집니다. 그렇다고
 *   자바스크립트로 여닫게 만들면, 학교 인터넷에서 자바스크립트가 막혔을 때
 *   '눌러도 안 열리는 질문'이 되어 답을 아예 볼 수 없습니다.
 *
 *   그래서 HTML 기본 기능인 <details> 를 씁니다. 상단 메뉴와 같은 방식이며
 *   자바스크립트 없이도 브라우저가 알아서 여닫습니다.
 *   ⚠️ 이것을 자바스크립트 방식으로 바꾸지 마세요.
 *
 *  ℹ️ 날짜는 config 의 registration 에서 가져옵니다. 이 파일이나 faqPage 에
 *     날짜를 직접 적지 마세요. 두 곳에 적으면 한쪽만 고쳐집니다.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: `${competition.shortName} 참가비, 접수 방법, 대회 규정, 세계대회 진출에 대해 자주 묻는 질문을 모았습니다.`,
};

export default function FaqPage() {
  const { faqPage, registration } = competition;

  return (
    <>
      <PageHeader
        title="자주 묻는 질문"
        description="접수와 규정에 대해 가장 많이 받는 질문을 모았습니다."
        image={competition.headerImages.compass}
      />

      <main id="main" className="flex-1">
        <section className="py-12 sm:py-16">
          <div className={container}>
            {/* 접수 기간은 자주 묻는 첫 번째 질문이라 맨 위에 못박아 둡니다.
                날짜는 config 에서 가져오므로 여기서 고치지 마세요. */}
            <p className="tabular rounded-2xl border-2 border-brand-200 bg-brand-50 p-5 text-base font-bold text-brand-900 sm:p-6 sm:text-lg">
              접수 기간:{" "}
              {formatKoreanDateRange(
                registration.opensAt,
                registration.closesAt,
              )}
            </p>

            {faqPage.map((section) => (
              <div key={section.group} className="mt-12">
                <h2 className="text-2xl text-brand-900 sm:text-3xl">
                  {section.group}
                </h2>

                <div className="mt-5">
                  {section.items.map((item) => (
                    <details
                      key={item.q}
                      className="group border-b border-brand-100"
                    >
                      <summary
                        /* list-none: 브라우저 기본 삼각형을 없앱니다.
                           min-h-[56px]: 손가락으로 누르기 편한 크기 */
                        className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-bold text-brand-900 sm:text-lg"
                      >
                        {item.q}
                        <ChevronDown
                          className="h-5 w-5 shrink-0 text-brand-500 transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>

                      <p className="pb-5 text-base text-ink sm:text-lg">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------- 남은 궁금증 */}
        <section className="bg-paper-soft py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              찾는 답이 없다면
            </h2>
            <p className="mt-3 text-base text-ink sm:text-lg">
              아래 문의처로 연락해 주세요. 종목별 규정은 종목 안내에서 더
              자세히 확인하실 수 있습니다.
            </p>

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
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
