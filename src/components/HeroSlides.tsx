"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { useIsClient } from "@/lib/useIsClient";
import { edgePadding } from "@/lib/layout";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "@/components/icons";

/* ----------------------------------------------------------------------------
 *  운영체제의 '동작 줄이기(prefers-reduced-motion)' 설정을 읽습니다.
 *
 *  ★ 왜 useEffect 로 하지 않나 (2026-08-05) ★
 *   예전에는 useEffect 안에서 setPaused(true) 를 불렀습니다. 그러면 화면을
 *   한 번 그린 뒤 곧바로 다시 그리게 되어(cascading render), React 검사
 *   규칙(react-hooks/set-state-in-effect)에 걸렸습니다.
 *
 *   useSyncExternalStore 는 '그리는 도중에 값을 읽는' 방식이라 다시 그리지
 *   않습니다. src/lib/useIsClient.ts 와 같은 방식입니다.
 *
 *   세 번째 인자(() => false)는 '배포할 때 미리 만드는 단계'의 값입니다.
 *   그 단계에는 브라우저가 없어 설정을 알 수 없으므로 '안 켬'으로 봅니다.
 * -------------------------------------------------------------------------- */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () =>
      typeof window.matchMedia === "function" &&
      window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

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

  /* 멈춤 상태 = 사용자가 직접 누른 값이 있으면 그것, 없으면 OS 설정을 따릅니다.
     null 은 '아직 아무도 버튼을 누르지 않았다'는 뜻입니다. */
  const [pausedByUser, setPausedByUser] = useState<boolean | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const paused = pausedByUser ?? prefersReducedMotion;

  /* 이미 보여준 사진 번호. 여기에 든 것만 실제로 내려받습니다. */
  const [seen, setSeen] = useState<number[]>([0]);

  /* '다시 시작'을 누른 횟수 (2026-08-14).
     아래 남은 시간 막대의 key 에 들어갑니다. 값이 바뀌면 막대가 새로
     그려져서, 채워지던 것이 처음(빈 상태)부터 다시 시작합니다.
     ⚠️ 화면에 보이는 숫자가 아닙니다. 세는 것 자체가 목적이 아니라,
        '아까와 다른 값'이기만 하면 됩니다. 왜 필요한지는 바로 아래
        '멈췄다 다시 시작할 때' 설명을 보세요. */
  const [runId, setRunId] = useState(0);

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

  /* 자동 넘김 — 멈춤 상태이거나 사진이 1장이면 돌지 않습니다.
     index 가 바뀔 때마다 타이머를 다시 겁니다. 그래서 버튼으로 직접
     넘기면 그 시점부터 간격을 처음부터 다시 셉니다.
     ⚠️ 몇 초인지 여기에 적지 마세요. config 의 heroSlideIntervalMs 를
        고쳤을 때 이 설명만 옛날 숫자로 남습니다. (실제로 그런 적 있음)

     ★ 멈췄다 다시 시작하면 '처음부터' 다시 셉니다 (2026-08-14) ★
       멈추면 아래 return 이 돌아 타이머가 아예 없어지고, 다시 시작하면
       새 타이머를 겁니다. 남은 시간을 기억하지 않습니다.

       그런데 남은 시간 막대는 CSS 라서 성질이 반대입니다. 멈추면 그
       자리에 '얼어붙고', 다시 시작하면 얼었던 지점에서 이어집니다.
       그래서 넘어가기 직전(막대가 거의 다 찬 상태)에 멈췄다가 다시
       시작하면, 막대는 곧바로 끝까지 차서 멈춰 있는데 사진은 한 칸
       더 기다렸다 넘어갔습니다. 다 됐다고 해 놓고 아무 일도 일어나지
       않으니 고장 난 것처럼 보였습니다.

       고친 방법: 시계를 하나로 맞추는 대신, 둘 다 처음부터 다시
       시작하게 했습니다. 다시 시작을 누르면 runId 가 올라가고, 막대가
       새로 그려져 빈 상태에서 다시 채워집니다.
       ⚠️ 막대만, 또는 이 타이머만 한쪽을 고치면 그 어긋남이 그대로
          돌아옵니다. 두 곳은 같이 움직여야 합니다. */
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
      <div className={`relative w-full ${edgePadding}`}>
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
                     처음부터 다시 채우게 합니다.
                     runId 도 함께 넣습니다 — '다시 시작'을 누른 때에도
                     (사진은 그대로인데) 막대를 처음부터 채우기 위해서입니다.
                     자세한 이유는 위 자동 넘김 설명을 보세요. */
                  key={`${index}-${runId}`}
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
                /* 지금 보이는 상태(paused)의 반대로 바꿉니다.
                   pausedByUser 는 아직 null 일 수 있으므로 그 값을 뒤집으면
                   안 됩니다 (!null 은 true 라서, 멈춘 상태에서 눌러도
                   계속 멈춰 있게 됩니다). */
                onClick={() => {
                  const next = !paused;
                  setPausedByUser(next);
                  /* 다시 시작할 때만(멈출 때 말고) 막대를 처음부터
                     다시 채웁니다. 위 자동 넘김 타이머도 이때 새로
                     걸리므로, 둘이 같은 지점에서 함께 출발합니다. */
                  if (!next) setRunId((n) => n + 1);
                }}
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
