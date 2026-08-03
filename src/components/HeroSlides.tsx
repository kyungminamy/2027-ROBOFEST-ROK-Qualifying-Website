"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIsClient } from "@/lib/useIsClient";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "@/components/icons";

/* ============================================================================
 *  첫 화면 배경 사진 슬라이드쇼
 *
 *  ★ 사진 목록과 넘김 간격은 config/competition.ts 에서 정합니다. ★
 *    (heroSlides, heroSlideIntervalMs)
 *    이 파일은 '어떻게 넘길지'만 담당합니다.
 *
 *  ★★★ 자바스크립트가 막혀 있어도 깨지지 않습니다 (중요) ★★★
 *
 *   학교 인터넷에서는 자바스크립트가 막히는 경우가 있습니다.
 *   그때는 이렇게 동작합니다.
 *     · 첫 번째 사진 한 장이 그대로 보입니다 (배경이 비지 않습니다)
 *     · 넘김 버튼은 아예 나타나지 않습니다
 *       → 눌러도 아무 일 없는 버튼을 만들지 않기 위한 규칙입니다
 *   버튼은 useIsClient() 가 true 가 된 뒤에만 그려집니다.
 *
 *  ★ 사진은 '보여준 것만' 내려받습니다 ★
 *   처음에는 첫 장만 내려받고, 넘어갈 때 그 다음 장을 받습니다.
 *   휴대폰 데이터를 아끼기 위한 것입니다. (3장을 한꺼번에 받으면 약 340KB)
 *
 *  ★ 움직임을 줄이도록 설정한 분에게는 자동으로 넘기지 않습니다 ★
 *   (운영체제의 '동작 줄이기' 설정. 멀미를 느끼는 분들을 위한 배려입니다)
 *   대신 멈춤 상태로 시작하고, 직접 버튼을 눌러 넘길 수 있습니다.
 * ========================================================================== */

export type HeroSlide = {
  wide: string;
  small: string;
  positionWide: string;
  positionSmall: string;
  alt: string;
};

export function HeroSlides({
  slides,
  intervalMs,
  children,
}: {
  slides: readonly HeroSlide[];
  intervalMs: number;
  /** 사진 위에 얹을 글 (대회명·날짜·신청 버튼) */
  children: React.ReactNode;
}) {
  const isClient = useIsClient();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /* 이미 보여준 사진 번호. 여기에 든 것만 실제로 내려받습니다. */
  const [seen, setSeen] = useState<number[]>([0]);

  /* 사진이 2장 이상일 때만 넘김 버튼과 자동 넘김이 의미가 있습니다 */
  const many = slides.length > 1;

  const go = useCallback(
    (next: number) => {
      const wrapped = (next + slides.length) % slides.length;
      setIndex(wrapped);
      setSeen((prev) => (prev.includes(wrapped) ? prev : [...prev, wrapped]));
    },
    [slides.length],
  );

  /* '동작 줄이기'를 켠 분에게는 처음부터 멈춘 상태로 둡니다 */
  const askedForLessMotion = useRef(false);
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      askedForLessMotion.current = true;
      setPaused(true);
    }
  }, []);

  /* 자동 넘김 — 멈춤 상태이거나 사진이 1장이면 돌지 않습니다.
     index 가 바뀔 때마다 타이머를 다시 겁니다. 그래서 버튼으로 직접
     넘기면 그 시점부터 다시 7초를 셉니다. */
  useEffect(() => {
    if (!many || paused) return;
    const timer = window.setTimeout(() => go(index + 1), intervalMs);
    return () => window.clearTimeout(timer);
  }, [index, paused, many, intervalMs, go]);

  const buttonBase =
    "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-white/80 transition-colors hover:text-white";

  return (
    <>
      {/* ------------------------------------------------------- 배경 사진 */}
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((slide, i) => (
          <div
            key={slide.wide}
            className={`hero-photo absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={
              /* 아직 보여준 적 없는 사진은 주소를 넣지 않습니다(= 안 받습니다) */
              seen.includes(i)
                ? ({
                    "--hero-image-wide": `url(${slide.wide})`,
                    "--hero-image-small": `url(${slide.small})`,
                    "--hero-pos-wide": slide.positionWide,
                    "--hero-pos-small": slide.positionSmall,
                  } as React.CSSProperties)
                : undefined
            }
          />
        ))}
      </div>

      {/* --------------------------------------------------------- 글·버튼 */}
      <div className="relative w-full px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl py-14 sm:py-20 lg:py-24">
          {/* 넘김 조작줄 — 자바스크립트가 동작할 때만 나타납니다.
              사진이 1장뿐이면 넘길 것이 없으므로 나타나지 않습니다. */}
          {isClient && many && (
            <div className="mb-7 flex items-center gap-3 sm:mb-8 sm:gap-4">
              {/* 다음 사진까지 남은 시간 막대 */}
              <div
                className="h-[3px] w-20 overflow-hidden rounded-full bg-white/25 sm:w-28"
                aria-hidden="true"
              >
                <div
                  /* key 에 index 를 넣어, 사진이 바뀔 때마다 막대를
                     처음부터 다시 채우게 합니다 */
                  key={index}
                  className="hero-progress h-full w-full bg-accent-500"
                  style={{
                    animationDuration: `${intervalMs}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => go(index - 1)}
                className={buttonBase}
                aria-label="이전 사진"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* 지금 몇 번째 사진인지.
                  aria-live: 사진이 바뀌면 화면 낭독기가 알려 줍니다. */}
              <p
                className="tabular text-sm font-bold"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-accent-500">{index + 1}</span>
                <span className="text-white/60"> / {slides.length}</span>
                {/* 낭독기에만 읽히는 사진 설명 */}
                <span className="sr-only">. {slides[index].alt}</span>
              </p>

              <button
                type="button"
                onClick={() => go(index + 1)}
                className={buttonBase}
                aria-label="다음 사진"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className={buttonBase}
                aria-label={
                  paused ? "사진 자동 넘김 다시 시작" : "사진 자동 넘김 멈춤"
                }
                aria-pressed={paused}
              >
                {paused ? (
                  <Play className="h-5 w-5" />
                ) : (
                  <Pause className="h-5 w-5" />
                )}
              </button>
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  );
}
