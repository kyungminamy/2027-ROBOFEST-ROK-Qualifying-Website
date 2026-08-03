import type { Metadata } from "next";
import { competition, formatKoreanDate } from "@/config/competition";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";

/* ============================================================================
 *  일정 (/schedule)
 *
 *  ★ 이 파일에는 날짜와 일정 내용이 직접 적혀 있지 않습니다. ★
 *    모두 config/competition.ts 의 milestones 에서 읽어옵니다.
 *
 *  【 일정을 바꾸거나 추가하려면 】
 *   config/competition.ts 의 milestones 를 수정하세요.
 *   · 날짜 순서대로 적어 주세요. 화면에는 적힌 순서 그대로 나옵니다.
 *   · description 을 빈칸('')으로 두면 설명 줄이 나오지 않습니다.
 *   · 아직 확정되지 않은 날짜에는 isEstimated: true 를 넣으세요.
 *     화면에 '(예정)' 표시가 붙습니다.
 *
 *  ⚠️ 날짜 표시는 반드시 formatKoreanDate 를 쓰세요.
 *     직접 new Date(...).getDay() 로 요일을 구하면 배포 서버(UTC) 기준으로
 *     하루가 밀립니다. 자세한 이유는 config 파일의 설명을 보세요.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "일정",
  description: `${competition.shortName}의 접수·설명회·대회 일정 안내입니다.`,
};

export default function SchedulePage() {
  const { milestones, dates } = competition;

  return (
    <>
      <PageHeader
        title="일정"
        description={`대회는 ${formatKoreanDate(dates.day1)} ~ ${formatKoreanDate(
          dates.day2,
        )} 이틀간 열립니다.`}
        image={competition.headerImages.compass}
      />

      <main id="main" className="flex-1">
        {/* ------------------------------------------------------- 전체 일정 */}
        <section className="py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">전체 일정</h2>
            <p className="mt-3 text-base text-ink-soft">
              접수부터 대회 당일까지의 순서입니다.
            </p>

            {/* 왼쪽 선 + 점으로 된 간단한 세로 일정표.
                자바스크립트 없이도 그대로 보입니다. */}
            <ol className="mt-8 ml-1.5 border-l-2 border-brand-100">
              {milestones.map((milestone) => {
                /* milestones 항목마다 isEstimated 가 있을 수도, 없을 수도
                   있으므로 'in' 으로 확인합니다. (설정 파일은 그대로 두고
                   화면 쪽에서 안전하게 처리하는 방식입니다) */
                const isEstimated =
                  "isEstimated" in milestone && milestone.isEstimated === true;

                return (
                  <li
                    key={milestone.date + milestone.title}
                    className="relative pb-7 pl-6 last:pb-0"
                  >
                    {/* 점 — 왼쪽 선 위에 겹쳐 놓습니다.
                        ★ 점은 일부러 움직이지 않습니다 ★
                          점과 왼쪽 세로선은 '일정표의 뼈대'입니다. 뼈대는
                          가만히 있고 그 위의 글만 떠오르는 편이, 선까지
                          함께 흔들리는 것보다 안정적으로 보입니다.
                        ⚠️ 이 점을 Reveal 안으로 넣지 마세요. 위치를 li 기준
                           (absolute)으로 잡고 있어서 안으로 들어가면
                           기준이 바뀌어 엉뚱한 자리로 갑니다. */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-paper"
                    />

                    <Reveal>
                      <p className="tabular flex flex-wrap items-center gap-x-2 text-sm font-bold text-brand-700">
                        {formatKoreanDate(milestone.date)}
                        {isEstimated && (
                          /* 확정되지 않은 날짜임을 알려 줍니다.
                             (예: Game 미션 공개일은 ROBOFEST 본부가 정합니다) */
                          <span className="rounded border border-brand-200 bg-brand-50 px-1.5 py-0.5 text-xs font-bold text-brand-700">
                            예정
                          </span>
                        )}
                      </p>

                      <h3 className="mt-1 text-base font-bold text-brand-900 sm:text-lg">
                        {milestone.title}
                      </h3>

                      {/* description 이 빈칸이면 이 줄은 나오지 않습니다 */}
                      {milestone.description && (
                        <p className="mt-1 text-sm text-ink-soft sm:text-base">
                          {milestone.description}
                        </p>
                      )}
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* --------------------------------------------------------- 안내 문구 */}
        <section className="bg-paper-soft py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              참고해 주세요
            </h2>
            <p className="mt-4 text-base text-ink sm:text-lg">
              종목별로 정원이 있어 접수가 조기에 마감될 수 있습니다. 참가를
              생각하고 계시다면 접수 시작 후 여유 있게 신청해 주세요.
            </p>
            <p className="mt-3 text-base text-ink sm:text-lg">
              위 일정과 대회 당일 세부 시간표는 변경될 수 있으며, 확정되는 대로
              이 페이지에 다시 안내하겠습니다.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
