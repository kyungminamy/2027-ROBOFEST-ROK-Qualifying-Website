import Link from "next/link";
import { competition } from "@/config/competition";
import { container } from "@/lib/layout";

/* ============================================================================
 *  대회 소개 — 첫 화면에서 'ROBOFEST가 뭔가요?'에 답하는 부분
 *
 *  ★ 글은 전부 config/competition.ts 의 about 에서 가져옵니다. ★
 *    이 파일에는 문장이 하나도 없습니다. 내용을 바꾸려면 그 파일을 여세요.
 *    항목을 늘리거나 줄여도(특징 4개 → 3개 등) 화면은 알아서 맞춰집니다.
 *
 *  ℹ️ 이 구역이 접수 안내보다 위에 있는 이유:
 *     ROBOFEST를 처음 듣는 분에게 '신청하세요'부터 들이밀면
 *     무엇에 신청하는지 모르는 채로 결정을 요구하게 됩니다.
 *     먼저 설명하고, 신청은 그 아래에서 권합니다.
 *
 *  ℹ️ 배경색을 넣지 않았습니다(흰색). 위아래 구역과 흰색·회백색이
 *     번갈아 나오도록 맞춘 것이라, 여기에 배경색을 넣으면 리듬이 깨집니다.
 * ========================================================================== */

export function HomeIntro() {
  const { about } = competition;

  return (
    <section className="py-10 sm:py-14">
      <div className={container}>
        <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
          {about.heading}
        </h2>

        <p className="mt-3 text-base text-ink sm:text-lg">{about.lead}</p>

        {/* 특징 카드 — 휴대폰에서는 한 줄에 1개, 넓은 화면에서는 2개 */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {about.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="rounded-xl border border-brand-200 bg-white p-5"
            >
              <h3 className="text-base font-bold text-brand-900 sm:text-lg">
                {pillar.title}
              </h3>
              <p className="mt-2 text-base text-ink">{pillar.body}</p>
            </li>
          ))}
        </ul>

        {/* 한눈에 보는 사실 — 작은 알약 모양 */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {about.facts.map((fact) => (
            <li
              key={fact}
              className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm text-brand-800"
            >
              {fact}
            </li>
          ))}
        </ul>

        {/* 참가부터 세계대회까지의 흐름 —
            일정 안내 페이지의 세로선 목록과 같은 모양으로 맞췄습니다 */}
        <p className="mt-8 text-base text-ink sm:text-lg">
          {about.journeyLead}
        </p>

        <ol className="mt-5 ml-1.5 border-l-2 border-brand-100">
          {about.journey.map((stage, index) => (
            <li key={stage.step} className="relative pb-6 pl-6 last:pb-0">
              {/* 순서를 나타내는 점. 화면 낭독기에는 <ol> 의 번호가 이미
                  전달되므로, 이 점은 읽지 않도록 숨깁니다. */}
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-paper"
              />

              <h3 className="text-base font-bold text-brand-900 sm:text-lg">
                <span className="text-brand-600">{index + 1}. </span>
                {stage.step}
              </h3>
              <p className="mt-1 text-base text-ink">{stage.body}</p>
            </li>
          ))}
        </ol>

        {/* 다음에 볼 만한 곳 — 여기서는 '신청하세요'라고 하지 않습니다.
            신청 권유는 이 아래 접수 안내 구역이 담당합니다. */}
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/categories"
            className="text-base font-bold text-brand-700 underline"
          >
            종목 자세히 보기 →
          </Link>
          <Link
            href="/apply"
            className="text-base font-bold text-brand-700 underline"
          >
            참가 자격 확인하기 →
          </Link>
        </p>
      </div>
    </section>
  );
}
