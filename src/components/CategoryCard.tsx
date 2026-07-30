import type { Category } from "@/config/competition";

/* ============================================================================
 *  종목 카드 한 장
 *
 *  ⚠️ 지금은 일부러 '누를 수 없게' 만들었습니다.
 *     종목별 상세 페이지가 아직 없기 때문입니다.
 *     상세 페이지를 만든 뒤에 <article> 을 <Link> 로 감싸세요.
 *     (링크를 미리 만들어 두면 눌렀을 때 404 오류가 납니다)
 *
 *  ★ 종목 내용을 바꾸려면 config/competition.ts 의 categories 를 수정하세요. ★
 * ========================================================================== */

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-brand-200 bg-white p-5">
      {/* 영문 종목명 + 한글 종목명 */}
      <h3 className="text-lg font-bold text-brand-800 sm:text-xl">
        {category.name}
        <span className="ml-2 text-base font-bold text-ink-soft sm:text-lg">
          {category.nameKo}
        </span>
      </h3>

      {/* 한 줄 소개 */}
      <p className="mt-2 flex-1 text-base text-ink">{category.summary}</p>

      {/* 참가 부문 — 종목에 따라 1~4개입니다 */}
      <div className="mt-4">
        <p className="text-sm font-bold text-brand-700">참가 부문</p>
        <ul className="mt-1.5 flex flex-wrap gap-1.5">
          {category.divisions.map((division) => (
            <li
              key={division}
              className="rounded-md bg-brand-50 px-2.5 py-1 text-sm text-brand-800"
            >
              {division}
            </li>
          ))}
        </ul>
      </div>

      {/* 팀 최대 인원 */}
      <p className="mt-3 text-sm text-ink-soft">
        학생 최대 {category.maxTeamSize}명
      </p>
    </article>
  );
}
