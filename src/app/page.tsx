import Link from "next/link";
import { competition } from "@/config/competition";
import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { HomeIntro } from "@/components/HomeIntro";
import { RegistrationNotice } from "@/components/RegistrationNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";
import { ArrowRight } from "@/components/icons";

/* ============================================================================
 *  첫 화면(홈)
 *
 *  ★ 이 파일에는 날짜·기관명·종목 내용이 직접 적혀 있지 않습니다. ★
 *    모두 config/competition.ts 에서 읽어옵니다. 내용은 그 파일에서 바꾸세요.
 *
 *  모바일 우선입니다. 아무것도 안 붙은 설정이 휴대폰 화면 기준이고,
 *  sm: / md: 가 붙은 것은 화면이 넓어질 때만 적용됩니다.
 * ========================================================================== */

export default function Home() {
  return (
    <>
      {/* 1. 대표 영역 — 대회명, 일정, 장소, 남은 날짜 */}
      <Hero />

      <main id="main" className="flex-1">
        {/* 2. 대회 소개 — 흰 배경.
               '무엇에 신청하는 건지'를 먼저 설명합니다. 접수 안내(4)보다
               위에 있어야 합니다. 순서를 바꾸면 설명 없이 신청부터
               권하는 화면이 됩니다. */}
        <HomeIntro />

        {/* 3. 운영 종목 — 회백색 배경.
               위(대회 소개)와 아래(접수 안내)가 흰색이라 이 구역만
               색을 넣어 구분합니다. 흰색 → 회백색 → 흰색 순서입니다. */}
        <section className="bg-paper-soft py-14 sm:py-20">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              운영 종목 {competition.categories.length}종목
            </h2>
            <p className="mt-3 text-base text-ink-soft">
              종목을 누르면 참가 자격과 준비물을 자세히 볼 수 있습니다.
            </p>
            <p className="mt-4">
              <Link
                href="/categories"
                className="group inline-flex items-center gap-1.5 text-base font-bold text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-600"
              >
                종목 비교표 한눈에 보기
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </p>

            {/* 휴대폰에서는 한 줄에 1개, 넓은 화면에서는 2개씩 배치합니다 */}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {competition.categories.map((category) => (
                <li key={category.slug}>
                  <CategoryCard category={category} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. 접수 안내 — 흰 배경. 접수 전 / 접수 중 / 마감에 따라 바뀝니다.
               설명을 다 읽은 뒤에 나오는 마무리 권유 자리입니다. */}
        <RegistrationNotice />
      </main>

      {/* 5. 꼬리말 — 주최·주관 / 운영·공인 */}
      <SiteFooter />
    </>
  );
}
