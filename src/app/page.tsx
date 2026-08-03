import {
  competition,
  formatKoreanDate,
  venueDisplayName,
} from "@/config/competition";
import { CategoryCard } from "@/components/CategoryCard";
import { FigureBand } from "@/components/FigureBand";
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
          {/* 휴대폰 1개 / 태블릿 2개 / 넓은 화면 3개씩 */}
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {competition.categories.map((category, index) => (
              <li key={category.slug}>
                {/* 카드가 아래에서 떠오릅니다.
                    시간차(delayMs)를 index % 3 으로 주는 이유:
                    넓은 화면에서 한 줄에 3개씩 놓이므로, 한 줄 안에서
                    왼쪽→오른쪽으로 차례차례 뜨는 것처럼 보입니다.
                    8개에 순서대로 시간차를 주면 마지막 카드가 0.56초나
                    기다려서 느리게 느껴집니다.

                    ⚠️ h-full 이 필요합니다. Reveal 이 카드를 한 겹 감싸므로,
                       이 겹이 칸 높이를 꽉 채우지 않으면 같은 줄 카드들의
                       높이가 서로 어긋납니다. */}
                <Reveal className="h-full" delayMs={(index % 3) * 80}>
                  <CategoryCard category={category} />
                </Reveal>
              </li>
            ))}
          </ul>
        </HomeSection>

        {/* 5. 일정 — 흰 배경.
               자세한 설명은 /schedule 에 있고, 여기서는 날짜와 제목만
               훑어볼 수 있게 합니다. config 의 milestones 를 그대로 씁니다. */}
        <HomeSection
          title="일정"
          lead={`접수는 ${formatKoreanDate(
            competition.registration.opensAt,
          )}에 시작해 ${formatKoreanDate(
            competition.registration.closesAt,
          )}에 마감합니다.`}
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
        <HomeSection
          tone="soft"
          title="장소"
          lead={`${venueDisplayName()}에서 열립니다.`}
          moreHref="/venue"
          moreLabel="오시는 길 자세히 보기"
        >
          <dl className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-100 bg-paper p-6">
              <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                장소
              </dt>
              <dd className="mt-2 text-lg font-bold text-brand-900">
                {venueDisplayName()}
              </dd>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-paper p-6">
              <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                주소
              </dt>
              <dd className="mt-2 text-base text-ink">
                {venue.address ? (
                  venue.address
                ) : (
                  <span className="text-ink-soft">
                    장소 확정 후 공지 예정입니다.
                  </span>
                )}
              </dd>
            </div>
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
