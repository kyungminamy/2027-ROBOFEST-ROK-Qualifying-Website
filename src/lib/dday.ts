/* ============================================================================
 *  '한국 날짜'를 다루는 기본 도구들
 *
 *  ★ 이 파일에는 대회 날짜도 문구도 적혀 있지 않습니다 ★
 *    무엇을 세는지(접수 시작·마감·대회)는 src/lib/countdown.ts 가 정하고,
 *    이 파일은 '오늘이 한국에서 며칠인가', '두 날 사이가 며칠인가'만
 *    답합니다. 그래서 D-day 말고 다른 곳에서도 쓸 수 있습니다.
 *
 *  ★★★ 왜 전부 한국(KST) 기준인가 (지우지 마세요) ★★★
 *   방문자의 컴퓨터 시계가 어느 나라로 맞춰져 있든, 부산에서 보는 것과
 *   똑같은 D-day 가 나와야 합니다. 대회는 한국에서 열리고 접수 마감도
 *   한국 시간으로 닫힙니다. 브라우저 시간대를 그대로 쓰면 미국에서 보는
 *   지도교사에게 하루 어긋난 숫자가 보입니다.
 *
 *  ℹ️ 2026-08-06: 여기 있던 heroDdayLine() 은 src/lib/countdown.ts 의
 *     countdownFor() 로 대체되었습니다. 하나만 세던 것을 접수·대회 두 개를
 *     세도록 바꾸면서, '무엇을 세는가'를 이 파일에서 분리했습니다.
 * ========================================================================== */

/** 한국 시간은 UTC보다 9시간 빠릅니다. 서머타임이 없어 1년 내내 고정입니다. */
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

const DAY_MS = 24 * 60 * 60 * 1000;

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
