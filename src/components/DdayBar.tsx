"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { competition } from "@/config/competition";
import { countdownFor, type CountdownView } from "@/lib/countdown";
import { msUntilNextSeoulMidnight, todayInSeoul } from "@/lib/dday";
import {
  getScrolled,
  getScrolledOnServer,
  subscribeScrolled,
} from "@/lib/scrolled";
import { ChevronRight } from "@/components/icons";
import { edgePadding } from "@/lib/layout";

/* ============================================================================
 *  화면 맨 위 남은 날짜 띠 + 상단 메뉴 안의 작은 표
 *
 *  ★ 문구와 날짜는 config/competition.ts 에서 정합니다 ★
 *    · 날짜 → registration.opensAt / closesAt, dates.day1 / day2
 *    · 문구 → countdown
 *    계산은 src/lib/countdown.ts, 이 파일은 '어떻게 보이나'만 담당합니다.
 *
 *  ★★★ 이 띠는 화면에 붙어 있지 않습니다 (sticky 아님) ★★★
 *   상단 메뉴 '위'의 보통 자리에 있어서, 화면을 내리면 그냥 위로 밀려
 *   올라가 사라집니다. 그다음부터는 상단 메뉴만 붙어 있습니다.
 *   ⚠️ 여기에 sticky 를 붙이지 마세요. 붙이는 순간 휴대폰 화면에서
 *      메뉴(52px)와 이 띠(32px)가 계속 84px 를 차지합니다.
 *      대신 내려간 뒤에는 메뉴 안의 작은 표(DdayChip)가 그 일을 합니다.
 *
 *  ★★★ 왜 'use client' 인가 (지우지 마세요) ★★★
 *   이 사이트는 배포할 때 화면을 미리 만들어 둡니다. 남은 일수를 그때
 *   계산해 버리면 8월에 배포한 'D-26'이 11월에도 그대로 붙어 있습니다.
 *   그래서 방문자의 브라우저에서 계산합니다.
 *
 *  ℹ️ aria-live 를 쓰지 않습니다. 값이 바뀌는 것은 하루 한 번(자정)이라
 *     화면 낭독기에게 알릴 만한 변화가 아닙니다.
 * ========================================================================== */

/**
 * 날짜가 바뀌었을 때 React 에게 알려 주는 구독자.
 *
 * ⚠️ setInterval 로 바꾸지 마세요. 하루에 한 번만 바뀌는 값을 1초마다
 *    계산하게 됩니다. 타이머가 발화하면 '그다음 자정'을 다시 예약합니다.
 */
function subscribeDate(onChange: () => void): () => void {
  let timer: number | undefined;

  const scheduleMidnight = () => {
    /* 최소 1초 — 시계가 살짝 어긋나 0ms 가 나오면 타이머가 쉼 없이
       다시 걸리게 됩니다. */
    const wait = Math.max(1000, msUntilNextSeoulMidnight());
    timer = window.setTimeout(() => {
      onChange();
      scheduleMidnight();
    }, wait);
  };

  scheduleMidnight();

  /* 절전에서 깨어나거나 다른 탭에서 돌아오면 타이머가 밀려 있을 수 있습니다 */
  document.addEventListener("visibilitychange", onChange);
  window.addEventListener("focus", onChange);

  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onChange);
    window.removeEventListener("focus", onChange);
  };
}

/** 배포 시 미리 만드는 단계에서는 오늘이 언제인지 알 수 없습니다 */
const noDateYet = () => null;

function useCountdown(): CountdownView | null {
  const today = useSyncExternalStore(subscribeDate, todayInSeoul, noDateYet);
  return today === null ? null : countdownFor(today);
}

function useScrolled(): boolean {
  return useSyncExternalStore(
    subscribeScrolled,
    getScrolled,
    getScrolledOnServer,
  );
}

/* ==========================================================================
 *  띠 안의 '말 + 숫자' 한 쌍
 *
 *  ★ 굵기는 400 과 700 만 씁니다 (지우지 마세요) ★
 *   이 사이트는 Pretendard 를 보통(400)과 굵게(700) 두 가지만 싣습니다.
 *   font-medium(500)이나 font-semibold(600)을 쓰면 브라우저가 없는 굵기를
 *   흉내 내서 그리는데, 바로 옆 진짜 700 과 나란히 놓이면 뭉개져 보입니다.
 *   (src/app/layout.tsx 의 글꼴 설명 참고)
 *
 *  대비(#0e2547 위에서 직접 계산):
 *    흰 글자        15.3:1
 *    white/65        7.2:1   (말)
 *    accent-200     10.5:1   (접수 시작 뒤 숫자)
 *  ⚠️ 숫자에 accent-600(#c2410c)을 쓰지 마세요. 이 남색 위에서 2.9:1 로
 *     기준(4.5:1)에 한참 못 미칩니다. 흰 바탕의 '참가 신청' 단추에서나
 *     쓸 수 있는 색입니다.
 * ========================================================================== */
function Pair({
  label,
  value,
  hot,
}: {
  label: string;
  value: string;
  hot: boolean;
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-[12px] text-white/65 sm:text-[13px]">{label}</span>
      {/* ⚠️ tabular 를 지우지 마세요. 없으면 D-10 → D-9 로 자릿수가 줄어드는
             날 띠 전체가 좌우로 흔들립니다. */}
      <span
        className={`tabular text-[14px] font-bold sm:text-[15px] ${
          hot ? "text-accent-200" : "text-white"
        }`}
      >
        {value}
      </span>
    </span>
  );
}

/* ==========================================================================
 *  ① 맨 위 띠 — 화면을 내리면 그냥 위로 사라집니다
 * ========================================================================== */
export function DdayBar() {
  const view = useCountdown();

  return (
    /* 높이는 globals.css 의 --dday-h 한 곳에서 정합니다 (32px / 36px).
       ★ 첫 화면(Hero)의 높이 계산도 같은 값을 씁니다 ★
         그래서 여기 숫자를 직접 적지 마세요. 두 곳에 적으면 한쪽만
         고쳐서 첫 화면이 넘치거나 모자라게 됩니다.

       bg-brand-900: 꼬리말과 같은 남색이고, '꽉 찬' 색입니다.
       ⚠️ 반투명(bg-brand-900/80 등)으로 바꾸지 마세요. 바로 아래 상단
          메뉴가 이미 반투명 유리(nav-glass)라, 유리 위에 유리를 겹치면
          둘 다 탁해 보입니다. */
    <div className="h-[var(--dday-h)] bg-brand-900 text-white">
      <Link
        href="/schedule"
        /* ★ 띠 전체가 링크입니다 ★ 안에 따로 단추를 두지 않았습니다.
           작은 표적을 여러 개 두는 것보다 띠 하나를 통째로 누르게 하는
           편이 휴대폰에서 훨씬 정확합니다.
           ⚠️ 닫기(X) 단추를 넣지 마세요 — 닫힌 상태를 기억하려면 저장이
              필요하고, 이 띠는 내리면 어차피 사라집니다. */
        className={`flex h-full items-center justify-center gap-3 ${edgePadding}`}
      >
        {view && (
          <>
            {view.primary && (
              <Pair
                label={view.primary.label}
                value={view.primary.display}
                /* ★ 9월 1일 전에는 주황이 나오지 않습니다 ★
                   접수가 열린 뒤에만 숫자 색이 바뀝니다. 그 전까지 이
                   화면의 주황은 '참가 신청' 단추 하나뿐입니다. */
                hot={view.isOpen}
              />
            )}

            {/* 가운데 세로 선. 좁은 화면에서는 오른쪽 짝과 함께 숨습니다. */}
            {view.secondary && (
              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-white/15 sm:block"
              />
            )}

            {/* ★ 640px 미만에서는 접수만 보여 줍니다 ★
                좁은 화면에 둘을 다 넣으면 글자가 줄바꿈되어 띠 높이가
                무너집니다. 급한 쪽은 접수입니다. */}
            {view.secondary && (
              <span className="hidden sm:inline-flex">
                <Pair
                  label={view.secondary.label}
                  value={view.secondary.display}
                  hot={false}
                />
              </span>
            )}

            {/* 숫자가 없는 시기(대회 당일·종료 뒤)에는 상태만 알립니다 */}
            {!view.primary && view.note && (
              <span className="text-[13px] font-bold sm:text-[14px]">
                {view.note}
              </span>
            )}
          </>
        )}

        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/65" />
      </Link>
    </div>
  );
}

/* ==========================================================================
 *  ② 상단 메뉴 안의 작은 표 — 내렸을 때만 나타납니다
 *
 *  ★ 여기는 흰 바탕입니다 ★ 위 띠와 색이 다른 이유입니다.
 *    brand-700  흰 바탕 대비 10:1
 *    accent-600 흰 바탕 대비 5.1:1 (접수 시작 뒤)
 * ========================================================================== */
export function DdayChip() {
  const view = useCountdown();
  const scrolled = useScrolled();

  const value = view?.primary?.display ?? null;
  const show = scrolled && value !== null;

  return (
    /* ★ 왜 숨기지 않고 폭을 0 으로 만드나 ★
       display:none 으로 껐다 켜면 나타나는 순간 옆의 '참가 신청' 단추가
       옆으로 튑니다. 폭을 0에서 늘리면 밀려나는 것이 아니라 자리가
       생기면서 열립니다.

       motion-reduce: 움직임을 싫어하는 설정에서는 폭이 늘어나는 움직임
       없이 흐림만으로 바뀝니다. */
    <span
      aria-hidden={!show}
      className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-out motion-reduce:transition-[opacity] ${
        show ? "max-w-[7rem] opacity-100" : "max-w-0 opacity-0"
      }`}
    >
      {/* ★ 주황(accent-600) — 흰 바탕 대비 5.1:1 로 기준을 넘습니다 ★
             ℹ️ 2026-08-06 담당자 요청. 그전에는 접수가 열리기 전까지
                남색(brand-700)이었다가 9월 1일에 주황으로 바뀌었습니다.
                이제는 늘 주황이라, 이 표의 색은 더 이상 '접수가 열렸다'는
                신호가 아닙니다. (그 신호는 맨 위 띠에 그대로 있습니다) */}
      <span className="tabular pl-2 text-[13px] font-bold text-accent-600 sm:text-[14px]">
        {value ?? competition.countdown.untilEvent}
      </span>
    </span>
  );
}
