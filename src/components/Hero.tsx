import Link from "next/link";
import {
  competition,
  formatKoreanDate,
  venueDisplayName,
  visibleNavItems,
} from "@/config/competition";
import { container } from "@/lib/layout";
import { ArrowRight } from "@/components/icons";

/* ============================================================================
 *  첫 화면 대표 영역 — 대회명, 일정, 장소, 신청 버튼
 *
 *  ★ 글을 바꾸려면 config/competition.ts 를 수정하세요. ★
 *
 *  ℹ️ 남은 날짜(D-000) 표시는 2026-07-30에 없앴습니다.
 *     꼭 필요한 정보가 아니라 화면만 복잡해진다고 판단했습니다.
 *     다시 넣고 싶으면 git 기록의 DdayBadge 컴포넌트를 되살리면 됩니다.
 *
 *  ★ 주최 기관 이름을 제목 '위'에 두지 마세요 ★
 *   예전에는 '부산광역시교육청'이 대회 이름 위에 작게 붙어 있었습니다.
 *   그러면 화면에서 가장 먼저 읽히는 자리를 대회 이름이 아닌 기관 이름이
 *   차지합니다. 기관 이름은 제목 아래 '주최·주관' 줄에서 밝힙니다.
 *
 *  ★ 사진이 없습니다 ★
 *   이 대회는 아직 열린 적이 없어서 쓸 수 있는 사진이 한 장도 없습니다.
 *   다른 대회 사진을 가져다 쓰면 이 대회 사진인 것처럼 오해를 줍니다.
 *   그래서 사진 대신 옅은 격자무늬(globals.css 의 .hero-field)를 씁니다.
 * ========================================================================== */

export function Hero() {
  const { dates } = competition;

  /* '종목 안내' 버튼 주소를 config 의 메뉴에서 찾아 씁니다.
     메뉴에서 종목 안내를 빼면 이 버튼도 저절로 사라집니다.
     (없는 페이지로 가는 버튼이 생기지 않게 하기 위함) */
  const categoriesNav = visibleNavItems().find(
    (item) => item.href === "/categories",
  );

  return (
    <section className="hero-field text-white">
      <div className={container}>
        <div className="py-14 sm:py-20 lg:py-24">
          {/* 대회 정식 명칭 */}
          <h1 className="rise max-w-[20ch] text-[1.75rem] leading-[1.25] sm:text-4xl lg:text-5xl">
            {competition.name}
          </h1>

          {/* 일정 · 장소 — 가장 많이 찾는 두 가지라 제목 바로 아래 둡니다 */}
          <dl className="rise rise-2 mt-8 grid gap-px overflow-hidden rounded-xl border border-white/20 bg-white/20 sm:mt-9 sm:grid-cols-2">
            <div className="bg-brand-900 p-4 sm:p-5">
              <dt className="text-sm font-bold text-brand-200">일정</dt>
              {/* ⚠️ 각 날짜를 whitespace-nowrap 으로 감쌌습니다.
                     이게 없으면 '2026년 11월 / 28일(토)'처럼 날짜 하나가
                     중간에서 잘려 두 줄로 나뉩니다. 지우지 마세요. */}
              <dd className="tabular mt-1 text-base font-bold sm:text-lg">
                <span className="whitespace-nowrap">
                  {formatKoreanDate(dates.day1)}
                </span>
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> ~ </span>
                <span className="sm:hidden">~ </span>
                <span className="whitespace-nowrap">
                  {formatKoreanDate(dates.day2)}
                </span>
              </dd>
            </div>
            <div className="bg-brand-900 p-4 sm:p-5">
              <dt className="text-sm font-bold text-brand-200">장소</dt>
              <dd className="mt-1 text-base font-bold sm:text-lg">
                {venueDisplayName()}
              </dd>
            </div>
          </dl>

          {/* 신청 버튼 — 첫 화면에서 가장 눈에 띄어야 하는 하나입니다.
              글자는 config 의 navCta 에서 가져옵니다. */}
          <div className="rise rise-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={competition.navCta.href}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 text-base font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-accent-700 sm:text-lg"
            >
              {competition.navCta.label}
              <ArrowRight className="h-5 w-5" />
            </Link>

            {categoriesNav && (
              <Link
                href={categoriesNav.href}
                className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-2 border-white/40 px-7 text-base font-bold text-white transition-colors hover:bg-white/10 sm:text-lg"
              >
                {categoriesNav.label}
              </Link>
            )}
          </div>

          {/* 주최·운영 기관 — 처음 보는 학부모가 '진짜 공식 대회인지'를
              확인하는 줄입니다. 푸터에도 같은 내용이 있습니다. */}
          <p className="mt-9 border-t border-white/15 pt-5 text-sm text-brand-200 sm:mt-10">
            <span className="font-bold text-white">주최·주관</span>{" "}
            {competition.host}
            <span className="mx-2 text-white/30">|</span>
            <span className="font-bold text-white">운영·공인</span>{" "}
            {competition.operators.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
