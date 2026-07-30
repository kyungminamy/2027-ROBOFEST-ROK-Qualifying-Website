import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { competition } from "@/config/competition";
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
  // 휴대폰 주소창 색상 — 브랜드 파란색(brand-700)과 동일하게 맞춥니다
  themeColor: "#1f4b74",
};

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
        {children}
      </body>
    </html>
  );
}
