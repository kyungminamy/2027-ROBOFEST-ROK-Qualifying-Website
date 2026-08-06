"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DdayChip } from "@/components/DdayBar";
import { competition, visibleNavItems } from "@/config/competition";
import { edgePadding } from "@/lib/layout";
import { ChevronDown } from "@/components/icons";

/* ============================================================================
 *  상단 메뉴 (모든 페이지 맨 위)
 *
 *  ★ 메뉴에 들어갈 페이지는 config/competition.ts 의 nav 에서 정합니다. ★
 *    이 파일은 '어떻게 보여줄지'만 담당합니다.
 *
 *  ★★★ 왜 자바스크립트 없이도 열리게 만들었나 (지우지 마세요) ★★★
 *
 *   휴대폰 메뉴는 보통 자바스크립트로 여닫습니다. 그런데 학교 인터넷이나
 *   구형 기기에서 자바스크립트가 막히면, 그 방식은 '눌러도 안 열리는 버튼'이
 *   되어 버립니다. 메뉴가 안 열리면 사이트 전체를 돌아다닐 수 없습니다.
 *
 *   그래서 HTML 기본 기능인 <details> 를 씁니다. 자바스크립트가 없어도
 *   브라우저가 알아서 여닫습니다. 아래 useEffect 는 '페이지를 옮기면
 *   메뉴가 저절로 닫히는' 편의 기능일 뿐이고, 없어도 메뉴는 동작합니다.
 *
 *  ★ 높이 ★
 *   globals.css 의 --nav-h 한 곳에서 정합니다. 첫 화면(Hero)의 높이
 *   계산도 같은 값을 쓰기 때문에, 여기에 숫자를 따로 적지 마세요.
 *
 *  ★ 지금 보고 있는 페이지 표시 ★
 *   글자를 진하게 하고 아래에 주황색 줄을 긋습니다. 색만으로 알리지 않는
 *   이유: 색을 구분하기 어려운 분에게도 굵기 차이가 함께 보여야 합니다.
 * ========================================================================== */

/** 지금 보고 있는 페이지인지 판단 (종목 상세 페이지도 '종목 안내'로 봅니다) */
function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);

  /* 페이지를 옮기면 열려 있던 메뉴를 닫습니다.
     (자바스크립트가 없으면 이 기능만 없고, 메뉴는 그대로 동작합니다) */
  useEffect(() => {
    menuRef.current?.removeAttribute("open");
  }, [pathname]);

  const items = visibleNavItems();
  const { navCta } = competition;

  return (
    /* nav-glass = 반투명 + 뒤쪽 흐리게 (globals.css 에 있습니다).
       ★ 진하기는 globals.css 의 --nav-glass 에서 바꿉니다 (지금 0.45) ★
         어두운 구역이 뒤로 지나갈 때 글자가 옅어 보입니다. 값을 올리면
         진해집니다. 대비 수치표가 globals.css 설명에 있습니다. */
    <header className="nav-glass sticky top-0 z-50 border-b border-brand-100">
      {/* 좌우 여백만 주고 가운데 정렬은 하지 않습니다.
          ★ 첫 화면(Hero)과 똑같은 여백 값을 씁니다 ★
            그래야 로고 왼쪽 끝과 대회 제목 왼쪽 끝이 한 줄로 맞습니다.
            예전에는 메뉴만 가운데 정렬된 좁은 칸을 써서, 넓은 화면에서
            로고가 제목보다 한참 안쪽에서 시작했습니다. */}
      <div className={`w-full ${edgePadding}`}>
        {/* 높이는 globals.css 의 --nav-h 에서 옵니다 (한 곳에서 관리).
            휴대폰 52px / 640px 이상 64px / 1024px 이상 80px */}
        <div className="flex h-[var(--nav-h)] items-center justify-between gap-2">
          {/* 로고 = 홈으로 가는 링크
              ★ 두 로고를 '하나의 링크' 안에 함께 둡니다 (중요) ★
                따로 나누면, 교육청 로고를 누른 사람이 교육청 누리집으로
                갈 것이라고 기대하게 됩니다. 하나로 묶어 두면 '이 대회의
                로고 묶음'으로 읽히고, 눌렀을 때 이 사이트 첫 화면으로
                갑니다. 화면 낭독기에는 아래 aria-label 만 읽힙니다.

              config 의 로고 경로가 둘 다 비어 있으면 대회 이름 글자로
              대신합니다. (경로가 잘못돼도 깨진 이미지가 뜨지 않게 하기 위함) */}
          <Link
            href="/"
            aria-label={`${competition.shortName} 홈`}
            className="flex min-h-[44px] items-center gap-3 rounded-lg pr-2 md:gap-4"
          >
            {competition.hostLogoSrc || competition.logoSrc ? (
              <>
                {/* 주최·주관 기관 로고 — 더 크고 먼저 옵니다 */}
                {competition.hostLogoSrc && (
                  // eslint-disable-next-line @next/next/no-img-element -- next/image 는 설정이 필요해 비개발자가 유지하기 어렵습니다. public 폴더의 사진만 쓰므로 기본 img 로 충분합니다.
                  <img
                    src={competition.hostLogoSrc}
                    /* ★ 이 alt 는 '그림이 안 뜰 때' 대신 보일 글자입니다 ★
                       화면 낭독기는 이 글자를 읽지 않습니다. 위 Link 의
                       aria-label 이 안쪽 내용을 덮기 때문입니다.
                       자세한 이유는 config 의 hostLogoAlt 설명을 보세요. */
                    alt={competition.hostLogoAlt}
                    decoding="async"
                    className="block h-7 w-auto sm:h-8 lg:h-12"
                  />
                )}

                {/* 두 로고 사이의 얇은 세로선.
                    로고가 둘 다 있을 때만 나옵니다. */}
                {competition.hostLogoSrc && competition.logoSrc && (
                  <span
                    aria-hidden="true"
                    className="hidden h-6 w-px bg-brand-200 xl:block xl:h-10"
                  />
                )}

                {/* 대회 로고 — 교육청 로고보다 작게.
                    ⚠️ 1280px 미만에서는 숨깁니다. 메뉴가 5개로 늘어난 뒤로,
                       로고 두 개까지 넣으면 메뉴 글자와 겹칩니다.
                       (ROBOFEST 이름은 첫 화면 제목과 브라우저 탭에 나옵니다) */}
                {competition.logoSrc && (
                  // eslint-disable-next-line @next/next/no-img-element -- 위와 같은 이유
                  <img
                    src={competition.logoSrc}
                    /* 위 로고와 같은 이유입니다 — 그림이 안 뜰 때를 위한
                       글자이며, 낭독기가 읽는 말은 바뀌지 않습니다. */
                    alt={competition.logoAlt}
                    decoding="async"
                    className="hidden h-6 w-auto xl:block xl:h-9"
                  />
                )}
              </>
            ) : (
              <span className="text-sm font-bold leading-tight text-brand-900 sm:text-base">
                {competition.shortName}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-1">
            {/* ------------------------------------------- 넓은 화면: 펼친 메뉴 */}
            <nav aria-label="주요 메뉴" className="hidden lg:block">
              <ul className="flex items-center">
                {items.map((item) => {
                  const current = isCurrent(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={current ? "page" : undefined}
                        className={`relative flex min-h-[44px] items-center px-3.5 text-base font-bold transition-colors ${
                          current
                            ? "text-brand-900"
                            : "text-brand-700 hover:text-brand-900"
                        }`}
                      >
                        {item.label}
                        {/* 지금 보고 있는 페이지 아래 주황색 줄 */}
                        {current && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-2.5 bottom-0 h-[3px] rounded-t bg-accent-600"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* 참가 신청 — 메뉴가 접혀 있어도 항상 보입니다.
                사이트에서 가장 중요한 버튼이라 주황색을 씁니다. */}
            <Link
              href={navCta.href}
              aria-current={
                isCurrent(pathname, navCta.href) ? "page" : undefined
              }
              className="ml-1.5 flex min-h-[44px] items-center rounded-lg bg-accent-600 px-4 text-sm font-bold text-white transition-colors hover:bg-accent-700 sm:text-base"
            >
              {navCta.label}
            </Link>

            {/* 남은 날짜 작은 표 — 화면을 내렸을 때만 나타납니다.
                맨 위에서는 폭이 0 이라 아무 자리도 차지하지 않습니다.
                (맨 위에서는 이 띠 위쪽의 DdayBar 가 같은 내용을 보여 줍니다)

                ℹ️ 2026-08-06 담당자 요청으로 '참가 신청' 단추 오른쪽으로
                   옮겼습니다. 그전에는 왼쪽이었습니다. */}
            <DdayChip />

            {/* ------------------------------------- 휴대폰: 접히는 메뉴 (JS 불필요) */}
            {items.length > 0 && (
              <details ref={menuRef} className="group relative lg:hidden">
                <summary
                  /* list-none: 삼각형 기본 표시를 없앱니다 */
                  className="flex min-h-[44px] cursor-pointer list-none items-center gap-1 rounded-lg px-2.5 text-sm font-bold text-brand-800"
                  aria-label="메뉴 열기"
                >
                  메뉴
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
                </summary>

                {/* 메뉴판은 띠 아래에 겹쳐서 펼쳐집니다 (내용을 밀어내지 않음) */}
                <nav
                  aria-label="주요 메뉴"
                  className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-brand-100 bg-paper p-2 shadow-xl shadow-brand-900/10"
                >
                  <ul>
                    {items.map((item) => {
                      const current = isCurrent(pathname, item.href);
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={current ? "page" : undefined}
                            className={`flex min-h-[46px] items-center rounded-lg px-3 text-base font-bold ${
                              current
                                ? "bg-brand-50 text-brand-900"
                                : "text-brand-800"
                            }`}
                          >
                            {/* 지금 보고 있는 페이지 앞의 주황색 막대 */}
                            {current && (
                              <span
                                aria-hidden="true"
                                className="mr-2.5 h-4 w-[3px] rounded bg-accent-600"
                              />
                            )}
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </details>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
