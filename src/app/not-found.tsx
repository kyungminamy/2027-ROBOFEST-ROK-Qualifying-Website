import type { Metadata } from "next";
import Link from "next/link";
import { competition, visibleNavItems } from "@/config/competition";
import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";

/* ============================================================================
 *  없는 주소로 들어왔을 때 보이는 화면 (404)
 *
 *  ★ 왜 이 파일이 필요한가 ★
 *   이 파일이 없으면 Next.js 가 만든 영어 화면
 *   ("This page could not be found.")이 그대로 나옵니다.
 *   한국어 사이트에서 영어 오류 화면은 '고장 났다'처럼 보입니다.
 *
 *  ★ 어떤 경우에 보이나 ★
 *   · 공문이나 카카오톡에 실린 주소에 오타가 있을 때
 *   · 예전에 안내한 주소를 나중에 바꿨을 때
 *   두 경우 모두 방문자 잘못이 아니므로, 사과하듯 쓰지 말고
 *   '어디로 가면 되는지'를 바로 보여 줍니다.
 *
 *  ℹ️ 메뉴 목록은 config 의 nav 에서 가져옵니다. 메뉴가 늘거나 줄면
 *     이 화면도 따라서 바뀝니다. 여기에 주소를 직접 적지 마세요.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  const items = visibleNavItems();

  return (
    <>
      <PageHeader
        title="페이지를 찾을 수 없습니다"
        description="주소가 바뀌었거나, 주소에 오타가 있는 것 같습니다."
      />

      <main id="main" className="flex-1">
        <section className="py-10 sm:py-14">
          <div className={container}>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
              찾으시는 내용이 아래에 있을 수 있습니다
            </h2>

            <ul className="mt-6 space-y-3">
              {/* 홈은 메뉴 목록에 없을 수 있으므로 따로 넣습니다 */}
              <li>
                <Link
                  href="/"
                  className="text-base font-bold text-brand-700 underline sm:text-lg"
                >
                  {competition.shortName} 첫 화면 →
                </Link>
              </li>

              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-bold text-brand-700 underline sm:text-lg"
                  >
                    {item.label} →
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-base text-ink-soft">
              위 목록에서 찾지 못하셨다면 상단 메뉴를 이용해 주세요.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
