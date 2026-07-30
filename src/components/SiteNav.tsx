"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { competition, visibleNavItems } from "@/config/competition";
import { container } from "@/lib/layout";

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
 *   휴대폰에서 52px 로 고정했습니다. 화면을 가리지 않으면서도
 *   손가락으로 누를 수 있는 최소 크기(44px)를 지키는 값입니다.
 *   더 줄이면 누르기 어려워집니다.
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

  const linkBase =
    "flex min-h-[44px] items-center rounded-lg px-3 text-base font-bold";

  return (
    <header className="sticky top-0 z-50 border-b border-brand-800 bg-brand-700 text-white">
      <div className={container}>
        {/* 휴대폰 52px / 넓은 화면 64px */}
        <div className="flex h-[52px] items-center justify-between gap-2 sm:h-16">
          {/* 사이트 이름 = 홈으로 가는 링크 */}
          <Link
            href="/"
            className="flex min-h-[44px] items-center text-sm font-bold leading-tight sm:text-base"
          >
            {competition.shortName}
          </Link>

          <div className="flex items-center gap-1.5">
            {/* ------------------------------------------- 넓은 화면: 펼친 메뉴 */}
            <nav aria-label="주요 메뉴" className="hidden sm:block">
              <ul className="flex items-center gap-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        isCurrent(pathname, item.href) ? "page" : undefined
                      }
                      className={`${linkBase} ${
                        isCurrent(pathname, item.href)
                          ? "bg-brand-800 text-white"
                          : "text-brand-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* 참가 신청 — 메뉴가 접혀 있어도 항상 보입니다 */}
            <Link
              href={navCta.href}
              aria-current={
                isCurrent(pathname, navCta.href) ? "page" : undefined
              }
              className="flex min-h-[44px] items-center rounded-lg bg-white px-3 text-sm font-bold text-brand-700 sm:text-base"
            >
              {navCta.label}
            </Link>

            {/* ------------------------------------- 휴대폰: 접히는 메뉴 (JS 불필요) */}
            {items.length > 0 && (
              <details ref={menuRef} className="relative sm:hidden">
                <summary
                  /* list-none: 삼각형 기본 표시를 없앱니다 */
                  className="flex min-h-[44px] cursor-pointer list-none items-center rounded-lg px-3 text-sm font-bold text-white"
                  aria-label="메뉴 열기"
                >
                  메뉴
                </summary>

                {/* 메뉴판은 띠 아래에 겹쳐서 펼쳐집니다 (내용을 밀어내지 않음) */}
                <nav
                  aria-label="주요 메뉴"
                  className="absolute right-0 top-full z-50 mt-1 w-56 rounded-xl border border-brand-200 bg-white p-2 shadow-lg"
                >
                  <ul>
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={
                            isCurrent(pathname, item.href) ? "page" : undefined
                          }
                          className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-bold ${
                            isCurrent(pathname, item.href)
                              ? "bg-brand-50 text-brand-900"
                              : "text-brand-800"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
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
