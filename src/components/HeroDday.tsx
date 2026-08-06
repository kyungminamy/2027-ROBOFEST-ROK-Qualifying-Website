"use client";

import { useSyncExternalStore } from "react";
import {
  heroDdayLine,
  msUntilNextSeoulMidnight,
  todayInSeoul,
} from "@/lib/dday";

/* ============================================================================
 *  첫 화면 '참가 신청' 버튼 아래 한 줄 — 9월 1일(화) 접수 시작 · D-26
 *
 *  ★ 문구와 날짜는 config/competition.ts 에서 정합니다 ★
 *    · 날짜 → registration.opensAt / closesAt, dates.day1 / day2
 *    · 문구 → heroDday
 *    계산은 src/lib/dday.ts, 이 파일은 '어떻게 보이나'만 담당합니다.
 *
 *  ★★★ 왜 'use client' 인가 (지우지 마세요) ★★★
 *   이 사이트는 배포할 때 화면을 미리 만들어 둡니다. 남은 일수를 그때
 *   계산해 버리면 8월에 배포한 'D-26'이 11월에도 그대로 붙어 있습니다.
 *   그래서 방문자의 브라우저에서 계산합니다.
 *   자세한 설명은 src/lib/useIsClient.ts 에 있습니다.
 *
 *  ★★★ 왜 useEffect 가 아니라 useSyncExternalStore 인가 ★★★
 *   useEffect 안에서 setState 를 하면 화면을 한 번 그린 뒤 곧바로 다시
 *   그리게 되어 검사 규칙(react-hooks/set-state-in-effect)에 걸립니다.
 *   2026-08-05 에 HeroSlides 가 같은 문제로 이 방식으로 바뀌었습니다.
 *   덤으로 이 방식은 아래 네 가지를 한꺼번에 해결합니다.
 *     · 미리 만드는 단계에서는 null → 서버와 브라우저의 화면이 어긋나지 않음
 *     · 자정에 딱 한 번 다시 계산 (1초마다 시계를 보지 않습니다)
 *     · 다른 탭에 갔다 돌아오면 다시 계산
 *     · 노트북이 절전에서 깨어나면 다시 계산 (타이머가 밀리기 때문)
 * ========================================================================== */

/**
 * 날짜가 바뀌었을 때 React 에게 알려 주는 구독자.
 *
 * onChange 를 부르면 React 가 아래 getSnapshot 을 다시 읽습니다.
 * 날짜 문자열이 그대로면 화면을 다시 그리지 않습니다(공짜로 넘어갑니다).
 */
function subscribe(onChange: () => void): () => void {
  let timer: number | undefined;

  /* ⚠️ setInterval 로 바꾸지 마세요.
        하루에 한 번만 바뀌는 값을 1초마다 계산하게 됩니다.
        타이머가 발화하면 '그다음 자정'을 다시 예약합니다. */
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

  /* 절전에서 깨어나거나 다른 탭에서 돌아오면 타이머가 이미 밀려 있을 수
     있습니다. 그때는 곧바로 다시 계산합니다. */
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

export function HeroDday() {
  const today = useSyncExternalStore(subscribe, todayInSeoul, noDateYet);

  /* 미리 만드는 단계와 브라우저의 첫 그림에서는 아무것도 그리지 않습니다.
     (그래야 서버가 만든 화면과 브라우저의 화면이 똑같습니다) */
  if (today === null) return null;

  const line = heroDdayLine(today);

  /* 대회가 끝난 뒤에는 줄 자체가 사라집니다 */
  if (line === null) return null;

  /* ★ 새 색을 만들지 않았습니다 ★ 모두 히어로에서 이미 쓰는 색입니다.
       · quiet  — 흐린 흰색. 아직 아무 행동도 필요 없는 기간
       · normal — 접수 기간. D-숫자만 완전한 흰색으로 또렷하게
       · urgent — 마감 1주 전부터. 신청 버튼과 같은 주황 계열

     ⚠️ urgent 에 accent-500(#ea580c)을 쓰지 마세요.
        남색 배경 위에서 흰 글자 대비가 4.3:1 로 규정(4.5:1)에 미달합니다.
        accent-200 은 10.6:1 입니다. 같은 주황 계열이면서 읽힙니다. */
  const toneClass = {
    quiet: "text-white/60",
    normal: "text-white/80",
    urgent: "text-accent-200",
  }[line.tone];

  return (
    /* ★ 상자도 테두리도 배경도 없습니다. <p> 한 줄입니다 ★
         글자 크기는 바로 위 '대회기간' 줄과 같습니다(text-base / sm:text-lg).
         두 줄이 한 쌍으로 읽히도록 맞춘 것이므로 키우지 마세요.

       aria-live: 이 줄은 화면을 그린 뒤에 나타나므로, 화면 낭독기에게
       한 번 알려 줍니다. 'D-26' 만으로는 무슨 뜻인지 알 수 없어서
       날짜와 문구가 같은 문장에 함께 들어가 있습니다. */
    <p
      aria-live="polite"
      className={`rise rise-3 mt-4 text-base font-bold sm:text-lg ${toneClass}`}
    >
      {line.lead}
      {line.days !== null && (
        <>
          {" · "}
          {line.daysPrefix && `${line.daysPrefix} `}
          {/* ⚠️ tabular 를 지우지 마세요. 없으면 D-10 → D-9 로 자릿수가
                 줄어드는 날 줄 전체가 좌우로 흔들립니다.
                 (tabular = 모든 숫자를 같은 너비로 그림) */}
          <span className={line.tone === "normal" ? "tabular text-white" : "tabular"}>
            D-{line.days}
          </span>
        </>
      )}
    </p>
  );
}
