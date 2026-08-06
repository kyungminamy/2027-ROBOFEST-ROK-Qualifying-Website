/* ============================================================================
 *  '화면을 조금이라도 내렸는가'를 한 곳에서 판단합니다
 *
 *  두 곳이 이 값을 봅니다.
 *    · 맨 위 남은 날짜 띠 (DdayBar) — 내렸으면 위로 사라집니다
 *    · 상단 메뉴 안의 작은 D-26 표 (DdayChip) — 내렸을 때만 나타납니다
 *
 *  ★ 왜 파일 하나에 모아 두나 (지우지 마세요) ★
 *   두 컴포넌트가 각자 scroll 을 듣게 하면 listener 가 둘이 되고, 무엇보다
 *   서로 다른 순간에 상태가 바뀔 수 있습니다. 띠는 사라졌는데 표는 아직
 *   안 나온 어정쩡한 화면이 생깁니다. 한 곳에서 판단해 둘 다 같은 값을
 *   보게 합니다.
 *
 *  ⚠️ 스크롤할 때마다 화면을 다시 그리지 않습니다.
 *     값이 true ↔ false 로 '바뀔 때만' 알립니다. 그래서 손가락으로 쭉
 *     내리는 동안 다시 그리는 일은 한 번뿐입니다.
 * ========================================================================== */

/** 이 픽셀보다 더 내려가면 '내렸다'로 봅니다.
    4px — 손을 살짝 떨어 생기는 1~2px 움직임으로는 바뀌지 않을 만큼 작고,
    띠 높이(32~36px)보다는 훨씬 작아서 띠가 사라지기 전에 표가 준비됩니다. */
const THRESHOLD = 4;

let scrolled = false;
const listeners = new Set<() => void>();
let listening = false;

function read() {
  const next = window.scrollY > THRESHOLD;
  if (next === scrolled) return; // 바뀐 게 없으면 아무것도 하지 않습니다
  scrolled = next;
  for (const notify of listeners) notify();
}

export function subscribeScrolled(onChange: () => void): () => void {
  listeners.add(onChange);

  if (!listening) {
    listening = true;
    /* passive: 브라우저에게 '스크롤을 막지 않겠다'고 알려 주는 표시입니다.
       이게 없으면 스크롤이 뻑뻑해질 수 있습니다. */
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
  }

  /* 새로고침 뒤 브라우저가 보던 위치를 복원해 주는 경우가 있어,
     구독하는 순간에 한 번 확인합니다. */
  read();

  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
      listening = false;
    }
  };
}

export function getScrolled(): boolean {
  return scrolled;
}

/** 배포 시 미리 만드는 단계에서는 스크롤이 있을 수 없습니다 */
export function getScrolledOnServer(): boolean {
  return false;
}
