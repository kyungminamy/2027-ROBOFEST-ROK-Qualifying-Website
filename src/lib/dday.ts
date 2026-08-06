import { competition, formatKoreanMonthDay } from "@/config/competition";

/* ============================================================================
 *  첫 화면 D-day 한 줄의 '계산'만 담당합니다
 *
 *  ★ 이 파일에는 날짜도 문구도 적혀 있지 않습니다 ★
 *    날짜 → config/competition.ts 의 registration.opensAt / closesAt / dates
 *    문구 → config/competition.ts 의 heroDday
 *    화면에 그리는 일 → src/components/HeroDday.tsx
 *
 *  ★★★ 왜 '오늘'을 인자로 받나 (지우지 마세요) ★★★
 *   아래 함수들은 오늘 날짜를 스스로 알아내지 않고 인자로 받습니다.
 *   그래서 '10월 16일에 무엇이 보이나'를 그 날을 기다리지 않고 확인할 수
 *   있습니다. 이 프로젝트에는 자동 테스트가 없으므로, 경계가 되는 날짜를
 *   직접 넣어 보는 것이 유일한 검증 방법입니다.
 *
 *     heroDdayLine('2026-10-16')  →  '오늘 접수 마감'
 *
 *  ⚠️ 함수 안에서 new Date() 를 부르지 마세요. 그 순간 검증할 수 없게 됩니다.
 *     (지금 날짜를 얻는 곳은 todayInSeoul 하나뿐입니다)
 * ========================================================================== */

/** 한국 시간은 UTC보다 9시간 빠릅니다. 서머타임이 없어 1년 내내 고정입니다. */
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

const DAY_MS = 24 * 60 * 60 * 1000;

/* '마감이 가까움'으로 볼 남은 일수.
   7 = 마감 1주일 전부터 강조색으로 바뀝니다 (10/16 마감이면 10/9부터).
   ★ 강조를 더 일찍/늦게 시작하려면 이 숫자만 고치세요 ★ */
const URGENT_DAYS = 7;

/**
 * 'YYYY-MM-DD' → 그 날 자정을 가리키는 숫자.
 *
 * ★ 왜 UTC 자정으로 바꾸나 ★
 *  두 날짜를 '같은 기준의 자정'으로 맞춰 놓고 빼야 일수가 정확합니다.
 *  둘 다 똑같이 UTC 자정으로 두면, 실제 시간대가 무엇이든 차이는 같습니다.
 *  (한국 자정끼리 빼는 것과 결과가 동일합니다 — 오프셋이 서로 지워집니다)
 *
 * ⚠️ new Date('2026-09-01') 로 바꾸지 마세요. 브라우저 시간대에 따라
 *    하루가 밀립니다. config 의 formatKoreanDate 에도 같은 경고가 있습니다.
 */
function isoToMidnight(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/**
 * 지금 한국이 몇 월 몇 일인지 — 'YYYY-MM-DD'
 *
 * 방문자의 컴퓨터 시계가 어느 나라로 맞춰져 있어도 한국 날짜가 나옵니다.
 * (UTC 로 옮긴 뒤 9시간을 더하면 그것이 한국의 벽시계 시각입니다)
 */
export function todayInSeoul(now: Date = new Date()): string {
  return new Date(now.getTime() + KST_OFFSET_MS).toISOString().slice(0, 10);
}

/**
 * 한국 날짜 두 개 사이의 일수. 같은 날이면 0, 다음 날이면 1입니다.
 *
 * ⚠️ (목표 − 지금) / 86400000 을 그대로 쓰면 안 됩니다.
 *    오후에 보면 0.7일이 되어 버려서, 잘라내기(floor)에 따라 하루가
 *    틀립니다. 위 isoToMidnight 로 양쪽을 자정에 맞추기 때문에 여기서는
 *    나눗셈이 항상 정수로 떨어집니다. (round 는 만약을 위한 안전장치)
 */
export function daysBetween(fromIso: string, toIso: string): number {
  return Math.round((isoToMidnight(toIso) - isoToMidnight(fromIso)) / DAY_MS);
}

/**
 * 다음 한국 자정까지 남은 밀리초.
 *
 * 1초마다 시계를 확인하는 대신, 딱 자정에 한 번만 깨어나기 위한 값입니다.
 * 화면에 보이는 것은 '며칠 남았나'뿐이라 그보다 자주 계산할 이유가 없습니다.
 */
export function msUntilNextSeoulMidnight(now: Date = new Date()): number {
  const kstNow = now.getTime() + KST_OFFSET_MS;
  const sinceMidnight = ((kstNow % DAY_MS) + DAY_MS) % DAY_MS;
  return DAY_MS - sinceMidnight;
}

/** 한 줄의 진하기. 화면에서 어떤 색이 되는지는 HeroDday.tsx 가 정합니다. */
export type DdayTone = "quiet" | "normal" | "urgent";

export type HeroDdayLine = {
  /** ' · ' 앞에 오는 부분 (예: '9월 1일(화) 접수 시작') */
  lead: string;
  /** 'D-41' 앞에 붙는 말. 없으면 빈 문자열 (예: '대회까지') */
  daysPrefix: string;
  /** 'D-' 뒤에 올 숫자. null 이면 D-표시를 하지 않습니다 */
  days: number | null;
  tone: DdayTone;
};

/**
 * 오늘 날짜에 맞는 한 줄을 만듭니다. 대회가 끝난 뒤면 null — 아무것도
 * 그리지 않습니다. (지난 대회의 D-day 를 계속 붙여 둘 이유가 없습니다)
 *
 * ★ 판단 순서를 바꾸지 마세요 ★
 *  '접수 마감 당일'은 '접수 기간 중'이기도 합니다. 마감 당일을 먼저
 *  걸러내지 않으면 '10월 16일 접수 마감 · D-0' 이 나옵니다.
 */
export function heroDdayLine(todayIso: string): HeroDdayLine | null {
  const { opensAt, closesAt } = competition.registration;
  const { day1, day2 } = competition.dates;
  const label = competition.heroDday;

  const toOpen = daysBetween(todayIso, opensAt);
  const toClose = daysBetween(todayIso, closesAt);
  const toDay1 = daysBetween(todayIso, day1);

  /* 대회 이튿날이 지났으면 아무것도 보여주지 않습니다 (11/29~) */
  if (daysBetween(day2, todayIso) > 0) return null;

  /* 대회 당일 (11/27~11/28) — 남은 날짜가 아니라 '지금 열리고 있음' */
  if (toDay1 <= 0) {
    return { lead: label.during, daysPrefix: "", days: null, tone: "quiet" };
  }

  /* 접수는 끝났고 대회는 남았음 (10/17~11/26) */
  if (toClose < 0) {
    return {
      lead: label.afterClose,
      daysPrefix: label.untilEvent,
      days: toDay1,
      tone: "quiet",
    };
  }

  /* 접수 마감 당일 (10/16) — ★ 위의 '접수 기간 중'보다 먼저 판단합니다 ★ */
  if (toClose === 0) {
    return {
      lead: label.closingToday,
      daysPrefix: "",
      days: null,
      tone: "urgent",
    };
  }

  /* 접수 시작 전 (~8/31) — 마감이 아니라 '시작'까지 셉니다 */
  if (toOpen > 0) {
    return {
      lead: `${formatKoreanMonthDay(opensAt)} ${label.beforeOpen}`,
      daysPrefix: "",
      days: toOpen,
      tone: "quiet",
    };
  }

  /* 접수 기간 중 (9/1~10/15) — 마감이 1주일 안으로 들어오면 강조 */
  return {
    lead: `${formatKoreanMonthDay(closesAt)} ${label.beforeClose}`,
    daysPrefix: "",
    days: toClose,
    tone: toClose <= URGENT_DAYS ? "urgent" : "normal",
  };
}
