import Link from "next/link";
import { competition } from "@/config/competition";
import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { RegistrationNotice } from "@/components/RegistrationNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";

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

      <main className="flex-1">
        {/* 2. 접수 안내 — 접수 전 / 접수 중 / 마감 상태에 따라 바뀝니다 */}
        <RegistrationNotice />

        {/* 3. 운영 종목 */}
        <section className="bg-paper-soft py-10 sm:py-14">
          <div className={container}>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
              운영 종목 {competition.categories.length}종목
            </h2>
            <p className="mt-2 text-base text-ink-soft">
              종목을 누르면 참가 자격과 준비물을 자세히 볼 수 있습니다.
            </p>
            <p className="mt-3">
              <Link
                href="/categories"
                className="text-base font-bold text-brand-700 underline"
              >
                종목 비교표 한눈에 보기 →
              </Link>
            </p>

            {/* 휴대폰에서는 한 줄에 1개, 넓은 화면에서는 2개씩 배치합니다 */}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {competition.categories.map((category) => (
                <li key={category.slug}>
                  <CategoryCard category={category} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* 4. 꼬리말 — 주최·주관 / 운영·공인 */}
      <SiteFooter />
    </>
  );
}
