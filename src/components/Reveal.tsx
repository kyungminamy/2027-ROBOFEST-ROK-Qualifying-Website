"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================================
 *  아래에서 위로 떠오르며 나타나는 효과 (스크롤에 반응)
 *
 *  홈의 종목 카드와 일정 목록에 쓰입니다.
 *  참고한 화면: robotworld.or.kr (AOS 라이브러리의 'fade-up')
 *
 *  ★★★ 자바스크립트가 없으면 '처음부터 다 보입니다' (가장 중요) ★★★
 *
 *   흔한 방식은 CSS 로 opacity: 0 을 걸어 두고 자바스크립트가 보이게
 *   만드는 것입니다. 이 사이트에서는 그렇게 하면 안 됩니다.
 *   학교 인터넷에서 자바스크립트가 막히면 종목 카드 8장과 일정이
 *   영영 안 보이게 됩니다. 대회 안내가 통째로 사라지는 셈입니다.
 *
 *   그래서 순서를 거꾸로 했습니다.
 *     · 처음 그려질 때  → 그냥 보입니다 (숨기지 않습니다)
 *     · 자바스크립트가 살아 있을 때만 → 잠깐 숨겼다가 떠오르게 합니다
 *
 *   ⚠️ 이 파일의 opacity/transform 을 globals.css 로 옮기지 마세요.
 *      CSS 로 옮기는 순간 자바스크립트가 막힌 사람에게 내용이
 *      사라집니다. 반드시 자바스크립트가 켜져 있을 때만 숨겨야 합니다.
 *
 *  【 언제 움직이나 】
 *   화면에 들어올 때마다 다시 떠오릅니다. (참고한 사이트와 같은 동작입니다)
 *
 *   ℹ️ 되돌리는(다시 숨기는) 시점이 중요해서 관찰자를 두 개 씁니다.
 *      · 떠오르기 → 화면 아래에서 조금(15%) 올라왔을 때
 *      · 다시 숨기기 → 화면에서 '완전히' 벗어났을 때
 *      하나로 합치면, 화면 맨 아래에 걸쳐 있는 항목이 보는 중에
 *      스르륵 사라집니다. ⚠️ 두 개를 하나로 합치지 마세요.
 *
 *   ℹ️ 페이지가 열린 순간 이미 보이는 항목은 건드리지 않습니다.
 *      이미 읽고 있는 내용이 갑자기 사라졌다 나타나면 고장처럼 보입니다.
 *
 *  【 '동작 줄이기'를 켠 분 】
 *   운영체제에서 동작 줄이기를 켜 두면 아예 움직이지 않고 그냥 보입니다.
 *   ⚠️ 지우지 마세요.
 * ========================================================================== */

/** 떠오르는 데 걸리는 시간 (밀리초) */
const DURATION_MS = 700;

/** 아래에서 얼마나 올라오는지 */
const TRAVEL = "1.75rem";

/** 화면 아래에서 이만큼 올라오면 시작합니다 */
const ENTER_MARGIN = "0px 0px -15% 0px";

/** 끝으로 갈수록 천천히 멈추는 곡선 (globals.css 의 .rise 와 같은 값) */
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/* --------------------------------------------------------------------------
 *  지금 화면을 내리는 중인지 올리는 중인지 기억해 둡니다
 *
 *  ★ 왜 필요한가 ★
 *   떠오르는 효과는 '내려가면서 처음 보는' 순간에만 어울립니다.
 *   위로 올라갈 때도 매번 떠오르면, 이미 읽고 지나온 내용이 아래에서
 *   다시 올라오는 셈이라 방향이 거꾸로여서 어지럽습니다.
 *   그래서 올라가는 중에 다시 보이는 것은 '움직임 없이 그냥' 보여 줍니다.
 *
 *  ℹ️ 스크롤 감시는 이 파일에 딱 하나만 둡니다. Reveal 이 화면에 수십 개
 *     있어도 감시자는 하나입니다. 항목마다 하나씩 달면 스크롤이 버벅입니다.
 * ------------------------------------------------------------------------ */
let scrollingUp = false;
let watching = false;

function watchScrollDirection() {
  if (watching || typeof window === "undefined") return;
  watching = true;

  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      /* 같은 값이면 방향을 바꾸지 않고 그대로 둡니다 */
      if (y < lastY) scrollingUp = true;
      else if (y > lastY) scrollingUp = false;
      lastY = y;
    },
    { passive: true },
  );
}

export function Reveal({
  children,
  className,
  /** 여러 개를 조금씩 시간차로 띄울 때 씁니다 (밀리초) */
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  /* ⚠️ 처음은 반드시 false(=보이는 상태)입니다. 위 설명을 보세요. */
  const [hidden, setHidden] = useState(false);
  /* true 면 '움직이지 않고 즉시' 보여 줍니다 (위로 올라갈 때) */
  const [instant, setInstant] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver !== "function") return;

    /* 동작 줄이기를 켠 분에게는 움직이지 않습니다 */
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    /* 열린 순간 이미 보이는 중이면 그대로 둡니다 */
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    watchScrollDirection();
    setHidden(true);

    /* 1) 나타나기 — 화면 아래에서 조금 올라왔을 때
          ★ 내려가는 중이면 떠오르고, 올라가는 중이면 그냥 보입니다 ★
            (위로 올라갈 때 떠오르면 방향이 거꾸로여서 어지럽습니다) */
    const enter = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setInstant(scrollingUp);
        setHidden(false);
      },
      { rootMargin: ENTER_MARGIN },
    );

    /* 2) 다시 숨기기 — 화면에서 완전히 벗어났을 때만.
          (보이는 중에 숨기면 눈앞에서 사라져 고장처럼 보입니다) */
    const leave = new IntersectionObserver((entries) => {
      if (entries[0] && !entries[0].isIntersecting) setHidden(true);
    });

    enter.observe(el);
    leave.observe(el);

    return () => {
      enter.disconnect();
      leave.disconnect();
    };
  }, []);

  return (
    <div
      ref={box}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${TRAVEL})` : "none",
        /* transition: none 이면 위 값이 곧바로 적용됩니다(=움직임 없음).
           ℹ️ 값이 바뀌는 시점에 transition 이 켜져 있으면 브라우저가
              알아서 부드럽게 잇습니다. 그래서 '켜고/끄고'만으로
              움직임 여부가 정해집니다. */
        transition: instant
          ? "none"
          : `opacity ${DURATION_MS}ms ${EASING} ${delayMs}ms, transform ${DURATION_MS}ms ${EASING} ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
