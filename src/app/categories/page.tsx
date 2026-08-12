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
        {/* ------------------------------------------------- 종목 고르기 도움말
             ℹ️ 2026-08-11: 예전에는 옅은 파란 상자(테두리 있는 카드)였습니다.
                담당자 요청으로 아래 '종목 목록'·'한눈에 비교하기'와 같은
                '한 구역'으로 바꿨습니다.

             ★ 상자로 되돌리지 마세요 ★
               테두리와 배경색을 가진 상자를 흰 구역 위에 띄우면, 본문과
               다른 종류의 글처럼 보입니다. 이 글은 곁다리 안내가 아니라
               '어느 종목을 고를까'라는 이 페이지의 첫 질문에 대한 답입니다.
               그래서 다른 구역과 같은 무게로 둡니다.

             ★ 배경이 흰색인 이유 (2026-08-11 담당자 요청) ★
               이 사이트의 하위 페이지는 머리띠(사진) 바로 아래 첫 구역이
               항상 흰색이고, 그다음부터 옅은 파랑과 번갈아 나옵니다.
               /about · /schedule · /venue · /faq 모두 그렇습니다.
               그래서 이 페이지도 흰색 → 옅은 파랑 → 흰색 입니다.
               ⚠️ 여기에 bg-paper-soft 를 붙이면 이 페이지만 다른 페이지와
                  다르게 시작합니다. 붙이려면 아래 두 구역도 같이 뒤집으세요.
               (번갈아 놓는 규칙 자체는 src/components/HomeSection.tsx 참고) */}
        {beginnerFriendly.length > 0 && (
          <section className="py-14 sm:py-20">
            <div className={container}>
              <h2 className="text-2xl text-brand-900 sm:text-3xl">
                처음 참가하신다면
              </h2>
              <p className="mt-3 text-base text-ink">
                {beginnerFriendly.map((c) => `${c.name}(${c.nameKo})`).join(", ")}
                {" "}
                종목이 규칙이 단순해 시작하기 좋습니다.
              </p>
              <p className="mt-3 text-base text-ink-soft">
                모든 종목은 경기 중 사람이 로봇을 조종할 수 없습니다. 로봇이
                스스로 판단하고 움직여야 합니다. 이것을 자율주행이라고 합니다.
              </p>
            </div>
          </section>
        )}

        {/* --------------------------------------------------- 참가 부문 안내
             ℹ️ 2026-08-12 담당자 요청으로 새로 만든 구역입니다.

             ★ 왜 필요한가 ★
               종목 카드마다 '참가 부문'에 Junior · Senior 라고만 적혀
               있는데, 그것이 몇 학년인지는 종목 상세 페이지에 들어가야만
               알 수 있었습니다. 목록만 훑는 학부모·지도교사가 가장 먼저
               궁금해하는 것이라 앞쪽에서 한 번 설명합니다.

             ⚠️⚠️ 학년과 키트 설명을 여기에 직접 적지 마세요 ⚠️⚠️
               모두 config 에서 그대로 가져옵니다.
                 · 학년       → eligibility.junior / eligibility.senior
                                (참가 신청 화면도 같은 값을 씁니다)
                 · 키트·무게  → categoryDetails.bottlesumo.prepare.robotKit
                                (BottleSumo 상세 페이지의 '무엇을 준비하나'
                                 와 완전히 같은 문장입니다)
               여기에 숫자를 옮겨 적으면 나중에 한쪽만 고쳐져 서로 다른
               말을 하게 됩니다.

             ★ 배경이 옅은 파랑인 이유 ★
               이 페이지는 흰색과 옅은 파랑이 번갈아 나옵니다.
                 처음 참가하신다면(흰) → 여기(파랑) → 종목 목록(흰) → 비교표(파랑)
               이 구역이 끼어들면서 아래 두 구역의 배경도 함께 뒤집었습니다.
               ⚠️ 이 구역을 지우거나 옮기면 아래 두 구역의 배경도 되돌려야
                  합니다. 안 그러면 같은 색이 두 번 이어집니다. */}
        <section className="bg-paper-soft py-14 sm:py-20">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">참가 부문 안내</h2>
            <p className="mt-3 text-base text-ink">
              종목마다 참가할 수 있는 학년이 정해져 있습니다. 아래 종목
              목록의 &lsquo;참가 부문&rsquo;에서 종목별로 확인하실 수 있습니다.
            </p>

            {/* 학년 구분 — 참가 신청 화면과 같은 모양으로 맞췄습니다 */}
            <ul className="mt-4 ml-5 list-disc space-y-1 text-base text-ink marker:text-brand-300">
              <li>
                <span className="font-bold">Junior 부문</span> —{" "}
                {competition.eligibility.junior}
              </li>
              <li>
                <span className="font-bold">Senior 부문</span> —{" "}
                {competition.eligibility.senior}
              </li>
            </ul>

            {/* ★ BottleSumo 만 부문 이름이 네 개입니다 ★
                  Junior Classic · Junior Unlimited · Senior Classic ·
                  Senior Unlimited 를 보고 '나이가 네 단계로 나뉘나?' 하고
                  오해하기 쉽습니다. Classic·Unlimited 는 나이가 아니라
                  로봇 규격 구분이라는 것만 여기서 짚어 줍니다.
                  (2026-08-12 담당자 확인)

                ⚠️ 키트·무게 제한을 여기에 다시 넣지 마세요 (2026-08-12).
                   한때 categoryDetails.bottlesumo.prepare.robotKit 문장
                   ('Classic 부문은 레고와 VEX IQ만 쓸 수 있고 …
                    Junior Classic 1.2kg, Senior Classic 1.5kg …')을
                   여기에 함께 보여 줬는데, 짧게 훑는 구역에 담기에는
                   너무 자세하다는 담당자 판단으로 뺐습니다.
                   그 내용은 BottleSumo 상세 페이지의 '무엇을 준비하나'에
                   그대로 있습니다. 없어진 정보가 아닙니다. */}
            <p className="mt-5 text-base text-ink">
              <span className="font-bold">BottleSumo</span> 는 부문 이름이
              Junior Classic · Junior Unlimited · Senior Classic · Senior
              Unlimited 로 네 개입니다. 뒤에 붙는 Classic·Unlimited 는 학년이
              아니라 <span className="font-bold">로봇 규격 구분</span>입니다.
              학년은 앞의 Junior·Senior 로 정해집니다.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------- 종목 카드
             ⚠️ py- 입니다 (pb- 만 두지 마세요). 예전에는 위쪽 여백을 바로 위
                '처음 참가하신다면' 상자가 대신 만들어 줘서 pb- 만 있었습니다.
                그 상자가 자기 여백을 가진 구역이 되면서, 이 구역도 자기
                위쪽 여백을 직접 가져야 합니다. pb- 로 되돌리면 두 구역이
                서로 붙습니다. (2026-08-11)

             ℹ️ 2026-08-12: 배경을 옅은 파랑에서 **흰색으로 뒤집었습니다.**
                바로 위에 '참가 부문 안내'(옅은 파랑) 구역이 새로 들어와서,
                번갈아 나오게 하려면 이 구역이 흰색이어야 합니다.
                ⚠️ 위 구역을 지우면 여기를 다시 bg-paper-soft 로 되돌리세요. */}
        <section className="py-14 sm:py-20">
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

        {/* --------------------------------------------------------- 비교표
             ℹ️ 2026-08-12: 배경을 흰색에서 **옅은 파랑으로 뒤집었습니다.**
                위에 '참가 부문 안내' 구역이 새로 생기면서 이 페이지의
                번갈아 나오는 순서가 한 칸씩 밀렸습니다.
                  처음 참가하신다면(흰) → 참가 부문 안내(파랑)
                  → 종목 목록(흰) → 비교표(파랑)
                ⚠️ '참가 부문 안내' 구역을 지우면 여기를 다시 흰색으로
                   되돌리세요. (2026-08-11 에도 같은 이유로 한 번 뒤집었습니다) */}
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
