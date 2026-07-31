import Link from "next/link";
import type { Category } from "@/config/competition";
import { ArrowRight } from "@/components/icons";

/* ============================================================================
 *  종목 카드 한 장 — 누르면 종목 상세 페이지로 갑니다
 *
 *  ★ 종목 내용을 바꾸려면 config/competition.ts 의 categories 를 수정하세요. ★
 *
 *  ⚠️ 링크 주소는 종목의 slug 를 그대로 씁니다. (예: game → /categories/game)
 *     config 에서 slug 를 바꾸면 상세 페이지 주소도 함께 바뀝니다.
 *     이미 공문이나 안내문에 주소를 실었다면 slug 를 바꾸지 마세요.
 * ========================================================================== */

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      /* block h-full: 카드 전체가 눌리는 영역이 됩니다.
         휴대폰에서는 글자만 누르기 어려우므로 카드째로 누르게 합니다. */
      className="group block h-full rounded-xl border border-brand-100 bg-paper p-5 transition-all hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/8 sm:p-6"
    >
      <article className="flex h-full flex-col">
        {/* 영문 종목명 + 한글 종목명 */}
        <h3 className="text-lg font-bold text-brand-900 sm:text-xl">
          {category.name}
          <span className="ml-2 text-base font-bold text-ink-soft sm:text-lg">
            {category.nameKo}
          </span>
        </h3>

        {/* 한 줄 소개 */}
        <p className="mt-2 flex-1 text-base text-ink">{category.summary}</p>

        {/* 참가 부문 — 종목에 따라 1~4개입니다 */}
        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
            참가 부문
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {category.divisions.map((division) => (
              <li
                key={division}
                className="rounded-md border border-brand-100 bg-brand-50 px-2.5 py-1 text-sm font-bold text-brand-800"
              >
                {division}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-brand-100 pt-3.5">
          <p className="text-sm text-ink-soft">
            학생 최대 {category.maxTeamSize}명 · 난이도 {category.difficulty}
          </p>
          {/* 누를 수 있다는 것을 눈으로 알려 줍니다 */}
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center gap-1 text-sm font-bold text-brand-700 transition-colors group-hover:text-accent-600"
          >
            자세히
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
