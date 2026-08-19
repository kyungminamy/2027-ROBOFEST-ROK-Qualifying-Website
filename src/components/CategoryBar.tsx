"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { competition } from "@/config/competition";
import { container } from "@/lib/layout";

/* ============================================================================
 *  종목 사이를 바로 옮겨 다니는 띠 — 종목 상세 화면(8개)에서만 씁니다
 *
 *  ★ 왜 만들었나 (2026-08-19 담당자 요청) ★
 *   다른 종목을 보려면 '다른 종목 보기'로 목록에 돌아가 다시 찾아 내려가야
 *   했습니다. 8개 종목은 1번 다음에 2번이 오는 '순서가 있는 글'이 아니라
 *   **나란히 놓인 선택지**이므로, 어느 종목에서든 한 번 눌러 나머지 일곱 곳
 *   어디로든 갈 수 있어야 합니다.
 *
 *  ★★★ 화면에 붙이지 않습니다 (sticky·fixed 아님) ★★★
 *   그냥 제자리에 있는 띠라서, 화면을 내리면 위로 밀려 사라집니다.
 *   ⚠️ position: sticky 나 fixed 를 붙이지 마세요. 상단 메뉴가 이미 화면에
 *      붙어 있어서, 이 띠까지 붙으면 좁은 화면에서 위쪽 두 겹이 계속 자리를
 *      차지합니다 (담당자 지시).
 *
 *  ★ 종목 순서는 이 파일에 없습니다 ★
 *   config/competition.ts 의 categories 배열 순서를 그대로 씁니다.
 *   '종목 안내'(/categories)의 카드 목록도 같은 배열을 씁니다. 그래서 한
 *   곳만 고치면 목록과 이 띠의 순서가 함께 바뀝니다.
 *   ⚠️ 여기에 순서를 다시 적지 마세요. 두 곳에 적으면 목록과 띠가 서로 다른
 *      순서를 보여 주게 됩니다.
 *
 *  ★ 영문 이름만 씁니다 ★
 *   'Game 게임' 처럼 한글까지 넣으면 8개가 한 줄에 들어가지 않습니다.
 *   한글 이름은 바로 위 제목('Game 게임')에 이미 있습니다.
 *
 *  ★★★ 왜 'use client' 인가 ★★★
 *   딱 두 가지 때문입니다. 둘 다 없어도 띠는 그대로 동작합니다
 *   (자바스크립트가 막힌 학교 컴퓨터에서도 링크는 눌립니다).
 *     1) 좁은 화면에서 **지금 보고 있는 종목이 화면 안에 들어오도록**
 *        가로 스크롤 위치를 맞추는 일
 *     2) 좌우에 더 있을 때만 양끝을 옅게 흐리는 일
 * ========================================================================== */

export function CategoryBar({ currentSlug }: { currentSlug: string }) {
  /** 가로로 밀리는 칸 */
  const boxRef = useRef<HTMLDivElement>(null);
  /** 지금 보고 있는 종목 (링크가 아니라 글자) */
  const currentRef = useRef<HTMLSpanElement>(null);

  /* 양끝 페이드를 보일지 — 그 방향에 아직 볼 것이 남아 있을 때만 켭니다.
     ★ 처음 그릴 때는 둘 다 꺼져 있습니다 ★ 화면 폭을 알 수 없는 단계
       (배포할 때 미리 그리는 단계)에서는 넘치는지 알 수 없기 때문입니다.
       방문자 브라우저에서 바로 다시 계산합니다. */
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    /* ① 지금 보고 있는 종목을 칸 가운데로 끌어옵니다.
       ★ scrollIntoView 를 쓰지 않는 이유 ★
         그 함수는 위아래로도 움직일 수 있어서, 화면에 막 들어온 방문자가
         제목을 보기 전에 페이지가 스스로 내려가 버릴 수 있습니다.
         scrollLeft 를 직접 넣으면 좌우만 움직입니다.
       ℹ️ 좌표는 getBoundingClientRect 로 잽니다. offsetLeft 는 어느 조상이
          기준이 되는지에 따라 값이 달라져서 헷갈립니다. */
    const cur = currentRef.current;
    if (cur) {
      const boxRect = box.getBoundingClientRect();
      const curRect = cur.getBoundingClientRect();
      const middle = (box.clientWidth - curRect.width) / 2;
      box.scrollLeft += curRect.left - boxRect.left - middle;
    }

    /* ② 좌우에 더 있는지 보고 페이드를 켭니다.
       4px 여유: 브라우저가 소수점 단위로 재는 탓에, 끝까지 밀었는데도
       0.5px 쯤 남는 일이 있습니다. 그때 페이드가 계속 켜져 있게 됩니다. */
    const update = () => {
      const max = box.scrollWidth - box.clientWidth;
      setFadeLeft(box.scrollLeft > 4);
      setFadeRight(box.scrollLeft < max - 4);
    };
    update();

    box.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      box.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [currentSlug]);

  return (
    /* 바탕은 옅은 파랑(paper-soft) — 위 남색 머리띠와 아래 흰 로고 띠
       사이에서 '옮겨 다니는 줄'로 구분돼 보이게 합니다.
       ⚠️ 남색으로 바꾸지 마세요. 그러면 머리띠와 한 덩어리로 보여서
          누를 수 있는 줄이라는 것이 드러나지 않습니다. */
    <nav
      aria-label="종목 이동"
      className="border-b border-brand-100 bg-paper-soft"
    >
      <div className={container}>
        {/* relative: 아래 양끝 페이드를 이 칸 기준으로 얹습니다 */}
        <div className="relative">
          {/* ★ 가로로 밀리는 칸 ★
                · overflow-x-auto  — 넘치면 좌우로 밀립니다 (손가락·트랙패드)
                · 스크롤 막대는 숨깁니다. 파이어폭스는 scrollbar-width,
                  크롬·사파리는 ::-webkit-scrollbar 로 각각 껴야 합니다.
                  ⚠️ overflow-x-hidden 으로 바꾸지 마세요. 막대만 숨기는 것과
                     달리 **밀 수 없게** 됩니다.
                · overscroll-x-contain — 끝까지 밀었을 때 그 동작이 페이지
                  전체로 넘어가지 않게 합니다 (휴대폰에서 뒤로 가기 제스처가
                  걸리는 것을 막습니다).
             ★ 키보드로도 닿습니다 ★
               안에 링크 7개가 있어서 Tab 으로 지나갈 수 있고, 초점이 옮겨갈
               때 브라우저가 그 링크를 칸 안으로 저절로 밀어 넣습니다.
               ⚠️ 그래서 tabIndex 를 따로 주지 않았습니다. 주면 링크와 별개로
                  멈추는 자리가 하나 더 생겨 Tab 이 한 번 헛돕니다. */}
          <div
            ref={boxRef}
            className="overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* w-max: 안쪽 줄이 칸보다 넓어질 수 있게 합니다.
                ⚠️ flex-wrap 을 넣지 마세요. 좁은 화면에서 두 줄로 접히면
                   띠 높이가 두 배가 되어 본문을 밀어냅니다 (담당자 지시:
                   좁은 화면에서는 줄바꿈이 아니라 가로 스크롤). */}
            <ul className="flex w-max items-center gap-1 py-2">
              {competition.categories.map((category) => {
                const isCurrent = category.slug === currentSlug;

                /* 글자 크기·굵기·모양은 지금 보는 종목이든 아니든 같습니다.
                   그래야 강조가 켜지고 꺼질 때 줄의 폭이 흔들리지 않습니다. */
                const shape =
                  "inline-flex min-h-[36px] items-center whitespace-nowrap rounded-full px-3 text-sm font-bold";

                return (
                  <li key={category.slug}>
                    {isCurrent ? (
                      /* ★ 지금 보고 있는 종목은 링크가 아닙니다 ★
                           같은 화면으로 다시 가는 링크는 눌러도 아무 일이
                           일어나지 않아, 화면 낭독기 사용자에게 특히
                           혼란스럽습니다.
                         ★ 강조는 남색 채우기 — 종목 카드의 제목 띠, 상세
                           화면 머리띠와 **같은 brand-700** 입니다.
                           목록에서 카드를 누르고 들어온 색이 그대로
                           이어집니다. (흰 글자 대비 10:1)
                         aria-current="page": 낭독기가 '현재 페이지'라고
                           알려 줍니다. */
                      <span
                        ref={currentRef}
                        aria-current="page"
                        className={`${shape} bg-brand-700 text-white`}
                      >
                        {category.name}
                      </span>
                    ) : (
                      <Link
                        href={`/categories/${category.slug}`}
                        className={`${shape} text-brand-700 transition-colors hover:bg-brand-100`}
                      >
                        {/* ★ 영문 이름만 ★ (config 의 categories → name) */}
                        {category.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ★ 양끝 페이드 — '그쪽에 더 있다'는 표시 ★
                그 방향으로 아직 밀 수 있을 때만 나타납니다. 8개가 한 줄에
                다 들어오는 넓은 화면에서는 둘 다 나오지 않습니다.
              ℹ️ 색이 위 nav 의 바탕(paper-soft)과 같아야 자연스럽게 흐려
                 보입니다. 바탕색을 바꾸면 이 두 줄의 from- 도 함께 고치세요.
              pointer-events-none: 페이드가 링크 위를 덮고 있어도 눌리는 것을
                 막지 않게 합니다. ⚠️ 지우면 양끝 종목이 안 눌립니다. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-paper-soft to-transparent transition-opacity ${
              fadeLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-paper-soft to-transparent transition-opacity ${
              fadeRight ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </nav>
  );
}
