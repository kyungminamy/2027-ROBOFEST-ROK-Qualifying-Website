"use client";

import { useEffect, useRef } from "react";

/* ============================================================================
 *  안에 있는 칸들이 1 → 2 → 3 → 4 순서로 하나씩 나타납니다
 *
 *  지금은 'ROBOFEST 소개(/about)' 의 '참가부터 세계대회까지' 타임라인
 *  한 곳에서만 씁니다.
 *
 *  ★★★ Reveal.tsx 와 무엇이 다른가 (헷갈리기 쉽습니다) ★★★
 *
 *    Reveal              이 파일(SequentialReveal)
 *    ─────────────────   ──────────────────────────────────
 *    칸마다 하나씩 감쌈    묶음(<ol>) 하나를 감쌈
 *    칸마다 관찰자        관찰자 하나 (묶음 전체)
 *    화면에 들어올 때마다   딱 한 번 (그 뒤 관찰자를 끊습니다)
 *      다시 떠오름
 *    inline style 로 처리  **클래스**로 처리 (globals.css 의 .seq-reveal)
 *    0.7초 / 1.75rem      0.4초 / 8px
 *
 *   ⚠️ 둘을 합치려 하지 마세요. 홈 화면 카드들은 Reveal 의 '들어올 때마다
 *      다시 떠오르는' 동작을 그대로 써야 합니다.
 *
 *  【 왜 묶음 하나만 관찰하나 】
 *   담당자 요구사항이 '**섹션이** 화면에 들어올 때 1→2→3→4 로 이어서
 *   나타난다' 입니다. 칸마다 관찰자를 두면 휴대폰처럼 세로로 쌓인 화면에서
 *   칸이 제각각 따로 나타나서, 이어지는 느낌이 사라집니다.
 *
 *  ★★★ 자바스크립트가 없으면 '처음부터 다 보입니다' ★★★
 *   숨기는 것은 globals.css 의 `.seq-reveal > *` 규칙인데, 그 클래스는
 *   아래 useEffect 가 붙입니다. 자바스크립트가 막히면 클래스가 붙지 않고,
 *   따라서 카드는 그냥 보입니다.
 *   ⚠️ .seq-reveal 을 JSX 의 className 에 직접 적지 마세요. 그 순간
 *      자바스크립트가 막힌 사람에게 카드가 사라집니다.
 *
 *  【 '동작 줄이기'를 켠 분 】
 *   운영체제에서 동작 줄이기를 켜 두면 클래스를 아예 붙이지 않습니다.
 *   움직임 없이 처음부터 보입니다. ⚠️ 지우지 마세요 (접근성 필수).
 * ========================================================================== */

/** 화면 아래에서 이만큼 올라오면 시작합니다 (Reveal 과 같은 값) */
const ENTER_MARGIN = "0px 0px -15% 0px";

export function SequentialReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const box = useRef<HTMLOListElement>(null);

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
    el.classList.add("seq-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        el.classList.add("is-in");
        /* ★ 한 번 나타나면 관찰을 끝냅니다 ★
             다시 스크롤해도 되풀이되지 않습니다. */
        io.disconnect();
      },
      { rootMargin: ENTER_MARGIN },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={box} className={className}>
      {children}
    </ol>
  );
}
