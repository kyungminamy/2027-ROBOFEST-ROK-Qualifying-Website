import Link from "next/link";
import { competition } from "@/config/competition";
import { homeSection, proseWidth } from "@/lib/layout";
import { withBold } from "@/lib/emphasis";
import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

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
          {about.pillars.map((pillar, index) => (
            /* ★ 칸을 나누는 줄(border-t)은 li 에 그대로 둡니다 ★
                 first:· nth-child(2): 는 '몇 번째 칸인지'를 보고 윗줄을
                 없애는 규칙입니다. 이 class 를 Reveal 로 옮기면 Reveal 이
                 언제나 li 의 첫째 자식이라 규칙이 전부 참이 되어, 네 칸
                 모두 윗줄이 사라집니다. ⚠️ 옮기지 마세요.

                 줄은 가만히 있고 글만 떠오릅니다. 줄은 칸을 나누는
                 '틀'이라서, 틀은 고정하고 내용만 들어오는 편이
                 안정적으로 보입니다. */
            <li
              key={pillar.title}
              className="border-t border-brand-100 py-5 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0"
            >
              <Reveal delayMs={(index % 2) * 80}>
                <h3 className="text-base font-bold text-brand-900 sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-base text-ink">{pillar.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* ℹ️ 2026-08-03: 여기 있던 '한눈에 보는 사실' 알약 목록
               ('전국 초·중·고' · '참가비 무료' · '8개 종목' …)을 없앴습니다.
               다섯 가지 모두 바로 위 소개 글이나 아래 일정·신청 안내에
               이미 나오는 내용이라, 같은 말을 한 번 더 하는 것 말고는
               하는 일이 없었습니다.
               ★ 되살리지 마세요 ★ 새로 알릴 것이 생기면 알약을 늘리지
                 말고, 그 내용을 설명하는 자리에 문장으로 적으세요. */}

        {/* 구분선 — 여기서 이야기가 바뀝니다.
            위는 'ROBOFEST가 어떤 대회인가', 아래는 '어떻게 참가하는가'입니다.
            알약 목록이 있을 때는 그것이 두 이야기 사이의 칸막이 노릇을
            했는데, 없애고 나니 네 가지 특징과 참가 흐름이 한 덩어리로
            붙어 보여서 선을 넣었습니다.

            ℹ️ 위 여백(mt-10)이 아래(mt-14)보다 작은 것은 실수가 아닙니다.
               바로 위 특징 목록이 이미 아래쪽에 py-5 만큼 여백을 가지고
               있어서, 같은 숫자를 주면 선이 아래로 치우쳐 보입니다.

            ℹ️ hr 은 '여기서 내용이 바뀝니다'라는 뜻을 가진 표준 태그라
               화면 낭독기도 구분을 알려 줍니다. 그냥 선을 그리는 div 로
               바꾸지 마세요. */}
        <hr className="mt-10 border-t border-brand-100" />

        {/* 참가부터 세계대회까지의 흐름 —
            일정 안내 페이지의 세로선 목록과 같은 모양으로 맞췄습니다 */}
        <p className={`mt-14 text-base text-ink sm:text-lg ${proseWidth}`}>
          {about.journeyLead}
        </p>

        <ol className="mt-6 ml-1.5 border-l-2 border-brand-100">
          {about.journey.map((stage, index) => (
            <li key={stage.step} className="relative pb-7 pl-6 last:pb-0">
              {/* 순서를 나타내는 점. 화면 낭독기에는 <ol> 의 번호가 이미
                  전달되므로, 이 점은 읽지 않도록 숨깁니다.
                  ★ 점은 일부러 움직이지 않습니다 ★ 왼쪽 세로선과 점은
                    '흐름을 나타내는 뼈대'입니다. 일정 안내 페이지와 같은
                    처리입니다.
                  ⚠️ 이 점을 Reveal 안으로 넣지 마세요. 위치를 li 기준
                     (absolute)으로 잡고 있어 안으로 들어가면 엉뚱한
                     자리로 갑니다. */}
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-brand-600 ring-4 ring-paper"
              />

              <Reveal>
                <h3 className="text-base font-bold text-brand-900 sm:text-lg">
                  <span className="tabular text-brand-500">{index + 1}. </span>
                  {stage.step}
                </h3>
                {/* ℹ️ withBold 는 config 의 `**…**` 부분만 굵게 만듭니다
                       (2026-08-12). ⚠️ /about 도 같은 글을 쓰므로 그쪽에도
                       같이 넣었습니다 — 한쪽만 넣으면 다른 쪽에 `**` 가
                       그대로 보입니다. 설명은 src/lib/emphasis.tsx 참고. */}
                <p className="mt-1 text-base text-ink">
                  {withBold(stage.body)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* 자세히 보기 — 다른 구역(종목·일정·장소)과 같은 모양의 버튼입니다.
            ℹ️ 2026-08-03: ROBOFEST 소개 페이지(/about)를 만들면서 넣었습니다.
               홈의 이 구역은 '요약'이고, 자세한 설명은 그 페이지에 있습니다.
               여기서 '신청하세요'라고 하지 않는 이유: 신청 권유는 이 아래
               접수 안내 구역이 담당합니다. */}
        <p className="mt-10 sm:mt-12">
          <Link
            href="/about"
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-lg border-2 border-brand-200 bg-paper px-6 text-base font-bold text-brand-700 transition-colors hover:border-brand-400 hover:text-accent-600 sm:text-lg"
          >
            ROBOFEST 소개 자세히 보기
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
