"use client";

import { competition, daysUntilCompetition } from "@/config/competition";
import { useIsClient } from "@/lib/useIsClient";

/* ============================================================================
 *  대회까지 남은 날짜 표시 (D-100 형태)
 *
 *  ★ 왜 'use client' 인가 (지우지 마세요) ★
 *   남은 날짜는 '오늘'을 알아야 계산할 수 있어서 방문자의 브라우저에서 셉니다.
 *   자세한 이유는 src/lib/useIsClient.ts 의 설명을 보세요.
 * ========================================================================== */

/** 대회 진행 상태 */
type Phase =
  | { kind: "before"; days: number } // 대회 전
  | { kind: "during" } // 대회 당일 (1일차~2일차)
  | { kind: "after" }; // 대회 종료

function currentPhase(now: Date): Phase {
  // 한국 시간(+09:00) 기준으로 판단합니다. 해외에서 접속해도 결과가 같습니다.
  const day1Start = new Date(`${competition.dates.day1}T00:00:00+09:00`);
  const day2End = new Date(`${competition.dates.day2}T23:59:59+09:00`);

  if (now > day2End) return { kind: "after" };

  /* 1일차 시작 이후 ~ 2일차 종료 이전은 '진행 중'입니다.
     ⚠️ 남은 날짜만 보고 판단하면 안 됩니다. 남은 날짜는 1일차를 기준으로
        계산하므로, 2일차(시상식 당일)에는 음수가 되어 '대회 종료'로
        잘못 표시됩니다. */
  if (now >= day1Start) return { kind: "during" };

  return { kind: "before", days: daysUntilCompetition(now) };
}

function phaseLabel(phase: Phase): string {
  switch (phase.kind) {
    case "after":
      return "대회 종료";
    case "during":
      return "대회 진행 중";
    case "before":
      return `D-${phase.days}`;
  }
}

export function DdayBadge() {
  const isClient = useIsClient();

  const base =
    "inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-bold text-brand-700 sm:text-base";

  /* 계산이 끝나기 전(첫 화면 그림)에는 같은 크기의 빈 자리를 잡아 둡니다.
     이렇게 하지 않으면 숫자가 나타나는 순간 아래 내용이 밀려 내려갑니다. */
  if (!isClient) {
    return (
      <span className={`${base} invisible`} aria-hidden="true">
        D-000
      </span>
    );
  }

  return <span className={base}>{phaseLabel(currentPhase(new Date()))}</span>;
}
