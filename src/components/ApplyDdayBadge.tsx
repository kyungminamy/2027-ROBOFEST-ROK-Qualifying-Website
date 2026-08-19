"use client";

import { competition } from "@/config/competition";
import { useCountdown } from "@/lib/useCountdown";

/* ============================================================================
 *  '참가 신청' 머리띠 안의 D-day 알약 배지 — **이 화면에서만 씁니다**
 *
 *  ★ 숫자는 화면 맨 위 띠(DdayBar)와 완전히 같은 계산입니다 ★
 *    둘 다 src/lib/useCountdown.ts 를 부릅니다. 그래서 위쪽 띠에 'D-13' 이
 *    보이는 날에는 이 배지에도 'D-13' 이 보입니다.
 *    ⚠️ 여기서 날짜를 다시 계산하지 마세요. 같은 화면에 서로 다른 숫자가
 *       보이면 신청자는 어느 쪽이 맞는지 알 수 없습니다.
 *
 *  ★ 색: 흰 바탕 + 남색 글씨 ★
 *    머리띠 바탕이 남색(brand-700)이라, 배지는 색을 뒤집어 눈에 띄게 합니다.
 *    brand-700(#17407c)은 흰 바탕에서 대비 10:1 로 기준(4.5:1)을 넉넉히
 *    넘습니다.
 *    ⚠️ 주황(accent-600)으로 바꾸지 마세요. 흰 바탕에서 5.1:1 로 통과는
 *       하지만, 이 화면에서 주황은 '신청하기' 단추의 색입니다. 배지가
 *       같은 색이면 누를 수 있는 것처럼 보입니다 (배지는 링크가 아닙니다).
 *
 *  ⚠️ 이 배지를 링크나 단추로 만들지 마세요. 확인 사항을 건너뛰고 폼으로
 *     가는 지름길이 되기 때문입니다 (2026-08-19 담당자 지시). 신청 단추는
 *     '신청 전 확인해 주세요' 상자 안에만 둡니다.
 * ========================================================================== */

export function ApplyDdayBadge() {
  const view = useCountdown();

  /* 배포 시 미리 그리는 단계와 화면을 맞춰 그리는 첫 순간에는 오늘이
     언제인지 알 수 없습니다 (useCountdown 설명 참고). */
  const pending = view === null;
  const primary = view?.primary ?? null;

  /* 셀 숫자가 없는 시기(대회 당일·종료 뒤)에는 상태만 알립니다 —
     '대회 진행 중' / '대회 종료'. 문구는 config 에 있습니다. */
  const note = view?.note ?? null;

  /* 있을 수 없는 조합이지만, 빈 알약이 남지 않도록 막아 둡니다 */
  if (!pending && !primary && !note) return null;

  return (
    /* ★ 아직 계산 전이면 '보이지 않게' 두고 자리는 차지합니다 ★
         invisible 이라 흰 알약이 반짝하고 나타나지 않으면서도, 숫자가
         들어올 때 옆의 '접수 기간' 줄이 옆으로 튀지 않습니다.
         ⚠️ hidden(=display:none) 으로 바꾸지 마세요. 자리를 차지하지
            않아서 숫자가 나타나는 순간 글이 밀립니다.

       ⚠️ whitespace-nowrap 과 shrink-0 을 지우지 마세요. 좁은 화면에서
          '접수 시작까지 / D-13' 로 줄이 접히면 알약 모양이 무너집니다.

       ⚠️ 굵기는 400 과 700 만 씁니다 — 이 사이트는 Pretendard 를 그 두
          가지만 싣습니다 (layout.tsx 의 글꼴 설명 참고). */
    <span
      aria-hidden={pending}
      className={`inline-flex shrink-0 items-baseline gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[13px] font-bold text-brand-700 sm:text-sm ${
        pending ? "invisible" : ""
      }`}
    >
      {primary ? (
        <>
          <span>{primary.label}</span>
          {/* ⚠️ tabular 를 지우지 마세요. 없으면 D-10 → D-9 로 자릿수가
                 줄어드는 날 배지 폭이 흔들립니다. */}
          <span className="tabular">{primary.display}</span>
        </>
      ) : pending ? (
        /* 자리를 잡아 두기 위한 가짜 값입니다 (보이지 않습니다).
           실제로 들어올 글자와 길이가 같아야 해서 config 의 말을 그대로
           씁니다 — '접수 시작까지'와 '접수 마감까지'는 길이가 같습니다. */
        <>
          <span>{competition.countdown.untilOpen}</span>
          <span className="tabular">D-00</span>
        </>
      ) : (
        <span>{note}</span>
      )}
    </span>
  );
}
