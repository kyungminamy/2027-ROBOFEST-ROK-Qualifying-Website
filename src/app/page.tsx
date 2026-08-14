import {
  competition,
  formatKoreanDate,
  formatKoreanDateRange,
} from "@/config/competition";
import { CategoryCard } from "@/components/CategoryCard";
import { RowReveal } from "@/components/RowReveal";
import { FigureBand } from "@/components/FigureBand";
import { EventJsonLd } from "@/components/EventJsonLd";
import { Hero } from "@/components/Hero";
import { HomeIntro } from "@/components/HomeIntro";
import { HomeSection } from "@/components/HomeSection";
import { RegistrationNotice } from "@/components/RegistrationNotice";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";

/* ============================================================================
 *  첫 화면(홈)
 *
 *  ★ 이 파일에는 날짜·기관명·종목 내용이 직접 적혀 있지 않습니다. ★
 *    모두 config/competition.ts 에서 읽어옵니다. 내용은 그 파일에서 바꾸세요.
 *
 *  ★★★ 홈은 '길잡이(hub)'입니다 ★★★
 *
 *   홈에서 모든 것을 다 설명하지 않습니다. 구역마다 그 주제를 짧게
 *   요약하고, 자세한 내용은 해당 페이지로 넘깁니다.
 *     대회 소개 → (그 자리에서 설명)
 *     운영 종목 → /categories
 *     일정      → /schedule
 *     장소      → /venue
 *     참가 접수 → /apply
 *
 *   ⚠️ 홈에 일정·장소 구역이 없으면, 상단 메뉴를 눌러 보지 않는 방문자는
 *      그런 페이지가 있는 줄도 모릅니다. 그래서 요약이라도 둡니다.
 *
 *  ★ 구역 순서를 바꾸지 마세요 ★
 *   설명 → 무엇을 하는지 → 언제 → 어디서 → 신청.
 *   '신청'이 맨 끝인 이유: ROBOFEST를 처음 듣는 분에게 설명 없이
 *   신청부터 권하면, 무엇에 신청하는지 모르는 채로 결정을 요구하게 됩니다.
 *   (급한 사람을 위해 첫 화면과 상단 메뉴에 신청 버튼이 항상 있습니다)
 *
 *  모바일 우선입니다. 아무것도 안 붙은 설정이 휴대폰 화면 기준이고,
 *  sm: / lg: 가 붙은 것은 화면이 넓어질 때만 적용됩니다.
 * ========================================================================== */

export default function Home() {
  const { milestones, venue } = competition;

  return (
    <>
      {/* 검색엔진용 행사 정보. 화면에는 보이지 않습니다.
          자세한 설명은 src/components/EventJsonLd.tsx 를 보세요. */}
      <EventJsonLd />

      {/* 1. 대표 영역 — 대회명, 일정, 신청 버튼 */}
      <Hero />

      <main id="main" className="flex-1">
        {/* 2. 숫자로 보는 ROBOFEST — 첫 화면에 '붙어 있는' 남색 띠
               ROBOFEST 소개(/about)에 나오는 것과 똑같은 구역입니다.
               한 파일(FigureBand)을 두 곳에서 씁니다.

               ★ 첫 화면과 붙어 있는 것이 의도입니다 ★
                 사이에 여백을 넣지 마세요. 첫 화면도 같은 남색이라
                 사진이 그대로 남색 띠로 이어져 보입니다.

               ⚠️ 첫 화면(Hero)과 이 구역 사이에 다른 것을 끼워 넣지
                  마세요. 끼우면 위 '이어져 보이는' 효과가 깨집니다. */}
        <FigureBand />

        {/* 3. 대회 소개 — 흰 배경 */}
        <HomeIntro />

        {/* 4. 운영 종목 — 옅은 파랑 배경 */}
        <HomeSection
          tone="soft"
          title={`운영 종목 ${competition.categories.length}종목`}
          lead="팀마다 한 종목을 골라 참가합니다. 종목을 누르면 참가 자격과 준비물을 자세히 볼 수 있습니다."
          moreHref="/categories"
          moreLabel="종목 비교표 한눈에 보기"
        >
          {/* ★ 열 개수를 화면 폭별로 못 박습니다 — 3열이 되는 구간이
                없어야 합니다 (2026-08-14 담당자 요청) ★
                  640px 미만    → 1열  (4줄 × 2장… 이 아니라 8줄)
                  640~1279px    → 2열  (4줄 × 2장, 딱 맞음)
                  1280px 이상   → 4열  (2줄 × 4장, 딱 맞음)

              【 왜 3열을 없앴나 】
                종목이 8개라 3열로 놓으면 3+3+2 가 되어 마지막 줄에 빈칸이
                하나 생깁니다. 1·2·4열은 8을 나누어떨어지게 하는 값이라
                어느 폭에서도 줄이 꽉 찹니다.
                ⚠️ lg:grid-cols-3 을 되살리지 마세요. 빈칸이 다시 생깁니다.
                ⚠️ 종목 수가 8개가 아니게 되면 이 값을 다시 따져야 합니다.

              items-stretch 는 격자의 기본값이지만, '같은 줄 카드 높이를
              맞추는 것이 의도'라는 뜻으로 적어 둡니다. 지우지 마세요. */}
          {/* ★ 카드는 '줄 단위'로 나타납니다 (2026-08-14 담당자 요청) ★
                같은 줄에 있는 카드가 한꺼번에 뜨고, 줄과 줄 사이에만
                시차(150ms)가 있습니다. 넓은 화면이면 두 단계로 끝납니다.
                좁은 화면(1열)에서는 시차 없이 8장이 한꺼번에 뜹니다 —
                한 줄에 한 장씩이라 줄 단위로 하면 8단계가 되기 때문입니다.

              ℹ️ RowReveal 이 <ul> 을 대신 그려 줍니다. 위 격자 클래스는
                 그대로 넘어가므로 열 개수 설정은 여기 한 곳에 있습니다.
                 몇 열인지는 RowReveal 이 화면에서 직접 읽어 계산하므로,
                 위 grid-cols 를 바꿔도 그 파일은 고치지 않아도 됩니다.

              ⚠️ 카드를 하나씩 Reveal 로 감싸던 방식으로 되돌리지 마세요.
                 8장이 하나씩 떠서 마지막 카드까지 오래 걸립니다. */}
          <RowReveal className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {competition.categories.map((category) => (
              /* ⚠️ <li> 자체가 떠오릅니다(globals.css 의 `.row-reveal > *`).
                    그래서 감싸는 <div> 를 따로 두지 않습니다. 한 겹 끼우면
                    그 겹이 칸 높이를 꽉 채우지 못해 같은 줄 카드의 높이가
                    어긋납니다. 카드(<a>)는 h-full 이라 <li> 를 채웁니다. */
              <li key={category.slug}>
                <CategoryCard category={category} />
              </li>
            ))}
          </RowReveal>
        </HomeSection>

        {/* 5. 일정 — 흰 배경.
               자세한 설명은 /schedule 에 있고, 여기서는 날짜와 제목만
               훑어볼 수 있게 합니다. config 의 milestones 를 그대로 씁니다. */}
        <HomeSection
          title="일정"
          lead={`접수 기간은 ${formatKoreanDateRange(
            competition.registration.opensAt,
            competition.registration.closesAt,
          )}입니다.`}
          moreHref="/schedule"
          moreLabel="전체 일정 자세히 보기"
        >
          <ol className="grid gap-x-10 sm:grid-cols-2">
            {milestones.map((milestone, index) => {
              /* 아직 확정되지 않은 날짜에는 '예정'을 붙입니다.
                 항목마다 isEstimated 가 없을 수도 있어 'in' 으로 확인합니다. */
              const isEstimated =
                "isEstimated" in milestone && milestone.isEstimated === true;

              return (
                /* ★ li 에 있던 모양(줄·여백·flex)을 Reveal 로 옮겼습니다 ★
                     떠오르는 것이 '내용'이라서 아래 줄(border-b)도 같이
                     움직여야 합니다. li 에 줄을 남겨 두면 글자만 움직이고
                     줄은 가만히 있어 어긋나 보입니다.
                     ⚠️ 모양을 다시 li 로 옮기지 마세요.

                   시간차는 index % 2 — 넓은 화면에서 한 줄에 2개씩
                   놓이므로 왼쪽·오른쪽이 살짝 엇갈려 뜹니다. */
                <li key={milestone.date + milestone.title}>
                  <Reveal
                    delayMs={(index % 2) * 80}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-brand-100 py-4"
                  >
                    <span className="tabular shrink-0 text-sm font-bold text-brand-700">
                      {formatKoreanDate(milestone.date)}
                    </span>
                    <span className="text-base font-bold text-brand-900">
                      {milestone.title}
                    </span>
                    {isEstimated && (
                      <span className="rounded border border-brand-200 bg-brand-50 px-1.5 py-0.5 text-xs font-bold text-brand-700">
                        예정
                      </span>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </HomeSection>

        {/* 6. 장소 — 옅은 파랑 배경.
               ⚠️ 장소가 확정 전이면 그 사실을 반드시 함께 보여 줍니다.
                  숙소·교통편을 미리 예약하는 분이 있기 때문입니다. */}
        {/* ℹ️ 2026-08-06 담당자 요청: 이 구역에서 장소 이름
               ('부산보건대학교 체육관')을 두 곳에서 뺐습니다.
                 ① 제목 아래 한 줄 설명 `○○○에서 열립니다.` → 아예 없앰
                 ② 아래 '장소' 상자의 값 → 옅은 회색 안내 문구로 바꿈
               (`/venue` 의 '장소명' 줄에 2026-08-05 에 한 것과 같은 처리입니다.)

               ★ 되돌리려면
                 ① 아래 <HomeSection> 에 lead={`${venueDisplayName()}에서 열립니다.`} 를 다시 넣고
                 ② '장소' 상자의 <span> 한 줄을 {venueDisplayName()} 로 바꾸면 됩니다.
                 그러면 import 줄에 venueDisplayName 도 다시 넣어야 합니다. ★

               이름 자체는 config 의 venue.name 에 그대로 있고,
               `/venue` 페이지 헤더에는 계속 나옵니다. */}
        <HomeSection
          tone="soft"
          title="장소"
          moreHref="/venue"
          moreLabel="오시는 길 자세히 보기"
        >
          {/* Reveal 은 <div> 를 그대로 그리므로 예전 <div> 자리에 그대로
              끼워 넣었습니다. 상자 두 개가 살짝 엇갈려 떠오릅니다. */}
          <dl className="grid gap-5 sm:grid-cols-2">
            <Reveal className="rounded-2xl border border-brand-100 bg-paper p-6">
              {/* ℹ️ 2026-08-13: 이 작은 딱지를 '장소' → '장소명' 으로
                     바꿨습니다 (담당자 요청). '오시는 길'(/venue) 화면의
                     같은 줄이 '장소명' 이라, 두 화면의 말을 맞춘 것입니다.
                     ⚠️ 바로 위 구역 제목은 그대로 '장소' 입니다. 그것까지
                        바꾸지 마세요 — 상단 메뉴·구역 제목은 '장소',
                        상자 안의 딱지만 '장소명' 입니다. */}
              <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                장소명
              </dt>
              {/* ℹ️ 2026-08-11: 장소가 확정되어 이름이 다시 나옵니다.
                     08-06 ~ 08-11 사이에는 '장소명은 확정 후 공지
                     예정입니다'가 나왔습니다.
                     ⚠️ 이름을 여기에 직접 적지 마세요 — config 의
                        venue.name 에서 옵니다.

                  ★ 아래 '주소' 상자와 글자 크기·색을 똑같이 맞춥니다 ★
                    2026-08-13: 전에는 이 줄만 text-lg(18px)이고 주소는
                    text-base(16px)이라, 같은 종류의 값인데 2px 달랐습니다.
                    '오시는 길'(/venue) 화면의 같은 두 줄이 쓰는 값
                    (text-base sm:text-lg)으로 두 상자를 함께 맞췄습니다.
                    ⚠️ 한쪽만 고치지 마세요. 두 상자가 나란히 놓이므로
                       크기가 다르면 바로 눈에 띕니다. */}
              <dd className="mt-2 text-base text-ink sm:text-lg">
                {venue.name}
              </dd>
            </Reveal>

            <Reveal
              delayMs={80}
              className="rounded-2xl border border-brand-100 bg-paper p-6"
            >
              <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                주소
              </dt>
              {/* ⚠️ 위 '장소명' 상자와 같은 값이어야 합니다
                     (text-base sm:text-lg). 위 상자의 설명을 보세요. */}
              <dd className="mt-2 text-base text-ink sm:text-lg">
                {venue.address ? (
                  venue.address
                ) : (
                  <span className="text-ink-soft">
                    장소 확정 후 공지 예정입니다.
                  </span>
                )}
              </dd>
            </Reveal>
          </dl>
        </HomeSection>

        {/* 7. 접수 안내 — 흰 배경. 접수 전 / 접수 중 / 마감에 따라 바뀝니다. */}
        <RegistrationNotice />
      </main>

      {/* 7. 꼬리말 — 주최·주관 / 운영·공인 */}
      <SiteFooter />
    </>
  );
}
