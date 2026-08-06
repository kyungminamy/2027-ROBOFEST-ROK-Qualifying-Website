import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { competition } from "@/config/competition";
import { DdayBar } from "@/components/DdayBar";
import { SiteNav } from "@/components/SiteNav";
import { BackToTop } from "@/components/BackToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/* ============================================================================
 *  Pretendard — 한글 가독성이 가장 좋은 무료 글꼴 (OFL 1.1 라이선스)
 *
 *  글꼴 파일을 저장소에 직접 포함했습니다 (src/fonts/).
 *  외부 CDN을 쓰지 않는 이유: CDN이 중단되거나 주소가 바뀌면
 *  아무도 지켜보지 않는 사이에 사이트 글꼴이 깨질 수 있습니다.
 *
 *  굵기는 보통(400)과 굵게(700) 두 가지만 넣었습니다.
 *  휴대폰 데이터 사용량을 줄이기 위한 선택입니다 (합계 약 520KB).
 *  중간 굵기(600 SemiBold)가 필요하면 pretendard 패키지의
 *  woff2-subset 폴더에서 파일을 복사해 아래 목록에 한 줄 추가하면 됩니다.
 *
 *  출처: pretendard 1.3.9 / dist/web/static/woff2-subset
 * ========================================================================== */
const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  // swap: 글꼴을 받는 동안 대체 글꼴로 먼저 보여줍니다 (빈 화면 방지)
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "Noto Sans KR",
    "sans-serif",
  ],
});

/* ============================================================================
 *  브라우저 탭 제목, 검색 결과 문구
 *  ★ 문구를 바꾸려면 config/competition.ts 를 수정하세요. 여기가 아닙니다. ★
 * ========================================================================== */
export const metadata: Metadata = {
  title: {
    default: competition.shortName,
    // 하위 페이지 제목은 '일정 | 2027 ROBOFEST 국내예선대회' 형태가 됩니다
    template: `%s | ${competition.shortName}`,
  },
  description: competition.seo.description,
  applicationName: competition.shortName,

  /* 첫 화면의 대표 주소. 아래 화면들은 각자 page.tsx 에서 정합니다. */
  alternates: { canonical: "/" },

  /* 검색엔진 소유확인 (네이버·구글).
     값은 config/competition.ts 의 seo 에 있습니다.
     ⚠️ 지우면 검색 등록이 풀릴 수 있습니다. */
  verification: {
    google: competition.seo.googleSiteVerification,
  },
  other: {
    "naver-site-verification": competition.seo.naverSiteVerification,
  },

  /* ------------------------------------------------------------------------
   *  카카오톡·밴드·문자로 링크를 보낼 때 보이는 미리보기
   *
   *  ★ og-image.png 를 지우지 마세요 ★
   *   그림이 없으면 미리보기에 제목만 덩그러니 나오거나, 앱이 아무 그림도
   *   못 찾아 링크가 밋밋하게 보입니다. 그림을 바꾸려면 같은 이름
   *   (`public/og-image.png`)으로 덮어써 주세요. 크기는 1200x630 입니다.
   * ---------------------------------------------------------------------- */
  openGraph: {
    title: competition.shortName,
    description: competition.seo.description,
    url: competition.seo.siteUrl,
    siteName: competition.shortName,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: competition.shortName,
      },
    ],
  },

  /* 트위터(X)·일부 메신저는 이 값을 따로 봅니다.
     summary_large_image = 그림을 크게 보여 주는 방식 */
  twitter: {
    card: "summary_large_image",
    title: competition.shortName,
    description: competition.seo.description,
    images: ["/og-image.png"],
  },
  // 도메인 확정 전에는 siteUrl이 빈 문자열이므로 metadataBase를 생략합니다
  ...(competition.seo.siteUrl
    ? { metadataBase: new URL(competition.seo.siteUrl) }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // 휴대폰 주소창 색상 — 화면 맨 위에 있는 상단 메뉴 띠 색과 맞춥니다
  // ★ 상단 메뉴는 흰색입니다. 메뉴 색을 바꾸면 이 값도 같이 바꾸세요 ★
  themeColor: "#ffffff",
};

/* ============================================================================
 *  ℹ️ 디자인 방향 계약(DIRECTION_CONTRACT)은 2026-08-05에 이 파일에서
 *     빼고 `DESIGN.md` 로 옮겼습니다.
 *
 *     예전에는 이 내용을 모든 페이지 HTML에 숨은 주석으로 실어 보냈습니다
 *     (페이지마다 약 1KB). 방문자에게 보이지도 않는데, 내부 작업 과정을
 *     담은 영문 메모라 소스를 열어 보면 어색했습니다.
 *
 *     디자인을 크게 바꿀 때는 `DESIGN.md` 의 '방향 계약'을 먼저 읽고,
 *     바꿨으면 그 문서도 같이 고치세요.
 * ========================================================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* data-scroll-behavior="smooth" 는 globals.css 의
       scroll-behavior: smooth 와 짝을 이룹니다.
       이게 없으면 페이지를 이동할 때(예: 홈 → 참가 신청) 화면이
       위로 부드럽게 밀려 올라가서 어지럽게 느껴집니다. */
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      className={`${pretendard.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* 키보드로만 이용하는 분이 메뉴를 건너뛰고 본문으로 갈 수 있게 합니다.
            평소에는 보이지 않고, Tab 키를 누르면 나타납니다. 지우지 마세요. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-base focus:font-bold focus:text-white"
        >
          본문으로 바로 가기
        </a>

        {/* 맨 위 남은 날짜 띠 — ★ 상단 메뉴보다 위에 있어야 합니다 ★
            붙어 있지 않아서(sticky 아님) 화면을 내리면 그냥 사라지고,
            그다음부터는 메뉴 안의 작은 표가 같은 내용을 이어받습니다.
            높이는 globals.css 의 --dday-h 에서 정합니다. */}
        <DdayBar />

        <SiteNav />

        {children}

        {/* 맨 위로 돌아가는 떠 있는 단추.
            모든 화면에 나오도록 여기(공통 틀)에 둡니다.
            자바스크립트가 없으면 나오지 않습니다 — 자세한 이유는
            src/components/BackToTop.tsx 의 설명을 보세요. */}
        <BackToTop />

        {/* 화면이 얼마나 빨리 뜨는지 재는 도구 (Vercel Speed Insights).
            2026-08-05 추가.

            · 화면에는 아무것도 보이지 않습니다. 방문자는 알 수 없습니다.
            · 결과는 Vercel → 프로젝트 → `Speed Insights` 에서 봅니다.
            · **따로 켤 것은 없습니다.** 배포만 하면 알아서 기록됩니다.
              (2026-08-05 확인. 처음에 '켜야 한다'고 적었으나 사실이 아니었습니다)

            ℹ️ 무엇을 모으나: 화면이 뜨는 데 걸린 시간, 어느 주소인지,
               기기 종류·나라 정도입니다. **쿠키를 쓰지 않고, 이름이나
               연락처 같은 개인정보는 모으지 않습니다.**
               신청자 정보는 여전히 구글폼에만 있습니다.

            빼고 싶으면: 이 두 줄(import 와 <SpeedInsights />)을 지우고
            `npm uninstall @vercel/speed-insights` 하면 끝입니다. */}
        <SpeedInsights />

        {/* 방문자 통계 (Vercel Web Analytics). 2026-08-05 추가.

            · 몇 명이 어느 화면을 봤는지, 어디를 통해 들어왔는지 셉니다.
            · 결과는 Vercel → 프로젝트 → `Analytics` 에서 봅니다.
            · 화면에는 아무것도 보이지 않습니다.

            ⚠️ 위의 Speed Insights 와 성격이 다릅니다 ⚠️
             Speed Insights 는 '화면이 얼마나 빨리 뜨는가'를 재고,
             이것은 '누가 얼마나 들어왔는가'를 셉니다.
             쿠키는 쓰지 않지만, **방문자를 세기 위한 식별값**을 만듭니다.

            ℹ️ 신청자 정보와는 무관합니다. 이름·연락처·학교 같은 것은
               여전히 구글폼에만 있고, 여기로 오지 않습니다.

            빼고 싶으면: 이 두 줄(import 와 <Analytics />)을 지우고
            `npm uninstall @vercel/analytics` 하면 끝입니다. */}
        <Analytics />
      </body>
    </html>
  );
}
