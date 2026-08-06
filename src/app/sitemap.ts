import type { MetadataRoute } from "next";
import { competition } from "@/config/competition";

/* ============================================================================
 *  검색엔진에게 '이 사이트에 어떤 화면이 있는지' 알려 주는 목록
 *
 *  주소: https://robofestbusan2026.com/sitemap.xml
 *  네이버 서치어드바이저·구글 서치콘솔에 등록할 때 이 주소를 넣습니다.
 *
 *  ★ 종목 화면은 config 에서 자동으로 만들어집니다. ★
 *   종목을 늘리거나 줄여도 이 파일은 고칠 필요가 없습니다.
 *   `categories` 에 있는 만큼 알아서 들어갑니다.
 *
 *  ℹ️ priority(중요도)는 검색엔진에게 주는 참고값입니다.
 *     첫 화면과 '참가 신청'을 1.0 으로 둔 이유: 이 사이트의 목적이
 *     '신청을 받는 것'이기 때문입니다. 검색 결과에서 이 두 화면이
 *     먼저 보이는 편이 좋습니다.
 * ========================================================================== */

export default function sitemap(): MetadataRoute.Sitemap {
  const base = competition.seo.siteUrl;

  /* 배포한 시점을 '마지막 수정일'로 씁니다.
     내용을 고쳐 다시 배포하면 자동으로 갱신됩니다. */
  const lastModified = new Date();

  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1.0 }, // 첫 화면
    { path: "/apply", priority: 1.0 }, // 참가 신청 — 이 사이트의 목적
    { path: "/about", priority: 0.8 },
    { path: "/categories", priority: 0.8 },
    { path: "/schedule", priority: 0.6 },
    { path: "/venue", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
  ];

  const top: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: p.priority,
  }));

  /* 종목 상세 8개 — config 의 categories 를 그대로 따라갑니다 */
  const categories: MetadataRoute.Sitemap = competition.categories.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...top, ...categories];
}
