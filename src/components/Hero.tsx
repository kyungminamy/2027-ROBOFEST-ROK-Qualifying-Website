import Link from "next/link";
import { competition, formatKoreanDateRange } from "@/config/competition";
import { ArrowRight, ChevronDown } from "@/components/icons";
import { HeroSlides } from "@/components/HeroSlides";
import { edgePadding } from "@/lib/layout";

/* ============================================================================
 *  첫 화면 대표 영역 — 대회명, 일정, 신청 버튼 + 배경 사진 슬라이드쇼
 *
 *  ★ 글과 사진은 config/competition.ts 에서 정합니다. ★
 *    · 사진 목록   → heroSlides
 *    · 넘김 간격   → heroSlideIntervalMs
 *    · 버튼 글자   → navCta
 *
 *  ℹ️ 남은 날짜(D-000) 표시는 2026-07-30에 없앴습니다.
 *     다시 넣고 싶으면 git 기록의 DdayBadge 컴포넌트를 되살리면 됩니다.
 *
 *  ★ 주최 기관 이름을 제목 '위'에 두지 마세요 ★
 *   그러면 화면에서 가장 먼저 읽히는 자리를 대회 이름이 아닌 기관 이름이
 *   차지합니다. 기관 이름은 꼬리말(SiteFooter)에 있습니다.
 *
 *  ℹ️ 2026-07-31 첫 화면만 다르게 배치했습니다.
 *     · 다른 구역은 가운데 정렬된 칸(container) 안에 들어가지만,
 *       첫 화면은 글이 화면 '왼쪽 끝'에 붙습니다.
 *       그래야 오른쪽에 배경 사진이 넓게 보입니다.
 *     · 일정·장소를 감싸던 네모 상자와 '종목 안내' 버튼을 없앴습니다.
 *     · 구분선 아래에 있던 주최·주관 / 운영·공인 / 사진 출처도 뺐습니다.
 *       (주최·주관과 운영·공인은 꼬리말에 그대로 있습니다)
 * ========================================================================== */

export function Hero() {
  const { dates } = competition;

  /* 배경 사진 — config 의 heroSlides 에 사진이 있을 때만 씁니다.
     목록이 비어 있으면 남색 격자무늬(.hero-field)가 나옵니다.
     (경로가 잘못돼도 깨진 사진 대신 격자무늬가 보이게 하기 위함) */
  const slides = competition.heroSlides.filter(
    (s) => s.wide.trim() !== "" && s.small.trim() !== "",
  );
  const hasPhoto = slides.length > 0;

  /* 사진 위에 얹는 글. 사진이 있으면 슬라이드쇼 안으로 들어갑니다. */
  const content = (
    <>
      {/* 대회 정식 명칭 — 첫 화면의 주인공입니다.
          ★ 크기를 줄이지 마세요 ★ 구분선 아래 글을 모두 뺀 뒤로
            이 제목이 첫 화면의 대부분을 차지하도록 키운 것입니다. */}
      <h1 className="rise text-[2rem] leading-[1.1] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
        {competition.name}
      </h1>

      {/* 대회기간
          ⚠️ '대회기간:' 라벨과 짧은 표기는 2026-08-05 부산광역시교육청
             요청입니다. 예전에는 라벨 없이 '2026년 11월 27일(금) ~
             2026년 11월 28일(토)' 처럼 연도를 두 번 적었습니다.

          ⚠️ whitespace-nowrap 을 지우지 마세요. 없으면 '2026. 11. /
             28.(토)' 처럼 날짜 하나가 중간에서 잘려 두 줄로 나뉩니다. */}
      <p className="rise rise-2 tabular mt-7 text-base font-bold sm:mt-8 sm:text-lg">
        <span className="whitespace-nowrap">대회기간: </span>
        <span className="whitespace-nowrap">
          {formatKoreanDateRange(dates.day1, dates.day2)}
        </span>
      </p>

      {/* 신청 버튼 — 첫 화면의 유일한 버튼입니다. */}
      <div className="rise rise-3 mt-8">
        <Link
          href={competition.navCta.href}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 text-base font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-accent-700 sm:w-auto sm:text-lg"
        >
          {competition.navCta.label}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </>
  );

  return (
    /* ★ 첫 화면이 화면 전체를 채웁니다 (휴대폰 포함) ★
     *
     *  빼는 --nav-h 는 상단 메뉴의 높이입니다. globals.css 에서 화면
     *  크기별로 정해 둔 값을 그대로 가져다 씁니다(52/64/80px).
     *  이걸 빼지 않으면 메뉴 높이만큼 넘쳐서, 첫 화면 아래쪽을 보려고
     *  조금 스크롤해야 합니다.
     *  ★ 메뉴 높이를 바꿀 때는 globals.css 의 --nav-h 만 고치면 됩니다 ★
     *    여기 숫자를 따로 적지 마세요. 예전에 두 곳에 적어 두었다가
     *    한쪽만 고쳐서 어긋난 적이 있습니다.
     *
     *  svh = 휴대폰 주소창이 보일 때를 기준으로 한 화면 높이입니다.
     *  (vh 를 쓰면 주소창 때문에 아래쪽이 잘리는 기기가 있습니다)
     *
     *  ★ h- 가 아니라 min-h- 입니다 (바꾸지 마세요) ★
     *   글이 길어져 화면보다 커지면 칸이 늘어납니다. h- 로 고정하면
     *   작은 휴대폰에서 '참가 신청' 버튼이 화면 밖으로 잘려 나갑니다.
     *
     *  isolate + overflow-hidden: 배경 사진이 이 칸 밖으로 삐져나오지
     *  않게 하고, 사진과 글의 앞뒤 순서를 이 칸 안에서만 따지게 합니다. */
    <section className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden bg-brand-900 text-white">
      {hasPhoto ? (
        <HeroSlides
          slides={slides}
          intervalMs={competition.heroSlideIntervalMs}
        >
          {content}
        </HeroSlides>
      ) : (
        /* 사진이 하나도 없을 때 — 남색 격자무늬 위에 글만 놓습니다 */
        <div className="hero-field absolute inset-0" aria-hidden="true" />
      )}

      {!hasPhoto && (
        <div className={`relative w-full ${edgePadding}`}>
          <div className="max-w-4xl py-14 sm:py-20 lg:py-24">{content}</div>
        </div>
      )}

      {/* ★ '아래로 더 있습니다' 화살표 — 지우지 마세요 ★
          첫 화면이 화면을 꽉 채우기 때문에, 여기서 끝인 줄 알고 그냥
          나가는 분이 있었습니다. (2026-08-05 부산광역시교육청 의견)

          ★ 자바스크립트가 없어도 동작합니다 ★
            그냥 링크(<a href="#main">)입니다. 버튼처럼 보이지만 눌렀을 때
            브라우저가 스스로 본문으로 이동합니다. 자바스크립트로 바꾸지
            마세요 — 학교 인터넷에서 막히면 눌러도 아무 일이 없게 됩니다.

          휴대폰에서도 누를 수 있도록 44px 이상으로 잡았습니다. */}
      <a
        href="#main"
        aria-label="아래 내용 보기"
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:bottom-6"
      >
        <ChevronDown className="scroll-cue-arrow h-7 w-7" />
      </a>
    </section>
  );
}
