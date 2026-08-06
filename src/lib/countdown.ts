import { competition } from "@/config/competition";
import { daysBetween } from "@/lib/dday";

/* ============================================================================
 *  남은 날짜(D-day) '계산'만 담당합니다
 *
 *  ★ 이 파일에는 날짜도 문구도 적혀 있지 않습니다 ★
 *    날짜 → config/competition.ts 의 registration.opensAt / closesAt / dates
 *    문구 → config/competition.ts 의 countdown
 *    화면에 그리는 일 → src/components/DdayBar.tsx
 *    한국 날짜를 알아내는 일 → src/lib/dday.ts
 *
 *  ★★★ 왜 '오늘'을 인자로 받나 (지우지 마세요) ★★★
 *   아래 함수는 오늘이 언제인지 스스로 알아내지 않고 인자로 받습니다.
 *   그래서 '10월 16일에 무엇이 보이나'를 그 날을 기다리지 않고 확인할 수
 *   있습니다. 이 프로젝트에는 자동 테스트가 없으므로, 경계가 되는 날짜를
 *   직접 넣어 보는 것이 유일한 검증 방법입니다.
 *
 *     countdownFor('2026-10-16').primary.display  →  'D-DAY'
 *
 *  ⚠️ 함수 안에서 new Date() 를 부르지 마세요. 그 순간 검증할 수 없게 됩니다.
 * ========================================================================== */

/** 지금이 다섯 시기 중 어디인가 */
export type CountdownPhase =
  /** ~8/31 접수 시작 전 */
  | "beforeOpen"
  /** 9/1~10/16 접수 기간 중 (마감 당일 포함) */
  | "open"
  /** 10/17~11/26 접수는 끝났고 대회는 남음 */
  | "closed"
  /** 11/27~11/28 대회 당일 */
  | "during"
  /** 11/29~ 대회가 끝남 */
  | "ended";

/** 말 한 마디와 숫자 하나 */
export type CountdownItem = {
  /** '접수 마감까지' — ⚠️ 숫자만 두지 않기 위해 반드시 함께 그립니다 */
  label: string;
  /** 남은 일수. 0 이면 그날 당일 */
  days: number;
  /** 화면에 그대로 그릴 글자 — 'D-26' / 'D-DAY' / 'D+3' */
  display: string;
};

export type CountdownView = {
  phase: CountdownPhase;
  /** 왼쪽(접수). 대회 당일·종료 후에는 null */
  primary: CountdownItem | null;
  /** 오른쪽(대회). 좁은 화면(640px 미만)에서는 숨깁니다 */
  secondary: CountdownItem | null;
  /** 숫자 없이 상태만 알리는 말 ('대회 진행 중' 등). 없으면 null */
  note: string | null;
  /**
   * 접수가 열렸는가. 띠에서 접수 숫자의 색이 바뀌는 조건입니다.
   * ★ 9월 1일 전에는 false 입니다 — 그 전까지 이 띠에 주황이 없습니다 ★
   */
  isOpen: boolean;
};

/**
 * 남은 일수를 한국식 D-day 표기로 바꿉니다.
 *
 *   3  → 'D-3'      아직 사흘 남음
 *   0  → 'D-DAY'    바로 그날
 *  -3  → 'D+3'      사흘 지남
 *
 * ⚠️ 0 을 'D-0' 으로 바꾸지 마세요. 한국에서는 그날을 'D-DAY' 라고 씁니다.
 *    'D-0' 은 숫자가 하나 빠진 것처럼 보여서 오류로 읽힙니다.
 */
export function formatDday(days: number): string {
  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-DAY";
  return `D+${-days}`;
}

function item(label: string, days: number): CountdownItem {
  return { label, days, display: formatDday(days) };
}

/**
 * 오늘 날짜에 맞는 표시 내용을 만듭니다.
 *
 * ★ 판단 순서를 바꾸지 마세요 ★
 *  뒤에서 앞으로, 즉 '끝났나 → 열리고 있나 → 접수가 끝났나 → 접수 중인가'
 *  순서로 걸러냅니다. 이 순서를 뒤집으면 대회 당일에도 '접수 마감 · 대회까지
 *  D+0' 같은 것이 나옵니다.
 */
export function countdownFor(todayIso: string): CountdownView {
  const { opensAt, closesAt } = competition.registration;
  const { day1, day2 } = competition.dates;
  const label = competition.countdown;

  const toOpen = daysBetween(todayIso, opensAt);
  const toClose = daysBetween(todayIso, closesAt);
  const toDay1 = daysBetween(todayIso, day1);
  const toDay2 = daysBetween(todayIso, day2);

  const eventItem = item(label.untilEvent, toDay1);

  /* 5. 대회가 끝남 (11/29~) — 숫자를 0 으로 두지 않습니다.
        끝난 대회에 'D-DAY' 가 붙어 있으면 고장 난 것처럼 보입니다. */
  if (toDay2 < 0) {
    return {
      phase: "ended",
      primary: null,
      secondary: null,
      note: label.ended,
      isOpen: false,
    };
  }

  /* 4. 대회 당일 (11/27~11/28) — 남은 날짜가 아니라 '지금 열리고 있음' */
  if (toDay1 <= 0) {
    return {
      phase: "during",
      primary: null,
      secondary: null,
      note: label.during,
      isOpen: false,
    };
  }

  /* 3. 접수는 끝났고 대회는 남음 (10/17~11/26)
        ★ 여기서는 '대회까지'가 왼쪽으로 올라갑니다 ★
          셀 것이 하나뿐일 때는 그것이 먼저 와야 합니다. */
  if (toClose < 0) {
    return {
      phase: "closed",
      primary: eventItem,
      secondary: null,
      note: label.closed,
      isOpen: false,
    };
  }

  /* 2. 접수 기간 중 (9/1~10/16) — 마감 당일이면 formatDday 가 'D-DAY' 로
        바꿔 줍니다. isOpen 이 true 가 되면서 숫자 색이 바뀝니다. */
  if (toOpen <= 0) {
    return {
      phase: "open",
      primary: item(label.untilClose, toClose),
      secondary: eventItem,
      note: null,
      isOpen: true,
    };
  }

  /* 1. 접수 시작 전 (~8/31) — 마감이 아니라 '시작'까지 셉니다.
        ★ isOpen 이 false 라서 이 기간에는 띠에 주황색이 없습니다 ★ */
  return {
    phase: "beforeOpen",
    primary: item(label.untilOpen, toOpen),
    secondary: eventItem,
    note: null,
    isOpen: false,
  };
}
