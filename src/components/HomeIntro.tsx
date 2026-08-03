import Link from "next/link";
import { competition } from "@/config/competition";
import { homeSection, proseWidth } from "@/lib/layout";
import { ArrowRight } from "@/components/icons";

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
 *  ℹ️ 배경색을 넣지 않았습니다(흰색). 위아래 구역과 흰색·연파랑이
 *     번갈아 나오도록 맞춘 것이라, 여기에 배경색을 넣으면 리듬이 깨집니다.
 *
 *  ℹ️ 특징 항목을 네모 상자로 감싸지 않았습니다. 상자가 많아지면 화면이
 *     복잡해지기만 하고, 얇은 선으로 나누는 편이 읽기 편합니다.
 * ========================================================================== */

export function HomeIntro() {
  const { about } = competition;

  return (
    <section className="bg-paper py-20 sm:py-28 lg:py-32">
      <div className={homeSection}>
        <h2 className="text-3xl text-brand-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {about.heading}
        </h2>

        {/* ⚠️ 여기에 max-w-[..ch] 를 넣지 마세요.
               ch 단위는 영문 '0' 한 글자 너비를 기준으로 잽니다. 한글은 그보다
               두 배쯤 넓어서, 46ch 라고 적으면 실제로는 칸의 절반 남짓에서
               줄이 바뀝니다. 줄 길이는 container(=본문 폭)에 맡기세요. */}
        <p className={`mt-4 text-base text-ink sm:mt-5 sm:text-lg ${proseWidth}`}>
          {about.lead}
        </p>

        {/* 특징 — 휴대폰에서는 한 줄에 1개, 넓은 화면에서는 2개 */}
        <ul className="mt-12 grid gap-x-12 sm:grid-cols-2">
          {about.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="border-t border-brand-100 py-5 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0"
            >
              <h3 className="text-base font-bold text-brand-900 sm:text-lg">
                {pillar.title}
              </h3>
              <p className="mt-1.5 text-base text-ink">{pillar.body}</p>
            </li>
          ))}
        </ul>

        {/* 한눈에 보는 사실 — 작은 알약 모양 */}
        <ul className="mt-8 flex flex-wrap gap-2">
          {about.facts.map((fact) => (
            <li
              key={fact}
              className="rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-sm font-bold text-brand-800"
            >
              {fact}
            </li>
          ))}
        </ul>

        {/* 참가부터 세계대회까지의 흐름 —
            일정 안내 페이지의 세로선 목록과 같은 모양으로 맞췄습니다 */}
        <p className={`mt-16 text-base text-ink sm:text-lg ${proseWidth}`}>
          {about.journeyLead}
        </p>

        <ol className="mt-6 ml-1.5 border-l-2 border-brand-100">
          {about.journey.map((stage, index) => (
            <li key={stage.step} className="relative pb-7 pl-6 last:pb-0">
              {/* 순서를 나타내는 점. 화면 낭독기에는 <ol> 의 번호가 이미
                  전달되므로, 이 점은 읽지 않도록 숨깁니다. */}
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-paper"
              />

              <h3 className="text-base font-bold text-brand-900 sm:text-lg">
                <span className="tabular text-brand-500">{index + 1}. </span>
                {stage.step}
              </h3>
              <p className="mt-1 text-base text-ink">{stage.body}</p>
            </li>
          ))}
        </ol>

        {/* 다음에 볼 만한 곳 — 여기서는 '신청하세요'라고 하지 않습니다.
            신청 권유는 이 아래 접수 안내 구역이 담당합니다. */}
        <p className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
          <Link
            href="/categories"
            className="group inline-flex items-center gap-1.5 text-base font-bold text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-600"
          >
            종목 자세히 보기
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/apply"
            className="group inline-flex items-center gap-1.5 text-base font-bold text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-600"
          >
            참가 자격 확인하기
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
