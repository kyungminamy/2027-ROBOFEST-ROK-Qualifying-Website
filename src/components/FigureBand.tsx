import { competition } from "@/config/competition";
import { container } from "@/lib/layout";
import { CountUp } from "@/components/CountUp";

/* ============================================================================
 *  숫자로 보는 ROBOFEST — 남색 띠에 큰 숫자 넷
 *
 *  ★ 숫자와 제목은 config/competition.ts 의 aboutPage 에서 옵니다 ★
 *    (figuresHeading, figures) 이 파일에는 숫자가 하나도 없습니다.
 *
 *  ★★★ 이 구역은 두 곳에 나옵니다 ★★★
 *    1) 홈 — 첫 화면(Hero) 바로 아래
 *    2) ROBOFEST 소개(/about) — 소개 글 아래
 *
 *   두 곳이 똑같아야 해서 한 파일로 묶었습니다.
 *   ⚠️ 한쪽만 다르게 만들려고 이 파일을 복사해 두 개로 만들지 마세요.
 *      예전에 같은 값을 두 곳에 적어 두었다가 한쪽만 고쳐서 어긋난 일이
 *      있었습니다. 고칠 일이 생기면 이 파일 하나만 고치세요.
 *
 *  ℹ️ 홈에서는 첫 화면과 '붙어' 보입니다. 위아래 여백을 두지 않았고
 *     첫 화면도 같은 남색이라, 사진이 그대로 남색 띠로 이어집니다.
 *     ⚠️ 홈에서 이 구역 위에 여백(mt-)을 넣지 마세요. 붙어 있는 것이
 *        의도입니다.
 *
 *  ℹ️ 숫자가 올라가는 효과는 CountUp 이 담당합니다. 자바스크립트가
 *     막혀 있으면 움직임만 없고 숫자는 제대로 보입니다.
 * ========================================================================== */

export function FigureBand() {
  const { aboutPage } = competition;

  return (
    <section className="bg-brand-900 py-12 text-white sm:py-16">
      <div className={container}>
        <h2 className="text-xl font-bold sm:text-2xl">
          {aboutPage.figuresHeading}
        </h2>

        {/* ★ grid 가 아니라 flex 입니다 (바꾸지 마세요) ★
               grid 로 4칸을 나누면 칸 너비는 같아지지만, 숫자 길이가
               제각각이라('1999년' vs '38,700명') 눈에 보이는 간격은
               들쭉날쭉해집니다. flex + gap 은 항목 사이 간격 자체를
               똑같이 벌려 주므로 시각적으로 균일합니다. */}
        <dl className="mt-8 flex flex-wrap justify-between gap-x-10 gap-y-8">
          {aboutPage.figures.map((figure) => (
            /* 휴대폰에서는 한 줄에 정확히 2개씩 놓습니다.
               (basis 를 빼면 390px 화면에서 3개 + 1개로 갈라져
                마지막 하나만 덩그러니 남습니다)
               1.25rem 은 위 gap-x-10(40px)의 절반입니다. */
            <div key={figure.label} className="max-sm:basis-[calc(50%-1.25rem)]">
              <dt className="sr-only">{figure.label}</dt>
              <dd>
                {/* ⚠️ whitespace-nowrap 을 지우지 마세요.
                       이게 없으면 '38,700 / 명' 처럼 숫자와 단위가
                       두 줄로 나뉘어 읽기 어려워집니다. */}
                {/* ⚠️ tabular 를 지우지 마세요.
                       숫자가 올라가는 동안 자릿수마다 글자 너비가
                       달라지면 숫자 전체가 좌우로 떨립니다.
                       tabular 는 모든 숫자를 같은 너비로 그립니다. */}
                <span className="tabular block whitespace-nowrap text-2xl font-bold leading-none sm:text-3xl">
                  <CountUp value={figure.value} />
                  {"unit" in figure && figure.unit && (
                    <span className="ml-0.5 text-base font-bold sm:text-lg">
                      {figure.unit}
                    </span>
                  )}
                </span>
                <span className="mt-2 block text-sm font-bold text-brand-200">
                  {figure.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
