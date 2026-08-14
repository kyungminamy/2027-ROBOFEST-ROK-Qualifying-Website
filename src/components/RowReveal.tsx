"use client";

import { useEffect, useRef } from "react";

/* ============================================================================
 *  안에 있는 칸들이 '줄 단위'로 나타납니다 (2026-08-14)
 *
 *  지금은 첫 화면(홈)의 '운영 종목' 카드 8장 한 곳에서만 씁니다.
 *
 *  ★★★ 무엇이 다른가 — 이 폴더에 비슷한 것이 셋 있습니다 ★★★
 *
 *    Reveal              SequentialReveal      이 파일(RowReveal)
 *    ─────────────────   ───────────────────   ─────────────────────────
 *    칸마다 하나씩 감쌈    묶음 하나를 감쌈       묶음 하나를 감쌈
 *    화면에 들어올 때마다   딱 한 번             딱 한 번
 *      다시 떠오름
 *    칸마다 시차          칸마다 시차 (CSS)      **같은 줄은 동시에**
 *    0.7초 / 1.75rem     0.4초 / 8px           0.4초 / 10px
 *
 *  【 왜 줄 단위인가 】
 *   예전에는 카드 8장이 하나씩 차례로 나타났습니다. 넓은 화면에서 한 줄에
 *   4장이 놓이는데도 그 4장이 하나씩 떴기 때문에, 마지막 카드가 뜰 때까지
 *   기다리는 느낌이 있었습니다. 같은 줄을 한꺼번에 띄우면 넓은 화면에서
 *   두 단계로 끝납니다.
 *
 *  ★★★ 몇 열인지는 하드코딩하지 않습니다 ★★★
 *   화면 폭에 따라 1·2·4열로 바뀌기 때문에, 나타나기 직전에 **실제로
 *   적용된 격자**(getComputedStyle 의 grid-template-columns)를 읽어서
 *   열 개수를 셉니다. 홈의 열 개수 설정(page.tsx)을 바꿔도 이 파일은
 *   고치지 않아도 됩니다.
 *   ⚠️ 열 개수를 이 파일에 숫자로 적지 마세요. 두 곳이 어긋나면 시차가
 *      줄과 맞지 않아 아무 규칙 없이 뜨는 것처럼 보입니다.
 *
 *  【 좁은 화면(1열)은 시차 없이 한꺼번에 】
 *   1열에서는 '한 줄 = 한 장'이라 줄 단위로 하면 8단계가 되어 예전보다
 *   더 답답해집니다. 그래서 1열일 때는 시차를 주지 않습니다.
 *   ⚠️ 이 예외를 지우지 마세요 (담당자 요구사항).
 *
 *  ★★★ 자바스크립트가 없으면 '처음부터 다 보입니다' ★★★
 *   숨기는 것은 globals.css 의 `.row-reveal > *` 규칙인데, 그 클래스는
 *   아래 useEffect 가 붙입니다. 자바스크립트가 막히면 클래스가 붙지 않고,
 *   따라서 카드 8장은 그냥 보입니다.
 *   ⚠️ .row-reveal 을 JSX 의 className 에 직접 적지 마세요. 그 순간
 *      자바스크립트가 막힌 사람에게 종목 카드가 통째로 사라집니다.
 *
 *  【 '동작 줄이기'를 켠 분 】
 *   운영체제에서 동작 줄이기를 켜 두면 클래스를 아예 붙이지 않습니다.
 *   움직임 없이 처음부터 보입니다. ⚠️ 지우지 마세요 (접근성 필수).
 * ========================================================================== */

/** 목록이 이만큼(15%) 화면에 들어오면 시작합니다 */
const VISIBLE_RATIO = 0.15;

/** 줄과 줄 사이 시차 (밀리초). 한 줄 안에서는 시차가 없습니다. */
const ROW_STEP_MS = 150;

export function RowReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const box = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver !== "function") return;

    /* 동작 줄이기를 켠 분에게는 숨기지도, 움직이지도 않습니다 */
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    /* 여기서 처음으로 숨겨집니다. 이 줄이 실행되지 않으면(=자바스크립트가
       막히면) 카드는 계속 보이는 상태입니다. */
    el.classList.add("row-reveal");

    /* ★★★ 이 한 줄을 지우지 마세요 — 지우면 효과가 통째로 안 돕니다 ★★★
     *
     *  offsetHeight 를 읽으면 브라우저가 '지금 당장' 스타일을 계산합니다.
     *  즉 위에서 숨긴 상태(opacity 0)가 이 시점에 확정됩니다.
     *
     *  【 없으면 무슨 일이 생기나 (2026-08-14 실제로 겪은 문제) 】
     *   섹션이 **이미 화면 안에 있는 채로** 이 코드가 실행되면 — 그 자리에서
     *   새로고침해 스크롤이 복원됐을 때가 대표적입니다 — 아래 관찰자가
     *   곧바로 반응해 is-in 을 붙입니다. 그러면 '숨김'과 '보임'이 한 번의
     *   스타일 계산 안에서 처리되어, 브라우저는 opacity 0 을 한 번도
     *   계산하지 않습니다. 시작값이 없으니 전환이 생략되고, 카드는 그냥
     *   처음부터 보입니다(= 애니메이션이 없는 것처럼 보입니다).
     *   실제로 195ms 에 숨김, 206ms 에 보임이 붙었는데 opacity 는 1.00 에서
     *   한 번도 내려가지 않았습니다.
     *
     *  ℹ️ requestAnimationFrame 으로 한 프레임 미루는 방법도 있지만, 다른
     *     탭에 가려져 있으면 rAF 가 멈추므로 카드가 영영 안 보일 수
     *     있습니다. 이 방식은 그런 위험이 없습니다. */
    void el.offsetHeight;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        /* 목록이 15% 이상 보일 때 시작합니다.
           ⚠️ 안전장치: 좁은 화면에서는 카드 8장이 세로로 쌓여 목록이 화면
              보다 훨씬 길어집니다. 그런 경우 비율이 15% 에 영영 못 닿아
              카드가 끝내 안 보일 수 있습니다. 그래서 '15% 에 닿을 수 없는
              길이'면 화면에 걸치기만 해도 시작하게 해 둡니다.
              ★ 이 갈래를 지우지 마세요 ★ 카드가 안 보이는 것은 이
                프로젝트에서 가장 나쁜 결과입니다. */
        const unreachable = entry.rootBounds
          ? entry.boundingClientRect.height * VISIBLE_RATIO >
            entry.rootBounds.height
          : false;
        if (entry.intersectionRatio < VISIBLE_RATIO && !unreachable) return;

        /* ★ 지금 몇 열인지 — 나타나기 '직전에' 잽니다 ★
             관찰을 시작한 뒤 창 크기가 바뀌었을 수도 있어서, 처음이 아니라
             이 순간의 값을 씁니다.
             grid-template-columns 는 실제 픽셀 값으로 계산되어 나옵니다.
             (예: 4열이면 "217px 217px 217px 217px" → 칸 4개)
             격자가 아니거나 값을 못 읽으면 "none" 이 되어 1이 됩니다.
             그때는 시차 없이 한꺼번에 나타납니다 — 안전한 쪽입니다. */
        const columns = window
          .getComputedStyle(el)
          .gridTemplateColumns.split(" ")
          .filter(Boolean).length;

        /* 줄 번호 = 카드 순번 ÷ 열 개수 (몫). 같은 몫이면 같은 줄입니다.
           1열일 때는 줄 단위가 곧 카드 단위라 시차를 주지 않습니다. */
        for (const [index, item] of [...el.children].entries()) {
          const row = columns > 1 ? Math.floor(index / columns) : 0;
          (item as HTMLElement).style.transitionDelay =
            `${row * ROW_STEP_MS}ms`;
        }

        el.classList.add("is-in");
        /* ★ 한 번 나타나면 관찰을 끝냅니다 ★
             다시 스크롤해도 되풀이되지 않습니다. */
        io.disconnect();
      },
      /* 0 도 함께 넣는 이유: 위 '안전장치'가 판단할 기회를 얻으려면,
         비율이 15% 에 닿지 못하더라도 화면에 걸치는 순간 한 번은
         불려야 합니다. */
      { threshold: [0, VISIBLE_RATIO] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={box} className={className}>
      {children}
    </ul>
  );
}
