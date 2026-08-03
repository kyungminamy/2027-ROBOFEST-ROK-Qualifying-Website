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
         휴대폰에서는 글자만 누르기 어려우므로 카드째로 누르게 합니다.

         overflow-hidden: 아래 제목 띠가 카드의 둥근 모서리를 넘지 않도록
         잘라 냅니다. 이걸 빼면 띠의 네모난 위쪽 귀퉁이가 삐져나옵니다. */
      className="group block h-full overflow-hidden rounded-xl border border-brand-100 bg-paper transition-all hover:border-brand-300 hover:shadow-lg hover:shadow-brand-900/8"
    >
      <article className="flex h-full flex-col">
        {/* ------------------------------------------------------- 제목 띠
            종목명을 남색 띠 위의 흰 상자에 넣습니다.

            ℹ️ 2026-08-03: 검토 의견('대회별 박스에 대회명을 박스처리해서
               음영 표시')에 따라 추가했습니다. 카드가 8장 늘어서 있을 때
               어디서 어디까지가 한 종목인지 한눈에 갈리게 하는 것이
               목적입니다.

            ★ 띠 색은 brand-700 입니다 ★
              사이트의 기본 브랜드색이며, 참가 신청의 '신청 전 안내' 머리
              띠와 같은 색입니다. 검토 의견의 '전체 Key 컬러와 어울리게'가
              바로 이 뜻입니다. 다른 색을 새로 만들지 마세요. */}
        <div className="bg-brand-700 px-4 py-3 text-center">
          <h3 className="inline-block rounded-md bg-paper px-3 py-1 text-base font-bold text-brand-900 sm:text-lg">
            {category.name}
            <span className="ml-1.5 text-sm font-bold text-ink-soft sm:text-base">
              {category.nameKo}
            </span>
          </h3>
        </div>

        {/* ---------------------------------------------------------- 본문 */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* 한 줄 소개 */}
          <p className="flex-1 text-base text-ink">{category.summary}</p>

          {/* 참가 부문 — 종목에 따라 1~4개입니다 */}
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              참가 부문
            </p>
            {/* ★ 칩 크기를 다시 키우지 마세요 ★
                BottleSumo 는 부문 이름이 4개(Junior Classic · Junior
                Unlimited · Senior Classic · Senior Unlimited)이고 하나하나가
                깁니다. 예전 크기(text-sm · px-2.5)로는 좁은 칸에서 한 줄에
                하나씩 들어가 카드 하나만 세로로 길쭉해졌습니다.
                글자와 여백을 함께 한 단계 줄여 두 줄에 들어가게 했습니다. */}
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {category.divisions.map((division) => (
                <li
                  key={division}
                  className="rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-800"
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
        </div>
      </article>
    </Link>
  );
}
