"use client";

import { useSyncExternalStore } from "react";
import { countdownFor, type CountdownView } from "@/lib/countdown";
import { msUntilNextSeoulMidnight, todayInSeoul } from "@/lib/dday";

/* ============================================================================
 *  '오늘' 기준 남은 날짜(D-day) 를 방문자의 브라우저에서 계산해 주는 도구
 *
 *  ★ 왜 이 파일이 따로 있나 (2026-08-19) ★
 *    이 로직은 원래 src/components/DdayBar.tsx 안에만 있었습니다.
 *    '참가 신청' 머리띠(ApplyHero)의 D-day 배지도 **똑같은 숫자**를 보여
 *    주어야 해서, 계산을 두 벌 두지 않으려고 이곳으로 옮겼습니다.
 *    지금 쓰는 곳은 둘입니다.
 *      · DdayBar / DdayChip  — 화면 맨 위 띠, 상단 메뉴 안 작은 표
 *      · ApplyDdayBadge      — '참가 신청' 머리띠의 알약 배지
 *    ⚠️ 한쪽만 다른 계산을 쓰게 만들지 마세요. 같은 화면에서 서로 다른
 *       숫자가 보이면 어느 쪽이 맞는지 알 수 없습니다.
 *
 *  ★★★ 왜 'use client' 인가 (지우지 마세요) ★★★
 *    이 사이트는 배포할 때 화면을 미리 만들어 둡니다. 남은 일수를 그때
 *    계산해 버리면 8월에 배포한 'D-26'이 11월에도 그대로 붙어 있습니다.
 *    그래서 방문자의 브라우저에서 계산합니다.
 *
 *  ℹ️ 무엇을 세는지(문구)와 날짜는 config/competition.ts 에 있고,
 *     계산 규칙은 src/lib/countdown.ts 에 있습니다. 이 파일은 '언제 다시
 *     계산하나'만 담당합니다.
 * ========================================================================== */

/**
 * 날짜가 바뀌었을 때 React 에게 알려 주는 구독자.
 *
 * ⚠️ setInterval 로 바꾸지 마세요. 하루에 한 번만 바뀌는 값을 1초마다
 *    계산하게 됩니다. 타이머가 발화하면 '그다음 자정'을 다시 예약합니다.
 */
function subscribeDate(onChange: () => void): () => void {
  let timer: number | undefined;

  const scheduleMidnight = () => {
    /* 최소 1초 — 시계가 살짝 어긋나 0ms 가 나오면 타이머가 쉼 없이
       다시 걸리게 됩니다. */
    const wait = Math.max(1000, msUntilNextSeoulMidnight());
    timer = window.setTimeout(() => {
      onChange();
      scheduleMidnight();
    }, wait);
  };

  scheduleMidnight();

  /* 절전에서 깨어나거나 다른 탭에서 돌아오면 타이머가 밀려 있을 수 있습니다 */
  document.addEventListener("visibilitychange", onChange);
  window.addEventListener("focus", onChange);

  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onChange);
    window.removeEventListener("focus", onChange);
  };
}

/** 배포 시 미리 만드는 단계에서는 오늘이 언제인지 알 수 없습니다 */
const noDateYet = () => null;

/**
 * 지금 시기에 맞는 D-day 표시 내용.
 *
 * ⚠️ 배포 시 미리 그리는 단계와 **화면을 맞춰 그리는 첫 순간**에는 null 을
 *    돌려줍니다. null 인 동안 무엇을 보여 줄지 부르는 쪽이 꼭 정하세요.
 *    (빈 자리로 두면 숫자가 나타나는 순간 옆의 글이 옆으로 튑니다)
 */
export function useCountdown(): CountdownView | null {
  const today = useSyncExternalStore(subscribeDate, todayInSeoul, noDateYet);
  return today === null ? null : countdownFor(today);
}
