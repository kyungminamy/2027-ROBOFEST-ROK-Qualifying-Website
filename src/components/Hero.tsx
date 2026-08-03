import Link from "next/link";
import { competition, formatKoreanDate } from "@/config/competition";
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
 *  ℹ️ 2026-07-31 첫 화면만 다르게 배치했습니다.
 *     · 다른 구역은 가운데 정렬된 칸(container) 안에 들어가지만,
 *       첫 화면은 글이 화면 '왼쪽 끝'에 붙습니다.
 *       그래야 오른쪽에 배경 사진이 넓게 보입니다.
 *     · 일정·장소를 감싸던 네모 상자를 없애고 글자만 남겼습니다.
 *     · '종목 안내' 버튼을 없앴습니다. 첫 화면의 버튼은 '참가 신청'
 *       하나뿐입니다. 종목 안내는 상단 메뉴에 그대로 있습니다.
 *
 *  ★ 글 너비는 max-w-3xl 로 제한합니다 (지우지 마세요) ★
 *   넓은 모니터에서 이 제한이 없으면 '주최·주관' 줄이 화면 끝까지
 *   늘어나서 읽기 어려워집니다.
 * ========================================================================== */

export function Hero() {
  const { dates } = competition;

  /* 배경 사진 — config 에 경로가 있을 때만 씁니다.
     비어 있으면 남색 격자무늬(.hero-field)가 나옵니다.
     (경로가 잘못돼도 깨진 사진 대신 격자무늬가 보이게 하기 위함) */
  const { heroImage } = competition;
  const hasPhoto = heroImage.wide.trim() !== "" && heroImage.small.trim() !== "";

  return (
    <section
      className={`${hasPhoto ? "hero-photo" : "hero-field"} text-white`}
      style={
        hasPhoto
          ? ({
              "--hero-image-wide": `url(${heroImage.wide})`,
              "--hero-image-small": `url(${heroImage.small})`,
              "--hero-pos-wide": heroImage.positionWide,
              "--hero-pos-small": heroImage.positionSmall,
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* 좌우 여백만 주고 가운데 정렬은 하지 않습니다 (왼쪽 끝에 붙임).
          휴대폰 여백(px-5)은 다른 페이지와 똑같이 맞췄습니다. */}
      <div className="w-full px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl py-14 sm:py-20 lg:py-24">
          {/* 대회 정식 명칭 — 첫 화면의 주인공입니다.
              ★ 크기를 줄이지 마세요 ★ 구분선 아래 글을 모두 뺀 뒤로
                이 제목이 첫 화면의 대부분을 차지하도록 키운 것입니다.
              leading(줄 간격)을 1.1로 좁혀서 여러 줄이 한 덩어리로
              보이게 했습니다. */}
          <h1 className="rise text-[2rem] leading-[1.1] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
            {competition.name}
          </h1>

          {/* 대회 일자
              ℹ️ 2026-07-31: '일정' 라벨 글자와 '장소' 줄을 통째로 뺐습니다.
                 날짜만 남깁니다. 장소는 상단 메뉴의 '장소' 페이지에 있습니다.

              ⚠️ 각 날짜를 whitespace-nowrap 으로 감쌌습니다.
                 이게 없으면 '2026년 11월 / 28일(토)'처럼 날짜 하나가
                 중간에서 잘려 두 줄로 나뉩니다. 지우지 마세요. */}
          <p className="rise rise-2 tabular mt-7 text-base font-bold sm:mt-8 sm:text-lg">
            <span className="whitespace-nowrap">
              {formatKoreanDate(dates.day1)}
            </span>
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> ~ </span>
            <span className="sm:hidden">~ </span>
            <span className="whitespace-nowrap">
              {formatKoreanDate(dates.day2)}
            </span>
          </p>

          {/* 신청 버튼 — 첫 화면의 유일한 버튼입니다.
              글자는 config 의 navCta 에서 가져옵니다. */}
          <div className="rise rise-3 mt-8">
            <Link
              href={competition.navCta.href}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 text-base font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-accent-700 sm:w-auto sm:text-lg"
            >
              {competition.navCta.label}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* ℹ️ 2026-07-31: 구분선 아래에 있던 글을 전부 뺐습니다.
                 · 주최·주관 / 운영·공인 → 꼬리말(SiteFooter)에 그대로 있습니다.
                 · 사진 출처 → 지금은 화면 어디에도 표시되지 않습니다.

                 ⚠️ 배경 사진은 미국 LTU에서 열린 '세계대회' 사진입니다.
                    부산 국내예선 사진이 아닙니다. 지금은 그 사실을 알리는
                    문구가 화면에 없습니다. 사진을 계속 쓰려면 꼬리말 등
                    다른 자리에 출처를 밝히는 편이 좋습니다. */}
        </div>
      </div>
    </section>
  );
}
