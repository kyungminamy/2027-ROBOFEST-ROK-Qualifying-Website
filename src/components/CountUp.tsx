"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================================
 *  숫자가 올라가서 제 값에 멈추는 효과
 *
 *  ★ 숫자 자체는 config/competition.ts 에서 옵니다 ★
 *    이 파일은 '어떻게 보여줄지'만 담당합니다. 값을 여기에 적지 마세요.
 *
 *  ★★★ 자바스크립트가 없어도 숫자는 보입니다 (중요) ★★★
 *
 *   처음 그려지는 화면에는 '완성된 숫자'가 들어갑니다. 시작 숫자가
 *   아닙니다. 학교 인터넷에서 자바스크립트가 막히거나 오래된 브라우저에서
 *   열면 움직임만 없고 숫자는 제대로 보입니다.
 *   ⚠️ 처음 값을 시작 숫자로 바꾸지 마세요. 그러면 자바스크립트가 막힌
 *      사람에게는 '1000년', '10,000명' 처럼 틀린 숫자가 남습니다.
 *
 *  【 어디서부터 올라가나 — 0 이 아닙니다 】
 *   자릿수가 같은 가장 작은 수에서 시작합니다.
 *     1999  → 1000 부터
 *     39    → 10 부터
 *     38700 → 10000 부터
 *   0 부터 세면 자릿수가 계속 늘어나 숫자 폭이 출렁이고, 특히 연도가
 *   '7년 → 58년 → 1999년' 처럼 말이 안 되는 값을 지나갑니다.
 *   자릿수를 고정하면 처음부터 끝까지 그럴듯한 숫자만 지나갑니다.
 *
 *  【 언제 움직이나 — 볼 때마다 】
 *   화면에 들어올 때마다 다시 움직입니다. 한 번만 하지 않습니다.
 *
 *   되돌리는 시점이 중요합니다. 화면에서 '완전히' 벗어났을 때 시작 숫자로
 *   돌려 놓습니다. 아직 조금이라도 보이는 동안 돌려 놓으면 숫자가 뒤로
 *   뛰는 것이 눈에 보여 고장처럼 느껴집니다.
 *   ⚠️ 되돌리는 조건을 '80% 아래로 내려가면'으로 바꾸지 마세요.
 *      그러면 화면에 반쯤 보이는 상태에서 숫자가 뒤로 튑니다.
 *
 *   ℹ️ 화면에 이미 보이는 상태로 페이지가 열렸다면 그때는 움직이지 않고
 *      완성된 숫자를 그대로 둡니다. (같은 이유 — 이미 읽은 숫자가 뒤로
 *      돌아가면 안 됩니다) 한 번 스크롤해서 내보냈다 다시 보면 움직입니다.
 *
 *  【 '동작 줄이기'를 켠 분 】
 *   운영체제에서 동작 줄이기를 켜 두면 아예 움직이지 않습니다.
 *   움직이는 화면에 어지러움을 느끼는 분이 있습니다. ⚠️ 지우지 마세요.
 *
 *  【 화면 낭독기 】
 *   올라가는 중인 숫자는 읽지 않도록 감추고, 완성된 숫자를 따로 넣어
 *   둡니다. 그래야 낭독기가 지나가는 숫자를 읽지 않고 제 값만 읽습니다.
 * ========================================================================== */

/** 숫자가 올라가는 데 걸리는 시간 (밀리초) */
const DURATION_MS = 1400;

/** 이만큼 보이면 올라가기 시작합니다 (0.8 = 80%) */
const START_AT = 0.8;

/** 처음엔 빠르게, 끝에서 천천히 — 제 값에 '내려앉는' 느낌을 줍니다 */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({ value }: { value: string }) {
  /* config 값에서 숫자만 뽑습니다. ('38,700' → 38700) */
  const target = Number(value.replace(/[^0-9]/g, ""));

  /* 숫자로 읽을 수 없는 값이면(예: '약 40', '100+') 그대로 보여 줍니다.
     억지로 움직이려다 화면이 깨지는 것보다 안전합니다. */
  const canAnimate = value !== "" && Number.isFinite(target) && target > 0;

  /* 자릿수가 같은 가장 작은 수 = 10의 (자릿수-1) 제곱
       1999(4자리) → 1000,  39(2자리) → 10,  38700(5자리) → 10000
     ℹ️ 값이 딱 1000·10000 처럼 시작 숫자와 같으면 올라갈 구간이 없어
        움직이지 않습니다. 지금 네 숫자에는 해당하지 않습니다. */
  const startFrom = Math.pow(10, String(target).length - 1);

  /* 콤마를 넣을지 말지는 config 에 적힌 모양을 따릅니다.
     ★ 이게 없으면 '1999년'이 '1,999년'이 됩니다 ★
       연도에는 콤마를 넣지 않고, 사람 수에는 넣어야 합니다. */
  const useComma = value.includes(",");
  const format = (n: number) =>
    useComma ? n.toLocaleString("en-US") : String(n);

  /* ⚠️ 처음 값은 반드시 '완성된 숫자'입니다. 위 설명을 보세요. */
  const [shown, setShown] = useState<string>(value);
  const holder = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!canAnimate || startFrom >= target) return;

    const el = holder.current;
    if (!el || typeof IntersectionObserver !== "function") return;

    /* 동작 줄이기를 켠 분에게는 움직이지 않습니다 */
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION_MS, 1);
      const n = Math.round(startFrom + (target - startFrom) * easeOut(t));

      /* 마지막 한 칸은 config 값을 글자 그대로 씁니다.
         계산한 숫자를 다시 꾸미다가 원래 표기와 어긋나는 일을 막습니다. */
      setShown(t >= 1 ? value : format(n));

      if (t < 1) raf = requestAnimationFrame(step);
    };

    const run = () => {
      cancelAnimationFrame(raf);
      start = 0;
      setShown(format(startFrom));
      raf = requestAnimationFrame(step);
    };

    /* 페이지가 열린 순간 이미 보이는 중이면 건드리지 않습니다.
       (이미 읽은 숫자를 뒤로 돌리지 않기 위해) */
    const box = el.getBoundingClientRect();
    let visibleNow = box.top < window.innerHeight && box.bottom > 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        /* 완전히 벗어났을 때 시작 숫자로 되돌립니다.
           이때는 화면에 안 보이므로 뒤로 뛰는 것이 보이지 않습니다. */
        if (!entry.isIntersecting) {
          cancelAnimationFrame(raf);
          setShown(format(startFrom));
          visibleNow = false;
          return;
        }

        /* 충분히 보이면 올라갑니다.
           visibleNow 는 '열린 순간부터 계속 보이던 중'을 걸러 냅니다. */
        if (entry.intersectionRatio >= START_AT && !visibleNow) {
          visibleNow = true;
          run();
        }
      },
      { threshold: [0, START_AT] },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- format 은 매 렌더 새로 만들어지지만 하는 일이 늘 같습니다. 넣으면 관찰자가 매번 다시 붙습니다.
  }, [canAnimate, target, startFrom, value, useComma]);

  return (
    <span ref={holder}>
      {/* 눈으로 보는 숫자 — 낭독기에는 감춥니다 */}
      <span aria-hidden="true">{shown}</span>

      {/* 낭독기가 읽는 값 — 언제나 제 값입니다.
          ⚠️ aria-live 를 넣지 마세요. 올라가는 숫자를 하나하나 읽어
             주게 되어 아무 말도 알아들을 수 없게 됩니다. */}
      <span className="sr-only">{value}</span>
    </span>
  );
}
