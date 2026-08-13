/* ============================================================================
 *  아이콘 — 직접 그린 SVG 도형입니다
 *
 *  ★ 왜 '→' 같은 글자를 안 쓰나 ★
 *   화살표를 글자로 넣으면 기기마다 모양과 크기가 제각각이고, 화면을 소리로
 *   읽어 주는 프로그램이 '오른쪽 화살표'라고 불필요하게 읽습니다.
 *   그래서 선 굵기(1.75)와 크기를 통일한 그림으로 그렸습니다.
 *
 *  ★ 색은 지정하지 않았습니다 ★
 *   currentColor = '옆에 있는 글자와 같은 색'. 그래서 어디에 놓아도
 *   글자색을 자동으로 따라갑니다. 색을 따로 지정하지 마세요.
 *
 *  ★ aria-hidden ★
 *   아이콘 옆에는 항상 설명하는 글자가 함께 있으므로, 화면 낭독기에는
 *   읽히지 않게 숨깁니다. 아이콘만 단독으로 쓰지 마세요.
 * ========================================================================== */

type IconProps = {
  /** 크기·여백은 tailwind 클래스로 지정합니다 (예: "h-4 w-4") */
  className?: string;
};

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

/** 오른쪽 화살표 — '자세히 보기' 같은 이동 링크에 씁니다 */
export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h13" />
      <path d="m12 6 6 6-6 6" />
    </svg>
  );
}

/** 새 창 표시 — 외부 사이트로 나가는 링크에 씁니다 */
export function ExternalLink({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 5h5v5" />
      <path d="m19 5-7 7" />
      <path d="M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
    </svg>
  );
}

/** 아래 꺾쇠 — 휴대폰 메뉴가 열고 닫히는 것을 알려 줍니다 */
export function ChevronDown({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** 왼쪽 꺾쇠 — 첫 화면 사진을 이전 것으로 넘길 때 */
export function ChevronLeft({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

/** 오른쪽 꺾쇠 — 첫 화면 사진을 다음 것으로 넘길 때 */
export function ChevronRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/** 일시정지 — 사진이 저절로 넘어가는 것을 멈춥니다 */
export function Pause({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 5v14" />
      <path d="M14 5v14" />
    </svg>
  );
}

/** 재생 — 멈춰 둔 슬라이드쇼를 다시 시작합니다 */
export function Play({ className }: IconProps) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

/* ============================================================================
 *  'ROBOFEST의 네 가지 원칙' 카드의 아이콘 (2026-08-13)
 *
 *  ★ 이 프로젝트에는 아이콘 라이브러리가 없습니다 ★
 *   lucide-react·heroicons·react-icons 중 무엇도 설치되어 있지 않고,
 *   package.json 의 의존성은 next / react / react-dom / vercel 두 개뿐입니다.
 *   담당자가 "새 아이콘 패키지를 설치하지 말 것" 이라고 했으므로, 위 아이콘들과
 *   같은 규격(viewBox 24 · 선 굵기 1.75 · currentColor)으로 여기에 그렸습니다.
 *
 *  ℹ️ 모양은 lucide 의 Bot · Wrench · MailOpen · Puzzle 을 따랐습니다
 *     (lucide 는 ISC 라이선스). 패키지를 받은 것이 아니라 같은 형태로
 *     그린 것이라, 설치할 것도 업데이트할 것도 없습니다.
 *
 *  ⚠️ 색을 이 파일에서 정하지 마세요. 위 설명대로 currentColor 를 쓰므로
 *     쓰는 쪽에서 text-brand-600 처럼 글자색으로 지정합니다.
 * ========================================================================== */

/** 로봇 — '100% 자율주행' */
export function Robot({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 8V4H8" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M9 13v2" />
      <path d="M15 13v2" />
    </svg>
  );
}

/** 렌치 — '학생이 직접 만듭니다' */
export function Wrench({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

/** 열린 봉투 — '당일 공개되는 미션' */
export function MailOpen({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  );
}

/** 퍼즐 조각 — '어떤 키트든, 어떤 언어든' */
export function Puzzle({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
    </svg>
  );
}
