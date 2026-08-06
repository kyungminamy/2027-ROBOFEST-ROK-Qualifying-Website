import type { MetadataRoute } from "next";
import { competition } from "@/config/competition";

/* ============================================================================
 *  검색엔진에게 '들어와서 읽어도 된다'고 알려 주는 파일
 *
 *  주소: https://robofestbusan2026.com/robots.txt
 *  (이 파일을 만들면 Next.js 가 그 주소를 자동으로 만들어 줍니다)
 *
 *  ★ 손댈 일이 거의 없습니다. ★
 *   숨기고 싶은 화면이 생겼을 때만 disallow 에 주소를 적으면 됩니다.
 *   지금은 모든 화면을 공개합니다 — 대회를 알리는 것이 목적이니까요.
 *
 *  ℹ️ 'Yeti' 는 네이버 검색로봇의 이름입니다. 'Googlebot' 은 구글입니다.
 *     `*`(전체 허용)에 이미 포함되지만, 두 곳은 우리가 실제로 등록하는
 *     검색엔진이라 이름을 따로 적어 두었습니다. 나중에 누가 `*` 를
 *     막더라도 이 둘은 남도록 하기 위함입니다.
 * ========================================================================== */

export default function robots(): MetadataRoute.Robots {
  const base = competition.seo.siteUrl;

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Yeti", allow: "/" }, // 네이버
      { userAgent: "Googlebot", allow: "/" }, // 구글
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
