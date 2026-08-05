"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "@/components/icons";

/* ============================================================================
 *  맨 위로 돌아가는 떠 있는 단추 (화면 오른쪽 아래)
 *
 *  왜 있나: 이 사이트는 화면이 깁니다. 아래까지 내려간 분이 메뉴로
 *  돌아가려면 한참을 다시 올려야 했습니다.
 *  (2026-08-05 부산광역시교육청 의견 — '플로팅 스크롤 버튼')
 *
 *  ★ 이 단추가 없어도 사이트는 멀쩡합니다 ★
 *   자바스크립트가 막힌 환경에서는 이 단추가 아예 나오지 않습니다.
 *   그래도 상단 메뉴가 늘 화면 맨 위에 붙어 있으므로(sticky) 이동에
 *   문제가 없습니다. '있으면 편한 것'이지 '없으면 안 되는 것'이 아닙니다.
 *
 *   반대로 첫 화면의 '아래로' 화살표는 자바스크립트 없이도 동작해야
 *   합니다. 그건 Hero.tsx 에 링크로 들어 있습니다.
 *
 *  ★ 왜 화면 '오른쪽 아래'인가 ★
 *   의견에는 '왼쪽 중간이나 하단'이라고 되어 있었지만, 왼쪽 중간에 두면
 *   휴대폰에서 화면을 넘길 때 엄지손가락에 눌립니다. 오른쪽 아래가
 *   가장 방해가 적습니다.
 * ========================================================================== */

/** 이만큼(px) 내려가면 단추가 나타납니다. 첫 화면을 지나는 정도. */
const SHOW_AFTER_PX = 600;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll(); // 새로고침으로 중간부터 시작한 경우를 위해 한 번 확인
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      /* scrollTo 는 globals.css 의 scroll-behavior 를 따릅니다.
         '동작 줄이기'를 켠 분에게는 그 설정에서 이미 부드러운 이동이
         꺼지므로, 여기서 따로 처리하지 않아도 됩니다. */
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="맨 위로"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-black/25 transition-colors hover:bg-brand-800 sm:bottom-7 sm:right-7"
    >
      {/* 아래를 가리키는 아이콘을 뒤집어 '위로'를 나타냅니다 */}
      <ChevronDown className="h-6 w-6 rotate-180" />
    </button>
  );
}
