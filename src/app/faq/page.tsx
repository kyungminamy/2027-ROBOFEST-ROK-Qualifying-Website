import type { Metadata } from "next";
import { competition } from "@/config/competition";
import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";
import { ChevronDown } from "@/components/icons";

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
 *  ℹ️ 이 화면에는 이제 날짜가 직접 나오지 않습니다. 맨 위에 있던
 *     '접수 기간' 상자를 2026-08-11 에 없앴기 때문입니다.
 *     답변 글 안에 날짜를 적지 마세요 — config 의 registration 이
 *     바뀌어도 여기는 따라가지 않습니다.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: `${competition.shortName} 참가비, 접수 방법, 대회 규정, 세계대회 진출에 대해 자주 묻는 질문을 모았습니다.`,
  /* 이 화면의 대표 주소. www 주소나 ?뒤에 붙는 값이 달라도
     검색엔진이 "원래 주소는 이것"이라고 알 수 있게 합니다. */
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const { faqPage } = competition;

  return (
    <>
      <PageHeader
        title="자주 묻는 질문"
        description="접수와 규정에 대해 가장 많이 받는 질문을 모았습니다."
        /* 배경 사진을 바꾸려면 이 한 단어만 바꾸면 됩니다.
           고를 수 있는 값은 config 의 headerImages 에 있습니다.

           ℹ️ 2026-08-12: question(책상 위 작은 로봇) → frontDesk(명단과
              일정표를 확인하는 운영진 책상) 로 바꿨습니다 (담당자 요청).
              '초록색 가방의 ROBOFEST 글자가 보이게' 해 달라는 요청이라,
              그 가방을 띠 밑변에 붙이는 값(`center 100%`)이 함께 옵니다.
              ⚠️ frontDesk 의 position·overlay 는 이미 그 목적에 맞춰져
                 있습니다. 건드리기 전에 config 의 그 항목 주석을 읽으세요.
              ℹ️ 이 사진은 같은 날 '일정' 화면에서 잠깐 썼던 것입니다. */
        image={competition.headerImages.frontDesk}
      />

      <main id="main" className="flex-1">
        <section className="py-12 sm:py-16">
          <div className={container}>
            {/* ℹ️ 2026-08-11: 여기 있던 '접수 기간' 옅은 파란 상자를 담당자
                   요청으로 없앴습니다. 같은 날짜가 첫 화면·/schedule·
                   /apply 에도 있어서 이 페이지에만 있던 정보가 아닙니다.

                   ⚠️ first:mt-0 을 지우지 마세요. 상자가 있던 시절에는 아래
                      첫 묶음의 mt-12 가 '상자와의 간격'이었습니다. 상자가
                      없어진 지금 그대로 두면 구역 위쪽 여백(py-12)에 48px
                      이 더 붙어 첫 제목이 아래로 툭 떨어져 보입니다. */}
            {faqPage.map((section) => (
              <div key={section.group} className="mt-12 first:mt-0">
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

        {/* ℹ️ 2026-08-11: 여기 있던 '찾는 답이 없다면' 구역을 담당자 요청으로
               없앴습니다. 제목 한 줄, 안내 문장 한 줄, 그리고 '종목 안내'·
               '참가 신청' 단추 두 개가 있었습니다.

               ★ 없어져도 길이 막히지 않는 이유 ★
                 두 단추가 가리키던 곳은 모든 화면 맨 위 메뉴에 늘 있습니다
                 (메뉴는 화면에 붙어 있어 어디서든 눌립니다).
                 '문의처로 연락해 주세요'가 가리키던 연락처도 바로 아래
                 꼬리말에 그대로 있습니다.
               다시 넣고 싶으면 git 기록에서 이 커밋 직전을 보세요. */}

      </main>

      <SiteFooter />
    </>
  );
}
