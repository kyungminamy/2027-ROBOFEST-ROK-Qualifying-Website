import type { Metadata } from "next";
import Link from "next/link";
import { competition } from "@/config/competition";
import { CategoryCard } from "@/components/CategoryCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";

/* ============================================================================
 *  종목 안내 (/categories)
 *
 *  ★ 이 파일에는 종목 내용이 직접 적혀 있지 않습니다. ★
 *    모두 config/competition.ts 의 categories 에서 읽어옵니다.
 *
 *  구성: 종목 카드 8개(누르면 상세) → 한눈에 비교표
 *  카드를 먼저 두는 이유: 휴대폰에서는 표를 좌우로 밀어야 보이므로,
 *  누르기 쉬운 카드가 먼저 나오는 편이 읽기 흐름에 맞습니다.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "종목 안내",
  description: `${competition.shortName}에서 운영하는 ${competition.categories.length}개 종목의 참가 부문, 인원, 키트 제한, 난이도를 한눈에 비교하고 종목별 상세 안내를 확인하세요.`,
  /* 이 화면의 대표 주소. www 주소나 ?뒤에 붙는 값이 달라도
     검색엔진이 "원래 주소는 이것"이라고 알 수 있게 합니다. */
  alternates: { canonical: "/categories" },
};

/** 비교표 한 칸 */
function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className="whitespace-nowrap border-b-2 border-brand-200 bg-brand-50 px-3.5 py-3 text-left text-xs font-bold uppercase tracking-wider text-brand-800"
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="border-b border-brand-100 px-3.5 py-3 align-top text-sm text-ink">
      {children}
    </td>
  );
}

export default function CategoriesPage() {
  const { categories } = competition;

  /* 난이도가 '입문'인 종목을 config 에서 골라냅니다.
     종목이나 난이도를 바꾸면 이 안내도 자동으로 따라 바뀝니다. */
  const beginnerFriendly = categories.filter((c) => c.difficulty === "입문");

  return (
    <>
      <PageHeader
        title="종목 안내"
        description={`${categories.length}개 종목을 운영합니다. 팀마다 한 종목을 선택해 참가합니다.`}
        /* 배경 사진을 바꾸려면 이 한 단어만 바꾸면 됩니다.
           고를 수 있는 값은 config 의 headerImages 에 있습니다. */
        image={competition.headerImages.modi}
      />

      <main id="main" className="flex-1">
        {/* ------------------------------------------------- 종목 고르기 도움말 */}
        {beginnerFriendly.length > 0 && (
          <section className="pt-12 pb-2 sm:pt-14 sm:pb-4">
            <div className={container}>
              <div className="rounded-2xl border-2 border-brand-200 bg-brand-50 p-6 sm:p-7">
                <p className="text-lg font-bold text-brand-900">
                  처음 참가하신다면
                </p>
                <p className="mt-2 text-base text-ink">
                  {beginnerFriendly.map((c) => `${c.name}(${c.nameKo})`).join(", ")}
                  {" "}
                  종목이 규칙이 단순해 시작하기 좋습니다.
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  모든 종목은 경기 중 사람이 로봇을 조종할 수 없습니다. 로봇이
                  스스로 판단하고 움직여야 합니다. 이것을 자율주행이라고 합니다.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------- 종목 카드 */}
        <section className="pb-14 sm:pb-20">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">종목 목록</h2>
            <p className="mt-3 text-base text-ink-soft">
              종목을 누르면 참가 자격과 준비물을 자세히 볼 수 있습니다.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {categories.map((category, index) => (
                <li key={category.slug}>
                  {/* 홈의 종목 카드와 같은 '아래에서 떠오르는' 효과입니다.
                      시간차는 index % 2 — 이 페이지는 한 줄에 2개씩
                      놓이므로 왼쪽·오른쪽이 살짝 엇갈려 뜹니다.
                      ⚠️ h-full 이 필요합니다. 없으면 같은 줄 카드의 높이가
                         서로 어긋납니다. */}
                  <Reveal className="h-full" delayMs={(index % 2) * 80}>
                    <CategoryCard category={category} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- 비교표 */}
        <section className="bg-paper-soft py-14 sm:py-20">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">
              한눈에 비교하기
            </h2>
            <p className="mt-3 text-base text-ink-soft">
              표가 화면보다 넓으면 좌우로 밀어서 보실 수 있습니다.
            </p>

            {/* ⚠️ 표는 반드시 이 스크롤 상자 안에 두세요.
                   그러지 않으면 휴대폰에서 페이지 전체가 좌우로 흔들립니다. */}
            <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-200 bg-paper">
              <table className="w-full min-w-[46rem] border-collapse">
                <caption className="sr-only">
                  종목별 참가 부문, 최대 인원, 키트 제한, 난이도 비교표
                </caption>
                <thead>
                  <tr>
                    <Th>종목</Th>
                    <Th>참가 부문</Th>
                    <Th>최대 인원</Th>
                    <Th>키트 제한</Th>
                    <Th>난이도</Th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.slug}>
                      <Td>
                        <Link
                          href={`/categories/${category.slug}`}
                          className="font-bold text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-accent-600 hover:decoration-accent-600"
                        >
                          {category.name}
                        </Link>
                        <span className="block text-ink-soft">
                          {category.nameKo}
                        </span>
                      </Td>
                      <Td>
                        <ul>
                          {category.divisions.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </Td>
                      <Td>
                        <span className="whitespace-nowrap">
                          학생 {category.maxTeamSize}명
                        </span>
                      </Td>
                      <Td>{category.kitRestriction}</Td>
                      <Td>
                        <span className="whitespace-nowrap">
                          {category.difficulty}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-ink-soft">
              팀 구성은 학생과 성인 지도자 1명입니다. 위 인원은 학생 최대
              인원입니다.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
