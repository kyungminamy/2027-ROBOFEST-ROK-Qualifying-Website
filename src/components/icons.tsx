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
