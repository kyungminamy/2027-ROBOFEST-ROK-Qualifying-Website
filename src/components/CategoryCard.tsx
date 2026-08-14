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
  /* 참가 부문 배지 — 카드에 보여 줄 목록을 고릅니다 (2026-08-14).
     config 에 cardDivisions 가 있으면 그것을, 없으면 divisions 를 씁니다.
     지금은 BottleSumo 한 종목만 cardDivisions 를 가지고 있습니다
     (부문이 네 개라 카드에서는 Junior · Senior 로 줄여 씁니다).
     ⚠️ 여덟 종목 중 일부만 가진 항목이라 `in` 으로 확인합니다. 없는
        카드에서 그냥 꺼내 쓰면 타입 오류가 납니다. */
  const divisions =
    "cardDivisions" in category ? category.cardDivisions : category.divisions;
  const divisionsNote =
    "cardDivisionsNote" in category ? category.cardDivisionsNote : null;

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
            종목명을 남색 띠 위에 흰 글자로 얹습니다.

            ℹ️ 2026-08-03: 검토 의견('대회별 박스에 대회명을 박스처리해서
               음영 표시')에 따라 추가했습니다. 카드가 8장 늘어서 있을 때
               어디서 어디까지가 한 종목인지 한눈에 갈리게 하는 것이
               목적입니다.

            ℹ️ 처음에는 종목명을 '흰 알약 상자' 안에 넣었다가 같은 날
               없앴습니다. 띠 안에 또 상자가 들어가 테두리가 두 겹이 되고,
               상자 크기가 종목명 길이에 따라 제각각이라 카드 여덟 장이
               나란히 놓였을 때 들쭉날쭉해 보였습니다.
               ★ 알약 상자를 되살리지 마세요 ★

            ★ 띠 색은 brand-700 입니다 ★
              사이트의 기본 브랜드색이며, 참가 신청의 '신청 전 안내' 머리
              띠와 같은 색입니다. 검토 의견의 '전체 Key 컬러와 어울리게'가
              바로 이 뜻입니다. 다른 색을 새로 만들지 마세요. */}
        <div className="bg-brand-700 px-4 py-3.5 text-center">
          {/* ★ 영문 이름과 한글 이름을 항상 두 줄로 놓습니다 (2026-08-14) ★
                예전에는 한 줄에 나란히 뒀는데, 넓은 화면에서 카드가 한 줄에
                4장씩 놓이면서 칸이 좁아지자 이름이 긴 종목(RoboParade)만
                줄바꿈이 일어나 그 카드의 띠만 높아졌습니다.
                처음부터 두 줄로 못 박으면 여덟 장의 띠 높이가 같아집니다.
              ⚠️ 두 <span> 의 block 을 지우지 마세요. 지우면 다시 한 줄로
                 이어 붙어 좁은 칸에서 카드마다 높이가 달라집니다. */}
          <h3 className="text-base font-bold text-white sm:text-lg">
            <span className="block">{category.name}</span>
            {/* 한글 이름은 한 단계 작고 한 단계 연하게 — 영문 이름이 먼저
                읽히도록. mt-0.5 는 2px 이며, 둘이 한 덩어리로 보이게 하는
                값입니다. 더 벌리면 이름 두 개가 따로 놀아 보입니다.
                ⚠️ 색을 brand-300 이하로 낮추지 마세요. 남색 바탕 위에서
                   글자 대비가 규정(4.5:1)에 못 미칩니다.
                   brand-200 은 5.9:1 로 통과합니다. */}
            <span className="mt-0.5 block text-sm font-bold text-brand-200 sm:text-base">
              {category.nameKo}
            </span>
          </h3>
        </div>

        {/* ---------------------------------------------------------- 본문 */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* 한 줄 소개 */}
          <p className="flex-1 text-base text-ink">{category.summary}</p>

          {/* 참가 부문 — 카드에서는 종목마다 1~2개입니다 */}
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
              참가 부문
            </p>
            {/* ★ 칩 크기를 다시 키우지 마세요 ★
                예전 크기(text-sm · px-2.5)로는 좁은 칸에서 배지가 한 줄에
                하나씩 들어가 카드가 세로로 길쭉해졌습니다. 글자와 여백을
                함께 한 단계 줄여 둔 값입니다.
                ℹ️ 2026-08-14: 배지가 네 개였던 BottleSumo 를 Junior ·
                   Senior 두 개로 줄이면서, 이제 여덟 카드가 모두 배지
                   두 개(VCC·RoboParade 는 하나)로 한 줄에 들어갑니다.
                   줄인 내용은 바로 아래 보조 문장이 받습니다. */}
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {divisions.map((division) => (
                <li
                  key={division}
                  className="rounded-md border border-brand-100 bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-800"
                >
                  {division}
                </li>
              ))}
            </ul>

            {/* 배지에서 줄인 세부 부문을 한 줄로 받아 줍니다.
                지금은 BottleSumo 에만 나옵니다 — config 에
                cardDivisionsNote 가 있는 종목에만 붙습니다.
                ⚠️ 글자 크기(text-xs)와 색(text-ink-soft)을 키우지 마세요.
                   배지보다 눈에 띄면 부문이 네 개인 것처럼 읽힙니다. */}
            {divisionsNote && (
              <p className="mt-1.5 text-xs text-ink-soft">{divisionsNote}</p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-brand-100 pt-3.5">
            <p className="text-sm text-ink-soft">
              학생 최대 {category.maxTeamSize}명 · 난이도 {category.difficulty}
            </p>
            {/* 누를 수 있다는 것을 눈으로 알려 줍니다.

                ★ 적색(accent)입니다 — 남색으로 되돌리지 마세요 ★
                2026-08-05 부산광역시교육청 요청입니다.

                예전에는 평소 남색이고 마우스를 올렸을 때만 적색이었습니다.
                그런데 휴대폰에는 '마우스 올림'이 없습니다. 그래서 방문자
                대부분에게는 언제나 남색으로만 보였고, 눈에 띄지 않았습니다.

                ⚠️ 순수한 빨강(#ff0000)으로 바꾸지 마세요. 흰 배경에서 대비가
                   약 4:1 이라 기준(4.5:1)에 미달합니다.
                   지금 쓰는 accent-600 은 5.1:1 로 통과합니다. */}
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center gap-1 text-sm font-bold text-accent-600 transition-colors group-hover:text-accent-700"
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
