import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { competition } from "@/config/competition";
import { SiteNav } from "@/components/SiteNav";
import { BackToTop } from "@/components/BackToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  openGraph: {
    title: competition.shortName,
    description: competition.seo.description,
    locale: "ko_KR",
    type: "website",
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
 *  디자인 방향 계약 (design direction contract)
 *
 *  이 사이트를 왜 이렇게 생기게 만들었는지 적어 둔 메모입니다.
 *  화면에는 보이지 않고, 페이지 소스에만 남습니다.
 *  디자인을 크게 바꿀 때 이 메모를 먼저 읽고, 바꿨으면 같이 고치세요.
 * ========================================================================== */
const DIRECTION_CONTRACT = `<!--
THESIS: Owns instant recognition as an official robotics qualifier. Refuses an
invented visual world: offered a rolled direction twice, the user took the
category standard both times, so convention is the commitment, played straight.

OWN-WORLD: Competition navy (brand-900 ground, brand-700 structure) with a
single signal orange (accent-600) reserved for the primary action and the open
state. White cards, 1px navy-tinted rules, drawn SVG icons, Pretendard 400/700,
tabular numerals. No photography exists for this event and none is invented.

STORY: A teacher who has never heard of Robofest learns what it is, believes it
is official and free, and reaches the 구글폼 on /apply.

FIRST VIEWPORT: Navy field with a faint 44px grid. 대회명 large, then date and
venue as a bordered meta row, then two buttons: orange 참가 신청, outlined
종목 안내. 주최·주관 sits below as a credential strip, never as an eyebrow.

FORM: category canon (standing exit), outside the grounded list; seed c2a062bf.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
-->`;

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
        {/* 위에 적어 둔 디자인 방향 메모를 페이지 소스에 남깁니다.
            화면에는 아무것도 보이지 않습니다. */}
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />

        {/* 키보드로만 이용하는 분이 메뉴를 건너뛰고 본문으로 갈 수 있게 합니다.
            평소에는 보이지 않고, Tab 키를 누르면 나타납니다. 지우지 마세요. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-base focus:font-bold focus:text-white"
        >
          본문으로 바로 가기
        </a>

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
            · **Vercel 화면에서 켜 주어야 실제로 기록됩니다.**
              (Speed Insights 탭 → `Enable`)

            ℹ️ 무엇을 모으나: 화면이 뜨는 데 걸린 시간, 어느 주소인지,
               기기 종류·나라 정도입니다. **쿠키를 쓰지 않고, 이름이나
               연락처 같은 개인정보는 모으지 않습니다.**
               신청자 정보는 여전히 구글폼에만 있습니다.

            빼고 싶으면: 이 두 줄(import 와 <SpeedInsights />)을 지우고
            `npm uninstall @vercel/speed-insights` 하면 끝입니다. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
